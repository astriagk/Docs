# Ping Parent - QA Testing Checklist & Test Cases

**App:** Ping Parent (Flutter Mobile - Parent App)  
**Version:** TBD  
**Date:** March 13, 2026  
**Tester:** ****\_\_\_****  
**Platform(s):** Android / iOS

---

## 📋 QUICK REFERENCE CHECKLIST

Use this section for rapid testing. Check off each item as you complete validation.

### Authentication

- [ ] Signup with valid phone number
- [ ] Signup with invalid phone number (validation error)
- [ ] OTP verification during signup
- [ ] Sign In with existing account
- [ ] Sign In with wrong OTP
- [ ] Network failure during OTP send
- [ ] Session persistence after app restart

### Profile & Address Management

- [ ] Add user profile details (name, email)
- [ ] Edit existing profile details
- [ ] Upload profile photo (camera)
- [ ] Upload profile photo (gallery)
- [ ] Replace/delete profile photo
- [ ] Add home address via map search
- [ ] Add second address (work/other)
- [ ] Edit existing address
- [ ] Address geocoding validation

### Student Management

- [ ] Add new student
- [ ] Search and select school
- [ ] View student list
- [ ] Edit student details
- [ ] Edit student photo
- [ ] Delete student
- [ ] Add multiple students
- [ ] View class and section

### Driver Assignment

- [ ] Assign driver to student
- [ ] View assigned driver details
- [ ] Reassign driver to different driver
- [ ] Remove driver assignment
- [ ] Search for available drivers
- [ ] View driver contact info

### Subscriptions & Payments

- [ ] View available subscription plans
- [ ] Subscribe to a plan (Razorpay payment)
- [ ] Handle payment success
- [ ] Handle payment failure/cancellation
- [ ] Upgrade subscription to higher plan
- [ ] View current subscription status
- [ ] Redeem promotional/promo code
- [ ] View subscription end date

### Trip Tracking

- [ ] View active trips on home screen
- [ ] View trip status (Pending → Active → Completed)
- [ ] Real-time location tracking of driver/vehicle
- [ ] View multiple active trips
- [ ] View emergency contact button
- [ ] Track trip completion
- [ ] View completed trip details

### Additional Features

- [ ] Support/Chat messaging
- [ ] Request notifications (on accept)
- [ ] Location permission prompt
- [ ] Camera permission prompt
- [ ] Logout from settings
- [ ] Session cleared after logout
- [ ] RTL language support (if applicable)
- [ ] Dark/Light theme toggle

### Error & Edge Cases

- [ ] Network disconnection during operation
- [ ] API timeout handling & retry
- [ ] Empty field validation
- [ ] Duplicate entry prevention
- [ ] Permission denial handling
- [ ] App crash recovery
- [ ] Loading skeleton states
- [ ] Empty state displays (no students, no trips)
- [ ] Error state displays

### UI/UX Validation

- [ ] Responsive layout (portrait orientation)
- [ ] All text readable and properly aligned
- [ ] Images load correctly
- [ ] Navigation between screens smooth
- [ ] Loading indicators visible
- [ ] Buttons clickable and responsive
- [ ] Form fields clear and accessible
- [ ] Bottom navigation visible on all screens

---

## 🧪 DETAILED TEST CASES

### 1️⃣ AUTHENTICATION FLOWS

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
**Notes:** ****************************\_\_\_****************************

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
**Notes:** ****************************\_\_\_****************************

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
- If new user: Navigate to profile setup screen
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
**Notes:** ****************************\_\_\_****************************

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
**Notes:** ****************************\_\_\_****************************

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
**Notes:** ****************************\_\_\_****************************

---

### 2️⃣ PROFILE MANAGEMENT

#### TC-PROF-001: Add User Profile Details

**Test ID:** TC-PROF-001  
**Feature:** Profile Setup/Update  
**Precondition:** User logged in, on Profile screen  
**Steps:**

1. Navigate to Profile screen
2. Enter full name (e.g., "John Doe")
3. Enter email (e.g., "john@example.com")
4. Tap "Save" button
5. Wait for confirmation

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

**Edge Cases:**

- Empty name field
- Invalid email format
- Very long name (200+ characters)
- Special characters in name

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

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
**Notes:** ****************************\_\_\_****************************

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
- Profile photo displays in settings/profile screens

**Edge Cases:**

- Permission denied (handle gracefully)
- Camera unavailable
- Photo upload failure
- Network disconnection during upload

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

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
**Notes:** ****************************\_\_\_****************************

---

#### TC-PROF-005: Replace Profile Photo

**Test ID:** TC-PROF-005  
**Feature:** Profile Photo Management  
**Precondition:** User has existing profile photo  
**Steps:**

1. Navigate to Profile screen
2. Tap existing profile photo
3. Select "Change Photo" option
4. Choose new photo from camera/gallery
5. Confirm

**Expected Result:**

- Old photo replaced with new one
- Success message displayed
- New photo persists after app restart
- All screens show updated photo

**UI/UX Notes:**

- Option to delete photo should be available
- Clear confirmation dialog before deletion
- Placeholder image if no photo exists

**Edge Cases:**

- Delete photo (show default avatar)
- Replace deleted photo
- Upload same photo twice

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 3️⃣ ADDRESS MANAGEMENT

#### TC-ADDR-001: Add Home Address via Map Search

**Test ID:** TC-ADDR-001  
**Feature:** Address Management  
**Precondition:** Location permission available, on Add Address screen  
**Steps:**

1. Navigate to Add Address screen
2. Search for address by typing (e.g., "123 Main St")
3. Select address from search results
4. Confirm location on map
5. Add label (e.g., "Home")
6. Tap "Save" button

**Expected Result:**

- Search returns location suggestions
- Map displays selected address
- Address saved with correct coordinates
- Address appears in address list
- Label correctly assigned

**UI/UX Notes:**

- Map should be interactive (pan, zoom, drag)
- Search results in dropdown/list format
- Loading indicator during search
- Geocoding coordinates visible (latitude/longitude)

**Edge Cases:**

- Invalid address search
- Network failure during map load
- Permission denied for location
- Duplicate address entry

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADDR-002: Add Second Address (Work/Other)

**Test ID:** TC-ADDR-002  
**Feature:** Multiple Address Support  
**Precondition:** Home address already added  
**Steps:**

1. Navigate to Add Address screen
2. Search and select work address
3. Add label "Work"
4. Save

