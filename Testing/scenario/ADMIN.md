# Ping Parent Admin Portal - QA Testing Checklist & Test Cases

**App:** Ping Parent Admin Portal (Web - Admin Dashboard)  
**Version:** TBD  
**Date:** March 13, 2026  
**Tester:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_  
**Platform(s):** Chrome, Firefox, Safari, Edge (Web)

---

## 📋 QUICK REFERENCE CHECKLIST

Use this section for rapid testing. Check off each item as you complete validation.

### Authentication & Access Control

- [ ] Admin login with valid credentials
- [ ] Admin login with invalid credentials
- [ ] Email verification during signup
- [ ] Session persistence after browser refresh
- [ ] Session timeout after inactivity
- [ ] Two-factor authentication (if enabled)
- [ ] Password reset via email
- [ ] Role-based access control (RBAC)
- [ ] Permission restrictions enforced

### Dashboard Overview

- [ ] Dashboard loads correctly on first visit
- [ ] Key metrics/statistics displayed
- [ ] Data refresh works (manual and auto)
- [ ] Filter options functional
- [ ] Date range selector works
- [ ] Export data functionality (CSV/PDF)
- [ ] Responsive design on different breakpoints
- [ ] Dark/Light theme toggle

### User Management (Admins, School Admins)

- [ ] Create new admin user
- [ ] Edit admin details
- [ ] Deactivate/suspend admin
- [ ] Reset admin password
- [ ] Assign role and permissions
- [ ] View admin activity logs
- [ ] Search and filter admin list
- [ ] Bulk actions on admins

### School Management

- [ ] Add new school
- [ ] Edit school details (name, address, contact)
- [ ] Upload school logo
- [ ] Activate/deactivate school
- [ ] View school statistics
- [ ] Manage school affiliations
- [ ] Search schools by name/location
- [ ] School approval workflow

### Student Management

- [ ] View all students
- [ ] Search students by name/ID
- [ ] Filter by school/class/status
- [ ] View student details
- [ ] Edit student information
- [ ] Approve/reject new students
- [ ] Suspend/activate students
- [ ] Bulk import students (CSV)
- [ ] View student history/activity

### Driver Management

- [ ] View driver list
- [ ] Search drivers by name/ID
- [ ] Add new driver
- [ ] Edit driver details
- [ ] Verify driver documents
- [ ] Approve/reject driver
- [ ] Suspend/deactivate driver
- [ ] View driver assignments
- [ ] Driver rating and reviews

### Assignment & Routes

- [ ] Create student-driver assignment
- [ ] View active assignments
- [ ] Reassign driver/student
- [ ] Cancel assignment
- [ ] View assignment history
- [ ] Route optimization view
- [ ] Schedule management

### Billing & Payments

- [ ] View billing overview/metrics
- [ ] Create/edit subscription plans
- [ ] View active subscriptions
- [ ] Process refunds
- [ ] View payment history
- [ ] Generate invoices
- [ ] Payment reconciliation
- [ ] Revenue reports

### Notifications & Communications

- [ ] Send bulk notifications
- [ ] View notification history
- [ ] Email template management
- [ ] SMS/Push notification setup
- [ ] Test notification delivery
- [ ] Notification scheduling
- [ ] View delivery reports

### Reports & Analytics

- [ ] Trip reports (completed/pending/cancelled)
- [ ] Revenue reports
- [ ] User statistics
- [ ] Performance metrics
- [ ] Custom report generation
- [ ] Report scheduling
- [ ] Data export/download
- [ ] Chart and graph rendering

### Settings & Configuration

- [ ] General settings (app name, logo, etc.)
- [ ] Email configuration
- [ ] SMS configuration (Razorpay/Twilio)
- [ ] Payment gateway secrets
- [ ] Subscription plan configuration
- [ ] Pricing adjustments
- [ ] System constants

### Audit & Security

- [ ] Audit log view and filtering
- [ ] User activity tracking
- [ ] Login history
- [ ] Data change history
- [ ] IP whitelist/blacklist
- [ ] Session management
- [ ] API key management

### Error & Exception Handling

- [ ] Network disconnection handling
- [ ] API timeout and retry
- [ ] Form validation (empty fields)
- [ ] Duplicate entry prevention
- [ ] Permission denial handling
- [ ] Page not found (404)
- [ ] Server error (500)
- [ ] Loading states and skeletons
- [ ] Empty states
- [ ] Error messages clarity

### UI/UX Validation

- [ ] Responsive layout (Desktop, Tablet)
- [ ] Text readability and alignment
- [ ] Images load correctly
- [ ] Navigation between pages smooth
- [ ] Loading indicators visible
- [ ] Buttons clickable and responsive
- [ ] Form fields clear and accessible
- [ ] Sidebar/Navigation functional
- [ ] Tables and data grids
- [ ] Pagination works correctly
- [ ] Search functionality
- [ ] Filter controls intuitive

