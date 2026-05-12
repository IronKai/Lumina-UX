import { ArrowUp, ArrowDown, FileText, Clock, AlertTriangle, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { mockKPIs, mockWorkQueue, mockChartData } from '../lib/mock-data';
import { Link } from 'react-router';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { CensusUpload } from './CensusUpload';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'action-required' | 'pending-association' | 'schema-drift' | 'failed-retries'>('action-required');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const kpiCards = [
    { label: 'Files Received (Today)', value: mockKPIs.filesReceivedToday.value, trend: mockKPIs.filesReceivedToday.trend, icon: FileText, color: 'blue' },
    { label: 'In Progress', value: mockKPIs.inProgress.value, trend: mockKPIs.inProgress.trend, icon: Clock, color: 'yellow' },
    { label: 'Action Required', value: mockKPIs.actionRequired.value, trend: mockKPIs.actionRequired.trend, icon: AlertTriangle, color: 'red' },
    { label: 'Completed (24h)', value: mockKPIs.completed24h.value, trend: mockKPIs.completed24h.trend, icon: CheckCircle, color: 'green' },
    { label: 'SLA Breaches', value: mockKPIs.slaBreaches.value, trend: mockKPIs.slaBreaches.trend, icon: TrendingUp, color: 'orange' },
    { label: 'Schema Drift Alerts', value: mockKPIs.schemaDriftAlerts.value, trend: mockKPIs.schemaDriftAlerts.trend, icon: Activity, color: 'purple' },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    yellow: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
    red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  };

  const getSLAColor = (status: string) => {
    if (status === 'critical') return 'text-red-600 bg-red-50';
    if (status === 'warning') return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  const filteredQueue = mockWorkQueue.filter(item => {
    if (activeTab === 'action-required') return item.status === 'Action Required';
    if (activeTab === 'pending-association') return item.status === 'Pending Association';
    if (activeTab === 'schema-drift') return item.issueType === 'Schema Drift';
    if (activeTab === 'failed-retries') return item.status === 'Failed Retries';
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Welcome to Lumina</h1>
          <p className="text-slate-600 mt-1">Your AI-powered business operations command center</p>
        </div>
        <button 
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Upload Census File
        </button>
      </div>

      {/* System Pulse Cards */}
      <div className="grid grid-cols-6 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          const colors = colorMap[card.color];
          return (
            <button
              key={idx}
              className={`p-4 border ${colors.border} ${colors.bg} rounded-lg hover:shadow-md transition-shadow text-left`}
            >
              <div className="flex items-start justify-between mb-2">
                <Icon className={`w-5 h-5 ${colors.text}`} />
                <div className={`flex items-center gap-1 text-sm ${card.trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {card.trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{Math.abs(card.trend)}</span>
                </div>
              </div>
              <div className={`text-3xl font-semibold ${colors.text}`}>{card.value}</div>
              <div className="text-sm text-slate-600 mt-1">{card.label}</div>
            </button>
          );
        })}
      </div>

      {/* Priority Work Queue */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-lg">Priority Work Queue</h2>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-6">
            {[
              { id: 'action-required', label: 'Action Required' },
              { id: 'pending-association', label: 'Pending Association' },
              { id: 'schema-drift', label: 'Schema Drift' },
              { id: 'failed-retries', label: 'Failed Retries' },
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

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">File Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Issue Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">SLA Timer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 cursor-pointer">
                  <td className="px-6 py-4 text-sm">{item.account}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-700">{item.fileName}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs">{item.type}</span>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.issueType}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSLAColor(item.slaStatus)}`}>
                      {item.slaTimer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">{item.assignedTo || <span className="text-slate-400">Unassigned</span>}</td>
                  <td className="px-6 py-4 text-sm">
                    <Link
                      to={`/files/${item.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-white">
            Assign Selected
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-white">
            Retry Selected
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-white">
            Escalate Selected
          </button>
        </div>
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Error Rate by Account */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Error Rate by Account</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mockChartData.errorRateByAccount}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="account" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Bar dataKey="rate" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Manual Intervention % */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Manual Intervention %</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockChartData.manualInterventionRate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="percentage" stroke="#f59e0b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Trend */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Volume Trend (7 Days)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={mockChartData.volumeTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="files" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <CensusUpload 
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)} 
          onSuccess={(fileId) => {
            console.log('File uploaded successfully:', fileId);
            setIsUploadModalOpen(false);
          }}
        />
      )}
    </div>
  );
}