---
outline: deep
chapter_source: Chapter_08_Shipping_and_Deliveries.md
---

# Chapter 8: Shipping and Deliveries

**Contract References:** `operations/transactions/paths/shipping-core.yaml`, `delivery-core.yaml`

## Getting Products to Your Customers

Picture this: Your customer has placed an order, you've allocated the inventory, and now it's time to get those products into their hands. Whether it's a single control module going to a local contractor, a full pallet of safety equipment heading to a construction site, or emergency parts rushing to restore a production line, shipping is where your inventory management meets customer satisfaction.

Shipping isn't just about putting items in boxes and slapping on labels. It's about orchestrating a complex process that involves picking the right items, packing them properly, choosing the best carrier and service, generating accurate documentation, and tracking everything until it reaches its destination. Done right, shipping delights customers and builds loyalty. Done wrong, it creates complaints, returns, and lost business.

But shipping is also where inventory accuracy becomes critical. Every item that leaves your facility must be properly deducted from inventory, allocated quantities must be updated correctly, and cost layers must be consumed accurately. A shipping error doesn't just affect customer service—it can throw off your entire inventory system.

Understanding how to execute shipping operations effectively—from simple single-item shipments to complex multi-package deliveries—is essential for maintaining both customer satisfaction and inventory accuracy. This chapter will show you how to master the complete shipping and delivery process.

### Quick Confidence Check

<LearningQuiz
  question="Why scan shipments at staging before truck loading?"
  :options="[&quot;To confirm every pick is present and catch stray totes early&quot;, &quot;To update product cost to the latest average&quot;, &quot;To signal procurement that more cartons are needed&quot;]"
  :answer-index="0"
  :explanations="[&quot;Verification prevents loading the wrong freight.&quot;, &quot;Cost changes are unrelated to staging scans.&quot;, &quot;Carton planning follows packaging analysis, not staging scans.&quot;]"
/>

---

## Shipping Process

The shipping process transforms allocated inventory into customer deliveries through a carefully orchestrated workflow that maintains accuracy while optimizing efficiency.

**Creating Shipments (Single and Batch)**

Shipments can be created individually for specific orders or in batches for operational efficiency.

**Single shipment creation:**

1. **Start with a valid allocation**
   - Verify the allocation exists and is active
   - Confirm sufficient allocated quantity
   - Check that items are available at the shipping location

2. **Gather shipment information**
   - Shipping address and contact details
   - Preferred carrier and service level
   - Special instructions or requirements
   - Package specifications if known

3. **Create the shipment**
   - Navigate to Inventory → Shipping → Create Shipment
   - Select the allocation(s) to fulfill
   - Enter destination address
   - Choose carrier and service
   - Add any special handling requirements

4. **Review and confirm**
   - Verify all details are correct
   - Check estimated shipping cost
   - Confirm delivery timeframe meets requirements
   - Submit for processing

**Example single shipment:**
```
Shipment: SHP-2025-0234
Order: SO-2025-1156
Allocation: 15 Control Modules CM-500
Ship From: Main Warehouse
Ship To: ABC Construction, 456 Industrial Blvd, Dallas, TX
Carrier: UPS Ground
Estimated Cost: $18.50
Estimated Delivery: 2025-01-23
```

**Batch shipment creation:**

When you have multiple orders ready to ship, batch processing improves efficiency:

1. **Select orders for batch processing**
   - Filter by ship date, carrier, or destination
   - Choose orders with complete allocations
   - Consider consolidation opportunities

2. **Review batch for optimization**
   - Group by carrier for better rates
   - Identify consolidation opportunities
   - Check for special handling requirements

3. **Process the batch**
   - Generate pick lists for all orders
   - Create shipments with optimized routing
   - Print labels and documentation together

**Example batch processing:**
```
Batch: BATCH-2025-0089
Orders: 25 orders ready to ship
Carriers: UPS (18 orders), FedEx (7 orders)
Total Packages: 31 packages
Estimated Processing Time: 45 minutes
Cost Savings: $127 through consolidation
```

**Updating Shipment Status**

Shipments progress through several status stages that reflect their physical and system state.

