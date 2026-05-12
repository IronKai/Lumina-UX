import { mockAccounts } from '../lib/mock-data';
import { Link } from 'react-router';
import { Activity, Database, Cloud, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function AccountsList() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [driftFilter, setDriftFilter] = useState<boolean | null>(null);

  const filteredAccounts = mockAccounts.filter(account => {
    if (statusFilter !== 'all' && account.status !== statusFilter) return false;
    if (driftFilter !== null && account.hasDrift !== driftFilter) return false;
    return true;
  });

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Lead') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const systemIcons: Record<string, any> = {
    analyzer: Activity,
    sydneyconnect: Database,
    sharefile: Cloud,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Accounts</h1>
          <p className="text-slate-600 mt-1">Manage account configurations and connections</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add New Account
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Lead">Lead</option>
              <option value="Terminated">Terminated</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Schema Drift</label>
            <select
              value={driftFilter === null ? 'all' : driftFilter.toString()}
              onChange={(e) => setDriftFilter(e.target.value === 'all' ? null : e.target.value === 'true')}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All</option>
              <option value="true">Has Drift</option>
              <option value="false">No Drift</option>
            </select>
          </div>
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Account Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">FEIN</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Linked Systems</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Last Sync</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Active Contracts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAccounts.map((account) => (
                <tr key={account.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{account.name}</span>
                      {account.hasDrift && (
                        <AlertCircle className="w-4 h-4 text-amber-500" title="Schema drift detected" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(account.status)}`}>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{account.fein}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {account.linkedSystems.map((system) => {
                        const Icon = systemIcons[system];
                        return Icon ? (
                          <div
                            key={system}
                            className="p-1.5 bg-blue-50 rounded border border-blue-200"
                            title={system}
                          >
                            <Icon className="w-4 h-4 text-blue-600" />
                          </div>
                        ) : null;
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {account.lastSync || <span className="text-slate-400">Never</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 text-center">{account.activeContracts}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/accounts/${account.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      View
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
