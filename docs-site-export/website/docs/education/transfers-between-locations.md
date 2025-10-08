---
outline: deep
chapter_source: Chapter_07_Transfers_Between_Locations.md
---

# Chapter 7: Transfers Between Locations

**Contract Reference:** `operations/transactions/paths/transfer-core.yaml`

## Moving Inventory Where It's Needed

Imagine you're running a multi-location business. Your main warehouse has plenty of control modules, but your downtown store is running low and has customers waiting. Or your field service team needs parts moved from the warehouse to their service vehicles for tomorrow's jobs. Or you've discovered that 50 safety valves are sitting in the wrong location and need to be moved to where they belong.

This is where transfers come in. Transfers move inventory between locations within your organization while maintaining perfect accuracy and complete audit trails. They're not just about moving boxes—they're about optimizing your inventory positioning, supporting your operations, and ensuring the right products are in the right places at the right times.

But transfers are more complex than they might first appear. They involve two locations, potentially different currencies, approval workflows, in-transit tracking, and careful coordination between multiple people and systems. A transfer that goes wrong can leave inventory "lost" between locations, create allocation problems, or disrupt customer service.

Understanding how to execute transfers properly—from simple warehouse movements to complex multi-location shipments—is essential for maintaining operational efficiency while preserving inventory accuracy. This chapter will show you how to master the complete transfer process.

---

## Transfer Workflow

The transfer workflow ensures that inventory moves safely and accurately between locations while maintaining proper controls and documentation.

**Creating Transfer Requests**

Every transfer starts with a request that specifies what needs to move, where it's going, and why.

**To create a transfer request:**

1. **Identify the transfer need**
   - What products need to move
   - How much quantity is required
   - Source location (where inventory currently is)
   - Destination location (where inventory needs to go)
   - Reason for the transfer

2. **Check availability and permissions**
   - Verify sufficient inventory at source location
   - Confirm you have permission to transfer from source
   - Ensure destination location can receive the inventory
   - Check if approval will be required based on value

3. **Create the transfer request**
   - Navigate to Inventory → Transfers → Create Transfer
   - Select source and destination locations
   - Add products and quantities
   - Choose appropriate reason code
   - Add notes explaining the business need

4. **Review and submit**
   - Verify all details are correct
   - Check estimated value and approval requirements
   - Submit for approval if required, or execute directly if authorized

**Example transfer request:**
```
Transfer: TRF-2025-0156
From: Main Warehouse, Bin A-15
To: Downtown Store, Receiving Area
Product: Control Module CM-500
Quantity: 25 units
Reason: Store replenishment
Value: $3,750 (25 × $150 average cost)
Approval Required: Yes (exceeds $1,000 threshold)
Notes: Store inventory below reorder point, customer orders pending
```

**Approving Transfers**

Transfers above certain thresholds require approval to ensure proper oversight and control.

**Understanding approval requirements:**

Approval thresholds typically depend on your organization size and the transfer value:

**Example approval matrix:**
```
Small Business:
- Auto-approve: Under $1,000
- Manager approval: $1,000 and above

Growing Business:
- Auto-approve: Under $500
- Supervisor approval: $500 - $2,500
- Manager approval: Over $2,500

Enterprise:
- Auto-approve: Under $100
- Supervisor approval: $100 - $1,000
- Manager approval: $1,000 - $5,000
- Executive approval: Over $5,000
```

**The approval process:**

1. **System routes transfer** to appropriate approver based on value
2. **Approver receives notification** via email and system alert
3. **Approver reviews transfer details** including:
   - Business justification
   - Source and destination locations
   - Products and quantities
   - Estimated costs and impacts
4. **Approver makes decision** with documented reasoning
5. **System processes approved transfers** automatically

**Example approval decision:**
```
Transfer: TRF-2025-0156
Approver: Jane Manager
Decision: Approved
Approval Notes: Store inventory critically low, customer orders waiting. 
Transfer justified for customer service. Approved for immediate dispatch.
Approved: 2025-01-20 10:30 AM
```

**Dispatching Transfers**

Once approved, transfers move to the dispatch phase where physical movement begins.

**The dispatch process:**

1. **Prepare inventory for transfer**
   - Pick items from source location
   - Verify quantities and condition
   - Package appropriately for transport
   - Generate transfer documentation