**Expected Result:**

- Second address saved successfully
- Both addresses appear in list
- Can switch between addresses
- Each address has distinct label and coordinates

**UI/UX Notes:**

- Option to add multiple addresses should be clear
- List shows primary address first
- Edit/delete options for each address

**Edge Cases:**

- Exact same address as home
- Address too close to existing address
- No difference in label

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADDR-003: Edit Existing Address

**Test ID:** TC-ADDR-003  
**Feature:** Address Update  
**Precondition:** Address exists in system  
**Steps:**

1. Navigate to Manage Addresses screen
2. Tap existing address
3. Edit street/location details
4. Update map location if needed
5. Tap "Save" button

**Expected Result:**

- Address successfully updated
- New coordinates reflected
- All students/trips using this address updated
- Success notification shown
- Changes persist after app restart

**UI/UX Notes:**

- Show current address in edit form
- Map re-centers on updated location
- Option to cancel without saving
- Confirmation dialog for significant changes

**Edge Cases:**

- Edit to exact current address (no change)
- Delete address during edit
- Network failure during save

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADDR-004: Address Validation

**Test ID:** TC-ADDR-004  
**Feature:** Address Error Handling  
**Precondition:** On Add Address screen  
**Steps:**

1. Leave address field empty and try to save
2. Enter incomplete address
3. Search for invalid address (e.g., "xyz123invalid")
4. Attempt to save without confirmation

**Expected Result:**

- Error messages displayed for empty fields
- Validation prevents save
- Search returns "No results" for invalid address
- Clear error messaging

**UI/UX Notes:**

- Inline validation messages
- Required field indicators (\*)
- Helpful hints below input fields

**Edge Cases:**

- Address in non-English language
- Very long address strings
- Addresses in different countries (if supported)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 4️⃣ STUDENT MANAGEMENT

#### TC-STU-001: Add New Student

**Test ID:** TC-STU-001  
**Feature:** Student Creation  
**Precondition:** Address already added, on Add Student screen  
**Steps:**

1. Navigate to Add Student screen
2. Enter student name (e.g., "Raj Kumar")
3. Select class (e.g., "Class 5")
4. Select section (e.g., "A")
5. Select school via search
6. Confirm pickup address
7. Tap "Save" button

**Expected Result:**

- Student created successfully
- Student appears in student list
- School and class/section correctly assigned
- Success message displayed
- Student ID generated

**UI/UX Notes:**

- Required fields marked with \*
- Dropdowns for class/section selection
- School search with auto-complete
- Confirmation of pickup address with distance

**Edge Cases:**

- Duplicate student name
- Student name with special characters
- No school selected
- Missing class/section

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-002: Search and Select School

**Test ID:** TC-STU-002  
**Feature:** School Search  
**Precondition:** On Add Student screen  
**Steps:**

1. On school selection field
2. Type school name (e.g., "St. Mary's")
3. View search results
4. Tap desired school from list
5. Verify school details loaded

**Expected Result:**

- Search returns matching schools
- School name, address, coordinates loaded
- Distance calculated from pickup address
- School selected and highlighted

**UI/UX Notes:**

- Search results show school name + address
- Loading indicator during search
- Scrollable results if many matches
- Distance displayed in km

**Edge Cases:**

- No schools match search term
- School name typo
- Network failure during search
- School not in system

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-003: View Student List

**Test ID:** TC-STU-003  
**Feature:** Student Display  
**Precondition:** At least one student added  
**Steps:**

1. Navigate to Student List screen
2. View all students
3. Verify student details (name, class, section, school)
4. Check status (active/inactive)

**Expected Result:**

- All students displayed in list
- Each student card shows name, class, school
- Status badge visible (Active/Inactive)
- List loads without errors
- Empty state shown if no students

**UI/UX Notes:**

- Student cards should be clear and readable
- Tap card to view/edit details
- Loading skeleton while fetching
- Add button visible and accessible
- Pull-to-refresh functionality

**Edge Cases:**

- No students added (empty state)
- Large number of students (pagination/infinite scroll)
- Network error while loading

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-004: Edit Student Details

**Test ID:** TC-STU-004  
**Feature:** Student Update  
**Precondition:** Student in list, on student details screen  
**Steps:**

1. Navigate to Student List
2. Tap student card to open details
3. Tap "Edit" button
4. Modify name, class, section, or school
5. Tap "Save" button

**Expected Result:**

- Student details editable
- Changes saved successfully
- List updated with new details
- Success confirmation shown
- Changes persist after app restart

**UI/UX Notes:**

- Pre-populate form with existing data
- Clear save and cancel buttons
- Confirmation dialog for major changes
- Show last edited timestamp

**Edge Cases:**

- Revert to original (no changes, click save)
- Change school to same school
- Edit to blank field
- Network failure during save

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-005: Edit Student Photo

**Test ID:** TC-STU-005  
**Feature:** Student Photo Management  
**Precondition:** On Edit Student screen  
**Steps:**

1. Open student details for editing
2. Tap student photo area
3. Choose camera or gallery
4. Capture/select photo
5. Confirm and save

**Expected Result:**

- Photo uploaded and saved to student profile
- Photo displays in student list
- Photo persists after app restart
- Can replace existing photo

**UI/UX Notes:**

- Photo preview before upload
- Loading indicator during upload
- Replace option if photo exists
- Placeholder if no photo

**Edge Cases:**

- Permission denied
- Upload fails (network)
- Photo too large
- Invalid file format

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-006: Delete Student

**Test ID:** TC-STU-006  
**Feature:** Student Deletion  
**Precondition:** Student in list  
**Steps:**

1. On Student List screen
2. Long-press or swipe on student card
3. Tap "Delete" option
4. Confirm deletion in dialog
5. Verify removal

**Expected Result:**

- Confirmation dialog shown before deletion
- Student removed from list after confirmation
- Success message displayed
- Deletion persists (not in list on app restart)
- Trips/assignments associated with student handled gracefully

**UI/UX Notes:**

- Confirmation dialog with clear warning
- "Cancel" and "Delete" options clearly marked
- Remove from list immediately after delete
- Undo option (optional—depends on requirements)

**Edge Cases:**

- Cancel delete operation
- Delete student with active trips (error/warning?)
- Delete student with driver assignment (unassign first?)
- Network failure during delete

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-STU-007: Add Multiple Students

