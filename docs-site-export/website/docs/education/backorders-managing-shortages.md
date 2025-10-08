---
outline: deep
chapter_source: Chapter_12_Backorders_Managing_Shortages.md
---

# Chapter 12: Backorders - Managing Shortages

**Contract Reference:** `operations/analytics/paths/backorder-command-center.yaml`

## When Supply Can't Meet Demand

Picture this: Your biggest customer places an urgent order for 100 control modules, but your supplier just called to say their shipment will be three weeks late due to a manufacturing issue. You have 30 units on hand, but that leaves 70 units backordered. How do you manage this shortage? How do you communicate with your customer? How do you prioritize this against other backorders? How do you prevent this from happening again?

This is where backorder management comes in. Backorders are an inevitable part of business—suppliers have delays, demand spikes unexpectedly, quality issues arise, and logistics problems occur. The question isn't whether you'll have backorders, but how well you'll manage them when they occur.

But backorders are more than just delayed shipments. They represent broken promises to customers, revenue at risk, and operational challenges that can cascade through your entire business. Poor backorder management leads to frustrated customers, lost sales, and damaged relationships. Excellent backorder management turns problems into opportunities to demonstrate exceptional service and build customer loyalty.

Understanding how to manage backorders effectively—from creation through resolution—is essential for maintaining customer satisfaction while minimizing business impact. This chapter will show you how to master backorder management as both a customer service tool and an operational necessity.

---

## Backorder Management

Backorder management transforms supply shortages into systematic processes that maintain customer relationships while optimizing resolution strategies.

**Creating and Listing Backorders**

Backorders are typically created automatically when purchase orders are delayed, but can also be created manually for special situations.

**Automatic backorder creation:**
1. **Purchase order delayed** - Supplier notifies of delivery delay
2. **System creates backorder** - Links to affected PO line
3. **Calculates customer impact** - Identifies affected allocations
4. **Applies priority scoring** - Based on customer tier and urgency
5. **Triggers notifications** - Alerts appropriate personnel

**Manual backorder creation:**
1. **Navigate to backorders** - Inventory → Backorders → Create
2. **Select purchase order line** - Choose delayed PO line
3. **Specify backorder quantity** - Amount that will be delayed
4. **Set new expected date** - When items are now expected
5. **Document reason** - Why the delay occurred
6. **Review customer impact** - See which orders are affected

**Example backorder creation:**
```
Purchase Order: PO-2025-0089
Supplier: ABC Manufacturing
Product: Control Module CM-500
Original Due Date: 2025-01-25
New Expected Date: 2025-02-15
Backorder Quantity: 70 units

Customer Impact:
- Metro Manufacturing: 50 units (VIP customer, critical order)
- Industrial Services: 20 units (Standard customer, normal priority)

Priority Score: 8,500 (High priority due to VIP customer)
Estimated Revenue at Risk: $35,000
Recommended Action: Expedite or find alternative source
```

**Backorder listing and filtering:**
- **By priority** - Critical, high, medium, low
- **By customer tier** - VIP, premium, standard
- **By age** - Days since backorder created
- **By supplier** - Which supplier is causing delays
- **By product** - Which items are most problematic
- **By value** - Financial impact of delays

**Understanding Backorder Status**

Backorders progress through several states that reflect resolution progress and customer impact.

**Backorder status progression:**

**Open** - Initial backorder state
- Supplier has notified of delay
- New ETA provided or pending
- Customer impact being assessed
- Resolution strategy being developed

**ETA Updated** - New delivery date received
- Supplier provided revised timeline
- Customer notifications sent
- Priority recalculated based on new date
- Follow-up scheduled

**Partially Resolved** - Some quantity received
- Partial shipment arrived from supplier
- Some customer orders can be fulfilled
- Remaining quantity still backordered
- Updated notifications sent

**Escalated** - Requires management attention
- Delay exceeds acceptable thresholds
- High-value or VIP customer impact
- Alternative sourcing being explored
- Executive involvement required

