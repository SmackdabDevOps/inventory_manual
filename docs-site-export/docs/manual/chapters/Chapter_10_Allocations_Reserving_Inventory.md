# Chapter 10: Allocations - Reserving Inventory

**Contract Reference:** `operations/allocations/paths/allocation-core.yaml`

## Promising What You Can Deliver

Picture this: A customer places an order for 50 control modules, and you need to ship them next week. But you only have 30 on hand, with 20 more arriving from your supplier in three days. How do you track what's promised, what's available, and what's coming? How do you ensure this customer gets their full order while still being able to promise delivery dates to other customers?

This is where allocations come in. Allocations are your system's way of reserving specific inventory for specific orders, providing complete visibility into the fulfillment lifecycle from initial request through final delivery. They're not just about setting aside inventory—they're about creating promises you can keep while maintaining visibility into every stage of the fulfillment process.

But allocations are more complex than simple reservations. They track inventory through multiple states: what's on order from suppliers, what's physically allocated in your warehouse, what's in transit to customers, and what's been delivered. They handle priorities when inventory is constrained, manage partial fulfillments, and maintain complete audit trails of every change.

Understanding how to use allocations effectively—from simple reservations to complex multi-state tracking—is essential for maintaining customer satisfaction while optimizing inventory utilization. This chapter will show you how to master allocations as both a customer service tool and an operational necessity.

---

## Understanding Allocations

Allocations transform customer orders into systematic inventory reservations that provide visibility and control throughout the fulfillment process.

**What Allocations Do**

Allocations serve multiple critical functions in inventory management:

**Inventory Reservation** - Reserve specific quantities for specific orders
- Prevent overselling by tracking committed inventory
- Ensure high-priority orders get inventory first
- Maintain accurate available-to-promise calculations
- Support partial fulfillment decisions

**Fulfillment Tracking** - Monitor progress from order to delivery
- Track what's been secured vs. what's still needed
- Provide visibility into delivery timelines
- Enable proactive customer communication
- Support performance measurement

**Priority Management** - Handle competing demands fairly
- Apply customer tier priorities (VIP, standard, etc.)
- Use first-in-first-out within priority levels
- Support emergency order overrides
- Enable manager priority adjustments

**Purchase Order Integration** - Link customer demand to supplier orders
- Track what's on order to fulfill allocations
- Prioritize receipts for waiting customers
- Enable accurate delivery date promises
- Support procurement planning

**Example allocation overview:**
```
Allocation: ALLOC-2025-0156
Customer: ABC Construction
Product: Control Module CM-500
Requested: 50 units
Status: Partially Allocated

Current State:
- On Hand & Allocated: 30 units (ready to ship)
- On Order from Supplier: 20 units (arriving Jan 25)
- In Transit to Customer: 0 units
- Delivered: 0 units

Priority: High (VIP Customer)
Required By: January 30, 2025
```

**Allocation Lifecycle (Open → On Order → Allocated → With Technician/In Transit → Delivered → Cancelled)**

Allocations progress through several states that reflect the physical and logical status of inventory:

**Open** - Inventory needed but not yet secured
- Customer wants it, but we don't have it
- Represents unfulfilled demand
- Triggers purchase order creation
- May result in backorders if not available

**On Order** - Inventory ordered from suppliers
- Purchase orders submitted to suppliers
- Expected delivery dates tracked
- Links customer demand to supplier orders
- Transitions to allocated when received

**Allocated** - Inventory physically reserved
- Items in warehouse and set aside for order
- Ready for picking and shipping
- Protected from other allocations
- The only state where inventory is both on-hand and reserved

**With Technician** - Inventory checked out to field service
- Parts loaded in service vehicle
- Assigned to specific technician
- Can be installed at customer site or returned
- Supports field service operations

**In Transit** - Inventory shipped but not delivered
- Items left warehouse and en route to customer
- Tracking information available
- At risk until delivery confirmation
- Previously called "fulfilled" in some systems

**Delivered** - Inventory received by customer
- Final successful state
- Customer has confirmed receipt
- Can only decrease through returns
- Completes the allocation lifecycle

**Cancelled** - Allocation terminated
- Order cancelled before completion
- Inventory released back to available
- May occur at any stage before delivery
- Maintains audit trail of cancellation

