import { mockDeductionFiles } from '../lib/mock-data';
import { Link } from 'react-router';

export function DeductionList() {
  const getStatusColor = (status: string) => {
    if (status === 'Complete') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'In Progress') return 'bg-blue-100 text-blue-700 border-blue-200';
    if (status === 'Action Required') return 'bg-red-100 text-red-700 border-red-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const getInvoiceStatusColor = (status: string) => {
    if (status === 'Created') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Failed') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Deduction Files</h1>
          <p className="text-slate-600 mt-1">View and manage deduction file processing</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Upload Deduction File
        </button>
      </div>

      {/* Deduction Files Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Contract</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Invoice Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Invoice Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockDeductionFiles.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-blue-700">{file.fileName}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900">{file.account}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="font-mono text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                      {file.contract}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{file.invoiceDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(file.status)}`}>
                      {file.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-xs font-medium ${getInvoiceStatusColor(file.invoiceStatus)}`}>
                      {file.invoiceStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/files/${file.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