**Resolved** - Backorder cleared
- Full quantity received from supplier
- All affected orders can be fulfilled
- Customer notifications completed
- Performance metrics updated

**Cancelled** - Backorder terminated
- Purchase order cancelled
- Alternative source found
- Customer order cancelled
- Impact mitigation completed

**Example backorder status tracking:**
```
Backorder: BO-2025-0156
Status: Escalated
Created: 2025-01-20
Original ETA: 2025-01-25
Current ETA: 2025-02-15
Days Overdue: 8 days

Status History:
- Jan 20: Created (supplier delay notification)
- Jan 22: ETA Updated (new date provided)
- Jan 25: Escalated (original due date passed)
- Jan 28: Partially Resolved (30 units received)

Current Impact:
- Remaining Quantity: 40 units
- Customers Affected: 2
- Revenue at Risk: $20,000
- Next Action: Alternative supplier sourcing
```

**Viewing Alternative Sources**

When backorders occur, identifying alternative sources can help resolve shortages faster.

**Alternative source types:**
- **Alternative suppliers** - Other vendors who carry the same product
- **Transfer locations** - Other warehouses with available inventory
- **Substitute products** - Similar items that meet customer needs
- **Expedited shipping** - Faster delivery from original supplier
- **Drop shipping** - Direct supplier-to-customer delivery

**Alternative source evaluation:**
1. **Check availability** - Confirm inventory levels
2. **Compare lead times** - Delivery speed vs. original source
3. **Evaluate costs** - Price differences and expedite fees
4. **Assess quality** - Product specifications and reliability
5. **Consider relationships** - Customer preferences and supplier terms

**Example alternative source analysis:**
```
Original Source: ABC Manufacturing
Product: Control Module CM-500
Needed: 40 units
Original ETA: 2025-02-15

Alternative Sources:
1. XYZ Components
   - Available: 50 units
   - Lead Time: 5 days
   - Price: +15% premium
   - Quality: Equivalent
   - Recommendation: Expedite for VIP customer

2. West Coast Warehouse
   - Available: 25 units
   - Lead Time: 2 days (transfer)
   - Price: Standard cost
   - Quality: Same product
   - Recommendation: Partial resolution

3. Substitute Product: CM-510
   - Available: 100 units
   - Lead Time: 1 day
   - Price: +5% premium
   - Quality: Enhanced features
   - Recommendation: Customer approval required
```

**Partial Fulfillment Options**

Partial fulfillment allows you to ship what's available while managing the remaining shortage.

**Partial fulfillment strategies:**
- **Ship available quantity** - Deliver what you have immediately
- **Hold for complete order** - Wait until full quantity available
- **Split shipment** - Multiple deliveries as inventory arrives
- **Substitute and ship** - Replace unavailable items with alternatives
- **Customer choice** - Let customer decide preferred approach

**Partial fulfillment process:**
1. **Assess available inventory** - What can ship immediately
2. **Calculate shipping costs** - Multiple shipments vs. single delivery
3. **Evaluate customer preference** - Urgency vs. convenience
4. **Communicate options** - Present choices clearly
5. **Execute decision** - Process shipment and update records

**Example partial fulfillment scenario:**
```
Customer: Metro Manufacturing
Order: 100 Control Modules CM-500
Available: 30 units
Backordered: 70 units

Options Presented:
1. Ship 30 now, 70 when available (Feb 15)
   - Pros: Immediate partial delivery
   - Cons: Two shipments, higher shipping cost

2. Wait for complete order (Feb 15)
   - Pros: Single shipment, lower cost
   - Cons: Delayed start of customer project

3. Ship 30 + 20 substitutes now, 50 when available
   - Pros: 50% immediate fulfillment
   - Cons: Mixed products, customer approval needed

Customer Decision: Option 1 (immediate partial shipment)
Reason: Project can start with 30 units, urgency outweighs cost
```

**Updating Backorder ETA**

Keeping backorder ETAs current is essential for accurate customer communication and planning.

