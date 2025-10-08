# Chapter 14: Purchase Orders

**Contract Reference:** `operations/procurement/paths/purchase-order-core.yaml`

## Turning Supplier Relationships into Action

Picture this: You've built strong relationships with your suppliers, you understand their capabilities and performance, and you've identified what you need to buy. But now comes the critical moment—creating the formal commitment that transforms supplier relationships into actual inventory. How do you ensure the purchase order captures all requirements correctly? How do you manage approvals efficiently? How do you track the order through its entire lifecycle?

This is where purchase orders come in. Purchase orders are more than just buying documents—they're legal commitments that create financial obligations, establish delivery expectations, and provide the foundation for inventory planning. They transform supplier relationships into operational reality while maintaining proper controls and audit trails.

But purchase orders are complex, involving product specifications, pricing negotiations, approval workflows, supplier communications, receipt tracking, and financial reconciliation. Poor purchase order management leads to cost overruns, delivery delays, quality issues, and compliance problems. Excellent purchase order management creates competitive advantages through cost control, reliable supply, and operational efficiency.

Understanding how to create and manage purchase orders effectively—from initial creation through final closure—is essential for procurement excellence and operational success. This chapter will show you how to master purchase orders as both a procurement tool and a business control mechanism.

---

## Purchase Order Workflow

The purchase order workflow transforms procurement needs into formal supplier commitments that drive inventory replenishment and business operations.

**Creating Purchase Orders**

Purchase orders can be created manually for specific needs or automatically through replenishment systems.

**Manual purchase order creation:**
1. **Identify procurement need** - What products and quantities are required
2. **Select supplier** - Choose based on performance, pricing, and capability
3. **Gather specifications** - Product details, delivery requirements, terms
4. **Create purchase order** - Enter all required information
5. **Review and validate** - Ensure accuracy and completeness
6. **Submit for approval** - Route through approval workflow if required

**Purchase order creation process:**
1. **Navigate to purchase orders** - Procurement → Purchase Orders → Create
2. **Select supplier** - Choose from active supplier list
3. **Add line items** - Products, quantities, prices, delivery dates
4. **Set terms and conditions** - Payment terms, shipping terms, currency
5. **Add special instructions** - Delivery notes, quality requirements
6. **Review totals** - Verify calculations and amounts
7. **Submit or save as draft** - Complete creation or save for later

**Example purchase order creation:**
```
Purchase Order: PO-2025-0089
Supplier: Precision Components LLC
PO Date: 2025-01-28
Expected Delivery: 2025-02-15
Payment Terms: 2/10 Net 30
Currency: USD

Line Items:
1. Control Module CM-500
   - Quantity: 50 units
   - Unit Cost: $125.00
   - Line Total: $6,250.00
   - Delivery: 2025-02-15

2. Safety Valve SV-200
   - Quantity: 25 units
   - Unit Cost: $75.00
   - Line Total: $1,875.00
   - Delivery: 2025-02-10

Subtotal: $8,125.00
Tax: $650.00
Total: $8,775.00

Special Instructions:
- Deliver to Dock B
- Call 30 minutes before arrival
- Include packing list with serial numbers
```

**Automatic purchase order creation:**
- **Replenishment systems** - Generate POs based on reorder points
- **Allocation shortfalls** - Create POs for customer order requirements
- **Blanket order releases** - Call-off from existing agreements
- **Contract compliance** - Automatic ordering per contract terms

**Viewing PO Details**

Purchase order details provide complete visibility into the order status, terms, and progress.

**Key PO information displayed:**
- **Header details** - PO number, supplier, dates, terms
- **Line items** - Products, quantities, prices, delivery status
- **Financial summary** - Subtotals, taxes, discounts, total amount
- **Status information** - Current state, approvals, acknowledgments
- **Receipt tracking** - What's been received, what's outstanding
- **History** - All changes and state transitions

