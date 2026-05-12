import { X, AlertTriangle, FileText, CheckCircle2, XCircle } from 'lucide-react';

interface DuplicateFileInfo {
  fileName: string;
  uploadedDate: string;
  account: string;
  status: string;
  recordCount?: number;
  processingProgress?: number;
}

interface DuplicateFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  newFile: File;
  existingFile: DuplicateFileInfo;
  onProcessAsDuplicate: () => void;
  onRejectOldFile: () => void;
  onRejectNewFile: () => void;
}

export function DuplicateFileDialog({
  isOpen,
  onClose,
  newFile,
  existingFile,
  onProcessAsDuplicate,
  onRejectOldFile,
  onRejectNewFile
}: DuplicateFileDialogProps) {
  if (!isOpen) return null;

  const isOldFileProcessing = existingFile.status !== 'Complete' && 
                                existingFile.status !== 'Rejected' && 
                                existingFile.status !== 'Failed';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-amber-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Duplicate File Detected</h2>
              <p className="text-sm text-amber-700">A file with the same name already exists</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* File Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Existing File */}
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-slate-600" />
                <h3 className="font-medium text-slate-900">Existing File</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-slate-600">File Name</div>
                  <div className="font-medium text-slate-900 break-all">{existingFile.fileName}</div>
                </div>
                <div>
                  <div className="text-slate-600">Uploaded On</div>
                  <div className="font-medium text-slate-900">{existingFile.uploadedDate}</div>
                </div>
                <div>
                  <div className="text-slate-600">Status</div>
                  <div className="font-medium">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs ${
                      existingFile.status === 'Complete' 
                        ? 'bg-green-100 text-green-700'
                        : existingFile.status.includes('Processing')
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {existingFile.status}
                    </span>
                  </div>
                </div>
                {existingFile.recordCount && (
                  <div>
                    <div className="text-slate-600">Records</div>
                    <div className="font-medium text-slate-900">{existingFile.recordCount.toLocaleString()}</div>
                  </div>
                )}
                {existingFile.processingProgress !== undefined && (
                  <div>
                    <div className="text-slate-600 mb-1">Progress</div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${existingFile.processingProgress}%` }}
                      />
                    </div>
                    <div className="text-xs text-slate-600 mt-1">{existingFile.processingProgress}%</div>
                  </div>
                )}
              </div>
            </div>

            {/* New File */}
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-600" />
                <h3 className="font-medium text-slate-900">New Upload</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <div className="text-slate-600">File Name</div>
                  <div className="font-medium text-slate-900 break-all">{newFile.name}</div>
                </div>
                <div>
                  <div className="text-slate-600">Size</div>
                  <div className="font-medium text-slate-900">{(newFile.size / 1024).toFixed(2)} KB</div>
                </div>
                <div>
                  <div className="text-slate-600">Uploaded On</div>
                  <div className="font-medium text-slate-900">Just now</div>
                </div>
                <div>
                  <div className="text-slate-600">Status</div>
                  <div className="font-medium">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                      Pending Action
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Warning Message */}
          {isOldFileProcessing && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="font-medium text-amber-900 mb-1">Processing in Progress</div>
                  <p className="text-sm text-amber-800">
                    The existing file is currently being processed ({existingFile.processingProgress}% complete). 
                    If you choose to reject it, the processing will be halted immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            <h3 className="font-medium text-slate-900">What would you like to do?</h3>
            
            {/* Option 1: Reject New File */}
            <button
              onClick={onRejectNewFile}
              className="w-full border-2 border-slate-200 hover:border-red-300 hover:bg-red-50 rounded-lg p-4 text-left transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900 mb-1">Reject New File</div>
                  <p className="text-sm text-slate-600">
                    Discard the newly uploaded file and keep the existing one. Use this if the upload was accidental.
                  </p>
                </div>
              </div>
            </button>

            {/* Option 2: Process as Duplicate */}
            <button
              onClick={onProcessAsDuplicate}
              className="w-full border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg p-4 text-left transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900 mb-1">Process as Duplicate</div>
                  <p className="text-sm text-slate-600">
                    Keep both files and process them separately. The new file will be tagged as a duplicate. 
                    Useful for intentional resubmissions or corrections.
                  </p>
                </div>
              </div>
            </button>

            {/* Option 3: Replace Old File (only if old is still processing or not complete) */}
            {isOldFileProcessing && (
              <button
                onClick={onRejectOldFile}
                className="w-full border-2 border-slate-200 hover:border-green-300 hover:bg-green-50 rounded-lg p-4 text-left transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 mb-1">Replace Old File</div>
                    <p className="text-sm text-slate-600">
                      Reject the existing file and process the new one instead. The old file's processing will be halted. 
                      Use this when the new file contains corrections or updated data.
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
