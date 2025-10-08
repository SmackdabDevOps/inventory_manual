---
outline: deep
chapter_source: Chapter_04_Transactions_Overview.md
---

# Chapter 4: Transactions Overview

**Contract Reference:** `operations/transactions/`

## The Heartbeat of Your Inventory

Imagine your inventory system as a living organism. Products are the body, locations are the organs, and units of measure are the language. But what makes it all come alive? What creates the pulse that keeps everything moving and changing? Transactions.

Every time inventory moves, changes, or transforms, a transaction records that moment in time. When a shipment arrives, when a customer order ships, when a technician takes parts to a job site, when you discover damaged goods—each of these events creates a transaction that becomes part of your inventory's permanent history.

But transactions are more than just records. They're the foundation of truth in your system. Every quantity you see, every cost calculation, every allocation decision—all of it flows from the transactions that came before. They're immutable, meaning once created, they can never be changed or deleted. This isn't a limitation; it's your guarantee that the story of your inventory is complete, accurate, and trustworthy.

Understanding transactions means understanding how your inventory really works. Not just the current state, but how it got that way and where it's going. Every successful inventory operation starts with mastering the transaction fundamentals.

---

## Understanding Transaction Types

Every transaction represents a real, physical change to your inventory. Understanding the different types helps you choose the right one for each situation and interpret what happened when you review transaction history.

**Receipt Transactions**

Receipt transactions record inventory physically arriving at a location. This is your "inventory coming in" transaction type.

**When to use:**
- Purchase orders arrive from suppliers
- Customer returns come back to your warehouse
- Production completes and outputs finished goods
- You find inventory that wasn't previously recorded
- Transfers arrive at their destination

**What happens:**
- Inventory quantity increases at the destination location
- New cost layers are created for financial tracking
- If linked to an allocation, it can automatically fulfill waiting orders
- The system updates available inventory calculations

**Example:** A supplier delivers 50 pumps to your warehouse. You create a receipt transaction for 50 units at the receiving dock location, referencing the purchase order that triggered the delivery.

**Issue Transactions**

Issue transactions record inventory physically leaving a location. This is your "inventory going out" transaction type.

**When to use:**
- Customer orders ship from your warehouse
- Production consumes raw materials
- You discover damaged or lost inventory
- Items are scrapped or disposed of
- Transfers leave their source location

**What happens:**
- Inventory quantity decreases at the source location
- Cost layers are consumed using your costing method (FIFO, LIFO, etc.)
- If linked to an allocation, it moves the allocation from "allocated" to "in transit"
- Available inventory calculations update immediately

**Example:** A customer order for 10 pumps ships from your warehouse. You create an issue transaction for -10 units (negative because inventory is leaving), referencing the sales order and allocation.

**Transfer Transactions**

Transfer transactions record inventory moving between locations within your organization. These are internal movements that don't involve external parties.

**When to use:**
- Moving inventory from receiving to storage
- Relocating items to different warehouse zones
- Staging inventory for shipping
- Moving items to quarantine for inspection
- Reorganizing warehouse layout

**What happens:**
- The system creates two transactions atomically: an issue from the source and a receipt at the destination
- Total inventory doesn't change, but location distribution does
- Cost layers move with the inventory (same cost, new location)
- Both transactions succeed or both fail—no partial transfers

**Example:** You need to move 25 pumps from bulk storage to the shipping staging area. The system creates an issue transaction (-25 from bulk storage) and a receipt transaction (+25 to staging) as a single atomic operation.

**Adjustment Transactions**

Adjustment transactions correct the system to match physical reality. These fix discrepancies between what the system thinks you have and what you actually have.

**When to use:**
- Cycle count reveals quantity differences
- You discover damaged goods not previously recorded
- Data entry errors need correction
- Inventory shrinkage or theft is discovered
- System errors created incorrect quantities

**What happens:**
- Inventory quantity increases (positive adjustment) or decreases (negative adjustment)
- Cost layers are created (positive) or consumed (negative)
- An audit trail documents the reason for the adjustment
- Depending on settings, approval may be required for large adjustments

