---
outline: deep
chapter_source: Chapter_05_Receiving_Inventory.md
---

# Chapter 5: Receiving Inventory

**Contract Reference:** `operations/transactions/paths/receiving-core.yaml`

## The Gateway to Your Inventory

Every piece of inventory in your system starts its journey the same way: through receiving. Whether it's a purchase order delivery from your biggest supplier, a customer return that needs inspection, or a transfer from another warehouse, receiving is where physical goods become tracked, valued, and managed inventory.

But receiving is more than just counting boxes and updating quantities. It's your first line of defense against inventory errors, your quality control checkpoint, and your opportunity to set accurate costs that will flow through every subsequent transaction. A mistake in receiving ripples through your entire system—wrong quantities affect availability, missing serial numbers break traceability, incorrect costs distort profitability.

Think of receiving as the foundation of inventory accuracy. Every allocation you make, every shipment you send, every cost you calculate—all of it depends on receiving being done right. When receiving is accurate and efficient, your entire inventory system runs smoothly. When it's not, problems compound quickly.

This chapter will show you how to master receiving: from simple purchase order deliveries to complex scenarios involving serial numbers, quality inspections, and approval workflows. You'll learn not just how to receive inventory, but how to receive it right the first time, every time.

### Quick Confidence Check

<LearningQuiz
  question="Why is staging and inspecting receipts before put away critical?"
  :options="[&quot;It catches damage or mislabels so bad stock never reaches bins&quot;, &quot;It lets receivers skip updating cost layers&quot;, &quot;It ensures carriers send fewer trucks next week&quot;]"
  :answer-index="0"
  :explanations="[&quot;Quality gates stop defective goods from contaminating inventory.&quot;, &quot;Cost updates happen automatically from the receipt transaction.&quot;, &quot;Carrier schedules are negotiated separately.&quot;]"
/>

---

## The Receiving Process

Understanding the receiving process helps you see how each step contributes to inventory accuracy and why shortcuts can cause problems later.

**Step 1: Arrival and Verification**

When a shipment arrives, the first step is verifying what you're receiving against what you expected.

**What to check:**
- Does the shipment match a purchase order, transfer, or return authorization?
- Are the quantities close to what was ordered?
- Is the condition of the packaging acceptable?
- Are there any obvious signs of damage or tampering?

**Why this matters:**
- Catches shipping errors before they enter your system
- Identifies damage that might affect product quality
- Ensures you're receiving legitimate inventory
- Provides documentation for insurance or supplier claims

**Example:** A truck arrives with 10 boxes labeled "Control Modules." You check against Purchase Order PO-2025-0445 and confirm it matches the expected delivery date and supplier. A quick visual inspection shows all boxes are intact with no damage.

**Step 2: Physical Count and Inspection**

Next, you physically count what arrived and inspect for quality issues.

**What to do:**
- Open packages and count actual quantities
- Check for damage, defects, or quality issues
- Verify product numbers and descriptions match the order
- Note any discrepancies between expected and actual quantities

**Why this matters:**
- Ensures your system quantities match physical reality
- Catches quality issues before products reach customers
- Identifies supplier performance problems
- Provides accurate data for cost calculations

**Example:** Opening the 10 boxes reveals 120 control modules (12 per box). The purchase order was for 120 units, so the quantity matches. Visual inspection shows all modules are in good condition with no visible damage.

**Step 3: System Entry and Documentation**

Now you record the receipt in the system, creating the transaction that updates your inventory.

**What to record:**
- Exact quantities received
- Location where inventory will be stored
- Any serial numbers or lot numbers
- Actual costs if different from expected
- Notes about condition or discrepancies

**Why this matters:**
- Creates the transaction that increases your inventory
- Establishes cost layers for financial tracking
- Provides audit trail for compliance
- Updates availability for allocation and sales

**Example:** You create a receipt transaction for 120 control modules, assigning them to storage location B-15, with a unit cost of $150 each. The system creates a cost layer worth $18,000 and increases available inventory by 120 units.

**Step 4: Put-Away and Location Assignment**

Finally, the physical inventory moves to its designated storage location.

**What happens:**
- Inventory moves from receiving dock to storage location
- Location assignment is confirmed in the system
- Any location transfers are recorded
- Storage location capacity is updated

**Why this matters:**
- Ensures inventory can be found when needed
- Maintains accurate location tracking
- Optimizes warehouse space utilization
- Enables efficient picking and cycle counting

**Example:** The 120 control modules are physically moved from Receiving Dock A to Storage Bin B-15. The system records a transfer transaction and updates the location's inventory count.

**Understanding the flow:**

**Normal receiving flow:**
Arrival → Verification → Count → System Entry → Put-Away → Available for Use

**With quality inspection:**
Arrival → Verification → Count → Quality Hold → Inspection → Pass/Fail → Put-Away or Return

**With approval required:**
Arrival → Verification → Count → System Entry (Pending) → Approval → Put-Away → Available for Use

---

## Creating Receipts

Let's walk through the practical steps of creating different types of receipts in the system.

**Creating a purchase order receipt:**

This is the most common type of receipt—recording delivery of items you ordered from a supplier.

**To create a purchase order receipt:**

1. **Start the receipt process**
   - Navigate to Receiving → Create Receipt
   - Select "Purchase Order" as the source type
   - Enter or scan the purchase order number

2. **Verify the purchase order details**
   - Review the expected items and quantities
   - Check delivery date and supplier information
   - Note any special instructions or requirements

