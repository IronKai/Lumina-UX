import { useParams, Link } from 'react-router';
import { mockAccounts, mockAccountRules, mockSchemaDriftIssues } from '../lib/mock-data';
import { ArrowLeft, RefreshCw, Edit, History, CheckCircle, Activity, Database, Cloud } from 'lucide-react';
import { useState } from 'react';
import { AccountRules } from './AccountRules';
import { SchemaDriftResolution } from './SchemaDriftResolution';

export function AccountDetail() {
  const { id } = useParams();
  const account = mockAccounts.find(a => a.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'census' | 'deduction' | 'rules' | 'history'>('overview');
  const [showDriftResolution, setShowDriftResolution] = useState(false);

  if (!account) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-slate-600">Account not found</p>
          <Link to="/accounts" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            ← Back to Accounts
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Lead') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link to="/accounts" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Accounts
      </Link>

      {/* Header Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-2xl font-semibold text-slate-900">{account.name}</h1>
              <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(account.status)}`}>
                {account.status}
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              <div>
                <div className="text-sm text-slate-600 mb-1">FEIN</div>
                <div className="font-medium">{account.fein}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Employee Count</div>
                <div className="font-medium">1,247</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">Lives Covered</div>
                <div className="font-medium">3,156</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 mb-1">TPA</div>
                <div className="font-medium">{account.tpa || 'N/A'}</div>
              </div>
            </div>

            {/* System Indicators */}
            <div className="flex gap-4 mt-6">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">Linked to Analyzer</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <Database className="w-4 h-4 text-blue-600" />
                <span className="text-slate-700">Linked to SydneyConnect</span>
              </div>
              {account.linkedSystems.includes('sharefile') && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Cloud className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-700">Linked to ShareFile</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync Now
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Edit Rules
            </button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
              <History className="w-4 h-4" />
              View History
            </button>
            {account.status === 'Lead' && (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Activate Account
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-6">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'census', label: 'Census' },
              { id: 'deduction', label: 'Deduction' },
              { id: 'rules', label: 'Rules' },
              { id: 'history', label: 'History' },
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
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contract List */}
              <div>
                <h3 className="font-semibold mb-4">Active Contracts</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Contract ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Effective Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">CON-2024-001</td>
                        <td className="px-4 py-3 text-sm">2024-01-01</td>
                        <td className="px-4 py-3 text-sm">Medical</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-medium text-blue-600">CON-2024-002</td>
                        <td className="px-4 py-3 text-sm">2024-01-01</td>
                        <td className="px-4 py-3 text-sm">Dental</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">Active</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ShareFile Location */}
              <div>
                <h3 className="font-semibold mb-4">ShareFile Location</h3>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div className="text-sm text-slate-600">Path</div>
                  <div className="font-mono text-sm mt-1">/clients/acme-corporation/</div>
                </div>
              </div>

              {/* Processing Summary */}
              <div>
                <h3 className="font-semibold mb-4">Processing Summary (30 Days)</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-2xl font-semibold text-blue-700">234</div>
                    <div className="text-sm text-blue-600 mt-1">Files Processed</div>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-2xl font-semibold text-green-700">98.3%</div>
                    <div className="text-sm text-green-600 mt-1">Success Rate</div>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="text-2xl font-semibold text-orange-700">4</div>
                    <div className="text-sm text-orange-600 mt-1">Manual Interventions</div>
                  </div>
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="text-2xl font-semibold text-purple-700">2m 15s</div>
                    <div className="text-sm text-purple-600 mt-1">Avg Processing Time</div>
                  </div>
                </div>
              </div>

              {/* Drift Alerts */}
              {account.hasDrift && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-amber-700 font-semibold">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-amber-900">Schema Drift Detected</div>
                      <div className="text-sm text-amber-700 mt-1">
                        New columns detected in recent census file. Review required before processing continues.
                      </div>
                      <div className="flex gap-3 mt-3">
                        <button
                          onClick={() => setShowDriftResolution(true)}
                          className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-sm"
                        >
                          Resolve Schema Drift
                        </button>
                        <Link
                          to={`/schema-mapping/${account.id}`}
                          className="px-4 py-2 border border-amber-600 text-amber-700 rounded-lg hover:bg-amber-100 text-sm"
                        >
                          View Schema Mapping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'census' && (
            <div className="text-center py-12 text-slate-600">
              Census files for this account will appear here
            </div>
          )}

          {activeTab === 'deduction' && (
            <div className="text-center py-12 text-slate-600">
              Deduction files for this account will appear here
            </div>
          )}

          {activeTab === 'rules' && (
            <div>
              {mockAccountRules[id as keyof typeof mockAccountRules] ? (
                <AccountRules
                  accountId={id!}
                  accountName={account.name}
                  censusRules={mockAccountRules[id as keyof typeof mockAccountRules].census}
                  deductionRules={mockAccountRules[id as keyof typeof mockAccountRules].deduction}
                />
              ) : (
                <div className="text-center py-12 text-slate-600">
                  No rules configured for this account
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-12 text-slate-600">
              Account history will appear here
            </div>
          )}
        </div>
      </div>

      {/* Schema Drift Resolution Modal */}
      {showDriftResolution && account.hasDrift && mockSchemaDriftIssues[id as keyof typeof mockSchemaDriftIssues] && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4">
            <SchemaDriftResolution
              driftIssue={mockSchemaDriftIssues[id as keyof typeof mockSchemaDriftIssues][0]}
              accountName={account.name}
              onResolve={() => {
                console.log('Schema drift resolved');
                setShowDriftResolution(false);
              }}
              onCancel={() => setShowDriftResolution(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}