**Example state progression:**
```
Day 1: Customer Order Created
- Requested: 50 units
- Open: 20 units (need to order)
- Allocated: 30 units (have on hand)

Day 3: Purchase Order Received
- Requested: 50 units
- Open: 0 units
- On Order: 0 units (PO received)
- Allocated: 50 units (all inventory secured)

Day 5: Shipment Created
- Requested: 50 units
- Allocated: 0 units (shipped)
- In Transit: 50 units

Day 7: Delivery Confirmed
- Requested: 50 units
- Delivered: 50 units (complete)
```

**Conservation Law** - The fundamental principle that governs all allocation states:

`Requested = Open + On Order + Allocated + In Transit + Delivered`

This equation must always balance. Every unit of requested inventory exists in exactly one state, and the total never changes except through order modifications or cancellations.

---

## Managing Allocations

Effective allocation management ensures optimal inventory utilization while maintaining customer satisfaction and operational efficiency.

**Creating Allocations**

Allocations are typically created automatically when orders are placed, but can also be created manually for special situations.

**Automatic allocation creation:**
1. **Customer places order** - Sales system creates order record
2. **System checks availability** - Calculates available-to-promise
3. **Creates allocation** - Reserves available inventory
4. **Applies priorities** - Uses customer tier and order rules
5. **Links purchase orders** - Creates POs for shortfalls if enabled

**Manual allocation creation:**
1. **Navigate to allocations** - Inventory → Allocations → Create
2. **Select product and quantity** - Specify what to allocate
3. **Choose source order** - Link to sales order or work order
4. **Set priority level** - High, medium, or low priority
5. **Review and create** - Confirm allocation details

**Example allocation creation:**
```
Product: Safety Valve SV-200
Quantity Requested: 25 units
Customer: Metro Manufacturing
Priority: High (VIP Customer)
Required By: 2025-01-30

Available Inventory: 15 units
Allocation Result:
- Allocated: 15 units (from warehouse stock)
- Open: 10 units (need to source)

Recommended Actions:
- Create purchase order for 10 units
- Set expected delivery: 2025-01-28
- Customer delivery still achievable
```

**Viewing Allocation Details**

Allocation details provide complete visibility into the current state and history of each reservation.

**Key allocation information:**
- **Current quantities** in each state
- **Priority level** and sequence
- **Source order** and customer information
- **Product details** and specifications
- **Timeline** and key dates
- **Linked purchase orders** if applicable
- **History** of all state changes

**Allocation detail view:**
```
Allocation: ALLOC-2025-0178
Created: 2025-01-20 9:15 AM
Customer: Industrial Services Inc.
Order: SO-2025-1245
Product: Pressure Sensor PS-100
Priority: Medium (Standard Customer)

Quantities:
- Requested: 100 units
- Open: 0 units
- On Order: 40 units (PO-2025-0089, due Jan 28)
- Allocated: 60 units (Main Warehouse, Bin A-20)
- In Transit: 0 units
- Delivered: 0 units

Status: Ready to Ship (partial)
Next Action: Ship 60 units, wait for PO receipt
Required By: 2025-02-05
```

**Releasing Allocations (Full and Partial)**

Sometimes allocations need to be released to free inventory for other orders or to handle changing priorities.

**Full release** - Release entire allocation
- Frees all allocated inventory
- Returns quantities to available stock
- Cancels linked purchase orders if appropriate
- Notifies customer of cancellation

**Partial release** - Release portion of allocation
- Frees specified quantity only
- Maintains allocation for remaining quantity
- Adjusts linked purchase orders if needed
- May trigger reallocation to other orders

**Release process:**
1. **Select allocation** to release
2. **Choose release type** - Full or partial
3. **Specify quantity** if partial release
4. **Provide reason** for release
5. **Confirm impact** on customer and other orders
6. **Execute release** and update records

**Example partial release:**
```
Original Allocation: 100 units
Customer Request: Reduce order to 75 units
Release Action: Release 25 units

Before Release:
- Allocated: 100 units
- Available Stock: 50 units

After Release:
- Allocated: 75 units
- Available Stock: 75 units (25 units returned)

Impact: 25 units now available for other orders
```

**Canceling Allocations**

Allocation cancellation completely removes the reservation and frees all associated inventory.