3. **Record what you actually received**
   - Enter the actual quantity for each item
   - Select the storage location for each item
   - Add any serial numbers or lot numbers
   - Note any damage or quality issues

4. **Handle discrepancies**
   - If quantities don't match, document the variance
   - For over-receipts, check if approval is needed
   - For under-receipts, note the shortage reason
   - Take photos if there's visible damage

5. **Complete the receipt**
   - Review all entries for accuracy
   - Add any notes about the delivery
   - Submit the receipt for processing

**Example purchase order receipt:**
```
Purchase Order: PO-2025-0445
Supplier: ABC Electronics
Expected: 120 Control Modules
Received: 120 Control Modules
Location: Storage Bin B-15
Unit Cost: $150.00
Total Value: $18,000.00
Notes: All items in good condition, delivery on time
```

**Creating a transfer receipt:**

Transfer receipts record inventory arriving from another location within your organization.

**To create a transfer receipt:**

1. **Identify the transfer**
   - Look up the transfer order number
   - Verify the source location and expected items
   - Check that the transfer was properly dispatched

2. **Receive the transferred items**
   - Count the actual quantities received
   - Verify item condition after transport
   - Confirm serial numbers match the transfer

3. **Complete the transfer**
   - Record receipt at the destination location
   - The system automatically completes the transfer
   - Inventory moves from "in transit" to "on hand"

**Example transfer receipt:**
```
Transfer Order: TR-2025-0156
From: Warehouse A, Bin C-20
To: Warehouse B, Bin D-15
Item: Safety Valves
Expected: 50 units
Received: 50 units
Condition: Good
Notes: Transfer completed successfully
```

**Creating a return receipt:**

Return receipts record customer returns or RMA items coming back to your warehouse.

**To create a return receipt:**

1. **Verify the return authorization**
   - Check the RMA number and customer information
   - Review the return reason and authorization
   - Confirm the items are eligible for return

2. **Inspect returned items**
   - Check condition and functionality
   - Verify serial numbers match the original sale
   - Determine if items can be restocked or need repair

3. **Process the return**
   - Record quantities and condition
   - Route to appropriate location (stock, quarantine, or RMA processing)
   - Update the RMA status

**Example return receipt:**
```
RMA Number: RMA-2025-0089
Customer: XYZ Manufacturing
Item: Control Module, Serial SN-2024-5567
Return Reason: Defective - not functioning
Condition: Defective
Destination: Quarantine for inspection
Notes: Customer reports unit failed after 2 weeks
```

**Creating an adjustment receipt:**

Adjustment receipts record inventory that was found or discovered but not previously recorded in the system.

**To create an adjustment receipt:**

1. **Document the discovery**
   - Record where the inventory was found
   - Determine why it wasn't previously recorded
   - Estimate the age and condition

2. **Research the source**
   - Check if it belongs to a missing shipment
   - Look for related transactions or transfers
   - Verify the items are legitimate inventory

3. **Record the adjustment**
   - Enter quantities and estimated costs
   - Assign to appropriate location
   - Document the reason for the adjustment

**Example adjustment receipt:**
```
Adjustment Type: Found Inventory
Item: Pressure Sensors
Quantity: 25 units
Location Found: Storage Room C (during reorganization)
Estimated Cost: $75.00 per unit
Reason: Items were misplaced during warehouse move
Notes: All items appear to be in good condition
```

---

## Recording What Arrives

Accurate recording is crucial for inventory integrity. Here's how to handle different scenarios you'll encounter.

**Recording quantities and UOM:**

Always record quantities in the units that make most sense for the situation, but understand how the system will convert them.

**Best practices for quantities:**
- Count carefully and double-check important deliveries
- Use the UOM specified on the purchase order when possible
- If you receive in different units, note the conversion
- For large quantities, consider weighing or measuring instead of counting

**Example UOM scenarios:**

**Scenario 1 - Receiving in purchase UOM:**
- Ordered: 10 cases of 12 each
- Received: 10 cases
- Record as: 10 cases (system converts to 120 each for stock tracking)

**Scenario 2 - Receiving in different UOM:**
- Ordered: 5 pallets of 960 each
- Received: 4,800 individual units (short 1 pallet)
- Record as: 4,800 each (system shows 1 pallet shortage)

**Scenario 3 - Partial case receiving:**
- Ordered: 10 cases of 12 each
- Received: 9 full cases + 8 loose units
- Record as: 116 each (system calculates 9.67 cases)

**Handling serial numbers:**

For serialized items, accurate serial number capture is essential for traceability and compliance.

**Serial number best practices:**
- Scan barcodes when possible to avoid transcription errors
- Record serials in the order you process them
- Verify each serial is unique and not already in the system
- Take photos of serial number labels for backup documentation

**To record serial numbers:**

1. **Prepare for serial capture**
   - Ensure you have enough time and good lighting
   - Have a barcode scanner or mobile device ready
   - Clear workspace to organize items as you process them

2. **Process each item individually**
   - Scan or manually enter each serial number
   - Verify the serial appears correctly in the system
   - Set aside processed items to avoid double-counting

3. **Validate the complete list**
   - Check that serial count matches physical count
   - Verify no duplicates in your list
   - Confirm all serials are properly formatted

**Example serial number recording:**
```
Product: High-Precision Sensor
Quantity: 5 units
Serial Numbers:
- SN-2025-1501 (scanned)
- SN-2025-1502 (scanned)
- SN-2025-1503 (scanned)
- SN-2025-1504 (scanned)
- SN-2025-1505 (scanned)
Verification: 5 serials recorded, all unique, all properly formatted
```

