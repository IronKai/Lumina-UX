# Census File Upload Flow Documentation

## Overview
The census file upload system provides a comprehensive workflow for uploading, validating, processing, and downloading census files with support for multiple scenarios including success paths and various error conditions.

## Features Implemented

### 1. Upload Modal Component (`CensusUpload.tsx`)
A comprehensive modal dialog that handles the entire upload lifecycle with the following features:

#### Upload Stages:
- **Idle**: Initial state with file selection and account selection
- **Uploading**: File transfer to server
- **Validating**: Schema and format validation
- **Processing**: Data transformation and processing
- **Success**: Successful completion with download option
- **Error**: Error state with detailed error messages and recovery suggestions

#### Supported Scenarios:

##### Success Scenarios:
1. **Clean Success**: File processes without any issues
2. **Success with Warnings**: File processes successfully but with warnings (e.g., schema drift, data quality issues)

##### Error Scenarios:
1. **Invalid Format**: File format not supported (not .xlsx, .xls, or .csv)
2. **Missing Fields**: Required columns missing from the file
3. **Duplicate File**: File was already uploaded for the same account
4. **File Too Large**: File exceeds the 50 MB limit
5. **Processing Error**: Generic processing failure with error code
6. **Schema Drift**: New columns detected (shown as warning, not blocking)

### 2. Integration Points

#### Dashboard Integration
- Quick action button in the header: "Upload Census File"
- Opens the upload modal directly from the main dashboard
- Provides immediate access to upload functionality

#### Census Files List Integration
- "Upload Census File" button in the page header
- Shows all census files in a table view
- Download buttons for completed files (green download button)
- Status badges with color coding:
  - **Complete**: Green
  - **In Progress**: Blue
  - **Action Required**: Red
  - **Drift Review Needed**: Amber

#### File Detail Integration
- Download buttons for processed output files
- Two types of output files available:
  - Enrollment File (.xlsx)
  - Deduction File (.csv)
- Files ready indicator with informational message

### 3. Download Functionality

#### From Upload Modal (Success State):
- Large download button for the processed file
- Shows processing summary:
  - Records processed count
  - File ID
  - Account name
  - Warning messages (if any)
- File automatically named with "_processed" suffix

#### From Census Files List:
- Download button appears only for files with "Complete" status
- Click to download processed file
- File name includes "_processed" suffix

#### From File Detail View:
- Two downloadable files in the "Output Files" tab:
  - Enrollment output file
  - Deduction output file
- Each with individual download button
- Info message explaining file readiness

## User Flow

### Standard Success Flow:
1. User clicks "Upload Census File" from Dashboard or Census List
2. Modal opens with account selection dropdown
3. User selects account from dropdown
4. User drags & drops file or clicks to browse
5. File appears with name and size
6. User clicks one of the scenario test buttons (or "Upload & Process")
7. Progress bar shows:
   - Upload (0-30%)
   - Validation (30-50%)
   - Processing (50-100%)
8. Success screen shows:
   - Green checkmark icon
   - Processing summary
   - Warning messages (if any)
   - Download button
9. User can:
   - Download the processed file
   - Upload another file
   - Close the modal

### Error Flow:
1. Steps 1-6 same as success flow
2. Error occurs during one of the stages
3. Error screen shows:
   - Red error icon
   - Error title
   - Detailed error message
   - Suggested actions list
4. User can:
   - Read the error details
   - Follow suggested actions
   - Click "Try Again" to reset and retry

## Technical Implementation

### File Upload Simulation:
```typescript
// Simulates async file processing with delays
await simulateProgress('uploading', 30, 'Uploading file...');
await simulateProgress('validating', 50, 'Validating...');
await simulateProgress('processing', 100, 'Processing...');
```

### Download Implementation:
```typescript
// Creates blob and triggers browser download
const blob = new Blob([data], { type: mimeType });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = fileName;
a.click();
URL.revokeObjectURL(url);
```

### Progress Tracking:
```typescript
interface UploadProgress {
  stage: 'idle' | 'uploading' | 'validating' | 'processing' | 'success' | 'error';
  percentage: number;
  message: string;
  error?: ErrorScenario;
  errorDetails?: string;
  warnings?: Array<{ type: string; message: string; count: number }>;
  fileId?: string;
  processedFileName?: string;
  recordsProcessed?: number;
  recordsTotal?: number;
}
```

## UI/UX Features

### Visual Feedback:
- **Loading States**: Animated spinner during processing
- **Progress Bar**: Visual representation of upload progress
- **Status Icons**: 
  - CheckCircle (green) for success
  - AlertCircle (red) for errors
  - AlertTriangle (amber) for warnings
  - Loader (blue, spinning) for in-progress
- **Color Coding**: Consistent color scheme matching the design system

### Error Handling:
- Detailed error messages
- Actionable suggestions for each error type
- Ability to retry without losing context
- Clear indication of what went wrong and where

### Accessibility:
- Modal can be closed via X button (disabled during processing)
- Keyboard-friendly file selection
- Drag and drop support with visual feedback
- Clear labeling of required fields

## Test Scenarios Available

For demonstration purposes, the upload modal includes test buttons for each scenario:

1. ✓ **Success Path**: Clean processing without issues
2. ⚠ **Schema Drift**: Processing succeeds but with schema drift warnings
3. ✕ **Invalid Format**: File format validation fails
4. ✕ **Missing Fields**: Required fields are missing
5. ✕ **Duplicate File**: File already exists for the account
6. ✕ **File Too Large**: File exceeds size limit

## Future Enhancements

Potential improvements for production implementation:

1. Real API integration for file upload
2. WebSocket for real-time progress updates
3. Resume capability for interrupted uploads
4. Bulk file upload support
5. File preview before upload
6. Advanced validation rules configuration
7. Email notifications on completion
8. Audit log of all uploads
9. File version history
10. Retry queue for failed uploads

## Files Modified/Created

### Created:
- `/src/app/components/CensusUpload.tsx` - Main upload modal component

### Modified:
- `/src/app/components/CensusList.tsx` - Added upload button and download functionality
- `/src/app/components/Dashboard.tsx` - Added quick upload button
- `/src/app/components/FileDetail.tsx` - Added download buttons for output files