2. **Record dispatch details**
   - Actual dispatch date and time
   - Carrier or transport method
   - Tracking numbers if applicable
   - Expected delivery date

3. **Update system status**
   - Transfer status changes to "dispatched" or "in transit"
   - Source location inventory decreases
   - In-transit inventory tracking begins
   - Destination location receives notification

**Example dispatch record:**
```
Transfer: TRF-2025-0156
Dispatched: 2025-01-20 2:15 PM
Method: Company vehicle
Driver: Tom Wilson
Expected Arrival: 2025-01-20 4:00 PM
Tracking: Internal route #47
Notes: Direct delivery, no intermediate stops
```

**Receiving at Destination**

The final step is receiving the transferred inventory at the destination location.

**The receiving process:**

1. **Physical receipt of inventory**
   - Verify items match transfer documentation
   - Count quantities received
   - Check condition of items
   - Note any discrepancies or damage

2. **Record receipt in system**
   - Confirm quantities received
   - Update transfer status to "received"
   - Add any notes about condition or variances
   - Complete the transfer process

3. **Update inventory records**
   - Destination location inventory increases
   - In-transit inventory clears
   - Transfer marked as complete
   - Any linked allocations update

**Example receipt confirmation:**
```
Transfer: TRF-2025-0156
Received: 2025-01-20 3:45 PM
Received By: Sarah Store Manager
Quantity: 25 units (matches shipped quantity)
Condition: All items in good condition
Location: Downtown Store, Receiving Area
Status: Transfer Complete
```

**Understanding transfer states:**

Transfers progress through several states during their lifecycle:

**Draft** → **Approved** → **Dispatched** → **In Transit** → **Received** → **Complete**

**Alternative paths:**
- **Draft** → **Cancelled** (before approval)
- **Approved** → **Cancelled** (before dispatch)
- **In Transit** → **Returned** (if delivery fails)

Each state change creates audit records and may trigger notifications to relevant parties.

---

## Managing Transfers

Effective transfer management ensures smooth operations while maintaining visibility and control over in-transit inventory.

**Canceling Transfers**

Sometimes transfers need to be cancelled due to changing business needs or operational issues.

**When to cancel transfers:**
- Business need no longer exists
- Inventory discovered at destination
- Higher priority need for the inventory
- Operational issues prevent completion
- Errors discovered in transfer details

**How to cancel transfers:**

**Before dispatch:**
1. Open the transfer record
2. Click "Cancel Transfer"
3. Select cancellation reason
4. Add notes explaining the cancellation
5. Confirm the cancellation

**After dispatch but before receipt:**
1. Contact carrier or driver to stop delivery
2. Arrange return to source location
3. Update transfer status to "cancelled"
4. Process return receipt when inventory arrives back
5. Document the full cancellation process

**Example cancellation:**
```
Transfer: TRF-2025-0157
Original: 50 safety valves to Service Center B
Cancellation Reason: Emergency need at Service Center A
Cancelled By: Operations Manager
Cancelled: 2025-01-21 9:30 AM
Status: Cancelled before dispatch
Action: Inventory remains at source, available for reallocation
```

**Transfer Settings Configuration**

Transfer settings control how transfers work in your organization, including approval thresholds, routing rules, and operational parameters.

**Key transfer settings:**

**Approval thresholds:**
- Dollar value limits for auto-approval
- Approval routing by organization level
- Emergency override procedures
- Escalation rules for delayed approvals

**Location rules:**
- Which locations can transfer to which others
- Restricted transfer paths
- Required documentation by location type
- Special handling requirements

**Operational settings:**
- Default carriers and shipping methods
- Standard transit times between locations
- Packaging and labeling requirements
- Integration with external shipping systems

**Example transfer settings:**
```
Organization: ABC Manufacturing
Approval Profile: Growing Business

Approval Thresholds:
- Auto-approve: Under $500
- Supervisor: $500 - $2,500
- Manager: Over $2,500

Location Rules:
- Warehouse to Store: Allowed, standard approval
- Store to Store: Requires manager approval
- Warehouse to Service Vehicle: Allowed, supervisor approval
- Service Vehicle to Customer: Allowed, no approval needed

Operational Settings:
- Default carrier: Internal fleet
- Standard transit time: Same day for local, next day for regional
- Tracking required: All transfers over $1,000
- Insurance required: All transfers over $10,000
```