**Managing lot numbers:**

Lot numbers track groups of items manufactured or received together, important for quality control and recalls.

**Lot number guidelines:**
- Use the lot number from the supplier when provided
- If no lot number exists, the system can generate one
- Ensure lot numbers are unique within each product
- Record expiration dates for perishable items

**To record lot information:**

1. **Check for existing lot numbers**
   - Look for lot numbers on packaging or labels
   - Verify the format matches your standards
   - Check if the lot already exists in your system

2. **Record lot details**
   - Enter the lot number exactly as shown
   - Add manufacture date if available
   - Record expiration date for time-sensitive items
   - Note any special handling requirements

3. **Validate lot information**
   - Ensure expiration dates are reasonable
   - Check that manufacture dates are in the past
   - Verify lot numbers follow expected patterns

**Example lot number recording:**
```
Product: Chemical Compound XYZ
Lot Number: LOT-2025-001 (from supplier label)
Manufacture Date: 2025-01-15
Expiration Date: 2026-01-14
Quantity: 50 gallons
Storage Requirements: Keep refrigerated
Notes: Supplier certificate of analysis attached
```

**Documenting costs:**

Accurate cost recording ensures proper inventory valuation and profitability analysis.

**Cost recording principles:**
- Use the actual cost from the supplier invoice when available
- Include freight, duty, and handling costs when significant
- Record costs in your base currency
- Document any cost adjustments or allocations

**To record costs accurately:**

1. **Gather cost information**
   - Check the purchase order for expected costs
   - Review supplier invoice for actual costs
   - Identify any additional charges (freight, duty, handling)

2. **Allocate total costs**
   - Distribute freight costs across all items by weight or value
   - Allocate duty costs by value or quantity as appropriate
   - Add handling fees to specific items if applicable

3. **Record final unit costs**
   - Calculate final cost per unit including all charges
   - Round to appropriate precision (usually 4 decimal places)
   - Document the cost calculation method

**Example cost recording:**
```
Product: Control Module
Base Cost: $150.00 per unit
Freight Allocation: $2.50 per unit (based on weight)
Duty Allocation: $1.25 per unit (based on value)
Handling Fee: $0.75 per unit
Final Unit Cost: $154.50 per unit
Total for 120 units: $18,540.00
```

---

## Handling Quantities and UOM

Understanding how the system handles different units of measure during receiving helps you make better decisions and avoid confusion.

**UOM conversion during receiving:**

When you receive inventory, the system automatically converts quantities to maintain consistency while preserving your original entry for audit purposes.

**How conversion works:**

1. **You enter quantities** in whatever UOM is most convenient
2. **System converts to stock UOM** for inventory tracking
3. **Both quantities are preserved** for audit and reporting
4. **Calculations use stock UOM** for consistency

**Example conversion process:**
```
Your Entry: 5 cases
Conversion Factor: 1 case = 12 each
Stock UOM Result: 60 each
System Records:
- Original: 5 cases (for audit)
- Stock: 60 each (for inventory)
- Available: 60 each (for allocation)
```

**Handling fractional quantities:**

Sometimes you receive partial packages or need to record fractional amounts.

**When fractional quantities occur:**
- Damaged packages with some unusable items
- Partial case deliveries
- Bulk materials measured by weight or volume
- Returns of partial quantities

**How to handle fractions:**

**For count items (each, pieces):**
- Usually must be whole numbers
- System may round or require explanation for fractions
- Consider using adjustment transactions for partial units

**For bulk items (weight, volume):**
- Fractional quantities are normal and expected
- Use appropriate precision (usually 2-4 decimal places)
- Ensure measuring equipment is accurate

**Example fractional scenarios:**

**Scenario 1 - Damaged case:**
```
Ordered: 10 cases of 12 each
Received: 9 full cases + 1 damaged case with 8 good units
Record as: 9 cases + 8 each
System calculates: 108 + 8 = 116 each total
```

**Scenario 2 - Bulk chemical:**
```
Ordered: 100 gallons
Received: 99.75 gallons (measured)
Record as: 99.75 gallons
System accepts: Fractional quantities normal for volume
```

**Managing over-receipts and under-receipts:**

Discrepancies between ordered and received quantities are common and need proper handling.

**Over-receipts (received more than ordered):**

Over-receipts can happen due to supplier errors, rounding, or bonus shipments.

**How the system handles over-receipts:**
1. **Calculates the overage percentage**
2. **Checks against your tolerance settings**
3. **Auto-approves if within tolerance**
4. **Requires approval if over tolerance**
5. **Blocks receipt if over maximum limit**

**Example over-receipt handling:**
```
Ordered: 100 units
Received: 105 units
Overage: 5% over
Tolerance Setting: Auto-approve up to 5%
Result: Receipt auto-approved
Action: Update PO to reflect actual receipt
```

**Under-receipts (received less than ordered):**

Under-receipts are usually acceptable but need documentation for follow-up.

**How to handle under-receipts:**
1. **Record actual quantity received**
2. **Document reason for shortage**
3. **Note if more is expected**
4. **Update purchase order status**
5. **Consider impact on allocations**

**Example under-receipt handling:**
```
Ordered: 100 units
Received: 95 units
Shortage: 5 units
Reason: Supplier backorder
Expected: Next shipment in 2 weeks
Action: Partial receipt, keep PO open for balance
```

**UOM validation and error prevention:**

The system validates UOM entries to prevent common mistakes.

