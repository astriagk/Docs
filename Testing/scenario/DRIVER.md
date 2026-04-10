# Ping Parent Driver - QA Testing Checklist & Test Cases

**App:** Ping Parent Driver (Flutter Mobile - Driver App)  
**Version:** TBD  
**Date:** March 13, 2026  
**Tester:** \_**\_\_\_\_\_\_**  
**Platform(s):** Android / iOS

---

## 📋 QUICK REFERENCE CHECKLIST

Use this section for rapid testing. Check off each item as you complete validation.

### Authentication & Identity

- [ ] Signup with valid phone number
- [ ] Signup with invalid phone number (validation error)
- [ ] OTP verification during signup
- [ ] Sign In with existing account
- [ ] Sign In with wrong OTP
- [ ] Network failure during OTP send
- [ ] Session persistence after app restart

### Driver Profile Management

- [ ] Add driver profile details (name, email, phone)
- [ ] Edit existing profile details
- [ ] Upload profile photo (camera)
- [ ] Upload profile photo (gallery)
- [ ] Replace/delete profile photo
- [ ] Add emergency contact information
- [ ] Edit emergency contact details
- [ ] Upload driver license document
- [ ] Upload background check certificate

### Vehicle Management

- [ ] Add vehicle details (make, model, year)
- [ ] Add vehicle registration number
- [ ] Add vehicle license plate
- [ ] Upload vehicle photos (exterior)
- [ ] Upload vehicle photos (interior)
- [ ] Upload vehicle registration document
- [ ] Upload insurance certificate
- [ ] Edit vehicle details
- [ ] View vehicle details

### Trip Management

- [ ] View incoming trip requests
- [ ] Accept trip request
- [ ] Reject trip request
- [ ] Cancel accepted trip (before pickup)
- [ ] View accepted trip details
- [ ] Navigate to pickup location
- [ ] Confirm student pickup
- [ ] Start trip tracking
- [ ] Navigate to drop-off location
- [ ] Confirm student drop-off
- [ ] Complete trip

### Real-Time Tracking & Sharing

- [ ] Enable location sharing during trip
- [ ] Disable location sharing
- [ ] Real-time GPS location update
- [ ] Location accuracy validation
- [ ] Route optimization display
- [ ] Estimated arrival time (ETA) calculation
- [ ] Automatic location pause when offline
- [ ] Location resume after reconnection

### Availability & Status Management

- [ ] Set availability status (Online/Offline)
- [ ] Toggle availability with confirmation
- [ ] View current availability status
- [ ] Automatic status change (based on activity)
- [ ] Schedule availability (if supported)
- [ ] Pause trip requests temporarily
- [ ] Resume accepting trip requests

### Communication

- [ ] Call parent from trip details
- [ ] Send SMS to parent (if supported)
- [ ] In-app messaging with parent
- [ ] Receive parent messages during trip
- [ ] View message history
- [ ] Emergency notification to parent

### Earnings & Payments

- [ ] View daily earnings
- [ ] View weekly earnings summary
- [ ] View monthly earnings report
- [ ] View earnings breakdown (trips, bonuses, deductions)
- [ ] View payment history
- [ ] View upcoming payment date
- [ ] View bank account details
- [ ] Update bank account for payments
- [ ] View earned incentives/bonuses

### Rating & Reviews

- [ ] View driver rating/score
- [ ] View trip-wise ratings from parents
- [ ] View feedback comments
- [ ] Respond to feedback (optional)
- [ ] View rating trends over time
- [ ] Understand rating criteria

### Documentation & Verification

- [ ] View all submitted documents
- [ ] Check document verification status
- [ ] Resubmit rejected documents
- [ ] Upload new document version
- [ ] View document expiry alerts
- [ ] Set document renewal reminders

### Additional Features

- [ ] Push notifications for trip requests
- [ ] Location permission prompt
- [ ] Camera permission prompt
- [ ] Phone call permission prompt
- [ ] SMS permission prompt
- [ ] Contact support
- [ ] Logout from settings
- [ ] Session cleared after logout
- [ ] Dark/Light theme toggle (if applicable)

### Error & Edge Cases

- [ ] Network disconnection during trip
- [ ] Location service unavailable
- [ ] GPS signal loss
- [ ] API timeout handling & retry
- [ ] Empty field validation
- [ ] Duplicate entry prevention
- [ ] Permission denial handling
- [ ] App crash recovery
- [ ] Loading skeleton states
- [ ] Empty state displays
- [ ] Error state displays
- [ ] Trip request while offline

### UI/UX Validation

- [ ] Responsive layout (portrait orientation)
- [ ] All text readable and properly aligned
- [ ] Images load correctly
- [ ] Navigation between screens smooth
- [ ] Loading indicators visible
- [ ] Buttons clickable and responsive
- [ ] Form fields clear and accessible
- [ ] Bottom navigation visible on all screens
- [ ] Map functionality smooth
- [ ] Location accuracy acceptable

---

## 🧪 DETAILED TEST CASES

### 1️⃣ AUTHENTICATION & IDENTITY

#### TC-AUTH-001: Signup with Valid Phone Number

**Test ID:** TC-AUTH-001  
**Feature:** Signup  
**Precondition:** App is installed and fresh/logged out  
**Steps:**

1. Navigate to Signup screen
2. Enter valid phone number (e.g., +91 9876543210)
3. Tap "Sign Up" button
4. Verify OTP is sent

**Expected Result:**

- OTP sent message displayed
- User navigated to OTP verification screen
- OTP input field visible

**UI/UX Notes:**

- Phone input field should show country code selector
- Loading state (spinner) visible during API call
- Success feedback via snackbar

**Edge Cases:**

- Very long phone number
- Phone number with special characters
- Empty phone field submission

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-AUTH-002: Signup with Invalid Phone Number

**Test ID:** TC-AUTH-002  
**Feature:** Signup Validation  
**Precondition:** On Signup screen  
**Steps:**

1. Enter invalid phone number (e.g., "123", "abc", empty)
2. Tap "Sign Up" button
3. Observe validation error

**Expected Result:**

- Error message displayed: "Please enter a valid phone number"
- User remains on signup screen
- No API call made

**UI/UX Notes:**

- Error message displayed in red below phone field
- Form not submitted

**Edge Cases:**

- National format vs international format
- Existing phone number (already registered)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-AUTH-003: OTP Verification During Signup

**Test ID:** TC-AUTH-003  
**Feature:** Signup OTP Verification  
**Precondition:** OTP sent, on OTP screen  
**Steps:**

1. Receive OTP via SMS (or check test OTP if mocked)
2. Enter 6-digit OTP in input field
3. Tap "Verify" button
4. Wait for verification

**Expected Result:**

- OTP verified successfully
- If new user: Navigate to driver profile setup screen
- Session token saved
- User data persisted locally

**UI/UX Notes:**

- OTP input field should auto-advance after 6 digits
- Resend OTP link visible (cooldown timer)
- Loading state visible during verification

**Edge Cases:**

- Wrong OTP entered (show error)
- OTP timeout
- Resend OTP before cooldown
- Network failure during OTP verification

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-AUTH-004: Sign In with Existing Account

**Test ID:** TC-AUTH-004  
**Feature:** Sign In  
**Precondition:** Account previously created, app logged out  
**Steps:**

1. Navigate to Sign In screen
2. Enter registered phone number
3. Tap "Get OTP" button
4. Receive OTP
5. Enter OTP and verify

**Expected Result:**

- User successfully logged in
- Dashboard/home screen displayed
- Previous session data available

**UI/UX Notes:**

- Country code selector available
- Loading spinner during OTP send
- OTP screen shows resend option

**Edge Cases:**