**ETA update triggers:**
- **Supplier communication** - New delivery dates provided
- **Quality issues** - Additional delays for inspection/rework
- **Logistics problems** - Shipping delays or routing changes
- **Alternative sourcing** - Different supplier with different timeline
- **Expediting efforts** - Faster delivery arranged

**ETA update process:**
1. **Receive new information** - Supplier or logistics update
2. **Validate new date** - Confirm feasibility and accuracy
3. **Update system records** - Change expected delivery date
4. **Recalculate impact** - Assess effect on customer orders
5. **Notify stakeholders** - Update customers and internal teams
6. **Schedule follow-up** - Set next check-in date

**Example ETA update:**
```
Backorder: BO-2025-0156
Original ETA: 2025-02-15
Update Received: 2025-01-28

Supplier Update:
"Manufacturing issue resolved, but quality testing required.
New delivery date: February 22, 2025"

Impact Analysis:
- Additional delay: 7 days
- Customer impact: 2 orders affected
- Revenue at risk: Unchanged ($20,000)
- Escalation required: Yes (VIP customer)

Actions Taken:
- ETA updated to 2025-02-22
- VIP customer notified personally
- Alternative sourcing accelerated
- Weekly status calls scheduled
```

---

## Backorder Approvals

Backorder approvals ensure appropriate oversight and decision-making for significant supply shortages.

**Backorder Approval Workflows**

Different backorders require different levels of approval based on impact and value.

**Approval thresholds:**
- **Under $1,000** - Automatic approval, notification only
- **$1,000 - $10,000** - Supervisor approval required
- **$10,000 - $50,000** - Manager approval required
- **Over $50,000** - Director approval required
- **VIP customers** - Account manager approval regardless of value

**Approval workflow process:**
1. **Backorder created** - System calculates impact and value
2. **Approval routing** - Routes to appropriate approver
3. **Impact assessment** - Approver reviews customer and financial impact
4. **Decision making** - Approve, reject, or request alternatives
5. **Action execution** - Implement approved resolution strategy
6. **Status tracking** - Monitor progress and outcomes

**Example approval workflow:**
```
Backorder: BO-2025-0167
Value: $45,000
Customer: Premium Manufacturing (VIP)
Product: Safety Valve SV-200 (100 units)
Delay: 3 weeks

Approval Required: Manager + Account Manager
Reason: High value + VIP customer

Approval Process:
1. Supervisor Review: Approved (standard process)
2. Manager Review: Approved with conditions
   - Condition: Explore expedited shipping
   - Condition: Offer 10% discount for delay
3. Account Manager Review: Approved
   - Customer relationship maintained
   - Discount acceptable for retention

Final Decision: Approved with expedited shipping and discount
Expected Resolution: 2 weeks instead of 3
Customer Satisfaction: Maintained through proactive service
```

**Settings Management**

Backorder settings control how your organization handles shortages and approvals.

**Key backorder settings:**
- **Approval thresholds** - Dollar amounts requiring approval
- **Notification rules** - Who gets notified when
- **Priority scoring** - How customer impact is calculated
- **Escalation timelines** - When delays trigger escalation
- **Communication templates** - Standard customer messages

**Settings configuration:**
```
Backorder Management Settings:

Approval Thresholds:
- Auto-approve: Under $1,000
- Supervisor: $1,000 - $10,000
- Manager: $10,000 - $50,000
- Director: Over $50,000
- VIP Override: Account manager always required

Notification Rules:
- Immediate: Customer service, sales rep
- Daily digest: Purchasing manager
- Weekly summary: Operations director
- Escalation: Account manager for VIP customers

Priority Scoring:
- VIP customers: 5x multiplier
- Premium customers: 3x multiplier
- Standard customers: 1x multiplier
- Emergency orders: 10x multiplier

Escalation Triggers:
- 3 days overdue: Supervisor notification
- 7 days overdue: Manager escalation
- 14 days overdue: Director involvement
- 21 days overdue: Executive review
```

---

## Backorder Analytics

Backorder analytics provide insights into patterns, performance, and improvement opportunities.

**Backorder Command Center Dashboard**

The command center provides a comprehensive view of all backorder activity and performance.