**Common UOM errors:**
- Using wrong UOM for the product
- Entering quantities in incompatible units
- Mixing count and measurement units incorrectly
- Forgetting to convert supplier units to your standards

**How to avoid UOM errors:**

**Double-check UOM selection:**
- Verify the UOM matches what you're actually counting
- Confirm conversion factors are correct
- Use the same UOM as the purchase order when possible

**Validate quantity reasonableness:**
- Does the result make sense for the product?
- Are you getting the expected total value?
- Do the physical dimensions match the quantity?

**Example UOM validation:**
```
Product: Steel Pipe
Purchase Order: 100 feet
Your Count: 10 pieces of 10-foot lengths
UOM Check: 10 pieces × 10 feet = 100 feet ✓
Validation: Quantities match, UOM conversion correct
```

**Best practices for UOM accuracy:**

**Use consistent measuring:**
- Calibrate scales and measuring equipment regularly
- Train staff on proper measuring techniques
- Use the same measurement method consistently

**Document unusual situations:**
- Note when you use different UOM than ordered
- Explain any conversion calculations
- Take photos of unusual packaging or measurements

**Verify critical receipts:**
- Have a second person verify high-value items
- Double-check serial numbers and lot numbers
- Confirm quantities for items with tight tolerances

---

## Retrieving Receipt Details

Once receipts are created, you need to be able to find and review them for various business purposes.

**Finding specific receipts:**

The system provides multiple ways to locate receipts based on different criteria.

**Search by receipt number:**
- Use this when you have the specific receipt number
- Fastest method for direct lookup
- Useful for customer service and audit inquiries

**Search by purchase order:**
- Find all receipts related to a specific PO
- Helpful for tracking PO completion status
- Shows partial receipts and delivery history

**Search by product:**
- Locate all receipts for a specific item
- Useful for quality investigations
- Helps track supplier performance by product

**Search by date range:**
- Find receipts within specific time periods
- Good for period-end reporting
- Helps identify seasonal patterns

**Search by supplier:**
- Review all receipts from a specific vendor
- Useful for supplier performance analysis
- Helps identify delivery patterns and issues

**Example search scenarios:**

**Scenario 1 - Customer inquiry:**
```
Customer: "We need proof of when you received our return"
Search Method: RMA number → Return receipt
Result: RMA-2025-0089 received on 2025-01-15 at 2:30 PM
Information: Item condition, inspector notes, disposition
```

**Scenario 2 - Quality investigation:**
```
Issue: "Control modules from lot LOT-2025-001 are failing"
Search Method: Product + Lot number → All receipts
Result: 3 receipts with this lot from 2 different suppliers
Analysis: Identify which supplier provided the defective lot
```

**Scenario 3 - Audit request:**
```
Auditor: "Show all receipts for January 2025"
Search Method: Date range 2025-01-01 to 2025-01-31
Result: 247 receipts totaling $1.2M in received inventory
Export: Detailed report with all receipt information
```

**Understanding receipt details:**

Each receipt contains comprehensive information for audit, analysis, and troubleshooting.

**Header information:**
- Receipt number and date
- Source document (PO, transfer, RMA)
- Receiving location and personnel
- Overall status and approval state

**Line item details:**
- Product information and quantities
- UOM and conversion details
- Serial numbers and lot information
- Costs and value calculations
- Quality inspection results

**Transaction linkage:**
- Related inventory transactions
- Cost layer assignments
- Allocation fulfillments
- Location transfers

**Audit trail:**
- Who created and approved the receipt
- When each action occurred
- Any modifications or corrections
- Supporting documentation links

**Example receipt detail view:**
```
Receipt: RCP-2025-000123
Date: 2025-01-15 14:30:00
Source: PO-2025-0445 (ABC Electronics)
Receiver: John Smith
Status: Completed

Line 1:
Product: Control Module CM-500
Ordered: 120 each
Received: 120 each
Location: Storage Bin B-15
Unit Cost: $150.00
Total Value: $18,000.00
Lot: LOT-2025-001
Serials: SN-2025-1501 through SN-2025-1620

Transactions Created:
- Receipt Transaction: TXN-2025-5678
- Cost Layer: CL-2025-3456
- Location Transfer: TXN-2025-5679

Audit Trail:
- Created: John Smith, 2025-01-15 14:30:00
- Approved: Jane Manager, 2025-01-15 14:45:00
- Completed: System, 2025-01-15 14:45:01
```

**Exporting receipt data:**

For reporting and analysis, you can export receipt information in various formats.

**Export options:**
- **Summary reports** - High-level receipt totals and counts
- **Detail reports** - Complete line-item information
- **Audit reports** - Full audit trail and approval history
- **Cost reports** - Financial impact and cost analysis
- **Performance reports** - Timing and efficiency metrics

**Common export uses:**

**Financial reporting:**
- Month-end receipt totals for accounting
- Cost analysis by supplier or product category
- Variance reports for budget analysis

**Operational analysis:**
- Receiving efficiency and timing
- Quality inspection results
- Supplier performance metrics

**Compliance documentation:**
- Audit trail for regulatory requirements
- Traceability reports for recalls
- Quality documentation for certifications

**Example export scenarios:**

**Month-end financial report:**
```
Export: All receipts for January 2025
Format: Excel with summary and detail tabs
Content: 
- Summary: Total value by supplier and category
- Detail: Line-by-line receipt information
- Costs: Unit costs and total values
- Variances: Over/under receipt analysis
```

**Supplier performance analysis:**
```
Export: All receipts from ABC Electronics, last 6 months
Format: CSV for analysis software
Content:
- On-time delivery percentage
- Quality pass rates
- Over/under receipt frequency
- Average processing time
```

