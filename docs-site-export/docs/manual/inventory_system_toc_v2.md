# Smackdab Inventory System - Complete Manual Table of Contents
## Contract-Grounded Edition

> **Note:** This table of contents is derived 100% from the OpenAPI contracts in `backend/inventory-contracts/`. Every chapter, section, and capability listed here is defined and supported by the system contracts.

---

## Part I: Foundation - Your Inventory Building Blocks

### Chapter 1: Understanding Inventory Locations
**Contract:** `foundation/inventory-locations/`

**Getting Started**
- Adding Your First Location
- Understanding Location Types (warehouse, store, bin, zone, virtual, mobile, service vehicle, customer site, drop ship, quarantine)
- Choosing the Right Type for Your Needs

**The Location Hierarchy**
- Building Your Warehouse Family Tree
- Parent-Child Relationships
- Moving Locations Within the Hierarchy
- Viewing Children and Navigation

**Managing Location Status and Capacity**
- Status Options (active, inactive, receive-only, pick-only, frozen, quarantine, archived)
- Setting Capacity Limits and Thresholds
- Understanding Capacity Alerts
- Managing Location Attributes

**Freezing and Controlling Access**
- When and How to Freeze Locations
- Setting Automatic Unfreeze Times
- Archive vs. Inactive: Understanding the Difference

**Viewing Inventory at Locations**
- Checking What's Stored Where
- Inventory Rollup Across Hierarchy
- Grouping by Product, Category, or UOM

**Labels and Barcodes**
- Label Templates and Previews
- Generating Labels (Single and Batch)
- Barcode Formats and Generation
- Batch Barcode Jobs
- Barcode History Tracking

**Location Relationships**
- Replenishment Relationships (Pick to Bulk Storage)
- Overflow Relationships (Main to Backup)
- Cross-Dock Relationships (Fast-Moving Items)
- Adjacency and Hazard Buffer
- Relationship Automation Rules
- Visualizing Relationship Graphs

**Performance Monitoring**
- Tracking Location Performance Metrics
- Understanding Throughput and Utilization
- Dwell Time Analysis

**Search and Mass Operations**
- Advanced Location Search with Filters
- Mass Update Preview
- Executing Mass Updates
- Undoing Mass Updates
- Mass Update Job Tracking

---

### Chapter 2: Understanding Products
**Contract:** `foundation/products/`

**Getting Started with Products**
- Creating Your First Product
- Quick Add for Fast Product Creation
- Understanding Product Identity (Name, SKU, Code)

**Product Information**
- Basic Product Fields
- Custom Field Management (EFV)
- Product Categories and Organization
- Category Tree Management (Create, Update, Delete)

**Product Configuration**
- Units of Measure (UOM) Setup
- UOM Hierarchy Management and Validation
- Serial Number Configuration and History
- Lot Configuration and Tracking Rules

**Product Search and Discovery**
- Advanced Search with Filters
- Search Suggestions and History
- Saved Searches
- Quick View for Fast Decisions

**Product Validation and Changes**
- Validation (Create/Update Preview)
- Change Preview Before Committing
- Change History Tracking
- Approval Workflows

**Reorder Management**
- Setting Reorder Points
- Reorder Settings Configuration
- Reorder Insights and Recommendations

**Product Images**
- Uploading Product Images
- Managing Image Lifecycle
- Updating and Deleting Images

**Product Costing**
- Costing Methods (FIFO, LIFO, Weighted Average, Standard, Specific)
- Setting and Updating Product Costs
- Cost Override Management

**Product States and Lifecycle**
- Product Activation and Deactivation
- Understanding Product Status
- Reading Product States

**Bulk Operations**
- Mass Actions (Activate, Deactivate, Update)
- Batch Action Jobs
- Undoing Mass Actions
- Import and Export with Templates
- Import Validation and Execution
- Import Field Mappings
- Data Job Auditing

**User Preferences**
- Customizing Product View Preferences

---

### Chapter 3: Units of Measure (UOM)
**Contract:** `foundation/uom/`

**Understanding UOM**
- Why Units Matter
- UOM Categories (count, length, area, volume, weight, time, temperature, custom)