**Tracking In-Transit Inventory**

In-transit inventory represents products that have left the source location but haven't yet arrived at the destination.

**Why in-transit tracking matters:**
- Maintains accurate total inventory counts
- Enables proper allocation decisions
- Supports customer service inquiries
- Provides visibility for operational planning
- Ensures nothing gets "lost" between locations

**How in-transit tracking works:**

1. **When transfer dispatches:**
   - Source location inventory decreases
   - In-transit inventory increases by same amount
   - Total organization inventory remains constant

2. **During transit:**
   - Inventory shows as "in transit" between locations
   - Not available for allocation from either location
   - Tracked separately in inventory reports
   - May have estimated arrival times

3. **When transfer receives:**
   - In-transit inventory decreases
   - Destination location inventory increases
   - Total inventory remains constant throughout

**Example in-transit tracking:**
```
Transfer: TRF-2025-0158
Product: Pressure Sensor PS-100
Original Location: Main Warehouse (had 100 units)
Destination: Service Center A (had 20 units)
Transfer Quantity: 30 units

After Dispatch:
- Main Warehouse: 70 units
- In Transit: 30 units
- Service Center A: 20 units
- Total: 120 units (unchanged)

After Receipt:
- Main Warehouse: 70 units
- In Transit: 0 units
- Service Center A: 50 units
- Total: 120 units (unchanged)
```

**Monitoring transfer performance:**

Regular monitoring helps identify issues and improve transfer efficiency.

**Key metrics to track:**
- **Transfer completion time** - How long transfers take from request to receipt
- **Approval delays** - Time spent waiting for approvals
- **Transit time accuracy** - Actual vs. estimated delivery times
- **Transfer accuracy** - Percentage of transfers received without discrepancies
- **Cancellation rate** - Percentage of transfers cancelled before completion

**Common transfer issues to watch for:**
- Frequent cancellations (may indicate poor planning)
- Long approval delays (may need threshold adjustments)
- Recurring discrepancies (may indicate process problems)
- Extended transit times (may indicate routing issues)

**Example performance report:**
```
Transfer Performance - January 2025
Total Transfers: 247
Completed Successfully: 231 (93.5%)
Cancelled: 12 (4.9%)
In Progress: 4 (1.6%)

Average Times:
- Request to Approval: 2.3 hours
- Approval to Dispatch: 4.1 hours
- Dispatch to Receipt: 6.8 hours
- Total Cycle Time: 13.2 hours

Issues Identified:
- 3 transfers had quantity discrepancies
- 5 transfers exceeded estimated transit time
- 2 transfers required emergency approval override

Improvement Actions:
- Additional training on transfer procedures
- Review of transit time estimates
- Process improvement for emergency situations
```

**Best practices for transfer management:**

**Plan transfers strategically:**
- Batch multiple items going to same destination
- Consider optimal timing for operational efficiency
- Coordinate with receiving location schedules
- Plan for seasonal or event-driven needs

**Maintain clear communication:**
- Notify receiving locations of incoming transfers
- Provide tracking information when available
- Communicate any delays or changes promptly
- Confirm receipt and resolve discrepancies quickly

**Monitor and improve:**
- Track transfer performance metrics regularly
- Identify and address recurring issues
- Optimize routes and methods based on experience
- Update procedures based on lessons learned

---

## Bringing It All Together: A Day in the Life

Let me show you how transfers work in practice across different scenarios and business needs.

**Monday, 7:00 AM — Lisa, Store Manager**

Lisa arrives at the downtown store and checks inventory levels. The weekend was busy, and several items are running low.

**Store Replenishment Need:**

Lisa reviews the inventory report:
- Control modules: 8 units (reorder point: 15)
- Safety valves: 3 units (reorder point: 10)
- Pressure sensors: 12 units (reorder point: 20)

She creates transfer requests to replenish from the main warehouse:

**Transfer 1: Control Modules**
```
Transfer: TRF-2025-0201
From: Main Warehouse, Bin A-15
To: Downtown Store, Receiving
Product: Control Module CM-500
Quantity: 20 units
Reason: Store replenishment
Value: $3,000
Approval Required: Manager (exceeds $1,000)
Notes: Below reorder point, customer orders pending
```

