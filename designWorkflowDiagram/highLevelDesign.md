┌─────────────────────────┐
│     Test Scenarios      │
│                         │
│ lead.creation.spec.ts   │
│ lead.workflow.spec.ts   │
│ opportunity.creation.ts │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│      Fixture Layer      │
│ salesforce.fixture.ts   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Authentication Layer    │
│ getAuthenticatedContext │
│ auth-utils.ts           │
└────────────┬────────────┘
             │
             ▼
      storageState.json
             │
             ▼
┌─────────────────────────┐
│       Actor Layer       │
│        Actor.ts         │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Task Layer       │
├─────────────────────────┤
│ CreateLead.ts           │
│ CreateEmptyLead.ts      │
│ UpdateLeadStatus.ts     │
│ ConvertLead.ts          │
│ CreateOpportunity.ts    │
└────────────┬────────────┘
             │
      ┌──────┴──────┐
      │             │
      ▼             ▼
┌───────────┐   ┌────────────────┐
│ Data Layer│   │  Page Objects  │
│           │   │                │
│leadData   │   │ LeadPage.ts    │
│ .json     │   │ OpportunityPage│
│           │   │ LoginPage.ts   │
└─────┬─────┘   └───────┬────────┘
      │                 │
      └──────►──────────┘
             │
             ▼
┌─────────────────────────┐
│      Salesforce UI      │
│ Buttons, Fields, etc.   │
└─────────────────────────┘