**Shipment status progression:**
- **Draft** - Shipment created but not yet processed
- **Released** - Ready for picking and packing
- **Picking** - Items being picked from inventory
- **Picked** - All items picked and staged
- **Packing** - Items being packed for shipment
- **Packed** - Ready for carrier pickup
- **Shipped** - Picked up by carrier, tracking active
- **In Transit** - Moving through carrier network
- **Delivered** - Successfully delivered to customer

**Status update triggers:**

**Automatic updates:**
- Carrier pickup scans update to "Shipped"
- Tracking events update "In Transit" status
- Delivery confirmation updates to "Delivered"
- Exception events trigger alerts

**Manual updates:**
- Warehouse staff update pick/pack status
- Shipping personnel confirm carrier pickup
- Customer service handles exceptions

**Example status tracking:**
```
Shipment: SHP-2025-0234
Created: 2025-01-20 8:00 AM - Draft
Released: 2025-01-20 8:15 AM - Released for picking
Picked: 2025-01-20 10:30 AM - All items picked
Packed: 2025-01-20 11:45 AM - Packed and labeled
Shipped: 2025-01-20 2:15 PM - UPS pickup scan
In Transit: 2025-01-20 6:30 PM - Departed origin facility
Delivered: 2025-01-22 10:15 AM - Signed by J. Smith
```

**Tracking Delivery Progress**

Effective delivery tracking keeps customers informed and helps resolve issues quickly.

**Tracking information sources:**
- Carrier tracking systems (UPS, FedEx, etc.)
- Customer delivery confirmations
- Proof of delivery documentation
- Exception and delay notifications

**Customer communication:**
- Automatic tracking notifications
- Proactive delay alerts
- Delivery confirmation messages
- Exception resolution updates

**Internal monitoring:**
- Dashboard views of in-transit shipments
- Exception reports for delayed deliveries
- Performance metrics by carrier
- Customer satisfaction tracking

**Example tracking communication:**
```
Customer: ABC Construction
Shipment: SHP-2025-0234
Tracking: 1Z999AA10123456784

Notifications Sent:
- Shipment confirmation with tracking number
- In-transit update with estimated delivery
- Out-for-delivery notification
- Delivery confirmation with signature

Customer Portal Access:
- Real-time tracking status
- Delivery history
- Proof of delivery documents
- Reorder quick links
```

**Reversing Shipments When Needed**

Sometimes shipments need to be reversed due to errors, cancellations, or other issues.

**When to reverse shipments:**
- Customer cancellation before delivery
- Shipping errors discovered after dispatch
- Damaged items requiring replacement
- Address errors preventing delivery
- Carrier service failures

**Reversal process:**

**Before carrier pickup:**
1. Cancel the shipment with carrier
2. Void shipping labels
3. Return items to inventory
4. Update allocation status
5. Notify customer of cancellation

**After carrier pickup:**
1. Request return from carrier (if possible)
2. Create return shipment
3. Process as return when received
4. Handle customer communication
5. Manage cost implications

**Example shipment reversal:**
```
Original Shipment: SHP-2025-0234
Reversal Reason: Customer address error discovered
Reversal Time: Before carrier pickup
Actions Taken:
- Cancelled UPS shipment
- Voided shipping label
- Returned 15 units to inventory
- Updated allocation status to "allocated"
- Contacted customer for correct address
- Created new shipment with corrected address
```

**Reversal impact on inventory:**
- Allocated quantities are restored
- Inventory returns to original location
- Cost layers are restored if possible
- Serial/lot tracking is maintained
- Audit trail records all changes

---

## Deliveries

Deliveries represent the final step in the fulfillment process, confirming that products have reached their intended destination.

**Creating Deliveries (Single and Batch up to 100/250)**

Delivery confirmations can be created individually or in batches, with system limits to ensure performance.

**Single delivery confirmation:**

1. **Identify the delivery event**
   - Customer confirms receipt
   - Carrier provides proof of delivery
   - Field technician completes installation
   - Direct delivery to customer site

2. **Gather delivery details**
   - Delivery date and time
   - Recipient name and signature
   - Delivery location specifics
   - Any delivery notes or exceptions

3. **Create delivery confirmation**
   - Navigate to Inventory → Deliveries → Confirm Delivery
   - Select the shipment or allocation
   - Enter delivery details
   - Upload proof of delivery if available