**Purchase order detail view:**
```
Purchase Order: PO-2025-0089
Status: Sent
Created: 2025-01-28 by Tom Wilson
Approved: 2025-01-28 by Sarah Johnson
Sent: 2025-01-29 to Precision Components LLC

Supplier Information:
- Name: Precision Components LLC
- Contact: Dana Lee (Sales Manager)
- Email: dana.lee@precision.com
- Phone: +1-415-555-0188

Delivery Information:
- Ship To: Main Warehouse, Dock B
- Expected: 2025-02-15
- Instructions: Call before delivery

Financial Summary:
- Subtotal: $8,125.00
- Tax (8%): $650.00
- Total: $8,775.00
- Currency: USD
- Payment Terms: 2/10 Net 30

Line Status:
1. Control Module CM-500: 0 of 50 received
2. Safety Valve SV-200: 0 of 25 received

Recent Activity:
- 2025-01-29: PO sent to supplier
- 2025-01-28: Approved by Sarah Johnson
- 2025-01-28: Created by Tom Wilson
```

**Updating Purchase Orders**

Purchase orders may need updates for changing requirements, pricing adjustments, or delivery modifications.

**Common update scenarios:**
- **Quantity changes** - Increase or decrease order quantities
- **Price adjustments** - Supplier price changes or corrections
- **Delivery date changes** - Expedite or delay delivery requirements
- **Product substitutions** - Change to alternative products
- **Terms modifications** - Payment or shipping term adjustments
- **Special instructions** - Additional delivery or quality requirements

**Update process:**
1. **Check PO status** - Ensure PO can be modified
2. **Make necessary changes** - Update quantities, prices, dates, etc.
3. **Review impact** - Assess financial and delivery implications
4. **Obtain approvals** - Route through approval workflow if required
5. **Communicate changes** - Notify supplier of modifications
6. **Update linked records** - Adjust allocations, receipts, etc.

**Example PO update:**
```
Purchase Order Update: PO-2025-0089
Update Date: 2025-01-30
Updated By: Tom Wilson
Reason: Customer urgent request

Changes Made:
1. Control Module CM-500:
   - Original Quantity: 50 units
   - New Quantity: 75 units (+25)
   - Original Delivery: 2025-02-15
   - New Delivery: 2025-02-10 (expedited)

2. Added Line Item:
   - Pressure Sensor PS-100
   - Quantity: 20 units
   - Unit Cost: $45.00
   - Line Total: $900.00
   - Delivery: 2025-02-10

Financial Impact:
- Original Total: $8,775.00
- Additional Amount: $4,025.00
- New Total: $12,800.00

Approval Required: Yes (exceeds $10,000)
Supplier Notification: Change order sent
```

**Linking Allocations to POs**

Linking purchase orders to allocations ensures customer orders drive procurement decisions and provides visibility into fulfillment progress.

**Allocation linking benefits:**
- **Customer-driven procurement** - Buy what customers need
- **Fulfillment visibility** - Track progress from order to delivery
- **Priority management** - Expedite POs for important customers
- **Inventory optimization** - Reduce excess and obsolete inventory
- **Performance measurement** - Track procurement effectiveness

**Linking process:**
1. **Identify allocation shortfalls** - Orders needing inventory
2. **Create purchase order** - For required products and quantities
3. **Link PO lines to allocations** - Specify which orders will be fulfilled
4. **Update allocation states** - Move from "open" to "on order"
5. **Track receipt progress** - Monitor fulfillment of customer orders

**Example allocation linking:**
```
Purchase Order: PO-2025-0089
Line 1: Control Module CM-500 (75 units)

Allocation Links:
1. Allocation: ALLOC-2025-0156
   - Customer: Metro Manufacturing (VIP)
   - Quantity: 30 units
   - Required By: 2025-02-05
   - Priority: High

2. Allocation: ALLOC-2025-0167
   - Customer: Industrial Services (Standard)
   - Quantity: 25 units
   - Required By: 2025-02-15
   - Priority: Medium

3. Allocation: ALLOC-2025-0178
   - Customer: ABC Construction (Premium)
   - Quantity: 20 units
   - Required By: 2025-02-20
   - Priority: Medium

Impact on Allocations:
- quantity_open: -75 units (decreased)
- quantity_on_order: +75 units (increased)
- Customer notifications: Delivery dates confirmed
```