**Reasons for cancellation:**
- Customer cancels order
- Order cannot be fulfilled
- Product discontinued
- Credit issues
- Operational problems

**Cancellation process:**
1. **Verify cancellation authority** - Check user permissions
2. **Review allocation state** - Ensure cancellation is appropriate
3. **Handle linked orders** - Cancel or modify purchase orders
4. **Release inventory** - Return to available stock
5. **Update customer** - Communicate cancellation
6. **Document reason** - Maintain audit trail

**Cancellation impact:**
```
Cancelled Allocation: ALLOC-2025-0156
Product: Control Module CM-500
Quantities Released:
- Allocated: 30 units → Available Stock
- On Order: 20 units → Cancel PO or reallocate

Inventory Impact:
- Available Stock: +30 units immediately
- Purchase Order: Review for cancellation or reallocation
- Other Waiting Orders: May now be fulfillable
```

**Priority Overrides**

Priority overrides allow managers to adjust allocation priorities for special circumstances.

**When to use priority overrides:**
- Emergency orders for critical customers
- Production line down situations
- VIP customer special requests
- Operational priorities change
- Contract obligations

**Override process:**
1. **Identify allocation** needing priority change
2. **Request override** with business justification
3. **Manager approval** if required by policy
4. **System resequences** allocations by new priority
5. **Automatic reallocation** if inventory shifts
6. **Audit trail** records override decision

**Example priority override:**
```
Original Priority: Medium (500 points)
Override Request: Emergency - Production Line Down
New Priority: Emergency (10,000 points)
Justification: Customer production stopped, $50K/hour impact

Impact:
- Allocation moves to front of queue
- May reallocate inventory from lower priority orders
- Customer notification of expedited processing
- Manager approval required for override
```

**Reallocating Inventory**

Reallocation moves inventory between allocations to optimize fulfillment and respond to changing priorities.

**Reallocation scenarios:**
- Higher priority order needs inventory
- Partial shipment optimization
- Inventory becomes available at better location
- Customer changes delivery requirements
- Emergency situations

**Reallocation process:**
1. **Identify source allocation** with inventory to move
2. **Select target allocation** that needs inventory
3. **Specify quantity** to reallocate
4. **Validate business rules** and priorities
5. **Execute transfer** between allocations
6. **Update both customers** if needed

**Example reallocation:**
```
Source Allocation: ALLOC-2025-0145 (Standard Customer)
- Allocated: 50 units Safety Valve SV-200

Target Allocation: ALLOC-2025-0167 (VIP Customer)
- Open: 25 units Safety Valve SV-200

Reallocation: Move 25 units from standard to VIP customer

Result:
- ALLOC-2025-0145: 25 units allocated (reduced)
- ALLOC-2025-0167: 25 units allocated (fulfilled)

Business Impact:
- VIP customer can ship immediately
- Standard customer ships partial, waits for more inventory
- Both customers notified of status changes
```

**Reallocation rules:**
- Cannot violate conservation law
- Must respect priority hierarchies
- Requires appropriate permissions
- Maintains complete audit trail
- May trigger customer notifications

---

## Bringing It All Together: A Day in the Life

Let me show you how allocations work in practice across different scenarios and business situations.

**Monday, 7:30 AM — Sarah, Customer Service Manager**

Sarah starts her day by reviewing allocation status and addressing any urgent customer needs.

**Morning Allocation Review:**

Sarah checks the allocation dashboard:
- 47 active allocations
- 12 ready to ship
- 8 waiting for purchase order receipts
- 3 requiring priority review
- 2 emergency orders from weekend

**Emergency Order 1: Production Line Down**
```
Customer: Metro Manufacturing
Product: Control Module CM-500
Quantity Needed: 5 units
Situation: Production line stopped, $75K/hour impact
Current Allocation: ALLOC-2025-0201 (Medium priority)
```

Sarah reviews available inventory:
```
Control Module CM-500 Inventory:
- On Hand: 8 units
- Allocated to other orders: 6 units
- Available: 2 units
- On Order: 15 units (arriving tomorrow)
```

Sarah creates priority override:
```
Override Request: ALLOC-2025-0201
New Priority: Emergency (10,000 points)
Justification: Production line down, critical customer impact
Business Impact: $75K/hour production loss

Reallocation Impact:
- Reallocate 3 units from ALLOC-2025-0189 (standard customer)
- Total available for emergency: 5 units
- Emergency order can ship today
- Standard customer ships partial, balance tomorrow
```