**Transfer 2: Safety Valves**
```
Transfer: TRF-2025-0202
From: Main Warehouse, Bin B-20
To: Downtown Store, Receiving
Product: Safety Valve SV-200
Quantity: 15 units
Reason: Store replenishment
Value: $1,125
Approval Required: Manager (exceeds $1,000)
Notes: Critical low stock, needed for today's installations
```

Both transfers route to Mike, the regional manager, for approval.

**Monday, 8:30 AM — Tom, Field Service Coordinator**

Tom prepares for the day's service calls and realizes Technician Sarah needs additional parts for an emergency repair.

**Emergency Field Service Transfer:**

Customer ABC Manufacturing has a critical production line down, and Sarah needs a specific control module that's not in her service vehicle.

```
Transfer: TRF-2025-0203
From: Main Warehouse, Bin A-15
To: Sarah's Service Van
Product: Control Module CM-500 (Serial: SN-2025-1234)
Quantity: 1 unit
Reason: Emergency customer repair
Value: $150
Approval Required: No (under threshold and emergency)
Priority: Urgent
Notes: Production line down, $50K/hour impact
```

Tom marks this as an emergency transfer, which bypasses normal approval and routes directly to dispatch.

**Monday, 9:15 AM — Mike, Regional Manager**

Mike reviews the pending transfer approvals from Lisa's store replenishment requests.

**Reviewing Store Transfers:**

Mike examines both requests:
- Checks current warehouse inventory (sufficient for both)
- Reviews store sales trends (transfers justified)
- Considers delivery logistics (can combine shipments)

**Approval Decisions:**
```
Transfer TRF-2025-0201: APPROVED
Approval Notes: Store inventory critically low, customer orders waiting. 
Combine with TRF-2025-0202 for efficient delivery.
Approved: 2025-01-22 9:20 AM

Transfer TRF-2025-0202: APPROVED
Approval Notes: Safety valves needed for today's installations. 
Critical for customer service. Combine shipment with control modules.
Approved: 2025-01-22 9:22 AM
```

**Monday, 10:00 AM — David, Warehouse Supervisor**

David receives the approved transfers and emergency request for processing.

**Processing Emergency Transfer:**

The emergency transfer for Sarah's service van gets priority:

```
Transfer: TRF-2025-0203
Picked: Control Module SN-2025-1234 from Bin A-15
Dispatched: 2025-01-22 10:05 AM
Method: Rush delivery to customer site
Driver: Emergency courier
Expected Arrival: 2025-01-22 11:00 AM
```

Sarah receives notification that her part is en route directly to the customer site.

**Processing Store Transfers:**

David combines the two store transfers into one shipment:

```
Combined Shipment: SHIP-2025-0089
Transfers: TRF-2025-0201 and TRF-2025-0202
Picked Items:
- 20 Control Modules from Bin A-15
- 15 Safety Valves from Bin B-20
Dispatched: 2025-01-22 10:30 AM
Method: Company delivery truck
Driver: Tom Wilson
Expected Arrival: Downtown Store, 2025-01-22 2:00 PM
```

**Monday, 11:00 AM — Sarah, Field Technician**

Sarah receives the emergency control module at the customer site and completes the repair.

**Emergency Transfer Receipt:**
```
Transfer: TRF-2025-0203
Received: 2025-01-22 11:00 AM
Location: Customer Site - ABC Manufacturing
Received By: Sarah (Field Technician)
Condition: Good
Status: Transfer Complete
Customer Impact: Production line restored, emergency resolved
```

The emergency transfer is complete, and the customer's production line is back online.

**Monday, 2:00 PM — Lisa, Store Manager**

The delivery truck arrives at the downtown store with the replenishment inventory.

**Store Transfer Receipt:**

Lisa receives and processes both transfers:

```
Transfer: TRF-2025-0201 (Control Modules)
Received: 2025-01-22 2:15 PM
Quantity: 20 units (matches shipped)
Condition: All items in good condition
Location: Downtown Store, Receiving Area
Status: Transfer Complete

Transfer: TRF-2025-0202 (Safety Valves)
Received: 2025-01-22 2:15 PM
Quantity: 15 units (matches shipped)
Condition: All items in good condition
Location: Downtown Store, Receiving Area
Status: Transfer Complete
```

