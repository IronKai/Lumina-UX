// Mock data for the AI-first UX system

export const mockKPIs = {
  filesReceivedToday: { value: 127, trend: 12 },
  inProgress: { value: 34, trend: -5 },
  actionRequired: { value: 18, trend: 3 },
  completed24h: { value: 89, trend: 8 },
  slaBreaches: { value: 3, trend: -2 },
  schemaDriftAlerts: { value: 2, trend: 0 },
};

export const mockWorkQueue = [
  {
    id: 'WQ-001',
    account: 'Acme Corporation',
    fileName: 'census_202602.xlsx',
    type: 'Census',
    issueType: 'Schema Drift',
    slaTimer: '2h 15m',
    slaStatus: 'warning',
    assignedTo: 'Sarah Chen',
    status: 'Action Required'
  },
  {
    id: 'WQ-002',
    account: 'TechStart Inc',
    fileName: 'deduction_jan2026.csv',
    type: 'Deduction',
    issueType: 'Validation Failed',
    slaTimer: '45m',
    slaStatus: 'critical',
    assignedTo: 'Mike Johnson',
    status: 'Action Required'
  },
  {
    id: 'WQ-003',
    account: 'Global Systems LLC',
    fileName: 'census_q1_2026.xlsx',
    type: 'Census',
    issueType: 'Pending Association',
    slaTimer: '5h 30m',
    slaStatus: 'normal',
    assignedTo: null,
    status: 'Pending Association'
  },
  {
    id: 'WQ-004',
    account: 'Innovate Partners',
    fileName: 'ded_feb_final.xlsx',
    type: 'Deduction',
    issueType: 'Failed Retry',
    slaTimer: '1h 10m',
    slaStatus: 'warning',
    assignedTo: 'Sarah Chen',
    status: 'Failed Retries'
  },
];

export const mockAccounts = [
  {
    id: 'ACC-001',
    name: 'Acme Corporation',
    status: 'Active',
    fein: '12-3456789',
    linkedSystems: ['analyzer', 'sydneyconnect'],
    lastSync: '2026-02-28 09:30',
    activeContracts: 3,
    hasDrift: true,
    hasPendingFiles: true,
    tpa: 'First Benefits',
    broker: 'Risk Management Group'
  },
  {
    id: 'ACC-002',
    name: 'TechStart Inc',
    status: 'Active',
    fein: '98-7654321',
    linkedSystems: ['analyzer', 'sydneyconnect', 'sharefile'],
    lastSync: '2026-02-28 08:15',
    activeContracts: 2,
    hasDrift: false,
    hasPendingFiles: true,
    tpa: 'Benefits Plus',
    broker: 'Insurance Advisors'
  },
  {
    id: 'ACC-003',
    name: 'Global Systems LLC',
    status: 'Lead',
    fein: '45-1234567',
    linkedSystems: ['analyzer'],
    lastSync: null,
    activeContracts: 0,
    hasDrift: false,
    hasPendingFiles: false,
    tpa: null,
    broker: 'Strategic Benefits'
  },
  {
    id: 'ACC-004',
    name: 'Innovate Partners',
    status: 'Active',
    fein: '78-9012345',
    linkedSystems: ['analyzer', 'sydneyconnect'],
    lastSync: '2026-02-27 16:45',
    activeContracts: 5,
    hasDrift: false,
    hasPendingFiles: false,
    tpa: 'Benefits Plus',
    broker: 'Risk Management Group'
  },
];

