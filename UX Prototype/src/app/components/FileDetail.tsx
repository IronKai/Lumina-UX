import { useParams, Link } from 'react-router';
import { mockFileDetail } from '../lib/mock-data';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw, Download, FileX, Upload } from 'lucide-react';
import { useState } from 'react';
import { RejectFileDialog } from './RejectFileDialog';
import { ReplaceFileDialog } from './ReplaceFileDialog';

export function FileDetail() {
  const { id } = useParams();
  const fileData = mockFileDetail[id as keyof typeof mockFileDetail];
  const [activeTab, setActiveTab] = useState<'input' | 'transformed' | 'output' | 'errors' | 'rules'>('input');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [fileRejected, setFileRejected] = useState(false);
  const [rejectionInfo, setRejectionInfo] = useState<{ reason: string; notes: string } | null>(null);

  if (!fileData) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-600">File not found</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStepIcon = (status: string) => {
    if (status === 'complete') return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === 'warning') return <AlertTriangle className="w-5 h-5 text-amber-600" />;
    if (status === 'error') return <XCircle className="w-5 h-5 text-red-600" />;
    return <Clock className="w-5 h-5 text-slate-400" />;
  };

  const handleDownloadFile = (fileName: string, fileType: string) => {
    // Simulate file download
    const blob = new Blob([`Processed ${fileType} data...`], { 
      type: fileType === 'enrollment' 
        ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        : 'text/csv' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRejectFile = (reason: string, notes: string) => {
    setRejectionInfo({ reason, notes });
    setFileRejected(true);
    setShowRejectDialog(false);
    // In real implementation, make API call to reject file
    console.log('File rejected:', { reason, notes });
  };

  const handleReplaceFile = (file: File, replaceReason: string) => {
    setShowReplaceDialog(false);
    // In real implementation, upload the new file
    console.log('Replacing file with:', file.name, 'Reason:', replaceReason);
    alert(`New file "${file.name}" would be uploaded to replace this file. Reason: ${replaceReason}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-slate-900 mb-4">{fileData.fileName}</h1>
            
            <div className="grid grid-cols-6 gap-6">
              <div>
                <div className="text-sm text-slate-600 mb-1">Account</div>
                <div className="font-medium">{fileData.account}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">File Type</div>
                <div className="font-medium">{fileData.fileType}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Uploaded By</div>
                <div className="font-medium text-sm">{fileData.uploadedBy}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Source</div>
                <div className="font-medium">{fileData.source}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Rule Version</div>
                <div className="font-medium font-mono text-sm">{fileData.ruleVersion}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Processing Duration</div>
                <div className="font-medium">{fileData.processingDuration}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!fileRejected && (
              <>
                <button 
                  onClick={() => setShowReplaceDialog(true)}
                  className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload Corrected File
                </button>
                <button 
                  onClick={() => setShowRejectDialog(true)}
                  className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 flex items-center gap-2"
                >
                  <FileX className="w-4 h-4" />
                  Reject File
                </button>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Reprocess
                </button>
              </>
            )}
            {fileRejected && (
              <div className="px-4 py-2 bg-red-100 border border-red-300 rounded-lg text-red-700 font-medium">
                File Rejected
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rejection Info Banner */}
      {fileRejected && rejectionInfo && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <FileX className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium text-red-900 mb-1">File Rejected</div>
              <div className="text-sm text-red-700 mb-2">
                <strong>Reason:</strong> {rejectionInfo.reason}
              </div>
              {rejectionInfo.notes && (
                <div className="text-sm text-red-700">
                  <strong>Notes:</strong> {rejectionInfo.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Processing Timeline */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Processing Timeline</h3>
          
          <div className="space-y-4">
            {fileData.timeline.map((step, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="flex-shrink-0">
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{step.step}</div>
                  {step.timestamp && (
                    <div className="text-xs text-slate-500 mt-0.5">{step.timestamp}</div>
                  )}
                  {step.detail && (
                    <div className="text-xs text-amber-700 mt-1 p-2 bg-amber-50 rounded border border-amber-200">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs Content */}
        <div className="col-span-2 bg-white rounded-lg border border-slate-200">
          {/* Tabs */}
          <div className="border-b border-slate-200 px-6">
            <div className="flex gap-6">
              {[
                { id: 'input', label: 'Input Preview' },
                { id: 'transformed', label: 'Transformed Data' },
                { id: 'output', label: 'Output Files' },
                { id: 'errors', label: 'Errors' },
                { id: 'rules', label: 'Rule Execution Log' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 font-medium'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'errors' && fileData.errors.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs">
                      {fileData.errors.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'input' && (
              <div>
                {fileData.inputPreview.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-slate-200">
                      <thead className="bg-slate-50">
                        <tr>
                          {Object.keys(fileData.inputPreview[0]).map((key) => (
                            <th key={key} className="px-3 py-2 text-left font-medium text-slate-700 border-b">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {fileData.inputPreview.map((row, idx) => (
                          <tr key={idx} className="border-b">
                            {Object.entries(row).map(([key, value], cellIdx) => (
                              <td
                                key={cellIdx}
                                className={`px-3 py-2 ${
                                  value === '' ? 'bg-red-50 text-red-700 font-medium' : ''
                                }`}
                              >
                                {value || <span className="text-slate-400">—</span>}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="text-xs text-slate-500 mt-3">
                      Showing first 2 rows. Invalid cells are highlighted in red.
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-600">
                    Input preview not available
                  </div>
                )}
              </div>
            )}

            {activeTab === 'transformed' && (
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                  Transformed using Mapping {fileData.ruleVersion}
                </div>
                <div className="text-center py-8 text-slate-600">
                  Canonical format preview will appear here
                </div>
              </div>
            )}

            {activeTab === 'output' && (
              <div className="space-y-3">
                <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enrollment File</div>
                    <div className="text-sm text-slate-600">enrollment_output.xlsx</div>
                  </div>
                  <button 
                    onClick={() => handleDownloadFile('enrollment_output.xlsx', 'enrollment')}
                    className="p-2 hover:bg-white rounded-lg border border-slate-300 flex items-center gap-2 px-3"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
                <div className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center justify-between">
                  <div>
                    <div className="font-medium">Deduction File</div>
                    <div className="text-sm text-slate-600">deduction_output.csv</div>
                  </div>
                  <button 
                    onClick={() => handleDownloadFile('deduction_output.csv', 'deduction')}
                    className="p-2 hover:bg-white rounded-lg border border-slate-300 flex items-center gap-2 px-3"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-700">
                  <div className="font-medium mb-1">Files Ready for Download</div>
                  <div className="text-xs">
                    These files have been processed and are ready to download. They contain validated and transformed data.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'errors' && (
              <div className="space-y-4">
                {fileData.errors.map((error, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border rounded-lg ${
                      error.severity === 'error'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-amber-50 border-amber-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium">{error.type}</div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          error.severity === 'error'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {error.count} records
                      </span>
                    </div>
                    <div className="text-sm">{error.details}</div>
                    {error.severity === 'error' && error.count < 20 && (
                      <button className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Edit Records
                      </button>
                    )}
                    {error.severity === 'error' && error.count >= 20 && (
                      <button className="mt-3 px-3 py-1.5 border border-slate-300 rounded text-sm hover:bg-white">
                        Reupload File
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'rules' && (
              <div className="text-center py-8 text-slate-600">
                Rule execution log will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reject File Dialog */}
      <RejectFileDialog
        isOpen={showRejectDialog}
        onClose={() => setShowRejectDialog(false)}
        fileName={fileData.fileName}
        fileType={fileData.fileType as 'Census' | 'Deduction'}
        account={fileData.account}
        onConfirmReject={handleRejectFile}
      />

      {/* Replace File Dialog */}
      <ReplaceFileDialog
        isOpen={showReplaceDialog}
        onClose={() => setShowReplaceDialog(false)}
        existingFileName={fileData.fileName}
        account={fileData.account}
        fileType={fileData.fileType as 'Census' | 'Deduction'}
        onFileSelected={handleReplaceFile}
      />
    </div>
  );
}