---
outline: deep
chapter_source: Chapter_02_Allocations_and_Serial_Handling.md
---

# Chapter 2: Allocations and Serial Handling

**Contract Reference:** `operations/allocations/paths/allocation-core.yaml`

## The Promise System for Your Inventory

Imagine you're running a service company and a customer calls with an urgent repair. They need a specific part—a $2,000 control module—and they need it tomorrow. You check your system: you have one in stock. You tell the customer "yes, we'll have it ready." But what happens if another customer calls an hour later asking for the same part?

Without allocations, you might accidentally promise the same part to both customers. One of them will be disappointed, and you'll scramble to find another part or delay a job. With allocations, the moment you promise that part to the first customer, it's reserved. The system knows it's spoken for, even though it's still sitting on your shelf.

That's what allocations do—they're promises backed by real inventory. They bridge the gap between "we have it" and "it's yours," creating accountability and preventing the chaos of double-booking your most critical items.

But allocations become even more powerful when you add serial number tracking. Now you're not just promising "a control module"—you're promising "control module SN-2025-5001," and you can track that exact unit from reservation through delivery. Every step is documented, every movement is traceable, and every promise is kept.

---

## Understanding the Allocation Lifecycle

Every allocation follows a journey from initial request to final delivery. Understanding this lifecycle helps you know what's happening at each stage and what actions you can take.

**The allocation states:**

**Open** — The request exists but no inventory is reserved yet. Think of this as "we need it, but we haven't found it yet." The system is looking for available inventory to fulfill the request. Items in this state don't reduce your available inventory count because nothing is actually reserved.

**On Order** — The item is on a purchase order but hasn't arrived yet. You've committed to getting it, but it's not in your warehouse. This state helps you track what's coming to fulfill future needs. The system knows you've ordered it, but customers can't pick it up yet.

**Allocated** — Inventory is reserved and ready for fulfillment. This is the core state—real inventory is set aside for this specific request. The items are still in your warehouse, but they're earmarked for this allocation. Your available inventory count drops by the allocated amount.

**With Technician** — For field service operations, the items have been checked out to a technician's vehicle. The inventory is mobile and assigned to a specific person. You know exactly who has what, and the technician can use these items for customer jobs.

**In Transit** — Items are shipped and on their way to the customer. They've left your facility but haven't been delivered yet. This state helps track timing and manage customer expectations about delivery.

**Delivered** — The allocation is complete. Items have reached the customer and the promise is fulfilled. The allocation lifecycle ends here, and the inventory is no longer yours to track.

**Cancelled** — The allocation was terminated before completion. The inventory (if any was reserved) returns to available stock. This happens when orders are cancelled, requirements change, or allocations expire.

**Understanding state transitions:**

Not every allocation goes through every state. A simple warehouse-to-customer shipment might go: Open → Allocated → In Transit → Delivered. A field service job might go: Open → Allocated → With Technician → Delivered. An emergency order might go: Open → On Order → Allocated → Delivered.

The system enforces valid transitions. You can't go from Open directly to Delivered—the inventory has to be allocated first. You can't go from Cancelled back to Allocated without creating a new allocation. These rules prevent data corruption and ensure audit trails make sense.

---

## Creating Your First Allocation

Let's walk through creating an allocation step by step.

**To create an allocation:**

1. **Identify the product** — Use the product ID or SKU. The system needs to know exactly what you're allocating. If you're working with serialized items, the system will track individual units. For bulk items, it tracks quantities.