**Setting Up Your UOM System**
- Creating Base Units
- Defining Conversion Rules
- Understanding Packaging Hierarchies
- Validating Conversions

**Using UOM Effectively**
- Stock UOM vs. Derived UOMs
- Precision and Rounding Strategies
- Plan Settings per UOM

---

## Part II: Daily Operations - Moving Inventory

### Chapter 4: Transactions Overview
**Contract:** `operations/transactions/`

**Understanding Transaction Types**
- What Transactions Track
- Transaction States and Lifecycle
- Reversing and Canceling Transactions

**Organization Configuration**
- Understanding Inventory Mode Settings
- Configuring Your Organization's Transaction Rules

---

### Chapter 5: Receiving Inventory
**Contract:** `operations/transactions/paths/receiving-core.yaml`

**The Receiving Process**
- Creating Receipts
- Recording What Arrives
- Handling Quantities and UOM
- Retrieving Receipt Details

**Receiving Configuration**
- Getting and Updating Receiving Settings
- Setting Receipt Defaults

**Handling Issues**
- Reversing Receipts When Needed
- Tracking Receipt History

---

### Chapter 6: Adjustments - Fixing Inventory Counts
**Contract:** `operations/transactions/paths/adjustment-core.yaml`

**When to Make Adjustments**
- Cycle Count Corrections
- Damage and Loss
- System Corrections

**Creating Adjustments**
- Single Item Adjustments
- Batch Adjustments
- Documenting Reasons

**Adjustment Approvals**
- Submitting for Approval
- Approval and Rejection Workflow
- Understanding Approval Requirements

**Managing Adjustments**
- Reversing Adjustments
- Tracking Adjustment History

---

### Chapter 7: Transfers Between Locations
**Contract:** `operations/transactions/paths/transfer-core.yaml`

**Transfer Workflow**
- Creating Transfer Requests
- Approving Transfers
- Dispatching Transfers
- Receiving at Destination

**Managing Transfers**
- Canceling Transfers
- Transfer Settings Configuration
- Tracking In-Transit Inventory

---

### Chapter 8: Shipping and Deliveries
**Contracts:** `operations/transactions/paths/shipping-core.yaml`, `delivery-core.yaml`

**Shipping Process**
- Creating Shipments (Single and Batch)
- Updating Shipment Status
- Tracking Delivery Progress
- Reversing Shipments When Needed

**Deliveries**
- Creating Deliveries (Single and Batch up to 100/250)
- Linking Deliveries to Allocations
- Tracking Delivery Confirmations
- Checking Shipment Delivery Status

---

### Chapter 9: Returns (RMA)
**Contract:** `operations/returns/`

**The Returns Process**
- Creating RMAs
- Receiving Returned Items
- Inspection Workflow
- Financial Settlement

**Return Settings**
- Configuring Return Rules
- Setting Return Policies

---

## Part III: Allocation and Fulfillment

### Chapter 10: Allocations - Reserving Inventory
**Contract:** `operations/allocations/paths/allocation-core.yaml`

**Understanding Allocations**
- What Allocations Do
- Allocation Lifecycle (Open → On Order → Allocated → With Technician/In Transit → Delivered → Cancelled)

**Managing Allocations**
- Creating Allocations
- Viewing Allocation Details
- Releasing Allocations (Full and Partial)
- Canceling Allocations
- Priority Overrides
- Reallocating Inventory

---

### Chapter 11: Pick Lists and Picking
**Contract:** `operations/allocations/paths/pick-core.yaml`

**Pick List Workflow**
- Creating Pick Lists
- Retrieving Pick List Details
- Confirming Picks
- Mobile Picking with Stock Scan Lookups

---

### Chapter 12: Backorders - Managing Shortages
**Contract:** `operations/analytics/paths/backorder-command-center.yaml`

**Backorder Management**
- Creating and Listing Backorders
- Understanding Backorder Status
- Viewing Alternative Sources
- Partial Fulfillment Options
- Updating Backorder ETA

**Backorder Approvals**
- Backorder Approval Workflows
- Settings Management

