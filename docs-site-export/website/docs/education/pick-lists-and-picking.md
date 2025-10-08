---
outline: deep
chapter_source: Chapter_11_Pick_Lists_and_Picking.md
---

# Chapter 11: Pick Lists and Picking

**Contract Reference:** `operations/allocations/paths/pick-core.yaml`

## Turning Orders into Action

Picture this: You have 15 orders ready to ship, with items scattered across your warehouse in different bins, zones, and locations. Some orders need just one item, others need dozens. Some are for VIP customers who need their orders today, others can wait until tomorrow. How do you organize the picking process to be efficient, accurate, and fair?

This is where pick lists come in. Pick lists transform allocations into organized, actionable work instructions that guide warehouse staff through the most efficient path to fulfill customer orders. They're not just lists of items to grab—they're sophisticated tools that optimize routes, prioritize work, and ensure accuracy while maintaining complete traceability.

But effective picking is more complex than it might first appear. It involves route optimization, priority management, batch processing, mobile technology integration, and real-time inventory validation. A well-designed picking process can dramatically improve warehouse productivity while reducing errors. A poorly designed one creates chaos, delays, and customer dissatisfaction.

Understanding how to create and execute pick lists effectively—from simple single-order picks to complex wave-based operations—is essential for warehouse efficiency and customer satisfaction. This chapter will show you how to master pick lists as both an operational tool and a competitive advantage.

---

## Pick List Workflow

The pick list workflow transforms allocations into systematic picking instructions that optimize warehouse operations while maintaining accuracy and traceability.

**Creating Pick Lists**

Pick lists can be created for individual orders or batched together for operational efficiency.

**Single-order pick lists:**
1. **Select allocation** ready for fulfillment
2. **Generate pick list** with item locations
3. **Assign to picker** or picking team
4. **Optimize route** through warehouse
5. **Print or send to mobile device**

**Batch pick lists:**
1. **Select multiple allocations** with similar characteristics
2. **Group by criteria** (zone, carrier, delivery date)
3. **Optimize picking sequence** for efficiency
4. **Generate consolidated pick list**
5. **Assign to appropriate picker**

**Pick list creation process:**
1. **Navigate to pick lists** - Inventory → Picking → Create Pick List
2. **Select source allocations** - Choose orders ready to pick
3. **Choose picking strategy** - Single, batch, or wave picking
4. **Set priority level** - Emergency, high, medium, or low
5. **Assign picker** - Select team member or leave unassigned
6. **Generate and distribute** - Create pick list and send to picker

**Example pick list creation:**
```
Pick List: PL-2025-0089
Strategy: Batch Picking
Orders Included: 5 orders (8 allocations)
Total Items: 23 line items
Estimated Pick Time: 45 minutes
Assigned To: Mike Wilson
Priority: High (VIP customers included)

Optimization Results:
- Route optimized for minimal travel
- Items grouped by zone
- Heavy items picked last
- Fragile items flagged for special handling
```

**Picking strategies:**

**Single-Order Picking** - One order at a time
- Best for: Low volume, complex orders, training
- Advantages: Simple, accurate, easy to track
- Disadvantages: Inefficient travel, low productivity

**Batch Picking** - Multiple orders together
- Best for: Medium volume, similar items
- Advantages: Reduced travel, higher productivity
- Disadvantages: More complex sorting, potential errors

**Wave Picking** - Coordinated batches by schedule
- Best for: High volume, scheduled operations
- Advantages: Maximum efficiency, coordinated workflow
- Disadvantages: Complex planning, requires coordination

**Zone Picking** - Pickers assigned to specific areas
- Best for: Large warehouses, specialized zones
- Advantages: Picker expertise, reduced congestion
- Disadvantages: Coordination required, potential bottlenecks

**Retrieving Pick List Details**

Pick list details provide pickers with all information needed to complete their work efficiently and accurately.

**Essential pick list information:**
- **Item details** - Product name, SKU, description
- **Quantities** - How many to pick for each item
- **Locations** - Specific bin, zone, or area
- **Sequence** - Optimized picking order
- **Special instructions** - Handling requirements, notes
- **Customer information** - Who the items are for
- **Priority indicators** - Urgency level

