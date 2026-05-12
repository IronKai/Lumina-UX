import { CheckCircle, AlertTriangle, XCircle, Activity, Database, Cloud, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function SystemHealth() {
  const services = [
    {
      name: 'Analyzer API',
      status: 'operational',
      uptime: 99.8,
      responseTime: 145,
      icon: Activity,
      lastCheck: '2 minutes ago',
    },
    {
      name: 'SydneyConnect API',
      status: 'operational',
      uptime: 99.9,
      responseTime: 89,
      icon: Database,
      lastCheck: '1 minute ago',
    },
    {
      name: 'ShareFile API',
      status: 'degraded',
      uptime: 97.2,
      responseTime: 342,
      icon: Cloud,
      lastCheck: '3 minutes ago',
    },
  ];

  const getStatusConfig = (status: string) => {
    if (status === 'operational') {
      return {
        color: 'bg-green-100 text-green-700 border-green-300',
        icon: CheckCircle,
        iconColor: 'text-green-600',
        label: 'Operational',
      };
    }
    if (status === 'degraded') {
      return {
        color: 'bg-amber-100 text-amber-700 border-amber-300',
        icon: AlertTriangle,
        iconColor: 'text-amber-600',
        label: 'Degraded',
      };
    }
    return {
      color: 'bg-red-100 text-red-700 border-red-300',
      icon: XCircle,
      iconColor: 'text-red-600',
      label: 'Down',
    };
  };

  const retryQueueData = [
    { time: '00:00', count: 12 },
    { time: '04:00', count: 8 },
    { time: '08:00', count: 15 },
    { time: '12:00', count: 10 },
    { time: '16:00', count: 6 },
    { time: '20:00', count: 4 },
    { time: '23:59', count: 3 },
  ];

  const latencyData = [
    { time: '00:00', analyzer: 120, sydney: 85, sharefile: 280 },
    { time: '04:00', analyzer: 130, sydney: 90, sharefile: 310 },
    { time: '08:00', analyzer: 145, sydney: 89, sharefile: 342 },
    { time: '12:00', analyzer: 138, sydney: 92, sharefile: 325 },
    { time: '16:00', analyzer: 142, sydney: 88, sharefile: 295 },
    { time: '20:00', analyzer: 135, sydney: 87, sharefile: 288 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">System Health</h1>
        <p className="text-slate-600 mt-1">Monitor API connectivity and system performance</p>
      </div>

      {/* Overall Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold mb-1">Overall System Status</h2>
            <p className="text-slate-600 text-sm">All critical systems are operational</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-700">Healthy</span>
          </div>
        </div>
      </div>

      {/* Service Status Cards */}
      <div className="grid grid-cols-3 gap-6">
        {services.map((service) => {
          const StatusIcon = getStatusConfig(service.status).icon;
          const ServiceIcon = service.icon;
          const config = getStatusConfig(service.status);

          return (
            <div key={service.name} className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <ServiceIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    <p className="text-xs text-slate-500">Last check: {service.lastCheck}</p>
                  </div>
                </div>
                <StatusIcon className={`w-5 h-5 ${config.iconColor}`} />
              </div>

              <div className="space-y-3">
                <div className={`px-3 py-2 border rounded ${config.color} text-center`}>
                  <span className="text-sm font-medium">{config.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs text-slate-600 mb-1">Uptime</div>
                    <div className="font-semibold">{service.uptime}%</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded">
                    <div className="text-xs text-slate-600 mb-1">Response</div>
                    <div className="font-semibold">{service.responseTime}ms</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Retry Queue Depth */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Retry Queue Depth</h3>
            <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
              3 pending
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={retryQueueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Processing Latency */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Processing Latency (ms)</h3>
            <TrendingUp className="w-5 h-5 text-amber-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="analyzer" stroke="#3b82f6" strokeWidth={2} name="Analyzer" />
              <Line type="monotone" dataKey="sydney" stroke="#10b981" strokeWidth={2} name="SydneyConnect" />
              <Line type="monotone" dataKey="sharefile" stroke="#f59e0b" strokeWidth={2} name="ShareFile" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Failed Events */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="font-semibold mb-4">Failed Events (Last 24 Hours)</h3>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="text-2xl font-semibold text-red-700">3</div>
            <div className="text-sm text-red-600 mt-1">File Upload Failures</div>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="text-2xl font-semibold text-amber-700">2</div>
            <div className="text-sm text-amber-600 mt-1">API Timeouts</div>
          </div>
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="text-2xl font-semibold text-purple-700">1</div>
            <div className="text-sm text-purple-600 mt-1">Invoice Generation</div>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="text-2xl font-semibold text-slate-700">0</div>
            <div className="text-sm text-slate-600 mt-1">Schema Validation</div>
          </div>
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="font-semibold">Recent Incidents</h3>
        </div>
        <div className="divide-y divide-slate-200">
          <div className="px-6 py-4 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium">ShareFile API Degraded Performance</div>
              <div className="text-sm text-slate-600 mt-1">
                Elevated response times detected. Monitoring situation.
              </div>
              <div className="text-xs text-slate-500 mt-2">2026-02-28 14:30 UTC</div>
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-medium">
              Monitoring
            </span>
          </div>
          <div className="px-6 py-4 flex items-start gap-4">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-medium">SydneyConnect Scheduled Maintenance Completed</div>
              <div className="text-sm text-slate-600 mt-1">
                Maintenance window completed successfully. All services restored.
              </div>
              <div className="text-xs text-slate-500 mt-2">2026-02-27 02:00 UTC</div>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
              Resolved
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