**Backorder Analytics**
- Backorder Command Center Dashboard
- Analyzing Backorder Patterns

---

## Part IV: Procurement and Replenishment

### Chapter 13: Supplier Management
**Contract:** `operations/procurement/paths/supplier-*.yaml`

**Managing Your Supplier Network**
- Listing Suppliers with Filters and Metrics
- Creating and Updating Supplier Records
- Supplier Preflight Validation
- Supplier Scorecard and Performance Reviews
- Supplier Merge Operations

**Supplier States**
- Active, Inactive, Watch, Probation Status
- State Transition Management

**Supplier Sub-Resources**

**Payment Terms**
- Viewing and Updating Payment Terms
- Payment Terms History
- Payment Terms Preview

**Documents**
- Uploading Supplier Documents
- Document Versioning
- Managing Document Lifecycle

**Certifications**
- Managing Supplier Certifications
- Checking Certification Requirements
- Creating and Updating Certifications

**Pricing Agreements**
- Setting Up Pricing Agreements
- Managing Agreement Lifecycle

**Approval Workflows**
- Understanding Approval Status
- Stage Decisions and Task Actions
- Workflow History Tracking

**Change Requests**
- Creating Change Requests
- Change Impact Analysis

**Lifecycle Management**
- Deactivation Preview
- Executing Deactivation

**Audit and History**
- Audit Event Timeline
- Exporting Audit Logs

**Contacts**
- Managing Supplier Contacts
- Contact History

**Catalog Management**
- Supplier Catalog Items
- Catalog Sync Jobs

**Lead Times**
- Lead Time Profiles
- Lead Time Overrides

**Performance**
- Scorecard Configuration
- Performance Benchmarks
- Performance Dashboard

---

### Chapter 14: Purchase Orders
**Contract:** `operations/procurement/paths/purchase-order-core.yaml`

**Purchase Order Workflow**
- Creating Purchase Orders
- Viewing PO Details
- Updating Purchase Orders
- Linking Allocations to POs

**PO Lifecycle Management**
- Approving Purchase Orders
- Submitting PO
- Sending PO to Supplier
- Acknowledging Receipt
- Completing PO
- Closing PO
- Canceling PO
- Rejecting PO

---

### Chapter 15: Procurement Command Center
**Contract:** `operations/procurement/paths/command-center-core.yaml`

**Command Center Overview**
- Dashboard Summary
- Demand List Management
- Consolidation Opportunities

**Requisition Management**
- Managing Requisitions
- Requisition Decisions
- Approval Matrix

**Command Center Configuration**
- Setting Up Your Command Center
- Customizing Views and Alerts

---

### Chapter 16: Replenishment
**Contract:** `operations/replenishment/`

**Replenishment Rules**
- Creating and Managing Rulesets
- Activating and Deactivating Rules
- Simulating Rule Outcomes
- Checking Rule Status
- Viewing Active Rule Triggers

**Lead Time Management**
- Listing Lead Times
- Overriding Lead Times for Specific Products

**Performance Tracking**
- Performance Summary Metrics
- Monitoring Replenishment Effectiveness

**Forecasting**
- Creating and Managing Forecasts
- Using Forecasts for Planning

**Reorder Plans**
- Creating Reorder Plans
- Running Reorder Plans
- Monitoring Plan Execution

**Replenishment Command Center**
- Summary Dashboard
- Alert Management
- Manual Overrides

**Vehicle Restocking**
- Listing Restock Requests
- Creating Vehicle Restock Requests
- Managing Restock Lifecycle

---

## Part V: Tracking and Traceability

### Chapter 17: Serial Number Tracking
**Contract:** `operations/tracking/paths/serial-core.yaml`

**Serial Tracking Basics**
- When to Use Serial Tracking
- Listing Serial Numbers
- Creating Serial Records

**Managing Serials**
- Updating Serial Status
- Serial History Tracking
- Serial Settings Configuration

---

### Chapter 18: Lot and Batch Tracking
**Contract:** `operations/tracking/paths/lot-core.yaml`

**Lot Tracking Basics**
- Understanding Lot Control
- Listing Lots
- Creating Lot Records