---

## PO Lifecycle Management

Purchase order lifecycle management ensures proper control and tracking from creation through final closure.

**Approving Purchase Orders**

Purchase order approvals ensure proper authorization and spending control while maintaining segregation of duties.

**Approval requirements:**
- **Dollar thresholds** - Different approval levels based on PO value
- **Segregation of duties** - Creator cannot approve their own PO
- **Approval limits** - Each approver has maximum dollar authority
- **Delegation rules** - Temporary approval authority when needed
- **Emergency procedures** - Expedited approval for urgent situations

**Approval workflow:**
1. **Submit for approval** - Route PO to appropriate approver
2. **Review and validate** - Approver checks requirements and budget
3. **Approve or reject** - Decision with comments and justification
4. **Update PO status** - System reflects approval decision
5. **Notify stakeholders** - Inform creator and supplier of status

**Example approval workflow:**
```
Purchase Order: PO-2025-0089
Total Amount: $12,800.00
Approval Required: Manager Level

Approval Matrix:
- Under $1,000: Supervisor
- $1,000 - $10,000: Manager
- $10,000 - $50,000: Director
- Over $50,000: VP

Current Approver: Sarah Johnson (Manager)
Approval Limit: $25,000
Status: Pending Approval

Approval Request:
From: Tom Wilson (Procurement Specialist)
To: Sarah Johnson (Procurement Manager)
Subject: PO Approval Required - $12,800
Message: "Urgent customer requirements for VIP customer Metro Manufacturing. Expedited delivery requested."

Approval Decision:
Approved: Yes
Approved By: Sarah Johnson
Approved At: 2025-01-30 10:15 AM
Comments: "Approved for VIP customer urgency. Monitor delivery closely."
```

**Submitting PO**

Submitting a purchase order initiates the approval workflow and locks the PO from further editing.

**Submission process:**
1. **Final review** - Verify all information is complete and accurate
2. **Submit for approval** - Lock PO and route to approver
3. **Version increment** - Create new version for audit trail
4. **Status update** - Change from "Draft" to "Pending Approval"
5. **Notification** - Alert approver of pending request

**Sending PO to Supplier**

Once approved, the purchase order is sent to the supplier to establish the formal commitment.

**Sending process:**
1. **Generate PO document** - Create formal purchase order document
2. **Send to supplier** - Email, EDI, or supplier portal
3. **Record transmission** - Log when and how PO was sent
4. **Update status** - Change to "Sent" status
5. **Set acknowledgment deadline** - When supplier must respond

**Example PO transmission:**
```
Purchase Order Sent: PO-2025-0089
Sent Date: 2025-01-30 2:30 PM
Sent By: Tom Wilson
Sent To: dana.lee@precision.com

Transmission Method: Email with PDF attachment
Subject: Purchase Order PO-2025-0089 - $12,800.00

Message:
"Dear Dana,

Please find attached Purchase Order PO-2025-0089 for $12,800.00.

Key Requirements:
- Expedited delivery by February 10, 2025
- Deliver to Main Warehouse, Dock B
- Call 30 minutes before arrival
- Include serial numbers on packing list

Please acknowledge receipt and confirm delivery date by February 1, 2025.

Best regards,
Tom Wilson
Procurement Specialist"

Acknowledgment Required: Yes
Acknowledgment Deadline: 2025-02-01
```

**Acknowledging Receipt**

Supplier acknowledgment confirms they received the PO and agree to the terms and delivery dates.

**Acknowledgment process:**
1. **Supplier receives PO** - Via email, EDI, or portal
2. **Supplier reviews terms** - Confirms ability to meet requirements
3. **Supplier acknowledges** - Confirms acceptance or requests changes
4. **System records acknowledgment** - Updates PO status and dates
5. **Notifications sent** - Alerts procurement team of confirmation