**Monday, 9:00 AM — Tom, Purchasing Coordinator**

Tom reviews allocations to prioritize purchase order receipts and plan new orders.

**Purchase Order Priority Review:**

Tom checks which POs support waiting allocations:
```
PO-2025-0067: Safety Valves SV-200 (50 units, arriving today)
Linked Allocations:
- ALLOC-2025-0178: 25 units (VIP customer, due Jan 30)
- ALLOC-2025-0182: 15 units (Standard customer, due Feb 5)
- ALLOC-2025-0185: 10 units (Standard customer, due Feb 10)

Priority: Process VIP customer first, then FIFO for standard
```

**New Purchase Order Creation:**

Tom identifies allocations needing purchase orders:
```
Open Quantities Needing POs:
- Pressure Sensors PS-100: 75 units across 3 allocations
- Control Modules CM-500: 40 units across 2 allocations
- Safety Valves SV-200: 30 units across 4 allocations

Consolidation Opportunity:
- Combine similar products from same supplier
- Negotiate better pricing for larger quantities
- Coordinate delivery dates with allocation requirements
```

Tom creates consolidated purchase order:
```
PO-2025-0089: ABC Supplier
Line 1: Pressure Sensors PS-100, 75 units, delivery Jan 28
Line 2: Control Modules CM-500, 40 units, delivery Jan 30
Line 3: Safety Valves SV-200, 30 units, delivery Feb 2

Linked Allocations: 9 allocations automatically linked
Expected Impact: All linked allocations move from "open" to "on order"
Customer Notifications: Delivery date confirmations sent
```

**Monday, 11:30 AM — Lisa, Warehouse Supervisor**

Lisa receives the safety valve shipment and processes it against waiting allocations.

**Purchase Order Receipt Processing:**

The safety valve shipment arrives:
```
PO-2025-0067 Receipt: Safety Valves SV-200
Ordered: 50 units
Received: 50 units
Condition: All units in good condition
Location: Main Warehouse, Receiving Area
```

Lisa processes auto-allocation:
```
Auto-Allocation Results:
ALLOC-2025-0178 (VIP): 25 units allocated (priority 1)
ALLOC-2025-0182 (Standard): 15 units allocated (priority 2)
ALLOC-2025-0185 (Standard): 10 units allocated (priority 3)

State Changes:
- On Order: -50 units
- Allocated: +50 units
- All linked allocations now ready to ship

Customer Notifications:
- VIP customer: Ready to ship, can deliver tomorrow
- Standard customers: Ready to ship, normal delivery schedule
```

**Monday, 1:00 PM — Mike, Shipping Coordinator**

Mike processes shipments based on allocation priorities and customer requirements.

**Priority Shipping Queue:**

Mike reviews ready-to-ship allocations:
```
Shipping Priority Queue:
1. ALLOC-2025-0201: Emergency (Control Modules, 5 units)
2. ALLOC-2025-0178: VIP (Safety Valves, 25 units)
3. ALLOC-2025-0182: Standard (Safety Valves, 15 units)
4. ALLOC-2025-0189: Standard (Control Modules, 3 units - partial)
5. ALLOC-2025-0185: Standard (Safety Valves, 10 units)
```

**Emergency Shipment Processing:**
```
Allocation: ALLOC-2025-0201
Customer: Metro Manufacturing
Product: Control Module CM-500
Quantity: 5 units
Service: Next Day Air (emergency)
Tracking: 1Z999AA10123456789

State Changes:
- Allocated: -5 units
- In Transit: +5 units
- Status: Emergency shipment dispatched

Customer Communication:
- Tracking number provided
- Expected delivery: Tomorrow by 10:30 AM
- Production line restoration timeline confirmed
```

**Monday, 3:30 PM — Jennifer, Customer Service Representative**

Jennifer handles customer inquiries about allocation status and delivery timelines.

**Customer Inquiry: Delivery Status**

Customer call: "Hi, this is ABC Construction. Can you tell me the status of our pressure sensor order?"