### Performance

- [ ] Page load time < 3 seconds
- [ ] API response time acceptable
- [ ] Large data sets load smoothly
- [ ] No memory leaks
- [ ] CPU usage normal
- [ ] Smooth scrolling
- [ ] No visual lag

---

## 🧪 DETAILED TEST CASES

### 1️⃣ AUTHENTICATION & ACCESS CONTROL

#### TC-AUTH-001: Admin Login with Valid Credentials

**Test ID:** TC-AUTH-001  
**Feature:** Admin Authentication  
**Precondition:** Admin portal loaded, on login screen  
**Steps:**

1. Navigate to login page
2. Enter valid admin email (e.g., admin@pingparent.com)
3. Enter valid password
4. Click "Login" button
5. Wait for authentication

**Expected Result:**

- Credentials verified successfully
- User redirected to dashboard
- Session token created and stored
- User information loaded in header
- Navigation menu available

**UI/UX Notes:**

- Email input field focused by default
- Password masked with dots
- "Remember Me" checkbox available (optional)
- "Forgot Password" link visible
- Loading spinner during login

**Edge Cases:**

- Very long email address
- Email with special characters
- Case sensitivity in email
- Password with special characters

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-002: Admin Login with Invalid Credentials

**Test ID:** TC-AUTH-002  
**Feature:** Authentication Validation  
**Precondition:** On login screen  
**Steps:**

1. Enter unregistered email or wrong password
2. Click "Login" button
3. Observe error message
4. Try again with correct credentials

**Expected Result:**

- Login fails gracefully
- Error message: "Invalid email or password"
- User remains on login screen
- No sensitive information exposed
- Account not locked after one attempt

**UI/UX Notes:**

- Error message displayed in red
- Clear indication of failure
- Password field cleared

**Edge Cases:**

- Multiple failed attempts (lock after X attempts?)
- Email not registered
- Correct email, wrong password
- Empty email or password field

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-003: Email Verification During Signup

**Test ID:** TC-AUTH-003  
**Feature:** Email Verification  
**Precondition:** New admin signup in progress  
**Steps:**

1. Fill signup form with new email
2. Submit registration
3. Check email inbox for verification link
4. Click verification link
5. Return to app and verify account

**Expected Result:**

- Verification email sent successfully
- Email contains verification link
- Link valid and redirects to verification page
- Account activated after verification
- Can login with new account

**UI/UX Notes:**

- Confirmation message after signup
- Email verification required message
- Link expiration (24 hours recommended)
- Resend email option

**Edge Cases:**

- Verification link expired
- Using unversified account (access denied)
- Duplicate email registration attempt
- Network failure during email send

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-004: Session Persistence After Browser Refresh

**Test ID:** TC-AUTH-004  
**Feature:** Session Management  
**Precondition:** Admin logged in, on dashboard  
**Steps:**

1. Admin logged in successfully
2. Press F5 or click refresh button
3. Observe browser reload
4. Check if still logged in

**Expected Result:**

- Page refreshes
- Session maintained (user still logged in)
- Dashboard reloads with data
- No redirect to login
- Session token validated

**UI/UX Notes:**

- Loading spinner during refresh
- Smooth transition to dashboard
- No data loss

**Edge Cases:**

- Session token expired during refresh
- Network error during refresh
- Browser cleared cookies

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-005: Session Timeout After Inactivity

**Test ID:** TC-AUTH-005  
**Feature:** Session Timeout  
**Precondition:** Admin logged in  
**Steps:**

1. Admin logged in, on dashboard
2. Leave browser idle for 30+ minutes (or configured timeout)
3. Attempt action (click button, navigate)
4. Observe session timeout handling

**Expected Result:**

- Session automatically logged out after timeout
- User redirected to login page
- Message: "Session expired, please login again"
- Unsaved data not persisted (for safety)
- Can login again immediately

**UI/UX Notes:**

- Clear timeout warning (optional countdown timer)
- Graceful logout message
- Login form ready

**Edge Cases:**

- Exact timeout boundary (edge case timing)
- Activity just before timeout (session extends)
- New tab opened during timeout
- API call during timeout

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-006: Password Reset via Email

**Test ID:** TC-AUTH-006  
**Feature:** Password Reset  
**Precondition:** On login page, forgotten password  
**Steps:**

1. Click "Forgot Password" link
2. Enter registered email
3. Receive reset email
4. Click reset link in email
5. Enter new password
6. Login with new password

**Expected Result:**

- Password reset email sent
- Reset link valid for 24 hours
- Link redirects to password change form
- New password set successfully
- Can login with new password
- Old password no longer works

**UI/UX Notes:**

- Confirmation message after email sent
- Clear instructions in email
- Password strength indicator
- Confirmation after password changed

**Edge Cases:**

- Multiple reset requests (new link invalidates old)
- Reset link expired
- Incorrect email format
- Password reset attempt for unregistered email

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-AUTH-007: Role-Based Access Control (RBAC)