**Example:** A cycle count shows you have 47 pumps in location A-15, but the system shows 50. You create an adjustment transaction for -3 units with the reason "cycle count variance."

**Tech Checkout Transactions**

Tech checkout transactions record inventory moving from your warehouse to a technician's vehicle for field service work.

**When to use:**
- Daily technician loadouts for service routes
- Emergency parts requests for urgent repairs
- Preparing inventory for advanced replacement programs
- Stocking service vehicles for specific jobs

**What happens:**
- Inventory decreases at the warehouse location
- Inventory increases at the technician's mobile location (service vehicle)
- If linked to allocations, status changes from "allocated" to "with technician"
- Chain of custody tracking begins for field service accountability

**Example:** Technician Sarah needs 5 control modules for today's service calls. You create a tech checkout transaction moving 5 units from warehouse bin A-20 to Sarah's service van.

**Tech Check-in Transactions**

Tech check-in transactions record technicians returning to the warehouse and reconciling their vehicle inventory.

**When to use:**
- End-of-day technician returns
- Returning unused parts to warehouse stock
- Processing defective parts found in the field
- Emergency restocking during the day

**What happens:**
- Unused parts transfer back from vehicle to warehouse
- Defective parts move to RMA processing with return documentation
- Allocation statuses update from "with technician" back to "allocated"
- Custody chain completes for accountability

**Example:** Technician Sarah returns at day's end with 2 unused control modules and 1 defective unit. The system creates transactions returning 2 units to warehouse stock and 1 unit to the RMA area.

**Field Delivery Transactions**

Field delivery transactions record technicians installing or delivering parts directly to customer sites.

**When to use:**
- On-site equipment repairs and installations
- Direct customer deliveries from service vehicles
- Emergency service calls
- Advanced replacement installations

**What happens:**
- Inventory decreases from the technician's vehicle
- Allocation status changes from "with technician" to "delivered"
- Delivery confirmation is automatically created
- Customer signature and GPS coordinates can be captured

**Example:** Technician Sarah installs a control module at a customer site. The field delivery transaction records the installation, completes the allocation, and captures the customer's digital signature.

**Understanding transaction relationships:**

Transactions often work together to complete business processes:

**Purchase-to-stock flow:**
1. Receipt transaction (supplier delivery)
2. Transfer transaction (receiving to storage)
3. Issue transaction (customer shipment)

**Field service flow:**
1. Tech checkout transaction (warehouse to vehicle)
2. Field delivery transaction (vehicle to customer)
3. Tech check-in transaction (unused parts back to warehouse)

**Quality control flow:**
1. Transfer transaction (storage to quarantine)
2. Adjustment transaction (if items fail inspection)
3. Transfer transaction (passed items back to storage)

---

## Transaction States and Lifecycle

Every transaction follows a predictable lifecycle from creation to completion. Understanding these states helps you track progress and troubleshoot issues.

**Pending State**

When you first create a transaction, it enters the pending state. This means the transaction exists in the system but hasn't yet been committed to inventory.

**What's happening:**
- Transaction record is created with all details
- Validation checks are running (inventory availability, permissions, etc.)
- No inventory quantities have changed yet
- Transaction can still be cancelled without impact

**Why this matters:**
- Gives you a chance to review before committing
- Allows batch processing where multiple transactions are validated together
- Prevents partial updates if validation fails
- Provides audit trail even for cancelled transactions

**Committed State**

Once validation passes and you confirm the transaction, it moves to committed state. This is when the transaction actually affects your inventory.

**What's happening:**
- Inventory quantities update immediately
- Cost layers are created or consumed
- Allocation statuses change if linked
- Audit trail records the commitment
- Transaction becomes immutable (cannot be changed)

**Why this matters:**
- This is the point of no return—inventory has actually moved
- All downstream calculations (available quantities, costs, etc.) update
- Other users see the inventory changes immediately
- Financial impact begins (cost of goods sold, inventory valuation, etc.)

**Completed State**

Some transactions require additional steps after commitment. When all steps are finished, the transaction reaches completed state.