export const mockCensusFiles = [
  {
    id: 'CF-001',
    fileName: 'census_202602.xlsx',
    account: 'Acme Corporation',
    uploadedOn: '2026-02-28',
    status: 'Drift Review Needed',
    ruleVersion: 'v2.1',
    processingTime: '1m 45s',
    recordCount: 250
  },
  {
    id: 'CF-002',
    fileName: 'census_january_2026.xlsx',
    account: 'TechCorp Industries',
    uploadedOn: '2026-02-15',
    status: 'Complete',
    ruleVersion: 'v2.1',
    processingTime: '2m 10s',
    recordCount: 340
  },
  {
    id: 'CF-003',
    fileName: 'employee_data_Q1.xlsx',
    account: 'Global Services Inc',
    uploadedOn: '2026-02-10',
    status: 'In Progress',
    ruleVersion: 'v2.0',
    processingTime: '-',
    recordCount: 520
  },
  {
    id: 'CF-004',
    fileName: 'census_feb_2026.xlsx',
    account: 'Acme Corporation',
    uploadedOn: '2026-02-25',
    status: 'Awaiting Other Files',
    ruleVersion: 'v2.1',
    processingTime: '-',
    recordCount: 250
  },
  {
    id: 'CF-005',
    fileName: 'census_corrupted.xlsx',
    account: 'TechCorp Industries',
    uploadedOn: '2026-02-27',
    status: 'Error: File Corrupt',
    ruleVersion: 'v2.1',
    processingTime: '0m 05s',
    recordCount: 0
  },
  {
    id: 'CF-006',
    fileName: 'census_technical_error.xlsx',
    account: 'Global Services Inc',
    uploadedOn: '2026-02-26',
    status: 'Error: Technical',
    ruleVersion: 'v2.0',
    processingTime: '1m 20s',
    recordCount: 340
  },
  {
    id: 'CF-007',
    fileName: 'census_q1_final.xlsx',
    account: 'Acme Corporation',
    uploadedOn: '2026-02-20',
    status: 'Processing Complete',
    ruleVersion: 'v2.1',
    processingTime: '2m 30s',
    recordCount: 450
  },
  {
    id: 'CF-008',
    fileName: 'census_uploading.xlsx',
    account: 'TechCorp Industries',
    uploadedOn: '2026-02-28',
    status: 'Uploading (Analyzer)',
    ruleVersion: 'v2.1',
    processingTime: '-',
    recordCount: 280
  },
  {
    id: 'CF-009',
    fileName: 'census_upload_failed.xlsx',
    account: 'Global Services Inc',
    uploadedOn: '2026-02-27',
    status: 'Error: Upload Failed',
    ruleVersion: 'v2.0',
    processingTime: '3m 15s',
    recordCount: 380
  },
  {
    id: 'CF-010',
    fileName: 'census_fetch_error.xlsx',
    account: 'Acme Corporation',
    uploadedOn: '2026-02-26',
    status: 'Error: Fetching Output',
    ruleVersion: 'v2.1',
    processingTime: '2m 45s',
    recordCount: 310
  },
  {
    id: 'CF-011',
    fileName: 'census_processing_bop.xlsx',
    account: 'TechCorp Industries',
    uploadedOn: '2026-02-28',
    status: 'Processing (BOP)',
    ruleVersion: 'v2.1',
    processingTime: '-',
    recordCount: 290
  }
];

export const mockDeductionFiles = [
  {
    id: 'DF-001',
    fileName: 'deduction_jan2026.csv',
    account: 'TechStart Inc',
    contract: 'CON-2024-001',
    invoiceDate: '2026-01-31',
    status: 'Action Required',
    invoiceStatus: 'Failed',
  },
  {
    id: 'DF-002',
    fileName: 'ded_feb_final.xlsx',
    account: 'Innovate Partners',
    contract: 'CON-2025-003',
    invoiceDate: '2026-02-28',
    status: 'Complete',
    invoiceStatus: 'Created',
  },
];

