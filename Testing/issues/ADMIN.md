# Admin Testing Issues

## Authentication & Session Management

### Sign In

- **Issue**: Email/username field should accept only email
- **Issue**: Expired token in local storage not navigating to login page
- **Labels**: Welcome back message display, "Remember me" checkbox

### Forgot Password

- [ ] To be tested

## Super Admin Dashboard

### Dashboard

- **Status**: Don't need to show the dashboard as of now

## Admin Management

### Admin List

#### Issues

- **🔴 CRITICAL**: Role changing for super admin not working (e.g., super admin → admin)
- **🟡 BUG**: Not able to change roles

#### Working Features

- Update is working
- Search working for username only
- Activate/De-activate working

#### Test Data

**Create New Super Admin**

```json
{
  "username": "Gowtham Kumar B V",
  "email": "gowtham0794@gmail.com",
  "phone_number": "8867347448",
  "password": "Admin@123456",
  "admin_role": "superadmin"
}
```

**Create New Admin**

```json
{
  "username": "Gagan",
  "email": "gagan@gmail.com",
  "phone_number": "7892944679",
  "password": "Admin@123456",
  "admin_role": "admin"
}
```

## Subscription Management

### Subscription Plans List

#### Issues

- **🟡 BUG**: When deactivate, can't see in the list - should show in different tab
- **🟡 BUG**: Search works only for plan name

#### Working Features

- Create/Edit working

### Parent Subscriptions

- **Status**: ⏳ PENDING - Once parents start buying, we can test

## Schools Management

### Schools List

#### Issues

- **🔴 CRITICAL**: View error
- **🟡 BUG**: Edit working but principal name not visible

#### Working Features

- Create school working

### School Subscriptions

#### Issues

- **🟡 BUG**: Modal buttons design issues
- **🟡 BUG**: No edit for plan, date, etc.
- **Enhancement**: When creating subscription, only add start date; auto-display end date for 1 year
- **Enhancement**: School selection should be kept in modal with search option; in list, only filter should appear

### School Admins

#### Issues

- **🔴 CRITICAL**: No way to edit admin
- **🟡 BUG**: Modal buttons design issues
- **🟡 BUG**: Register button not working properly
- **🟡 BUG**: After de-activate, no way to see admin
- **Enhancement**: Need dropdown to select school in modal, not in list
- **Enhancement**: School filter in list should prevent creating admin without school selection

## Parents, Drivers & Trips Management

### Parents List

- **Status**: ⏳ PENDING - Once start creating parents

### Drivers List

- **Status**: ⏳ PENDING - Once start creating drivers

### All Trips

- **Status**: ⏳ PENDING - Once start creating trips

### Live Tracking

- **Status**: ⏳ PENDING - Once start creating tracking

## UI & Navigation

### Header

- **🟡 BUG**: Image is not suitable for the user
- **🟡 BUG**: Logout button design issues

## School Admin Portal

### Dashboard

- **Status**: Not needed

### UI/UX Issues

- **🟡 BUG**: When user is deactivated, no toast message shown to user

### Features Pending

- All Trips - Once start creating trips
- Live Tracking - Once start creating tracking

## Redemption & Codes Management

### Redemption Codes

- **Status**: ⏳ PENDING - After parents and students setup

### Generate Redemption Codes

- **Status**: ⏳ PENDING - After creating students

## Driver Management

### School Drivers

- **Status**: ⏳ PENDING - After drivers are created

### Assign Drivers to School

- **Status**: ⏳ PENDING - After drivers are created

## Driver-Student Assignments

### Driver Student Assignments

- **Status**: ⏳ PENDING - After students and drivers are created

### Assign Students to Driver

- **Status**: ⏳ PENDING - After students and drivers are created
