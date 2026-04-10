# API Contracts — Shared Interfaces Across Clients

## Overview

The backend TypeScript interfaces are the **single source of truth**. Clients never define types manually — they generate them from the OpenAPI spec that the backend publishes.

```
src/types/*.ts  (backend interfaces)
      ↓  tsoa auto-generates
openapi.json  (live spec endpoint)
      ↓
  ┌──────────────────────────┐
  │                          │
Next.js                   Flutter
openapi-typescript        openapi-generator
→ src/types/api.ts        → lib/generated/api/
  (auto-generated)          (auto-generated)
```

No manual mirroring. No duplicate type definitions. When a backend interface changes, re-run codegen in each client.

---

## Backend — TypeScript Interface Definitions

All shared types live in `src/types/`:

```
src/
└── types/
    ├── driver.ts
    ├── parent.ts
    ├── student.ts
    ├── assignment.ts
    ├── trip.ts
    ├── fcm.ts
    └── websocket.ts
```

### Driver

```ts
export type DriverStatus = 'active' | 'inactive' | 'on_trip';

export interface Driver {
  _id: string;
  name: string;
  phone: string;
  licencePlate: string;
  status: DriverStatus;
  assignedRoute?: string;
}
```

### Parent

```ts
export interface Parent {
  _id: string;
  name: string;
  phone: string;
  students: string[];
}
```

### Student

```ts
export interface Student {
  _id: string;
  name: string;
  parent: string;
}
```

### Assignment

```ts
export type AssignmentStatus = 'pending' | 'approved' | 'rejected';

export interface Assignment {
  _id: string;
  student: string;
  driver: string;
  parent: string;
  status: AssignmentStatus;
  createdAt: string;
}
```

### Trip

```ts
export type TripStatus = 'scheduled' | 'active' | 'completed';

export interface Trip {
  _id: string;
  driver: string;
  route?: string;
  status: TripStatus;
  startedAt?: string;
  endedAt?: string;
  assignedStudents: string[];
}
```

### FCM Payloads

```ts
export type FcmEventType =
  | 'assignment_created'
  | 'assignment_approved'
  | 'trip_started'
  | 'trip_ended'
  | 'driver_updated'
  | 'sos_alert';

export interface FcmPayload {
  type: FcmEventType;
  [key: string]: string;
}
```

| `type`                | Extra fields                       | Sent to              |
|-----------------------|------------------------------------|----------------------|
| `assignment_created`  | `assignmentId`, `studentId`        | Driver               |
| `assignment_approved` | `assignmentId`, `studentId`        | Parent               |
| `trip_started`        | `tripId`, `driverId`               | All assigned parents |
| `trip_ended`          | `tripId`                           | All assigned parents |
| `driver_updated`      | `driverId`                         | Driver               |
| `sos_alert`           | `tripId`, `driverId`, `lat`, `lng` | Admin + all parents  |

### WebSocket Messages

```ts
// Driver → Server
export interface WsLocationEmit {
  type: 'location';
  tripId: string;
  lat: number;
  lng: number;
}

export interface WsSosEmit {
  type: 'sos';
  tripId: string;
  lat: number;
  lng: number;
}

// Server → Parent
export interface WsLocationUpdate {
  type: 'location_update';
  tripId: string;
  lat: number;
  lng: number;
  eta: number;
}

export interface WsSosAlert {
  type: 'sos_alert';
  tripId: string;
  driverId: string;
  lat: number;
  lng: number;
}
```

---

## Standard API Response Envelope

```ts
export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiError {
  success: false;
  message: string;
  code: string;
}
```

---

## Backend — Exposing the OpenAPI Spec (tsoa)

`tsoa` reads the TypeScript types and controller decorators to generate an `openapi.json` file and register Express routes automatically.

```bash
npm install tsoa swagger-ui-express
npm install -D @types/swagger-ui-express
```

**`tsoa.json`** (backend root):

```json
{
  "entryFile": "src/server.ts",
  "noImplicitAdditionalProperties": "throw-on-extras",
  "controllerPathGlobs": ["src/controllers/**/*.ts"],
  "spec": {
    "outputDirectory": "build",
    "specVersion": 3,
    "name": "Astria API",
    "version": "1.0.0"
  },
  "routes": {
    "routesDir": "build"
  }
}
```

**Generate spec and routes:**

```bash
npx tsoa spec-and-routes
```

This writes `build/openapi.json` and `build/routes.ts`. The spec is served at `/openapi.json`.

**`src/server.ts`** (add spec endpoint):

```ts
import swaggerUi from 'swagger-ui-express';
import * as openApiSpec from '../build/openapi.json';

app.use('/openapi.json', (_req, res) => res.json(openApiSpec));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));
```

---

## Next.js — Generate TypeScript Types

Run this command from the Next.js project root after any backend interface changes:

```bash
npx openapi-typescript http://localhost:3000/openapi.json -o src/types/api.ts
```

**Usage in Next.js:**

```ts
import type { components } from '@/types/api';

type Driver     = components['schemas']['Driver'];
type Assignment = components['schemas']['Assignment'];
type Trip       = components['schemas']['Trip'];
```

> Never edit `src/types/api.ts` manually — it is fully generated and will be overwritten.

---

## Flutter — Generate Dart Models

**Option A — openapi-generator CLI** (one-time or CI):

```bash
openapi-generator-cli generate \
  -i http://localhost:3000/openapi.json \
  -g dart \
  -o lib/generated/api
```

**Option B — swagger_dart_code_generator** (integrates with build_runner):

Add to `pubspec.yaml`:

```yaml
dev_dependencies:
  swagger_dart_code_generator: ^2.6.0
  build_runner: ^2.4.0
```

Add `build.yaml` at Flutter project root:

```yaml
targets:
  $default:
    builders:
      swagger_dart_code_generator:
        options:
          input_urls:
            - url: "http://localhost:3000/openapi.json"
              output_folder: "lib/generated/api"
```

Run:

```bash
dart run build_runner build
```

Generated files go in `lib/generated/api/` — never edited manually. Reference them in your `data/models/` layer.

---

## Update Protocol

When a backend interface changes:

1. Update the TypeScript interface in `src/types/`
2. Run `npx tsoa spec-and-routes` to regenerate `build/openapi.json`
3. In **Next.js**: run `npx openapi-typescript http://localhost:3000/openapi.json -o src/types/api.ts`
4. In **Flutter**: run `dart run build_runner build`
5. Fix any compile errors in client code caused by the type change

> The TypeScript interface change is the signal. If `src/types/` changed, both clients must regenerate.