**Example supplier acknowledgment:**
```
Purchase Order Acknowledgment: PO-2025-0089
Acknowledged Date: 2025-01-31 9:45 AM
Acknowledged By: Dana Lee (Precision Components LLC)

Acknowledgment Details:
- PO Accepted: Yes
- Terms Accepted: Yes
- Delivery Commitment: February 10, 2025
- Supplier PO Number: PC-2025-0234

Supplier Comments:
"PO acknowledged and accepted. Production scheduled for February 5-8. Delivery confirmed for February 10 by 2:00 PM. Will call 30 minutes before arrival as requested."

System Updates:
- Status: Acknowledged
- Confirmed Delivery: 2025-02-10
- Supplier Reference: PC-2025-0234
- Expected Receipt Created: Yes
```

**Completing PO**

Purchase order completion occurs when all items have been received and the order is ready for final processing.

**Completion criteria:**
- **All items received** - Quantities match or are within tolerance
- **Quality accepted** - Items pass inspection requirements
- **Documentation complete** - Packing lists, certificates, etc.
- **Variances resolved** - Price or quantity differences addressed
- **Invoices matched** - Supplier billing reconciled

**Completion process:**
1. **Verify receipt completion** - All line items fully received
2. **Resolve any variances** - Address price or quantity differences
3. **Complete quality checks** - Ensure items meet specifications
4. **Mark PO complete** - Change status to "Completed"
5. **Trigger invoice matching** - Enable payment processing

**Closing PO**

Purchase order closure is the final step that archives the order and completes all financial reconciliation.

**Closure process:**
1. **Final reconciliation** - Ensure all receipts and invoices match
2. **Resolve outstanding items** - Address any remaining issues
3. **Calculate final variances** - Document price and quantity differences
4. **Update supplier performance** - Record delivery and quality metrics
5. **Close PO** - Archive order and complete audit trail

**Canceling PO**

Purchase order cancellation terminates the order and releases any commitments.

**Cancellation scenarios:**
- **Customer order cancelled** - No longer need the inventory
- **Supplier cannot deliver** - Unable to meet requirements
- **Budget constraints** - Funding no longer available
- **Product changes** - Requirements have changed
- **Quality issues** - Supplier performance problems

**Cancellation process:**
1. **Check cancellation eligibility** - Ensure no receipts have occurred
2. **Coordinate with supplier** - Notify of cancellation request
3. **Document reason** - Record why PO is being cancelled
4. **Release commitments** - Free up budget and allocations
5. **Update linked records** - Adjust allocations and planning

**Rejecting PO**

Purchase order rejection occurs during the approval process when the PO cannot be approved.

**Rejection reasons:**
- **Budget constraints** - Insufficient funds available
- **Supplier issues** - Performance or compliance problems
- **Specification errors** - Incorrect products or requirements
- **Pricing concerns** - Costs exceed acceptable levels
- **Timing problems** - Delivery dates not feasible

**Rejection process:**
1. **Review PO details** - Identify specific issues
2. **Document rejection reason** - Explain why PO cannot be approved
3. **Return to creator** - Send back for correction
4. **Provide guidance** - Suggest how to address issues
5. **Reset status** - Return to "Draft" for editing

---

## Bringing It All Together: A Day in the Life

Let me show you how purchase order management works in practice across different scenarios and business situations.

**Monday, 7:00 AM — Tom, Procurement Specialist**

Tom starts his day by reviewing purchase order status and addressing urgent requirements.

**Morning PO Review:**

Tom checks his purchase order dashboard:
- 15 POs pending approval
- 8 POs awaiting supplier acknowledgment
- 12 POs with expected receipts this week
- 3 POs requiring urgent attention
- 2 POs ready for closure