**Test ID:** TC-AUTH-007  
**Feature:** Permission Management  
**Precondition:** Multiple admin accounts with different roles  
**Steps:**

1. Login as Super Admin
2. Verify access to all sections
3. Logout and login as School Admin
4. Verify limited access (only school data)
5. Logout and login as Support Admin
6. Verify support-only access

**Expected Result:**

- Super Admin: Full access to all features
- School Admin: Access only to own school data
- Support Admin: Limited to support/chat features
- Restricted sections show "Access Denied"
- Sidebar menu updates per role
- API requests rejected for unauthorized access

**UI/UX Notes:**

- Menu items greyed out for restricted access
- Clear "Access Denied" messages
- No system errors, graceful permission handling

**Edge Cases:**

- Permission changes while logged in
- Role with no permissions
- Unauthorized URL access

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 2️⃣ DASHBOARD OVERVIEW

#### TC-DASH-001: Dashboard Loads Correctly on First Visit

**Test ID:** TC-DASH-001  
**Feature:** Dashboard Initialization  
**Precondition:** Admin logged in, first dashboard visit  
**Steps:**

1. Admin logs in
2. Dashboard page loads
3. Wait for all widgets to render
4. Check all metrics displayed

**Expected Result:**

- Dashboard loads within 3 seconds
- All key metrics visible (revenue, users, trips, etc.)
- No visual glitches or overlapping elements
- Charts and graphs rendered properly
- Loading skeletons shown during data fetch
- Data displays after loading completes

**UI/UX Notes:**

- Skeleton loaders visible during fetch
- Smooth transition to real data
- Responsive grid layout
- No white/blank spaces

**Edge Cases:**

- Very slow network (still shows skeletons)
- API failure (show error state)
- No data available (show "No data" message)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DASH-002: Key Metrics/Statistics Displayed

**Test ID:** TC-DASH-002  
**Feature:** Metrics Display  
**Precondition:** Dashboard loaded  
**Steps:**

1. View main dashboard metrics
2. Verify total revenue displayed
3. Verify active users count
4. Verify active trips
5. Verify completed trips
6. Check metrics accuracy

**Expected Result:**

- All key metrics visible in cards/widgets
- Numbers formatted correctly (currency with commas, etc.)
- Metrics match backend data
- No errors or missing values
- Metrics update when data changes
- Previous period comparison shown (if applicable)

**UI/UX Notes:**

- Large, readable numbers
- Clear labels for each metric
- Icons representing each metric
- Color coding for positive/negative trends

**Edge Cases:**

- Zero/null values (display as 0)
- Very large numbers (formatted with K, M, B)
- Missing data (show "--" or "N/A")

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DASH-003: Data Refresh Works (Manual and Auto)

**Test ID:** TC-DASH-003  
**Feature:** Data Refresh  
**Precondition:** Dashboard loaded with data  
**Steps:**

1. Wait for auto-refresh (if configured, typically 5-10 minutes)
2. Check metrics update automatically
3. Click manual refresh button
4. Verify data refreshes immediately
5. Check for new data

**Expected Result:**

- Auto-refresh updates data at configured interval
- Manual refresh updates immediately
- Loading indicator shown during refresh
- New data replaces old data seamlessly
- No page reload required
- Timestamp updated on refresh

**UI/UX Notes:**

- Refresh button clearly visible
- Loading spinner during refresh
- "Last updated" timestamp visible

**Edge Cases:**