Lisa moves the inventory to the sales floor and updates the store's available inventory.

**Monday, 3:30 PM — Jennifer, Inventory Analyst**

Jennifer discovers a location error during a routine audit and needs to correct it.

**Location Correction Transfer:**

During cycle counting, Jennifer finds 25 pressure sensors in the wrong location:

```
Transfer: TRF-2025-0204
From: Storage Bin C-10 (wrong location)
To: Storage Bin D-25 (correct location)
Product: Pressure Sensor PS-100
Quantity: 25 units
Reason: Location correction
Value: $1,250
Approval Required: Manager (exceeds $1,000)
Notes: Items found in wrong bin during cycle count. Moving to correct 
location per product master data.
```

This transfer corrects the location error and ensures accurate inventory positioning.

**Monday, 4:45 PM — Operations Review**

The operations team reviews the day's transfer activity:

**Daily Transfer Summary:**
```
Transfers Processed: 4
Total Value: $5,525
Emergency Transfers: 1 (completed successfully)
Store Replenishment: 2 (completed successfully)
Location Corrections: 1 (pending approval)

Performance Metrics:
- Average approval time: 1.2 hours
- Average dispatch time: 45 minutes
- Emergency response time: 1 hour (target: <2 hours)
- Transfer accuracy: 100% (no discrepancies)

Customer Impact:
- Emergency repair completed on time
- Store inventory replenished for customer service
- No stockouts or service disruptions
```

**End of Day Results:**

The transfer system successfully supported diverse business needs:

**Emergency Response:** Critical customer issue resolved within 1 hour through emergency transfer process

**Store Operations:** Inventory replenished efficiently with combined shipments and proper approvals

**Inventory Accuracy:** Location errors identified and corrected through systematic transfers

**Operational Efficiency:** Multiple transfers coordinated effectively with minimal disruption

**Audit Compliance:** Complete documentation and approval trails maintained for all transfers

Each transfer served its specific purpose while maintaining inventory accuracy, operational efficiency, and customer service excellence. The system's flexibility handled both routine replenishment and emergency situations while preserving proper controls and documentation.

---

## Common Questions & Troubleshooting

### "What's the difference between a transfer and an adjustment?"

**Transfers** move inventory between locations within your organization - total inventory stays the same, just changes location. **Adjustments** change the total amount of inventory in your system by adding or removing quantities.

Use transfers when inventory physically moves from one place to another. Use adjustments when you need to correct quantities to match physical reality.

### "Can I transfer inventory that's already allocated to orders?"

Yes, but be careful about the impact on customer promises. When you transfer allocated inventory:

- The allocation moves with the inventory to the new location
- Customer delivery promises should still be achievable
- Consider whether the new location can fulfill the allocation
- Notify sales/customer service if delivery timing might change

The system maintains allocation links during transfers to preserve customer commitments.

### "Why do some transfers require approval while others don't?"

Approval requirements are typically based on the transfer value and your organization's risk tolerance:

- **Low-value transfers** may be auto-approved to maintain efficiency
- **High-value transfers** require approval for financial control
- **Cross-branch transfers** may need additional oversight
- **Emergency transfers** might bypass normal approvals

Check with your administrator about your specific approval thresholds.

### "What happens if inventory gets lost or damaged during transfer?"

If inventory is lost or damaged in transit:

1. **Document the issue** with photos and incident reports
2. **Contact your insurance carrier** if coverage applies
3. **Create adjustment transactions** to remove lost/damaged inventory
4. **Investigate the cause** to prevent future occurrences
5. **Update procedures** based on lessons learned

The system maintains complete audit trails to support insurance claims and investigations.

### "Can I transfer between locations with different units of measure?"

Yes, the system handles UOM conversions during transfers:

- **Source location** records the transfer in its preferred UOM
- **System converts** using the product's conversion factors
- **Destination location** receives in its preferred UOM
- **Audit trail** maintains both original and converted quantities

Ensure your conversion factors are accurate to prevent discrepancies.

### "How do I handle partial receipts when not all inventory arrives?"