4. **Complete the delivery**
   - Update shipment status to "Delivered"
   - Update allocation status to "Delivered"
   - Trigger customer notifications
   - Complete the fulfillment cycle

**Example delivery confirmation:**
```
Delivery: DEL-2025-0156
Shipment: SHP-2025-0234
Delivered: 2025-01-22 10:15 AM
Recipient: John Smith, ABC Construction
Location: Main office receiving dock
Signature: J. Smith
Notes: All items received in good condition
Proof of Delivery: Photo and signature captured
```

**Batch delivery processing:**

For high-volume operations, batch delivery processing handles multiple confirmations efficiently:

**Batch limits:**
- Standard batch: Up to 100 deliveries
- Large batch: Up to 250 deliveries (with special handling)
- Processing time: Varies by batch size and complexity

**Batch processing steps:**
1. **Prepare delivery data**
   - Import from carrier systems
   - Validate delivery information
   - Match to shipments and allocations

2. **Process the batch**
   - Create delivery confirmations
   - Update shipment statuses
   - Update allocation statuses
   - Generate customer notifications

3. **Review and confirm**
   - Check for processing errors
   - Resolve any exceptions
   - Confirm all deliveries processed

**Example batch delivery:**
```
Batch: BATCH-DEL-2025-0045
Deliveries: 87 confirmations
Source: UPS delivery data import
Processing Time: 12 minutes
Success Rate: 98.9% (86 successful, 1 exception)
Exception: Address mismatch requiring manual review
```

**Linking Deliveries to Allocations**

Deliveries must be properly linked to their source allocations to maintain accurate fulfillment tracking.

**Allocation-delivery relationship:**
- Each delivery confirms fulfillment of specific allocations
- Allocation status updates from "In Transit" to "Delivered"
- Quantity tracking ensures complete fulfillment
- Customer orders show delivery completion

**Linking process:**
1. **Identify source allocation**
   - Match by shipment reference
   - Verify product and quantity
   - Confirm customer and destination

2. **Update allocation status**
   - Change status to "Delivered"
   - Record delivery date and details
   - Update quantity delivered
   - Complete allocation lifecycle

3. **Maintain audit trail**
   - Link delivery to original order
   - Record delivery confirmation details
   - Preserve proof of delivery
   - Enable delivery history tracking

**Example allocation linking:**
```
Original Order: SO-2025-1156
Allocation: ALLOC-2025-0789
- Product: Control Module CM-500
- Quantity: 15 units
- Status: Allocated → In Transit → Delivered

Delivery Confirmation: DEL-2025-0156
- Quantity Delivered: 15 units
- Delivery Date: 2025-01-22
- Recipient: John Smith
- Status: Complete

Result: Order fully fulfilled, customer satisfied
```

**Tracking Delivery Confirmations**

Comprehensive delivery tracking provides visibility into fulfillment performance and customer satisfaction.

**Delivery tracking metrics:**
- On-time delivery percentage
- Delivery confirmation rate
- Customer satisfaction scores
- Exception and damage rates
- Average delivery time

**Tracking capabilities:**
- Real-time delivery status
- Historical delivery performance
- Customer delivery preferences
- Carrier performance comparison
- Geographic delivery analysis

**Example delivery tracking dashboard:**
```
Delivery Performance - January 2025
Total Deliveries: 1,247
On-Time Rate: 94.2%
Confirmation Rate: 98.7%
Average Delivery Time: 2.3 days
Customer Satisfaction: 4.6/5.0

Top Performing Carriers:
1. UPS Ground: 96.1% on-time
2. FedEx Express: 95.8% on-time
3. USPS Priority: 92.4% on-time

Exception Analysis:
- Weather delays: 3.2%
- Address issues: 1.8%
- Damage in transit: 0.3%
```

**Checking Shipment Delivery Status**

Regular monitoring of shipment delivery status helps identify issues and improve customer service.

**Status checking methods:**
- Automated carrier tracking integration
- Customer portal self-service
- Customer service inquiry tools
- Mobile app notifications
- Email and SMS alerts

**Status information includes:**
- Current shipment location
- Estimated delivery date/time
- Delivery attempts and outcomes
- Exception details and resolution
- Proof of delivery documentation

