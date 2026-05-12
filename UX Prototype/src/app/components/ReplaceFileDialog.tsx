import { X, Upload, FileText, AlertTriangle } from 'lucide-react';
import { useState, useRef } from 'react';

interface ReplaceFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  existingFileName: string;
  account: string;
  fileType: 'Census' | 'Deduction';
  onFileSelected: (file: File, replaceReason: string) => void;
}

export function ReplaceFileDialog({
  isOpen,
  onClose,
  existingFileName,
  account,
  fileType,
  onFileSelected
}: ReplaceFileDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [replaceReason, setReplaceReason] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const replaceReasons = [
    'Corrected data errors',
    'Updated source data',
    'Fixed schema issues',
    'Corrected file format',
    'Added missing records',
    'Removed duplicate records',
    'Updated to latest version',
    'Other (specify below)'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }
    if (!replaceReason) {
      alert('Please select a reason for replacing the file');
      return;
    }
    onFileSelected(selectedFile, replaceReason);
    setSelectedFile(null);
    setReplaceReason('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Upload Replacement File</h2>
              <p className="text-sm text-slate-600">Upload a corrected version of the file</p>
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
          {/* Current File Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="text-sm font-medium text-slate-900 mb-3">Current File</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">File Name:</span>
                <span className="font-medium text-slate-900 break-all ml-2">{existingFileName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Account:</span>
                <span className="font-medium text-slate-900">{account}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Type:</span>
                <span className="font-medium text-slate-900">{fileType}</span>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-amber-900 mb-1">Important</div>
                <p className="text-sm text-amber-800">
                  Uploading a replacement file will create a new processing job. The current file will remain 
                  in the system for audit purposes but will be marked as replaced.
                </p>
              </div>
            </div>
          </div>

          {/* Reason for Replacement */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Reason for Replacement <span className="text-red-600">*</span>
            </label>
            <select
              value={replaceReason}
              onChange={(e) => setReplaceReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a reason...</option>
              {replaceReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Upload New File <span className="text-red-600">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : selectedFile
                  ? 'border-green-300 bg-green-50'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                accept=".xlsx,.xls,.csv"
                className="hidden"
              />
              
              {selectedFile ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{selectedFile.name}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </div>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Choose Different File
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Click to upload
                    </button>
                    <span className="text-slate-600"> or drag and drop</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    Excel (.xlsx, .xls) or CSV files only
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-white"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !replaceReason}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload className="w-4 h-4" />
            Upload Replacement
          </button>
        </div>
      </div>
    </div>
  );
}
