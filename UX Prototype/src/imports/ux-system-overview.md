1. GLOBAL UX SYSTEM
1.1 User Roles
Role	Capabilities
Operations User	Fix errors, process files, associate tasks
Business Configurator	Approve mappings, edit rules
Supervisor	View analytics, override statuses
Admin	System settings, thresholds, permissions
1.2 Layout Structure

All screens follow:

Top Bar

Search (Accounts / Files)

Notifications

User Menu

System Health Indicator

Left Navigation

Dashboard

Accounts

File Processing

Census

Deduction

Tasks & Exceptions

Rule Studio

Analytics

System Health

Admin

Main Content Area

2. DASHBOARD (Operations Command Center)
Purpose:

Single-pane operational visibility + action prioritization.

2.1 Top Section – System Pulse Cards

Layout: 6 horizontal KPI cards

Each card shows:

Metric value

Trend arrow (7-day)

Click → auto-filtered view

Cards:

Files Received (Today)

In Progress

Action Required

Completed (24h)

SLA Breaches

Schema Drift Alerts

2.2 Priority Work Queue

Tabs:

Action Required

Pending Association

Schema Drift

Failed Retries

Table Columns:

Account

File Name

Type (Census/Deduction)

Issue Type

SLA Timer (Color-coded)

Assigned To

Action Button

Row click → File Detail Page

Bulk actions:

Assign

Retry

Escalate

2.3 Insights Section

Charts:

Error Rate by Account

Manual Intervention %

Volume Trend

Invoice Failure Rate

Filters:

Date Range

Account

File Type

3. ACCOUNTS MODULE
3.1 Accounts List Screen

Columns:

Account Name

Status Badge (Lead/Active/Terminated)

FEIN

Linked Systems (icons)

Last Sync

Active Contracts Count

Action Button (View)

Filters:

Status

TPA

Broker

Has Drift

Has Pending Files

3.2 Account Detail Page
Header Section

Left:

Account Name

Status Badge

FEIN

Employee Count

Lives Covered

Right:

Sync Now

Edit Rules

View History

Activate / Change Status (if Lead)

System Indicators:

Linked to Analyzer (✔)

Linked to SydneyConnect (✔)

Tabs

Overview

Census

Deduction

Rules

History

3.3 Overview Tab

Sections:

Contract List (table)

ShareFile Location

Processing Summary (30-day metrics)

Drift Alerts (if any)

4. FILE PROCESSING MODULE
4.1 Census List Screen

Columns:

File Name

Account

Uploaded On

Status (Badge)

Rule Version Used

Processing Time

Action

Status Badge Types:

In Progress (Blue)

Action Required (Red)

Complete (Green)

Drift Review Needed (Amber)

Click → File Detail

4.2 Deduction List Screen

Columns:

File Name

Account

Contract

Invoice Date

Status

Invoice Creation Status

Action

Additional filter:

Invoice Date Range

5. FILE DETAIL SCREEN (Core UX)

Unified for Census & Deduction.

5.1 Header

File Name

Account

File Type

Uploaded By

Source (Manual/ShareFile)

Rule Version Applied

Processing Duration

Reprocess Button (if allowed)

5.2 Processing Timeline (Vertical Stepper)

Example:

✔ File Received
✔ Schema Mapped
✔ Validation Complete
✔ Transformation Complete
✔ Uploaded to Analyzer
✔ Output Retrieved
✔ Uploaded to ShareFile
✔ Complete

If failure:
Step shows:
❌ Validation Failed (Click to expand)

Click step → Right panel expands with details.

5.3 Main Tabs

Input Preview

Transformed Data

Output Files

Errors

Rule Execution Log

Input Preview

Paginated grid

Highlight invalid cells (if errors)

Column headers show mapped canonical field

Hover over column → shows mapping logic.

Transformed Data

Shows canonical format preview.

Indicator:
"Transformed using Mapping v1.2"