- Unregistered phone number
- Account suspended/deactivated
- Multiple failed OTP attempts (lock account?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-AUTH-005: Session Persistence After App Restart

**Test ID:** TC-AUTH-005  
**Feature:** Session Management  
**Precondition:** User logged in  
**Steps:**

1. User logged in, on dashboard
2. Force close app
3. Reopen app
4. Observe screen

**Expected Result:**

- User automatically logged in (no login screen)
- Dashboard displayed
- Session token still valid
- User data available

**UI/UX Notes:**

- Initial splash screen may be shown
- Smooth transition to dashboard
- Loading state if fetching fresh data

**Edge Cases:**

- Session token expired
- Session cleared (manually or by timeout)
- Network unavailable on restart

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 2️⃣ DRIVER PROFILE MANAGEMENT

#### TC-PROF-001: Add Driver Profile Details

**Test ID:** TC-PROF-001  
**Feature:** Profile Setup/Update  
**Precondition:** User logged in, on Profile screen  
**Steps:**

1. Navigate to Profile screen
2. Enter full name (e.g., "Ahmed Khan")
3. Enter email (e.g., "ahmed@example.com")
4. Verify phone number (pre-filled, read-only)
5. Tap "Save" button
6. Wait for confirmation

**Expected Result:**

- Profile saved successfully
- Success message displayed
- Data persisted in user session
- Fields retain entered values

**UI/UX Notes:**

- Name field should accept letters and spaces only
- Email field should validate email format
- Save button disabled if required fields empty
- Loading spinner during save
- Phone field read-only for security

**Edge Cases:**

- Empty name field
- Invalid email format
- Very long name (200+ characters)
- Special characters in name

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-002: Edit Profile Details

**Test ID:** TC-PROF-002  
**Feature:** Profile Update  
**Precondition:** User has existing profile details  
**Steps:**

1. Navigate to Profile screen
2. Modify name and/or email
3. Tap "Save" button
4. Verify changes

**Expected Result:**

- Changes saved successfully
- Updated data reflected in UI
- System confirms update with "Profile updated successfully"
- Phone number remains unchanged (read-only)

**UI/UX Notes:**

- Phone field should be read-only
- Highlight changed fields (optional)
- Success notification via toast/snackbar

**Edge Cases:**

- Duplicate email (if unique constraint exists)
- Network failure during save
- Partial update (save only name, not email)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-003: Upload Profile Photo from Camera

**Test ID:** TC-PROF-003  
**Feature:** Profile Photo Upload (Camera)  
**Precondition:** Camera permission granted (or test permission prompt)  
**Steps:**

1. Navigate to Profile screen
2. Tap profile photo area
3. Select "Camera" option
4. Grant camera permission (if prompted)
5. Take photo
6. Confirm and save

**Expected Result:**

- Camera app opens or in-app camera view
- Photo captured successfully
- Photo preview shown
- Photo uploaded and saved to profile
- Photo instantly displays in UI

**UI/UX Notes:**

- Camera permission prompt should appear (first time)
- Photo preview dialog before final upload
- Loading state visible during upload
- Profile photo displays in all relevant screens

**Edge Cases:**

- Permission denied (handle gracefully)
- Camera unavailable
- Photo upload failure
- Network disconnection during upload

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-004: Upload Profile Photo from Gallery

**Test ID:** TC-PROF-004  
**Feature:** Profile Photo Upload (Gallery)  
**Precondition:** Gallery permission granted  
**Steps:**

1. Navigate to Profile screen
2. Tap profile photo area
3. Select "Gallery" option
4. Grant gallery permission (if prompted)
5. Select photo from gallery
6. Confirm and save

**Expected Result:**

- Gallery app/picker opens
- Selected photo shown in preview
- Photo uploaded and saved
- Profile updated with new photo
- Photo displays across app

**UI/UX Notes:**

- Gallery permission prompt on first use
- Preview with crop/confirm options
- Loading state during upload
- Old photo replaced with new one

**Edge Cases:**

- Permission denied
- No photos in gallery
- Invalid file format selected
- Photo too large

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-005: Replace/Delete Profile Photo

**Test ID:** TC-PROF-005  
**Feature:** Profile Photo Management  
**Precondition:** User has existing profile photo  
**Steps:**

1. Navigate to Profile screen
2. Tap existing profile photo
3. Select "Change Photo" or "Delete" option
4. Choose new photo or confirm deletion
5. Confirm action

**Expected Result:**

- Old photo replaced with new one or deleted
- Success message displayed
- New photo persists after app restart
- Default avatar shown if deleted
- All screens reflect change

**UI/UX Notes:**

- Option to delete photo should be available
- Clear confirmation dialog before deletion
- Placeholder/default avatar if no photo exists

**Edge Cases:**

- Delete photo (show default avatar)
- Replace deleted photo
- Upload same photo twice

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-006: Add Emergency Contact Information

**Test ID:** TC-PROF-006  
**Feature:** Emergency Contact Setup  
**Precondition:** User logged in, on Profile screen  
**Steps:**

1. Navigate to Emergency Contacts section
2. Tap "Add Emergency Contact" button
3. Enter contact name (e.g., "Mom")
4. Enter phone number
5. Select relationship (optional)
6. Tap "Save" button

**Expected Result:**

- Emergency contact saved successfully
- Contact appears in emergency contacts list
- Contact phone number can be called in emergencies
- Success confirmation shown
- Data persists after app restart

**UI/UX Notes:**

- Fields clearly labeled
- Phone input with country code selector
- Relationship dropdown with common options
- Save button enabled when required fields filled

**Edge Cases:**

- Invalid phone number
- Duplicate emergency contact
- Empty contact name
- Add multiple emergency contacts

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-PROF-007: Edit Emergency Contact Details

**Test ID:** TC-PROF-007  
**Feature:** Emergency Contact Update  
**Precondition:** Emergency contact exists  
**Steps:**

1. Navigate to Emergency Contacts
2. Tap existing contact
3. Edit name, phone, or relationship
4. Tap "Save" button
5. Verify changes

**Expected Result:**

- Contact details updated successfully
- Updated information displayed in list
- Changes persist
- Success confirmation shown

**UI/UX Notes:**

- Pre-populated form with existing data
- Clear save and cancel buttons
- Confirmation for major changes

**Edge Cases:**

- Edit to same values (no change)
- Delete emergency contact during edit
- Network failure during save

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 3️⃣ DRIVER LICENSE & DOCUMENTS

#### TC-DOC-001: Upload Driver License Document

**Test ID:** TC-DOC-001  
**Feature:** License Document Upload  
**Precondition:** On Documents/Verification screen  
**Steps:**

1. Navigate to Documents section
2. Tap "Upload License" option
3. Take photo or select from gallery
4. Confirm document quality
5. Tap "Upload" button

**Expected Result:**

- Document uploaded successfully
- Upload status displayed (pending review)
- Document appears in documents list
- Success confirmation shown
- User can resubmit if rejected

**UI/UX Notes:**

- Clear instructions for document photo
- Good lighting and focus emphasized
- Preview of document before upload
- Loading state during upload
- Status badge (pending/approved/rejected)

**Edge Cases:**

- Document photo blur/poor quality
- Document expired
- Invalid document format
- Network failure during upload

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-DOC-002: Upload Background Check Certificate

**Test ID:** TC-DOC-002  
**Feature:** Background Check Upload  
**Precondition:** On Documents screen  
**Steps:**

1. Navigate to Documents section
2. Tap "Upload Background Check" option
3. Select certificate file/photo
4. Enter certificate reference number (if applicable)
5. Tap "Upload" button

**Expected Result:**

- Certificate uploaded successfully
- Verification status shown
- Certificate appears in documents list
- Can upload new version if expired

**UI/UX Notes:**

- Clear instructions
- Reference number field
- Preview before upload
- Status tracking (pending/approved/rejected)

**Edge Cases:**

- Certificate expired
- File format not supported
- Reference number validation

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-DOC-003: View Document Verification Status

**Test ID:** TC-DOC-003  
**Feature:** Document Status Display  
**Precondition:** Documents uploaded  
**Steps:**

1. Navigate to Documents section
2. View all submitted documents
3. Check verification status for each
4. View upload date and expiry date (if applicable)

**Expected Result:**

- All documents displayed with status
- Status clearly indicated (pending/approved/rejected)
- Expiry dates visible
- Rejection reason visible if rejected
- Clear next steps if action needed

**UI/UX Notes:**

- Status badge with appropriate color
- Timestamp of upload
- Expiry alert if document expiring soon
- Resubmit option if rejected

**Edge Cases:**

- Document pending for long time
- Multiple rejections
- Document about to expire

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 4️⃣ VEHICLE MANAGEMENT

#### TC-VEH-001: Add Vehicle Details

**Test ID:** TC-VEH-001  
**Feature:** Vehicle Information Setup  
**Precondition:** On Vehicle Management screen  
**Steps:**

1. Navigate to Add Vehicle section
2. Enter vehicle make (e.g., "Maruti")
3. Enter vehicle model (e.g., "Swift")
4. Enter vehicle year (e.g., "2022")
5. Enter registration number (plate)
6. Tap "Save" button

**Expected Result:**

- Vehicle details saved successfully
- Vehicle appears in vehicle list
- All details correctly stored
- Success confirmation shown
- Can add multiple vehicles (if supported)

**UI/UX Notes:**

- Dropdowns for make/model (pre-populated list)
- Year selector (range picker or input)
- Registration field with validation
- Save button enabled when required fields filled

**Edge Cases:**

- Duplicate registration number
- Invalid year (future or very old)
- Missing vehicle make or model
- Special characters in registration

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-VEH-002: Upload Vehicle Photos (Exterior)

**Test ID:** TC-VEH-002  
**Feature:** Vehicle Exterior Photos  
**Precondition:** Vehicle added, on Vehicle Details screen  
**Steps:**

1. Navigate to Edit Vehicle screen
2. Tap "Upload Vehicle Photos" section
3. Select "Exterior Photos" option
4. Take/select photos from multiple angles
5. Confirm and save

**Expected Result:**

- Photos uploaded successfully
- Multiple exterior angles captured (front, rear, sides)
- Photos display in vehicle details
- Loading state visible during upload
- Success confirmation shown

**UI/UX Notes:**

- Clear instructions on angles needed
- Multiple photo selection
- Preview gallery of uploaded photos
- Delete option for individual photos

**Edge Cases:**

- Poor lighting/quality
- Unclear vehicle registration plate
- Photos from wrong vehicle
- Network failure during upload

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-VEH-003: Upload Vehicle Photos (Interior)

**Test ID:** TC-VEH-003  
**Feature:** Vehicle Interior Photos  
**Precondition:** Vehicle added  
**Steps:**

1. Navigate to Edit Vehicle screen
2. Tap "Upload Vehicle Photos" section
3. Select "Interior Photos" option
4. Take/select interior photos (seats, dashboard, etc.)
5. Confirm and save

**Expected Result:**

- Interior photos uploaded successfully
- Multiple interior shots captured
- Photos display in vehicle details
- Combined with exterior photos in gallery
- Success confirmation shown

**UI/UX Notes:**

- Clear instructions on what to capture
- Multiple photo selection
- Preview gallery
- Clear labeling of interior/exterior

**Edge Cases:**

- Dark interior (poor visibility)
- Dirty vehicle interior
- Same angle repeated

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-VEH-004: Upload Vehicle Registration Document

**Test ID:** TC-VEH-004  
**Feature:** Vehicle Registration Upload  
**Precondition:** Vehicle added  
**Steps:**

1. Navigate to Vehicle Documents section
2. Tap "Upload Registration" option
3. Take photo or select document file
4. Confirm and save

**Expected Result:**

- Registration document uploaded
- Document visible in vehicle details
- Verification status shown
- Can view document details
- Expiry date tracked

**UI/UX Notes:**

- Clear instructions for document capture
- Preview before upload
- Status badge for verification
- Expiry alert if approaching

**Edge Cases:**

- Document expired
- Blurry document
- Invalid format

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-VEH-005: Upload Insurance Certificate

**Test ID:** TC-VEH-005  
**Feature:** Insurance Upload  
**Precondition:** Vehicle added  
**Steps:**

1. Navigate to Vehicle Documents section
2. Tap "Upload Insurance" option
3. Take photo or select certificate
4. Confirm and save

**Expected Result:**

- Insurance certificate uploaded
- Document visible in vehicle details
- Verification status shown
- Renewal date tracked
- Expiry alert if approaching

**UI/UX Notes:**

- Clear instructions
- Renewal date tracking
- Expiry reminder notifications

**Edge Cases:**

- Certificate expired
- Poor document quality
- Invalid certificate

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-VEH-006: Edit Vehicle Details

**Test ID:** TC-VEH-006  
**Feature:** Vehicle Information Update  
**Precondition:** Vehicle exists  
**Steps:**

1. Navigate to Vehicle List
2. Tap vehicle to open details
3. Tap "Edit" button
4. Modify vehicle details (make, model, year, etc.)
5. Tap "Save" button

**Expected Result:**

- Vehicle details updated successfully
- Changes reflected in vehicle list
- All users affected by vehicle change see updates
- Success confirmation shown

**UI/UX Notes:**

- Pre-populated form with existing data
- Clear save and cancel buttons
- Confirmation for major changes

**Edge Cases:**

- No actual changes, click save
- Duplicate registration attempt
- Network failure during save

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 5️⃣ TRIP MANAGEMENT

#### TC-TRIP-001: View Incoming Trip Requests

**Test ID:** TC-TRIP-001  
**Feature:** Trip Request Display  
**Precondition:** Driver is online, trip requests available  
**Steps:**

1. Set availability status to Online
2. Observe trip requests appearing
3. View multiple requests if available
4. Check request details (student name, pickup, destination)

**Expected Result:**

- Trip requests displayed in real-time
- Each request shows student, pickup location, destination
- Request details clear and readable
- Accept/Reject buttons visible
- Requests persist until action taken or auto-dismissed

**UI/UX Notes:**

- Trip card shows: student photo, name, pickup location, destination
- Dropdown or expandable details
- Sound/vibration notification for new request
- Request countdown timer (if applicable)

**Edge Cases:**

- No trip requests available
- Multiple requests rapid succession
- Request auto-cancel if not responded to
- Network delay in receiving requests

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-002: Accept Trip Request

**Test ID:** TC-TRIP-002  
**Feature:** Trip Acceptance  
**Precondition:** Trip request available on screen  
**Steps:**

1. View trip request details
2. Review pickup location, destination, student
3. Tap "Accept Trip" button
4. Verify acceptance confirmation
5. Observe trip moved to "Accepted Trips"

**Expected Result:**

- Trip accepted successfully
- Acceptance sent to parent/system
- Trip moved to Active/Current Trips list
- Trip details displayed for navigation
- Parent notified of driver acceptance
- Cannot accept another trip (if single-trip requirement)

**UI/UX Notes:**

- Large "Accept" button
- Confirmation message: "Trip accepted successfully"
- Transition to trip details/navigation screen
- Loading state during acceptance

**Edge Cases:**

- Network failure during acceptance
- Accept then immediately see another request
- System rejects acceptance (trip taken by another driver)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-003: Reject Trip Request

**Test ID:** TC-TRIP-003  
**Feature:** Trip Rejection  
**Precondition:** Trip request on screen  
**Steps:**

1. View trip request
2. Tap "Reject" button
3. Optionally select rejection reason
4. Confirm rejection

**Expected Result:**

- Trip rejected
- Request disappears from list
- Parent notified of rejection
- Another driver offered the trip
- Driver remains available for other requests

**UI/UX Notes:**

- Clear "Reject" button
- Optional reason selection (too far, busy, etc.)
- Confirmation dialog before reject
- No penalty for reasonable rejections

**Edge Cases:**

- No reason provided
- Reject then new request appears
- System penalizes excessive rejections

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-004: Cancel Accepted Trip (Before Pickup)

**Test ID:** TC-TRIP-004  
**Feature:** Trip Cancellation  
**Precondition:** Trip accepted but not yet picked up student  
**Steps:**

1. Navigate to Active Trip details
2. Tap "Cancel Trip" button
3. Select cancellation reason
4. Confirm cancellation
5. Verify trip cancelled

**Expected Result:**

- Trip cancelled successfully
- Parent notified of cancellation
- Cancellation reason sent to parent
- Trip removed from active list
- Driver available for other trips
- Cancellation recorded for rating/performance

**UI/UX Notes:**

- Clear "Cancel Trip" button
- Reason dropdown (emergency, vehicle issue, etc.)
- Confirmation dialog
- Warning about cancellation impact

**Edge Cases:**

- Cancel after driver already moving
- Frequent cancellations (rating impact)
- Cancel during poor network
- Parent dispute cancellation

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-005: View Accepted Trip Details

**Test ID:** TC-TRIP-005  
**Feature:** Trip Information Display  
**Precondition:** Trip accepted  
**Steps:**

1. Navigate to Active Trip
2. View complete trip details
3. Check: student name, photo, pickup location, destination
4. View parent contact information
5. View estimated time and distance

**Expected Result:**

- All trip details displayed clearly
- Student photo and information visible
- Pickup and drop-off addresses clear
- Parent contact info accessible
- Distance and time estimates shown
- Emergency contact visible

**UI/UX Notes:**

- Clean layout with organized information
- Large text for addresses
- Contact buttons (call, message)
- Map preview of route
- Emergency contact button prominent

**Edge Cases:**

- Missing student photo
- Incomplete address information
- Contact info unavailable

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-006: Navigate to Pickup Location

**Test ID:** TC-TRIP-006  
**Feature:** Navigation to Pickup  
**Precondition:** Trip accepted, trip details displayed  
**Steps:**

1. On trip details screen, locate pickup address
2. Tap "Navigate" button or map
3. Map/navigation app opens
4. Driver navigates to pickup location
5. Observe real-time progress

**Expected Result:**

- Navigation app (Google Maps/Apple Maps) opens
- Route to pickup location displayed
- Turn-by-turn directions available
- Distance and ETA shown
- Real-time updates during navigation
- Return to app after navigation

**UI/UX Notes:**

- "Navigate" button uses default maps app
- Back button to return to app
- Option to contact parent if lost
- Route alternatives if available

**Edge Cases:**

- No maps app installed
- GPS not enabled
- Poor signals affecting navigation
- Address not found on map

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-007: Confirm Student Pickup

**Test ID:** TC-TRIP-007  
**Feature:** Pickup Confirmation  
**Precondition:** Arrived at pickup location  
**Steps:**

1. Arrive at pickup location
2. Tap "Confirm Pickup" button in app
3. Enter/verify student details (if required)
4. Confirm pickup action

**Expected Result:**

- Pickup confirmed in system
- Pickup time recorded
- Parent notified that student picked up
- Trip status changes to "In Progress"
- Real-time tracking begins

**UI/UX Notes:**

- "Confirm Pickup" button prominent
- Optional: photo verification of student
- Confirmation message shown
- Trip status updates to "Started"

**Edge Cases:**

- Confirm pickup but student not present
- System requires photo confirmation
- Network delay confirming pickup
- Multiple students in vehicle

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-008: Start Trip Tracking

**Test ID:** TC-TRIP-008  
**Feature:** Real-Time Location Tracking  
**Precondition:** Pickup confirmed  
**Steps:**

1. After pickup confirmation
2. Trip tracking automatically starts
3. Monitor real-time location sharing
4. Check parent can track location
5. Navigation continues to destination

**Expected Result:**

- Real-time location updates begin
- Location sent to parent every few seconds
- Map shows live driver/vehicle location
- Parent app shows driver moving
- ETA updates as route changes
- Tracking continues throughout trip

**UI/UX Notes:**

- Real-time location visible on driver's map
- Tracking indicator showing: "Sharing live location"
- Battery/signal indicator
- Stop sharing button (if driver wants to disable)

**Edge Cases:**

- GPS signal loss (resume on reconnection)
- Network disconnection (queue and resend)
- Parent network issues (driver unaware)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-009: Navigate to Drop-Off Location

**Test ID:** TC-TRIP-009  
**Feature:** Navigation to Destination  
**Precondition:** Trip in progress, student picked up  
**Steps:**

1. On trip tracking screen
2. Tap "Navigate to Destination" or map
3. Navigation app opens with drop-off address
4. Follow directions to school/destination
5. Observe progress

**Expected Result:**

- Navigation to drop-off location opened
- Route displayed with turn-by-turn directions
- Distance and ETA shown
- Real-time updates during drive
- Parent sees driver's progress toward destination

**UI/UX Notes:**

- Navigation app integration
- Estimated arrival time displayed
- Alternative routes if available
- Contact parent button available

**Edge Cases:**

- GPS signal loss during navigation
- Parent reported wrong address
- Heavy traffic affecting ETA
- Driver needs to make stop

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-010: Confirm Student Drop-Off

**Test ID:** TC-TRIP-010  
**Feature:** Drop-Off Confirmation  
**Precondition:** At destination location  
**Steps:**

1. Arrive at destination (school)
2. Student exits vehicle
3. Tap "Confirm Drop-Off" button
4. Optionally verify drop-off details
5. Confirm action

**Expected Result:**

- Drop-off confirmed in system
- Drop-off time recorded
- Location coordinates stored
- Parent notified of successful drop-off
- Trip status changes to "Completed"
- Real-time location tracking stops

**UI/UX Notes:**

- "Confirm Drop-Off" button prominent
- Current location pre-populated (if applicable)
- Confirmation message shown
- Trip completion summary displayed

**Edge Cases:**

- Wrong location marked as drop-off
- Multiple stops on trip
- Student says different pickup from parent's address
- Network delay confirming drop-off

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-TRIP-011: Complete Trip

**Test ID:** TC-TRIP-011  
**Feature:** Trip Completion  
**Precondition:** Drop-off confirmed  
**Steps:**

1. After drop-off confirmation
2. Observe trip completion screen
3. View trip summary (time, distance, earnings if applicable)
4. Option to rate/feedback (optional)
5. Return to available trips/home screen

**Expected Result:**

- Trip automatically marked as completed
- Trip summary displayed
- Earnings updated (if applicable)
- Parent given option to rate/review
- Trip moved to "Completed Trips" in history
- Driver available for new trips

**UI/UX Notes:**

- Trip summary card showing times, distance, fare
- Optional rating section
- "Got It" or "Next" button to continue
- Transition back to home screen

**Edge Cases:**

- Trip data calculation error
- Rating dispute from parent
- Payment processing issue
- Driver offline when completing

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 6️⃣ REAL-TIME TRACKING & LOCATION

#### TC-LOC-001: Enable Location Sharing During Trip

**Test ID:** TC-LOC-001  
**Feature:** Location Sharing Activation  
**Precondition:** Trip accepted, about to start  
**Steps:**

1. On trip details screen
2. Observe location sharing toggle/setting
3. Ensure location sharing enabled (should be default)
4. Start trip/confirm pickup
5. Verify parent receives location updates

**Expected Result:**

- Location sharing enabled by default during trip
- Real-time location sent to parent
- Parent can track vehicle on map
- Location updates continuously
- Sharing clearly indicated in UI

**UI/UX Notes:**

- Toggle showing "Live Location: ON"
- Location icon indicating sharing active
- Battery/GPS status visible
- Stop sharing option available

**Edge Cases:**

- Location disabled before trip (prompt to enable)
- GPS not enabled globally (prompt to enable)
- Permission not granted (handle gracefully)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-002: Disable Location Sharing

**Test ID:** TC-LOC-002  
**Feature:** Location Sharing Deactivation  
**Precondition:** During active trip with sharing enabled  
**Steps:**

1. On trip tracking screen
2. Locate "Stop Sharing Location" toggle/button
3. Tap to disable sharing
4. Confirm action (if prompted)
5. Verify parent location updates stop

**Expected Result:**

- Location sharing stopped
- Parent no longer receives updates
- Parent sees "Driver location unavailable" message
- Driver continues trip normally
- Can re-enable sharing if needed

**UI/UX Notes:**

- Clear disable button
- Confirmation dialog (discourage accidental disabling)
- Warning that parent won't see location
- Option to re-enable easily

**Edge Cases:**

- Disable then re-enable repeatedly
- Parent calls to complain about unavailable location
- Disable affects payment/trust rating
- System re-enables automatically after trip

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-003: Real-Time GPS Location Update

**Test ID:** TC-LOC-003  
**Feature:** GPS Accuracy and Update Frequency  
**Precondition:** During active trip  
**Steps:**

1. Monitor location updates on driver's map
2. Move vehicle and observe location changes
3. Check update frequency (should be every few seconds)
4. Verify accuracy (within acceptable range)
5. Check battery usage

**Expected Result:**

- Location updates every 5-10 seconds (configurable)
- Accuracy within 10-20 meters (depending on GPS quality)
- Smooth movement visualization (not jumping)
- Real-time updates to parent visible
- Minimal battery drain for location tracking

**UI/UX Notes:**

- Location dot on map updates smoothly
- Accuracy indicator (if applicable)
- No significant lag in updates

**Edge Cases:**

- GPS signal weak (indoor)
- Driver in tunnel/urban canyon
- Heavy traffic causing slow movement
- Battery saver mode enabled

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-004: Location Accuracy Validation

**Test ID:** TC-LOC-004  
**Feature:** GPS Accuracy Checking  
**Precondition:** During trip in various locations  
**Steps:**

1. Trip in open area (good GPS)
2. Trip in urban area (buildings)
3. Trip in parking structure (underground)
4. Compare GPS location with actual position
5. Check reported accuracy rating

**Expected Result:**

- Outdoor: accuracy within 5-10 meters
- Urban: accuracy within 15-20 meters
- Underground: may show "GPS signal weak" or pause updates
- No false location spikes
- Reasonable accuracy maintained

**UI/UX Notes:**

- Accuracy displayed if available (meters)
- Signal strength indicator
- Warning if accuracy poor

**Edge Cases:**

- Flying over to next location (impossible jump)
- Stuck in single location
- Extreme urban canyon
- Weather conditions affecting GPS

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-005: Route Optimization Display

**Test ID:** TC-LOC-005  
**Feature:** Optimized Route Suggestion  
**Precondition:** Trip accepted with defined route  
**Steps:**

1. View trip details
2. Check suggested route from pickup to destination
3. Accept suggested route or choose alternative
4. Compare with real-time traffic
5. Observe if route adjusts based on traffic

**Expected Result:**

- Recommended route displayed
- Alternative routes available (if supported)
- Route considers current traffic
- Estimated time realistic based on route
- Route updates if traffic changes significantly

**UI/UX Notes:**

- Map showing primary route in color
- Alternative routes shown if available
- Traffic overlay on map (if supported)
- Time/distance for each route

**Edge Cases:**

- Heavy traffic affecting initially estimated time
- Construction on suggested route
- Route takes unexpectedly different path
- Driver ignores navigation

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-006: Estimated Arrival Time (ETA) Calculation

**Test ID:** TC-LOC-006  
**Feature:** ETA Display and Update  
**Precondition:** During active trip  
**Steps:**

1. At start of trip, check estimated arrival time at destination
2. Monitor ETA as trip progresses
3. Check ETA updates based on traffic/speed
4. Compare with actual arrival time
5. Verify within accuracy threshold

**Expected Result:**

- ETA displayed to parent and driver
- ETA updates every minute (or as needed)
- Final ETA within 5-10 minutes of actual arrival
- ETA considers current speed and traffic
- Parent sees updated ETA in real-time

**UI/UX Notes:**

- ETA prominently displayed (next to destination)
- Updates shown as "ETA 10:45 AM"
- Time remaining also shown (e.g., "15 minutes")
- Animation/indication when ETA changes

**Edge Cases:**

- Severe traffic causing major ETA shift
- Return to starting point (wrong destination)
- Driver stops midway (ETA increases)
- Driver speeds up (ETA decreases)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-007: Automatic Location Pause When Offline

**Test ID:** TC-LOC-007  
**Feature:** Offline Location Handling  
**Precondition:** During trip, network goes offline  
**Steps:**

1. During active trip, disable network (airplane mode or turn off WiFi/mobile)
2. Observe location tracking
3. Re-enable network
4. Verify system resumed tracking

**Expected Result:**

- Location updates pause when offline
- No error crashes
- Local location data cached
- Updates resume when network restored
- Parent sees "Location temporarily unavailable" message
- No data loss or corruption

**UI/UX Notes:**

- "Offline" indicator shown
- Notification that updates paused
- Auto-resume when network returns
- Queue updates to send

**Edge Cases:**

- Offline for extended period
- Network flaky (on/off repeatedly)
- Parent trying to track offline driver
- Battery drain during offline period

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-LOC-008: Location Resume After Reconnection

**Test ID:** TC-LOC-008  
**Feature:** Location Tracking Resumption  
**Precondition:** After network reconnection  
**Steps:**

1. Network went offline during trip
2. Network is restored
3. Observe location tracking resumes
4. Check for any missing data or gaps
5. Verify parent sees updated location

**Expected Result:**

- Location tracking automatically resumes
- Real-time updates continue
- Queued location points sent in batch
- No manual user action required
- Parent sees continuous tracking (no major gaps)

**UI/UX Notes:**

- "Offline" indicator disappears
- Location updates resume smoothly
- No noticeable interruption to parent

**Edge Cases:**

- Resume during cornering (jump in location)
- System tries to backfill time gap
- Parent network also offline
- Multiple resume/pause cycles

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 7️⃣ AVAILABILITY & STATUS MANAGEMENT

#### TC-STATUS-001: Set Availability Status (Online/Offline)

**Test ID:** TC-STATUS-001  
**Feature:** Availability Toggle  
**Precondition:** Logged in, on home screen  
**Steps:**

1. View availability status toggle
2. Status currently: Online or Offline
3. Tap toggle to switch status
4. Confirm status change
5. Observe toggle state update

**Expected Result:**

- Status toggle switches between Online/Offline
- Confirmation message shown
- Status persists after app restart
- When Online: ready to receive trip requests
- When Offline: no trip requests received

**UI/UX Notes:**

- Large, clear toggle button
- Status clearly labeled ("Online" vs "Offline")
- Color coded (green for online, gray for offline)
- Confirmation dialog on toggle

**Edge Cases:**

- Toggle while trip active (should stay online)
- Toggle while notifications arriving
- Network failure during status update

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-STATUS-002: Toggle Availability with Confirmation

**Test ID:** TC-STATUS-002  
**Feature:** Status Change Confirmation  
**Precondition:** Currently Online  
**Steps:**

1. Tap availability toggle to go Offline
2. Confirmation dialog appears
3. Review confirmation message
4. Tap "Confirm" or "Cancel"
5. Verify resulting state

**Expected Result:**

- Confirmation dialog shown before status change
- Clear reason for confirmation (e.g., "Stop receiving requests?")
- Both "Confirm" and "Cancel" buttons
- Status changes on confirmation
- Status remains unchanged on cancel

**UI/UX Notes:**

- Dialog title: "Go Offline?"
- Message: "You won't receive any new requests"
- Clear action buttons
- Keyboard focus on primary button

**Edge Cases:**

- Tap cancel (nothing happens, status stays online)
- Accidental double-tap
- Go offline during trip (blocked or allowed?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-STATUS-003: View Current Availability Status

**Test ID:** TC-STATUS-003  
**Feature:** Status Display  
**Precondition:** On home/dashboard screen  
**Steps:**

1. View availability status prominently displayed
2. Check status clearly visible
3. View status with indicator (color, icon)
4. Navigate to settings if available
5. Confirm status display consistent throughout app

**Expected Result:**

- Status shown prominently on home screen
- Status consistent throughout app
- Clear visual indicator (color, icon, text)
- Last status change time (optional)
- Active trip status overrides (online if trip active)

**UI/UX Notes:**

- Large status indicator (at top of screen)
- Green circle for Online, gray for Offline
- "Online" or "Offline" text label
- Last updated timestamp (optional)

**Edge Cases:**

- Status inconsistent across screens
- Sync delay from server
- Trip active but status shows Offline

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-STATUS-004: Automatic Status Change (Based on Activity)

**Test ID:** TC-STATUS-004  
**Feature:** Auto Status Management  
**Precondition:** Driver logged in with active status  
**Steps:**

1. Accept trip request (note time)
2. Observe status during pickup/dropoff
3. Complete trip
4. Observe status immediately after trip
5. Observe if status automatically changes

**Expected Result:**

- Status remains Online throughout trip
- Status may automatically change based on rules
- Example: Auto-offline after X cancellations
- Example: Auto-online after completing trip (if configured)
- Status changes logged for audit

**UI/UX Notes:**

- Auto-changes should be transparent
- User notified if auto-changed
- Manual override available

**Edge Cases:**

- Too many cancellations (auto-offline)
- Too many rejections (rating impact)
- System-triggered offline (policy violation)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 8️⃣ COMMUNICATION

#### TC-COMM-001: Call Parent from Trip Details

**Test ID:** TC-COMM-001  
**Feature:** Direct Call Functionality  
**Precondition:** Trip details displayed with parent contact  
**Steps:**

1. Open trip details
2. Locate "Call Parent" button
3. Tap button
4. System initiates call to parent

**Expected Result:**

- Phone app opens with parent's number
- Call initiates directly
- Driver can speak with parent
- Either party can end call
- Call duration tracked (optional)

**UI/UX Notes:**

- Large, green "Call" button
- Parent name displayed
- Call button accessible on trip screen
- In-call interface clear

**Edge Cases:**

- Phone offline/no mobile service
- Parent doesn't answer
- Call gets dropped
- Multiple calls in sequence

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-COMM-002: In-App Messaging with Parent

**Test ID:** TC-COMM-002  
**Feature:** Messaging Feature  
**Precondition:** Trip active, messaging available  
**Steps:**

1. Locate message button on trip screen
2. Tap to open messaging
3. Type message (e.g., "Arriving in 5 minutes")
4. Send message
5. Observe message delivery and receipt

**Expected Result:**

- Messaging interface opens
- Message text input available
- Message sends successfully
- Parent receives message
- Message history visible for trip

**UI/UX Notes:**

- Message input at bottom
- Send button next to input
- Message bubbles for chat
- Timestamp on messages
- Typing indicator (optional)

**Edge Cases:**

- Message fails to send (network)
- Message too long (truncation)
- Unsupported characters
- Parent offline when receiving

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 9️⃣ EARNINGS & PAYMENTS

#### TC-EARN-001: View Daily Earnings

**Test ID:** TC-EARN-001  
**Feature:** Daily Earnings Display  
**Precondition:** Completed trips within a day  
**Steps:**

1. Navigate to Earnings section
2. View today's earnings
3. Check trip count and amounts
4. View total daily earnings
5. See breakdown of earnings sources

**Expected Result:**

- Today's earnings displayed prominently
- Broken down by trip (trip count, fare per trip)
- Total shown at top
- Zeroed out at midnight
- Previous day's earnings accessible

**UI/UX Notes:**

- Date clearly shown at top
- Trip list with individual amounts
- Total in large fonts
- Currency displayed
- Comparison to previous day (optional)

**Edge Cases:**

- No trips completed yet
- Trips cancelled (may affect earnings)
- Bonus/incentives included
- Deductions applied

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-002: View Weekly Earnings Summary

**Test ID:** TC-EARN-002  
**Feature:** Weekly Earnings Report  
**Precondition:** Multiple completed trips in current week  
**Steps:**

1. Navigate to Earnings section
2. Switch to Weekly view (or navigate to Weekly)
3. View earnings for current week
4. See daily breakdown (Mon-Sun)
5. View total weekly earnings

**Expected Result:**

- Weekly earnings displayed
- Each day shown with earnings amount
- Total for week prominent
- Comparison to previous week (optional)
- Graph/chart visualization (optional)

**UI/UX Notes:**

- Date range clearly shown
- Daily breakdown in list or chart
- Weekly total highlighted
- Navigation to other weeks available

**Edge Cases:**

- Partial week (current week not complete)
- No trips in some days
- Week boundary (showing Mon-Sun correctly)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-003: View Monthly Earnings Report

**Test ID:** TC-EARN-003  
**Feature:** Monthly Earnings Report  
**Precondition:** Multiple trips completed in current month  
**Steps:**

1. Navigate to Earnings section
2. Switch to Monthly view
3. View current month earnings
4. See weekly breakdown
5. View total monthly earnings and metrics

**Expected Result:**

- Monthly earnings displayed comprehensively
- Weekly breakdown shown
- Total for month prominent
- Comparison to previous month (optional)
- Year-to-date (YTD) totals (optional)

**UI/UX Notes:**

- Month/year clearly indicated
- Visual representation (chart)
- Weekly earnings rows
- Monthly total highlighted

**Edge Cases:**

- Partial month (current month ongoing)
- Year boundary (January showing Dec comparison)
- No trips in month

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-004: View Earnings Breakdown

**Test ID:** TC-EARN-004  
**Feature:** Detailed Earnings Breakdown  
**Precondition:** Viewing earnings (daily, weekly, or monthly)  
**Steps:**

1. View earnings for period
2. Tap on earnings total to expand details
3. See breakdown: trips, bonuses, deductions, pay-outs
4. Check individual line items
5. View notes/explanations for deductions

**Expected Result:**

- Breakdown displays all sources
- Trip fares listed individually
- Bonuses/incentives separately shown
- Deductions clearly explained
- Taxes/withholdings noted (if applicable)
- Net earnings after deductions shown

**UI/UX Notes:**

- Expandable/modal view of details
- Color-coded: green for income, red for deductions
- Line item descriptions clear
- Deduction reason explained

**Edge Cases:**

- No deductions/bonuses (simple view)
- Complex breakdown with many items
- Missing explanations

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-005: View Payment History

**Test ID:** TC-EARN-005  
**Feature:** Payment History Display  
**Precondition:** Completed trips with payments processed  
**Steps:**

1. Navigate to Payments section
2. View list of past payments
3. Check payment dates and amounts
4. View payment method (bank transfer, etc.)
5. Tap on payment to see details

**Expected Result:**

- Payment history list displayed
- Recent payments shown first
- Payment date, amount, status visible
- Payment method shown
- Transaction reference visible
- Detailed breakdown available

**UI/UX Notes:**

- Payment list with date, amount, status
- Status badge (processed, pending, failed)
- Expandable for details
- Filterable by date range (optional)

**Edge Cases:**

- No payments yet (empty state)
- Failed payment (show reason)
- Pending payment (show expected date)
- Disputed payment (show status)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-006: View Upcoming Payment Date

**Test ID:** TC-EARN-006  
**Feature:** Next Payment Alert  
**Precondition:** Payments scheduled (e.g., weekly or bi-weekly)  
**Steps:**

1. Navigate to Payments section
2. Check for "Next Payment" or "Upcoming Payment"
3. View expected payment date
4. Check amount to be paid
5. View if any adjustments are pending

**Expected Result:**

- Next payment date clearly displayed
- Expected amount shown
- Date prominently featured
- Any adjustments/pending items noted
- Countdown to payment (optional)

**UI/UX Notes:**

- Card showing "Next Payment: March 20, 2026"
- Amount and method
- Visual countdown (optional)
- Notification for payment processed

**Edge Cases:**

- No upcoming payment scheduled
- Payment delayed (show reason)
- Payment cancelled (show notification)
- Partial payment held

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-EARN-007: View & Update Bank Account Details

**Test ID:** TC-EARN-007  
**Feature:** Bank Account Management  
**Precondition:** On Payments/Settings screen  
**Steps:**

1. Navigate to Bank Details section
2. View current bank account (partially masked)
3. Tap "Edit" to change account
4. Enter new bank account details
5. Verify account and save

**Expected Result:**

- Current bank account displayed securely
- Edit option available
- New account details entered and validated
- Account verified (if required)
- Changes applied to next payment
- Success confirmation shown

**UI/UX Notes:**

- Current account displayed (masked for security)
- Clear edit button
- Form for entering new account
- Verification process explained
- Confirmation of changes

**Edge Cases:**

- Invalid account number
- Account verification fails
- Account belongs to different person
- Multiple account switching

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 🔟 RATING & REVIEWS

#### TC-RATE-001: View Driver Rating/Score

**Test ID:** TC-RATE-001  
**Feature:** Rating Display  
**Precondition:** On Profile or Dashboard screen  
**Steps:**

1. Navigate to Profile section
2. Locate rating/score display
3. View overall driver rating (out of 5)
4. View trip count or experience
5. View rating trend (optional)

**Expected Result:**

- Driver's overall rating displayed prominently
- Rating shown as stars (4.8/5.0 for example)
- Corresponding number of reviews/ratings
- Visual indicator (green if good, yellow/red if low)
- Trend indicating improvement/decline (optional)

**UI/UX Notes:**

- Star rating clearly visible
- Numeric rating (e.g., 4.8/5)
- Number of ratings ("based on 125 trips")
- Color-coded feedback

**Edge Cases:**

- New driver with no ratings
- Very low rating (< 3.0)
- Rating changed recently

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-RATE-002: View Trip-Wise Ratings from Parents

**Test ID:** TC-RATE-002  
**Feature:** Individual Trip Ratings  
**Precondition:** Completed at least one trip  
**Steps:**

1. Navigate to Ratings section
2. View list of ratings for each completed trip
3. Check date and parent name (if visible)
4. View star rating per trip
5. View comment/feedback per trip (if available)

**Expected Result:**

- List of all trip ratings displayed
- Most recent trips shown first
- Star rating for each trip
- Parent comment/feedback included
- Timestamp of rating
- Trip details linkable

**UI/UX Notes:**

- Trip list with ratings
- Each trip card shows: trip date, parent, star rating, comment
- Expandable for full feedback
- Sortable by date or rating

**Edge Cases:**

- Rating without comment (stars only)
- Comment without rating (shouldn't happen)
- Anonymous feedback
- Rating dispute pending

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-RATE-003: View Feedback Comments

**Test ID:** TC-RATE-003  
**Feature:** Feedback Display  
**Precondition:** Completed trip with feedback from parent  
**Steps:**

1. Navigate to Ratings section
2. Find trip with feedback
3. View full feedback comment
4. Check date of feedback
5. Respond option (if supported)

**Expected Result:**

- Feedback comment displayed in full
- Comment is constructive or positive
- Date of feedback shown
- Option to respond (optional)
- No offensive content (moderated expected)

**UI/UX Notes:**

- Comment displayed clearly
- Timestamp shown
- Reply button (if feature supported)
- Flag for inappropriate feedback (if needed)

**Edge Cases:**

- Very long comment (truncate with "read more"?)
- Inappropriate feedback (moderation review)
- No feedback available
- Mixed positive/negative feedback

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-RATE-004: View Rating Trends

**Test ID:** TC-RATE-004  
**Feature:** Rating Analytics  
**Precondition:** Multiple trips with ratings over time  
**Steps:**

1. Navigate to Ratings/Analytics section
2. View rating trend over time (graph/chart)
3. Check if rating improving or declining
4. View last 30 days trend
5. Compare to previous periods

**Expected Result:**

- Graph showing rating trend
- Time axis (days, weeks, months)
- Rating axis (2.0 to 5.0 scale)
- Trend line showing direction
- Average rating for period shown
- Comparison to previous period (optional)

**UI/UX Notes:**

- Clear chart/graph visualization
- Color coded trend (green=improving, red=declining)
- Key metrics displayed (avg, min, max)
- Actionable insights (optional)

**Edge Cases:**

- Insufficient data (< 5 trips)
- Rating just given (not yet in trend)
- Flat rating for long period

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 1️⃣1️⃣ ADDITIONAL FEATURES

#### TC-ADD-001: Push Notifications for Trip Requests

**Test ID:** TC-ADD-001  
**Feature:** Trip Request Notifications  
**Precondition:** Notifications enabled, driver is online  
**Steps:**

1. Valid trip request arrives
2. Push notification received
3. Notification shows key trip details
4. Tap notification to view trip (on lockscreen or notification center)
5. Handle notification response

**Expected Result:**

- Push notification received immediately
- Notification includes: pickup location, destination, student name
- Sound/vibration alert triggered
- Notification actionable (tap to open app)
- Notification dismissible (if driver rejects)

**UI/UX Notes:**

- Notification title: "New Trip Request"
- Summary shows: "Pickup at [location]"
- Sound notification clear
- Vibration pattern distinct
- Badge count incremented

**Edge Cases:**

- Notification while app in foreground
- Multiple notifications rapid succession
- Notification while device locked
- Do Not Disturb mode enabled

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ADD-002: Location Permission Prompt

**Test ID:** TC-ADD-002  
**Feature:** Location Permission  
**Precondition:** App first launch, location not yet permitted  
**Steps:**

1. App requests location permission
2. Observe permission dialog
3. Tap "Allow" to grant permission
4. Verify location services used
5. Tap "Deny" to refuse (test error handling)

**Expected Result:**

- Clear permission dialog shown
- Explanation of why location needed
- "Allow" and "Deny" options clearly marked
- Permission granted, location services work
- Permission denied, graceful error handling

**UI/UX Notes:**

- Dialog explains: "Needed for trip tracking and navigation"
- Allow button highlighted (recommended)
- System permission dialog used

**Edge Cases:**

- Permission already granted (no prompt)
- Permission previously denied (show settings link)
- Device location globally disabled

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ADD-003: Camera Permission Prompt

**Test ID:** TC-ADD-003  
**Feature:** Camera Permission  
**Precondition:** Photo upload first attempted  
**Steps:**

1. Attempt to upload photo (profile or vehicle)
2. Camera option selected
3. Camera permission prompt shown
4. Grant or deny permission
5. Test with permission granted and denied

**Expected Result:**

- Camera permission dialog shown
- Explanation provided
- Permission granted: camera opens
- Permission denied: fallback to gallery or error message

**UI/UX Notes:**

- Clear explanation in dialog
- System permission dialog
- Subsequent requests respect user choice

**Edge Cases:**

- Device has no camera
- Permission previously denied
- App needs to re-request after denial

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ADD-004: Contact Support

**Test ID:** TC-ADD-004  
**Feature:** Support Channel  
**Precondition:** On Settings or Help screen  
**Steps:**

1. Navigate to Support section
2. View support options (chat, email, phone)
3. Select support method (e.g., Chat)
4. Send support message
5. Observe response or ticket creation

**Expected Result:**

- Support channels clearly listed
- Chat/messaging opens
- Message sends successfully
- Ticket created with reference number
- Support response received (or ticket confirmed)

**UI/UX Notes:**

- Support button prominently placed
- Multiple contact options available
- Chat interface clean and clear
- Ticket tracking number provided

**Edge Cases:**

- Support offline/response delayed
- Chat message fails to send
- Support hours (outside hours message)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ADD-005: Logout from Settings

**Test ID:** TC-ADD-005  
**Feature:** User Logout  
**Precondition:** Logged in, on Settings screen  
**Steps:**

1. Navigate to Settings screen
2. Locate "Logout" option (usually at bottom)
3. Tap "Logout" button
4. Confirmation dialog appears
5. Confirm logout

**Expected Result:**

- Confirmation dialog shown
- Session cleared after confirming
- User redirected to Sign In screen
- Profile data not accessible
- Local session data cleared

**UI/UX Notes:**

- Logout button clearly labeled in red
- Confirmation dialog with warning
- "Cancel" and "Logout" options
- Success message on logout

**Edge Cases:**

- Accidental logout (cancel option)
- Logout fails (network error)
- Logout while trip active (warning)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ADD-006: Session Cleared After Logout

**Test ID:** TC-ADD-006  
**Feature:** Session Cleanup  
**Precondition:** User just logged out  
**Steps:**

1. User logged out
2. Close app completely
3. Reopen app
4. Observe login screen shown
5. Attempt to access protected screens

**Expected Result:**

- App opens to Sign In screen (not dashboard)
- Session token removed
- Profile data not accessible
- No automatic login
- Fresh session required to proceed

**UI/UX Notes:**

- Clean Sign In screen
- No residual user data visible
- Phone field may be auto-filled (optional)

**Edge Cases:**

- Residual cache data (should be cleared)
- Saved credentials still available (depends on design)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 1️⃣2️⃣ ERROR & EXCEPTION HANDLING

#### TC-ERR-001: Network Disconnection During Trip

**Test ID:** TC-ERR-001  
**Feature:** Network Error Handling During Active Trip  
**Precondition:** Trip active, network then disabled  
**Steps:**

1. Enable Airplane mode during active trip
2. Observe error handling
3. Try to perform action (confirm pickup, etc.)
4. Re-enable network
5. Check recovery

**Expected Result:**

- Operation fails gracefully with error message
- No app crash
- User-friendly error: "No internet connection"
- Offline indicator displayed
- Retry option available
- Resume when network restored

**UI/UX Notes:**

- Clear error message
- "Retry" button accessible
- Offline indicator visible
- No frozen UI
- Queue actions to perform upon reconnect

**Edge Cases:**

- Network drops midway through confirming pickup
- Multiple disconnections during trip
- Parent network offline too (driver unaware)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-002: Location Service Unavailable

**Test ID:** TC-ERR-002  
**Feature:** GPS Unavailability  
**Precondition:** Trip active, location services disabled  
**Steps:**

1. Disable location services (Settings)
2. Attempt trip action requiring location
3. Observe error handling
4. Check if feature blocked or degraded
5. Enable location services and retry

**Expected Result:**

- Error message: "Location services required"
- Trip may be blocked or limited
- Option to enable location in Settings
- Help text for enabling GPS
- Features resume once enabled

**UI/UX Notes:**

- Clear error explanation
- Link to Settings to enable location
- GPS icon with error indicator
- Status shown in trip screen

**Edge Cases:**

- Location disabled for entire trip (trip issues?)
- Location permission denied but services enabled
- Device GPS chip failure

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-003: GPS Signal Loss

**Test ID:** TC-ERR-003  
**Feature:** GPS Signal Loss Handling  
**Precondition:** During trip in area with GPS signal loss (tunnel, basement)  
**Steps:**

1. Trip active with good GPS signal
2. Enter area with no GPS signal (tunnel, underground parking)
3. Observe error handling (no location updates)
4. Exit tunnel/area to restore signal
5. Verify resume of tracking

**Expected Result:**

- GPS signal loss detected
- Location updates pause gracefully
- "GPS signal temporarily lost" indicator shown
- No crash or data loss
- Resume updates when signal restored
- Parent sees "updating location" or pause

**UI/UX Notes:**

- GPS signal strength indicator
- Warning icon when signal weak
- Temporary pause notification
- Auto-resume when signal returned

**Edge Cases:**

- Extended signal loss (> 1 hour)
- Multiple signal loss events on trip
- Parent calls during signal loss

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-004: API Timeout Handling & Retry

**Test ID:** TC-ERR-004  
**Feature:** API Timeout  
**Precondition:** API slow or unresponsive  
**Steps:**

1. Perform operation triggering API call
2. Wait for timeout (e.g., 30 seconds)
3. Observe timeout error and retry option
4. Tap "Retry" to re-attempt
5. Monitor success or repeated timeout

**Expected Result:**

- Timeout error shown after reasonable delay
- User-friendly message: "Request timed out"
- Retry button available
- Retry re-attempts operation
- Success on retry or permanent error after multiple attempts

**UI/UX Notes:**

- Timeout dialog/snackbar
- Loading indicator during wait
- Retry button prominent
- Helpful error message

**Edge Cases:**

- API actually failed (not just slow)
- Multiple retries fail (suggest checking connection)
- Timeout during payment (critical!)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-005: Empty Field Validation

**Test ID:** TC-ERR-005  
**Feature:** Form Validation  
**Precondition:** On form with required fields  
**Steps:**

1. Leave required field blank
2. Attempt to submit form
3. Observe validation error
4. Fill field and retry

**Expected Result:**

- Form not submitted
- Error message shown below empty field
- Field highlighted in error state
- Success only after all required fields filled
- Error cleared when user enters data

**UI/UX Notes:**

- Required field indicators (\*)
- Inline error messages in red
- Field highlighted
- Helper text for requirements

**Edge Cases:**

- Field with only spaces (treated as empty?)
- Multiple required fields empty

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-006: Permission Denial Handling

**Test ID:** TC-ERR-006  
**Feature:** Permission Denial  
**Precondition:** Feature attempted with permission denied  
**Steps:**

1. Deny camera permission
2. Attempt photo upload
3. Observe error and fallback option
4. Choose alternative (gallery)
5. Verify workflow continues

**Expected Result:**

- Feature disabled gracefully
- Clear message: "Camera permission required"
- Alternative option provided if applicable
- Link to enable permission in Settings
- App continues functioning normally

**UI/UX Notes:**

- Friendly error message
- "Open Settings" button
- Alternative workflow available
- No crash or frozen UI

**Edge Cases:**

- Deny and select "Don't ask again"
- User denies permission repeatedly
- Feature critical to app functionality

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-007: App Crash Recovery

**Test ID:** TC-ERR-007  
**Feature:** Crash Handling  
**Precondition:** App crashes unexpectedly  
**Steps:**

1. Trigger crash scenario (if reproduc

ible) 2. If crash occurs, system handles gracefully 3. Reopen app 4. Check state restoration 5. Verify no data loss

**Expected Result:**

- No crash visible to user (or graceful error shown)
- Crash logged for debugging
- App reopens without loss
- Session restored if not expired
- Trip status preserved

**UI/UX Notes:**

- No error screens visible
- Smooth recovery
- Notification of what happened (optional)

**Edge Cases:**

- Crash during payment (transaction status?)
- Repeated crashes (error report option)
- Crash during pickup confirmation

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-008: Loading Skeleton States

**Test ID:** TC-ERR-008  
**Feature:** Loading Placeholders  
**Precondition:** Screens with data fetching  
**Steps:**

1. Navigate to data-heavy screen (trips, earnings, history)
2. Observe loading skeleton shown
3. Wait for data to load
4. Observe skeleton replaced by content

**Expected Result:**

- Skeleton loader visible during fetch
- Skeleton layout matches actual content
- Smooth fade-in of real content
- No blank/white screen during load
- Reasonable load time (< 3 seconds typical)

**UI/UX Notes:**

- Skeleton animated (shimmer effect)
- Layout matches final content
- Professional appearance

**Edge Cases:**

- Very fast loading (skeleton flashes briefly)
- Very slow loading (skeleton visible long)
- Load fails (error state replaces skeleton)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-009: Empty State Displays

**Test ID:** TC-ERR-009  
**Feature:** Empty State Messaging  
**Precondition:** Screen with no data expected  
**Steps:**

1. Navigate to screen with no data (no completed trips yet)
2. Observe empty state display
3. Check helpful message and CTA
4. Verify not confused with error state

**Expected Result:**

- Empty state UI displayed (not blank/error)
- Helpful message: "No trips completed yet"
- Icon or illustration
- Call-to-action button
- No error message

**UI/UX Notes:**

- Centered empty state illustration
- Clear, friendly message
- Primary action button highlighted
- Optional secondary message

**Edge Cases:**

- Transition from empty to populated
- Network error confused with empty state
- Loading skeleton shown instead of empty (then error)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-ERR-010: Error State Displays

**Test ID:** TC-ERR-010  
**Feature:** Error Messages  
**Precondition:** API error or data load failure  
**Steps:**

1. Trigger error scenario
2. Observe error state screen
3. Check error message clarity
4. Tap "Retry" button
5. Verify recovery attempt

**Expected Result:**

- Error state displayed (not crash)
- Clear error message (user-friendly)
- Error icon/illustration
- "Retry" button prominent
- Helpful explanation ("Something went wrong")

**UI/UX Notes:**

- Red error icon
- Centered error message
- Retry button prominent
- Optional error details link

**Edge Cases:**

- Retry but network still down
- Navigate away during error state
- Conflicting error messages

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

### 1️⃣3️⃣ UI/UX VALIDATION

#### TC-UI-001: Responsive Layout (Portrait Orientation)

**Test ID:** TC-UI-001  
**Feature:** Responsive Design  
**Precondition:** App on various devices in portrait mode  
**Steps:**

1. Test on small screen (5" phone)
2. Test on large screen (6.5" tablet)
3. Check layout, text sizing, button accessibility
4. Verify no horizontal scroll needed
5. Check bottom navigation accessible

**Expected Result:**

- All content visible without scroll (except where designed)
- Text readable at all sizes
- Buttons properly sized and accessible
- No overlapping elements
- Bottom navigation always visible
- Safe area respected (notch handling)

**UI/UX Notes:**

- No content clipped
- Proper padding/margins
- Lists scroll vertically if needed
- Safe area respected

**Edge Cases:**

- Very small screen (< 4.5")
- Large screen (> 7")
- Text with special characters

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-002: All Text Readable and Properly Aligned

**Test ID:** TC-UI-002  
**Feature:** Text Rendering & Alignment  
**Precondition:** On various screens  
**Steps:**

1. Check text contrast on light backgrounds
2. Verify text alignment (left, right, center)
3. Check font sizes (minimum 12sp for body)
4. Verify line spacing adequate
5. Check text truncation with ellipsis

**Expected Result:**

- All text easily readable (high contrast)
- Alignment matches design
- Font sizes appropriate
- Line spacing adequate
- Long text truncated properly (no cut-off)

**UI/UX Notes:**

- Minimum 4.5:1 contrast ratio
- Consistent font family
- Proper alignment throughout

**Edge Cases:**

- Very long text in fixed fields
- Non-English characters
- Emoji in text fields

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-003: Images Load Correctly

**Test ID:** TC-UI-003  
**Feature:** Image Rendering  
**Precondition:** Screens with images (profile, vehicle, map)  
**Steps:**

1. Navigate to screens with images
2. Check image quality and clarity
3. Observe loading placeholder
4. Check broken image handling
5. Verify aspect ratio maintenance

**Expected Result:**

- Images load quickly (within 1-2 seconds)
- Good image quality (not pixelated)
- Placeholder shown while loading
- Broken images show error placeholder
- No overlapping or misalignment
- Aspect ratio maintained

**UI/UX Notes:**

- Loading spinner/placeholder visible
- Images centered and properly scaled
- No distortion

**Edge Cases:**

- Network timeout (image not loaded)
- Browser cache (instant load)
- Missing image (error placeholder)
- Very large image

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-004: Navigation Between Screens Smooth

**Test ID:** TC-UI-004  
**Feature:** Screen Navigation  
**Precondition:** App running  
**Steps:**

1. Tap buttons to navigate between screens
2. Check transition smoothness
3. Verify back button works correctly
4. Check bottom tabs switch smoothly
5. Verify no flickering

**Expected Result:**

- Smooth screen transitions (animated)
- Back button returns to previous screen
- Bottom tabs switch without lag
- No flickering or janky animations
- Proper screen stack for back navigation

**UI/UX Notes:**

- Smooth animation (consistent)
- No delays longer than 200ms
- Back button intuitive

**Edge Cases:**

- Rapid navigation (stress test)
- Back from multiple screens
- Tab switching during loading

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-005: Loading Indicators Visible

**Test ID:** TC-UI-005  
**Feature:** Loading State UI  
**Precondition:** During data loading  
**Steps:**

1. Trigger operation requiring data fetch
2. Observe loading indicator
3. Check indicator placement (centered, top, etc.)
4. Verify indicator animated (spinning, etc.)
5. Observe indicator disappears when done

**Expected Result:**

- Loading indicator visible during fetch
- Indicator clearly visible (not hidden)
- Animated (spinner or progress bar)
- Disappears when loading complete
- User aware app is working

**UI/UX Notes:**

- Spinner or progress indicator
- Centered or at top of content area
- Animated smoothly
- Removed upon completion

**Edge Cases:**

- Multiple loading indicators (confusing?)
- Loading takes unexpectedly long
- Loading indicator doesn't disappear (stuck state)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-006: Buttons Clickable and Responsive

**Test ID:** TC-UI-006  
**Feature:** Button Interaction  
**Precondition:** On screens with buttons  
**Steps:**

1. Tap various buttons throughout app
2. Verify tap response (visual feedback)
3. Check button size (minimum 44x44dp)
4. Verify no unresponsive buttons
5. Check disabled buttons appear disabled

**Expected Result:**

- All buttons responsive to tap
- Visual feedback on tap (color change, ripple effect)
- Button size at least 44x44dp (accessible)
- Disabled buttons clearly indicated (grayed out)
- No unresponsive buttons
- Tap response within 100ms

**UI/UX Notes:**

- Clear visual feedback on tap
- Consistent feedback across app
- Accessible button sizes
- Disabled state obvious

**Edge Cases:**

- Very rapid taps (debouncing)
- Tap on button edge
- Disabled button appearance

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-007: Map Functionality Smooth

**Test ID:** TC-UI-007  
**Feature:** Map Interaction  
**Precondition:** On screen with interactive map  
**Steps:**

1. Zoom in/out on map (pinch gesture)
2. Pan around map (drag)
3. Tap on location markers
4. Check route display (if applicable)
5. Verify smooth rendering

**Expected Result:**

- Map zooms smoothly without lag
- Panning is responsive
- Markers are clickable
- Route overlays render correctly
- Map doesn't freeze or stutter
- Tile loading smooth

**UI/UX Notes:**

- Smooth animation during zoom/pan
- No significant lag
- Markers clearly visible
- Route polyline smooth

**Edge Cases:**

- Zoom to extreme levels
- Many markers on map
- Large route covering entire map
- Poor network affecting tile loading

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

#### TC-UI-008: Location Accuracy Acceptable

**Test ID:** TC-UI-008  
**Feature:** GPS Accuracy Validation  
**Precondition:** During active trip  
**Steps:**

1. Monitor location on map during trip
2. Compare with actual position
3. Check accuracy variance
4. Test in different environments (urban, highway, rural)
5. Verify no impossible location jumps

**Expected Result:**

- Location within 10-20 meters of actual position
- No unrealistic location jumps
- Smooth realistic movement on map
- Accuracy consistent across environments
- No teleportation between distant locations

**UI/UX Notes:**

- Location dot updates smoothly
- No visible jitter
- Realistic speed visualization

**Edge Cases:**

- Indoor (poor GPS accuracy expected)
- GPS spoofing detection (if supported)
- Extreme speed jumps detected

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ************\_\_\_\_************

---

## 📊 SUMMARY

**Total Test Cases:** 150+  
**Test Categories:** 13  
**Coverage Areas:** Authentication, Profile, Vehicles, Trips, Tracking, Availability, Communication, Earnings, Ratings, Documents, Features, Error Handling, UI/UX

---

## 🎯 SIGN-OFF

**Tested By:** ************\_\_\_************  
**Date:** ************\_\_\_************  
**Overall Result:** ☐ Pass ☐ Fail ☐ Blocked  
**Critical Issues Found:** ************\_\_\_************  
**High Priority Issues:** ************\_\_\_************  
**Notes:**

---