export const mockFileDetail = {
  'CF-001': {
    fileName: 'census_202602.xlsx',
    account: 'Acme Corporation',
    fileType: 'Census',
    uploadedBy: 'auto@sharefile',
    source: 'ShareFile',
    ruleVersion: 'v2.1',
    processingDuration: '3m 42s',
    timeline: [
      { step: 'File Received', status: 'complete', timestamp: '2026-02-28 07:30:00' },
      { step: 'Schema Mapped', status: 'complete', timestamp: '2026-02-28 07:30:15' },
      { step: 'Validation Complete', status: 'warning', timestamp: '2026-02-28 07:31:00', detail: 'Schema drift detected in 3 columns' },
      { step: 'Transformation Complete', status: 'pending' },
      { step: 'Uploaded to Analyzer', status: 'pending' },
      { step: 'Output Retrieved', status: 'pending' },
      { step: 'Uploaded to ShareFile', status: 'pending' },
      { step: 'Complete', status: 'pending' },
    ],
    errors: [
      { type: 'Schema Drift', count: 3, severity: 'warning', details: 'New columns detected: DEPT_CODE, LOCATION_ID, HIRE_TYPE' },
      { type: 'Missing Required Field', count: 12, severity: 'error', details: 'SSN missing for 12 records' },
    ],
    inputPreview: [
      { EMPLOYEE_ID: 'E001', FIRST_NAME: 'John', LAST_NAME: 'Smith', SSN: '***-**-1234', DEPT_CODE: 'IT', LOCATION_ID: 'NYC-01' },
      { EMPLOYEE_ID: 'E002', FIRST_NAME: 'Jane', LAST_NAME: 'Doe', SSN: '', DEPT_CODE: 'HR', LOCATION_ID: 'LA-02' },
    ]
  },
  'DF-001': {
    fileName: 'deduction_jan2026.csv',
    account: 'TechStart Inc',
    fileType: 'Deduction',
    uploadedBy: 'sarah.chen@company.com',
    source: 'Manual',
    ruleVersion: 'v2.1',
    processingDuration: '4m 15s',
    timeline: [
      { step: 'File Received', status: 'complete', timestamp: '2026-02-28 06:15:00' },
      { step: 'Schema Mapped', status: 'complete', timestamp: '2026-02-28 06:15:20' },
      { step: 'Validation Complete', status: 'complete', timestamp: '2026-02-28 06:16:00' },
      { step: 'Transformation Complete', status: 'complete', timestamp: '2026-02-28 06:17:30' },
      { step: 'Invoice Generation', status: 'error', timestamp: '2026-02-28 06:18:00', detail: 'SydneyConnect API error: Invalid contract configuration' },
      { step: 'Complete', status: 'pending' },
    ],
    errors: [
      { type: 'Invoice Creation Failed', count: 1, severity: 'error', details: 'SydneyConnect returned error: Contract CON-2024-001 missing rate schedule' },
    ],
    inputPreview: []
  }
};

export const mockSchemaMappings = [
  {
    originalColumn: 'EMPLOYEE_ID',
    suggestedField: 'employee_number',
    confidence: 95,
    reason: 'Column name exact match with historical pattern',
    dataSample: 'E001, E002, E003'
  },
  {
    originalColumn: 'FIRST_NAME',
    suggestedField: 'first_name',
    confidence: 98,
    reason: 'Standard naming convention detected',
    dataSample: 'John, Jane, Michael'
  },
  {
    originalColumn: 'DEPT_CODE',
    suggestedField: 'department',
    confidence: 72,
    reason: 'Similar column found in 3 other accounts',
    dataSample: 'IT, HR, FIN'
  },
  {
    originalColumn: 'LOCATION_ID',
    suggestedField: 'location_code',
    confidence: 65,
    reason: 'Pattern matches location identifiers',
    dataSample: 'NYC-01, LA-02, CHI-03'
  },
];

export const mockRules = [
  {
    id: 'RULE-001',
    version: 'v2.1',
    createdOn: '2026-02-15',
    createdBy: 'admin@company.com',
    status: 'Active',
    impactSummary: '3,421 records affected',
    description: 'Auto-assign plan based on salary tier'
  },
  {
    id: 'RULE-002',
    version: 'v2.0',
    createdOn: '2026-01-20',
    createdBy: 'business@company.com',
    status: 'Archived',
    impactSummary: '2,890 records affected',
    description: 'Legacy plan assignment logic'
  },
  {
    id: 'RULE-003',
    version: 'v2.2-draft',
    createdOn: '2026-02-28',
    createdBy: 'admin@company.com',
    status: 'Draft',
    impactSummary: 'Not yet applied',
    description: 'New dependent coverage rules'
  },
];