**Dashboard components:**
- **Summary metrics** - Total backorders, value, customer impact
- **Aging analysis** - How long backorders have been open
- **Critical backorders** - Highest priority items requiring attention
- **Resolution pipeline** - Expected resolution timeline
- **Root cause analysis** - Why backorders are occurring
- **Supplier performance** - Which suppliers are causing problems

**Example command center view:**
```
Backorder Command Center - January 28, 2025

Summary:
- Total Backorders: 47 orders
- Total Value: $234,567
- Customers Affected: 38
- High Priority: 21 orders ($126,400)

Aging Buckets:
- 0-7 days: 23 orders (49%) - $84,560
- 8-14 days: 15 orders (32%) - $61,510
- 15+ days: 9 orders (19%) - $88,500

Critical Backorders:
1. Premium Co: $45,000 (18 days old) - Expedite PO-45812
2. Key Account A: $32,100 (15 days old) - Await supplier confirmation
3. VIP Client: $28,900 (12 days old) - Offer substitute SKU-12459

Resolution Pipeline:
- Next 24 hours: 12 orders ($45,230)
- Next 3 days: 8 orders ($32,100)
- Next 7 days: 15 orders ($67,890)
- Unknown ETA: 12 orders ($89,347)
```

**Analyzing Backorder Patterns**

Pattern analysis helps identify systemic issues and improvement opportunities.

**Key patterns to analyze:**
- **Seasonal trends** - When backorders occur most frequently
- **Supplier patterns** - Which suppliers cause most delays
- **Product patterns** - Which items are most problematic
- **Customer patterns** - Which customers are most affected
- **Root cause patterns** - Why backorders are happening

**Pattern analysis insights:**
```
Backorder Pattern Analysis - Q4 2024

Seasonal Trends:
- Peak backorder period: November-December
- Lowest backorder period: February-March
- Holiday season impact: 3x normal backorder rate

Supplier Performance:
- Worst performer: Global Manufacturing (45% of backorders)
- Best performer: Precision Components (2% of backorders)
- Average delay: 8.5 days across all suppliers

Product Categories:
- Most problematic: HVAC components (35% of backorders)
- Least problematic: Basic hardware (5% of backorders)
- Highest value impact: Control systems

Root Causes:
- Supplier delays: 55% of backorders
- Quality issues: 22% of backorders
- Logistics delays: 15% of backorders
- Demand spikes: 8% of backorders

Improvement Opportunities:
1. Diversify HVAC component suppliers
2. Improve demand forecasting for holiday season
3. Implement supplier performance penalties
4. Develop alternative sourcing strategies
```

**Performance metrics:**
- **Backorder rate** - Percentage of orders that become backordered
- **Average resolution time** - How long backorders take to resolve
- **Customer satisfaction** - Impact on customer relationships
- **Revenue impact** - Financial cost of backorders
- **Prevention rate** - Success in avoiding backorders

---

## Bringing It All Together: A Day in the Life

Let me show you how backorder management works in practice across different scenarios and business situations.

**Monday, 7:00 AM — Sarah, Purchasing Manager**

Sarah starts her day by reviewing the backorder command center and addressing critical situations.

**Morning Backorder Review:**

Sarah checks the weekend updates:
- 3 new backorders created
- 2 backorders resolved
- 1 escalation requiring immediate attention
- 5 ETA updates from suppliers

**Critical Escalation: VIP Customer**
```
Backorder: BO-2025-0201
Customer: Premium Manufacturing (VIP)
Product: Control Module CM-500
Quantity: 50 units
Value: $25,000
Age: 10 days (originally due Jan 18)
Current ETA: February 5 (supplier delay)
```

Sarah's immediate actions:
1. **Contact account manager** - Alert about VIP customer impact
2. **Review alternative sources** - Check other suppliers and locations
3. **Assess expediting options** - Cost vs. customer satisfaction
4. **Prepare customer communication** - Proactive outreach plan