**Pick list detail view:**
```
Pick List: PL-2025-0089
Picker: Mike Wilson
Status: In Progress
Started: 2025-01-22 10:15 AM

Pick Sequence:
1. Zone A - Bin A-15-03
   Product: Control Module CM-500
   Quantity: 5 units
   Customer: ABC Construction
   Special: Fragile - handle with care

2. Zone A - Bin A-20-07
   Product: Safety Valve SV-200
   Quantity: 10 units
   Customer: Metro Manufacturing
   Special: Check expiration date

3. Zone B - Bin B-05-12
   Product: Pressure Sensor PS-100
   Quantity: 15 units
   Customer: Industrial Services
   Special: Serial numbers required

Progress: 2 of 8 items completed
Estimated Completion: 10:45 AM
```

**Mobile picking interface:**
- **Barcode scanning** for item verification
- **Quantity confirmation** with validation
- **Location verification** to prevent errors
- **Exception handling** for discrepancies
- **Real-time updates** to warehouse system

**Confirming Picks**

Pick confirmation ensures accuracy and updates inventory records in real-time.

**Pick confirmation process:**
1. **Scan item barcode** to verify correct product
2. **Confirm quantity** picked vs. requested
3. **Verify location** to ensure accuracy
4. **Note any exceptions** (short picks, damage, etc.)
5. **Update system** with actual quantities
6. **Move to next item** or complete pick list

**Exception handling:**
- **Short pick** - Less inventory than expected
- **Overpick** - More inventory found than expected
- **Damaged items** - Products not suitable for shipment
- **Wrong location** - Items not where expected
- **Missing items** - Products not found at all

**Example pick confirmation:**
```
Item: Control Module CM-500
Location: Bin A-15-03
Requested: 5 units
Found: 5 units
Condition: Good
Serial Numbers: SN-2025-3401, SN-2025-3402, SN-2025-3403, SN-2025-3404, SN-2025-3405
Confirmation: Complete - 5 units picked

System Updates:
- Inventory decreased by 5 units at A-15-03
- Allocation updated to "picked" status
- Serial numbers linked to allocation
- Pick list progress updated
```

**Pick confirmation with exceptions:**
```
Item: Safety Valve SV-200
Location: Bin A-20-07
Requested: 10 units
Found: 8 units
Exception: Short Pick - 2 units missing
Action: Pick 8 units, create cycle count for location
Notes: Possible inventory discrepancy

System Updates:
- Inventory decreased by 8 units at A-20-07
- Allocation partially picked (8 of 10)
- Cycle count task created for A-20-07
- Manager notification sent
- Customer service alerted for partial shipment
```

**Mobile Picking with Stock Scan Lookups**

Mobile picking technology enhances accuracy and efficiency through real-time validation and guidance.

**Mobile picking features:**
- **Barcode scanning** for product and location verification
- **Real-time inventory** lookup and validation
- **Route optimization** with turn-by-turn directions
- **Exception handling** with supervisor escalation
- **Voice picking** for hands-free operation
- **Photo capture** for damage documentation

**Stock scan lookup process:**
1. **Scan location barcode** to verify position
2. **System displays** expected items at location
3. **Scan product barcode** to confirm item
4. **System validates** product matches pick list
5. **Confirm quantity** and condition
6. **System updates** inventory and allocation

**Example mobile picking session:**
```
Mobile Device: Scanner-07
Picker: Sarah Johnson
Pick List: PL-2025-0091
Current Item: 3 of 12

Scan Location: A-15-03
✓ Location Confirmed

Expected Items:
- Control Module CM-500: 5 units
- Pressure Sensor PS-100: 3 units

Scan Product: [Barcode scanned]
✓ Control Module CM-500 confirmed

Quantity Check: 5 units requested
Enter Picked: 5
✓ Quantity confirmed

Serial Capture: Required
Scan Serials: [5 serials scanned]
✓ All serials captured

Next Location: A-20-07 (15 feet, turn right)
```