**Proactive status management:**
- Early warning for potential delays
- Automatic customer notifications
- Exception escalation procedures
- Alternative delivery arrangements
- Customer satisfaction follow-up

**Example status monitoring:**
```
Shipment: SHP-2025-0234
Customer: ABC Construction
Status Check: 2025-01-21 3:00 PM

Current Status: In Transit
Location: Dallas, TX Distribution Center
Estimated Delivery: Tomorrow by 5:00 PM
Delivery Attempt: First attempt scheduled
Special Instructions: Signature required

Proactive Actions:
- Customer notified of on-time delivery
- Delivery reminder sent this morning
- Backup contact verified
- No exceptions anticipated
```

**Delivery exception handling:**

When deliveries don't go as planned, effective exception handling maintains customer satisfaction:

**Common delivery exceptions:**
- Customer not available for delivery
- Incorrect or incomplete address
- Access restrictions at delivery location
- Package damage during transit
- Weather or natural disaster delays

**Exception resolution process:**
1. **Identify the exception** through carrier alerts or customer contact
2. **Assess the situation** and determine best resolution approach
3. **Communicate with customer** about the issue and options
4. **Implement solution** such as redelivery, address correction, or replacement
5. **Follow up** to ensure customer satisfaction

**Example exception resolution:**
```
Exception: Customer not available for delivery
Shipment: SHP-2025-0234
Customer: ABC Construction

Resolution Steps:
1. Carrier attempted delivery at 10:15 AM
2. Left delivery notice with contact information
3. Customer service called customer at 11:00 AM
4. Arranged redelivery for next day 2:00-4:00 PM
5. Customer confirmed availability
6. Successful delivery completed next day
7. Customer satisfaction survey: 5/5 stars
```

---

## Bringing It All Together: A Day in the Life

Let me show you how shipping and deliveries work in practice across different scenarios and operational needs.

**Monday, 7:30 AM — Sarah, Shipping Coordinator**

Sarah starts her day by reviewing the shipping queue and planning the day's operations.

**Morning Shipping Review:**

Sarah checks the shipping dashboard:
- 23 orders ready to ship today
- 8 orders requiring expedited service
- 3 international shipments needing customs documentation
- 2 large orders requiring multiple packages

She prioritizes the expedited orders and begins processing:

**Expedited Order 1: Emergency Repair Parts**
```
Order: SO-2025-1201
Customer: Metro Manufacturing
Items: 1 Control Module CM-500, 2 Safety Valves SV-200
Service Required: Next Day Air
Reason: Production line down
```

Sarah creates the shipment:
```
Shipment: SHP-2025-0301
Allocation: ALLOC-2025-0892
Ship From: Main Warehouse
Carrier: FedEx Next Day Air
Estimated Cost: $89.50
Delivery Commitment: Tomorrow by 10:30 AM
Special Instructions: Call customer upon delivery
```

**Monday, 8:45 AM — Mike, Warehouse Picker**

Mike receives the pick list for the morning's expedited shipments.

**Emergency Pick Processing:**

Mike's pick list shows:
```
Pick List: PL-2025-0156
Priority: URGENT
Wave: Emergency shipments
Total Picks: 8 items across 3 orders

Pick Sequence:
1. Location A-15-03: Control Module CM-500 (SN: SN-2025-3401)
2. Location B-20-07: Safety Valve SV-200 (Qty: 2)
3. Location C-10-12: Pressure Sensor PS-100 (Qty: 5)
```

Mike picks the items efficiently:
```
Pick Results:
- Control Module: Picked SN-2025-3401 (verified serial)
- Safety Valves: Picked 2 units from lot LOT-2025-089
- Pressure Sensors: Picked 5 units, all in good condition
Pick Completion: 8:52 AM (7 minutes)
Accuracy: 100%
```

**Monday, 9:15 AM — Lisa, Packing Specialist**

Lisa receives the picked items and begins packing for shipment.

**Emergency Shipment Packing:**

