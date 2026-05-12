import { useParams, Link } from 'react-router';
import { ArrowLeft, Sparkles, ChevronDown, ChevronRight } from 'lucide-react';
import { mockSchemaMappings } from '../lib/mock-data';
import { useState } from 'react';
import React from 'react';

export function SchemaMapping() {
  const { accountId } = useParams();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleExpanded = (idx: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(idx)) {
      newExpanded.delete(idx);
    } else {
      newExpanded.add(idx);
    }
    setExpandedRows(newExpanded);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-100 text-green-700 border-green-300';
    if (confidence >= 70) return 'bg-amber-100 text-amber-700 border-amber-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) return 'High';
    if (confidence >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Back Button */}
      <Link to={`/accounts/${accountId}`} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to Account
      </Link>

      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-slate-900">AI Schema Mapping</h1>
        </div>
        <p className="text-slate-600">
          Review and approve AI-suggested column mappings for the census file
        </p>
      </div>

      {/* Drift Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
            <span className="text-amber-700 font-semibold">!</span>
          </div>
          <div className="flex-1">
            <div className="font-medium text-amber-900">Schema Drift Detected</div>
            <div className="text-sm text-amber-700 mt-1">
              Processing paused until mapping approved. 3 new columns detected in recent census file.
            </div>
          </div>
        </div>
      </div>

      {/* Mapping Matrix */}
      <div className="bg-white rounded-lg border border-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-lg">Column Mapping Matrix</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase w-8"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Original Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Suggested Canonical Field</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Data Sample</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockSchemaMappings.map((mapping, idx) => (
                <React.Fragment key={idx}>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleExpanded(idx)}
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        {expandedRows.has(idx) ? (
                          <ChevronDown className="w-4 h-4 text-slate-600" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-slate-600" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium">{mapping.originalColumn}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        defaultValue={mapping.suggestedField}
                        className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={mapping.suggestedField}>{mapping.suggestedField}</option>
                        <option value="other">Other...</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              mapping.confidence >= 90
                                ? 'bg-green-500'
                                : mapping.confidence >= 70
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${mapping.confidence}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{mapping.confidence}%</span>
                        <span
                          className={`px-2 py-0.5 border rounded text-xs font-medium ${getConfidenceColor(
                            mapping.confidence
                          )}`}
                        >
                          {getConfidenceBadge(mapping.confidence)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600 font-mono">{mapping.dataSample}</span>
                    </td>
                  </tr>
                  {expandedRows.has(idx) && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-purple-50 border-t border-purple-100">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 p-2 bg-purple-100 rounded-lg">
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-purple-900 mb-1">
                              AI Explanation
                            </div>
                            <div className="text-sm text-purple-800">{mapping.reason}</div>
                            <div className="mt-2 text-xs text-purple-700">
                              Pattern match based on column naming conventions and historical data analysis
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-white">
              Save as Draft
            </button>
            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50">
              Auto-Approve High Confidence (2 mappings)
            </button>
          </div>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
            Approve & Version
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-2xl font-semibold text-green-700">2</div>
          <div className="text-sm text-green-600 mt-1">High Confidence (&gt;90%)</div>
        </div>
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="text-2xl font-semibold text-amber-700">1</div>
          <div className="text-sm text-amber-600 mt-1">Medium Confidence (70-90%)</div>
        </div>
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-2xl font-semibold text-red-700">1</div>
          <div className="text-sm text-red-600 mt-1">Low Confidence (&lt;70%)</div>
        </div>
      </div>
    </div>
  );
}