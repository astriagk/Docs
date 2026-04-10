# Node.js Backend Architecture

## Overview

REST API + WebSocket server for the school commute tracking platform.

- **REST API** — CRUD operations, authentication, business logic
- **WebSocket** — live GPS streaming only (driver → server → parent)
- **FCM Silent Push** — notifies Flutter clients when business data changes

---

## Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | MongoDB (Mongoose) |
| Real-time (GPS) | WebSocket (`ws` package) |
| Push Notifications | Firebase Admin SDK |
| Authentication | JWT (access + refresh tokens) |

---

## Folder Structure

```
src/
├── config/
│   ├── db.js               # MongoDB connection
│   ├── firebase.js         # Firebase Admin SDK init
│   └── env.js              # Environment variables
│
├── models/
│   ├── Driver.js
│   ├── Parent.js
│   ├── Student.js
│   ├── Trip.js
│   └── Assignment.js
│
├── routes/
│   ├── auth.js             # Login, refresh token, logout
│   ├── drivers.js          # Driver CRUD + status
│   ├── parents.js          # Parent CRUD
│   ├── students.js         # Student CRUD
│   ├── assignments.js      # Student ↔ Driver assignments
│   └── trips.js            # Trip lifecycle (start, end, history)
│
├── controllers/            # Business logic extracted from routes
│   ├── authController.js
│   ├── driverController.js
│   ├── assignmentController.js
│   └── tripController.js
│
├── middleware/
│   ├── auth.js             # JWT verification middleware
│   ├── roles.js            # Role-based access (admin, driver, parent)
│   └── errorHandler.js     # Global error handler
│
├── services/
│   ├── fcm.js              # FCM send utilities (notifyUser, notifyMultiple)
│   └── websocket.js        # WS server lifecycle + GPS message dispatcher
│
└── server.js               # Express + WS server startup
```

---

## Authentication

**JWT Strategy:**
- Login issues access token (short-lived, e.g. 15 min) + refresh token (long-lived, e.g. 30 days)
- Refresh tokens stored in MongoDB; invalidated on logout
- All protected routes verified by `auth.js` middleware
- WebSocket connections authenticated by passing JWT as query param on handshake

```
GET /ws?token=<jwt>
```

---

## WebSocket Architecture (GPS Only)

WebSocket is used exclusively for high-frequency live location data:
- Driver emits GPS every 5 seconds
- Server calculates ETA and broadcasts to subscribed parents
- SOS alerts forwarded immediately

**Connection flow:**
1. Driver app connects to WS endpoint with JWT
2. Server verifies JWT, registers driver in active connection map
3. Parent app connects, subscribes to a specific `tripId`
4. Driver emits `{ type: "location", lat, lng, tripId }`
5. Server broadcasts to all parents subscribed to that `tripId`

**Server tracks:**
```js
// In-memory maps (process-scoped, cleared on restart)
Map<driverId, WebSocket>  // active driver connections
Map<tripId, Set<WebSocket>>  // parent subscribers per trip
```

---

## FCM Silent Push — Business Event Triggers

When any user changes business data via REST, the server sends a **silent FCM data message** to affected device(s). Flutter receives it in any app state and refreshes the relevant screen.

### FCM Utility (`services/fcm.js`)

```js
const admin = require('firebase-admin');

async function notifyUser(fcmToken, data) {
  if (!fcmToken) return;
  return admin.messaging().send({
    token: fcmToken,
    data,                                            // string key-value pairs
    apns: { payload: { aps: { contentAvailable: true } } },  // iOS background wake
    android: { priority: 'high' }                    // Android background wake
  });
}

async function notifyMultiple(fcmTokens, data) {
  const valid = fcmTokens.filter(Boolean);
  if (!valid.length) return;
  return admin.messaging().sendEach(
    valid.map(token => ({ token, data }))
  );
}

module.exports = { notifyUser, notifyMultiple };
```

### FCM Token Storage

Each user document stores the device FCM token:

```js
// Mongoose model field
fcmToken: { type: String, default: null }

// Endpoint called by Flutter on login and on token refresh
PUT /api/auth/fcm-token
Headers: Authorization: Bearer <jwt>
Body: { fcmToken: "device_token" }
```

### Events That Trigger FCM

| Event | Endpoint | Notified Devices | FCM `type` |
|---|---|---|---|
| Admin assigns driver to route | `POST /assignments` | Driver | `assignment_created` |
| Driver approves student | `PUT /assignments/:id/approve` | Parent | `assignment_approved` |
| Driver starts trip | `PUT /trips/:id/start` | All assigned parents | `trip_started` |
| Driver ends trip | `PUT /trips/:id/end` | All assigned parents | `trip_ended` |
| Admin changes driver info | `PUT /drivers/:id` | Driver | `driver_updated` |
| SOS from driver (REST fallback) | `POST /trips/:id/sos` | Admin + all parents | `sos_alert` |

### Route Example

```js
// routes/assignments.js
router.put('/:id/approve', auth, async (req, res) => {
  const assignment = await Assignment.findByIdAndUpdate(
    req.params.id,
    { status: 'approved' },
    { new: true }
  ).populate('parent student');

  // Notify the parent whose student was approved
  await notifyUser(assignment.parent.fcmToken, {
    type: 'assignment_approved',
    assignmentId: assignment._id.toString(),
    studentId: assignment.student._id.toString()
  });

  res.json(assignment);
});
```

---

## Real-Time Strategy Summary

| Data Type | Mechanism | Direction |
|---|---|---|
| Live GPS / bus location | WebSocket | Driver → Server → Parent |
| ETA countdown | WebSocket (server-calculated) | Server → Parent |
| SOS alert | WebSocket + FCM fallback | Server → Parent + Admin |
| Student assignment | FCM Silent Push | Server → Driver |
| Assignment approval | FCM Silent Push | Server → Parent |
| Trip start / end | FCM Silent Push | Server → Parents |
| Admin data changes | FCM Silent Push | Server → Driver/Parent |

---

## MongoDB Models — Key Fields

### Driver
```js
{
  name, phone, licencePlate,
  status: { type: String, enum: ['active', 'inactive', 'on_trip'] },
  fcmToken: String,
  assignedRoute: ObjectId
}
```

### Parent
```js
{
  name, phone,
  students: [ObjectId],
  fcmToken: String
}
```

### Assignment
```js
{
  student: ObjectId,
  driver: ObjectId,
  parent: ObjectId,
  status: { type: String, enum: ['pending', 'approved', 'rejected'] },
  createdAt: Date
}
```

### Trip
```js
{
  driver: ObjectId,
  route: ObjectId,
  status: { type: String, enum: ['scheduled', 'active', 'completed'] },
  startedAt: Date,
  endedAt: Date,
  assignedStudents: [ObjectId]
}
```

---

## Error Handling

Global error handler in `middleware/errorHandler.js`. All controllers use `next(error)` to propagate.

Standard error response format:
```json
{
  "success": false,
  "message": "Human-readable error",
  "code": "ERROR_CODE"
}
```

---

## Environment Variables

```env
PORT=3000
MONGO_URI=mongodb://...
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=30d
FIREBASE_SERVICE_ACCOUNT_PATH=./firebase-service-account.json
```
