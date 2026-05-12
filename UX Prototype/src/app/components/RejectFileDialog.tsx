import { X, AlertTriangle, FileX } from 'lucide-react';
import { useState } from 'react';

interface RejectFileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileType: 'Census' | 'Deduction';
  account: string;
  onConfirmReject: (reason: string, notes: string) => void;
}

export function RejectFileDialog({
  isOpen,
  onClose,
  fileName,
  fileType,
  account,
  onConfirmReject
}: RejectFileDialogProps) {
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const rejectionReasons = [
    'Incorrect file format',
    'Missing required data',
    'Duplicate submission',
    'Data quality issues',
    'Schema mismatch',
    'Incorrect account',
    'File uploaded in error',
    'Outdated data',
    'Other (specify in notes)'
  ];

  const handleReject = () => {
    if (!reason) {
      alert('Please select a rejection reason');
      return;
    }
    onConfirmReject(reason, notes);
    setReason('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-red-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <FileX className="w-5 h-5 text-red-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Reject File</h2>
              <p className="text-sm text-red-700">This action cannot be undone</p>
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
        <div className="p-6 space-y-6">
          {/* File Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <div>
              <div className="text-sm text-slate-600">File Name</div>
              <div className="font-medium text-slate-900 break-all">{fileName}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-slate-600">Account</div>
                <div className="font-medium text-slate-900">{account}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600">File Type</div>
                <div className="font-medium text-slate-900">{fileType}</div>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-amber-900 mb-1">Warning</div>
                <p className="text-sm text-amber-800">
                  Rejecting this file will mark it as rejected in the system. Any processing in progress will be halted. 
                  This action cannot be undone and will require re-uploading the file to process it again.
                </p>
              </div>
            </div>
          </div>

          {/* Rejection Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Reason for Rejection <span className="text-red-600">*</span>
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a reason...</option>
              {rejectionReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Provide additional details about why this file is being rejected..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
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
            onClick={handleReject}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg flex items-center gap-2"
          >
            <FileX className="w-4 h-4" />
            Reject File
          </button>
        </div>
      </div>
    </div>
  );
}