Lisa processes the Metro Manufacturing order:
```
Packing Station: PACK-02
Shipment: SHP-2025-0301
Items to Pack:
- 1 Control Module (fragile, anti-static packaging)
- 2 Safety Valves (standard packaging)

Packing Process:
1. Verified items match pick list
2. Wrapped control module in anti-static material
3. Used appropriate box size (12x10x8)
4. Added packing material for protection
5. Sealed and weighed package
```

Package details:
```
Package Weight: 8.5 lbs (expected: 8.2 lbs)
Variance: +3.7% (within tolerance)
Dimensions: 12x10x8 inches
Tracking Number: 473829104756
Label Generated: 9:22 AM
Ready for Pickup: 9:25 AM
```

**Monday, 10:00 AM — Tom, Customer Service**

Tom receives a call from a customer about a delivery issue.

**Delivery Exception Handling:**

Customer: "Hi, I'm calling about shipment SHP-2025-0287. The driver said no one was here to sign, but we were here all morning."

Tom investigates:
```
Shipment: SHP-2025-0287
Customer: ABC Construction
Tracking: 1Z999AA10123456789
Carrier: UPS Ground
Delivery Attempt: 9:45 AM - "Customer not available"
```

Tom's resolution:
```
Investigation:
- Checked delivery address: Correct
- Reviewed delivery instructions: Signature required
- Called UPS customer service: Driver couldn't locate building

Resolution:
1. Updated delivery instructions with building entrance details
2. Added customer's direct phone number
3. Scheduled redelivery for this afternoon 2:00-4:00 PM
4. Confirmed customer availability
5. Sent customer confirmation email with new delivery window

Customer Response: "Thank you for resolving this quickly!"
```

**Monday, 11:30 AM — Jennifer, International Shipping**

Jennifer processes the international shipments requiring special documentation.

**International Shipment to Canada:**
```
Order: SO-2025-1198
Customer: Northern Industries (Toronto, ON)
Items: 50 Pressure Sensors PS-100
Value: $2,500 USD
Carrier: FedEx International Priority
```

Jennifer handles the customs requirements:
```
Customs Documentation:
- Commercial Invoice: Generated with item details
- NAFTA Certificate: Qualified for duty-free treatment
- Export Declaration: Filed electronically
- Harmonized Code: 9026.20.8000 (pressure sensors)

Shipping Details:
- Service: FedEx International Priority
- Transit Time: 1-2 business days
- Duties/Taxes: Customer responsibility
- Tracking: 473829104757
- Estimated Delivery: Wednesday
```

**Monday, 1:00 PM — Sarah, Shipping Coordinator**

Sarah processes the afternoon batch shipments for standard orders.

**Batch Shipment Processing:**

Sarah selects 18 orders for batch processing:
```
Batch: BATCH-2025-0067
Orders: 18 standard ground shipments
Destinations: Various (all domestic)
Carriers: UPS Ground (12), FedEx Ground (6)
Total Packages: 22 packages
Estimated Processing Time: 35 minutes
```

Batch optimization results:
```
Consolidation Opportunities:
- 2 orders to same customer: Combined into 1 shipment
- 3 orders to same city: Routed through same hub

Cost Savings:
- Consolidation savings: $47.50
- Volume discount applied: $23.75
- Total savings: $71.25

Processing Results:
- Pick lists generated: 1:05 PM
- All items picked: 2:15 PM
- Packing completed: 3:00 PM
- Labels printed: 3:10 PM
- Ready for pickup: 3:15 PM
```

**Monday, 3:30 PM — Carrier Pickup**

The UPS and FedEx drivers arrive for scheduled pickups.

**Pickup Processing:**
```
UPS Pickup:
- Packages: 14 packages
- Total Weight: 187 lbs
- Pickup Scan: 3:32 PM
- All shipments now "In Transit"

FedEx Pickup:
- Packages: 9 packages (including international)
- Total Weight: 142 lbs
- Pickup Scan: 3:45 PM
- All shipments now "In Transit"

Emergency Shipment Update:
- Metro Manufacturing shipment picked up
- Tracking active: 473829104756
- Customer notified of pickup
- Delivery commitment: Tomorrow by 10:30 AM
```

**Monday, 4:00 PM — Delivery Confirmations**

The system processes delivery confirmations from completed shipments.