---

## Receiving Configuration

Your organization's receiving settings control how the receiving process works and what approvals or validations are required.

**Understanding receiving settings:**

Receiving settings determine the rules and tolerances that govern how receipts are processed.

**Key configuration areas:**

**Over-receipt tolerances:**
- How much over-receipt is automatically approved
- What percentage requires supervisor approval
- Maximum over-receipt allowed before blocking

**Quality inspection rules:**
- Which products require inspection
- Random sampling rates for quality checks
- Default inspection assignments and timeframes

**Blind receiving settings:**
- Whether to hide expected quantities during receiving
- Variance thresholds that trigger alerts
- Requirements for double-counting

**Approval workflows:**
- Who can approve different types of variances
- Escalation rules for delayed approvals
- Documentation requirements for approvals

**Default locations and settings:**
- Standard receiving dock location
- Default storage locations by product category
- Automatic put-away rules

**Example receiving configuration:**
```
Organization: ABC Manufacturing
Enforcement Profile: Standard

Over-Receipt Tolerances:
- Auto-approve: Up to 5% over
- Supervisor approval: 5% to 10% over
- Manager approval: 10% to 20% over
- Block receipt: Over 20%

Quality Inspection:
- Mode: By rules (product and supplier based)
- Random sample rate: 10%
- Minimum supplier score: 85
- Default inspector: Jane QC
- SLA: 24 hours

Blind Receiving:
- Enabled: Yes
- Variance alert: 2% difference
- Double count required: Yes
- Instructions: "Count before revealing expected quantities"
```

**Getting and updating receiving settings:**

Administrators can view and modify receiving settings to match business requirements.

**To view current settings:**
1. Navigate to Administration → Receiving Configuration
2. Review current tolerance and approval settings
3. Check quality inspection rules and assignments
4. Verify default locations and workflows

**To update settings:**
1. Select the setting category to modify
2. Adjust tolerances, percentages, or rules as needed
3. Test changes with sample scenarios
4. Save changes and notify affected users
5. Monitor the impact of changes

**Common setting adjustments:**

**Tightening controls:**
- Reduce over-receipt auto-approval percentages
- Increase quality inspection sampling rates
- Add approval requirements for larger variances
- Implement blind receiving for accuracy

**Relaxing controls:**
- Increase auto-approval tolerances
- Reduce inspection requirements for trusted suppliers
- Streamline approval workflows
- Allow more flexibility in location assignments

**Setting receipt defaults:**

Default settings speed up the receiving process by pre-filling common values.

**Useful defaults to configure:**

**Location defaults:**
- Standard receiving dock for all deliveries
- Default storage locations by product category
- Quarantine location for quality holds
- Return processing area for RMAs

**Cost defaults:**
- Standard freight allocation methods
- Default duty calculation rules
- Handling fee structures
- Currency conversion settings

**Workflow defaults:**
- Standard inspection requirements
- Default approval routing
- Automatic notification settings
- Document attachment requirements

**Example default configuration:**
```
Default Receiving Location: Dock-A
Default Storage by Category:
- Electronics: Storage-Zone-B
- Chemicals: Hazmat-Storage
- Raw Materials: Bulk-Storage-C

Default Cost Allocations:
- Freight: By weight
- Duty: By value
- Handling: $5 per shipment

Default Workflows:
- Electronics: Quality inspection required
- Chemicals: Hazmat certification check
- High-value items: Dual approval required
```

**Monitoring configuration effectiveness:**

After changing settings, monitor their impact on operations and adjust as needed.

**Metrics to track:**
- Receipt processing time
- Approval delays and bottlenecks
- Quality inspection pass rates
- Over-receipt frequency and amounts
- User satisfaction and feedback

**Signs settings need adjustment:**

**Too restrictive:**
- Frequent approval delays
- High percentage of receipts requiring approval
- User complaints about process complexity
- Bottlenecks in quality inspection

**Too permissive:**
- High variance rates without detection
- Quality issues reaching customers
- Inventory accuracy problems
- Lack of proper documentation

**Example monitoring results:**
```
Setting Change: Reduced auto-approval from 10% to 5%
Results after 30 days:
- Approval requests increased 40%
- Average approval time: 2.3 hours
- Variance detection improved 25%
- User feedback: Mixed (more accurate but slower)
Recommendation: Keep change but add more approvers
```

---

## Handling Issues

Even with good processes, receiving issues occur. Knowing how to handle them properly maintains inventory accuracy and audit integrity.

**Reversing receipts when needed:**

Sometimes you need to undo a receipt that was entered incorrectly or for inventory that needs to be returned.

**When to reverse receipts:**
- Quantities were entered incorrectly
- Wrong products were received and recorded
- Quality inspection failed and items must be returned
- Supplier requested return of shipped items
- Discovery that receipt was duplicate or fraudulent

**How receipt reversal works:**

1. **System creates a reversal transaction** with opposite quantities
2. **Original receipt remains unchanged** for audit purposes
3. **Net effect returns inventory** to pre-receipt levels
4. **Cost layers are adjusted** to remove the reversed amounts
5. **Allocations are updated** if they were affected

**To reverse a receipt:**

1. **Open the original receipt** you need to reverse
2. **Click "Create Reversal"** or similar option
3. **Review the reversal details** - system fills in opposite quantities
4. **Add reversal reason** - explain why the reversal is needed
5. **Specify what happens to physical inventory** - return to supplier, move to quarantine, etc.
6. **Submit the reversal** for processing

