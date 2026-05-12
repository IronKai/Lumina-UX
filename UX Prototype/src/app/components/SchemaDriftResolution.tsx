import { useState } from 'react';
import { AlertTriangle, CheckCircle2, X, Info, ArrowRight, Sparkles, RefreshCw, Save, Eye } from 'lucide-react';

interface ColumnDrift {
  columnName: string;
  dataType: string;
  sampleValues: string[];
  nullCount: number;
  totalRecords: number;
  suggestedMapping: string;
  confidence: number;
  reason: string;
}

interface ModifiedColumn {
  columnName: string;
  previousType: string;
  newType: string;
  sampleValues: string[];
  impact: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface DriftIssue {
  id: string;
  fileId: string;
  fileName: string;
  detectedOn: string;
  status: string;
  newColumns: ColumnDrift[];
  removedColumns: string[];
  modifiedColumns: ModifiedColumn[];
}

interface SchemaDriftResolutionProps {
  driftIssue: DriftIssue;
  accountName: string;
  onResolve: () => void;
  onCancel: () => void;
}

type MappingDecision = {
  [columnName: string]: {
    action: 'map' | 'ignore' | 'create-rule';
    targetField?: string;
    customMapping?: string;
  };
};

export function SchemaDriftResolution({ driftIssue, accountName, onResolve, onCancel }: SchemaDriftResolutionProps) {
  const [mappingDecisions, setMappingDecisions] = useState<MappingDecision>({});
  const [activeColumn, setActiveColumn] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600 bg-green-50';
    if (confidence >= 60) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 80) return 'High Confidence';
    if (confidence >= 60) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'Low') return 'text-blue-600 bg-blue-50';
    if (severity === 'Medium') return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const handleAcceptMapping = (column: ColumnDrift) => {
    setMappingDecisions({
      ...mappingDecisions,
      [column.columnName]: {
        action: 'map',
        targetField: column.suggestedMapping
      }
    });
  };

  const handleCustomMapping = (columnName: string, targetField: string) => {
    setMappingDecisions({
      ...mappingDecisions,
      [columnName]: {
        action: 'map',
        targetField: targetField,
        customMapping: targetField
      }
    });
  };

  const handleIgnoreColumn = (columnName: string) => {
    setMappingDecisions({
      ...mappingDecisions,
      [columnName]: {
        action: 'ignore'
      }
    });
  };

  const handleCreateRule = (columnName: string) => {
    setMappingDecisions({
      ...mappingDecisions,
      [columnName]: {
        action: 'create-rule'
      }
    });
  };

  const handleResolveAll = () => {
    // Auto-accept all high confidence mappings
    const autoDecisions: MappingDecision = {};
    driftIssue.newColumns.forEach(column => {
      if (column.confidence >= 80) {
        autoDecisions[column.columnName] = {
          action: 'map',
          targetField: column.suggestedMapping
        };
      }
    });
    setMappingDecisions({ ...mappingDecisions, ...autoDecisions });
  };

  const allResolved = driftIssue.newColumns.every(col => mappingDecisions[col.columnName]);
  const resolvedCount = Object.keys(mappingDecisions).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-amber-900 mb-2">Schema Drift Detected</h2>
            <p className="text-amber-700 mb-4">
              The file <span className="font-medium">{driftIssue.fileName}</span> contains changes to the expected schema. 
              Review and map the new columns below to continue processing.
            </p>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-amber-600 mb-1">File</div>
                <div className="font-medium text-amber-900">{driftIssue.fileName}</div>
              </div>
              <div>
                <div className="text-amber-600 mb-1">Detected</div>
                <div className="font-medium text-amber-900">{driftIssue.detectedOn}</div>
              </div>
              <div>
                <div className="text-amber-600 mb-1">New Columns</div>
                <div className="font-medium text-amber-900">{driftIssue.newColumns.length}</div>
              </div>
              <div>
                <div className="text-amber-600 mb-1">Modified Columns</div>
                <div className="font-medium text-amber-900">{driftIssue.modifiedColumns.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium text-slate-700">
            Resolution Progress
          </div>
          <div className="text-sm text-slate-600">
            {resolvedCount} of {driftIssue.newColumns.length} columns resolved
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              allResolved ? 'bg-green-600' : 'bg-blue-600'
            }`}
            style={{ width: `${(resolvedCount / driftIssue.newColumns.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleResolveAll}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Auto-Resolve High Confidence
        </button>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>
      </div>

      {/* New Columns */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">New Columns Detected</h3>
        <div className="space-y-4">
          {driftIssue.newColumns.map((column) => {
            const decision = mappingDecisions[column.columnName];
            const isResolved = !!decision;

            return (
              <div
                key={column.columnName}
                className={`border rounded-lg overflow-hidden transition-all ${
                  isResolved
                    ? 'border-green-200 bg-green-50'
                    : activeColumn === column.columnName
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                {/* Column Header */}
                <div
                  className="p-4 cursor-pointer"
                  onClick={() => setActiveColumn(activeColumn === column.columnName ? null : column.columnName)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-mono font-semibold text-slate-900">{column.columnName}</h4>
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                          {column.dataType}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getConfidenceColor(column.confidence)}`}>
                          {getConfidenceLabel(column.confidence)} ({column.confidence}%)
                        </span>
                        {isResolved && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            Resolved
                          </span>
                        )}
                      </div>

                      {/* AI Suggestion */}
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-slate-600">AI suggests mapping to:</span>
                        <span className="font-mono font-medium text-slate-900">{column.suggestedMapping}</span>
                      </div>

                      <div className="text-xs text-slate-500">{column.reason}</div>
                    </div>

                    {isResolved && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const newDecisions = { ...mappingDecisions };
                          delete newDecisions[column.columnName];
                          setMappingDecisions(newDecisions);
                        }}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {activeColumn === column.columnName && !isResolved && (
                  <div className="border-t border-slate-200 p-4 bg-white space-y-4">
                    {/* Sample Values */}
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Sample Values</div>
                      <div className="flex flex-wrap gap-2">
                        {column.sampleValues.map((value, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm font-mono">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Data Quality */}
                    <div className="grid grid-cols-3 gap-4 p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="text-xs text-slate-600">Total Records</div>
                        <div className="font-medium">{column.totalRecords}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Null Values</div>
                        <div className="font-medium">{column.nullCount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-600">Fill Rate</div>
                        <div className="font-medium">
                          {((1 - column.nullCount / column.totalRecords) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    {/* Mapping Actions */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-slate-700">Choose an action:</div>
                      
                      {/* Accept AI Suggestion */}
                      <button
                        onClick={() => handleAcceptMapping(column)}
                        className="w-full p-4 border-2 border-purple-200 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            <div>
                              <div className="font-medium text-purple-900">Accept AI Suggestion</div>
                              <div className="text-sm text-purple-700">
                                Map to <span className="font-mono">{column.suggestedMapping}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-purple-600" />
                        </div>
                      </button>

                      {/* Custom Mapping */}
                      <div className="p-4 border border-slate-200 rounded-lg">
                        <div className="font-medium text-slate-900 mb-3">Map to Different Field</div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Enter target field name..."
                            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.currentTarget.value) {
                                handleCustomMapping(column.columnName, e.currentTarget.value);
                              }
                            }}
                          />
                          <button
                            onClick={(e) => {
                              const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                              if (input.value) {
                                handleCustomMapping(column.columnName, input.value);
                              }
                            }}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Map
                          </button>
                        </div>
                      </div>

                      {/* Ignore Column */}
                      <button
                        onClick={() => handleIgnoreColumn(column.columnName)}
                        className="w-full p-3 border border-slate-200 hover:bg-slate-50 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <X className="w-5 h-5 text-slate-600" />
                          <div>
                            <div className="font-medium text-slate-900">Ignore This Column</div>
                            <div className="text-sm text-slate-600">Column will not be processed</div>
                          </div>
                        </div>
                      </button>

                      {/* Create Rule */}
                      <button
                        onClick={() => handleCreateRule(column.columnName)}
                        className="w-full p-3 border border-blue-200 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-blue-600" />
                          <div>
                            <div className="font-medium text-blue-900">Create Custom Rule</div>
                            <div className="text-sm text-blue-700">Transform this column with AI-generated rule</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Resolution Summary */}
                {isResolved && (
                  <div className="border-t border-green-200 p-4 bg-green-50">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span className="text-green-900">
                        {decision.action === 'map' && (
                          <>Mapped to <span className="font-mono font-medium">{decision.targetField}</span></>
                        )}
                        {decision.action === 'ignore' && 'Column will be ignored'}
                        {decision.action === 'create-rule' && 'Custom rule will be created'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modified Columns */}
      {driftIssue.modifiedColumns.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Modified Columns</h3>
          <div className="space-y-3">
            {driftIssue.modifiedColumns.map((column) => (
              <div key={column.columnName} className="p-4 border border-slate-200 rounded-lg bg-white">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-mono font-semibold text-slate-900 mb-1">{column.columnName}</div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-600">Type changed:</span>
                      <span className="px-2 py-0.5 bg-slate-100 rounded">{column.previousType}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">{column.newType}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(column.severity)}`}>
                    {column.severity} Impact
                  </span>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm text-blue-800">
                  <Info className="w-4 h-4 inline mr-2" />
                  {column.impact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Panel */}
      {showPreview && (
        <div className="border border-slate-200 rounded-lg bg-white p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Resolution Preview</h3>
          <div className="space-y-2">
            {Object.entries(mappingDecisions).map(([columnName, decision]) => (
              <div key={columnName} className="flex items-center gap-3 text-sm p-3 bg-slate-50 rounded">
                <span className="font-mono font-medium">{columnName}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <span className="text-slate-600">
                  {decision.action === 'map' && `→ ${decision.targetField}`}
                  {decision.action === 'ignore' && '(ignored)'}
                  {decision.action === 'create-rule' && '→ Custom Rule'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          onClick={onCancel}
          className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
        >
          Cancel
        </button>

        <div className="flex items-center gap-3">
          <button className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Reset All
          </button>
          <button
            onClick={onResolve}
            disabled={!allResolved}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Apply Mappings & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