**Mobile picking benefits:**
- **Reduced errors** through barcode validation
- **Faster picking** with optimized routes
- **Real-time updates** to inventory system
- **Exception handling** with immediate escalation
- **Performance tracking** for continuous improvement
- **Training support** for new pickers

**Advanced mobile features:**
- **Voice-directed picking** for hands-free operation
- **Augmented reality** for location guidance
- **Predictive analytics** for route optimization
- **Integration with WMS** for seamless operation
- **Offline capability** for network interruptions

---

## Bringing It All Together: A Day in the Life

Let me show you how pick lists work in practice across different scenarios and operational needs.

**Monday, 7:00 AM — Lisa, Warehouse Supervisor**

Lisa starts her day by reviewing the picking queue and planning the day's operations.

**Morning Pick Planning:**

Lisa checks the overnight orders and allocation status:
- 23 orders ready to ship
- 8 emergency/expedited orders
- 15 standard orders
- 3 large orders requiring special handling
- 2 international shipments needing customs documentation

She prioritizes the picking schedule:
```
Priority 1: Emergency Orders (8 orders)
- Metro Manufacturing: Production line down
- ABC Construction: Job site delivery today
- Industrial Services: Critical repair parts

Priority 2: VIP Customers (5 orders)
- Large volume customers
- Contract commitments
- Service level agreements

Priority 3: Standard Orders (10 orders)
- Regular delivery schedule
- Normal processing time
- Batch picking opportunities
```

**Emergency Pick List Creation:**
```
Pick List: PL-2025-0101 (EMERGENCY)
Orders: 3 emergency orders
Items: 8 line items
Picker: Tom Wilson (senior picker)
Strategy: Single-order picking for accuracy
Estimated Time: 30 minutes
Special Instructions: Rush processing, verify all serials
```

**Monday, 7:30 AM — Tom, Senior Picker**

Tom receives the emergency pick list and begins immediate processing.

**Emergency Pick Execution:**

Tom's mobile device shows the optimized route:
```
Emergency Pick Route:
1. Zone A, Bin A-15-03: Control Module CM-500 (5 units)
2. Zone A, Bin A-20-07: Safety Valve SV-200 (2 units)
3. Zone B, Bin B-10-15: Pressure Sensor PS-100 (3 units)

Total Distance: 180 feet
Estimated Time: 25 minutes
Priority: EMERGENCY - Complete first
```

**Pick 1: Control Modules**
```
Location: A-15-03
Scan Location: ✓ Confirmed
Product: Control Module CM-500
Scan Product: ✓ Confirmed
Requested: 5 units
Available: 5 units
Condition: Good
Serial Numbers: [5 serials scanned and verified]
Time: 7:35 AM - Pick completed
```

**Pick 2: Safety Valves**
```
Location: A-20-07
Scan Location: ✓ Confirmed
Product: Safety Valve SV-200
Scan Product: ✓ Confirmed
Requested: 2 units
Available: 2 units
Condition: Good
Lot Number: LOT-2025-089
Time: 7:38 AM - Pick completed
```

**Pick 3: Pressure Sensors**
```
Location: B-10-15
Scan Location: ✓ Confirmed
Product: Pressure Sensor PS-100
Scan Product: ✓ Confirmed
Requested: 3 units
Available: 3 units
Condition: Good
Serial Numbers: [3 serials scanned and verified]
Time: 7:42 AM - Pick completed

Emergency Pick List: COMPLETED
Total Time: 12 minutes (ahead of schedule)
Accuracy: 100%
Next Action: Deliver to expedited shipping area
```

**Monday, 8:00 AM — Sarah, Batch Picker**

Sarah receives a batch pick list for VIP customers to optimize efficiency.

**VIP Customer Batch Pick:**
```
Pick List: PL-2025-0102 (VIP BATCH)
Orders: 5 VIP customer orders
Items: 18 line items
Strategy: Zone-based batch picking
Cart: Large picking cart with dividers
Estimated Time: 55 minutes
```