Jennifer checks allocation:
```
Customer: ABC Construction
Order: SO-2025-1267
Allocation: ALLOC-2025-0195
Product: Pressure Sensor PS-100
Requested: 40 units

Current Status:
- Allocated: 0 units
- On Order: 40 units (PO-2025-0089)
- Expected Receipt: January 28
- Expected Ship: January 29
- Expected Delivery: January 31
```

Jennifer's response: "Your pressure sensors are on order from our supplier and expected to arrive January 28th. We'll ship them the next day for delivery by January 31st. I'll send you a confirmation email with the tracking number as soon as they ship."

**Customer Inquiry: Partial Shipment**

Customer call: "We need 20 units of safety valves urgently. Can you ship what you have and send the rest later?"

Jennifer checks allocation:
```
Customer: Regional Services
Allocation: ALLOC-2025-0203
Product: Safety Valve SV-200
Requested: 50 units
Allocated: 30 units (available now)
Open: 20 units (need to source)

Partial Shipment Options:
- Ship 30 units today
- Remaining 20 units when available (estimated Feb 5)
- Customer saves on shipping costs
- Maintains order integrity
```

Jennifer coordinates partial shipment:
```
Partial Release: 30 units for immediate shipment
Remaining Allocation: 20 units (create new PO)
Customer Approval: Confirmed for split shipment
Shipping: 30 units ship today, 20 units ship Feb 5
Communication: Both tracking numbers provided
```

**Monday, 5:00 PM — Daily Allocation Review**

The team reviews the day's allocation activity and performance.

**Daily Metrics:**
```
Allocation Performance:
- New allocations created: 8
- Allocations fulfilled: 12
- Emergency orders processed: 1
- Priority overrides: 1
- Reallocations: 2

Inventory Impact:
- Units allocated: 247
- Units shipped: 156
- Units received: 50
- Available inventory: +91 units

Customer Service:
- Emergency response time: 2 hours (target: <4 hours)
- VIP fulfillment rate: 100%
- Standard fulfillment rate: 87%
- Customer satisfaction: 4.8/5.0

Purchase Order Integration:
- POs linked to allocations: 3
- Auto-allocation success rate: 100%
- Delivery date accuracy: 95%
```

**Process Improvements Identified:**
- Emergency override process worked well
- Auto-allocation from receipts improved efficiency
- Partial shipment options increased customer satisfaction
- Priority queue management maintained fairness

**End of Day Results:**

The allocation system successfully managed diverse customer needs while maintaining operational efficiency:

**Emergency Response:** Critical customer issue resolved within 2 hours through priority override and reallocation

**Inventory Optimization:** Auto-allocation from receipts ensured efficient inventory utilization and customer satisfaction

**Customer Service:** Proactive communication and flexible fulfillment options maintained high satisfaction scores

**Operational Efficiency:** Systematic priority management and automated processes reduced manual work while improving accuracy

**Financial Control:** Complete tracking of committed inventory supported accurate financial reporting and cash flow management

Each allocation served its purpose while maintaining the conservation law and providing complete visibility into the fulfillment process from order to delivery.

---

## Common Questions & Troubleshooting

### "What's the difference between allocated and available inventory?"

**Allocated inventory** is physically on hand but reserved for specific orders. **Available inventory** is on hand and not yet committed to any order.

Think of it this way: If you have 100 units on hand and 60 are allocated to orders, then 40 units are available for new orders.

### "Can I allocate more inventory than I have on hand?"

No, you cannot allocate more physical inventory than you have available. However, you can create allocations for quantities you expect to receive through purchase orders.

The system tracks these as "on order" quantities, which become "allocated" when the purchase orders are received.

### "What happens when I receive inventory that's linked to allocations?"

When you receive inventory linked to allocations:
1. **On order quantities** decrease by the received amount
2. **Allocated quantities** increase by the received amount
3. **Linked allocations** automatically update their status
4. **Customers are notified** that their orders are ready to ship

This process is usually automatic but can be controlled manually if needed.

### "How do priority overrides work?"

Priority overrides allow managers to change allocation priorities for special circumstances:

1. **Request override** with business justification
2. **Manager approval** if required by policy
3. **System resequences** all allocations by priority
4. **Inventory may reallocate** to higher priority orders
5. **Audit trail** records the override decision

Emergency situations typically get the highest priority.

### "Can I split an allocation between multiple shipments?"