**Managing Lots**
- Updating Lot Status
- Lot History Tracking
- Expiration Date Management

---

## Part VI: Counting and Accuracy

### Chapter 19: Cycle Counting and Physical Inventory
**Contract:** `operations/counting/`

**Count Types**
- Spot, Location, Product, Category, Value
- Random, Control Group, Quick, Verification
- Cycle, Full Physical Inventory

**Count Workflow**
- Creating Counts
- Making Line Adjustments
- Completing Counts

**Count Configuration**
- Blind Counting
- Segregation of Duties
- Variance Thresholds
- Cycle Schedules
- Assignment Management

**Count Controls**
- Movement Freeze During Counts
- Approval Workflows
- Variance Investigation

---

## Part VII: Advanced Operations

### Chapter 20: Kitting and Assembly
**Contract:** `operations/kitting/`

**Kit Management**
- Creating Kit Definitions
- Updating Kit Configurations
- Viewing Kit Details

**Kit Operations**
- Assembling Kits
- Disassembling Kits
- Kit Inventory Tracking

---

### Chapter 21: Transformations
**Contract:** `operations/transformations/`

**Transformation Basics**
- Understanding Product Transformations
- Creating Transformations
- Viewing Transformation Details
- Transformation History

**Transformation Status**
- Updating Transformation Status
- Tracking Transformation Lifecycle

**Bill of Materials (BOM)**
- Creating BOMs
- Managing BOM Components
- Updating BOM Configurations

**Transformation Settings**
- Configuring Transformation Rules
- Setting Default Behaviors

---

### Chapter 22: Service Management
**Contract:** `operations/service-management/`

**Service Items**
- Creating Service Catalog Items
- Managing Service Item Lifecycle
- Service Item Configuration

**Service Consumption**
- Tracking Service Item Usage
- Listing Consumption by Service Item
- Recording Consumption Events

**Time Entries**
- Creating Time Entries
- Managing Time Entry Details
- Time Entry Reporting

**Work Orders**
- Creating Work Orders
- Managing Work Order Lifecycle
- Work Order Tracking

---

### Chapter 23: Customer Sites
**Contract:** `operations/customer-sites/`

**Customer Site Agreements**
- Creating Site Agreements
- Managing Agreement Terms
- Viewing Agreement Details

**Usage Reporting**
- Creating Usage Reports
- Tracking Customer Consumption
- Usage Report Analysis

**Reconciliations**
- Creating Reconciliations
- Reconciliation Workflows
- Discrepancy Resolution

**Customer Site Replenishment**
- Creating Replenishment Requests
- Managing Replenishment Lifecycle
- Tracking Replenishment Status

---

### Chapter 24: Customer Reserves
**Contract:** `operations/customer-reserves/`

**Reserve Types**
- Customer Hold, Quote, Event, Subscription

**Reserve Management**
- Creating Customer Reserves
- Viewing Reserve Details
- Reserve Lifecycle Operations

**Reserve Actions**
- Releasing Reserves
- Expiring Reserves
- Extending Reserves
- Reinstating Reserves
- Reassigning Reserves
- Converting Reserves to Orders

**Reserve Features**
- Priority Scoring
- Expiration Management
- Manager Override Tracking
- Approval Workflows

---

## Part VIII: Financial and Compliance

### Chapter 25: Valuation and Costing
**Contract:** `operations/valuation/`

**Cost Layers**
- Viewing Cost Layers
- Exporting Cost Layer Data
- Understanding Cost Layer Build-Up

**Valuation Snapshots**
- Creating Valuation Snapshots
- Viewing Snapshot Details
- Snapshot Reporting

**Variance Management**
- Viewing Variance Alerts
- Acknowledging Variances
- Variance Investigation

**Costing Operations**
- Standard Cost Variance Tracking
- Cost Adjustments
- Period-End Validations

---

### Chapter 26: Period Closing
**Contract:** `operations/closing/`

**Closing Windows**
- Creating Closing Windows
- Managing Closing Periods
- Closing Window Status