**What's happening:**
- All related processes have finished (shipping confirmations, delivery receipts, etc.)
- Final documentation is attached (bills of lading, delivery confirmations, etc.)
- Any linked allocations have reached their final state
- Transaction is ready for period closing and financial reporting

**Why this matters:**
- Indicates the business process is fully finished
- Required for accurate period-end reporting
- Enables complete audit trails for compliance
- Allows proper revenue recognition timing

**Cancelled State**

If a transaction cannot be completed or needs to be stopped, it moves to cancelled state.

**What's happening:**
- If pending: No inventory impact, simply marked as cancelled
- If committed: Cannot be cancelled directly—requires a reversal transaction
- Reason for cancellation is documented
- Original transaction remains in system for audit purposes

**Why this matters:**
- Maintains complete audit trail even for failed operations
- Prevents confusion about what actually happened
- Enables analysis of cancellation patterns for process improvement
- Supports compliance requirements for transaction tracking

**Understanding state transitions:**

**Normal flow:**
Pending → Committed → Completed

**Cancellation flow:**
Pending → Cancelled

**Error handling:**
- Validation failures: Pending → Cancelled
- System errors: Pending → Cancelled (with error details)
- Business rule violations: Pending → Cancelled (with explanation)

**What you cannot do:**
- Change a committed transaction (create a reversal instead)
- Delete any transaction (cancellation preserves audit trail)
- Skip the pending state (all transactions must validate first)
- Manually set states (system controls all transitions)

---

## Reversing and Canceling Transactions

Sometimes you need to undo a transaction. The approach depends on the transaction's current state and how much time has passed.

**Canceling pending transactions:**

If a transaction is still pending (not yet committed), you can cancel it cleanly with no inventory impact.

**To cancel a pending transaction:**
1. Open the transaction details
2. Click "Cancel Transaction"
3. Select a cancellation reason
4. Confirm the cancellation

**What happens:**
- Transaction status changes to "Cancelled"
- No inventory quantities are affected
- Audit trail records the cancellation and reason
- Transaction remains visible for reporting but marked as cancelled

**When to cancel:**
- You created the wrong transaction type
- Quantities or locations are incorrect
- You discovered the transaction isn't needed
- Validation revealed problems that can't be fixed

**Reversing committed transactions:**

Once a transaction is committed, you cannot cancel it directly. Instead, you must create a reversal transaction that undoes the original effect.

**To reverse a committed transaction:**
1. Open the original transaction
2. Click "Create Reversal"
3. Review the reversal details (system fills in opposite quantities and locations)
4. Add a reversal reason
5. Commit the reversal transaction

**What happens:**
- A new transaction is created with opposite effect of the original
- Original transaction remains unchanged (immutable audit trail)
- Net effect returns inventory to pre-transaction state
- Both transactions remain visible in transaction history

**Example reversal:**
- Original: Receipt of +50 pumps at location A-15
- Reversal: Issue of -50 pumps from location A-15
- Net effect: Inventory returns to original level

**When to reverse:**
- Discovered the original transaction was incorrect
- Physical inventory was returned or moved back
- Need to correct errors discovered after commitment
- Compliance requires undoing specific transactions

**Partial reversals:**

Sometimes you need to reverse only part of a transaction.

**To create a partial reversal:**
1. Open the original transaction
2. Click "Create Partial Reversal"
3. Specify the quantity to reverse (less than original)
4. Add reason for partial reversal
5. Commit the reversal

**Example partial reversal:**
- Original: Receipt of +50 pumps
- Partial reversal: Issue of -10 pumps (discovered 10 were damaged)
- Net effect: +40 pumps remain in inventory

**Important reversal rules:**

**Timing matters:**
- Recent transactions (same day): Usually no restrictions
- Older transactions: May require approval
- Closed periods: Reversals may be blocked or require special authorization

**Cost implications:**
- Reversals affect cost layers and may impact financial statements
- FIFO/LIFO calculations may change if other transactions occurred between original and reversal
- Currency exchange rates use reversal date, not original date

**Allocation impacts:**
- Reversing issue transactions may return allocations to "allocated" status
- Reversing receipt transactions may affect allocation fulfillment
- System validates that reversals don't create impossible allocation states

