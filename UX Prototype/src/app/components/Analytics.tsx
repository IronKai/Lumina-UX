import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function Analytics() {
  const processingEfficiency = [
    { month: 'Oct', automated: 75, manual: 25 },
    { month: 'Nov', automated: 78, manual: 22 },
    { month: 'Dec', automated: 82, manual: 18 },
    { month: 'Jan', automated: 85, manual: 15 },
    { month: 'Feb', automated: 88, manual: 12 },
  ];

  const errorTrends = [
    { week: 'Week 1', validation: 12, schema: 3, invoice: 2 },
    { week: 'Week 2', validation: 10, schema: 2, invoice: 1 },
    { week: 'Week 3', validation: 8, schema: 4, invoice: 3 },
    { week: 'Week 4', validation: 6, schema: 2, invoice: 1 },
  ];

  const driftFrequency = [
    { account: 'Acme Corp', drifts: 5 },
    { account: 'TechStart', drifts: 2 },
    { account: 'Global Sys', drifts: 8 },
    { account: 'Innovate', drifts: 1 },
    { account: 'Others', drifts: 4 },
  ];

  const ruleImpact = [
    { name: 'Improved', value: 3421 },
    { name: 'No Change', value: 1245 },
    { name: 'Review Needed', value: 234 },
  ];

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

  const invoiceSuccess = [
    { month: 'Oct', success: 92, failed: 8 },
    { month: 'Nov', success: 94, failed: 6 },
    { month: 'Dec', success: 96, failed: 4 },
    { month: 'Jan', success: 97, failed: 3 },
    { month: 'Feb', success: 98.5, failed: 1.5 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Data-driven insights across your operations</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">Automation Rate</div>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-semibold text-slate-900">88%</div>
          <div className="text-sm text-green-600 mt-1">+13% from last month</div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">Avg Processing Time</div>
            <TrendingDown className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-semibold text-slate-900">2m 45s</div>
          <div className="text-sm text-green-600 mt-1">-32s from last month</div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">Error Rate</div>
            <TrendingDown className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-3xl font-semibold text-slate-900">2.3%</div>
          <div className="text-sm text-green-600 mt-1">-1.2% from last month</div>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-600">Schema Drifts</div>
            <Activity className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-semibold text-slate-900">20</div>
          <div className="text-sm text-slate-600 mt-1">This month</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Processing Efficiency */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Processing Efficiency Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={processingEfficiency}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="automated" stroke="#10b981" strokeWidth={2} name="Automated %" />
              <Line type="monotone" dataKey="manual" stroke="#f59e0b" strokeWidth={2} name="Manual %" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-600">
            Click to drill into underlying records
          </div>
        </div>

        {/* Error Trends */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Error Trends by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={errorTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="validation" fill="#ef4444" name="Validation" />
              <Bar dataKey="schema" fill="#f59e0b" name="Schema" />
              <Bar dataKey="invoice" fill="#8b5cf6" name="Invoice" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-600">
            Click to drill into underlying records
          </div>
        </div>

        {/* Drift Frequency */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Drift Frequency by Account</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={driftFrequency} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" stroke="#64748b" fontSize={12} />
              <YAxis dataKey="account" type="category" stroke="#64748b" fontSize={12} width={100} />
              <Tooltip />
              <Bar dataKey="drifts" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-600">
            Click to drill into underlying records
          </div>
        </div>

        {/* Rule Impact */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Rule Impact Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={ruleImpact}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {ruleImpact.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {ruleImpact.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-slate-700">{item.name}</span>
                </div>
                <span className="font-medium">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Success Rate */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 col-span-2">
          <h3 className="font-semibold mb-4">Invoice Success Rate Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={invoiceSuccess}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="success" stroke="#10b981" strokeWidth={2} name="Success %" />
              <Line type="monotone" dataKey="failed" stroke="#ef4444" strokeWidth={2} name="Failed %" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-slate-600">
            Click to drill into underlying records
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold mb-4">Export Analytics</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Export as CSV
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Export as PDF
          </button>
          <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