2. **Specify the quantity** — How many units do you need? For serialized products, this must be a whole number (you can't allocate 2.5 control modules). For bulk products, you can use decimals if your unit of measure supports it.

3. **Set the source document** — What's driving this allocation? A sales order, work order, transfer request, or internal project? This creates the audit trail that explains why the allocation exists. Include both the document type and the specific document ID.

4. **Choose priority strategy** — This determines how urgent the allocation is:

   **High Priority** — Critical orders, emergency repairs, VIP customers. These allocations get first access to available inventory and jump ahead in fulfillment queues. Use sparingly—if everything is high priority, nothing is.

   **Medium Priority** — Standard business operations, regular customers, normal delivery timelines. This is your default for most allocations. The system processes these in first-come, first-served order within the priority level.

   **Low Priority** — Internal projects, stock transfers, non-urgent requests. These wait until higher priorities are satisfied. Good for internal needs that can be flexible on timing.

   **Decision guide:** Emergency or contractual obligation → High. Normal business → Medium. Internal or flexible → Low. When in doubt, use Medium and adjust later if needed.

5. **Set timing requirements** — When do you need this?

   **Requested at** — When the request was made. Usually "now" but might be backdated if you're entering historical data.

   **Required by** — The deadline. This helps the system prioritize and alerts you to potential delays. Be realistic—padding deadlines reduces urgency signals that help with planning.

6. **Configure fulfillment options:**

   **Partial fulfillment allowed** — Can you ship part of the order if the full quantity isn't available? For most orders, yes. For kits or matched sets, no. If you allow partials, the system can fulfill what's available immediately and backorder the rest.

   **Allow non-stock allocation** — Can you allocate items that aren't currently in stock? This creates a commitment to fulfill when inventory arrives. Useful for pre-orders or when you're confident about incoming shipments.

7. **Add notes and context** — Include any special instructions, customer requirements, or internal notes. This information travels with the allocation and helps fulfillment teams understand the context.

**Example allocation creation:**

```
Product: Control Module CM-2500 (Product ID: 50001)
Quantity: 2 units
Source: Sales Order SO-2025-0892
Priority: High (customer contract requirement)
Required by: Tomorrow 2 PM
Partial fulfillment: Not allowed (customer needs both units)
Notes: "Customer site visit scheduled, both units needed for redundancy"
```

**What happens when you create the allocation:**

The system immediately checks available inventory. If you have enough in stock, it moves to "Allocated" status and reserves the inventory. If you don't have enough, it goes to "Open" status and waits for inventory to arrive. If you enabled non-stock allocation, it creates the allocation anyway and flags it for procurement attention.

For serialized products, the system selects specific serial numbers using your organization's allocation strategy (usually FIFO—first in, first out). You'll see exactly which serial numbers are reserved for this allocation.

---

## Serial Number Handling in Allocations

Serial numbers transform allocations from quantity promises to specific unit commitments. Instead of promising "a pump," you're promising "pump SN-2025-3001." This precision enables complete traceability and accountability.

**How serial numbers work with allocations:**

**At allocation creation** — If the product requires serial tracking, the system automatically selects specific serial numbers from available inventory. You can see exactly which units are reserved. The selection follows your organization's strategy (typically FIFO, but could be LIFO or specific selection rules).

**During reservation** — Each serial number is locked to the allocation. Other allocations can't claim these specific units. The serial numbers appear in the allocation details, and you can track their status throughout the fulfillment process.

**Through fulfillment** — As items move through picking, shipping, and delivery, the serial numbers travel with them. Every transaction references the specific units involved. If there's a problem with one unit, you know exactly which allocation it affects.

**Serial number validation rules:**

**Count matching** — The number of serial numbers must exactly equal the allocated quantity. If you allocate 3 units, you must have exactly 3 serial numbers. The system enforces this automatically and rejects mismatched requests.

**Uniqueness** — Each serial number can only be allocated to one request at a time. The system prevents double-allocation of the same unit. If you try to allocate a serial that's already reserved, you'll get an error.

**Product matching** — Serial numbers must belong to the correct product. You can't accidentally allocate a pump serial number to a valve allocation. The system validates product compatibility.

**Status validation** — Only available serial numbers can be allocated. Units that are damaged, quarantined, or already allocated are excluded from selection. The system only chooses from the pool of available, good units.

**Viewing serial numbers in allocations:**

When you open an allocation for a serialized product, you'll see:
- **Reserved serials** — Which specific units are allocated
- **Serial status** — Current state of each unit (allocated, picked, shipped, delivered)
- **Serial history** — Movement and status changes for each unit
- **Location tracking** — Where each serial number is currently located

**Example serial allocation:**

```
Allocation: ALLOC-2025-0123
Product: Industrial Pump IP-5000
Quantity: 2 units
Reserved Serials:
  - SN-2025-3001 (Status: Allocated, Location: Bin A-47)
  - SN-2025-3002 (Status: Allocated, Location: Bin A-47)
```

**Serial number substitution:**

Sometimes you need to swap one serial number for another within an allocation. Maybe a unit fails quality inspection, or a customer requests a specific serial number. The system supports serial substitution while maintaining audit trails.

**To substitute a serial number:**

1. Open the allocation
2. Go to "Serial Management"
3. Select the serial to replace
4. Choose a replacement from available inventory
5. Add a reason for the substitution
6. Confirm the change

The system updates the allocation, releases the old serial back to available inventory, and reserves the new serial. All changes are logged for audit purposes.

**Serial number releases:**

When you release part of an allocation (partial shipment), you specify exactly which serial numbers are being released. This maintains precise tracking—you know which units went to the customer and which are still reserved.

**Bulk serial operations:**

For large allocations with many serial numbers, the system provides bulk operations:
- **Bulk selection** — Choose multiple serials at once using filters or ranges
- **Bulk substitution** — Replace multiple serials with new ones
- **Bulk release** — Ship multiple units in a single operation

These operations maintain the same validation rules but reduce the administrative overhead for large orders.

---

## Managing Allocation Priority

Priority determines which allocations get fulfilled first when inventory is limited. Understanding and managing priority effectively prevents conflicts and ensures your most important commitments are met.

**Priority strategies:**

**High Priority (850-1000 points)** — Reserved for critical situations:
- Emergency repairs that prevent customer downtime
- Contractual obligations with penalties
- VIP customer orders
- Safety-critical items

**Medium Priority (400-600 points)** — Standard business operations:
- Regular customer orders
- Scheduled maintenance
- Normal delivery timelines
- Most day-to-day allocations

**Low Priority (100-300 points)** — Flexible requirements:
- Internal projects
- Stock transfers
- Non-urgent requests
- Training or demonstration items

**Numeric priority within strategies:**

Within each strategy, you can set specific numeric priorities. Higher numbers get fulfilled first. For example, within "High Priority," an allocation with priority 900 gets fulfilled before one with priority 850.

**Priority tiebreakers:**

When allocations have the same priority, the system uses first-come, first-served (FIFO) based on the allocation creation time. Earlier allocations get fulfilled first. This prevents gaming the system and ensures fairness.

**Setting allocation priority:**

When creating an allocation:

1. Choose the priority strategy (High/Medium/Low)
2. Optionally set a specific numeric priority within that range
3. Add justification for high-priority allocations
4. The system assigns a priority sequence number for tiebreaking

**Priority overrides:**

Sometimes you need to change an allocation's priority after creation. This requires special permissions and creates an audit trail.

**To request a priority override:**

1. Open the allocation
2. Click "Request Priority Override"
3. Set the new priority level
4. Provide justification — why does this need higher priority?
5. Add supporting documentation if required
6. Submit for approval

**What happens during override approval:**

The system routes the request to managers with override authority. They can see:
- Current priority and requested priority
- Justification and supporting documentation
- Impact on other allocations (what gets delayed)
- Approval history for this allocation

Approved overrides take effect immediately. The allocation jumps to its new priority position and may trigger immediate fulfillment if inventory is available.

**Dual control for high-value overrides:**

For high-value or high-priority overrides, the system may require dual control—two different people must approve the change. This prevents abuse and ensures oversight for critical decisions.

**Priority conflict resolution:**

When multiple high-priority allocations compete for limited inventory, the system provides tools to resolve conflicts:

**Priority comparison view** — See all competing allocations side by side with their priorities, justifications, and deadlines.

**Impact analysis** — Understand what happens if you fulfill one allocation versus another. Which customers are affected? What are the downstream consequences?

**Alternative sourcing** — Check if other locations, suppliers, or substitute products can resolve the conflict without choosing winners and losers.

**Escalation workflows** — Route difficult priority decisions to senior management with full context and recommendations.

**Automatic priority adjustments:**

The system can automatically adjust priorities based on rules you configure:

**Aging escalation** — Allocations get higher priority as their deadlines approach. An allocation due tomorrow automatically gets higher priority than one due next week.

**Customer tier adjustments** — VIP customers automatically get higher priority than standard customers, even for similar orders.

**Contract obligation enforcement** — Allocations linked to contracts with penalties automatically get elevated priority to avoid financial exposure.

**Backorder escalation** — Allocations that have been waiting longest for inventory get priority when stock arrives.

---

## Releasing Allocations

Releasing an allocation moves reserved inventory to the customer, completing the promise you made when you created the allocation. Releases can be full (everything at once) or partial (some now, some later).

**Understanding release types:**

**Full release** — The entire allocated quantity is shipped or delivered in one transaction. This is the simplest case—the allocation moves from "Allocated" to "Delivered" and the promise is complete.

**Partial release** — Some of the allocated quantity is shipped, leaving the rest still allocated. This happens when you can't fulfill the complete order immediately but want to ship what's available. The allocation stays active for the remaining quantity.

**Progressive release** — Multiple partial releases over time until the allocation is complete. Common for large orders, phased projects, or when inventory arrives in batches.

**To release an allocation:**

1. **Open the allocation** — Find the allocation you want to release
2. **Choose release type** — Full or partial
3. **Specify quantity** — How much are you releasing now?
4. **Select serial numbers** — For serialized products, choose exactly which units are being released
5. **Set release reason** — Why is this being released? (shipment, delivery, transfer to technician, etc.)
6. **Add shipping details** — Tracking numbers, carrier information, delivery address
7. **Confirm the release**

**What happens during release:**

The system creates a transaction record documenting the movement. For serialized products, it updates the status of each specific unit. The allocation quantity is reduced by the released amount. If it's a full release, the allocation status changes to "Delivered." If it's partial, the allocation remains active for the remaining quantity.

**Release validation:**

The system enforces several rules during release:

**Quantity limits** — You can't release more than is allocated. If you allocated 5 units, you can't release 6.

**Serial number validation** — For serialized products, you can only release serial numbers that are actually allocated to this request. You can't accidentally release someone else's inventory.

**Status requirements** — You can only release from certain allocation states. You can't release from "Open" (nothing is reserved yet) or "Cancelled" (the allocation is terminated).

**Location verification** — The system may require confirmation that the items are actually available at the expected location before allowing release.

**Partial release strategies:**

When you can't fulfill a complete allocation immediately, you have several options:

**Ship available, backorder rest** — Release what you have now and leave the allocation open for the remaining quantity. The customer gets partial value immediately, and you fulfill the rest when inventory arrives.

**Hold until complete** — Don't release anything until you can fulfill the entire allocation. This ensures the customer gets everything at once but may delay delivery.

**Split allocation** — Break the original allocation into multiple smaller allocations that can be fulfilled independently. This gives you more flexibility in fulfillment timing and sourcing.

**Customer communication during releases:**

The system can automatically notify customers when releases occur:

**Shipment notifications** — "Your order has shipped" with tracking information
**Partial shipment alerts** — "Part of your order has shipped, the rest is coming soon"
**Delivery confirmations** — "Your order has been delivered"
**Backorder updates** — "The remaining items are expected to ship on [date]"

**Release documentation:**

Every release creates documentation for audit and customer service:

**Release record** — What was released, when, by whom, and why
**Shipping documentation** — Bills of lading, packing slips, tracking numbers
**Serial number tracking** — Which specific units went to which customer
**Delivery confirmation** — Proof that items reached their destination

**Handling release errors:**

Sometimes releases need to be corrected or reversed:

**Incorrect quantity** — If you released the wrong amount, you can create an adjustment transaction to correct the allocation
**Wrong serial numbers** — If you released the wrong units, you can reverse the release and create a new one with the correct serials
**Shipping errors** — If items were shipped to the wrong address, you can track the shipment and coordinate recovery

**Release performance tracking:**

The system tracks metrics to help you improve release processes:

**Release cycle time** — How long from allocation to release?
**Partial release frequency** — How often do you need multiple releases?
**Release accuracy** — How often do releases need correction?
**Customer satisfaction** — How do customers rate your fulfillment performance?

---

## Reallocating Inventory

Sometimes you need to move inventory from one allocation to another. Maybe a higher-priority order came in, or a customer changed their requirements. Reallocation lets you redistribute reserved inventory while maintaining complete audit trails.

**When to reallocate:**

**Priority changes** — A more urgent order needs inventory that's allocated to a less critical request
**Customer changes** — A customer modifies their order, and you need to adjust allocations accordingly
**Inventory optimization** — You can fulfill multiple small orders by reallocating from one large order
**Supply chain disruptions** — Delays force you to redistribute inventory to meet the most critical deadlines

**Understanding reallocation rules:**

**Conservation law** — The total amount of inventory doesn't change, it just moves between allocations. If you reallocate 3 units from Allocation A to Allocation B, Allocation A decreases by 3 and Allocation B increases by 3.

**Serial number continuity** — For serialized products, specific units move between allocations. Serial numbers maintain their identity and history throughout the reallocation.

**Traceability preservation** — All movements are documented. You can trace any serial number's complete journey, including any reallocations.

**Authorization requirements** — Reallocations often require approval, especially when they affect customer commitments or high-priority orders.

**To reallocate inventory:**

1. **Identify source and target allocations** — Which allocation is giving up inventory, and which is receiving it?
2. **Specify quantities** — How much inventory is moving?
3. **Select serial numbers** — For serialized products, choose exactly which units are being reallocated
4. **Provide justification** — Why is this reallocation necessary?
5. **Check impact** — Review how this affects both allocations and their associated customers
6. **Get approvals** — Obtain any required authorizations
7. **Execute the reallocation**

**Reallocation validation:**

The system enforces strict rules to prevent errors:

**Sufficient inventory** — The source allocation must have enough inventory to give up the requested amount
**Compatible products** — You can only reallocate between allocations for the same product
**Valid serial numbers** — For serialized products, the serial numbers must actually be allocated to the source allocation
**State compatibility** — Both allocations must be in states that allow reallocation (you can't reallocate from a delivered allocation)

**Impact analysis before reallocation:**

Before executing a reallocation, the system shows you the consequences:

**Source allocation impact** — How will reducing this allocation affect the customer? Will it delay delivery? Create a backorder?
**Target allocation impact** — How will increasing this allocation help? Will it enable immediate fulfillment?
**Customer notifications** — Which customers need to be informed about changes to their orders?
**Downstream effects** — How does this affect pick lists, shipments, or technician assignments?

**Approval workflows for reallocations:**

Reallocations often require approval because they affect customer commitments:

**Manager approval** — For routine reallocations within normal business operations
**Customer service approval** — When reallocations affect customer delivery dates
**Executive approval** — For high-value reallocations or those affecting VIP customers
**Dual control** — For reallocations that could have significant business impact

**Bulk reallocation operations:**

For complex scenarios involving multiple allocations, the system supports bulk operations:

**Multi-source reallocation** — Take inventory from several allocations to fulfill one high-priority request
**Multi-target reallocation** — Distribute inventory from one large allocation to several smaller ones
**Optimization reallocation** — Automatically redistribute inventory to minimize backorders or maximize customer satisfaction

**Reallocation audit trails:**

Every reallocation creates comprehensive documentation:

**Reallocation record** — What moved, when, why, and who authorized it
**Before and after snapshots** — The state of both allocations before and after the change
**Serial number tracking** — For serialized products, the complete movement history of each unit
**Approval documentation** — Who approved the reallocation and their justification

**Handling reallocation conflicts:**

Sometimes reallocations create conflicts that need resolution:

**Competing priorities** — Multiple high-priority allocations want the same inventory
**Customer contract conflicts** — Reallocations might violate delivery commitments
**Serial number constraints** — Specific serial numbers might be required for certain allocations

The system provides tools to resolve these conflicts:

**Priority comparison** — Side-by-side analysis of competing allocations
**Alternative sourcing** — Suggestions for other inventory sources
**Escalation workflows** — Route difficult decisions to appropriate authority levels
**Customer communication** — Templates for explaining changes to affected customers

---

## Canceling Allocations

Sometimes allocations need to be cancelled before fulfillment. Orders get cancelled, requirements change, or allocations expire. Proper cancellation returns inventory to available stock and maintains clean audit trails.

**Common reasons for cancellation:**

**Customer cancellation** — The customer no longer needs the items
**Order changes** — The customer modified their requirements, making the original allocation obsolete
**Allocation expiration** — The allocation passed its deadline without fulfillment
**Inventory issues** — The allocated items are damaged or unavailable
**Business decisions** — Internal projects are cancelled or postponed

**To cancel an allocation:**

1. **Open the allocation** — Find the allocation you want to cancel
2. **Check current status** — Ensure the allocation can be cancelled (you can't cancel delivered allocations)
3. **Select cancellation reason** — Choose from predefined reasons or add a custom explanation
4. **Review impact** — See what inventory will be returned to available stock
5. **Handle serial numbers** — For serialized products, confirm which units are being released
6. **Add notes** — Document any special circumstances or customer communication
7. **Confirm cancellation**

**What happens during cancellation:**

The allocation status changes to "Cancelled" and can't be modified further. Any reserved inventory returns to available stock immediately. For serialized products, the specific serial numbers become available for other allocations. The system creates a cancellation record for audit purposes.

**Cancellation validation:**

The system enforces rules about what can be cancelled:

**State restrictions** — You can cancel allocations in "Open," "On Order," or "Allocated" states. You can't cancel allocations that are "In Transit" or "Delivered" (those require different processes).

**Partial fulfillment handling** — If part of an allocation has already been released, you can only cancel the remaining portion. The delivered portion stays in "Delivered" status.

**Authorization requirements** — Some cancellations require approval, especially for high-value allocations or those affecting customer contracts.

**Serial number validation** — For serialized products, the system verifies that the serial numbers being released are actually allocated to this request.

**Automatic cancellation scenarios:**

The system can automatically cancel allocations under certain conditions:

**Expiration-based cancellation** — Allocations that pass their "required by" date without fulfillment can be automatically cancelled after a grace period.

**Inventory-based cancellation** — If allocated inventory is damaged or written off, the system can automatically cancel affected allocations.

**Customer-triggered cancellation** — Integration with order management systems can automatically cancel allocations when customers cancel orders.

**Contract-based cancellation** — Allocations linked to expired or terminated contracts can be automatically cancelled.

**Handling cancellation impact:**

Cancelling an allocation affects more than just inventory availability:

**Customer communication** — Customers need to be notified about cancelled orders and any refunds or credits due.

**Downstream processes** — Pick lists, shipments, and technician assignments may need to be updated.

**Financial impact** — Cancellations may affect revenue recognition, cost allocations, or customer billing.

**Inventory planning** — Returned inventory may trigger reallocation to other waiting requests.

**Cancellation vs. other actions:**

Sometimes what looks like a cancellation is actually a different action:

**Modification** — If the customer wants different quantities or products, modify the allocation instead of cancelling and recreating.

**Postponement** — If the customer wants to delay delivery, extend the allocation deadline instead of cancelling.

**Transfer** — If the customer wants items delivered to a different location, update the delivery address instead of cancelling.

**Reallocation** — If the inventory needs to go to a different customer, reallocate instead of cancelling and recreating.

**Cancellation reporting and analysis:**

Track cancellation patterns to improve operations:

**Cancellation rates** — What percentage of allocations get cancelled?
**Cancellation reasons** — Why are allocations being cancelled?
**Timing patterns** — When do cancellations typically occur?
**Customer patterns** — Which customers cancel most frequently?
**Product patterns** — Which products have high cancellation rates?

This analysis helps identify process improvements, customer communication issues, or product problems.

**Recovering from cancellation errors:**

If an allocation is cancelled by mistake:

**Immediate recreation** — Create a new allocation with the same parameters if inventory is still available
**Priority restoration** — Ensure the new allocation gets appropriate priority to maintain original delivery commitments
**Customer communication** — Explain the error and confirm that delivery timelines are maintained
**Process review** — Analyze why the error occurred and implement preventive measures

---

## Pick Lists and Picking

Pick lists transform allocations into actionable work instructions for warehouse staff. They tell workers exactly what to collect, where to find it, and how to prepare it for shipment.

**Understanding pick lists:**

A pick list is a document (physical or digital) that guides warehouse workers through collecting allocated inventory. It includes:
- What products to pick
- How many of each
- Where to find them (specific locations)
- Which allocations they fulfill
- Any special handling instructions

**Creating pick lists:**

Pick lists can be generated automatically or manually:

**Automatic generation** — The system creates pick lists based on rules you configure:
- Generate daily at 8 AM for all allocated orders
- Create immediately when high-priority allocations are ready
- Batch similar items together for efficient picking routes

**Manual generation** — Create pick lists on demand:
- For urgent orders that need immediate attention
- When you want to batch specific orders together
- For special handling situations

**To create a pick list:**

1. **Select allocations** — Choose which allocations to include (individual selections or filter-based)
2. **Set picking strategy** — How should items be organized? By location, by product, by allocation priority?
3. **Choose picker assignment** — Which worker or team will handle this pick list?
4. **Add special instructions** — Any handling requirements, quality checks, or customer notes
5. **Generate the list** — The system creates the pick list and assigns it to the chosen picker

**Pick list organization strategies:**

**Location-based picking** — Organize items by warehouse location to minimize travel time. Pick everything in Zone A, then Zone B, etc.

**Product-based picking** — Group similar products together. Pick all pumps, then all valves, then all fittings.

**Allocation-based picking** — Keep each customer's order together. Pick all items for Order 1, then all items for Order 2.

**Priority-based picking** — Pick high-priority allocations first, regardless of location or product type.

**Wave picking** — Batch multiple orders together and pick all items in one pass, then sort by customer later.

**Serial number handling in pick lists:**

For serialized products, pick lists include specific serial numbers:

**Exact unit identification** — The pick list shows "Pick pump SN-2025-3001 from Bin A-47," not just "pick a pump."

**Serial verification** — Pickers must scan or verify the exact serial number to confirm they have the right unit.

**Substitution handling** — If the specified serial isn't available, the system guides pickers through approved substitution procedures.

**Quality checks** — Pickers may need to inspect serialized items for damage or completeness before confirming the pick.

**Mobile picking with stock scan lookups:**

Modern picking uses mobile devices with barcode scanning:

**Location scanning** — Scan the location barcode to confirm you're in the right place
**Product scanning** — Scan the product barcode to verify you have the correct item
**Serial scanning** — For serialized products, scan the serial number to confirm the exact unit
**Quantity confirmation** — Enter or confirm the quantity picked

**Stock scan lookups** help when items aren't where expected:
- Scan any product barcode to see where it's located
- Find alternative locations with the same product
- Check if substitute products are available
- Verify allocation requirements and priorities

**Pick confirmation process:**

**To confirm picks:**

1. **Scan location** — Verify you're at the correct picking location
2. **Scan product** — Confirm you have the right item
3. **Scan serial** — For serialized products, verify the specific unit
4. **Confirm quantity** — Enter the amount picked (may be less than requested if inventory is short)
5. **Note any issues** — Damage, shortages, or other problems
6. **Complete the pick** — Mark this line item as complete

**Handling pick exceptions:**

**Item not found** — The pick list says it's in Bin A-47, but it's not there:
- Use stock scan lookup to find alternative locations
- Check if the item was moved or transferred
- Verify if it's allocated to another order
- Report the discrepancy for investigation

**Quantity shortage** — You need 5 units but only find 3:
- Pick what's available and note the shortage
- The system will create a backorder for the missing quantity
- Check alternative locations for additional inventory
- Consider substitute products if approved

**Damaged inventory** — The item is damaged or defective:
- Don't pick damaged items
- Report the damage for quality investigation
- Look for alternative units in good condition
- Update inventory records to reflect the damage

**Wrong serial number** — For serialized products, the specified serial isn't available:
- Check if it was moved to a different location
- Verify if it's allocated to another order
- Use approved substitution procedures if available
- Escalate to supervision if substitution isn't allowed

**Pick list completion:**

When all items on a pick list are processed:

**Review completeness** — Verify all line items are addressed (picked or noted as exceptions)
**Quality check** — Inspect picked items for damage or completeness
**Staging** — Move picked items to the appropriate staging area for packing and shipping
**Documentation** — Complete any required paperwork or digital records
**Exception reporting** — Report any shortages, damages, or other issues for follow-up

**Pick performance tracking:**

The system tracks picking metrics to improve efficiency:

**Pick rate** — How many items per hour are picked?
**Pick accuracy** — How often are the correct items and quantities picked?
**Travel time** — How much time is spent moving between locations?
**Exception rate** — How often do pickers encounter problems?

This data helps optimize warehouse layout, pick list organization, and training programs.

---

## Troubleshooting Common Allocation Issues

Even well-designed allocation systems encounter problems. Understanding common issues and their solutions helps you resolve problems quickly and prevent them from recurring.

### "Why can't I allocate this item?"

**Insufficient available inventory** — The most common issue. You're trying to allocate more than is available.

Check current inventory levels and existing allocations. Look for:
- Items allocated to other orders
- Inventory in quarantine or damaged status
- Items reserved for other purposes
- Inventory at locations you can't access

**Solution:** Wait for new inventory to arrive, reallocate from lower-priority orders, or use substitute products.

**Product not configured for allocation** — Some products may be marked as non-allocatable.

Check the product configuration. Items marked as "services," "non-stock," or "direct ship" may not support allocation.

**Solution:** Update product configuration if appropriate, or use different fulfillment methods for these items.

**Location restrictions** — The inventory exists but is in locations you can't allocate from.

Check if inventory is in:
- Quarantine locations (pending inspection)
- Frozen locations (locked for counting)
- Customer-owned locations (consignment inventory)
- Restricted access locations

**Solution:** Move inventory to allocatable locations, complete required inspections, or get access permissions.

**Serial number conflicts** — For serialized products, the specific units you need may not be available.

Check if the required serial numbers are:
- Already allocated to other orders
- In damaged or quarantined status
- Located in inaccessible areas
- Reserved for specific customers

**Solution:** Use different serial numbers, wait for the specific units to become available, or check if customer requirements are flexible.

### "Why did my allocation get cancelled automatically?"

**Expiration-based cancellation** — The allocation passed its deadline without fulfillment.

Check the allocation's "required by" date and your organization's auto-cancellation policies. Allocations may be automatically cancelled after a grace period.

**Solution:** Create a new allocation with updated timing, or configure longer grace periods if appropriate.

**Inventory write-off** — The allocated inventory was damaged or written off.

Check inventory transaction history for the allocated items. If inventory was adjusted to zero due to damage or loss, associated allocations are automatically cancelled.

**Solution:** Create new allocations for replacement inventory, or source items from alternative locations.

**System maintenance** — Allocations may be cancelled during system updates or data corrections.

Check system notifications and maintenance logs for any bulk operations that affected allocations.

**Solution:** Recreate cancelled allocations if they're still needed, and verify that system maintenance procedures include allocation preservation.

### "Why can't I release this allocation?"

**Invalid state transition** — You're trying to release from a state that doesn't allow it.

Check the allocation's current status. You can't release from:
- "Open" status (nothing is reserved yet)
- "Cancelled" status (the allocation is terminated)
- "Delivered" status (already complete)

**Solution:** Wait for the allocation to reach "Allocated" status, or check if it needs to be recreated.

**Insufficient allocated quantity** — You're trying to release more than is allocated.

Check the allocation breakdown to see how much is actually allocated versus requested. Some quantity may still be "Open" or "On Order."

**Solution:** Release only the allocated portion, or wait for more inventory to be allocated.

**Serial number mismatch** — For serialized products, you're trying to release serial numbers that aren't allocated to this request.

Verify that the serial numbers you're releasing are actually reserved for this allocation. Check for:
- Typos in serial number entry
- Serial numbers allocated to different orders
- Serial numbers that were substituted

**Solution:** Use the correct serial numbers, or perform serial substitution if needed.

**Location access restrictions** — You don't have permission to release from the allocated locations.

Check if the allocated inventory is in locations that require special permissions or are restricted to certain users.

**Solution:** Get appropriate permissions, or have authorized personnel perform the release.

### "Why are my serial numbers not tracking correctly?"

**Serial count mismatch** — The number of serial numbers doesn't match the allocated quantity.

The system requires exactly one serial number per unit for serialized products. If you allocate 3 units, you must have exactly 3 serial numbers.

**Solution:** Verify the correct quantity and ensure you have the right number of serial numbers. Check for missing or duplicate entries.

**Duplicate serial allocation** — The same serial number is allocated to multiple orders.

This shouldn't happen with proper system controls, but data corruption or manual errors can cause it.

**Solution:** Identify which allocation should have the serial number, release it from incorrect allocations, and verify data integrity.

**Serial status conflicts** — Serial numbers are in the wrong status for allocation.

Check if the serial numbers are:
- Already allocated to other orders
- In damaged or quarantined status
- Marked as unavailable or on hold

**Solution:** Use different serial numbers, resolve status issues, or wait for the units to become available.

**Product configuration issues** — The product isn't properly configured for serial tracking.

Verify that the product is marked as "serialized" and has proper serial tracking rules configured.

**Solution:** Update product configuration, or use non-serialized allocation methods if appropriate.

### "Why can't I change allocation priority?"

**Insufficient permissions** — Priority changes require special authorization.

Check if you have the "allocation priority override" permission. Priority changes are restricted to prevent abuse.

**Solution:** Request permission from your administrator, or have an authorized person make the change.

**Dual control requirements** — High-value priority changes require two-person approval.

For significant priority changes or high-value allocations, the system may require dual control approval.

**Solution:** Get the required approvals from two authorized individuals, or justify why dual control should be waived.

**Contract obligations** — The allocation is linked to a contract that restricts priority changes.

Some allocations are bound by contract terms that prevent priority manipulation.

**Solution:** Review contract terms, get customer approval for changes, or escalate to legal/management review.

**System locks** — The allocation may be locked for processing.

If the allocation is being picked, shipped, or otherwise processed, priority changes may be blocked.

**Solution:** Wait for processing to complete, or coordinate with warehouse staff to pause processing during the priority change.

### "Why is my reallocation failing?"

**Conservation law violations** — The reallocation would create or destroy inventory.

The total quantity across all allocations must remain constant. You can't reallocate more than exists or create inventory from nothing.

**Solution:** Verify quantities carefully, check for calculation errors, and ensure the reallocation balances correctly.

**Serial number traceability issues** — For serialized products, the reallocation breaks traceability rules.

Serial numbers must maintain continuous tracking. You can't reallocate serial numbers that are already in transit or delivered.

**Solution:** Use different serial numbers, wait for units to return to allocatable status, or check if traceability requirements can be relaxed.

**Cross-tenant violations** — You're trying to reallocate between different organizations or branches.

Multi-tenant systems prevent cross-tenant reallocations to maintain data isolation.

**Solution:** Verify that both allocations belong to the same organization/branch, or use proper inter-company transfer procedures.

**State compatibility issues** — The source or target allocation is in a state that doesn't allow reallocation.

You can't reallocate from delivered allocations or to cancelled allocations.

**Solution:** Check allocation states and ensure both are in compatible states for reallocation.

### Prevention strategies:

**Regular inventory audits** — Catch discrepancies before they affect allocations
**Proper training** — Ensure staff understand allocation rules and procedures
**System monitoring** — Set up alerts for allocation failures and exceptions
**Process documentation** — Maintain clear procedures for common scenarios
**Performance tracking** — Monitor allocation success rates and identify improvement opportunities

Most allocation issues stem from inventory discrepancies, configuration problems, or process violations. Regular monitoring and proper training prevent most problems before they impact customer service.

---

## Bringing It All Together: A Day in the Life

Let me show you how allocations and serial handling work together in real operational scenarios.

**Tuesday, 6:30 AM — Sarah, Service Dispatcher**

Sarah starts her day reviewing overnight service calls. A critical customer—a hospital—has a failed HVAC control unit. They need replacement part CM-5000 by 10 AM or their operating room will be down.

Sarah creates an allocation:
- Product: Control Module CM-5000
- Quantity: 1 unit
- Priority: High (critical infrastructure)
- Required by: 10 AM today
- Source: Emergency Service Order ESO-2025-0445

The system immediately allocates serial number SN-2025-7823 from Bin A-15. Sarah can see the exact unit that will go to the hospital, and she knows it's reserved exclusively for this emergency.

**Tuesday, 7:15 AM — Mike, Warehouse Picker**

Mike's mobile device shows a high-priority pick list with one item: "Pick Control Module CM-5000, Serial SN-2025-7823, from Bin A-15." He goes to Bin A-15, scans the location barcode, finds the unit, and scans its serial number. The system confirms it's the right unit and marks it as picked.

Mike moves the unit to the expedite staging area. The allocation status automatically updates to "Picked" and Sarah gets a notification that the part is ready for technician pickup.

**Tuesday, 7:45 AM — Tom, Field Technician**

Tom arrives at the warehouse to collect parts for his morning calls. His mobile device shows that Control Module SN-2025-7823 is staged for him. He scans the serial number to check it out to his service vehicle. The allocation status changes to "With Technician" and the hospital gets an automated notification: "Your emergency part is en route with technician Tom."

**Tuesday, 9:30 AM — Tom at Hospital Site**

Tom arrives at the hospital and installs Control Module SN-2025-7823. He scans the serial number one final time to confirm delivery and installation. The allocation status changes to "Delivered" and the hospital's work order is automatically updated with the installed part's serial number.

The complete audit trail shows: Reserved at 6:30 AM → Picked at 7:15 AM → With Technician at 7:45 AM → Delivered at 9:30 AM. Every step is documented with timestamps, locations, and responsible personnel.

**Tuesday, 10:00 AM — Lisa, Customer Service Manager**

A regular customer calls wanting to place a large order for 20 pumps, but they're flexible on timing. Lisa checks inventory and sees only 15 pumps available. She creates an allocation for 15 units with "partial fulfillment allowed" and sets the remaining 5 as "On Order" status.

The system automatically selects 15 specific serial numbers for immediate allocation and creates a backorder for 5 more units. The customer gets a notification: "15 pumps will ship today, 5 more will ship when our next delivery arrives on Friday."

**Tuesday, 11:30 AM — David, Procurement Manager**

David receives an urgent call from a VIP customer who needs a pump that's currently allocated to the regular customer's order. The VIP customer has a contract with penalty clauses for delays.

David uses the reallocation feature:
1. He identifies pump SN-2025-4501 from the regular customer's allocation
2. He creates a new high-priority allocation for the VIP customer
3. He reallocates SN-2025-4501 from the regular customer to the VIP customer
4. He adds justification: "Contract obligation with penalty clause"

The system requires manager approval for the reallocation because it affects an existing customer commitment. David's manager approves it within 10 minutes. The VIP customer gets their pump, and the regular customer's order is reduced by one unit (they still get 14 pumps today, 6 on Friday).

**Tuesday, 2:00 PM — Jennifer, Inventory Analyst**

Jennifer reviews allocation performance metrics. She notices that 15% of allocations required serial number substitutions last week—higher than normal. Drilling into the data, she finds that several serial numbers were damaged during handling but weren't updated in the system immediately.

She implements a process improvement: damaged items must be reported and updated in the system within 2 hours of discovery. This will prevent allocations of damaged inventory and reduce substitution rates.

**Tuesday, 3:30 PM — Mark, Warehouse Manager**

Mark gets an alert that Allocation ALLOC-2025-0892 is about to expire. It was created 10 days ago for a customer project, but the customer hasn't confirmed delivery timing. The allocation is holding up 3 expensive units that other customers need.

Mark contacts the customer and learns their project is delayed by 2 weeks. Rather than extending the allocation (which would continue blocking inventory), he cancels it and tells the customer to create a new allocation when they're ready. The 3 units immediately become available for other customers.

**Tuesday, 4:45 PM — Rachel, Quality Manager**

Rachel discovers that a batch of pumps has a potential quality issue. Serial numbers SN-2025-4200 through SN-2025-4220 need to be quarantined for inspection. She checks the system and finds that 8 of these units are currently allocated to various customers.

She uses the serial substitution feature to replace the questionable units with good inventory from the same product line. Each affected allocation gets updated with new serial numbers, and customers are notified that their orders will ship with different (but equivalent) units. The questionable units are moved to quarantine for inspection.

**End of day:**

The allocation system orchestrated complex inventory movements throughout the day:
- Emergency service was completed on time with full traceability
- Customer orders were fulfilled efficiently with clear communication
- Priority conflicts were resolved fairly with proper approvals
- Quality issues were handled without disrupting customer service
- Inventory was optimized to meet the most critical needs

Every movement was tracked, every decision was documented, and every promise was kept. The combination of allocations and serial tracking provided the visibility and control needed to manage a complex, dynamic inventory operation.

---

## Common Questions & Troubleshooting

### "What's the difference between an allocation and a reservation?"

**Allocations** are customer-facing promises—commitments to deliver specific quantities to specific customers by specific dates. They're linked to sales orders, work orders, or other customer requirements.

**Reservations** are the internal inventory locks that support allocations. One allocation might have multiple reservations (different locations, different serial numbers, different timing). Reservations are the mechanical implementation; allocations are the business commitment.

Think of it this way: the allocation is your promise to the customer ("we'll deliver 5 pumps by Friday"). The reservations are the specific inventory you've set aside to keep that promise ("2 pumps from Bin A-12, 3 pumps from Bin B-07").

### "Why do I see serial numbers in some allocations but not others?"

Serial numbers only appear for products that are configured for serial tracking. If a product doesn't require serial tracking (bulk items like screws, fluids, or consumables), allocations show quantities but not specific serial numbers.

Check the product configuration to see if serial tracking is enabled. For products that should have serial tracking but don't, you may need to update the product settings. For products that shouldn't have serial tracking, the absence of serial numbers is normal and expected.

### "Can I allocate more than I have in stock?"

It depends on your organization's configuration. If "allow non-stock allocation" is enabled, you can create allocations that exceed current inventory. These allocations go to "Open" status and wait for inventory to arrive.

This is useful for pre-orders, backorders, or when you're confident about incoming shipments. However, it creates commitments you can't immediately fulfill, so use it carefully and communicate timing clearly to customers.

### "Why did my allocation priority change automatically?"

The system may automatically adjust priorities based on rules you've configured:

- **Aging escalation** — Allocations get higher priority as deadlines approach
- **Contract enforcement** — Allocations linked to penalty contracts get elevated priority
- **Customer tier adjustments** — VIP customers automatically get higher priority
- **Backorder escalation** — Long-waiting allocations get priority when inventory arrives

Check your organization's automatic priority rules and the allocation's history to see what triggered the change.

### "What happens if I delete an allocation by mistake?"

You can't actually "delete" allocations—you can only cancel them. Cancelled allocations remain in the system for audit purposes but release their reserved inventory back to available stock.

If you cancelled an allocation by mistake, you can create a new one with the same parameters. However, you might not get the same serial numbers or locations if other allocations have claimed them in the meantime. Act quickly to minimize the impact.

### "How do I handle partial shipments with serial numbers?"

When you release part of a serialized allocation, specify exactly which serial numbers are being shipped. The system tracks which units went to the customer and which are still allocated.

For example, if you allocated serial numbers SN-001, SN-002, and SN-003, but only ship SN-001 and SN-002, the allocation shows:
- Released: SN-001, SN-002 (status: Delivered)
- Still allocated: SN-003 (status: Allocated)

The customer knows exactly which units they received, and you know exactly what's still coming.

### "Why can't I reallocate between different customers?"

Reallocations affect customer commitments, so they require careful consideration. The system may block reallocations that:
- Violate contract terms or delivery commitments
- Affect high-priority or VIP customers
- Cross organizational or branch boundaries
- Involve restricted or regulated products

For legitimate reallocations, get proper approvals and document the business justification. For routine inventory optimization, consider using different allocation strategies or improving demand forecasting.

### "How long do allocations stay in the system?"

Active allocations remain until they're delivered or cancelled. Completed allocations are retained for audit and reporting purposes according to your organization's data retention policies.

Allocations may be automatically cancelled if they:
- Pass their expiration date without fulfillment
- Are linked to cancelled orders or contracts
- Have their allocated inventory written off or damaged

Check your organization's allocation lifecycle policies for specific retention and expiration rules.

### "What's the best way to handle rush orders?"

For urgent orders:

1. **Create high-priority allocations** — Use "High" priority strategy with appropriate justification
2. **Enable immediate picking** — Generate pick lists immediately rather than waiting for batch processing
3. **Use expedited fulfillment** — Route to express shipping and handling processes
4. **Communicate clearly** — Ensure all stakeholders know about the urgency and timeline

Consider whether the rush order justifies reallocating from lower-priority allocations, but get proper approvals and customer communication before making changes.

### "How do I track allocation performance?"

The system provides several metrics:

- **Allocation fill rate** — Percentage of allocations fulfilled completely and on time
- **Cycle time** — Average time from allocation creation to delivery
- **Partial fulfillment rate** — How often allocations require multiple shipments
- **Cancellation rate** — Percentage of allocations cancelled before fulfillment
- **Priority override frequency** — How often priorities need to be changed

Use these metrics to identify process improvements, training needs, or system configuration changes.

### "What should I do if serial numbers don't match physical inventory?"

Serial number discrepancies indicate inventory accuracy problems that need immediate attention:

1. **Stop allocating the affected products** — Prevent further discrepancies
2. **Conduct a physical audit** — Count and verify all serial numbers for the product
3. **Reconcile system records** — Update the system to match physical reality
4. **Investigate root causes** — Why did the discrepancy occur?
5. **Implement preventive measures** — Improve processes to prevent recurrence

Serial number accuracy is critical for traceability and customer confidence. Address discrepancies quickly and thoroughly.

---

## Chapter Summary

Allocations transform inventory management from reactive to proactive, from "we'll see what we have" to "we've reserved exactly what you need." Combined with serial number tracking, they provide the precision and accountability that modern businesses require.

**Key takeaways:**

**Allocations are promises backed by inventory** — They create accountability and prevent double-booking of critical items. Every allocation represents a commitment that must be managed and fulfilled.

**Serial numbers provide unit-level precision** — Instead of promising "a pump," you're promising "pump SN-2025-3001." This enables complete traceability and quality accountability.

**Lifecycle management is critical** — Understanding allocation states (Open → Allocated → Delivered) helps you know what actions are possible and what's happening with each request.

**Priority management prevents conflicts** — When inventory is limited, clear priority rules ensure the most important commitments are met first. Use priority overrides judiciously and with proper approvals.

**Partial fulfillment maintains customer service** — Ship what you can when you can, rather than making customers wait for complete orders. Clear communication about partial shipments maintains trust.

**Reallocation provides flexibility** — When priorities change or conflicts arise, reallocation lets you redistribute inventory while maintaining audit trails and customer communication.

**Pick lists bridge digital and physical** — They translate allocation data into actionable work instructions for warehouse staff, ensuring the right items get to the right customers.

**Audit trails enable accountability** — Every allocation action is documented with who, what, when, and why. This supports quality investigations, customer service, and process improvement.

**Exception handling is part of the process** — Shortages, damages, and changes are normal. Having clear procedures for handling exceptions maintains service quality even when things don't go perfectly.

**Performance tracking drives improvement** — Monitor allocation metrics to identify bottlenecks, training needs, and process improvements. Use data to optimize your allocation strategies.

The allocation system is your inventory's promise-keeping mechanism. Master it, and you master the art of reliable customer service backed by precise inventory control. Every allocation is a commitment—make sure you have the tools and processes to keep every promise you make.