**Alternative Source Analysis:**
```
Option 1: Expedite Original Supplier
- Cost: $2,500 expedite fee
- New ETA: January 30
- Pros: Same product, known quality
- Cons: High cost, still 12 days late

Option 2: Alternative Supplier
- Cost: $1,250 premium + $500 expedite
- New ETA: January 29
- Pros: Faster, lower total cost
- Cons: Different supplier, quality risk

Option 3: Transfer from West Coast
- Cost: $300 transfer cost
- New ETA: January 28
- Quantity: 30 units available
- Pros: Fast, low cost, known quality
- Cons: Only partial fulfillment

Decision: Combination approach
- Transfer 30 units from West Coast (immediate)
- Expedite 20 units from alternative supplier
- Total cost: $2,050 vs. $2,500
- Customer gets 60% immediately, 100% by Jan 29
```

**Monday, 9:30 AM — Mike, Customer Service Manager**

Mike handles customer communications and manages expectations.

**VIP Customer Communication:**

Mike calls Premium Manufacturing:
"Good morning, this is Mike from ABC Supply. I'm calling about your control module order. I want to update you on the status and our resolution plan."

**Customer conversation:**
```
Customer: "We were expecting those modules last week. Our production line is waiting."

Mike: "I understand the urgency, and I apologize for the delay. Here's what we're doing:
- 30 units will arrive tomorrow via expedited transfer
- Remaining 20 units will arrive January 29
- We're covering all expedite costs
- I'm personally monitoring this order

Would you like us to ship the 30 units immediately so you can start production?"

Customer: "Yes, that works. We can start with 30 and finish when the rest arrive."

Mike: "Perfect. I'll send tracking information this afternoon, and I'll call you Wednesday to confirm the remaining 20 units are on schedule."
```

**Follow-up actions:**
- Update backorder status to "Partially Resolved"
- Schedule shipment for 30 units
- Set reminder for Wednesday follow-up call
- Document customer satisfaction with resolution

**Monday, 11:00 AM — Jennifer, Operations Analyst**

Jennifer analyzes backorder patterns and identifies improvement opportunities.

**Weekly Pattern Analysis:**

Jennifer reviews the past week's backorder data:
```
Week of January 21-28, 2025:

New Backorders: 8
Resolved Backorders: 12
Net Improvement: -4 backorders

Root Cause Breakdown:
- Supplier delays: 5 backorders (62.5%)
- Quality issues: 2 backorders (25%)
- Logistics delays: 1 backorder (12.5%)

Supplier Performance:
- Global Manufacturing: 3 backorders (declining performance)
- Precision Components: 0 backorders (excellent)
- Regional Suppliers: 2 backorders (average)

Product Categories:
- Control modules: 4 backorders (supply constraint)
- Safety valves: 2 backorders (quality issues)
- Sensors: 2 backorders (demand spike)
```

**Improvement recommendations:**
1. **Supplier diversification** - Add second source for control modules
2. **Quality improvement** - Work with safety valve supplier on QC
3. **Demand forecasting** - Better prediction for sensor demand
4. **Inventory buffers** - Increase safety stock for critical items

**Monday, 2:00 PM — Tom, Procurement Specialist**

Tom works on resolving backorders and preventing future occurrences.

**Supplier Performance Review:**

Tom calls Global Manufacturing about their recent delays:
```
Tom: "We've had three backorders from you this week. What's causing the delays?"

Supplier: "We had a equipment failure in our main production line. It's been repaired, but we're catching up on the backlog."

Tom: "What's your plan to prevent this in the future?"

Supplier: "We're implementing preventive maintenance and adding backup equipment. We should be back to normal lead times by February 1."

Tom: "I need weekly status updates until you're caught up. And we'll need to discuss service level agreements to prevent this impact on our customers."
```

**Preventive actions:**
- Schedule weekly supplier calls
- Develop backup supplier for critical items
- Negotiate service level agreements with penalties
- Implement supplier performance scorecards

**Monday, 4:00 PM — Lisa, Warehouse Supervisor**

Lisa coordinates the physical resolution of backorders.

**Expedited Transfer Processing:**