export const mockAccountRules = {
  'ACC-001': {
    census: [
      {
        id: 'RULE-C-GENERIC-001',
        name: 'Standard SSN Validation',
        type: 'Generic',
        category: 'Validation',
        scope: 'Census',
        description: 'Validate SSN format matches XXX-XX-XXXX pattern',
        appliedTo: 'All Accounts',
        createdBy: 'System',
        createdOn: '2025-01-01',
        status: 'Active',
        canEdit: false,
        canRemove: false,
        priority: 1
      },
      {
        id: 'RULE-C-GENERIC-002',
        name: 'Date of Birth Validation',
        type: 'Generic',
        category: 'Validation',
        scope: 'Census',
        description: 'Ensure DOB is in valid format and person is between 18-100 years old',
        appliedTo: 'All Accounts',
        createdBy: 'System',
        createdOn: '2025-01-01',
        status: 'Active',
        canEdit: false,
        canRemove: false,
        priority: 2
      },
      {
        id: 'RULE-C-GENERIC-003',
        name: 'Employment Status Mapping',
        type: 'Generic',
        category: 'Transformation',
        scope: 'Census',
        description: 'Map employment status codes to standard values (Active, Terminated, LOA)',
        appliedTo: 'All Accounts',
        createdBy: 'System',
        createdOn: '2025-01-01',
        status: 'Active',
        canEdit: false,
        canRemove: false,
        priority: 3
      },
      {
        id: 'RULE-C-ACC001-001',
        name: 'Executive Tier Auto-Assignment',
        type: 'Account-Specific',
        category: 'Business Logic',
        scope: 'Census',
        description: 'If salary > $150,000 and department = "Executive", automatically assign to Platinum plan',
        appliedTo: 'Acme Corporation',
        createdBy: 'sarah.chen@company.com',
        createdOn: '2026-02-10',
        lastModified: '2026-02-15',
        status: 'Active',
        canEdit: true,
        canRemove: true,
        priority: 10,
        aiGenerated: true,
        naturalLanguage: 'Employees earning more than 150 thousand dollars in the Executive department should be automatically assigned to the Platinum plan'
      },
      {
        id: 'RULE-C-ACC001-002',
        name: 'Dependent Age Override',
        type: 'Account-Specific',
        category: 'Business Logic',
        scope: 'Census',
        description: 'Allow dependents up to age 28 if enrolled in college (normally 26)',
        appliedTo: 'Acme Corporation',
        createdBy: 'mike.johnson@company.com',
        createdOn: '2026-01-20',
        status: 'Active',
        canEdit: true,
        canRemove: true,
        priority: 11,
        aiGenerated: false
      },
      {
        id: 'RULE-C-ACC001-003',
        name: 'Location-Based Coverage',
        type: 'Account-Specific',
        category: 'Enrichment',
        scope: 'Census',
        description: 'Add location_code field based on office mapping: NYC->LOC001, LA->LOC002, CHI->LOC003',
        appliedTo: 'Acme Corporation',
        createdBy: 'sarah.chen@company.com',
        createdOn: '2026-02-01',
        status: 'Active',
        canEdit: true,
        canRemove: true,
        priority: 12,
        aiGenerated: true,
        naturalLanguage: 'Map office locations to codes where New York City becomes LOC001, Los Angeles becomes LOC002, and Chicago becomes LOC003'
      }
    ],
    deduction: [
      {
        id: 'RULE-D-GENERIC-001',
        name: 'Premium Amount Validation',
        type: 'Generic',
        category: 'Validation',
        scope: 'Deduction',
        description: 'Ensure premium amounts are positive and within expected ranges',
        appliedTo: 'All Accounts',
        createdBy: 'System',
        createdOn: '2025-01-01',
        status: 'Active',
        canEdit: false,
        canRemove: false,
        priority: 1
      },
      {
        id: 'RULE-D-GENERIC-002',
        name: 'Invoice Date Validation',
        type: 'Generic',
        category: 'Validation',
        scope: 'Deduction',
        description: 'Invoice date must be within current or previous month',
        appliedTo: 'All Accounts',
        createdBy: 'System',
        createdOn: '2025-01-01',
        status: 'Active',
        canEdit: false,
        canRemove: false,
        priority: 2
      },
      {
        id: 'RULE-D-ACC001-001',
        name: 'HSA Contribution Calculation',
        type: 'Account-Specific',
        category: 'Calculation',
        scope: 'Deduction',
        description: 'Calculate employer HSA contribution as 3% of base salary for employees with HDHP',
        appliedTo: 'Acme Corporation',
        createdBy: 'sarah.chen@company.com',
        createdOn: '2026-01-15',
        status: 'Active',
        canEdit: true,
        canRemove: true,
        priority: 10,
        aiGenerated: true,
        naturalLanguage: 'For employees with high deductible health plans, calculate employer HSA contribution as 3 percent of their base salary'
      },
      {
        id: 'RULE-D-ACC001-002',
        name: 'Multi-State Tax Adjustment',
        type: 'Account-Specific',
        category: 'Calculation',
        scope: 'Deduction',
        description: 'Apply state-specific pre-tax rules for CA, NY, NJ employees',
        appliedTo: 'Acme Corporation',
        createdBy: 'admin@company.com',
        createdOn: '2026-02-01',
        status: 'Active',
        canEdit: true,
        canRemove: true,
        priority: 11,
        aiGenerated: false
      }
    ]
  }
};