**Urgent PO 1: VIP Customer Requirement**
```
Purchase Order: PO-2025-0201
Customer: Premium Manufacturing (VIP)
Product: Control Module CM-500
Quantity Needed: 25 units
Required By: 2025-02-01 (3 days)
Current Status: Draft

Issue: Customer production line down, needs immediate delivery
```

Tom's immediate actions:
1. **Contact preferred supplier** - Check availability and lead time
2. **Negotiate expedited delivery** - Arrange rush production/shipping
3. **Create expedited PO** - Include rush charges and special terms
4. **Route for emergency approval** - Flag for immediate attention

**Expedited PO creation:**
```
Purchase Order: PO-2025-0201
Supplier: Precision Components LLC
Priority: EMERGENCY
Expected Delivery: 2025-01-31

Line Items:
- Control Module CM-500: 25 units @ $135.00 (includes $10 rush charge)
- Expedited Shipping: $150.00
- Total: $3,525.00

Special Terms:
- Payment: Net 15 (expedited payment)
- Delivery: Next day air
- Penalty: $500/day for late delivery

Justification: VIP customer production line down, $50K/hour impact
Approval: Emergency approval requested from Director
```

**Monday, 9:30 AM — Sarah, Procurement Manager**

Sarah handles purchase order approvals and manages the approval workflow.

**Emergency Approval Review:**

Sarah receives the emergency PO approval request:
```
Emergency Approval Request: PO-2025-0201
Amount: $3,525.00
Requested By: Tom Wilson
Urgency: VIP customer production down
Business Impact: $50K/hour production loss

Approval Decision Factors:
- Customer Tier: VIP (highest priority)
- Business Impact: Critical production stoppage
- Supplier: Precision Components (98% performance rating)
- Cost: Reasonable with rush charges
- Terms: Acceptable for emergency situation

Decision: APPROVED
Approved By: Sarah Johnson
Approved At: 2025-01-28 9:45 AM
Comments: "Approved for VIP customer emergency. Monitor delivery closely and ensure customer satisfaction."
```

**Standard Approval Processing:**

Sarah reviews regular approval queue:
```
Pending Approvals (5 POs):

1. PO-2025-0195: $2,450 - Standard replenishment
   Decision: Approved (within normal parameters)

2. PO-2025-0196: $15,750 - Quarterly bulk order
   Decision: Approved (good volume pricing)

3. PO-2025-0197: $8,900 - New supplier trial
   Decision: Approved with conditions (30-day payment terms)

4. PO-2025-0198: $25,600 - Capital equipment
   Decision: Escalated to Director (exceeds authority)

5. PO-2025-0199: $4,200 - Expedited order
   Decision: Rejected (insufficient justification for rush charges)
```

**Monday, 11:00 AM — Jennifer, Supplier Relations Coordinator**

Jennifer manages supplier communications and acknowledgments.

**PO Transmission and Follow-up:**

Jennifer sends approved POs to suppliers:
```
Daily PO Transmission Summary:

POs Sent Today: 6
- PO-2025-0201: Precision Components (EMERGENCY)
- PO-2025-0195: Global Manufacturing (Standard)
- PO-2025-0196: Advanced Components (Bulk)
- PO-2025-0197: Quality Suppliers (Trial)
- PO-2025-0200: Regional Supply (Routine)
- PO-2025-0202: Industrial Parts (Reorder)

Transmission Methods:
- Email with PDF: 4 POs
- EDI: 1 PO (Global Manufacturing)
- Supplier Portal: 1 PO (Advanced Components)

Acknowledgment Status:
- Immediate: PO-2025-0201 (emergency, called supplier)
- Pending: 5 POs (24-48 hour response expected)
```

**Supplier Acknowledgment Processing:**