**Zone A Picking:**
```
Zone A Items (8 items):
1. Control Module CM-500: 15 units (3 customers)
2. Safety Valve SV-200: 8 units (2 customers)
3. Pressure Sensor PS-100: 12 units (2 customers)

Batch Picking Process:
- Pick total quantities for all customers
- Use cart dividers to separate by customer
- Scan each item to verify accuracy
- System tracks quantities by customer allocation
```

**Batch pick execution:**
```
Location: A-15-03 (Control Modules)
Total Needed: 15 units
Customer A: 5 units → Cart Section 1
Customer B: 7 units → Cart Section 2
Customer C: 3 units → Cart Section 3
Scan Verification: ✓ All quantities confirmed
Serial Tracking: Individual serials by customer

Location: A-20-07 (Safety Valves)
Total Needed: 8 units
Customer A: 3 units → Cart Section 1
Customer D: 5 units → Cart Section 4
Lot Numbers: LOT-2025-089 (all units)
Scan Verification: ✓ All quantities confirmed
```

**Monday, 10:00 AM — Mike, Zone Picker**

Mike handles Zone B picking as part of the coordinated wave operation.

**Zone B Wave Picking:**
```
Wave: WAVE-2025-0045
Zone: B (Electronics and Sensors)
Pick Lists: 4 batch pick lists
Total Items: 35 line items
Coordination: Synchronized with other zones
Target Completion: 11:00 AM
```

**Zone B pick execution:**
```
Pick List: PL-2025-0103 (Zone B portion)
Items in Zone B:
1. Pressure Sensor PS-100: 25 units (6 customers)
2. Temperature Sensor TS-50: 12 units (3 customers)
3. Flow Meter FM-200: 8 units (2 customers)

Picking Strategy:
- Pick all quantities for each product
- Use totes labeled by customer
- Scan verification at each step
- Coordinate timing with other zones
```

**Exception handling:**
```
Location: B-05-12 (Pressure Sensors)
Expected: 25 units
Found: 22 units
Exception: Short Pick - 3 units missing

Actions Taken:
1. Pick available 22 units
2. Scan exception code for short pick
3. System creates cycle count task
4. Supervisor notification sent
5. Alternative location checked
6. Customer service alerted for affected orders

Resolution:
- Found 3 units in overflow location B-05-13
- Completed pick with full quantities
- Updated location records
- No customer impact
```

**Monday, 11:30 AM — Jennifer, Pick List Coordinator**

Jennifer monitors pick list performance and handles exceptions.

**Performance Monitoring:**
```
Morning Pick Performance:
Emergency Picks: 3 completed (100% on time)
VIP Batch Picks: 5 completed (average 52 minutes)
Standard Picks: 12 in progress
Wave Coordination: On schedule

Picker Performance:
Tom Wilson: 98% accuracy, 15% faster than target
Sarah Johnson: 99% accuracy, on target time
Mike Rodriguez: 97% accuracy, 8% faster than target

Exception Summary:
- Short picks: 2 (resolved)
- Damaged items: 1 (replacement picked)
- Location errors: 0
- System issues: 0
```

**Pick list optimization:**
```
Optimization Opportunities Identified:
1. Batch size optimization: Increase from 5 to 7 orders
2. Route refinement: Reduce Zone A travel by 12%
3. Picker specialization: Assign complex picks to senior staff
4. Technology upgrade: Voice picking for high-volume areas

Implementation Plan:
- Test larger batch sizes this afternoon
- Update route optimization algorithm
- Provide additional training for junior pickers
- Pilot voice picking in Zone C next week
```

**Monday, 2:00 PM — Afternoon Wave Processing**

The team processes the afternoon wave with optimized procedures.

**Afternoon Wave Setup:**
```
Wave: WAVE-2025-0046
Orders: 15 standard orders
Strategy: Optimized batch picking
Batch Size: 7 orders (increased from 5)
Estimated Completion: 3:30 PM
```

**Improved batch picking:**
```
Pick List: PL-2025-0104 (Optimized Batch)
Orders: 7 orders
Items: 28 line items
Route Optimization: 15% reduction in travel distance
Picker: Sarah Johnson
Cart Configuration: 7-section divider system

Performance Results:
- Actual Time: 48 minutes (vs. 55 minute estimate)
- Accuracy: 100%
- Travel Distance: 285 feet (vs. 320 feet previous)
- Picker Satisfaction: Improved (less walking)
```