**Serial number handling:**
- Serialized items must specify exact serial numbers in reversals
- Cannot reverse if serial numbers have moved to different locations
- Serial status changes must be logically valid

**Best practices for reversals:**

**Act quickly:**
- Reverse errors as soon as you discover them
- Same-day reversals are simpler and have fewer restrictions
- Delays may require additional approvals or explanations

**Document thoroughly:**
- Always provide clear reasons for reversals
- Include reference numbers for related documents
- Note any physical actions taken (returns, inspections, etc.)

**Verify impact:**
- Check allocation statuses after reversals
- Confirm cost calculations are correct
- Ensure other transactions aren't affected

**Consider alternatives:**
- Sometimes an adjustment transaction is more appropriate than a reversal
- Transfer transactions might fix location errors without reversals
- New transactions might be clearer than complex reversal chains

---

## Organization Configuration

Your organization's inventory mode determines how transactions behave across different branches and locations. Understanding these modes helps you choose the right setup for your business structure.

**Branch-Isolated Mode**

In branch-isolated mode, each branch operates as an independent inventory entity. Transactions are scoped to individual branches, and moving inventory between branches requires formal processes.

**How it works:**
- Each branch maintains separate transaction history
- Users can only see transactions for their assigned branches
- Cross-branch movements require transfer transactions with approvals
- Inventory calculations are branch-specific
- Reporting can be branch-level or consolidated

**When to use branch-isolated mode:**
- Multiple physical locations with independent operations
- Different branches have different inventory policies
- You need strict accountability by location
- Branches operate in different currencies or tax jurisdictions
- Regulatory requirements mandate separate tracking

**Example scenario:**
Your company has warehouses in New York, Chicago, and Los Angeles. Each warehouse serves different customers and has different inventory needs. Branch-isolated mode ensures that:
- New York transactions don't affect Chicago inventory
- Each warehouse manager sees only their transactions
- Moving inventory between warehouses requires formal transfer approval
- Financial reporting can show performance by location

**Transaction behavior in branch-isolated mode:**
- **Receipts:** Only affect the receiving branch's inventory
- **Issues:** Only reduce the issuing branch's inventory
- **Transfers:** Require both source and destination branch approval
- **Adjustments:** Scoped to the branch where they occur
- **Allocations:** Can only be fulfilled from the same branch's inventory

**Shared Inventory Mode**

In shared inventory mode, your organization operates as a single inventory entity. All branches share visibility and can access each other's inventory more freely.

**How it works:**
- Organization-wide transaction visibility
- Simplified movements between branches
- Consolidated inventory calculations
- Centralized approval workflows
- Unified reporting across all locations

**When to use shared inventory mode:**
- Single physical location with multiple zones
- Closely integrated operations across locations
- Centralized inventory management
- Frequent inter-location movements
- Simplified reporting requirements

**Example scenario:**
Your company has a main warehouse with multiple zones (receiving, storage, shipping, quarantine). Shared inventory mode allows:
- Any authorized user to see all transactions
- Easy movement between zones without complex approvals
- Consolidated view of total inventory
- Simplified allocation across all zones

**Transaction behavior in shared inventory mode:**
- **Receipts:** Visible organization-wide immediately
- **Issues:** Can draw from any location with available inventory
- **Transfers:** Simplified approval process
- **Adjustments:** Visible across all locations
- **Allocations:** Can be fulfilled from any location with inventory

**Choosing the right mode:**

**Consider branch-isolated mode if:**
- You have multiple physical locations
- Each location operates independently
- You need strict cost center accounting
- Different locations have different policies
- Regulatory requirements mandate separation

**Consider shared inventory mode if:**
- You have a single location or closely integrated locations
- You want simplified operations
- Inventory moves frequently between areas
- You prefer centralized management
- Reporting complexity should be minimized

**Switching between modes:**

Changing inventory modes is a significant decision that affects all transactions and reporting.

**Before switching:**
- Complete all pending transactions
- Resolve any cross-branch allocations
- Ensure all users understand the change
- Plan for different reporting structures
- Consider impact on existing integrations