**Delivery Processing:**
```
Deliveries Confirmed Today: 31 deliveries
Success Rate: 96.8% (30 successful, 1 exception)

Successful Deliveries:
- Average delivery time: 2.1 days
- On-time rate: 93.3%
- Customer satisfaction: 4.7/5.0

Exception Details:
- 1 delivery attempted but customer not available
- Redelivery scheduled for tomorrow
- Customer notified and confirmed availability

Customer Notifications Sent:
- 30 delivery confirmation emails
- 5 SMS notifications for priority customers
- 1 exception notification with resolution plan
```

**Monday, 5:00 PM — Daily Performance Review**

The team reviews the day's shipping and delivery performance.

**Daily Metrics Summary:**
```
Shipping Performance:
- Orders shipped: 41 orders
- Packages shipped: 53 packages
- Emergency orders: 8 (all shipped same day)
- International shipments: 3 (all processed correctly)
- Shipping accuracy: 100%
- Average processing time: 2.3 hours

Delivery Performance:
- Deliveries completed: 31
- On-time delivery rate: 93.3%
- Exception rate: 3.2%
- Customer satisfaction: 4.7/5.0

Cost Management:
- Shipping costs: $1,247.50
- Cost savings through optimization: $71.25
- Average cost per shipment: $30.43

Customer Service:
- Delivery inquiries: 3
- Exception resolutions: 1
- Customer satisfaction: 4.8/5.0
- Response time: Average 4 minutes
```

**End of Day Results:**

The shipping and delivery operations successfully handled diverse requirements:

**Emergency Response:** Critical customer needs met with same-day processing and next-day delivery commitments

**Operational Efficiency:** Batch processing optimized costs and improved throughput while maintaining accuracy

**International Compliance:** Complex customs requirements handled correctly for seamless cross-border delivery

**Customer Service:** Proactive exception handling maintained customer satisfaction and loyalty

**System Integration:** Complete inventory accuracy maintained through proper allocation updates and cost layer consumption

Each shipment and delivery served its purpose while maintaining the accuracy and efficiency that keeps customers satisfied and operations running smoothly.

---

## Common Questions & Troubleshooting

### "What's the difference between a shipment and a delivery?"

**Shipments** are outbound transactions that move inventory from your location to customers. **Deliveries** are confirmations that shipments have been received by customers.

Think of it this way: You create a shipment when items leave your facility. You record a delivery when the customer confirms they received the items.

### "Can I ship more than what's allocated to an order?"

No, you cannot ship more than the allocated quantity. The system prevents over-shipment to maintain inventory accuracy and prevent unauthorized deductions.

If you need to ship more, you must first increase the allocation (if inventory is available) or create a separate order for the additional quantity.

### "What happens to inventory when I create a shipment?"

When you create a shipment:
- **Allocated quantity** decreases by the shipped amount
- **On-hand quantity** decreases by the shipped amount  
- **In-transit quantity** increases by the shipped amount (until delivery)
- **Cost layers** are consumed based on your costing method
- **Serial/lot tracking** updates to reflect the shipment

Total inventory remains constant—it just moves from "on-hand" to "in-transit."

### "How do I handle partial shipments?"

For partial shipments:

1. **Ship what's available** - Create shipment for available quantity
2. **Keep remaining allocation** - System maintains allocation for unshipped quantity
3. **Communicate with customer** - Notify about partial shipment and expected completion
4. **Ship balance later** - Create additional shipment when inventory arrives

The system tracks partial fulfillment automatically and maintains order completion status.

### "What if a package gets lost or damaged in transit?"

For lost or damaged shipments:

1. **File claim with carrier** - Most carriers provide insurance coverage
2. **Create replacement shipment** - Ship replacement items if available
3. **Handle inventory impact** - May need adjustment for lost items
4. **Customer communication** - Keep customer informed of resolution steps
5. **Process insurance claim** - Recover costs when possible

Document everything for insurance claims and customer service.

### "How do I ship serialized items?"

For serialized items:

1. **Specify exact serial numbers** - System requires specific serials being shipped
2. **Verify serial allocation** - Serials must be allocated to the order
3. **Update serial status** - Serials change to "in-transit" status
4. **Maintain traceability** - Complete chain of custody preserved
5. **Confirm delivery** - Update serials to "delivered" when confirmed