**Test ID:** TC-STU-007  
**Feature:** Multiple Students  
**Precondition:** App with multiple students  
**Steps:**

1. Add 3+ students with different schools
2. Verify list displays all
3. Assign different drivers to each
4. Create trips for multiple students
5. Track separately

**Expected Result:**

- All students displayed correctly
- Each maintains separate data/assignments
- Can manage independently
- No conflicts between student data

**UI/UX Notes:**

- Efficient list rendering (no lag)
- Clear differentiation between students
- Easy switching between students

**Edge Cases:**

- Same name for multiple students
- Same school for multiple students
- Conflicting pickup times

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 5️⃣ DRIVER ASSIGNMENT

#### TC-DRV-001: Assign Driver to Student

**Test ID:** TC-DRV-001  
**Feature:** Driver Assignment  
**Precondition:** Student added, driver list available  
**Steps:**

1. Navigate to Student List
2. Tap student card
3. Tap "Assign Driver" or driver field
4. View available drivers list
5. Select driver (e.g., "Ahmed - Auto ID: 123")
6. Confirm assignment

**Expected Result:**

- Driver assigned to student
- Driver details displayed in student card
- Assignment saved
- Confirmation message shown
- Driver appears in student's details

**UI/UX Notes:**

- Driver list shows name, rating, vehicle type
- Search/filter drivers by name/rating
- Driver preview with contact info accessible
- Clear confirmation before assignment

**Edge Cases:**

- No available drivers
- Driver already assigned to many students
- Assign same driver twice (prevent duplicate?)
- Network failure during assignment

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-DRV-002: View Assigned Driver Details

**Test ID:** TC-DRV-002  
**Feature:** Driver Information Display  
**Precondition:** Driver assigned to student  
**Steps:**

1. Navigate to student with assigned driver
2. Tap driver card/section
3. View driver details (name, contact, vehicle, rating)
4. Option to call or message driver

**Expected Result:**

- Driver details displayed clearly
- Contact information available
- Vehicle details shown
- Rating and reviews visible
- Call/message buttons functional

**UI/UX Notes:**

- Driver photo displayed
- Rating with star count
- Vehicle license plate visible
- Live status if available

**Edge Cases:**

- Driver offline
- Driver details unavailable
- Contact info missing

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-DRV-003: Reassign Driver to Different Driver

**Test ID:** TC-DRV-003  
**Feature:** Driver Reassignment  
**Precondition:** Driver already assigned to student  
**Steps:**

1. Navigate to student with assigned driver
2. Tap "Reassign Driver" or "Change Driver"
3. Select new driver from list
4. Confirm reassignment
5. Verify change

**Expected Result:**

- Old driver replaced with new driver
- New driver details displayed
- Confirmation message shown
- Change persists
- Previous driver no longer assigned

**UI/UX Notes:**

- Show current driver before reassignment
- Confirmation dialog
- Loading state during reassignment
- Success notification

**Edge Cases:**

