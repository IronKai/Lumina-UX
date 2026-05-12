import { mockRules } from '../lib/mock-data';
import { Sparkles, Play, Save, X } from 'lucide-react';
import { useState } from 'react';

export function RuleStudio() {
  const [plainEnglishInput, setPlainEnglishInput] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const getStatusColor = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Draft') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const handleGenerate = () => {
    setShowPreview(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Rule Studio</h1>
          <p className="text-slate-600 mt-1">Create and manage business rules with AI assistance</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Create New Rule
        </button>
      </div>

      {/* Rule List */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-lg">Rule Versions</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Rule Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Created On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Created By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Impact Summary</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockRules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium">{rule.version}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{rule.createdOn}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{rule.createdBy}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 border rounded text-xs font-medium ${getStatusColor(rule.status)}`}>
                      {rule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{rule.impactSummary}</td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rule Editor */}
      <div className="grid grid-cols-3 gap-6">
        {/* Plain English Editor */}
        <div className="col-span-2 bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Plain English Rule Editor</h3>
          </div>

          <div className="space-y-4">
            <textarea
              value={plainEnglishInput}
              onChange={(e) => setPlainEnglishInput(e.target.value)}
              placeholder="Describe your rule in plain English...&#10;&#10;Example: If employee salary is greater than $100,000, assign them to the Executive Medical Plan. If salary is between $50,000 and $100,000, assign to Standard Plan. Otherwise assign to Basic Plan."
              className="w-full h-48 px-4 py-3 border border-slate-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Generate Rule
            </button>
          </div>

          {showPreview && (
            <div className="mt-6 space-y-4">
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-semibold mb-3">Structured Condition Builder</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="grid grid-cols-4 gap-3 items-center">
                      <select className="px-3 py-2 border border-slate-300 rounded bg-white">
                        <option>salary</option>
                      </select>
                      <select className="px-3 py-2 border border-slate-300 rounded bg-white">
                        <option>&gt;</option>
                      </select>
                      <input
                        type="text"
                        defaultValue="100000"
                        className="px-3 py-2 border border-slate-300 rounded"
                      />
                      <span className="text-sm text-slate-600">→ Executive Medical Plan</span>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="grid grid-cols-4 gap-3 items-center">
                      <select className="px-3 py-2 border border-slate-300 rounded bg-white">
                        <option>salary</option>
                      </select>
                      <select className="px-3 py-2 border border-slate-300 rounded bg-white">
                        <option>between</option>
                      </select>
                      <input
                        type="text"
                        defaultValue="50000-100000"
                        className="px-3 py-2 border border-slate-300 rounded"
                      />
                      <span className="text-sm text-slate-600">→ Standard Plan</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-semibold mb-3">DSL Preview</h4>
                <pre className="p-4 bg-slate-900 text-green-400 rounded-lg text-sm overflow-x-auto">
{`IF salary > 100000 THEN
  SET plan = "Executive Medical Plan"
ELSE IF salary >= 50000 AND salary <= 100000 THEN
  SET plan = "Standard Plan"
ELSE
  SET plan = "Basic Plan"
END`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Impact Preview */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold mb-4">Impact Preview</h3>

          {showPreview ? (
            <div className="space-y-6">
              {/* Simulation Panel */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Sample File
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>census_202602.xlsx</option>
                  <option>census_jan2026.csv</option>
                </select>
              </div>

              <button className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2">
                <Play className="w-4 h-4" />
                Run Simulation
              </button>

              {/* Results */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <div className="text-xs text-blue-600 mb-1">Records Impacted</div>
                  <div className="text-xl font-semibold text-blue-700">847</div>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="text-xs text-green-600 mb-1">No Errors Detected</div>
                  <div className="text-sm font-medium text-green-700">100% valid</div>
                </div>
              </div>

              {/* Plan Distribution */}
              <div className="pt-4 border-t border-slate-200">
                <div className="text-sm font-medium mb-3">Plan Distribution</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Executive Medical</span>
                    <span className="font-medium">142 (16.8%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Standard Plan</span>
                    <span className="font-medium">485 (57.3%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Basic Plan</span>
                    <span className="font-medium">220 (25.9%)</span>
                  </div>
                </div>
              </div>

              {/* Approval Actions */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Approve & Activate
                </button>
                <button className="w-full px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  Save as Draft
                </button>
                <button className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Discard
                </button>
              </div>

              <div className="text-xs text-slate-500 pt-2">
                Approval requires Business Configurator role
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              Generate a rule to see impact preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
