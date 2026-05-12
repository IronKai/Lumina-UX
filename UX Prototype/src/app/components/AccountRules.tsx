import { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Shield, Zap, Calculator, Filter, ArrowUpDown, X, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface Rule {
  id: string;
  name: string;
  type: 'Generic' | 'Account-Specific';
  category: string;
  scope: string;
  description: string;
  appliedTo: string;
  createdBy: string;
  createdOn: string;
  lastModified?: string;
  status: string;
  canEdit: boolean;
  canRemove: boolean;
  priority: number;
  aiGenerated?: boolean;
  naturalLanguage?: string;
}

interface AccountRulesProps {
  accountId: string;
  accountName: string;
  censusRules: Rule[];
  deductionRules: Rule[];
}

type RuleScope = 'census' | 'deduction';
type ModalType = 'create' | 'edit' | 'remove' | null;

export function AccountRules({ accountId, accountName, censusRules, deductionRules }: AccountRulesProps) {
  const [activeScope, setActiveScope] = useState<RuleScope>('census');
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  
  // AI Rule Creation states
  const [naturalLanguageInput, setNaturalLanguageInput] = useState('');
  const [aiProcessing, setAiProcessing] = useState(false);
  const [generatedRule, setGeneratedRule] = useState<Partial<Rule> | null>(null);
  const [showAiPreview, setShowAiPreview] = useState(false);

  const currentRules = activeScope === 'census' ? censusRules : deductionRules;
  const genericRules = currentRules.filter(r => r.type === 'Generic');
  const accountSpecificRules = currentRules.filter(r => r.type === 'Account-Specific');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Validation': return <Shield className="w-4 h-4" />;
      case 'Business Logic': return <Zap className="w-4 h-4" />;
      case 'Calculation': return <Calculator className="w-4 h-4" />;
      case 'Transformation': return <Filter className="w-4 h-4" />;
      case 'Enrichment': return <ArrowUpDown className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Validation': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Business Logic': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Calculation': return 'bg-green-50 text-green-700 border-green-200';
      case 'Transformation': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Enrichment': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handleAiGenerate = async () => {
    setAiProcessing(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate rule from natural language
    const generated: Partial<Rule> = {
      name: generateRuleName(naturalLanguageInput),
      category: detectCategory(naturalLanguageInput),
      description: generateDescription(naturalLanguageInput),
      naturalLanguage: naturalLanguageInput,
      aiGenerated: true,
      type: 'Account-Specific',
      scope: activeScope === 'census' ? 'Census' : 'Deduction',
      appliedTo: accountName,
      createdBy: 'AI Assistant',
      createdOn: new Date().toISOString().split('T')[0],
      status: 'Draft',
      canEdit: true,
      canRemove: true
    };

    setGeneratedRule(generated);
    setShowAiPreview(true);
    setAiProcessing(false);
  };

  const generateRuleName = (input: string): string => {
    // Simple AI rule name generation
    if (input.toLowerCase().includes('salary') && input.toLowerCase().includes('plan')) {
      return 'Salary-Based Plan Assignment';
    }
    if (input.toLowerCase().includes('dependent') && input.toLowerCase().includes('age')) {
      return 'Dependent Age Override';
    }
    if (input.toLowerCase().includes('location') || input.toLowerCase().includes('office')) {
      return 'Location-Based Processing';
    }
    if (input.toLowerCase().includes('hsa') || input.toLowerCase().includes('contribution')) {
      return 'HSA Contribution Calculation';
    }
    return 'Custom Business Rule';
  };

  const detectCategory = (input: string): string => {
    if (input.toLowerCase().includes('validate') || input.toLowerCase().includes('check')) {
      return 'Validation';
    }
    if (input.toLowerCase().includes('calculate') || input.toLowerCase().includes('compute')) {
      return 'Calculation';
    }
    if (input.toLowerCase().includes('transform') || input.toLowerCase().includes('convert')) {
      return 'Transformation';
    }
    if (input.toLowerCase().includes('add') || input.toLowerCase().includes('enrich')) {
      return 'Enrichment';
    }
    return 'Business Logic';
  };

  const generateDescription = (input: string): string => {
    // Convert natural language to technical description
    return `Automatically ${input.toLowerCase()}`;
  };

  const handleSaveAiRule = () => {
    // In real app, would save to backend
    console.log('Saving AI-generated rule:', generatedRule);
    setShowAiPreview(false);
    setGeneratedRule(null);
    setNaturalLanguageInput('');
    setModalOpen(null);
  };

  const handleRemoveRule = (rule: Rule) => {
    setSelectedRule(rule);
    setModalOpen('remove');
  };

  const confirmRemoveRule = () => {
    // In real app, would remove from backend
    console.log('Removing rule:', selectedRule);
    setModalOpen(null);
    setSelectedRule(null);
  };

  const handleEditRule = (rule: Rule) => {
    setSelectedRule(rule);
    if (rule.naturalLanguage) {
      setNaturalLanguageInput(rule.naturalLanguage);
    }
    setModalOpen('edit');
  };

  const RuleCard = ({ rule }: { rule: Rule }) => (
    <div className={`p-4 border rounded-lg ${
      rule.type === 'Generic' 
        ? 'bg-slate-50 border-slate-200' 
        : 'bg-white border-slate-300'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-medium text-slate-900">{rule.name}</h4>
            {rule.aiGenerated && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">
                <Sparkles className="w-3 h-3" />
                AI Generated
              </span>
            )}
            <span className={`px-2 py-0.5 border rounded text-xs ${getCategoryColor(rule.category)}`}>
              {rule.category}
            </span>
          </div>
          
          <p className="text-sm text-slate-600 mb-2">{rule.description}</p>
          
          {rule.naturalLanguage && (
            <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700 mb-2">
              <span className="font-medium">Natural Language: </span>
              "{rule.naturalLanguage}"
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Created: {rule.createdOn}</span>
            <span>•</span>
            <span>By: {rule.createdBy}</span>
            {rule.lastModified && (
              <>
                <span>•</span>
                <span>Modified: {rule.lastModified}</span>
              </>
            )}
            <span>•</span>
            <span>Priority: {rule.priority}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          {rule.canEdit && (
            <button
              onClick={() => handleEditRule(rule)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              title="Edit rule"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          {rule.canRemove && (
            <button
              onClick={() => handleRemoveRule(rule)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
              title="Remove from account"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {!rule.canEdit && !rule.canRemove && (
            <div className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
              System
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Scope Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveScope('census')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeScope === 'census'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Census Rules ({censusRules.length})
          </button>
          <button
            onClick={() => setActiveScope('deduction')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeScope === 'deduction'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Deduction Rules ({deductionRules.length})
          </button>
        </div>

        <button
          onClick={() => setModalOpen('create')}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Create Rule with AI
        </button>
      </div>

      {/* Generic Rules Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Generic Rules</h3>
          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">
            Applied to all accounts
          </span>
        </div>
        
        <div className="space-y-3">
          {genericRules.map(rule => (
            <RuleCard key={rule.id} rule={rule} />
          ))}
        </div>
      </div>

      {/* Account-Specific Rules Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-slate-900">Account-Specific Rules</h3>
          <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded text-xs">
            {accountName} only
          </span>
        </div>
        
        {accountSpecificRules.length > 0 ? (
          <div className="space-y-3">
            {accountSpecificRules.map(rule => (
              <RuleCard key={rule.id} rule={rule} />
            ))}
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-slate-200 rounded-lg text-center">
            <Zap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">No account-specific rules yet</p>
            <button
              onClick={() => setModalOpen('create')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Create Your First Rule
            </button>
          </div>
        )}
      </div>

      {/* AI Rule Creation Modal */}
      {(modalOpen === 'create' || modalOpen === 'edit') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    {modalOpen === 'edit' ? 'Edit Rule' : 'Create Rule with AI'}
                  </h2>
                  <p className="text-sm text-slate-600">
                    Describe the rule in plain English
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setModalOpen(null);
                  setNaturalLanguageInput('');
                  setGeneratedRule(null);
                  setShowAiPreview(false);
                  setSelectedRule(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {!showAiPreview ? (
                <>
                  {/* Rule Scope Indicator */}
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-700">
                      Creating rule for: <span className="font-medium">{accountName}</span> - 
                      <span className="font-medium"> {activeScope === 'census' ? 'Census' : 'Deduction'} Processing</span>
                    </div>
                  </div>

                  {/* Natural Language Input */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Describe the rule in plain English
                    </label>
                    <textarea
                      value={naturalLanguageInput}
                      onChange={(e) => setNaturalLanguageInput(e.target.value)}
                      placeholder="Example: Employees earning more than 150 thousand dollars in the Executive department should be automatically assigned to the Platinum plan"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                    />
                    <div className="text-xs text-slate-500 mt-2">
                      Be specific about conditions, values, and actions. The AI will convert this to a rule.
                    </div>
                  </div>

                  {/* Example Prompts */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-700">Example prompts:</div>
                    <div className="space-y-2">
                      {[
                        'Employees in California should have their health premiums calculated with state-specific tax rules',
                        'If an employee works part-time (less than 30 hours), assign them to the basic coverage plan',
                        'Calculate wellness credit as $50 per month for employees who completed the health assessment',
                        'Add regional office code based on employee zip code mapping'
                      ].map((example, idx) => (
                        <button
                          key={idx}
                          onClick={() => setNaturalLanguageInput(example)}
                          className="w-full p-3 text-left text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                        >
                          "{example}"
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Generate Button */}
                  <button
                    onClick={handleAiGenerate}
                    disabled={!naturalLanguageInput.trim() || aiProcessing}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {aiProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AI is generating your rule...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate Rule with AI
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  {/* AI Generated Rule Preview */}
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <div className="font-medium text-green-900">Rule Generated Successfully</div>
                          <div className="text-sm text-green-700 mt-1">
                            Review the rule below and make any necessary adjustments
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Original Input */}
                    <div>
                      <div className="text-sm font-medium text-slate-700 mb-2">Your Input:</div>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                        "{naturalLanguageInput}"
                      </div>
                    </div>

                    {/* Generated Rule Details */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Rule Name
                        </label>
                        <input
                          type="text"
                          value={generatedRule?.name || ''}
                          onChange={(e) => setGeneratedRule({ ...generatedRule, name: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Category
                        </label>
                        <select
                          value={generatedRule?.category || ''}
                          onChange={(e) => setGeneratedRule({ ...generatedRule, category: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="Validation">Validation</option>
                          <option value="Business Logic">Business Logic</option>
                          <option value="Calculation">Calculation</option>
                          <option value="Transformation">Transformation</option>
                          <option value="Enrichment">Enrichment</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Technical Description
                        </label>
                        <textarea
                          value={generatedRule?.description || ''}
                          onChange={(e) => setGeneratedRule({ ...generatedRule, description: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-slate-600 mb-1">Scope</div>
                          <div className="font-medium">{generatedRule?.scope}</div>
                        </div>
                        <div>
                          <div className="text-sm text-slate-600 mb-1">Applied To</div>
                          <div className="font-medium">{generatedRule?.appliedTo}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setShowAiPreview(false);
                          setGeneratedRule(null);
                        }}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                      >
                        Back to Edit
                      </button>
                      <button
                        onClick={handleSaveAiRule}
                        className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Save Rule
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Remove Rule Modal */}
      {modalOpen === 'remove' && selectedRule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Remove Rule</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Are you sure you want to remove this rule from {accountName}?
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
                <div className="font-medium text-sm mb-1">{selectedRule.name}</div>
                <div className="text-xs text-slate-600">{selectedRule.description}</div>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-4">
                <div className="text-sm text-amber-800">
                  This will only remove the rule from this account's processing. The rule will remain available for other accounts.
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setModalOpen(null);
                    setSelectedRule(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemoveRule}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