**GAAP Exports**
- Creating GAAP Export Jobs
- Viewing Export Details
- Export Job Tracking

**LCNRV Tests**
- Lower of Cost or Net Realizable Value Testing
- Creating and Managing LCNRV Tests
- LCNRV Compliance

**Reserve Rollforwards**
- Creating Reserve Rollforwards
- Viewing Rollforward Details
- Reserve Reconciliation

**Closing Audit**
- Audit Log Retrieval with Filters
- Audit Trail Analysis

**Closing Reports**
- Summary Reports
- Closing Validation Reports

**Compliance**
- Compliance Summaries
- GAAP Compliance Tracking

**Variance Alerts**
- Closing Period Variance Management
- Alert Acknowledgment

---

## Part IX: Analytics and Insights

### Chapter 27: Dashboards
**Contract:** `operations/analytics/paths/dashboard-*.yaml`

**Available Dashboards**
- State Summary Dashboard
- Order Pipeline Dashboard
- Transaction Rollup Dashboard
- Valuation Trends Dashboard
- Receiving Queue Dashboard
- Shipping Progress Dashboard
- Count Progress Dashboard
- Work Order Progress Dashboard

**Using Dashboards**
- Understanding Dashboard Metrics
- Filtering Dashboard Data
- Dashboard Refresh and Updates

---

### Chapter 28: Inventory Metrics
**Contract:** `operations/analytics/paths/metrics-core.yaml`

**Key Metrics**
- Inventory Accuracy
- Stockout Rate
- Fill Rate
- Days of Inventory

**Using Metrics**
- Viewing Dashboard Metrics
- Exporting Metric Data
- Metric Analysis and Trends

---

### Chapter 29: Turnover Analysis
**Contract:** `operations/analytics/paths/turnover-core.yaml`

**Turnover Reporting**
- Generating Turnover Reports
- Understanding Turnover Rates
- Exporting Turnover Data
- Analyzing Turnover Patterns

---

### Chapter 30: Aging Analysis
**Contract:** `operations/analytics/paths/aging-core.yaml`

**Aging Reports**
- Aging Summary Views
- Exporting Aging Data
- Identifying Slow-Moving Items

**Disposition Management**
- Managing Aging Alerts
- Disposition Strategies
- Write-Off Procedures

---

## Part X: System Configuration

### Chapter 31: Availability Checks
**Contract:** `operations/availability/`

**Available-to-Promise (ATP)**
- Running ATP Queries
- Multi-Location Availability
- Understanding ATP Results
- ATP Configuration

---

### Chapter 32: State Management
**Contract:** `operations/states/`

**Inventory State Policies**
- Understanding State Policies
- State Transition Rules
- Authorization Requirements

---

## Appendices

### Appendix A: Common Workflows
- Complete End-to-End Scenarios
- Integration Points Between Modules
- Best Practice Workflows

### Appendix B: Quick Reference
- Common Tasks Step-by-Step
- Field Definitions
- Status and State Reference

### Appendix C: Troubleshooting Guide
- Common Issues and Solutions
- Error Message Reference
- Recovery Procedures

### Appendix D: System Limits
- Batch Size Limits (e.g., Deliveries: 100/250)
- Performance Considerations
- Supported Formats

---

## How to Use This Manual

**For New Users:** Start with Part I (Foundation) to understand locations, products, and UOM before exploring operations.

**For Daily Operations:** Parts II-III cover receiving, shipping, transfers, allocations, and picking—your core daily tasks.

**For Procurement Teams:** Part IV provides comprehensive supplier management, purchase orders, and replenishment.

**For Warehouse Managers:** Parts V-VI cover tracking, counting, and accuracy—essential for warehouse control.

**For Finance Teams:** Part VIII covers valuation, costing, and period closing—your financial compliance tools.

**For Analysts:** Part IX provides dashboards, metrics, and analytics for decision-making.

Each chapter follows the proven teaching approach:
1. Immediate how-to instructions
2. Detailed option explanations with consequences
3. Real scenarios and examples
4. Decision guides for complex choices

**Note:** This table of contents is 100% derived from actual API contracts. Every capability listed is implemented and available in the system.
