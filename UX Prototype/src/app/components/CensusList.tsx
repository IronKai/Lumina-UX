import { mockCensusFiles } from '../lib/mock-data';
import { Link } from 'react-router';
import { useState } from 'react';
import { CensusUpload } from './CensusUpload';
import { Download, Upload, RefreshCw, AlertCircle, FileX } from 'lucide-react';

export function CensusList() {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [processingAction, setProcessingAction] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    if (status === 'Complete' || status === 'Processing Complete') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Progress' || status === 'Processing (BOP)' || status === 'Uploading (Analyzer)') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status.startsWith('Error:')) return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'Drift Review Needed') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (status === 'Awaiting Other Files') return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getStatusCategory = (status: string) => {
    if (status.startsWith('Error:')) return 'error';
    if (status === 'Drift Review Needed') return 'action-required';
    if (status === 'Awaiting Other Files') return 'awaiting';
    if (status === 'Processing (BOP)' || status === 'Uploading (Analyzer)') return 'in-progress';
    if (status === 'Complete' || status === 'Processing Complete') return 'complete';
    return 'in-progress';
  };

  const handleDownloadInputFile = (fileId: string, fileName: string) => {
    // Simulate file download
    const blob = new Blob(['Input census data...'], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
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

  const handleDownloadTransformedFile = (fileName: string) => {
    // Simulate file download
    const transformedFileName = fileName.replace(/\.[^/.]+$/, '_transformed.xlsx');
    const blob = new Blob(['Transformed census data...'], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = transformedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRetryNow = async (fileId: string) => {
    setProcessingAction(fileId);
    // Simulate retry
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Retrying file:', fileId);
    setProcessingAction(null);
  };

  const handleUploadReplacement = (fileId: string) => {
    console.log('Opening upload modal for replacement of:', fileId);
    setIsUploadModalOpen(true);
  };

  const renderFileActions = (file: typeof mockCensusFiles[0]) => {
    const category = getStatusCategory(file.status);
    const actions = [];

    // View Details is always available
    actions.push(
      <Link
        key="details"
        to={`/files/${file.id}`}
        className="text-blue-600 hover:text-blue-800 font-medium text-sm"
      >
        View Details
      </Link>
    );

    // Status-specific actions based on the image specification
    switch (file.status) {
      case 'Awaiting Other Files':
        actions.push(
          <button
            key="upload"
            onClick={() => handleUploadReplacement(file.id)}
            className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
            title="Upload additional files"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        );
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        break;

      case 'Processing (BOP)':
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        break;

      case 'Error: Technical':
        actions.push(
          <button
            key="retry"
            onClick={() => handleRetryNow(file.id)}
            disabled={processingAction === file.id}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm disabled:opacity-50"
            title="Retry processing"
          >
            <RefreshCw className={`w-4 h-4 ${processingAction === file.id ? 'animate-spin' : ''}`} />
            <span>Retry Now</span>
          </button>
        );
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        break;

      case 'Error: File Corrupt':
        actions.push(
          <button
            key="upload"
            onClick={() => handleUploadReplacement(file.id)}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
            title="Upload corrected file"
          >
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        );
        break;

      case 'Processing Complete':
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        actions.push(
          <button
            key="download-transformed"
            onClick={() => handleDownloadTransformedFile(file.fileName)}
            className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
            title="Download transformed file"
          >
            <Download className="w-4 h-4" />
            <span>Transformed</span>
          </button>
        );
        break;

      case 'Uploading (Analyzer)':
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        actions.push(
          <button
            key="download-transformed"
            onClick={() => handleDownloadTransformedFile(file.fileName)}
            className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
            title="Download transformed file"
          >
            <Download className="w-4 h-4" />
            <span>Transformed</span>
          </button>
        );
        break;

      case 'Error: Upload Failed':
      case 'Error: Fetching Output':
        actions.push(
          <button
            key="retry"
            onClick={() => handleRetryNow(file.id)}
            disabled={processingAction === file.id}
            className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm disabled:opacity-50"
            title="Retry operation"
          >
            <RefreshCw className={`w-4 h-4 ${processingAction === file.id ? 'animate-spin' : ''}`} />
            <span>Retry Now</span>
          </button>
        );
        actions.push(
          <button
            key="download-input"
            onClick={() => handleDownloadInputFile(file.id, file.fileName)}
            className="text-slate-600 hover:text-slate-800 flex items-center gap-1 text-sm"
            title="Download input file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        actions.push(
          <button
            key="download-transformed"
            onClick={() => handleDownloadTransformedFile(file.fileName)}
            className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
            title="Download transformed file"
          >
            <Download className="w-4 h-4" />
            <span>Transformed</span>
          </button>
        );
        break;

      case 'Complete':
        actions.push(
          <button
            key="download-processed"
            onClick={() => handleDownloadTransformedFile(file.fileName)}
            className="text-green-600 hover:text-green-800 flex items-center gap-1 text-sm"
            title="Download processed file"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        );
        break;

      case 'Drift Review Needed':
        // Handled by View Details
        break;

      default:
        // In Progress and other statuses - no additional actions
        break;
    }

    return actions;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Census Files</h1>
          <p className="text-slate-600 mt-1">View and manage census file processing</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Upload Census File
        </button>
      </div>

      {/* Census Files Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Uploaded On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Rule Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Processing Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockCensusFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-blue-700">{file.fileName}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{file.account}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{file.uploadedOn}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-mono">
                      {file.ruleVersion}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{file.processingTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {renderFileActions(file)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      <CensusUpload 
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={(fileId) => {
          console.log('File uploaded successfully:', fileId);
          // In a real app, you would refresh the file list here
        }}
      />
    </div>
  );
}