Jennifer receives and processes supplier acknowledgments:
```
Acknowledgment: PO-2025-0201 (EMERGENCY)
Supplier: Precision Components LLC
Response Time: 15 minutes (excellent)

Supplier Confirmation:
"Emergency PO acknowledged. Rush production approved. Delivery confirmed for January 31 by 10:00 AM. Tracking number will be provided by 6:00 PM today."

System Updates:
- Status: Acknowledged
- Confirmed Delivery: 2025-01-31 10:00 AM
- Tracking: Will be provided
- Customer Notification: VIP customer updated

Acknowledgment: PO-2025-0195
Supplier: Global Manufacturing
Response Time: 2 hours (good)

Supplier Response:
"PO acknowledged with delivery date change. Original date February 15, new date February 18 due to material shortage. Please confirm acceptance."

Action Required:
- Delivery date change needs approval
- Check impact on customer orders
- Coordinate with allocation management
```

**Monday, 1:00 PM — Mike, Receiving Coordinator**

Mike coordinates expected receipts and manages delivery schedules.

**Expected Receipt Planning:**

Mike reviews this week's expected deliveries:
```
Expected Receipts - Week of January 28:

Tuesday, January 29:
- PO-2025-0178: Safety Valves (25 units)
- PO-2025-0182: Pressure Sensors (50 units)
- PO-2025-0185: Hardware Kit (100 units)

Wednesday, January 30:
- PO-2025-0189: Control Modules (40 units)
- PO-2025-0192: Temperature Sensors (30 units)

Thursday, January 31:
- PO-2025-0201: Control Modules (25 units) - EMERGENCY
- PO-2025-0195: Various Items (bulk order)

Friday, February 1:
- PO-2025-0196: Quarterly Replenishment (large delivery)

Dock Scheduling:
- Emergency delivery: Dock A reserved 9:00-11:00 AM Thursday
- Bulk deliveries: Dock B scheduled for extended times
- Standard deliveries: Normal dock rotation
```

**Receipt Coordination:**

Mike coordinates the emergency delivery:
```
Emergency Receipt Coordination: PO-2025-0201

Delivery Details:
- Date: January 31, 2025
- Time: 10:00 AM
- Dock: Dock A (reserved)
- Carrier: Next Day Air Express
- Contact: Driver will call 30 minutes prior

Preparation:
- Receiving team alerted
- Quality inspector scheduled
- Allocation team notified
- Customer service informed

Special Instructions:
- Priority inspection (30 minutes max)
- Immediate allocation to customer order
- Same-day shipment to customer
- VIP customer notification upon receipt
```

**Monday, 3:00 PM — Lisa, Purchase Order Analyst**

Lisa analyzes purchase order performance and identifies improvement opportunities.

**PO Performance Analysis:**

Lisa generates weekly performance metrics:
```
Purchase Order Performance - Week Ending January 28:

Creation Metrics:
- POs Created: 23
- Average PO Value: $8,450
- Emergency POs: 2 (8.7%)
- Approval Time: 4.2 hours average

Approval Metrics:
- Approval Rate: 91% (21 of 23)
- Rejection Rate: 9% (2 of 23)
- Emergency Approvals: 2 (both approved)
- Escalations: 3 (to Director level)

Supplier Performance:
- Acknowledgment Rate: 95%
- Average Response Time: 6.8 hours
- Delivery Confirmations: 100%
- Date Changes Requested: 12%

Cost Management:
- Budget Compliance: 98%
- Rush Charges: $450 (2 POs)
- Volume Discounts Achieved: $2,340
- Price Variance: +1.2% (within tolerance)
```

**Process Improvement Opportunities:**

Lisa identifies areas for improvement:
```
Improvement Opportunities Identified:

1. Approval Efficiency:
   - Average approval time: 4.2 hours
   - Target: <2 hours for standard POs
   - Recommendation: Automated approval for routine orders under $1,000

2. Supplier Response Time:
   - 5% of suppliers not acknowledging within 24 hours
   - Recommendation: Supplier performance discussions

3. Emergency Orders:
   - 8.7% emergency rate (target: <5%)
   - Root causes: Poor demand forecasting, supplier delays
   - Recommendation: Improve replenishment planning

4. Price Variance:
   - +1.2% above budget (acceptable but trending up)
   - Recommendation: Renegotiate contracts with high-variance suppliers

Action Items:
- Implement automated approval rules
- Schedule supplier performance reviews
- Enhance demand forecasting accuracy
- Review pricing agreements quarterly
```