**Monday, 4:00 PM — Daily Performance Review**

The team reviews the day's picking performance and identifies improvements.

**Daily Metrics:**
```
Pick List Performance:
- Total pick lists: 23
- Emergency picks: 3 (100% on time)
- VIP picks: 8 (average 50 minutes)
- Standard picks: 12 (average 42 minutes)
- Overall accuracy: 98.5%

Productivity Metrics:
- Lines picked per hour: 45 (target: 40)
- Travel distance per pick: 12% reduction
- Exception rate: 2.1% (target: <3%)
- Customer satisfaction: 4.9/5.0

Technology Performance:
- Mobile scanner uptime: 99.8%
- Barcode scan accuracy: 99.9%
- System response time: <2 seconds
- Exception resolution time: 8 minutes average
```

**Process Improvements:**
```
Successful Optimizations:
- Increased batch size improved efficiency
- Route optimization reduced travel time
- Exception handling procedures worked well
- Mobile technology performed reliably

Areas for Improvement:
- Zone coordination timing
- New picker training program
- Voice picking pilot preparation
- Inventory accuracy in overflow locations

Action Items:
- Implement voice picking pilot next week
- Additional training for junior pickers
- Review overflow location management
- Update standard operating procedures
```

**End of Day Results:**

The pick list system successfully handled diverse operational requirements while maintaining high performance:

**Emergency Response:** Critical orders processed within 30 minutes with 100% accuracy

**Operational Efficiency:** Batch picking optimizations reduced travel time and improved productivity

**Quality Control:** Exception handling procedures maintained accuracy while resolving issues quickly

**Technology Integration:** Mobile picking technology provided real-time validation and performance tracking

**Continuous Improvement:** Performance monitoring identified optimization opportunities and guided process refinements

Each pick list served its purpose while contributing to overall warehouse efficiency and customer satisfaction.

---

## Common Questions & Troubleshooting

### "What's the difference between single-order and batch picking?"

**Single-order picking** handles one order at a time, while **batch picking** combines multiple orders for efficiency:

- **Single-order**: Simple, accurate, easy to track, but less efficient
- **Batch picking**: More efficient travel, higher productivity, but requires sorting

Choose based on your volume, complexity, and accuracy requirements.

### "How do I optimize pick routes?"

Pick route optimization considers several factors:

- **Warehouse layout** and traffic patterns
- **Item locations** and picking sequence
- **Product characteristics** (weight, fragility, size)
- **Picker capabilities** and experience
- **Equipment requirements** (carts, ladders, etc.)

Most systems can automatically optimize routes based on these factors.

### "What should I do when items aren't where the system says they are?"

When items are missing from expected locations:

1. **Check nearby locations** - Items may have been moved
2. **Scan exception code** - Record the discrepancy
3. **Create cycle count** - Investigate inventory accuracy
4. **Check alternative locations** - Overflow or secondary storage
5. **Notify supervisor** - Get help resolving the issue

Document everything for inventory accuracy improvement.

### "How do I handle partial picks when there's not enough inventory?"

For short picks:

1. **Pick what's available** - Don't leave empty-handed
2. **Record actual quantity** - Update the system accurately
3. **Create exception** - Document the shortage
4. **Check alternative sources** - Other locations or incoming inventory
5. **Notify customer service** - Alert about potential delays

The system should automatically adjust allocations and shipments.

### "Can I use mobile devices for picking?"

Yes, mobile picking offers significant advantages:

- **Barcode scanning** for accuracy
- **Real-time validation** of items and quantities
- **Route optimization** with turn-by-turn directions
- **Exception handling** with immediate escalation
- **Performance tracking** for continuous improvement

Mobile picking typically improves both speed and accuracy.

### "How do I prioritize pick lists when everything seems urgent?"

Use systematic prioritization:

1. **Emergency orders** - Production down, critical situations
2. **VIP customers** - Contract commitments, high-value accounts
3. **Time-sensitive** - Same-day delivery, appointment deliveries
4. **Standard orders** - First-in-first-out within priority levels
5. **Batch opportunities** - Group similar orders for efficiency

Clear priority rules prevent constant firefighting.

### "What if a picker finds damaged inventory during picking?"

When damaged items are discovered:

1. **Don't pick damaged items** - Quality is more important than speed
2. **Scan damage exception** - Record the issue
3. **Take photos** - Document the damage
4. **Check for alternatives** - Look for replacement inventory
5. **Notify quality control** - Investigate damage cause

Better to delay shipment than ship damaged goods.

### "How do I measure picking performance?"

Key picking metrics include:

- **Lines picked per hour** - Productivity measurement
- **Pick accuracy** - Percentage of correct picks
- **Travel distance** - Efficiency of routes
- **Exception rate** - Frequency of problems
- **Customer satisfaction** - Ultimate measure of success

Track trends over time and compare to industry benchmarks.

### "Can I batch pick for different customers?"

Yes, but with careful organization:

- **Use divided carts** - Separate sections for each customer
- **Label clearly** - Avoid mixing orders
- **Scan verification** - Confirm items go to correct customer
- **Sort immediately** - Don't let items get mixed
- **Double-check** - Verify before moving to shipping

Proper organization prevents costly shipping errors.

### "What about voice-directed picking?"

Voice picking offers hands-free operation:

- **Spoken instructions** - System tells picker what to do
- **Voice confirmation** - Picker confirms actions verbally
- **Hands-free operation** - No need to handle devices
- **Eyes-free picking** - Focus on items, not screens
- **Improved ergonomics** - Reduced repetitive strain

Best for high-volume, repetitive picking operations.

### "How do I handle returns or put-backs during picking?"

When items need to be returned to inventory:

1. **Scan return code** - Record the put-back
2. **Verify location** - Ensure correct placement
3. **Update quantities** - Adjust inventory records
4. **Document reason** - Why items weren't picked
5. **Check allocation** - May need reallocation

Proper put-back procedures maintain inventory accuracy.

---

## Chapter Summary

Pick lists transform allocations into efficient, accurate warehouse operations that drive customer satisfaction while optimizing productivity and maintaining complete traceability.

**Key takeaways:**

**Pick lists optimize warehouse efficiency** — Systematic route optimization and batching strategies dramatically reduce travel time while improving picker productivity.

**Mobile technology enhances accuracy** — Barcode scanning, real-time validation, and exception handling reduce errors while providing immediate feedback and guidance.

**Picking strategies scale with volume** — From single-order picking for low volume to wave picking for high volume, the right strategy matches operational needs.

**Exception handling maintains quality** — Systematic procedures for short picks, damaged items, and location errors ensure problems are resolved quickly without compromising accuracy.

**Batch picking balances efficiency and complexity** — Combining multiple orders reduces travel time but requires careful organization to prevent mixing and sorting errors.

**Performance monitoring drives improvement** — Regular analysis of picking metrics identifies bottlenecks and optimization opportunities for continuous improvement.

**Priority management ensures service levels** — Clear prioritization rules ensure emergency and VIP orders receive appropriate attention while maintaining fairness.

**Integration maintains system integrity** — Real-time updates to inventory and allocations ensure the warehouse system stays synchronized with actual operations.

**Route optimization reduces waste** — Intelligent sequencing minimizes travel distance and time while considering product characteristics and picker capabilities.

**Training and procedures ensure consistency** — Standardized processes and proper training ensure all pickers follow best practices regardless of experience level.

Pick lists are more than just work instructions—they're the operational engine that transforms customer orders into satisfied deliveries. When designed and executed well, they become a competitive advantage that drives both efficiency and accuracy.

The next chapter will show you how to manage backorders when inventory shortages occur. But remember that excellent picking operations reduce backorders by maximizing the efficiency of available inventory. Master pick lists, and you master a critical component of warehouse excellence.

Your warehouse efficiency directly impacts customer satisfaction and operational costs. Make picking a strength, and you create lasting competitive advantages that drive profitability and growth.