Lisa receives the transfer request for 30 control modules:
```
Transfer Request: TR-2025-0089
From: West Coast Warehouse
To: Main Warehouse
Product: Control Module CM-500
Quantity: 30 units
Priority: Emergency (VIP customer)
Required: Ship today for tomorrow delivery
```

**Expedited processing:**
1. **Coordinate with West Coast** - Confirm availability and condition
2. **Arrange expedited shipping** - Next-day air delivery
3. **Prepare receiving** - Clear dock space for priority receipt
4. **Schedule immediate pick** - Ready for customer shipment tomorrow
5. **Update tracking** - Provide visibility to customer service

**Monday, 5:00 PM — Daily Backorder Review**

The team reviews the day's backorder activity and performance.

**Daily Metrics:**
```
Backorder Performance - January 28, 2025:

Resolution Activity:
- New backorders: 1
- Resolved backorders: 3
- Partially resolved: 2
- Escalations handled: 1

Customer Impact:
- VIP customers affected: 1 (resolved)
- Premium customers affected: 2 (in progress)
- Standard customers affected: 5 (normal processing)

Financial Impact:
- Revenue at risk: -$15,000 (improvement)
- Resolution costs: $2,350 (expediting and transfers)
- Customer satisfaction: 4.8/5.0 (maintained)

Supplier Performance:
- On-time delivery rate: 87% (target: 90%)
- Average delay: 6.2 days (target: <5 days)
- Quality issues: 2 (down from 4 last week)
```

**Process Improvements Identified:**
- VIP customer escalation process worked well
- Alternative sourcing options provided flexibility
- Proactive communication maintained customer satisfaction
- Supplier performance tracking identified problem areas

**End of Day Results:**

The backorder management system successfully handled diverse challenges while maintaining customer satisfaction:

**Crisis Management:** VIP customer backorder resolved through creative sourcing and proactive communication

**Pattern Recognition:** Analysis identified systemic issues with specific suppliers and products

**Preventive Actions:** Supplier performance discussions and backup sourcing plans initiated

**Customer Service:** Proactive communication and flexible solutions maintained relationships

**Financial Control:** Resolution costs balanced against customer retention and satisfaction

Each backorder was treated as an opportunity to demonstrate exceptional service while gathering data for continuous improvement.

---

## Common Questions & Troubleshooting

### "What's the difference between a backorder and a stockout?"

A **stockout** means you're completely out of inventory. A **backorder** means you have customer demand but insufficient supply to fulfill it immediately.

- **Stockout**: No inventory available, no customer orders waiting
- **Backorder**: Customer orders waiting for inventory that's expected to arrive

Backorders are actually a sign of good customer service—you're accepting orders even when you can't fulfill them immediately.

### "How do I prioritize backorders when everything seems urgent?"

Use systematic prioritization based on:

1. **Customer tier** - VIP customers get priority
2. **Order value** - Higher value orders get attention
3. **Days overdue** - Older backorders need resolution
4. **Business impact** - Production line down vs. routine reorder

The system can calculate priority scores automatically to remove emotion from decisions.

### "Should I create backorders for every delayed purchase order?"

Not necessarily. Create backorders when:
- Customer orders are affected by the delay
- The delay is significant (more than a few days)
- You need to track and communicate the impact

Don't create backorders for:
- Routine inventory replenishment with no customer impact
- Very short delays that won't affect delivery promises
- Purchase orders that haven't been allocated to customers

### "How often should I update backorder ETAs?"

Update ETAs whenever you receive new information:
- **Immediately** when suppliers provide updates
- **Weekly** if no updates received (follow up with supplier)
- **Daily** for critical/VIP customer backorders
- **When circumstances change** (quality issues, logistics problems)

Stale ETAs are worse than no ETAs—they create false expectations.

### "What if a customer wants to cancel due to a backorder?"

Handle cancellations professionally:

1. **Understand the reason** - Why is the delay unacceptable?
2. **Offer alternatives** - Substitutes, partial shipments, expediting
3. **Provide compensation** - Discounts, upgraded shipping, credits
4. **Process quickly** - Don't make cancellation difficult
5. **Learn from it** - Why did we lose this customer?