**Monday, 5:00 PM — Daily PO Review**

The team reviews the day's purchase order activities and performance.

**Daily Metrics:**
```
Purchase Order Activity - January 28, 2025:

Creation Activity:
- New POs created: 6
- Emergency POs: 1
- Total value: $50,725
- Average PO value: $8,454

Approval Activity:
- POs approved: 8
- POs rejected: 1
- Emergency approvals: 1
- Average approval time: 3.1 hours

Supplier Communication:
- POs sent: 6
- Acknowledgments received: 4
- Delivery confirmations: 5
- Issues resolved: 2

Receipt Coordination:
- Expected receipts: 8
- Emergency deliveries: 1
- Dock scheduling: 100% on time
- Quality issues: 0
```

**Process Improvements Implemented:**
- Emergency approval process worked efficiently
- Supplier communication response times improving
- Receipt coordination preventing dock congestion
- Performance metrics driving continuous improvement

**End of Day Results:**

The purchase order management system successfully handled diverse procurement needs while maintaining control and efficiency:

**Emergency Response:** VIP customer emergency resolved within 2 hours from request to approved PO

**Operational Efficiency:** Standard POs processed smoothly with good approval times and supplier response

**Cost Control:** Budget compliance maintained while achieving volume discounts and managing rush charges

**Supplier Relations:** Strong communication and acknowledgment processes maintaining good relationships

**Performance Monitoring:** Systematic analysis identifying improvement opportunities and driving optimization

Each purchase order served its purpose while contributing to overall procurement excellence and customer satisfaction.

---

## Common Questions & Troubleshooting

### "What's the difference between a purchase order and a purchase requisition?"

A **purchase requisition** is an internal request to buy something. A **purchase order** is the formal commitment to a supplier to buy something.

- **Requisition**: Internal document requesting approval to purchase
- **Purchase Order**: External document committing to purchase from supplier

The requisition comes first (internal approval), then the PO (external commitment).

### "Can I modify a purchase order after it's been sent to the supplier?"

It depends on what's been received:

- **Before any receipts**: Yes, but requires supplier agreement and possibly approval
- **After partial receipts**: Limited changes (can't reduce below received quantities)
- **After full receipt**: No modifications, only closure or cancellation

Always coordinate changes with the supplier to maintain good relationships.

### "How do I handle price increases from suppliers?"

Handle price increases systematically:

1. **Review justification** - Understand the reason for increase
2. **Check contract terms** - Verify if increase is allowed
3. **Negotiate timing** - Delay implementation if possible
4. **Seek alternatives** - Compare with other suppliers
5. **Approve if necessary** - Route through proper approval channels

Document all price changes for audit trails and future negotiations.

### "What if a supplier doesn't acknowledge my purchase order?"

Follow up systematically:

1. **Check transmission** - Ensure PO was sent correctly
2. **Contact supplier** - Call or email to confirm receipt
3. **Resend if needed** - Use different method (email vs. EDI)
4. **Set deadline** - Give specific timeframe for response
5. **Escalate if necessary** - Involve management or consider alternatives

Lack of acknowledgment may indicate supplier capacity or willingness issues.

### "How do I link purchase orders to customer orders?"

Use allocation linking:

1. **Identify customer needs** - Which orders need inventory
2. **Create PO for requirements** - Buy what customers need
3. **Link PO lines to allocations** - Specify which orders will be fulfilled
4. **Track progress** - Monitor from PO receipt to customer delivery

This ensures customer-driven procurement and provides end-to-end visibility.

### "What approval levels should I set for purchase orders?"

Set approval levels based on risk and organizational structure:

**Small business**: Owner approval over $1,000
**Growing business**: Supervisor ($1K), Manager ($10K), Director ($50K)
**Large business**: Multiple levels with segregation of duties

Consider factors like budget impact, supplier risk, and spending authority.

### "How do I handle emergency purchase orders?"

Create emergency procedures:

1. **Define emergency criteria** - Production down, safety issues, VIP customers
2. **Expedited approval** - Faster routing and response times
3. **Higher approval limits** - Allow emergency approvers more authority
4. **Document justification** - Require business case for emergency status
5. **Post-review** - Analyze emergencies to prevent future occurrences

Balance speed with control to maintain proper oversight.

### "What if I receive more or less than ordered?"

Handle receipt variances systematically:

**Over-receipt**:
- Check tolerance settings (usually 5-10% acceptable)
- Accept if within tolerance
- Require approval if over tolerance
- Return excess if not needed

**Under-receipt**:
- Accept partial delivery
- Follow up on remaining quantity
- Consider alternative sources if needed
- Document supplier performance impact

### "How do I track purchase order performance?"

Key metrics to monitor:

- **Approval time** - How long POs take to approve
- **Supplier response** - Acknowledgment and delivery performance
- **Cost variance** - Actual vs. budgeted costs
- **Delivery performance** - On-time delivery rates
- **Quality issues** - Defects and returns

Use these metrics to improve processes and supplier relationships.

### "What if a supplier wants to change delivery dates?"

Evaluate change requests:

1. **Check impact** - How does delay affect customer orders?
2. **Assess alternatives** - Can other suppliers deliver sooner?
3. **Negotiate terms** - Expedite fees, penalties, or discounts
4. **Approve if acceptable** - Update PO and notify stakeholders
5. **Document performance** - Track for supplier scorecards

Balance supplier relationships with customer commitments.

### "How do I handle international purchase orders?"

International POs require additional considerations:

- **Currency** - Specify currency and exchange rate handling
- **Incoterms** - Define shipping terms and responsibilities
- **Documentation** - Import licenses, certificates, customs forms
- **Lead times** - Allow for shipping and customs clearance
- **Payment terms** - Letters of credit, wire transfers, etc.

Work with international trade specialists for complex transactions.

---

## Chapter Summary

Purchase orders are the operational backbone of procurement, transforming supplier relationships into formal commitments that drive inventory replenishment and business operations.

**Key takeaways:**

**Purchase orders create legal commitments** — Formal POs establish binding agreements with suppliers that create financial obligations and delivery expectations.

**Approval workflows ensure control** — Systematic approval processes with appropriate thresholds and segregation of duties maintain spending control and compliance.

**Lifecycle management provides visibility** — Tracking POs from creation through closure ensures nothing falls through the cracks and enables proactive management.

**Allocation linking drives customer focus** — Connecting POs to customer orders ensures procurement serves customer needs and provides end-to-end visibility.

**Supplier communication builds relationships** — Professional PO processes with clear terms and timely communication strengthen supplier partnerships.

**Status tracking enables proactive management** — Real-time visibility into PO status enables quick response to issues and proactive customer communication.

**Performance measurement drives improvement** — Systematic analysis of PO metrics identifies bottlenecks and optimization opportunities.

**Emergency procedures balance speed and control** — Special processes for urgent situations maintain proper oversight while enabling rapid response.

**Integration maintains accuracy** — Proper integration with suppliers, allocations, receipts, and financial systems ensures data consistency and operational efficiency.

**Audit trails support compliance** — Complete documentation of all PO activities supports financial compliance and provides forensic capability.

Purchase orders are more than just buying documents—they're strategic tools that enable effective procurement while maintaining proper controls and relationships. When managed well, they become competitive advantages that drive cost savings, reliable supply, and operational excellence.

The next chapter will show you how to use the Procurement Command Center to manage your entire procurement operation strategically. But remember that the command center is only as good as the purchase orders that feed it. Master purchase orders, and you master the foundation of procurement excellence.

Your procurement effectiveness directly impacts inventory availability, customer satisfaction, and financial performance. Make purchase order management a strength, and you create lasting competitive advantages that drive business success.