- Reassign to same driver (prevent?)
- Available drivers list empty
- Network failure during reassignment
- Reassign during active trip (block or allow?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-DRV-004: Remove Driver Assignment

**Test ID:** TC-DRV-004  
**Feature:** Driver Removal  
**Precondition:** Driver assigned to student  
**Steps:**

1. Navigate to student with driver
2. Tap "Remove Driver" or (—) option
3. Confirm removal
4. Verify driver removed

**Expected Result:**

- Driver assignment cleared
- Driver section shows "No Driver Assigned"
- Success message displayed
- Can reassign new driver
- Change persists

**UI/UX Notes:**

- Confirmation dialog before removal
- Clear "Remove" button
- Show impact message (no trips without driver?)

**Edge Cases:**

- Remove during active trip (block?)
- Multiple students with same driver (only remove for this student)
- Network failure during removal

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-DRV-005: Search for Available Drivers

**Test ID:** TC-DRV-005  
**Feature:** Driver Search  
**Precondition:** On Driver Assignment screen  
**Steps:**

1. On driver selection screen
2. Search field visible (if not auto-populated)
3. Type driver name or ID
4. Filter results
5. View matching drivers

**Expected Result:**

- Search returns matching drivers
- Results updated in real-time as typing
- Clear results with driver info
- Tap to select driver
- Search clears on assignment

**UI/UX Notes:**

- Real-time search results
- Show no results message if none found
- Sort by rating or availability

**Edge Cases:**

- No drivers match search
- Search for non-existent driver ID
- Empty search field

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 6️⃣ SUBSCRIPTION & PAYMENTS

#### TC-SUB-001: View Available Subscription Plans

**Test ID:** TC-SUB-001  
**Feature:** Subscription Plans Display  
**Precondition:** Logged in, navigate to Subscriptions screen  
**Steps:**

1. Navigate to Subscriptions/Plans screen
2. View all available plans
3. Check plan name, price, features
4. View recommended plan (if highlighted)

**Expected Result:**

- All plans displayed with clear details
- Pricing visible in local currency
- Features listed for each plan
- Recommended plan highlighted
- "Subscribe Now" button for each plan

**UI/UX Notes:**

- Plan cards clearly separated
- Price prominently displayed
- Features listed as bullets or checklist
- Current/Active plan clearly marked

**Edge Cases:**

- No plans available
- Plans loading (show skeleton)
- Network error while loading plans
- Pricing update during view

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-002: Subscribe to a Plan (Razorpay Payment)

**Test ID:** TC-SUB-002  
**Feature:** Subscription Purchase  
**Precondition:** On Plans screen, selected plan  
**Steps:**

1. Select plan and tap "Subscribe Now"
2. Review billing details (amount, currency)
3. Proceed to payment (Razorpay opens)
4. Select payment method (card/UPI/net banking)
5. Complete payment
6. Return to app after payment

**Expected Result:**

- Razorpay payment screen opens
- Payment processed successfully
- Return to app with success confirmation
- Subscription activated
- Plan details updated in settings
- Confirmation email/message sent

**UI/UX Notes:**

- Clear billing amount before Razorpay
- Loading state during payment processing
- Success screen with subscription details
- "Continue" or "Dashboard" button after success

**Edge Cases:**

- Payment cancelled by user
- Payment fails (insufficient funds)
- Network timeout during payment
- Return to app without completing payment

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-003: Handle Payment Success

**Test ID:** TC-SUB-003  
**Feature:** Payment Success Handling  
**Precondition:** Payment completed successfully  
**Steps:**

1. Payment processed successfully
2. Observe success message
3. Check subscription status updated
4. Verify order/receipt available
5. Check local storage/session updated

**Expected Result:**

- Success message displayed with order ID
- Subscription status shows current plan
- End date visible in subscription details
- Receipt/invoice available (if applicable)
- Session updated with new status
- Features unlocked (if plan-gated)

**UI/UX Notes:**

- Clear success confirmation
- Order ID/transaction reference shown
- Next billing date displayed
- Option to download receipt

**Edge Cases:**

- Server confirmation delayed
- Partial payment success
- Payment success but subscription creation fails

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-004: Handle Payment Failure/Cancellation

**Test ID:** TC-SUB-004  
**Feature:** Payment Error Handling  
**Precondition:** User attempts payment  
**Steps:**

1. At Razorpay payment screen
2. Tap Cancel or let payment fail
3. Return to app (payment cancelled/failed)
4. Observe error handling

**Expected Result:**

- Error message shown (user-friendly)
- Option to retry payment
- Return to subscription screen
- Previous subscription unchanged (if exists)
- No charge applied
- User can select different plan or cancel

**UI/UX Notes:**

- Clear error reason if available
- "Retry Payment" button
- "Try Different Plan" option
- "Cancel" to exit

**Edge Cases:**

- Multiple failed attempts
- User locked out temporarily
- Network issue during error handling

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-005: Upgrade Subscription to Higher Plan

**Test ID:** TC-SUB-005  
**Feature:** Subscription Upgrade  
**Precondition:** User has active subscription, viewing higher plan  
**Steps:**

1. User has Plan A (lower tier)
2. View Plan B (higher tier)
3. Tap "Upgrade Now"
4. Show prorated pricing (if applicable)
5. Complete payment
6. Activate new plan

**Expected Result:**

- Upgrade option available
- Prorated charges calculated (old credits applied)
- Payment processed for difference
- New plan activated immediately
- Old plan end date removed
- New end date set

**UI/UX Notes:**

- Show prorated amount clearly
- Confirmation dialog before payment
- Success message with new plan details

**Edge Cases:**

- Downgrade instead of upgrade
- Upgrade to same plan
- No prorated credits available
- Payment fails during upgrade

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-006: View Current Subscription Status

**Test ID:** TC-SUB-006  
**Feature:** Subscription Status Display  
**Precondition:** User has active subscription  
**Steps:**

1. Navigate to Profile/Settings > Subscription
2. View current plan details
3. Check expiration date
4. View renewal date (if auto-renew enabled)

**Expected Result:**

- Plan name displayed prominently
- Expiration date clearly shown
- Status shows "Active" or "Expires on [date]"
- Renewal settings visible
- Option to manage subscription

**UI/UX Notes:**

- Clear status badge (green for active)
- Count down to expiration (e.g., "30 days remaining")
- Edit/change subscription options

**Edge Cases:**

- Subscription expired (show "Expired" status)
- Subscription cancelled
- Grace period (if applicable)
- Free trial (if applicable)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-SUB-007: Redeem Promotional/Promo Code

**Test ID:** TC-SUB-007  
**Feature:** Promo Code Redemption  
**Precondition:** Valid promo code available  
**Steps:**

1. On Subscription screen before payment
2. Look for "Promo Code" or "Coupon" field
3. Enter valid promo code (e.g., "SAVE20")
4. Tap "Apply" button
5. Verify discount applied

**Expected Result:**

- Promo code accepted
- Discount amount calculated
- Total price reduced in billing details
- Success message "Code applied"
- Cannot apply invalid code (error message)
- Discount applied to payment

**UI/UX Notes:**

- Promo code field clearly visible
- "Apply" button next to input
- Show old and new price
- Discount amount highlighted

**Edge Cases:**

- Invalid promo code
- Expired promo code
- One-time use code already used
- Code not applicable to this plan
- Code minimum purchase not met

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 7️⃣ TRIP TRACKING

#### TC-TRACK-001: View Active Trips on Home Screen

**Test ID:** TC-TRACK-001  
**Feature:** Trip Display  
**Precondition:** Active trip exists (driver accepted request)  
**Steps:**

1. Navigate to Home screen
2. View trip list/card
3. Check trip status (Active, Pending, Completed)
4. Tap on trip to view details

**Expected Result:**

- Active trips displayed prominently
- Trip card shows student, driver, status
- Real-time status updates
- Tap to expand/view details
- Trip location visible on map (card or detail view)

**UI/UX Notes:**

- Trip card shows pickup time and status
- Map preview if available
- Driver photo and name
- Tap to open full tracking view

**Edge Cases:**

- No active trips (show empty state)
- Multiple active trips (distinguish clearly)
- Trip loading delay

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-002: View Trip Status (Pending → Active → Completed)

**Test ID:** TC-TRACK-002  
**Feature:** Trip Status Progression  
**Precondition:** Trip lifecycle from creation to completion  
**Steps:**

1. Create trip request (status: Pending - waiting for driver)
2. Driver accepts (status: Active - trip started)
3. Wait for trip to complete (status: Completed)
4. Observe status changes in real-time

**Expected Result:**

- Status changes reflected in real-time UI
- Badge/indicator shows current status
- Pending: "Waiting for driver" message
- Active: Live tracking available
- Completed: Trip summary displayed
- Transition smooth with notifications

**UI/UX Notes:**

- Status badge color-coded (yellow/blue/green)
- Clear text describing each status
- Appropriate actions available per status

**Edge Cases:**

- Trip cancelled before driver accepts
- Trip delayed (long pending duration)
- Trip cancelled after active
- Status update delay/sync issues

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-003: Real-Time Location Tracking of Driver/Vehicle

**Test ID:** TC-TRACK-003  
**Feature:** Live Location Tracking  
**Precondition:** Active trip with real-time GPS data  
**Steps:**

1. Open active trip details
2. View map with current driver location
3. Car icon on map showing vehicle position
4. Watch location update in real-time
5. View route from pickup to destination

**Expected Result:**

- Map displays driver's real-time location
- Vehicle marker updates smoothly
- Route visible on map
- Estimated arrival time displayed
- Location accuracy within expected range
- No significant delay in updates

**UI/UX Notes:**

- Map centered on vehicle icon
- Zoom controls available
- Route polyline clearly visible
- Speed indicator (optional)
- Turning icon direction if available

**Edge Cases:**

- GPS signal lost (show last known location)
- Network disconnection (lose updates temporarily)
- Map lag/delays
- Address not found on map

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-004: View Multiple Active Trips

**Test ID:** TC-TRACK-004  
**Feature:** Multiple Trip Handling  
**Precondition:** Multiple students with active trips simultaneously  
**Steps:**

1. Multiple students have active trips
2. View home screen/ trip list
3. Switch between trips
4. Track each trip independently
5. View all trips on single view (if available)

**Expected Result:**

- All active trips listed/visible
- Switch between trips smoothly
- Each trip tracked independently
- No data mixing between trips
- Efficient rendering (no lag)
- Clear distinction between trips

**UI/UX Notes:**

- Trip list shows all active trips
- Tap to switch between tracking views
- Option to view all on map (if supported)
- Clear student/trip identifiers

**Edge Cases:**

- Trips in same area (distinguish clearly)
- Too many active trips (pagination?)
- Trip updates conflict

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-005: View Emergency Contact Button

**Test ID:** TC-TRACK-005  
**Feature:** Emergency Features  
**Precondition:** During active trip tracking  
**Steps:**

1. Open trip tracking screen
2. Locate emergency/SOS button
3. Tap emergency button
4. Observe emergency action (alert, contact driver, etc.)

**Expected Result:**

- Emergency button clearly visible and accessible
- Tap to activate emergency protocol
- Emergency alert sent (if system supports)
- Driver notified of emergency
- Parent can contact emergency services/driver
- Button is high-contrast/easy to find in panic

**UI/UX Notes:**

- Emergency button large and red (standard icon)
- Confirmation dialog before sending alert
- Contact options immediately available
- Option to cancel if accidental

**Edge Cases:**

- Accidental emergency tap (cancellation)
- Emergency during poor connectivity
- Multiple emergency alerts
- Driver offline when emergency triggered

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-006: Track Trip Completion

**Test ID:** TC-TRACK-006  
**Feature:** Trip Completion Tracking  
**Precondition:** Driver nearing drop-off point  
**Steps:**

1. During active trip, monitor progress
2. Vehicle approaches destination
3. Trip completes (driver marks as complete)
4. Observe trip completion in UI

**Expected Result:**

- Trip automatically marked complete when destination reached
- Completion time recorded
- Trip moved to "Completed" section
- Notification sent to parent
- Option to rate/review trip

**UI/UX Notes:**

- Completion notification toast/alert
- Trip summary screen shows completion details
- Rating prompt appears (optional)
- Navigation to completed trip details

**Edge Cases:**

- Dropped off before destination (manual completion?)
- Completion stuck in pending
- Retry completion notification

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-TRACK-007: View Completed Trip Details

**Test ID:** TC-TRACK-007  
**Feature:** Trip History and Details  
**Precondition:** Trip is completed  
**Steps:**

1. Navigate to Completed Trips section
2. Tap on completed trip
3. View trip summary (time, distance, cost)
4. Check route taken
5. View driver and vehicle info

**Expected Result:**

- Trip details displayed comprehensively
- Pickup and drop-off times shown
- Distance and duration recorded
- Cost/fare breakdown (if applicable)
- Route history visible
- Driver rating option
- Payment status visible

**UI/UX Notes:**

- Clean summary layout
- Map showing actual route taken
- Receipt/invoice available if payment made
- Rating/review option prominent

**Edge Cases:**

- Cancelled trip (show cancellation reason)
- Trip with issues (show notes/report option)
- Very short trip (few minutes)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 8️⃣ ADDITIONAL FEATURES

#### TC-ADD-001: Support/Chat Messaging

**Test ID:** TC-ADD-001  
**Feature:** Customer Support Chat  
**Precondition:** In app with support option available  
**Steps:**

1. Navigate to Settings/Support
2. Tap "Chat with Support" option
3. Send test message to support
4. Await response (or observe pending state)

**Expected Result:**

- Chat interface opens
- Message input field functional
- Message sends successfully
- Support response received (if support active)
- Chat history visible
- Can close and reopen chat

**UI/UX Notes:**

- Chat bubbles distinguish user vs support
- Timestamp on messages
- Typing indicator if support is responding
- Emoji/attachment support (if applicable)

**Edge Cases:**

- Support offline (show message pending)
- Network disconnection during chat
- Very long message
- File attachment failure

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-002: Request Notifications Setup

**Test ID:** TC-ADD-002  
**Feature:** Notification Configuration  
**Precondition:** On notification/permission setup  
**Steps:**

1. App requests notification permission (if first time)
2. Grant permission
3. Configure notification preferences (if available)
4. Enable/disable specific notifications

**Expected Result:**

- Permission prompt shown (first time)
- Permission granted/denied handled correctly
- Notifications received as per preferences
- Settings updated when changed
- Notification badge on app icon (if supported)

**UI/UX Notes:**

- Clear explanation of why permission needed
- "Allow" and "Don't Allow" buttons clear
- Preference toggles labeled clearly

**Edge Cases:**

- Permission already granted
- Permission denied (show settings link)
- User revokes permission later
- Notifications not received despite enabled

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-003: Location Permission Prompt

**Test ID:** TC-ADD-003  
**Feature:** Location Permission  
**Precondition:** Feature requiring location access attempted (address search, trip tracking)  
**Steps:**

1. Trigger location-dependent feature
2. Observe permission prompt
3. Grant or deny permission
4. Test feature with permission granted/denied

**Expected Result:**

- Permission prompt appears with clear explanation
- Grant allows feature to use location
- Deny prevents feature but app continues
- Prompt not repeated if default chosen
- Feature works after permission granted

**UI/UX Notes:**

- "Allow" and "Don't Allow" clearly marked
- Explanation of why location needed

**Edge Cases:**

- Permission already granted
- Permission previously denied by user
- Device location services disabled (global)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-004: Camera Permission Prompt

**Test ID:** TC-ADD-004  
**Feature:** Camera Permission  
**Precondition:** Photo upload feature accessed  
**Steps:**

1. Access photo upload (camera option)
2. Observe camera permission prompt
3. Grant or deny permission
4. Allow camera app to open (if granted)

**Expected Result:**

- Permission prompt shown with explanation
- Grant allows camera app/view to open
- Deny prevents camera access
- Fallback to gallery option available
- Feature continues normally with gallery option

**UI/UX Notes:**

- Clear explanation
- Easy fallback to gallery

**Edge Cases:**

- Permission already granted
- Permission previously denied
- Device has no camera

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-005: Logout from Settings

**Test ID:** TC-ADD-005  
**Feature:** User Logout  
**Precondition:** Logged in, on Settings screen  
**Steps:**

1. Navigate to Settings screen
2. Locate "Logout" option at bottom
3. Tap "Logout" button
4. Confirm logout in dialog (if prompted)
5. Observe navigation

**Expected Result:**

- Confirmation dialog shown before logout
- Session cleared
- User redirected to Sign In screen
- Profile data not accessible
- Local session data cleared
- Credentials still stored (optional—for convenience)

**UI/UX Notes:**

- Logout button clearly labeled and easy to find
- Confirmation dialog with "Cancel" and "Logout" buttons
- Success message or smooth transition

**Edge Cases:**

- Accidental logout (cancel option)
- Logout fails (network error)
- Force logout (session timeout)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-006: Session Cleared After Logout

**Test ID:** TC-ADD-006  
**Feature:** Session Management  
**Precondition:** User just logged out  
**Steps:**

1. User logged out
2. Close and reopen app
3. Observe login screen
4. Attempt to access protected screens without login

**Expected Result:**

- App opens to Sign In screen (not dashboard)
- No automatic login
- Profile data not accessible
- Session token removed
- Credentials do not auto-populate (unless "Remember Me" feature exists)

**UI/UX Notes:**

- Clean Sign In screen presented
- No residual user data visible

**Edge Cases:**

- Residual cache data (should be cleared)
- Saved credentials still available (not a failure if intentional)
- Session persistence check (should fail)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-007: RTL Language Support (if applicable)

**Test ID:** TC-ADD-007  
**Feature:** Right-to-Left Language Support  
**Precondition:** App supports RTL (e.g., Arabic)  
**Steps:**

1. Change app language to RTL language
2. Navigate through all screens
3. Check text direction, layout mirroring
4. Test navigation, buttons, input fields
5. Return to LTR language

**Expected Result:**

- Text flows right-to-left correctly
- Layout mirrored appropriately (buttons, images)
- Icons and navigation adapt
- No broken UI elements
- Text readability maintained

**UI/UX Notes:**

- All text right-aligned
- Left/right padding reversed
- Navigation buttons flipped

**Edge Cases:**

- Mixed LTR/RTL content (numbers, English)
- Images that shouldn't flip (icons may need special handling)
- Edge case: very long RTL text

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ADD-008: Dark/Light Theme Toggle (if applicable)

**Test ID:** TC-ADD-008  
**Feature:** Theme Support  
**Precondition:** Theme toggle available in settings  
**Steps:**

1. Navigate to Settings
2. Find Theme preference option
3. Toggle between Dark and Light
4. Navigate to multiple screens
5. Close app and reopen

**Expected Result:**

- Theme changes immediately
- All screens respect theme setting
- Text remains readable in both themes
- Theme preference persists after app restart
- Images/content adapt appropriately

**UI/UX Notes:**

- Clear toggle or radio button options
- Preview or confirmation of theme change
- Smooth transition (no jarring flashes)

**Edge Cases:**

- System theme vs app-specific theme
- Mixed content (background vs text contrast)
- Theme preference not persisting

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 9️⃣ ERROR & EXCEPTION HANDLING

#### TC-ERR-001: Network Disconnection During Operation

**Test ID:** TC-ERR-001  
**Feature:** Network Error Handling  
**Precondition:** WiFi/Mobile data enabled, app performing operation  
**Steps:**

1. Disable WiFi and Mobile data (airplane mode)
2. User is in middle of operation (e.g., saving profile, loading trips)
3. Observe error handling
4. Re-enable network
5. Test retry functionality

**Expected Result:**

- Operation fails gracefully with error message
- No app crash
- User-friendly error: "No internet connection" or similar
- Option to "Retry" visible
- Retry resumes operation after network restoration
- Data not partially saved (consistent state)

**UI/UX Notes:**

- Clear error message (not technical jargon)
- "Retry" button easily accessible
- Offline indicator visible (optional)
- No frozen UI

**Edge Cases:**

- Network intermittently drops
- Very slow network (timeout settings?)
- Different error types (connection refused vs timeout)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-002: API Timeout Handling & Retry

**Test ID:** TC-ERR-002  
**Feature:** API Timeout Error Handling  
**Precondition:** Network slow or API slow to respond  
**Steps:**

1. Perform operation with slow/delayed API response
2. Wait for timeout
3. Observe error and retry option
4. Tap "Retry" to re-attempt
5. Monitor successful completion or repeated timeout

**Expected Result:**

- Timeout error shown after reasonable delay (e.g., 30 seconds)
- User-friendly message: "Request timed out, please try again"
- Retry button available
- Retry attempts operation again
- Success on retry or repeated error after 2-3 attempts

**UI/UX Notes:**

- Timeout dialog/snackbar
- Loading/progress indicator visible during wait
- Reasonable timeout default (user-customizable optional)

**Edge Cases:**

- API actually failed (not just slow)
- Multiple retries fail (suggest checking network)
- User retries immediately on network restoration

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-003: Empty Field Validation

**Test ID:** TC-ERR-003  
**Feature:** Form Validation  
**Precondition:** On form with required fields (profile, student, address)  
**Steps:**

1. Leave required field(s) blank
2. Attempt to submit form
3. Observe validation error

**Expected Result:**

- Form not submitted
- Error message shown below empty field(s)
- Field highlighted or shaken for attention
- Success only after all required fields filled
- Error cleared when user enters data

**UI/UX Notes:**

- Required field indicators (\*)
- Inline error messages in red
- Field border highlights in error state
- Helper text explaining requirement

**Edge Cases:**

- Field with only spaces (treated as empty?)
- Multiple required fields empty (show all or first?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-004: Duplicate Entry Prevention

**Test ID:** TC-ERR-004  
**Feature:** Unique Constraint Enforcement  
**Precondition:** Attempting to create/assign duplicate entry  
**Steps:**

1. Try to add student with same details as existing
2. Try to assign same driver twice to same student
3. Try to create multiple subscriptions simultaneously
4. Observe error handling

**Expected Result:**

- Operation prevented
- Error message: "This entry already exists" or similar
- Data not duplicated in system
- User prompted with alternative action
- No data inconsistency

**UI/UX Notes:**

- Clear error message indicating duplication
- Helpful message (e.g., "Try editing existing student instead")

**Edge Cases:**

- Similar but not identical entries (case sensitivity, spaces)
- Race condition (user clicks twice quickly)
- Concurrent updates from multiple sessions

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-005: Permission Denial Handling

**Test ID:** TC-ERR-005  
**Feature:** Permission Denial  
**Precondition:** Feature requiring permission attempted, permission denied  
**Steps:**

1. Deny camera permission (on photo upload screen)
2. Deny location permission (on address search)
3. Try to use feature without permission
4. Observe graceful degradation

**Expected Result:**

- Feature disabled with clear message
- Alternative option provided if applicable (e.g., use gallery instead of camera)
- App continues functioning normally
- User can enable permission later in Settings
- No forced re-prompt (respects user choice)

**UI/UX Notes:**

- Helpful message: "Camera permission required to take photos"
- Link/button to open Settings
- Alternative workflow available

**Edge Cases:**

- User denies and selects "Don't ask again"
- System-level permission revoked by user later
- Feature critical to app (graceful notification)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-006: App Crash Recovery

**Test ID:** TC-ERR-006  
**Feature:** Crash Handling and Recovery  
**Precondition:** App crashes unexpectedly  
**Steps:**

1. Trigger potential crash scenario (rapid actions, memory stress)
2. If crash occurs, app should handle gracefully
3. Reopen app
4. Observe recovery and state restoration

**Expected Result:**

- No crash (best case) or graceful error handling
- If crash occurs: error logging to system
- App reopens without data loss
- Session restored (if not expired)
- User notified of what happened (optional)

**UI/UX Notes:**

- No error screens visible to user (unless necessary)
- Smooth recovery to last known good state

**Edge Cases:**

- Crash during data save (data integrity check)
- Crash during payment (transaction status?)
- Repeated crashes (error report option)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-007: Loading Skeleton States

**Test ID:** TC-ERR-007  
**Feature:** Loading UX  
**Precondition:** Screens with data fetching (students, trips, subscriptions)  
**Steps:**

1. Navigate to data-heavy screen
2. Observe while data loads
3. Check loading skeleton is shown
4. Data replaces skeleton once loaded

**Expected Result:**

- Skeleton loader visible while fetching
- Skeleton mimics actual content layout
- Smooth transition from skeleton to real content
- No blank/white screen during load
- Skeleton animated (optional but preferred)

**UI/UX Notes:**

- Skeleton layout matches actual content
- Smooth fade/transition animation
- Reasonable load time (under 3 seconds typical)

**Edge Cases:**

- Very fast loading (skeleton flashes briefly—OK)
- Very slow loading (skeleton visible longer—OK)
- Load fails (error state replaces skeleton)
- Cancelled load (skeleton disappears, user navigates back)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-008: Empty State Displays

**Test ID:** TC-ERR-008  
**Feature:** Empty State Handling  
**Precondition:** Screen with no data (no students, no trips, no history)  
**Steps:**

1. Navigate to Student List (if no students added)
2. Navigate to My Rides (if no completed rides)
3. Navigate to Trip History (if no trips)
4. Observe empty state UI

**Expected Result:**

- Empty state screen displayed (not blank white)
- Helpful message: "No students added yet"
- Icon/illustration representing the section
- "Add" or "Create" button visible
- No error message (this is expected state)

**UI/UX Notes:**

- Centered empty state illustration
- Clear, friendly message
- Primary action button highlighted
- Optional secondary message

**Edge Cases:**

- Transition from empty to populated
- Network error confused with empty state
- Empty after deleting all items

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-ERR-009: Error State Displays

**Test ID:** TC-ERR-009  
**Feature:** Error State Handling  
**Precondition:** API error or data load failure  
**Steps:**

1. Trigger error scenario (bad network, server down)
2. Observe error state screen
3. Check error message clarity
4. Tap "Retry" or similar button
5. Observe recovery attempt

**Expected Result:**

- Error state screen displayed (not crash)
- Clear error message (not technical jargon)
- Error icon/illustration
- "Retry" button prominent and functional
- User-friendly explanation ("Something went wrong, please try again")

**UI/UX Notes:**

- Red error icon
- Centered error message
- Retry button prominent
- Optional error details link (for debugging)

**Edge Cases:**

- Retry button click but network still down (repeated error)
- User navigates away during error state (clean exit)
- Conflicting error messages

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

### 🔟 UI/UX VALIDATION

#### TC-UI-001: Responsive Layout (Portrait Orientation)

**Test ID:** TC-UI-001  
**Feature:** Responsive Design  
**Precondition:** App running on device in portrait mode  
**Steps:**

1. Navigate to all screens
2. Check layout on small screen (e.g., 5" phone)
3. Check layout on large screen (e.g., 6.5" phone)
4. Check text sizing and readability
5. Check button accessibility

**Expected Result:**

- All content visible without horizontal scroll (except map)
- Text readable at all sizes
- Buttons accessible and properly sized
- Images scale appropriately
- No overlapping elements
- Bottom navigation/buttons not hidden

**UI/UX Notes:**

- No content clipped
- Safe area respected (notch/edges)
- Proper padding and margins
- Lists scroll vertically if needed

**Edge Cases:**

- Extremely small screen (< 4.5")
- Very large screen (> 7")
- Text with special characters

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-002: All Text Readable and Properly Aligned

**Test ID:** TC-UI-002  
**Feature:** Text Rendering  
**Precondition:** On various screens  
**Steps:**

1. Check text contrast on light and dark backgrounds
2. Verify text alignment (left, right, center) correct per design
3. Check font sizes are appropriate (not too small)
4. Check line spacing adequate for readability
5. Check text truncation handled properly (ellipsis)

**Expected Result:**

- All text easily readable (WCAG AA contrast minimum)
- Alignment matches design specifications
- Font sizes appropriate (minimum 12sp for body text)
- Line spacing adequate
- Long text truncated with "..." not cut off mid-word

**UI/UX Notes:**

- Sufficient contrast ratio (4.5:1 minimum for normal text)
- Alignment intuitive and consistent
- Font family consistent throughout

**Edge Cases:**

- Very long text in fixed fields
- Non-English characters (if supported)
- Emoji in text fields

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-003: Images Load Correctly

**Test ID:** TC-UI-003  
**Feature:** Image Rendering  
**Precondition:** Screens with images (profile photo, school logo, driver photo, map)  
**Steps:**

1. Navigate to screens with images
2. Check image quality and clarity
3. Check images load without lag/stutter
4. Check placeholder shown while loading
5. Check broken image handling

**Expected Result:**

- Images load quickly (within 1-2 seconds)
- Image quality good (no excessive pixelation)
- Placeholder shown while loading
- Broken images show error placeholder
- No image overlapping or misalignment
- Aspect ratio maintained

**UI/UX Notes:**

- Loading spinner/placeholder visible
- Images centered and properly scaled
- No distortion

**Edge Cases:**

- Network timeout (image not loaded)
- Browser cache (images load instantly)
- Missing image on server (show error)
- Very large image (loading delay)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-004: Navigation Between Screens Smooth

**Test ID:** TC-UI-004  
**Feature:** Screen Navigation  
**Precondition:** App running, navigating between screens  
**Steps:**

1. Tap buttons to navigate to different screens
2. Check transitions smooth (no jarring jumps)
3. Back button works correctly
4. Bottom navigation tabs switch smoothly
5. Check no UI flickering

**Expected Result:**

- Screen transitions smooth (animated, no delay)
- Back button returns to previous screen
- Bottom tabs switch without lag
- No flickering or janky animations
- Proper screen stack maintained for back navigation

**UI/UX Notes:**

- Smooth transition animation (200-400ms typical)
- Back gesture supported (Android)
- Bottom tab icons indicate current tab
- No content jump during transition

**Edge Cases:**

- Rapid tapping (multiple navigation attempts)
- Navigation during data load
- Memory constrained device (checking for jank)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-005: Loading Indicators Visible

**Test ID:** TC-UI-005  
**Feature:** Loading State Visibility  
**Precondition:** Operation taking time (API call, file upload)  
**Steps:**

1. Perform slow operation (disable WiFi to simulate)
2. Observe loading indicator
3. Check visibility of spinner/progress
4. Check corresponding UI elements disabled during load

**Expected Result:**

- Loading spinner visible and animated
- Central position or near related element
- No silent loading (user aware action happening)
- Buttons disabled during critical operations
- Progress bar for long operations (file uploads)
- Spinner continues until operation complete

**UI/UX Notes:**

- Spinner animated and visible
- Positioned prominently
- Color contrasts with background enough to be visible

**Edge Cases:**

- Very fast completion (spinner barely visible—OK)
- Very slow operation (keep spinner going)
- Multiple concurrent operations (separate spinners?)

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-006: Buttons Clickable and Responsive

**Test ID:** TC-UI-006  
**Feature:** Button Interactivity  
**Precondition:** On screens with buttons (Save, Add, Delete, etc.)  
**Steps:**

1. Tap various buttons
2. Check immediate visual feedback (ripple, highlight)
3. Check button animations smooth
4. Check disabled buttons are visually distinct
5. Check button sizes adequate for touch (48x48dp minimum)

**Expected Result:**

- Button responds immediately to tap
- Visual feedback (ripple or highlight) visible
- Disabled buttons grayed out and not tappable
- Button minimum size 48x48dp (accessibility guideline)
- No double-action on accidental double-tap
- Loading state during submission

**UI/UX Notes:**

- Ripple or highlight effect on tap
- Button text clear and descriptive
- Primary button prominent (color, size)
- Destructive actions (delete) visually warning

**Edge Cases:**

- Rapidly tapping button twice
- Button with loading state
- Disabled vs enabled state visual difference

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-007: Form Fields Clear and Accessible

**Test ID:** TC-UI-007  
**Feature:** Form Input UX  
**Precondition:** On form screens (profile, student, address update)  
**Steps:**

1. Check form field labels clear and associated
2. Check input field focus states (border highlight)
3. Check keyboard type appropriate (email, number, text)
4. Check placeholder text helpful (if used)
5. Check error messages clear

**Expected Result:**

- Field labels clearly associated with inputs
- Input fields have clear focus state (border/color change)
- Keyboard type appropriate (email vs text)
- Placeholder text provides helpful hint but not required instruction
- Error messages inline and clear
- Tab order logical and correct

**UI/UX Notes:**

- Labels positioned above or inside field (clear association)
- Focus state visible (border, shadow, or background change)
- Helper text under field for additional info
- Required field indicators (\*)
- Proper spacing between fields

**Edge Cases:**

- Very small screen (form field sizing)
- Long labels (text wrapping, truncation)
- Many required fields (overwhelming)
- Pre-filled form fields

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

#### TC-UI-008: Bottom Navigation Visible on All Screens

**Test ID:** TC-UI-008  
**Feature:** Bottom Navigation Bar  
**Precondition:** On main app screens (dashboard, tabs)  
**Steps:**

1. Navigate to all major screens (Home, Rides, Subscriptions, Profile, Settings)
2. Check bottom navigation visible
3. Check current tab highlighted
4. Check all tabs tappable
5. Check navigation consistent

**Expected Result:**

- Bottom navigation visible on all tab screens
- Current tab icon/label highlighted differently
- Other tabs accessible and responsive
- Navigation bar not hidden by content
- Icons clear and identifiable
- Bottom navigation consistent across app

**UI/UX Notes:**

- Bottom nav fixed (doesn't scroll with content)
- Active tab highlighted (color or icon change)
- Icons + labels or just icons (consistent)
- Proper spacing between tabs

**Edge Cases:**

- Bottom nav on non-tab screens (should vary)
- Keyboard open (nav should remain accessible)
- Notch/safe area considerations

**Status:** ☐ Pass ☐ Fail ☐ Blocked  
**Notes:** ****************************\_\_\_****************************

---

## 🎯 SUMMARY

### Test Execution Notes

- **Total Test Cases:** >120 (detailed)
- **Quick Checklist Items:** ~80+
- **Coverage Areas:** Auth, Profile, Address, Students, Drivers, Subscriptions, Tracking, Support, Errors, UI/UX
- **Platforms:** Android & iOS (test on both if possible)
- **Data Testing:** Use test data/mock API if available

### Sign-Off

- **Tester Name:** ****\_\_\_****
- **Date:** ****\_\_\_****
- **Platform:** Android / iOS
- **Build Version:** ****\_\_\_****
- **Overall Status:** ☐ Pass ☐ Fail ☐ Blocked with Issues ☐ Needs Retesting

### Critical Issues Found

1. ***
2. ***
3. ***

### Recommended Follow-up Testing

1. ***
2. ***

---

**Document Version:** 1.0  
**Last Updated:** March 13, 2026