Sometimes cancellation is the right answer for both parties.

### "How do I prevent backorders from happening?"

Prevention strategies:
- **Better demand forecasting** - Predict needs more accurately
- **Safety stock** - Buffer inventory for critical items
- **Supplier diversification** - Multiple sources for important products
- **Lead time management** - Order earlier, track supplier performance
- **Quality improvement** - Reduce delays from quality issues

Perfect prevention is impossible, but you can reduce frequency and impact.

### "What if my supplier keeps changing the ETA?"

For unreliable suppliers:
1. **Document the pattern** - Track all ETA changes
2. **Escalate internally** - Get management involved
3. **Demand accountability** - Service level agreements with penalties
4. **Develop alternatives** - Backup suppliers for critical items
5. **Consider replacement** - Some suppliers aren't worth keeping

Reliability is often more important than price.

### "How do I communicate backorders to customers without losing them?"

Effective communication:
- **Be proactive** - Tell them before they ask
- **Be honest** - Don't make promises you can't keep
- **Offer options** - Give customers choices
- **Take responsibility** - Own the problem and the solution
- **Follow through** - Do what you say you'll do

Customers appreciate honesty and proactive communication.

### "Can I use backorders to improve supplier performance?"

Yes, backorders are valuable supplier management tools:
- **Performance metrics** - Track on-time delivery rates
- **Scorecards** - Include backorder frequency in evaluations
- **Contract terms** - Service level agreements with penalties
- **Business reviews** - Discuss backorder impact regularly
- **Sourcing decisions** - Factor reliability into supplier selection

Use data to drive supplier improvement conversations.

### "What metrics should I track for backorder management?"

Key metrics:
- **Backorder rate** - Percentage of orders that become backordered
- **Average resolution time** - How long backorders take to clear
- **Customer satisfaction** - Impact on customer relationships
- **Revenue at risk** - Financial exposure from delays
- **Root cause distribution** - Why backorders occur
- **Supplier performance** - Which suppliers cause problems

Track trends over time and benchmark against industry standards.

---

## Chapter Summary

Backorders are inevitable in business, but how you manage them determines whether they become customer service disasters or opportunities to demonstrate exceptional service.

**Key takeaways:**

**Backorders require systematic management** — Proper tracking, prioritization, and resolution processes turn supply shortages into manageable operational challenges.

**Customer communication is critical** — Proactive, honest communication about delays builds trust and maintains relationships even when problems occur.

**Priority-based resolution ensures fairness** — Systematic prioritization based on customer tier, order value, and urgency ensures important customers get appropriate attention.

**Alternative sourcing provides flexibility** — Multiple options for resolving shortages enable creative solutions that balance cost, speed, and customer satisfaction.

**Pattern analysis drives improvement** — Understanding why backorders occur enables preventive actions and supplier performance improvements.

**Approval workflows ensure oversight** — Appropriate approval levels for high-value or high-impact backorders ensure proper decision-making and accountability.

**Analytics enable optimization** — Command center dashboards and pattern analysis provide insights for continuous improvement and strategic decision-making.

**Partial fulfillment maintains momentum** — Shipping what's available while managing remaining shortages keeps customer projects moving forward.

**Supplier performance integration** — Using backorder data to manage supplier relationships drives accountability and performance improvement.

**Financial impact tracking** — Understanding revenue at risk enables appropriate investment in resolution strategies and prevention measures.

Backorders are more than just delayed shipments—they're tests of your customer service commitment and operational excellence. When managed well, they become opportunities to demonstrate your dedication to customer success and build lasting loyalty.

The next chapter will show you how to manage your supplier relationships to prevent backorders and optimize procurement performance. But remember that excellent backorder management is your safety net when prevention efforts fall short. Master backorders, and you master an essential component of customer service excellence.

Your customers will judge your reliability not just by how well you deliver on time, but by how well you handle problems when they occur. Make backorder management a strength, and you create competitive advantages that build customer loyalty and drive long-term success.