**Example receipt reversal:**
```
Original Receipt: RCP-2025-000123
Product: Control Module CM-500
Original Quantity: +120 each
Reversal Quantity: -120 each
Reason: Quality inspection failed - returning to supplier
Physical Action: Items moved to shipping dock for return
Net Effect: Inventory returns to pre-receipt level
```

**Partial reversals:**

Sometimes you only need to reverse part of a receipt.

**When partial reversals are needed:**
- Some items passed inspection, others failed
- Partial return due to customer change of mind
- Discovery that only some items were incorrectly received
- Damage discovered after initial receipt

**To create a partial reversal:**

1. **Specify the quantity to reverse** (less than original)
2. **Identify which specific items** if serialized
3. **Document the reason** for partial reversal
4. **Handle the physical inventory** appropriately

**Example partial reversal:**
```
Original Receipt: 120 units
Quality Inspection Results: 115 passed, 5 failed
Partial Reversal: -5 units (failed items)
Remaining: 115 units in inventory
Failed Items: Returned to supplier for credit
```

**Tracking receipt history:**

Complete receipt history helps with troubleshooting, audits, and performance analysis.

**What receipt history includes:**
- Original receipt creation and details
- Any modifications or corrections
- Approval actions and timing
- Quality inspection results
- Reversals and adjustments
- Related transactions and transfers

**Using receipt history for troubleshooting:**

**Inventory discrepancies:**
- Check if receipts were reversed or adjusted
- Verify quantities and UOM conversions
- Look for duplicate or missing receipts

**Quality issues:**
- Review inspection results and notes
- Check if similar issues occurred with other receipts
- Identify patterns by supplier or product

**Cost variances:**
- Compare actual costs to expected costs
- Check for freight and duty allocations
- Verify currency conversions and timing

**Example history investigation:**
```
Issue: Inventory shows 95 units, should be 100
History Review:
- Original receipt: +120 units (RCP-2025-000123)
- Quality reversal: -5 units (failed inspection)
- Sales shipment: -20 units (SO-2025-0567)
- Current balance: 95 units ✓
Conclusion: Inventory is correct, quality reversal explains difference
```

**Handling receipt errors:**

When errors are discovered, proper correction maintains data integrity.

**Common receipt errors:**
- Wrong quantities entered
- Incorrect product selected
- Wrong location assigned
- Missing serial numbers or lot information
- Incorrect costs or UOM

**Error correction approaches:**

**For minor errors (same day):**
- Create adjustment transactions to correct quantities
- Update location assignments through transfers
- Add missing serial or lot information

**For major errors (different products, large quantities):**
- Reverse the incorrect receipt completely
- Create new receipt with correct information
- Document the error and correction process

**For discovered errors (days/weeks later):**
- Investigate impact on other transactions
- Consider whether reversal or adjustment is better
- Ensure corrections don't violate period closing rules

**Example error correction:**
```
Error Discovered: Receipt entered 1,200 units instead of 120
Time Since Receipt: 3 days
Impact Analysis:
- 50 units already shipped to customers
- 1,150 units still in inventory
- Cost layers created for full 1,200 units

Correction Approach:
- Reverse original receipt (-1,200 units)
- Create correct receipt (+120 units)
- Investigate how 50 units were shipped
- Adjust cost layers and allocations
- Document full correction process
```

**Preventing receipt issues:**

Good practices reduce the likelihood of receipt problems.

**Process improvements:**
- Use barcode scanning to reduce entry errors
- Implement blind receiving for better accuracy
- Require supervisor approval for large variances
- Train staff on proper receiving procedures

**System safeguards:**
- Set reasonable over-receipt tolerances
- Configure automatic validations
- Require documentation for unusual situations
- Enable audit trails for all changes

**Quality controls:**
- Inspect high-value or critical items
- Verify serial numbers and lot information
- Check supplier certifications and documentation
- Monitor supplier performance trends

**Example prevention measures:**
```
Implemented Changes:
- Barcode scanning for all serialized items
- Blind receiving for orders over $10,000
- Supervisor approval for over-receipts >5%
- Photo documentation for damaged items

Results After 3 Months:
- Receipt errors reduced 60%
- Processing time improved 15%
- Quality issues caught earlier
- User satisfaction increased
```

---

## Bringing It All Together: A Day in the Life

Let me show you how receiving works in practice across different scenarios and roles.

**Monday, 7:00 AM — David, Receiving Clerk**

David arrives to find three deliveries waiting: a purchase order from ABC Electronics, a transfer from the Chicago warehouse, and a customer return.

**Delivery 1: Purchase Order Receipt**

The ABC Electronics truck contains 10 boxes labeled "Control Modules." David checks the delivery against Purchase Order PO-2025-0445:

- **Expected:** 120 Control Modules (10 cases of 12 each)
- **Delivery date:** On time
- **Condition:** All boxes intact, no damage

David opens each box and counts the contents:
- **Actual count:** 120 modules, all in good condition
- **Serial numbers:** SN-2025-1501 through SN-2025-1620
- **Documentation:** Packing slip matches PO exactly

He creates the receipt in the system:
```
Receipt: RCP-2025-000156
Source: PO-2025-0445
Product: Control Module CM-500
Quantity: 120 each
Location: Storage Bin B-15
Unit Cost: $150.00 (from PO)
Serial Numbers: Scanned all 120 serials
Status: Completed
```

The system creates a cost layer worth $18,000 and increases available inventory by 120 units.