**During the switch:**
- System may require downtime for data reorganization
- Historical transactions remain unchanged
- New transactions follow the new mode rules
- User permissions may need adjustment
- Reports may need reconfiguration

**After switching:**
- Train users on new workflows
- Update documentation and procedures
- Monitor for issues with the new mode
- Adjust reporting and analytics as needed
- Verify integrations work correctly

**Understanding inventory mode settings:**

**Available modes:**
- `branch_isolated`: Each branch operates independently
- `shared`: Organization-wide shared inventory

**Mode change requirements:**
- Administrative privileges
- Business justification
- Change reason documentation
- Effective date specification

**Safeguards:**
- Prevents mode changes with pending migrations
- Validates no conflicting transactions exist
- Ensures data integrity during transition
- Maintains audit trail of mode changes

**Impact on existing data:**
- Historical transactions remain unchanged
- Allocation visibility may change
- Reporting scope adjusts to new mode
- User access patterns may shift
- Integration behavior may need updates

---

## Bringing It All Together: A Day in the Life

Let me show you how different transaction types work together in real business operations.

**Monday, 6:00 AM — David, Receiving Clerk**

David arrives to find a truck from Supplier ABC waiting at the dock. The delivery contains 100 control modules ordered last week. David checks the purchase order, counts the boxes, and creates a receipt transaction:

- **Transaction type:** Receipt
- **Quantity:** +100 units
- **Location:** Receiving Dock A
- **Reference:** Purchase Order PO-2025-0445
- **Status:** Pending → Committed

The system immediately updates inventory: 100 units added to Receiving Dock A, cost layers created at $150 per unit, and available inventory increases by 100 units.

**Monday, 8:30 AM — Lisa, Warehouse Supervisor**

Lisa reviews overnight receipts and sees David's delivery. The control modules need to move from receiving to storage. She creates a transfer transaction:

- **Transaction type:** Transfer
- **Quantity:** 100 units
- **From:** Receiving Dock A
- **To:** Storage Bin B-15
- **Reference:** Internal transfer for storage

The system creates two atomic transactions: Issue (-100 from Receiving Dock A) and Receipt (+100 to Storage Bin B-15). The modules are now in their proper storage location.

**Monday, 10:15 AM — Mike, Sales Representative**

A customer calls with an urgent order for 25 control modules. Mike checks availability (100 units in Storage Bin B-15) and creates an allocation. When the customer confirms, Mike processes the shipment with an issue transaction:

- **Transaction type:** Issue
- **Quantity:** -25 units
- **Location:** Storage Bin B-15
- **Reference:** Sales Order SO-2025-0892
- **Allocation:** Links to customer allocation

The allocation status changes from "allocated" to "in transit," and available inventory drops to 75 units.

**Monday, 1:00 PM — Sarah, Field Service Coordinator**

Technician Tom needs parts for afternoon service calls. Sarah creates a tech checkout transaction:

- **Transaction type:** Tech Checkout
- **Quantity:** -10 units
- **From:** Storage Bin B-15
- **To:** Tom's Service Van
- **Reference:** Daily tech loadout
- **Expected return:** 6:00 PM today

Tom's van inventory increases by 10 units, and if any are allocated to specific jobs, their status changes to "with technician."

**Monday, 3:45 PM — Tom, Field Technician**

Tom arrives at a customer site and installs 3 control modules. He creates a field delivery transaction using his mobile device:

- **Transaction type:** Field Delivery
- **Quantity:** -3 units
- **From:** Tom's Service Van
- **Reference:** Work Order WO-2025-1234
- **Customer signature:** Captured digitally
- **GPS coordinates:** Automatically recorded

The allocation status changes from "with technician" to "delivered," and Tom's van inventory drops to 7 units.

**Monday, 6:30 PM — Tom Returns to Warehouse**

Tom returns with 7 unused control modules. Sarah processes his check-in:

- **Transaction type:** Tech Check-in
- **Unused items:** +7 units back to Storage Bin B-15
- **Defective items:** None today
- **Reference:** End-of-day reconciliation