export const mockSchemaDriftIssues = {
  'ACC-001': [
    {
      id: 'DRIFT-001',
      fileId: 'CF-001',
      fileName: 'census_202602.xlsx',
      detectedOn: '2026-02-28 07:30:15',
      status: 'Pending Review',
      newColumns: [
        {
          columnName: 'DEPT_CODE',
          dataType: 'String',
          sampleValues: ['IT', 'HR', 'FIN', 'OPS', 'EXEC'],
          nullCount: 0,
          totalRecords: 250,
          suggestedMapping: 'department_code',
          confidence: 72,
          reason: 'Similar column found in 3 other accounts'
        },
        {
          columnName: 'LOCATION_ID',
          dataType: 'String',
          sampleValues: ['NYC-01', 'LA-02', 'CHI-03', 'DAL-04'],
          nullCount: 5,
          totalRecords: 250,
          suggestedMapping: 'office_location',
          confidence: 65,
          reason: 'Pattern matches location identifiers'
        },
        {
          columnName: 'HIRE_TYPE',
          dataType: 'String',
          sampleValues: ['FT', 'PT', 'CONTRACT', 'TEMP'],
          nullCount: 0,
          totalRecords: 250,
          suggestedMapping: 'employment_type',
          confidence: 88,
          reason: 'Strong correlation with employment type field'
        }
      ],
      removedColumns: [],
      modifiedColumns: [
        {
          columnName: 'SALARY',
          previousType: 'Integer',
          newType: 'Decimal',
          sampleValues: ['150000.50', '75250.00', '125500.75'],
          impact: 'Precision increase - compatible change',
          severity: 'Low'
        }
      ]
    }
  ]
};

export const mockTasks = [
  {
    id: 'TASK-001',
    fileName: 'census_q1_2026.xlsx',
    detectedAccount: 'Global Systems LLC',
    suggestedContract: 'CON-2026-001',
    confidence: 88,
    suggestedInvoiceDate: '2026-03-31',
    type: 'Pending Association'
  },
  {
    id: 'TASK-002',
    fileName: 'deduction_jan2026.csv',
    contract: 'CON-2024-001',
    invoiceDate: '2026-01-31',
    failureReason: 'Invalid contract configuration',
    type: 'Invoice Failure'
  },
];

export const mockChartData = {
  errorRateByAccount: [
    { account: 'Acme', rate: 12 },
    { account: 'TechStart', rate: 5 },
    { account: 'Global', rate: 18 },
    { account: 'Innovate', rate: 3 },
  ],
  manualInterventionRate: [
    { month: 'Oct', percentage: 25 },
    { month: 'Nov', percentage: 22 },
    { month: 'Dec', percentage: 18 },
    { month: 'Jan', percentage: 15 },
    { month: 'Feb', percentage: 12 },
  ],
  volumeTrend: [
    { date: 'Feb 22', files: 85 },
    { date: 'Feb 23', files: 92 },
    { date: 'Feb 24', files: 78 },
    { date: 'Feb 25', files: 95 },
    { date: 'Feb 26', files: 88 },
    { date: 'Feb 27', files: 102 },
    { date: 'Feb 28', files: 127 },
  ],
};