**Delivery 2: Transfer Receipt**

The Chicago warehouse sent 50 safety valves via Transfer Order TR-2025-0089. David verifies the transfer documentation and counts the items:

- **Expected:** 50 Safety Valves
- **Actual:** 50 Safety Valves
- **Condition:** Good, properly packaged
- **Lot number:** LOT-2025-003 (matches transfer)

He processes the transfer receipt:
```
Transfer Receipt: TR-2025-0089
From: Chicago Warehouse, Bin C-20
To: Local Warehouse, Bin D-15
Product: Safety Valve SV-200
Quantity: 50 each
Lot: LOT-2025-003
Status: Transfer completed
```

The system moves the inventory from "in transit" to "on hand" at the local warehouse.

**Delivery 3: Customer Return (RMA)**

Customer XYZ Manufacturing returned a defective control module under RMA-2025-0089. David inspects the return:

- **Item:** Control Module, Serial SN-2024-5567
- **Return reason:** Defective - not functioning
- **Condition:** Appears damaged, needs inspection
- **Documentation:** RMA authorization valid

He creates the return receipt:
```
Return Receipt: RMA-2025-0089
Customer: XYZ Manufacturing
Product: Control Module CM-500
Serial: SN-2024-5567
Quantity: 1 each
Condition: Defective
Location: Quarantine for QC inspection
Status: Pending inspection
```

The item goes to quarantine pending quality inspection to determine if it can be repaired or must be scrapped.

**Monday, 10:30 AM — Lisa, Quality Inspector**

Lisa receives notification that the returned control module needs inspection. She examines the unit:

- **Visual inspection:** Burn marks on circuit board
- **Functional test:** Unit does not power on
- **Root cause:** Appears to be electrical overload
- **Disposition:** Cannot be repaired, recommend scrap

She updates the inspection results:
```
Quality Inspection: QC-2025-0234
Item: Control Module SN-2024-5567
Inspector: Lisa QC
Results: Failed - electrical damage
Disposition: Scrap (cannot be repaired)
Customer Credit: Approved for full refund
```

The system moves the item from quarantine to scrap location and creates a credit memo for the customer.

**Monday, 2:00 PM — Mike, Warehouse Supervisor**

Mike reviews the day's receiving activity and notices an issue with a delivery from last week. The system shows they received 1,200 units of a product, but the purchase order was only for 120 units.

**Investigation:**
- **Original receipt:** RCP-2025-000145 for 1,200 units
- **Purchase order:** PO-2025-0432 for 120 units
- **Error:** Extra zero entered during receipt (1,200 instead of 120)
- **Impact:** 50 units already shipped to customers, 1,150 still in inventory

Mike needs to correct this error:

1. **Reverse the incorrect receipt:**
```
Reversal: RCP-2025-000145-REV
Original Quantity: +1,200 units
Reversal Quantity: -1,200 units
Reason: Data entry error - should have been 120 units
```

2. **Create the correct receipt:**
```
Corrected Receipt: RCP-2025-000157
Quantity: +120 units (correct amount)
Reference: Correction of RCP-2025-000145
```

3. **Investigate the 50 units shipped:**
- Check how allocation was possible with incorrect inventory
- Verify customer actually received correct quantity
- Adjust allocations and cost layers as needed

4. **Document the correction:**
- Full audit trail of error discovery and correction
- Process improvement to prevent similar errors
- Training reminder for receiving staff

**Monday, 4:30 PM — Jennifer, Inventory Analyst**

Jennifer reviews receiving performance metrics for the month:

**Receiving Statistics:**
- **Total receipts:** 247 receipts
- **Total value:** $1.2M
- **Average processing time:** 18 minutes per receipt
- **Error rate:** 2.1% (down from 3.5% last month)

**Quality Metrics:**
- **Inspection rate:** 15% of receipts
- **Pass rate:** 94% (up from 91% last month)
- **Average inspection time:** 4.2 hours

**Supplier Performance:**
- **On-time delivery:** 87% (target: 90%)
- **Quality pass rate:** 96% (target: 95%)
- **Over-receipt frequency:** 8% (within tolerance)

**Areas for improvement:**
- ABC Electronics: 3 late deliveries this month
- DEF Suppliers: Higher than average quality failures
- Receiving Dock A: Slower processing than other docks

Jennifer prepares recommendations for next month's supplier review meeting.

**End of Day Summary:**

The receiving process handled diverse scenarios while maintaining accuracy and compliance:

- **Purchase order receipt:** Standard process, all items properly received and stored
- **Transfer receipt:** Inter-location movement completed successfully
- **Return receipt:** Quality issue identified and properly dispositioned
- **Error correction:** Data entry mistake discovered and corrected with full audit trail
- **Performance analysis:** Metrics tracked for continuous improvement

Each receipt created proper transactions, maintained cost accuracy, and provided complete audit trails. The system's flexibility handled routine deliveries and exceptional situations while ensuring inventory integrity throughout.

---

## Common Questions & Troubleshooting

### "What's the difference between a receipt and a transaction?"

A **receipt** is the business document that records what you received from a supplier, transfer, or return. A **transaction** is the system record that actually changes your inventory quantities.

When you create a receipt, the system automatically creates one or more transactions to update inventory. The receipt provides the business context (what, when, why), while the transaction provides the inventory impact (quantities, locations, costs).

### "Can I receive more than what was ordered?"

Yes, but it depends on your organization's over-receipt tolerance settings. The system will:

- **Auto-approve** if the overage is within your tolerance (e.g., 5%)
- **Require approval** if over tolerance but under maximum (e.g., 5-20%)
- **Block the receipt** if over your maximum limit (e.g., >20%)

Check with your administrator about your specific tolerance settings.

### "What happens if I enter the wrong quantity?"

If you catch the error immediately (same day), you can usually create an adjustment transaction to correct it. For larger errors or errors discovered later, you may need to:

1. **Reverse the incorrect receipt** completely
2. **Create a new receipt** with correct information
3. **Document the error** and correction process

The system maintains audit trails for all corrections.

### "Why do I need to enter serial numbers individually?"

Serial numbers provide unique identification for each item, which is essential for:

- **Warranty tracking** - knowing which specific unit a customer has
- **Quality control** - identifying affected units in case of defects
- **Regulatory compliance** - meeting FDA, aerospace, or other requirements
- **Theft prevention** - tracking high-value items

While it takes more time, accurate serial capture prevents much bigger problems later.

### "Can I receive items to different locations?"

Yes, you can assign different storage locations for different items in the same receipt. This is useful when:

- **Different products** have different storage requirements
- **Hazardous materials** need special storage areas
- **High-value items** go to secure locations
- **Quality holds** require quarantine areas

Just specify the appropriate location for each line item.

### "What if the supplier's packing slip doesn't match the purchase order?"

This is common and the system handles it well:

1. **Record what you actually received** (not what the packing slip says)
2. **Document the discrepancy** in your receipt notes
3. **Let the system calculate variances** against the purchase order
4. **Follow up with the supplier** about the difference

The three-way match (PO, receipt, invoice) will identify any issues during payment processing.

### "How do I handle damaged items?"

For damaged items:

1. **Separate damaged from good items** during receiving
2. **Receive good items** to normal storage locations
3. **Receive damaged items** to quarantine or damage location
4. **Document the damage** with photos if possible
5. **Create quality inspection requests** for damaged items
6. **Follow your organization's damage procedures** for supplier claims

### "Can I change a receipt after it's completed?"

Generally no - receipts become immutable once completed to maintain audit integrity. If changes are needed:

- **Minor corrections:** Use adjustment transactions
- **Major errors:** Reverse and recreate the receipt
- **Additional information:** Add notes or attachments

The original receipt always remains for audit purposes.

### "Why does the system require approval for some receipts?"

Approval requirements help maintain control and accuracy:

- **Over-receipts** beyond tolerance need management approval
- **High-value items** may require dual verification
- **Quality issues** need inspector approval
- **Unusual situations** require supervisor review

These controls prevent errors and ensure proper authorization for significant variances.

### "What's blind receiving and when should I use it?"

Blind receiving hides the expected quantities while you count, then compares your count to expectations afterward. Use it when:

- **Accuracy is critical** and you want unbiased counting
- **High-value items** need extra verification
- **Problem suppliers** have had accuracy issues
- **Audit requirements** mandate independent verification

It takes longer but significantly improves counting accuracy.

### "How do I handle returns that don't have RMA numbers?"

For returns without proper authorization:

1. **Don't refuse the return** if it's a legitimate customer
2. **Create an RMA** in your system first
3. **Process the return** against the new RMA
4. **Route to quality inspection** to determine condition
5. **Follow up** with sales/customer service about the unauthorized return

Document everything for proper customer service follow-up.

### "What if I receive the wrong product entirely?"

For completely wrong products:

1. **Don't receive them** into your inventory
2. **Contact the supplier** immediately
3. **Segregate the items** in a holding area
4. **Document the error** with photos
5. **Arrange return pickup** with the supplier
6. **Follow up** on your correct order

Only receive items into inventory that you actually want to keep.

---

## Chapter Summary

Receiving is where inventory accuracy begins. Every subsequent operation—from allocations to shipments to cost calculations—depends on receiving being done correctly. Master receiving, and you master the foundation of inventory control.

**Key takeaways:**

**Receiving creates the foundation** — Every piece of inventory starts its journey through receiving. Accuracy here prevents problems throughout the entire system.

**Process consistency matters** — Following the same verification, counting, and recording steps every time ensures reliable results and complete audit trails.

**UOM handling is critical** — Understanding how the system converts between different units of measure prevents confusion and maintains accuracy across all transactions.

**Quality control starts here** — Receiving is your first opportunity to catch defects, damage, and discrepancies before they affect customers or operations.

**Documentation enables traceability** — Proper recording of serial numbers, lot numbers, and costs provides the foundation for compliance and quality management.

**Configuration drives behavior** — Your organization's receiving settings determine approval requirements, tolerances, and workflows that match your business needs.

**Error correction maintains integrity** — When mistakes happen, proper reversal and correction procedures preserve audit trails while fixing the problems.

**Integration supports efficiency** — Receiving connects with purchase orders, quality control, allocations, and costing to create seamless business processes.

**Approval workflows provide control** — Tolerance settings and approval requirements ensure management oversight of significant variances and exceptions.

**History enables improvement** — Complete receipt history supports troubleshooting, audits, and performance analysis for continuous improvement.

Receiving transforms physical deliveries into accurate, valued, and trackable inventory. When receiving is done right, everything else becomes easier. When it's done wrong, problems compound quickly and become expensive to fix.

The next chapters will show you how to handle other inventory transactions—adjustments, transfers, and shipping. But remember that receiving is where accuracy begins. Every transaction that follows depends on the solid foundation that proper receiving provides.

Your inventory is only as accurate as your receiving process. Make receiving a priority, and accuracy will follow throughout your entire system.