The 7 units return to warehouse inventory, and any allocations change from "with technician" back to "allocated."

**Monday, 4:00 PM — Jennifer, Inventory Analyst**

During a routine cycle count, Jennifer discovers only 62 control modules in Storage Bin B-15, but the system shows 65. She investigates and finds 3 units were damaged during handling. Jennifer creates an adjustment transaction:

- **Transaction type:** Adjustment
- **Quantity:** -3 units
- **Location:** Storage Bin B-15
- **Reason:** Damaged goods discovered during cycle count
- **Reference:** Cycle Count CC-2025-0156

The system reduces inventory by 3 units and creates an audit trail for the variance.

**End of Day Summary:**

Starting inventory: 0 units
- Receipt: +100 units (supplier delivery)
- Transfer: 0 net change (moved to storage)
- Issue: -25 units (customer shipment)
- Tech checkout: -10 units (to service van)
- Field delivery: -3 units (customer installation)
- Tech check-in: +7 units (unused parts returned)
- Adjustment: -3 units (damaged goods)

Ending inventory: 66 units in Storage Bin B-15

**Transaction audit trail shows:**
- 100 units received from supplier
- 25 units shipped to customer
- 3 units delivered by technician
- 3 units written off as damaged
- 7 units returned from field service
- Complete chain of custody for all movements

**Allocation status tracking:**
- Customer order: 25 units delivered
- Field service jobs: 3 units delivered, 7 units returned to allocated status
- All promises kept, all movements documented

This day demonstrates how transactions work together to maintain accurate inventory while supporting complex business operations. Every movement is recorded, every promise is tracked, and every decision is based on real, current data.

---

## Common Questions & Troubleshooting

### "What's the difference between canceling and reversing a transaction?"

**Canceling** is for pending transactions that haven't been committed yet. It's like tearing up a check before you sign it—no inventory has moved, so there's no impact to undo.

**Reversing** is for committed transactions that have already affected inventory. It's like writing a new check to undo the first one—you create a new transaction with the opposite effect.

You can only cancel pending transactions. Once committed, you must reverse.

### "Why can't I edit a transaction after it's committed?"

Transactions are immutable by design to maintain audit integrity and financial compliance. Once inventory has physically moved and been recorded, changing the record would break the audit trail and potentially violate regulatory requirements.

Instead of editing, create a reversal transaction to undo the original, then create a new correct transaction.

### "What happens if I reverse a transaction that's linked to an allocation?"

The system automatically handles allocation status changes:

- Reversing an issue transaction may return the allocation from "in transit" back to "allocated"
- Reversing a receipt transaction may affect allocation fulfillment
- The system validates that the reversal creates a valid allocation state

If the reversal would create an impossible allocation state, you'll get an error and need to adjust the allocation first.

### "Can I create transactions for past dates?"

Yes, but with restrictions:

- **Same day:** Usually no restrictions
- **Previous days:** May require approval depending on your organization's settings
- **Closed periods:** May be blocked entirely or require special authorization
- **Far past dates:** System may reject transactions beyond a certain age

The system prevents backdating that would violate period closing rules or audit requirements.

### "Why do some transactions require approval?"

Approval requirements depend on your organization's configuration:

- **Adjustment transactions:** Often require approval because they correct system data
- **Large quantities:** Transactions above certain thresholds may need manager approval
- **High values:** Expensive items may require additional authorization
- **Sensitive locations:** Transactions involving quarantine or restricted areas
- **Cross-branch transfers:** May require approval in branch-isolated mode

Check your organization's approval settings or ask your administrator about specific requirements.

### "What's the difference between a transfer and separate issue/receipt transactions?"

**Transfer transactions:**
- Create two linked transactions atomically (both succeed or both fail)
- Maintain cost layer integrity during movement
- Simpler to create and track
- Ensure no inventory is lost between locations

**Separate issue/receipt transactions:**
- Independent transactions that might not be linked
- Risk of partial completion (issue succeeds but receipt fails)
- More complex to track and reconcile
- Potential for inventory discrepancies

Always use transfer transactions for internal movements between your locations.

### "How do I handle damaged goods discovered during receiving?"