Yes, allocations support partial fulfillment:

- **Ship what's available** immediately
- **Keep allocation open** for remaining quantity
- **Track multiple shipments** against one allocation
- **Customer sees progress** through partial deliveries

This is especially useful when inventory arrives in multiple receipts.

### "What if a customer cancels their order?"

When a customer cancels:

1. **Cancel the allocation** to free reserved inventory
2. **Release inventory** back to available stock
3. **Cancel linked purchase orders** if appropriate
4. **Reallocate inventory** to other waiting orders
5. **Update financial records** for cancelled commitments

The system maintains a complete audit trail of the cancellation.

### "How do I handle emergency orders when inventory is already allocated?"

For emergency orders:

1. **Create priority override** with emergency status
2. **System identifies** lower priority allocations with needed inventory
3. **Manager approves** reallocation if required
4. **Inventory moves** from standard to emergency allocation
5. **Both customers notified** of status changes

Emergency orders typically override standard priorities.

### "What's the conservation law and why does it matter?"

The conservation law states that:
`Requested = Open + On Order + Allocated + In Transit + Delivered`

This ensures that:
- Every unit is accounted for in exactly one state
- Total quantities always balance
- No inventory is lost or double-counted
- System integrity is maintained

If this equation doesn't balance, there's a system error that needs investigation.

### "Can I see the history of allocation changes?"

Yes, the system maintains complete audit trails showing:
- **Who** made each change
- **When** the change occurred
- **What** was changed (quantities, priorities, etc.)
- **Why** the change was made (business reason)
- **Before and after** states

This supports compliance requirements and troubleshooting.

### "How do I know when to create purchase orders?"

Create purchase orders when allocations show "open" quantities:

- **Open quantities** represent unfulfilled customer demand
- **System can suggest** PO quantities based on open allocations
- **Link POs to allocations** for automatic processing
- **Prioritize POs** based on customer requirements and due dates

Many systems can automate PO creation for routine replenishment.

### "What if I receive less inventory than expected on a purchase order?"

When you receive partial quantities:

1. **Allocate what you received** to highest priority orders first
2. **Keep remaining allocations** in "on order" status
3. **Update delivery dates** based on supplier information
4. **Communicate delays** to affected customers
5. **Consider alternative sources** for critical orders

The system tracks partial receipts and maintains allocation priorities.

---

## Chapter Summary

Allocations are the foundation of reliable order fulfillment, transforming customer promises into systematic inventory reservations that provide visibility and control throughout the entire process.

**Key takeaways:**

**Allocations provide fulfillment visibility** — Complete tracking from order through delivery ensures nothing falls through the cracks and enables proactive customer communication.

**Conservation law ensures accuracy** — The fundamental equation that requested quantities always equal the sum of all states maintains system integrity and prevents inventory loss.

**Priority management enables fairness** — Systematic priority rules ensure VIP customers get preference while maintaining first-in-first-out fairness within priority levels.

**State progression reflects reality** — The progression from open through delivered mirrors the physical movement of inventory and provides accurate status at every stage.

**Purchase order integration optimizes procurement** — Linking customer demand to supplier orders enables better procurement decisions and accurate delivery promises.

**Partial fulfillment supports flexibility** — The ability to ship what's available while tracking remaining requirements balances customer service with operational efficiency.

**Reallocation handles changing priorities** — Moving inventory between allocations responds to emergency situations and changing business priorities while maintaining audit trails.

**Audit trails support compliance** — Complete documentation of all allocation changes supports financial compliance and provides forensic capability for investigations.

**Automation reduces manual work** — Auto-allocation from receipts and systematic priority management reduce manual intervention while improving accuracy.

**Customer communication builds trust** — Real-time allocation status enables proactive communication about delivery timelines and potential issues.

Allocations are more than just inventory reservations—they're the system that transforms customer orders into reliable delivery promises. When managed effectively, they become a competitive advantage that builds customer loyalty through consistent, reliable fulfillment.

The next chapter will show you how to create and manage pick lists that turn allocations into efficient warehouse operations. But remember that pick lists are only as good as the allocations that drive them. Master allocations, and you master the foundation of excellent customer service.

Your customers judge your reliability by how well you deliver on your promises. Make allocations a strength, and you create the foundation for customer loyalty and business growth.