Output Files

Download links:

Enrollment File

Deduction File

Other outputs

If ShareFile upload failed:

Retry Button visible

Retry count shown

Errors Tab

Grouped by:

Error Type

Record Count

Expandable sections.

If < threshold:
Editable grid appears.

If > threshold:
Reupload button shown.

Rule Execution Log

Shows:

Rule ID

Condition

Records affected

Execution time

Audit-ready view.

6. SCHEMA MAPPING SCREEN (Onboarding & Drift)

Triggered when:

New account

Drift detected

Layout

Left:
Original Columns

Center:
Mapping Matrix

Right:
Canonical Fields

Each row:
Original Column → Suggested Canonical Field (Dropdown) → Confidence Badge

Confidence colors:

Green (>90%)

Amber (70–90%)

Red (<70%)

AI Explanation Panel (Expandable)

Shows:

Why suggestion made

Pattern match logic

Data sample analysis

Bottom Actions

Auto-Approve High Confidence

Review Medium Confidence

Save as Draft

Approve & Version

7. RULE STUDIO
7.1 Rule List Screen

Columns:

Rule Version

Created On

Created By

Status (Draft/Active/Archived)

Impact Summary

Action

Click → Rule Detail

7.2 Rule Detail Screen

Three-column layout:

Left:
Rule Version History

Center:
Plain English Editor

Right:
DSL Preview + Impact Preview

Plain English Editor

Free text input area.

Below:
“Generate Rule” button.

After Generation

System displays:

Structured Condition Builder (editable form):

Field

Operator

Value

Action Builder:

Assign Plan

Modify Field

Flag Record

Simulation Panel

Select:

Sample File

Date Range

Run Simulation → shows:

Records impacted

Plan distribution change

Error impact

Approval Workflow

Buttons:

Approve & Activate

Save as Draft

Discard

Approval requires:
Business Configurator role.

8. TASKS & EXCEPTIONS MODULE
8.1 Pending Association Screen

Columns:

File Name

Detected Account

Suggested Contract (with confidence %)

Suggested Invoice Date

Action

Click row → Side panel opens:

Confirm Match

Choose Different Task

8.2 Invoice Failure Screen

Columns:

File

Contract

Invoice Date

Failure Reason (Short)

Retry / Restart

Click → Detail panel shows:

Full error from SydneyConnect

Suggested resolution

9. ANALYTICS SCREEN

Sections:

Processing Efficiency

Error Trends

Drift Frequency

Rule Impact

Invoice Success Rate

Each chart:
Clickable → drills into underlying records.

10. SYSTEM HEALTH SCREEN

Shows:

API Connectivity Status (Analyzer / SydneyConnect / ShareFile)

Retry Queue Depth

Processing Latency

Failed Event Count

Color-coded service status indicators.

11. ADMIN SCREEN

Settings:

Error Threshold (<20 default)

Retry Attempts

AI Confidence Threshold

Role Management

Access Logs

Audit Export

12. UX STATES & EDGE CASES
Loading State

Skeleton loaders.
Timeline shows “Processing…”

Retry State

Show:
“Retry 2 of 3 in progress”

After 3 failures:
Moves to Action Required.

Drift Lock State

Processing paused until mapping approved.

Clear banner:
“Schema drift detected. Review required before processing continues.”

Reprocessing

Reprocess Button:
Prompts:
“Use latest rule version or original?”

Audit logged.

13. AI INTERACTION PRINCIPLES

Always show confidence score.

Always show preview impact.

Never auto-apply rule without approval.

Clearly label “AI Suggested”.

Show version applied on every file.

14. PERFORMANCE UX

File acknowledgment < 5 sec

Real-time status updates via websocket

Non-blocking retry flows

Inline updates (no full page reload)

15. ACCESSIBILITY

High contrast mode

Keyboard navigation

Screen reader compatible

Color + icon based status (not color only)