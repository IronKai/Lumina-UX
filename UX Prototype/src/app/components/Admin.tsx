import { Settings, Shield, FileText, Bell, Database } from 'lucide-react';
import { useState } from 'react';

export function Admin() {
  const [activeTab, setActiveTab] = useState<'settings' | 'roles' | 'audit'>('settings');
  const [errorThreshold, setErrorThreshold] = useState(20);
  const [retryAttempts, setRetryAttempts] = useState(3);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(70);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Administration</h1>
        <p className="text-slate-600 mt-1">Configure system settings, roles, and access controls</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-6">
            {[
              { id: 'settings', label: 'System Settings', icon: Settings },
              { id: 'roles', label: 'Role Management', icon: Shield },
              { id: 'audit', label: 'Access Logs & Audit', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-700 font-medium'
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'settings' && (
            <div className="space-y-8">
              {/* Processing Settings */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Processing Settings
                </h3>
                <div className="space-y-6 max-w-2xl">
                  {/* Error Threshold */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Error Threshold
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={errorThreshold}
                        onChange={(e) => setErrorThreshold(Number(e.target.value))}
                        className="flex-1"
                      />
                      <div className="w-20 text-center">
                        <input
                          type="number"
                          value={errorThreshold}
                          onChange={(e) => setErrorThreshold(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-center"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Files with fewer than {errorThreshold} errors will show an editable grid. Files exceeding this threshold require reupload.
                    </p>
                  </div>

                  {/* Retry Attempts */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Retry Attempts
                    </label>
                    <select
                      value={retryAttempts}
                      onChange={(e) => setRetryAttempts(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value={1}>1 attempt</option>
                      <option value={2}>2 attempts</option>
                      <option value={3}>3 attempts</option>
                      <option value={5}>5 attempts</option>
                    </select>
                    <p className="text-sm text-slate-600 mt-2">
                      Number of automatic retry attempts before moving to Action Required queue.
                    </p>
                  </div>

                  {/* AI Confidence Threshold */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      AI Confidence Threshold
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="50"
                        max="95"
                        value={aiConfidenceThreshold}
                        onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                        className="flex-1"
                      />
                      <div className="w-20 text-center">
                        <input
                          type="number"
                          value={aiConfidenceThreshold}
                          onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-slate-300 rounded text-center"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Minimum confidence score required for auto-approval of AI suggestions (currently {aiConfidenceThreshold}%).
                    </p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  Notification Settings
                </h3>
                <div className="space-y-3 max-w-2xl">
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">SLA Breach Alerts</div>
                      <div className="text-xs text-slate-600">Email notifications when files exceed SLA timers</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Schema Drift Notifications</div>
                      <div className="text-xs text-slate-600">Alert when new schema drift is detected</div>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">Daily Processing Summary</div>
                      <div className="text-xs text-slate-600">Receive daily summary of processing activity</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Integration Settings */}
              <div className="pt-6 border-t border-slate-200">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  Integration Settings
                </h3>
                <div className="space-y-3 max-w-2xl">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">Analyzer API</div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Connected
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Endpoint: https://api.analyzer.example.com
                    </div>
                    <button className="px-3 py-1.5 border border-slate-300 rounded text-sm hover:bg-slate-50">
                      Test Connection
                    </button>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">SydneyConnect API</div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                        Connected
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-3">
                      Endpoint: https://api.sydneyconnect.example.com
                    </div>
                    <button className="px-3 py-1.5 border border-slate-300 rounded text-sm hover:bg-slate-50">
                      Test Connection
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-6 border-t border-slate-200 flex gap-3">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
                <button className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}

          {activeTab === 'roles' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">User Roles & Permissions</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Capabilities</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Users</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-4 font-medium">Operations User</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          Fix errors, process files, associate tasks
                        </td>
                        <td className="px-4 py-4 text-sm">12 users</td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-medium">Business Configurator</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          Approve mappings, edit rules
                        </td>
                        <td className="px-4 py-4 text-sm">4 users</td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-medium">Supervisor</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          View analytics, override statuses
                        </td>
                        <td className="px-4 py-4 text-sm">3 users</td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-4 font-medium">Admin</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          System settings, thresholds, permissions
                        </td>
                        <td className="px-4 py-4 text-sm">2 users</td>
                        <td className="px-4 py-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Edit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add New Role
              </button>
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Access Logs & Audit Trail</h3>
                <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-sm">
                  Export Audit Log
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Timestamp</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Resource</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600">2026-02-28 14:32:15</td>
                      <td className="px-4 py-3 text-sm">sarah.chen@company.com</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">APPROVE</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">Rule v2.1</td>
                      <td className="px-4 py-3 text-sm font-mono">192.168.1.42</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600">2026-02-28 14:28:03</td>
                      <td className="px-4 py-3 text-sm">mike.johnson@company.com</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">UPLOAD</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">census_202602.xlsx</td>
                      <td className="px-4 py-3 text-sm font-mono">192.168.1.55</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-slate-600">2026-02-28 14:15:22</td>
                      <td className="px-4 py-3 text-sm">admin@company.com</td>
                      <td className="px-4 py-3 text-sm">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs">UPDATE</span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono">System Settings</td>
                      <td className="px-4 py-3 text-sm font-mono">192.168.1.10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