For partial receipts:

1. **Record what actually arrived** in the system
2. **Leave the transfer open** for the remaining quantity
3. **Investigate the shortage** - was it shipped but lost, or never shipped?
4. **Take appropriate action** - wait for remaining items, cancel balance, or create adjustment
5. **Document the resolution** for audit purposes

The system tracks partial receipts and outstanding quantities automatically.

### "What if I need to cancel a transfer that's already in transit?"

For in-transit cancellations:

1. **Contact the carrier or driver** immediately to stop delivery
2. **Arrange return** to the source location
3. **Update transfer status** to "cancelled" or "returned"
4. **Process return receipt** when inventory arrives back at source
5. **Document the reason** for cancellation

Emergency cancellations may incur additional costs but preserve inventory accuracy.

### "How do transfers affect my cost accounting?"

Transfers impact costs differently depending on your setup:

- **Same currency locations:** Cost layers typically transfer unchanged
- **Different currency locations:** Costs convert at current exchange rates
- **Different costing methods:** May require cost layer adjustments
- **Consignment inventory:** Ownership rules may apply

Work with your accounting team to understand the financial implications of transfers.

### "Can I schedule transfers for future dates?"

Many systems support scheduled transfers:

- **Set future dispatch dates** for planned movements
- **Coordinate with receiving locations** for optimal timing
- **Batch transfers** for efficiency
- **Automate routine replenishment** transfers

Check if your system supports scheduling and what options are available.

### "How do I track transfer performance and identify improvements?"

Monitor these key metrics:

- **Transfer cycle time** - Request to completion
- **Approval delays** - Time waiting for authorization
- **Transit accuracy** - Actual vs. estimated delivery times
- **Transfer accuracy** - Percentage without discrepancies
- **Cost per transfer** - Including labor, transportation, and overhead

Use this data to optimize routes, adjust thresholds, and improve processes.

### "What documentation do I need for transfers?"

Documentation requirements vary by transfer type and value:

- **All transfers:** Clear business justification and approval records
- **High-value transfers:** Additional documentation and approvals
- **Cross-border transfers:** Customs and regulatory documentation
- **Hazardous materials:** Special handling and shipping documentation
- **Serialized items:** Complete serial number tracking

When in doubt, provide more documentation rather than less.

---

## Chapter Summary

Transfers are the arteries of multi-location inventory management, moving products where they're needed while maintaining accuracy and control. Master transfers, and you master the ability to optimize inventory positioning across your entire organization.

**Key takeaways:**

**Transfers maintain inventory conservation** — Total inventory never changes during transfers, only location distribution. This fundamental principle ensures accuracy and prevents inventory loss.

**Workflow stages provide control** — The request → approval → dispatch → receipt workflow ensures proper oversight while maintaining operational efficiency.

**Approval thresholds balance control and speed** — Value-based approvals provide oversight for significant transfers while allowing routine movements to proceed quickly.

**In-transit tracking prevents loss** — Proper tracking of inventory between locations ensures nothing gets "lost" and enables accurate allocation decisions.

**Documentation supports accountability** — Complete audit trails for all transfers support compliance, insurance claims, and process improvement.

**Emergency procedures handle urgent needs** — Special processes for emergency transfers balance speed with control when business needs are critical.

**Performance monitoring drives improvement** — Regular analysis of transfer metrics identifies bottlenecks and opportunities for optimization.

**Integration enables efficiency** — Transfers work with allocations, approvals, and other systems to support seamless operations.

**Location rules ensure validity** — Transfer matrices and location controls prevent invalid movements while supporting legitimate business needs.

**Cost handling preserves accuracy** — Proper cost layer management during transfers maintains financial accuracy across locations and currencies.

Transfers are more than just moving inventory—they're about optimizing your entire operation. When done right, they ensure the right products are in the right places at the right times, supporting customer service while maintaining accuracy and control.

The next chapter will show you how to handle shipping and deliveries to customers. But remember that many customer shipments start with transfers that position inventory optimally for fulfillment. Master transfers, and you create the foundation for efficient, accurate, and responsive inventory operations.

Your inventory is only as effective as your ability to position it where it's needed. Transfers give you that power while maintaining the accuracy and control that keep your business running smoothly.