Never ship serialized items without capturing the specific serial numbers.

### "Can I combine multiple orders into one shipment?"

Yes, you can consolidate orders going to the same customer and address:

1. **Check consolidation rules** - Verify orders can be combined
2. **Create consolidated shipment** - Include multiple allocations
3. **Generate combined documentation** - Packing slip shows all orders
4. **Maintain order tracking** - Each order retains its fulfillment status
5. **Customer communication** - Notify about consolidated delivery

Consolidation can reduce shipping costs and improve efficiency.

### "What if the customer refuses delivery?"

For delivery refusals:

1. **Understand the reason** - Address issue, wrong items, etc.
2. **Work with carrier** - Arrange return or hold for pickup
3. **Customer communication** - Resolve underlying issues
4. **Process return** - Handle as return when items come back
5. **Update records** - Adjust shipment and allocation status

Document refusal reasons to prevent future occurrences.

### "How do I handle international shipments?"

International shipments require additional steps:

1. **Customs documentation** - Commercial invoice, export declarations
2. **Harmonized codes** - Proper classification for customs
3. **Value declaration** - Accurate valuation for duties/taxes
4. **Restricted items** - Check for prohibited or restricted products
5. **Carrier requirements** - Each carrier has specific documentation needs

Work with your international shipping specialist or freight forwarder.

### "What if shipping costs are higher than expected?"

For unexpected shipping costs:

1. **Review rate calculation** - Check weight, dimensions, service level
2. **Consider alternatives** - Different carrier or service level
3. **Customer approval** - Get approval for cost changes if needed
4. **Rate shopping** - Compare multiple carriers for best rates
5. **Process improvements** - Optimize packaging to reduce costs

Monitor shipping costs regularly and optimize where possible.

### "How do I track shipment performance?"

Key metrics to monitor:

- **On-time delivery rate** - Percentage delivered by promised date
- **Shipping accuracy** - Correct items, quantities, and destinations
- **Damage rate** - Percentage of shipments damaged in transit
- **Cost per shipment** - Average shipping cost analysis
- **Customer satisfaction** - Feedback on shipping experience

Use these metrics to identify improvement opportunities and carrier performance.

---

## Chapter Summary

Shipping and deliveries are where your inventory management meets customer satisfaction. Master these processes, and you create competitive advantages through speed, accuracy, and reliability.

**Key takeaways:**

**Shipments require valid allocations** — Every shipment must be backed by proper allocations to maintain inventory accuracy and prevent unauthorized deductions.

**Status tracking provides visibility** — Clear status progression from draft through delivery keeps everyone informed and enables proactive issue resolution.

**Batch processing improves efficiency** — Processing multiple shipments together optimizes costs, improves throughput, and reduces handling time.

**Delivery confirmation completes the cycle** — Proper delivery confirmation updates allocations, provides customer satisfaction data, and completes the fulfillment process.

**Exception handling maintains satisfaction** — Proactive identification and resolution of shipping issues prevents customer dissatisfaction and builds loyalty.

**Integration ensures accuracy** — Proper integration with inventory, allocations, and cost systems maintains accuracy throughout the shipping process.

**Carrier relationships drive performance** — Strong carrier partnerships provide better service, rates, and problem resolution capabilities.

**Documentation supports compliance** — Proper shipping documentation supports customs, insurance claims, and regulatory requirements.

**Performance monitoring drives improvement** — Regular analysis of shipping metrics identifies opportunities for cost reduction and service improvement.

**Customer communication builds trust** — Proactive communication about shipment status, delays, and resolutions maintains customer confidence.

Shipping and deliveries are more than just moving boxes—they're about delivering on your promises to customers while maintaining the inventory accuracy that keeps your business running smoothly. When done right, they become a competitive advantage that drives customer loyalty and business growth.

The next chapter will show you how to handle returns (RMA) when products need to come back. But remember that excellent shipping and delivery processes reduce returns by ensuring customers receive exactly what they ordered in perfect condition. Master shipping, and you master a critical component of customer satisfaction and operational excellence.

Your customers judge your entire business by how well you deliver their orders. Make shipping and deliveries a strength, and you create lasting competitive advantages that drive growth and profitability.