- Refresh while editing something
- Network error during refresh
- Data unchanged after refresh
- Rapid refresh clicks (debounced?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DASH-004: Filter Options Functional

**Test ID:** TC-DASH-004  
**Feature:** Dashboard Filtering  
**Precondition:** Dashboard with filter controls  
**Steps:**

1. Identify filter options (school, date range, status, etc.)
2. Select filter criteria
3. Apply filter
4. Verify dashboard updates

**Expected Result:**

- Filters apply correctly
- Dashboard metrics update based on filter
- Filter values persist while on dashboard
- Multiple filters can be applied simultaneously
- "Clear Filters" option resets to default

**UI/UX Notes:**

- Filter controls clearly labeled
- Dropdown/select fields intuitive
- Visual indication of active filters
- Clear filters button visible

**Edge Cases:**

- No results for selected filter (show "No data")
- Invalid filter combination
- Filter persists after refresh (optional)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DASH-005: Date Range Selector Works

**Test ID:** TC-DASH-005  
**Feature:** Date Range Selection  
**Precondition:** Dashboard with date range picker  
**Steps:**

1. Click date range picker
2. Select start date
3. Select end date
4. Apply filter
5. Verify data for selected range

**Expected Result:**

- Date picker calendar opens
- Both start and end dates selectable
- Selected range highlighted
- Data filters to selected date range
- Charts and metrics update accordingly

**UI/UX Notes:**

- Calendar UI intuitive
- Clear date format displayed
- Preset ranges (Today, This Week, This Month, etc.)
- Visual indication of selected range

**Edge Cases:**

- End date before start date (error or swap)
- Same start and end date (single day range)
- Date range extends beyond available data
- No data in selected range

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 3️⃣ USER MANAGEMENT (Admins, School Admins)

#### TC-USER-001: Create New Admin User

**Test ID:** TC-USER-001  
**Feature:** Admin Creation  
**Precondition:** Super Admin logged in, on User Management screen  
**Steps:**

1. Click "Add New Admin" button
2. Fill in admin details (name, email, password)
3. Select role (Super Admin, School Admin, Support)
4. Select permissions if applicable
5. Click "Create" button

**Expected Result:**

- Admin created successfully
- User added to admin list
- Email notification sent to new admin
- Verification email if required
- Success message displayed

**UI/UX Notes:**

- Form fields clearly labeled
- Password strength indicator
- Role selection dropdown
- Confirmation dialog before creation

**Edge Cases:**

- Duplicate email (error: email already registered)
- Invalid email format
- Email domain restrictions
- Form submission without required fields

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-USER-002: Edit Admin Details

**Test ID:** TC-USER-002  
**Feature:** Admin Editing  
**Precondition:** Admin in list  
**Steps:**

1. Find admin in list
2. Click "Edit" button
3. Modify name or email
4. Change role if needed
5. Save changes

**Expected Result:**

- Admin details editable
- Changes saved successfully
- Success notification shown
- Updated info displays in list
- Changes effective immediately

**UI/UX Notes:**

- Pre-populated form with current data
- Clear save and cancel buttons
- Confirmation dialog for role changes

**Edge Cases:**

- Editing own account (role change warning)
- Email change to existing email
- Permission removal while admin in use

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-USER-003: Deactivate/Suspend Admin

**Test ID:** TC-USER-003  
**Feature:** Admin Deactivation  
**Precondition:** Active admin in list  
**Steps:**

1. Find admin to deactivate
2. Click "Deactivate" or toggle status
3. Confirm deactivation
4. Verify admin no longer active

**Expected Result:**

- Admin marked as inactive
- Suspended admin cannot login
- Status updates in admin list
- Success message displayed
- Can reactivate later if needed

**UI/UX Notes:**

- Confirmation dialog before deactivation
- Status badge shows "Inactive"
- Option to reactivate visible

**Edge Cases:**

- Deactivating self (warning)
- Deactivating last super admin (prevention?)
- Deactivating admin with active session

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-USER-004: View Admin Activity Logs

**Test ID:** TC-USER-004  
**Feature:** Activity Tracking  
**Precondition:** Admin created, on Admin Details page  
**Steps:**

1. Open admin profile/details
2. Navigate to Activity Log tab
3. View admin's recent actions
4. Filter by action type if available
5. View timestamps and details

**Expected Result:**

- Activity log displays all admin actions
- Timestamp for each action
- Action type clearly identified (Create, Edit, Delete, etc.)
- User/object affected shown
- Log pagination or scrolling works
- Can export logs if needed

**UI/UX Notes:**

- Chronological order (newest first)
- Clear action descriptions
- Relevant details for each action
- Filter options by date or action type

**Edge Cases:**

- No activity to display (empty state)
- Very large activity log (pagination)
- Sensitive data handling in logs

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 4️⃣ SCHOOL MANAGEMENT

#### TC-SCHOOL-001: Add New School

**Test ID:** TC-SCHOOL-001  
**Feature:** School Creation  
**Precondition:** Super Admin on Schools page  
**Steps:**

1. Click "Add School" button
2. Fill school details (name, address, contact)
3. Upload school logo
4. Select education board (if applicable)
5. Set classes offered
6. Click "Save" button

**Expected Result:**

- School created successfully
- Assigned unique school ID
- Details saved in system
- School appears in list
- Success notification shown

**UI/UX Notes:**

- Form wizard or single form page
- Address search/map integration
- Logo upload with preview
- Required field indicators

**Edge Cases:**

- Duplicate school name (warning or allowed)
- Missing required field
- Invalid phone/email format
- Logo file too large

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-SCHOOL-002: Edit School Details

**Test ID:** TC-SCHOOL-002  
**Feature:** School Editing  
**Precondition:** School in list  
**Steps:**

1. Find school in list
2. Click "Edit" button
3. Modify school details
4. Update address or contact info
5. Save changes

**Expected Result:**

- School details updated
- Changes persisted
- Students/data using this school unaffected
- Success notification displayed

**UI/UX Notes:**

- Pre-populated form with current data
- Clear save and cancel buttons
- Confirmation for significant changes

**Edge Cases:**

- Edit while students assigned
- Change school location
- Logo replacement

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-SCHOOL-003: Upload School Logo

**Test ID:** TC-SCHOOL-003  
**Feature:** Logo Upload  
**Precondition:** Adding or editing school  
**Steps:**

1. Click logo upload area
2. Select image file from computer
3. Crop/adjust if provided
4. Confirm upload
5. Verify logo displays

**Expected Result:**

- Logo uploaded successfully
- File size validated (< 2MB recommended)
- Logo displays in school profile and list
- Logo accessible in mobile app
- Persists after save

**UI/UX Notes:**

- Drag-drop upload support
- Preview before upload
- File format validation (PNG, JPG)
- Load indicator during upload

**Edge Cases:**

- File too large (error message)
- Invalid file type (error message)
- Upload failure (retry option)
- Replace existing logo

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 5️⃣ STUDENT MANAGEMENT

#### TC-STU-001: View All Students

**Test ID:** TC-STU-001  
**Feature:** Student List Display  
**Precondition:** Students exist in system, on Students page  
**Steps:**

1. Navigate to Students section
2. View student list/table
3. Check pagination if many students
4. Verify all student columns display

**Expected Result:**

- All students displayed in table
- Columns: Name, ID, School, Class, Parent, Status
- Pagination works (next/previous, page numbers)
- List loads within reasonable time
- No duplicate entries
- Loading indicator shown while fetching

**UI/UX Notes:**

- Data table with clear headers
- Row highlighting on hover
- Click row for details
- Pagination controls visible

**Edge Cases:**

- No students (empty state)
- Large dataset (1000+ students)
- Network delay during load

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-STU-002: Search Students

**Test ID:** TC-STU-002  
**Feature:** Student Search  
**Precondition:** On Students page  
**Steps:**

1. Locate search field
2. Type student name or ID
3. Results filter in real-time
4. Click on result to view details

**Expected Result:**

- Search filters students by name or ID
- Results update as user types (debounced)
- Matching students highlighted
- Non-matching students hidden
- Search clears when field emptied

**UI/UX Notes:**

- Search field prominent at top
- Clear placeholder text
- Search icon in field
- Results show immediately

**Edge Cases:**

- Search term too short (< 2 characters, limit results?)
- No matches found ("No results" message)
- Special characters in search

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-STU-003: Filter Students

**Test ID:** TC-STU-003  
**Feature:** Student Filtering  
**Precondition:** On Students page  
**Steps:**

1. Click filter button
2. Select filter criteria (School, Class, Status)
3. Apply filter
4. Verify list updates

**Expected Result:**

- Filters available: School, Class, Section, Status, Subscription Status
- Multiple filters can combine
- List updates to show only matching students
- Filter summary visible (e.g., "Filtered: 45 students")
- Clear filters button available

**UI/UX Notes:**

- Filter dropdown/modal clearly marked
- Active filter indicators
- Easy filter reset

**Edge Cases:**

- No students match filter (empty state)
- Multiple filters with conflicting results
- Filter persistence on refresh (optional)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-STU-004: Approve/Reject New Students

**Test ID:** TC-STU-004  
**Feature:** Student Approval Workflow  
**Precondition:** New students in "Pending" status  
**Steps:**

1. Find pending student in list or "Pending Approvals" section
2. View student details
3. Click "Approve" or "Reject" button
4. Add optional comment
5. Confirm action

**Expected Result:**

- Student status changes to "Approved" or "Rejected"
- Parent notified via email/SMS
- Student can now be assigned to driver (if approved)
- Rejected student can reapply or be contacted
- Action logged in audit trail

**UI/UX Notes:**

- Clear approval/rejection buttons
- Comment field for feedback
- Confirmation dialog
- Success notification

**Edge Cases:**

- Approving without reviewing details
- Rejection reason tracking
- Bulk approval of multiple students

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-STU-005: Bulk Import Students

**Test ID:** TC-STU-005  
**Feature:** Bulk Student Import  
**Precondition:** CSV file with student data prepared  
**Steps:**

1. Navigate to Students section
2. Click "Bulk Import" button
3. Select CSV file
4. Preview data
5. Confirm and upload
6. Monitor import progress

**Expected Result:**

- File uploaded successfully
- Preview shows data to be imported
- Import processes without errors
- Success: X students imported, Y errors
- Error log downloadable (if errors)
- Students visible in list after import
- Duplicate detection (if implemented)

**UI/UX Notes:**

- File format requirements visible
- Template download available
- Progress bar during import
- Error summary with line numbers
- Detailed error log export

**Edge Cases:**

- Duplicate entries in file
- Missing required columns
- Invalid data (wrong date format, etc.)
- File too large (> 10MB)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 6️⃣ DRIVER MANAGEMENT

#### TC-DRV-001: View Driver List

**Test ID:** TC-DRV-001  
**Feature:** Driver List Display  
**Precondition:** Drivers exist, on Drivers page  
**Steps:**

1. Navigate to Drivers section
2. View driver list/table
3. Check columns: Name, ID, Vehicle, Status, Rating
4. View pagination if applicable

**Expected Result:**

- All drivers displayed
- Columns with correct information
- Driver status visible (Active, Inactive, Pending)
- Rating displayed (if available)
- Pagination works
- No missing or duplicate entries

**UI/UX Notes:**

- Clear table layout
- Row selection possible (for bulk actions)
- Click row for driver details

**Edge Cases:**

- No drivers registered
- Large driver dataset
- Slow network load

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DRV-002: Add New Driver

**Test ID:** TC-DRV-002  
**Feature:** Driver Creation  
**Precondition:** On Drivers page, admin logged in  
**Steps:**

1. Click "Add Driver" button
2. Fill driver details (name, email, phone, vehicle type)
3. Upload identity documents
4. Upload vehicle registration
5. Click "Save" button

**Expected Result:**

- Driver created successfully
- Driver ID assigned
- Registration email sent
- Documents stored securely
- Driver status set to "Pending Verification"
- Success message displayed

**UI/UX Notes:**

- Multi-step form or wizard
- Document upload with preview
- Clear required field indicators
- File validation (PDF, image formats)

**Edge Cases:**

- Duplicate phone/email
- Document files too large
- Missing required documents
- Invalid phone format

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-DRV-003: Verify Driver Documents

**Test ID:** TC-DRV-003  
**Feature:** Document Verification  
**Precondition:** New driver with pending documents  
**Steps:**

1. Find driver in "Pending Verification" status
2. View driver details
3. Review uploaded documents (ID, License, Registration)
4. Verify information matches
5. Click "Approve" or "Request Revision"

**Expected Result:**

- Documents viewable in detail
- Can approve after verification
- Or can reject requesting new documents
- Driver status updated accordingly
- Driver notified of verification result
- Verified drivers available for assignment

**UI/UX Notes:**

- Document preview/zoom functionality
- Clear approve/reject buttons
- Comments field for feedback
- Document date/expiry visible

**Edge Cases:**

- Expired documents (warning)
- Document quality poor (request new)
- Missing documents (request)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 7️⃣ BILLING & PAYMENTS

#### TC-BIL-001: View Billing Overview

**Test ID:** TC-BIL-001  
**Feature:** Billing Dashboard  
**Precondition:** On Billing/Revenue section  
**Steps:**

1. Navigate to Billing section
2. View revenue overview
3. Check total revenue for period
4. View subscription count
5. Check payment success rate

**Expected Result:**

- Key billing metrics displayed
- Revenue calculated correctly
- Subscription data accurate
- Charts visualizing revenue trends
- All data loads without errors

**UI/UX Notes:**

- Dashboard layout clear and organized
- Charts interactive (hover for details)
- Date range selector available
- Export options visible

**Edge Cases:**

- No data for period (show 0 or empty state)
- Missing metrics (show error/N/A)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-BIL-002: Create/Edit Subscription Plans

**Test ID:** TC-BIL-002  
**Feature:** Plan Management  
**Precondition:** On Subscription Plans page  
**Steps:**

1. Click "Create Plan" or edit existing
2. Fill plan details (name, price, duration, features)
3. Set features included
4. Save plan

**Expected Result:**

- New plan created with unique ID
- Plan details saved and validated
- Plan available for subscription
- Can edit or delete plan
- Success notification displayed

**UI/UX Notes:**

- Form with clear fields
- Feature checklist
- Price input with currency selector
- Duration options (Monthly, Yearly, Custom)

**Edge Cases:**

- Duplicate plan name
- Price format validation
- Plan editing affecting existing subscribers

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-BIL-003: Process Refunds

**Test ID:** TC-BIL-003  
**Feature:** Refund Processing  
**Precondition:** Completed payment transaction  
**Steps:**

1. Find transaction to refund
2. Click "Refund" button
3. Enter refund amount (full or partial)
4. Add reason
5. Confirm refund

**Expected Result:**

- Refund processed successfully
- Funds returned to original payment method
- Parent notified of refund
- Subscription adjusted accordingly (if applicable)
- Transaction marked as refunded
- Audit trail updated

**UI/UX Notes:**

- Refund confirmation dialog
- Amount validation
- Reason/comment field
- Processing status indication

**Edge Cases:**

- Partial refund
- Refund after subscription cancellation
- Payment method no longer valid
- Refund exceeding transaction amount

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-BIL-004: View Payment History

**Test ID:** TC-BIL-004  
**Feature:** Payment Records  
**Precondition:** On Payment History page  
**Steps:**

1. View all payments/transactions
2. Check columns: Date, Customer, Amount, Status, Plan
3. Filter by date range
4. Search for specific transaction
5. View transaction details

**Expected Result:**

- All transactions displayed
- Date, amount, status clearly shown
- Payment method visible (last 4 digits if card)
- Status: Success, Failed, Pending, Refunded
- Transaction details viewable
- Search and filter working

**UI/UX Notes:**

- Table with sortable columns
- Status color-coded
- Click row for details
- Export to CSV/PDF available

**Edge Cases:**

- Failed transactions shown separately
- Large transaction history (pagination)
- Missing payment method info

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 8️⃣ NOTIFICATIONS & COMMUNICATIONS

#### TC-NOTIF-001: Send Bulk Notifications

**Test ID:** TC-NOTIF-001  
**Feature:** Bulk Messaging  
**Precondition:** On Notifications section  
**Steps:**

1. Click "Send Notification"
2. Select recipient group (All Users, School, Parents, etc.)
3. Write message
4. Select channels (SMS, Email, In-App)
5. Schedule or send immediately
6. Confirm

**Expected Result:**

- Notification sent to selected recipients
- Delivery tracked and reported
- Unsubscribed users excluded
- Notification appears in message history
- Recipients receive on selected channels
- Success message with send count

**UI/UX Notes:**

- Clear recipient selection
- Message preview
- Character count for SMS
- Delivery status dashboard

**Edge Cases:**

- No valid recipients
- Invalid phone numbers in recipient list
- Message too long for SMS
- Network error during send

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-NOTIF-002: View Notification History

**Test ID:** TC-NOTIF-002  
**Feature:** Message Tracking  
**Precondition:** Notifications sent, on Notification History  
**Steps:**

1. Navigate to Notification History
2. View sent messages
3. Check recipient count for each
4. View delivery status
5. Filter by date or type

**Expected Result:**

- All sent notifications listed
- Date, recipient count, delivery count shown
- Status: Sent, Delivered, Failed
- Can view message content by clicking
- Filter and search working
- No data missing

**UI/UX Notes:**

- Table format with key details
- Click for full message view
- Status indicators (green/red/yellow)
- Export available

**Edge Cases:**

- Very old notifications
- Large number of notifications (pagination)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 9️⃣ REPORTS & ANALYTICS

#### TC-REP-001: Trip Reports

**Test ID:** TC-REP-001  
**Feature:** Trip Analytics  
**Precondition:** On Reports section  
**Steps:**

1. Navigate to Trip Reports
2. Select date range
3. View trip statistics (total, completed, cancelled)
4. Check completion rate
5. Export report

**Expected Result:**

- Report shows all trip data for period
- Completed trips count accurate
- Cancelled trips with reasons shown
- Average completion time displayed
- Charts visualizing data
- Can export to CSV/PDF

**UI/UX Notes:**

- Clear report layout
- Interactive charts with hover details
- Filter options available
- Print and export buttons visible

**Edge Cases:**

- No trips in period (show 0)
- Very large dataset (handling performance)
- Export format options

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-REP-002: Revenue Reports

**Test ID:** TC-REP-002  
**Feature:** Financial Reports  
**Precondition:** On Revenue Reports  
**Steps:**

1. View revenue data for period
2. Check by subscription plan
3. Check by school (if multi-tenant)
4. Download detailed report

**Expected Result:**

- Revenue accurately calculated
- Breakdown by plan shown
- Trends visualized in charts
- Detailed expense/revenue ledger available
- Report exportable

**UI/UX Notes:**

- Financial data clearly presented
- Currency consistently formatted
- Chart types: Bar, Line, Pie for different views

**Edge Cases:**

- No revenue in period
- Refunds handled correctly in totals
- Multi-currency handling (if applicable)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 🔟 ERROR & EXCEPTION HANDLING

#### TC-ERR-001: Network Disconnection Handling

**Test ID:** TC-ERR-001  
**Feature:** Network Error Handling  
**Precondition:** Admin performing operation, network disconnects  
**Steps:**

1. Disconnect WiFi/Network
2. Attempt operation (save, submit form)
3. Observe error handling
4. Reconnect network
5. Retry operation

**Expected Result:**

- Operation fails gracefully
- Error message: "No internet connection"
- Retry button available
- No app crash
- Can retry after reconnection
- Data not partially saved

**UI/UX Notes:**

- Clear error message (not technical)
- "Retry" button visible
- Network status indicator optional
- No frozen UI

**Edge Cases:**

- Intermittent network drops
- Slow network vs no network distinction
- Multiple failed retries

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-ERR-002: API Timeout & Retry

**Test ID:** TC-ERR-002  
**Feature:** Timeout Handling  
**Precondition:** API slow or timing out  
**Steps:**

1. Trigger slow API call
2. Wait for timeout
3. Observe error
4. Click retry
5. Verify successful completion on retry

**Expected Result:**

- Timeout error after reasonable delay (30-60 seconds)
- User-friendly message displayed
- Retry button available
- Retry resumes operation
- Success on retry or repeated error after 2-3 attempts

**UI/UX Notes:**

- Timeout dialog/modal
- Loading indicator during wait
- Helpful "Please wait" message

**Edge Cases:**

- API actually failed (retry won't help)
- Multiple timeout retries with same result

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-ERR-003: Form Validation

**Test ID:** TC-ERR-003  
**Feature:** Input Validation  
**Precondition:** On any form (create school, admin, etc.)  
**Steps:**

1. Leave required field empty
2. Submit form
3. Observe validation error
4. Fill field and resubmit

**Expected Result:**

- Form not submitted
- Error message below empty field
- Field highlighted or shaken
- All required fields marked with \*
- Error cleared when user enters data
- Submit only succeeds with all fields filled

**UI/UX Notes:**

- Inline error messages in red
- Required field indicators clear
- Helpful placeholder text
- Field border highlights on error

**Edge Cases:**

- Multiple required fields empty (show all errors?)
- Field with only spaces (treated as empty?)
- Invalid format (email, phone, etc.)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

### 1️⃣1️⃣ UI/UX VALIDATION

#### TC-UI-001: Responsive Design (Desktop/Tablet)

**Test ID:** TC-UI-001  
**Feature:** Responsive Layout  
**Precondition:** Admin portal open on different devices  
**Steps:**

1. View on desktop (1920x1080)
2. View on tablet (768px width)
3. View on small desktop (1366px)
4. Check layout adaptation
5. Check navigation sidebar behavior

**Expected Result:**

- Layout adapts to screen size
- No horizontal scrolling (except for tables)
- Content readable on all sizes
- Navigation accessible on tablet
- Tables have horizontal scroll if needed
- Images scale appropriately

**UI/UX Notes:**

- No overlapping elements
- Proper spacing and padding
- Touch-friendly button sizes on tablet
- Sidebar collapsible on smaller screens

**Edge Cases:**

- Extremely small screen (< 768px - mobile not primary target but check)
- Very wide screen (> 2560px)
- Portrait vs Landscape on tablet

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-UI-002: Text Readability & Alignment

**Test ID:** TC-UI-002  
**Feature:** Text Rendering  
**Precondition:** Various pages with text content  
**Steps:**

1. Check text contrast on backgrounds
2. Verify text alignment (left, center, right)
3. Check font sizes appropriate
4. Check line spacing adequate
5. Check text truncation with ellipsis

**Expected Result:**

- All text readable (WCAG AA contrast minimum)
- Text alignment matches design
- Font sizes appropriate (minimum 12px for body)
- Line spacing adequate
- Long text truncated with "..." not cut off

**UI/UX Notes:**

- Contrast ratio at least 4.5:1
- Alignment consistent throughout
- Clear hierarchy in font sizes
- Line height adequate (1.5 recommended)

**Edge Cases:**

- Very long text in fixed containers
- Non-English characters
- Emoji rendering

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

#### TC-UI-003: Data Tables & Grids

**Test ID:** TC-UI-003  
**Feature:** Table Display  
**Precondition:** On page with data table (Students, Drivers, etc.)  
**Steps:**

1. View table with data
2. Check column headers clear
3. Check row data aligned
4. Test sorting by column (if available)
5. Check pagination controls
6. Check responsive behavior on smaller screens

**Expected Result:**

- Table displays data clearly
- Column headers visible and descriptive
- Row data properly aligned
- Sorting works (ascending/descending)
- Pagination functional and intuitive
- Scrollable on small screens
- Alternating row colors (optional but helps readability)

**UI/UX Notes:**

- Clear header styling
- Good row spacing
- Hover effect on rows
- Column resizing if needed
- Sticky header on scroll (optional)

**Edge Cases:**

- Empty table (show "No data" message)
- Single row
- Many columns requiring scroll
- Very long cell content

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

---

## 📊 SUMMARY

Total Test Cases: **50+**

- Authentication: 6 tests
- Dashboard: 5 tests
- User Management: 4 tests
- Student Management: 5 tests
- Driver Management: 3 tests
- Billing: 4 tests
- Notifications: 2 tests
- Reports: 2 tests
- Error Handling: 3 tests
- UI/UX: 3 tests

---

## 🎯 TESTING PRIORITIES

### Critical (P0)

- Authentication flows
- Payment processing
- Data persistence
- User access control

### High (P1)

- Dashboard functionality
- User management
- Student/Driver management
- Report generation

### Medium (P2)

- UI/UX responsiveness
- Navigation
- Loading states
- Notification delivery

### Low (P3)

- Theme preferences
- Advanced filtering
- Report customization
- Performance optimization

---

## 📝 NOTES FOR TESTERS

1. Always test in multiple browsers (Chrome, Firefox, Safari, Edge)
2. Clear browser cache between major test cycles
3. Test with various network speeds
4. Document exact steps to reproduce any issues
5. Include screenshots for UI/UX issues
6. Note any performance issues or slow operations
7. Verify all error messages are user-friendly
8. Check that all features work as documented
9. Test edge cases thoroughly
10. Verify data consistency across operations

---

**Last Updated:** March 13, 2026  
**Version:** 1.0
