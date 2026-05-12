import { mockTasks } from '../lib/mock-data';
import { CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

export function TasksExceptions() {
  const [activeTab, setActiveTab] = useState<'pending-association' | 'invoice-failure'>('pending-association');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const pendingTasks = mockTasks.filter(t => t.type === 'Pending Association');
  const invoiceFailures = mockTasks.filter(t => t.type === 'Invoice Failure');

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Tasks & Exceptions</h1>
        <p className="text-slate-600 mt-1">Handle pending associations and resolve invoice failures</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-6">
            {[
              { id: 'pending-association', label: 'Pending Association', count: pendingTasks.length },
              { id: 'invoice-failure', label: 'Invoice Failures', count: invoiceFailures.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedTask(null);
                }}
                className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700 font-medium'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pending Association Content */}
        {activeTab === 'pending-association' && (
          <div className="grid grid-cols-3">
            {/* Task List */}
            <div className="col-span-2 border-r border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">File Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Detected Account</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Suggested Contract</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Invoice Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {pendingTasks.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={`cursor-pointer hover:bg-slate-50 ${
                          selectedTask === task.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-blue-700">{task.fileName}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">{task.detectedAccount}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                              {task.suggestedContract}
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium">
                              {task.confidence}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{task.suggestedInvoiceDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Panel */}
            <div className="p-6">
              {selectedTask ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Association Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-slate-600 mb-1">File Name</div>
                        <div className="font-medium">census_q1_2026.xlsx</div>
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">Detected Account</div>
                        <div className="font-medium">Global Systems LLC</div>
                      </div>
                      <div>
                        <div className="text-slate-600 mb-1">AI Confidence</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '88%' }} />
                          </div>
                          <span className="font-medium">88%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-semibold mb-3">Suggested Contract</h4>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="font-medium text-blue-900">CON-2026-001</div>
                      <div className="text-sm text-blue-700 mt-1">Medical - Effective 2026-01-01</div>
                    </div>

                    <div className="mt-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Or choose different contract
                      </label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>CON-2026-001 (Suggested)</option>
                        <option>CON-2025-003</option>
                        <option>CON-2025-004</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-semibold mb-3">Suggested Invoice Date</h4>
                    <input
                      type="date"
                      defaultValue="2026-03-31"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="pt-6 border-t border-slate-200 space-y-2">
                    <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Confirm Match
                    </button>
                    <button className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                      Choose Different Task
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  Select a task to view details
                </div>
              )}
            </div>
          </div>
        )}

        {/* Invoice Failure Content */}
        {activeTab === 'invoice-failure' && (
          <div className="grid grid-cols-3">
            {/* Failure List */}
            <div className="col-span-2 border-r border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">File</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Contract</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Invoice Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Failure Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {invoiceFailures.map((task) => (
                      <tr
                        key={task.id}
                        onClick={() => setSelectedTask(task.id)}
                        className={`cursor-pointer hover:bg-slate-50 ${
                          selectedTask === task.id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4">
                          <span className="font-medium text-blue-700">{task.fileName}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-mono text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded">
                            {task.contract}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{task.invoiceDate}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-red-700">{task.failureReason}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Panel */}
            <div className="p-6">
              {selectedTask ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Failure Details</h3>
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="font-medium text-red-900 mb-2">SydneyConnect API Error</div>
                      <div className="text-sm text-red-800">
                        Contract CON-2024-001 missing rate schedule. Unable to generate invoice without valid rate configuration.
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="font-semibold mb-3">Suggested Resolution</h4>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="text-sm text-blue-900">
                        <ol className="list-decimal list-inside space-y-2">
                          <li>Verify rate schedule is configured in SydneyConnect</li>
                          <li>Update contract CON-2024-001 with valid rates</li>
                          <li>Retry invoice generation</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 space-y-2">
                    <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Retry Invoice Generation
                    </button>
                    <button className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2">
                      <X className="w-4 h-4" />
                      Mark as Resolved
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  Select a failure to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
