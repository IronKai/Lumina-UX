import { useState, useRef } from 'react';
import { X, Upload, AlertCircle, CheckCircle2, Download, FileText, AlertTriangle, Loader2, RefreshCw } from 'lucide-react';
import { DuplicateFileDialog } from './DuplicateFileDialog';

type UploadStage = 'idle' | 'uploading' | 'validating' | 'processing' | 'success' | 'error' | 'duplicate-detected';

type ErrorScenario = 
  | 'invalid-format' 
  | 'schema-drift' 
  | 'missing-fields' 
  | 'duplicate-file' 
  | 'file-too-large'
  | 'processing-error'
  | null;

interface UploadProgress {
  stage: UploadStage;
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

interface CensusUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (fileId: string) => void;
}

export function CensusUpload({ isOpen, onClose, onSuccess }: CensusUploadProps) {
  const [progress, setProgress] = useState<UploadProgress>({
    stage: 'idle',
    percentage: 0,
    message: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Simulate different scenarios for testing
  const simulateUpload = async (file: File, scenario: 'success' | ErrorScenario = 'success') => {
    // Reset progress
    setProgress({ stage: 'uploading', percentage: 0, message: 'Uploading file...' });

    // Stage 1: Upload
    await simulateProgress('uploading', 30, 'Uploading file to server...');

    // Scenario: File too large
    if (scenario === 'file-too-large') {
      setProgress({
        stage: 'error',
        percentage: 30,
        message: 'Upload failed',
        error: 'file-too-large',
        errorDetails: `File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) exceeds maximum allowed size of 50 MB`
      });
      return;
    }

    // Stage 2: Validation
    await simulateProgress('validating', 50, 'Validating file format and schema...');

    // Scenario: Invalid format
    if (scenario === 'invalid-format') {
      setProgress({
        stage: 'error',
        percentage: 50,
        message: 'Validation failed',
        error: 'invalid-format',
        errorDetails: 'File must be in Excel (.xlsx, .xls) or CSV (.csv) format. Detected format: .txt'
      });
      return;
    }

    // Scenario: Missing required fields
    if (scenario === 'missing-fields') {
      setProgress({
        stage: 'error',
        percentage: 50,
        message: 'Validation failed',
        error: 'missing-fields',
        errorDetails: 'Required columns missing: SSN, FIRST_NAME, LAST_NAME, DATE_OF_BIRTH. Please ensure your file contains all required fields.'
      });
      return;
    }

    // Scenario: Duplicate file
    if (scenario === 'duplicate-file') {
      setProgress({
        stage: 'duplicate-detected',
        percentage: 50,
        message: 'Validation failed',
        error: 'duplicate-file',
        errorDetails: `A file named "${file.name}" was already processed for ${selectedAccount} on 2026-02-27 14:30. Please verify this is not a duplicate submission.`
      });
      return;
    }

    // Stage 3: Processing
    await simulateProgress('processing', 75, 'Processing census data...');

    // Scenario: Processing error
    if (scenario === 'processing-error') {
      setProgress({
        stage: 'error',
        percentage: 75,
        message: 'Processing failed',
        error: 'processing-error',
        errorDetails: 'An error occurred while processing the file. Error code: PROC_ERR_001. Please contact support if this issue persists.'
      });
      return;
    }

    // Scenario: Schema drift (warning, but success)
    if (scenario === 'schema-drift') {
      await simulateProgress('processing', 100, 'Processing complete with warnings');
      const fileId = `CF-${Date.now()}`;
      setProgress({
        stage: 'success',
        percentage: 100,
        message: 'File processed successfully with warnings',
        warnings: [
          { type: 'Schema Drift', message: 'New columns detected: DEPT_CODE, LOCATION_ID, HIRE_TYPE', count: 3 },
          { type: 'Data Quality', message: 'Invalid SSN format for some records', count: 5 }
        ],
        fileId,
        processedFileName: `${file.name.replace(/\.[^/.]+$/, '')}_processed_${Date.now()}.xlsx`,
        recordsProcessed: 245,
        recordsTotal: 250
      });
      return;
    }

    // Success scenario
    await simulateProgress('success', 100, 'File processed successfully');
    const fileId = `CF-${Date.now()}`;
    setProgress({
      stage: 'success',
      percentage: 100,
      message: 'File processed successfully',
      fileId,
      processedFileName: `${file.name.replace(/\.[^/.]+$/, '')}_processed_${Date.now()}.xlsx`,
      recordsProcessed: 250,
      recordsTotal: 250
    });

    if (onSuccess) {
      onSuccess(fileId);
    }
  };

  const simulateProgress = (stage: UploadStage, percentage: number, message: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setProgress({ stage, percentage, message });
        resolve();
      }, 1500);
    });
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProgress({ stage: 'idle', percentage: 0, message: '' });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const startUpload = (scenario: 'success' | ErrorScenario = 'success') => {
    if (selectedFile && selectedAccount) {
      simulateUpload(selectedFile, scenario);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedAccount('');
    setProgress({ stage: 'idle', percentage: 0, message: '' });
  };

  const handleDownload = () => {
    // Simulate file download
    const blob = new Blob(['Processed census data...'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = progress.processedFileName || 'processed_census.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStageIcon = () => {
    switch (progress.stage) {
      case 'uploading':
      case 'validating':
      case 'processing':
        return <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle2 className="w-12 h-12 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-12 h-12 text-red-600" />;
      default:
        return null;
    }
  };

  const getErrorTitle = () => {
    switch (progress.error) {
      case 'invalid-format':
        return 'Invalid File Format';
      case 'schema-drift':
        return 'Schema Drift Detected';
      case 'missing-fields':
        return 'Missing Required Fields';
      case 'duplicate-file':
        return 'Duplicate File Detected';
      case 'file-too-large':
        return 'File Too Large';
      case 'processing-error':
        return 'Processing Error';
      default:
        return 'Upload Error';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">Upload Census File</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            disabled={progress.stage === 'uploading' || progress.stage === 'validating' || progress.stage === 'processing'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Account Selection */}
          {progress.stage === 'idle' && (
            <>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Account <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose an account...</option>
                  <option value="Acme Corporation">Acme Corporation</option>
                  <option value="TechStart Inc">TechStart Inc</option>
                  <option value="Global Systems LLC">Global Systems LLC</option>
                  <option value="Innovate Partners">Innovate Partners</option>
                </select>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Census File <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileInputChange}
                  />
                  {selectedFile ? (
                    <div className="space-y-2">
                      <FileText className="w-12 h-12 text-blue-600 mx-auto" />
                      <div className="text-sm font-medium text-slate-900">{selectedFile.name}</div>
                      <div className="text-xs text-slate-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedFile(null);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Choose different file
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="w-12 h-12 text-slate-400 mx-auto" />
                      <div className="text-sm text-slate-600">
                        Drag and drop your census file here, or click to browse
                      </div>
                      <div className="text-xs text-slate-500">
                        Supported formats: .xlsx, .xls, .csv (Max 50 MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Test Scenarios (for demo purposes) */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <div className="text-xs font-medium text-slate-700 mb-3">Test Different Scenarios:</div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => startUpload('success')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ✓ Success Path
                  </button>
                  <button
                    onClick={() => startUpload('schema-drift')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ⚠ Schema Drift
                  </button>
                  <button
                    onClick={() => startUpload('invalid-format')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ✕ Invalid Format
                  </button>
                  <button
                    onClick={() => startUpload('missing-fields')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ✕ Missing Fields
                  </button>
                  <button
                    onClick={() => startUpload('duplicate-file')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ✕ Duplicate File
                  </button>
                  <button
                    onClick={() => startUpload('file-too-large')}
                    disabled={!selectedFile || !selectedAccount}
                    className="px-3 py-2 text-xs bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    ✕ File Too Large
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Progress View */}
          {(progress.stage === 'uploading' || progress.stage === 'validating' || progress.stage === 'processing') && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {getStageIcon()}
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">{progress.message}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    {progress.stage === 'uploading' && 'Transferring file to server...'}
                    {progress.stage === 'validating' && 'Checking file format and schema...'}
                    {progress.stage === 'processing' && 'Transforming and validating data...'}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Progress</span>
                  <span>{progress.percentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Processing Steps */}
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-slate-700">File uploaded</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {progress.stage === 'validating' || progress.stage === 'processing' ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />
                  )}
                  <span className={progress.stage === 'validating' || progress.stage === 'processing' ? 'text-slate-700' : 'text-slate-400'}>
                    Schema validation
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {progress.stage === 'processing' ? (
                    <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 border-2 border-slate-300 rounded-full" />
                  )}
                  <span className={progress.stage === 'processing' ? 'text-slate-700' : 'text-slate-400'}>
                    Data processing
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Success View */}
          {progress.stage === 'success' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {getStageIcon()}
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">Processing Complete!</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Your census file has been successfully processed
                  </div>
                </div>
              </div>

              {/* Processing Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <div className="text-sm font-medium text-green-900">File Processed Successfully</div>
                    <div className="text-xs text-green-700 space-y-1">
                      <div>Records Processed: {progress.recordsProcessed} / {progress.recordsTotal}</div>
                      <div>File ID: {progress.fileId}</div>
                      <div>Account: {selectedAccount}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warnings (if any) */}
              {progress.warnings && progress.warnings.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">Warnings:</div>
                  {progress.warnings.map((warning, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-amber-900">{warning.type}</div>
                        <div className="text-xs text-amber-700 mt-1">{warning.message}</div>
                        <div className="text-xs text-amber-600 mt-1">Affected records: {warning.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Download Button */}
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="w-5 h-5" />
                <span>Download Processed File</span>
              </button>

              <div className="text-xs text-slate-500 text-center">
                The processed file contains validated and transformed census data ready for further processing.
              </div>
            </div>
          )}

          {/* Error View */}
          {progress.stage === 'error' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {getStageIcon()}
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">{getErrorTitle()}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Unable to process your census file
                  </div>
                </div>
              </div>

              {/* Error Details */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-red-900">Error Details</div>
                    <div className="text-sm text-red-700 mt-2">{progress.errorDetails}</div>
                  </div>
                </div>
              </div>

              {/* Suggested Actions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">Suggested Actions:</div>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  {progress.error === 'invalid-format' && (
                    <>
                      <li>Ensure your file is in .xlsx, .xls, or .csv format</li>
                      <li>Try converting your file to Excel or CSV format</li>
                    </>
                  )}
                  {progress.error === 'missing-fields' && (
                    <>
                      <li>Review the required field list in the documentation</li>
                      <li>Add missing columns to your file</li>
                      <li>Ensure column headers match expected names</li>
                    </>
                  )}
                  {progress.error === 'duplicate-file' && (
                    <>
                      <li>Verify this is not a resubmission of an existing file</li>
                      <li>Check previous uploads in the Census Files list</li>
                      <li>Rename the file if it's a different version</li>
                    </>
                  )}
                  {progress.error === 'file-too-large' && (
                    <>
                      <li>Split the file into smaller batches</li>
                      <li>Remove unnecessary columns</li>
                      <li>Compress the file if possible</li>
                    </>
                  )}
                  {progress.error === 'processing-error' && (
                    <>
                      <li>Try uploading the file again</li>
                      <li>Contact support with the error code</li>
                      <li>Check system health status</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Retry Button */}
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Duplicate Detected View */}
          {progress.stage === 'duplicate-detected' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                {getStageIcon()}
                <div className="text-center">
                  <div className="text-lg font-medium text-slate-900">{getErrorTitle()}</div>
                  <div className="text-sm text-slate-600 mt-1">
                    Unable to process your census file
                  </div>
                </div>
              </div>

              {/* Error Details */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-red-900">Error Details</div>
                    <div className="text-sm text-red-700 mt-2">{progress.errorDetails}</div>
                  </div>
                </div>
              </div>

              {/* Suggested Actions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-900 mb-2">Suggested Actions:</div>
                <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                  {progress.error === 'invalid-format' && (
                    <>
                      <li>Ensure your file is in .xlsx, .xls, or .csv format</li>
                      <li>Try converting your file to Excel or CSV format</li>
                    </>
                  )}
                  {progress.error === 'missing-fields' && (
                    <>
                      <li>Review the required field list in the documentation</li>
                      <li>Add missing columns to your file</li>
                      <li>Ensure column headers match expected names</li>
                    </>
                  )}
                  {progress.error === 'duplicate-file' && (
                    <>
                      <li>Verify this is not a resubmission of an existing file</li>
                      <li>Check previous uploads in the Census Files list</li>
                      <li>Rename the file if it's a different version</li>
                    </>
                  )}
                  {progress.error === 'file-too-large' && (
                    <>
                      <li>Split the file into smaller batches</li>
                      <li>Remove unnecessary columns</li>
                      <li>Compress the file if possible</li>
                    </>
                  )}
                  {progress.error === 'processing-error' && (
                    <>
                      <li>Try uploading the file again</li>
                      <li>Contact support with the error code</li>
                      <li>Check system health status</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Retry Button */}
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <RefreshCw className="w-5 h-5" />
                <span>Try Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {progress.stage === 'idle' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => startUpload('success')}
              disabled={!selectedFile || !selectedAccount}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Upload & Process
            </button>
          </div>
        )}

        {progress.stage === 'success' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-slate-200">
            <button
              onClick={handleReset}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              Upload Another File
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}