You have several options:

**Option 1 - Partial receipt:**
- Receive only the good units
- Create a separate adjustment for the damaged units
- Reference the damage in both transactions

**Option 2 - Full receipt then adjustment:**
- Receive all units initially
- Create an adjustment transaction to remove damaged units
- Move damaged units to quarantine location if needed

**Option 3 - Separate transactions:**
- Receipt transaction for good units to storage
- Receipt transaction for damaged units to quarantine/RMA area
- Process damaged units through your return workflow

Choose based on your quality control procedures and how you handle damaged inventory.

### "Can I batch multiple transactions together?"

Yes, the system supports batch processing with these benefits:

- **Atomic processing:** All transactions in the batch succeed or all fail
- **Improved performance:** Faster than individual transactions
- **Simplified workflow:** Process multiple related movements together

**Batch size limits depend on your organization's configuration:**
- Small operations: Usually 10-50 transactions per batch
- Standard operations: Usually 50-100 transactions per batch
- Large operations: May support 100-1000+ transactions per batch

Check your system limits or ask your administrator about batch capabilities.

### "What happens to transactions when I change inventory modes?"

**Historical transactions:**
- Remain unchanged regardless of mode switch
- Continue to be visible according to the mode they were created under
- Maintain their original audit trail and references

**New transactions:**
- Follow the rules of the new inventory mode
- May have different visibility and approval requirements
- Could affect different scope of inventory

**During transition:**
- Complete all pending transactions before switching modes
- Resolve any cross-branch allocations
- Ensure users understand the new workflow

Mode changes are significant operational changes that should be planned carefully.

### "How do I track the complete history of a specific item?"

**For serialized items:**
- Use the serial number tracking to see complete movement history
- Each transaction shows the specific serial numbers involved
- Chain of custody is maintained from receipt to delivery

**For non-serialized items:**
- Filter transaction history by product and location
- Look for patterns in receipt, issue, and transfer transactions
- Use lot numbers if available for batch tracking

**For specific allocations:**
- View allocation history to see all related transactions
- Track from initial allocation through final delivery
- See which transactions fulfilled which parts of the allocation

The transaction system maintains complete traceability for all inventory movements.

---

## Chapter Summary

Transactions are the foundation of accurate inventory management. They transform your inventory from a static list of items into a dynamic, traceable system that reflects reality and supports confident decision-making.

**Key takeaways:**

**Transactions represent physical reality** — Every transaction corresponds to actual inventory movement or change. This principle ensures your system data matches what's really happening in your warehouse.

**Immutability ensures integrity** — Once committed, transactions cannot be changed or deleted. This creates an unbreakable audit trail and ensures financial compliance.

**Different types serve different purposes** — Receipt, issue, transfer, adjustment, and field service transactions each handle specific business scenarios. Using the right type ensures proper tracking and reporting.

**States control the lifecycle** — Pending, committed, completed, and cancelled states provide clear visibility into transaction progress and enable proper error handling.

**Reversals handle corrections** — When mistakes happen, reversal transactions provide a clean way to undo effects while maintaining complete audit trails.

**Organization modes affect behavior** — Branch-isolated and shared inventory modes determine how transactions work across multiple locations, supporting different business structures.

**Batch processing improves efficiency** — Grouping related transactions together provides better performance and ensures atomic processing of complex operations.

**Integration enables automation** — Transactions connect with allocations, cost calculations, and reporting to create a comprehensive inventory management system.

**Audit trails support compliance** — Every transaction creates permanent records that support financial reporting, regulatory compliance, and operational analysis.

**Real-time updates maintain accuracy** — Transaction effects appear immediately in inventory calculations, ensuring decisions are based on current data.

Mastering transactions means mastering the heartbeat of your inventory system. Every quantity you see, every allocation you make, every cost you calculate—all of it flows from the transactions that record your inventory's story. When you understand transactions, you understand how your inventory really works.

The next chapters will show you how to use specific transaction types for receiving, adjustments, transfers, and shipping. But the foundation you've learned here—that transactions are immutable records of physical reality—applies to everything that follows.