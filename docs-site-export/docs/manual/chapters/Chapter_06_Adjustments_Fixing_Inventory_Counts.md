# Chapter 6: Adjustments - Fixing Inventory Counts

**Contract Reference:** `operations/transactions/paths/adjustment-core.yaml`

## When Reality Doesn't Match the System

Picture this: You're doing a cycle count and discover 47 pumps in location A-15, but your system shows 50. Or you find water damage that destroyed 12 control modules. Or during a warehouse reorganization, you discover 25 widgets that were mislabeled and never properly recorded. What do you do?

This is where adjustments come in. Adjustments are your tool for making the system match physical reality when discrepancies occur. They're not just number changes—they're controlled, documented corrections that maintain the integrity of your inventory while ensuring your records reflect what you actually have.

But adjustments are powerful and potentially dangerous. They can create or destroy inventory value with a few keystrokes. They affect your financial statements, your cost of goods sold, and your inventory accuracy metrics. Used properly, they maintain system integrity. Used carelessly, they can hide problems, create audit issues, and distort your financial picture.

Understanding when and how to make adjustments—and equally important, when not to make them—is crucial for maintaining accurate inventory. This chapter will show you how to use adjustments effectively while maintaining proper controls and audit trails.

### Quick Confidence Check

<LearningQuiz
  question="After a cycle count variance is confirmed, what should you do before posting an adjustment?"
  :options="[&quot;Document the investigation and reason so finance and auditors see the trail&quot;, &quot;Immediately delete the location and recreate it with the correct balance&quot;, &quot;Wait until month end so the variance rolls into financial close automatically&quot;]"
  :answer-index="0"
  :explanations="[&quot;Auditors expect a reasoned trail that explains why inventory changed.&quot;, &quot;Deleting a location destroys the audit history and causes more problems.&quot;, &quot;Delaying the entry hides the variance and distorts period reporting.&quot;]"
/>

---

## When to Make Adjustments

Adjustments should only be made when there's a genuine discrepancy between your system records and physical reality. Understanding the right situations helps you maintain accuracy while avoiding unnecessary corrections.

**Cycle Count Corrections**

The most common reason for adjustments is correcting variances discovered during cycle counts.

**When cycle count adjustments are appropriate:**
- Physical count differs from system count after verification
- Recount confirms the variance
- Investigation rules out data entry errors or recent transactions
- Variance is within expected tolerance for the counting method

**Example cycle count scenario:**
```
System shows: 100 units in location B-15
Physical count: 97 units
Recount confirms: 97 units
Investigation: No recent transactions, no data errors
Action: Create adjustment for -3 units
Reason: Cycle count variance
```

**When to investigate before adjusting:**
- Large variances (>10% or high dollar value)
- Recent transactions that might not be reflected
- Items with high transaction velocity
- Locations with frequent movement

**Damage and Loss**

Physical damage, spoilage, theft, or other losses require adjustments to remove unusable inventory.

**Common damage and loss scenarios:**
- Water damage from leaks or flooding
- Physical damage during handling or transport
- Product expiration or spoilage
- Theft or unexplained disappearance
- Manufacturing defects discovered after receipt

**Example damage adjustment:**
```
Situation: Roof leak damaged 15 electronic components
Physical action: Items moved to damage area
System action: Adjustment for -15 units
Reason: Water damage
Documentation: Photos, damage report, insurance claim
```

**Important damage considerations:**
- Document the cause and extent of damage
- Take photos for insurance and audit purposes
- Consider whether items can be repaired or have salvage value
- Follow your organization's procedures for damaged goods

**System Corrections**

Sometimes adjustments are needed to correct system errors or data entry mistakes.

**Valid system correction scenarios:**
- Data entry errors discovered after transactions are committed
- System glitches that created incorrect quantities
- Import errors from other systems
- Corrections to historical transactions that can't be reversed

**Example system correction:**
```
Error discovered: Receipt entered as 1,200 units instead of 120
Time since error: 2 weeks
Impact: 50 units already shipped, costs allocated incorrectly
Solution: Adjustment for -1,080 units to correct the error
Documentation: Error investigation report, corrective action plan
```

**When system corrections need special handling:**
- Errors affecting closed accounting periods
- Large dollar value corrections
- Errors that affected customer shipments
- Corrections that impact financial statements

**Found Inventory**

Occasionally you'll discover inventory that exists physically but isn't recorded in the system.

**Common found inventory scenarios:**
- Items discovered during warehouse reorganization
- Mislabeled products identified during audits
- Returns that were physically received but not processed
- Transfers that arrived but weren't recorded

**Example found inventory adjustment:**
```
Discovery: 30 safety valves found behind racking during cleanup
Investigation: Items were mislabeled as different part number
Physical verification: All items in good condition
System action: Adjustment for +30 units
Reason: Found inventory - mislabeling correction
```

**Found inventory best practices:**
- Investigate why items weren't recorded
- Verify condition and usability
- Estimate appropriate cost basis
- Document discovery circumstances
- Implement process improvements to prevent recurrence

---

## Creating Adjustments

The adjustment creation process ensures proper documentation, approval, and audit trails while maintaining system integrity.

**Single Item Adjustments**

Most adjustments involve a single product at a single location, making them straightforward to create and track.

**To create a single item adjustment:**

1. **Gather the necessary information**
   - Product and location involved
   - Exact quantity variance (positive or negative)
   - Reason for the adjustment
   - Supporting documentation

2. **Navigate to the adjustment creation screen**
   - Go to Inventory → Transactions → Create Adjustment
   - Or use the quick adjustment option from inventory views

3. **Enter the adjustment details**
   - Select the product (by SKU, barcode, or search)
   - Choose the location
   - Enter the quantity change (positive for increases, negative for decreases)
   - Select the appropriate reason code

4. **Add documentation and notes**
   - Provide detailed explanation in notes
   - Attach supporting documents (photos, reports, etc.)
   - Reference related transactions or counts if applicable

5. **Review and submit**
   - Verify all information is correct
   - Check the calculated value impact
   - Submit for approval if required, or post directly if authorized

**Example single adjustment creation:**
```
Product: Control Module CM-500
Location: Storage Bin B-15
Current System Quantity: 50 units
Physical Count: 47 units
Adjustment Quantity: -3 units
Reason: Cycle count variance
Notes: Regular cycle count performed 2025-01-15, variance confirmed by recount
Supporting Documents: Count sheet CC-2025-0156
Estimated Value Impact: -$450.00 (3 units × $150 average cost)
```

**Batch Adjustments**

When you need to adjust multiple items or locations simultaneously, batch adjustments provide efficiency while maintaining control.

**When to use batch adjustments:**
- Physical inventory results with multiple variances
- Damage affecting multiple products
- System corrections involving multiple items
- Location consolidations or reorganizations

**To create batch adjustments:**

1. **Prepare your adjustment data**
   - Create a spreadsheet or list with all adjustments
   - Include product, location, quantity, and reason for each
   - Verify all information before proceeding

2. **Use the batch adjustment interface**
   - Navigate to Inventory → Transactions → Batch Adjustments
   - Upload your adjustment file or enter data directly
   - Review the system's validation of your data

3. **Validate the batch**
   - Check for errors or warnings
   - Verify quantity calculations and value impacts
   - Ensure all required fields are completed

4. **Submit the batch**
   - Review the summary of all adjustments
   - Submit for approval if required
   - Monitor processing status

**Example batch adjustment scenario:**
```
Situation: Physical inventory found variances in 25 locations
Batch contains:
- 15 negative adjustments (overages in system)
- 8 positive adjustments (shortages in system)  
- 2 zero adjustments (quantities match)
Total value impact: -$2,350 (net decrease)
Approval required: Yes (exceeds $1,000 threshold)
Processing time: 15 minutes for validation and approval
```

**Documenting Reasons**

Proper reason documentation is crucial for audit trails, pattern analysis, and process improvement.

**Standard reason codes:**
- **CC_VARIANCE** - Cycle count variance
- **PI_VARIANCE** - Physical inventory variance
- **DAMAGE** - Physical damage to inventory
- **THEFT** - Theft or unexplained loss
- **EXPIRATION** - Product expiration or spoilage
- **DATA_CORRECTION** - System or data entry error
- **FOUND** - Discovered inventory not in system
- **OTHER** - Other reason (requires detailed notes)

**Best practices for reason documentation:**

**Be specific and detailed:**
- Don't just say "damage" - explain what caused it
- Include dates, times, and circumstances when relevant
- Reference related documents or incidents

**Use consistent terminology:**
- Follow your organization's standard reason codes
- Use the same language for similar situations
- Make notes searchable for pattern analysis

**Include relevant context:**
- Who discovered the variance
- When it was discovered
- What investigation was performed
- What corrective actions were taken

**Example detailed reason documentation:**
```
Reason Code: DAMAGE
Detailed Notes: Water damage from roof leak in section A-3 discovered during 
morning inspection on 2025-01-15. Leak occurred overnight during heavy rain. 
15 electronic components affected - 12 completely damaged, 3 with minor water 
exposure moved to quarantine for testing. Maintenance notified, leak repaired 
same day. Insurance claim #INS-2025-0089 filed. Photos attached showing 
damage extent and leak source.

Investigation: Reviewed security footage, confirmed no other causes. 
Maintenance log shows roof inspection overdue by 2 months.

Corrective Action: Scheduled quarterly roof inspections, moved sensitive 
electronics away from potential leak areas.
```

**Handling special situations:**

**Serial numbered items:**
- Specify exact serial numbers being adjusted
- Verify serial numbers exist in the system
- Document condition of each serial number

**Lot controlled items:**
- Identify specific lot numbers affected
- Check expiration dates and lot status
- Consider impact on lot traceability

**High-value items:**
- Provide extra documentation and justification
- Include photos or inspection reports
- Get additional approvals as required

**Cross-location adjustments:**
- Consider whether a transfer is more appropriate
- Document why adjustment is preferred over transfer
- Ensure both locations are properly updated

---

## Adjustment Approvals

Approval workflows ensure that significant adjustments receive proper oversight while maintaining operational efficiency.

**Submitting for Approval**

When adjustments exceed your authorization level, they must be submitted for approval before taking effect.

**Understanding approval thresholds:**

Your organization sets thresholds based on both dollar value and percentage of inventory:

**Example threshold structure:**
```
Auto-approve: Up to $100 or 5% of item value
Supervisor approval: $100-$1,000 or 5%-15% of item value
Manager approval: $1,000-$10,000 or 15%-25% of item value
Executive approval: Over $10,000 or over 25% of item value
```

**To submit an adjustment for approval:**

1. **Create the adjustment** with all required information
2. **Review the approval requirements** shown by the system
3. **Add approval-specific documentation**
   - Detailed justification for the adjustment
   - Supporting evidence (photos, reports, investigations)
   - Recommended corrective actions
4. **Submit for review** - the system routes to the appropriate approver
5. **Monitor approval status** and respond to any questions

**Example approval submission:**
```
Adjustment: -25 Control Modules, value $3,750
Threshold exceeded: Manager approval required
Justification: Water damage from roof leak, items non-repairable
Supporting docs: Damage photos, maintenance report, insurance claim
Estimated approval time: 24 hours
Approver notified: Jane Manager via email and system notification
```

**Approval and Rejection Workflow**

Approvers review adjustments to ensure they're justified, properly documented, and follow company policies.

**What approvers evaluate:**
- **Reasonableness** - Does the adjustment make sense?
- **Documentation** - Is there sufficient supporting evidence?
- **Value** - Is the financial impact appropriate?
- **Pattern** - Are there recurring issues that need attention?
- **Process** - Were proper procedures followed?

**Approval process steps:**

1. **Approver receives notification** of pending adjustment
2. **Reviews adjustment details** and supporting documentation
3. **May request additional information** or clarification
4. **Makes approval decision** with documented reasoning
5. **System processes approved adjustments** automatically
6. **Rejected adjustments return to submitter** for revision

**Example approval decision:**
```
Adjustment: -$3,750 water damage
Approver: Jane Manager
Decision: Approved
Approval notes: Damage well documented with photos and maintenance report. 
Insurance claim filed appropriately. Recommend quarterly roof inspections 
to prevent recurrence.
Approved date: 2025-01-16 10:30 AM
Processing: Automatic upon approval
```

**Understanding Approval Requirements**

Different types of adjustments may have different approval requirements based on risk and materiality.

**Standard approval matrix:**

| Adjustment Type | Auto-Approve | Supervisor | Manager | Executive |
|----------------|--------------|------------|---------|-----------|
| Cycle count variance | <$100 | $100-$500 | $500-$2,500 | >$2,500 |
| Damage/loss | <$50 | $50-$250 | $250-$1,000 | >$1,000 |
| Theft | Any amount | All theft | >$500 | >$2,500 |
| System correction | <$200 | $200-$1,000 | $1,000-$5,000 | >$5,000 |
| Found inventory | <$100 | $100-$500 | $500-$2,500 | >$2,500 |

**Special approval considerations:**

**Segregation of duties:**
- Person creating adjustment cannot approve it
- Requires different person at appropriate level
- System enforces this rule automatically

**Time limits:**
- Approvals must be completed within specified timeframes
- Overdue approvals may escalate to higher levels
- Emergency procedures for urgent adjustments

**Documentation requirements:**
- Higher value adjustments require more documentation
- Photos required for damage claims over $500
- Investigation reports required for theft or recurring variances

**Pattern-based escalation:**
- Multiple adjustments for same item may require higher approval
- Frequent adjustments by same person trigger review
- Location-based patterns may indicate process issues

**Example escalation scenario:**
```
Pattern detected: 5 adjustments in location B-15 in past 30 days
Total value: $1,200 (individually under thresholds)
System action: Escalate next adjustment to manager level
Investigation triggered: Why are there frequent variances in this location?
Corrective action: Review location procedures, additional training
```

**Handling rejected adjustments:**

When adjustments are rejected, you need to understand why and determine next steps.

**Common rejection reasons:**
- Insufficient documentation
- Questionable justification
- Process not followed properly
- Alternative solution preferred (like transfer instead of adjustment)
- Need for additional investigation

**Steps after rejection:**

1. **Review rejection comments** carefully
2. **Gather additional information** as requested
3. **Consider alternative approaches** suggested by approver
4. **Revise and resubmit** if appropriate
5. **Escalate if necessary** with additional justification

**Example rejection and resolution:**
```
Original adjustment: -10 units, reason "damage"
Rejection reason: "Need photos and damage report for insurance claim"
Resolution: Added photos showing water damage, maintenance report confirming 
roof leak, insurance claim number
Resubmission: Same adjustment with additional documentation
Result: Approved within 2 hours of resubmission
```

---

## Managing Adjustments

Once adjustments are created and approved, ongoing management ensures they serve their purpose and provide valuable insights.

**Reversing Adjustments**

Sometimes you need to undo an adjustment that was made in error or is no longer needed.

**When adjustment reversals are appropriate:**
- Original adjustment was based on incorrect information
- Physical inventory was found after adjustment was made
- Investigation revealed the adjustment was unnecessary
- Correction of data entry errors in the adjustment itself

**How adjustment reversal works:**

1. **System creates a reversal transaction** with opposite quantities
2. **Original adjustment remains unchanged** for audit purposes
3. **Net effect cancels out** the original adjustment
4. **Cost layers are restored** when possible
5. **Full audit trail is maintained** for both transactions

**To reverse an adjustment:**

1. **Open the original adjustment** you need to reverse
2. **Click "Create Reversal"** or similar option
3. **Review the reversal details** - system fills in opposite quantities
4. **Add reversal reason** explaining why reversal is needed
5. **Submit for approval** if required (usually needs same or higher authority)

**Example adjustment reversal:**
```
Original Adjustment: -5 units for "cycle count variance"
Discovery: Items were actually in different location, not missing
Reversal: +5 units with reason "items found in alternate location"
Net Effect: Inventory returns to original level
Additional Action: Transfer items to correct location
Documentation: Location verification, updated count procedures
```

**Reversal restrictions:**
- Time limits (e.g., must reverse within 72 hours)
- Authority requirements (may need higher approval than original)
- Cost layer availability (some cost impacts can't be perfectly reversed)
- Period closing restrictions (may not be able to reverse after period close)

**Tracking Adjustment History**

Complete adjustment history provides insights for process improvement and audit compliance.

**What adjustment history includes:**
- All adjustments by product, location, or time period
- Approval chains and timing
- Reversal transactions and reasons
- Cost impacts and layer effects
- Pattern analysis and trends

**Using adjustment history for analysis:**

**Identify problem areas:**
- Locations with frequent adjustments
- Products with recurring variances
- Users with high adjustment rates
- Time periods with unusual activity

**Track improvement efforts:**
- Variance reduction after process changes
- Impact of training or system improvements
- Effectiveness of new counting procedures
- ROI of accuracy initiatives

**Support audit requirements:**
- Complete documentation for all adjustments
- Approval compliance verification
- Segregation of duties confirmation
- Pattern analysis for fraud detection

**Example history analysis:**
```
Analysis Period: Last 6 months
Total Adjustments: 247
Total Value Impact: -$12,450 (net decrease)

By Location:
- Warehouse A: 156 adjustments, -$8,200
- Warehouse B: 91 adjustments, -$4,250

By Reason:
- Cycle count variance: 189 (76%)
- Damage: 31 (13%)
- System correction: 18 (7%)
- Other: 9 (4%)

Trends:
- 15% reduction in adjustments vs. prior 6 months
- Damage adjustments increased 25% (investigate)
- Location B showing improvement after training
```

**Adjustment reporting and metrics:**

**Key metrics to track:**
- **Adjustment frequency** - How often adjustments are needed
- **Adjustment accuracy** - How many adjustments are later reversed
- **Value impact** - Financial effect of adjustments
- **Approval compliance** - Percentage following proper approval process
- **Time to resolution** - How quickly adjustments are processed

**Regular reports to generate:**
- Monthly adjustment summary by location and reason
- High-value adjustment detail report
- Adjustment trend analysis
- User activity and compliance report
- Cost impact and variance analysis

**Using metrics for improvement:**

**Process improvements:**
- Reduce adjustment frequency through better procedures
- Improve counting accuracy to reduce variances
- Enhance training to reduce errors
- Implement better controls to prevent damage

**System improvements:**
- Better user interfaces to reduce data entry errors
- Automated validation to catch mistakes earlier
- Integration improvements to reduce manual adjustments
- Enhanced reporting for better visibility

**Example improvement initiative:**
```
Problem Identified: High adjustment rate in receiving area
Root Cause Analysis: Receiving staff not properly trained on new products
Solution Implemented: Enhanced training program, product identification guides
Results After 3 Months:
- 40% reduction in receiving-related adjustments
- 60% reduction in "data correction" adjustments
- $3,200 reduction in monthly adjustment value
- Improved staff confidence and accuracy
```

**Best practices for adjustment management:**

**Regular review cycles:**
- Weekly review of high-value adjustments
- Monthly analysis of adjustment patterns
- Quarterly assessment of approval compliance
- Annual review of thresholds and procedures

**Continuous improvement:**
- Use adjustment data to identify process weaknesses
- Implement corrective actions based on patterns
- Train staff on proper adjustment procedures
- Update policies based on lessons learned

**Audit readiness:**
- Maintain complete documentation for all adjustments
- Ensure approval compliance is verifiable
- Keep supporting documents organized and accessible
- Prepare standard reports for audit requests

---

## Bringing It All Together: A Day in the Life

Let me show you how adjustments work in practice across different scenarios and roles.

**Monday, 8:00 AM — Sarah, Inventory Analyst**

Sarah reviews the weekend's cycle count results and finds several variances that need adjustment.

**Variance 1: Minor Cycle Count Difference**

Location B-15 shows a small variance:
- System: 47 control modules
- Physical count: 45 control modules
- Variance: -2 units

Sarah creates the adjustment:
```
Product: Control Module CM-500
Location: Storage Bin B-15
Adjustment: -2 units
Reason: CC_VARIANCE
Value Impact: -$300 (2 × $150 average cost)
Approval: Auto-approved (under $100 threshold)
Notes: Regular cycle count, variance confirmed by recount
```

The adjustment processes immediately, updating inventory to 45 units.

**Variance 2: Larger Discrepancy Requiring Approval**

Location C-20 has a significant variance:
- System: 100 safety valves
- Physical count: 85 safety valves
- Variance: -15 units

This exceeds the auto-approval threshold, so Sarah submits for approval:
```
Product: Safety Valve SV-200
Location: Storage Bin C-20
Adjustment: -15 units
Reason: CC_VARIANCE
Value Impact: -$1,125 (15 × $75 average cost)
Approval Required: Manager (exceeds $1,000 threshold)
Documentation: Count sheet, recount verification, location investigation
Notes: Large variance requires investigation - no recent transactions found
```

The system routes this to Mike, the warehouse manager, for approval.

**Monday, 10:30 AM — Tom, Warehouse Supervisor**

Tom discovers water damage from a weekend roof leak that affected electronic components.

**Damage Assessment:**
- 12 control modules completely damaged (non-repairable)
- 3 control modules with minor water exposure (moved to quarantine)
- Total estimated loss: $1,800

Tom documents the damage and creates an adjustment:
```
Product: Control Module CM-500
Location: Storage Bin A-10
Adjustment: -12 units
Reason: DAMAGE
Value Impact: -$1,800
Approval Required: Manager
Supporting Documents:
- Photos of water damage
- Maintenance report on roof leak
- Insurance claim #INS-2025-0123
Notes: Water damage from roof leak discovered Monday morning. Leak repaired, 
insurance notified. 3 additional units moved to quarantine for testing.
```

The adjustment goes to Mike for approval along with Sarah's large variance.

**Monday, 11:45 AM — Mike, Warehouse Manager**

Mike reviews two pending adjustments requiring his approval.

**Reviewing Sarah's Cycle Count Variance:**
Mike examines the -15 unit variance:
- Reviews count documentation
- Checks for recent transactions (none found)
- Considers location history (no pattern of variances)
- Evaluates investigation notes

Decision: Approved
```
Approval Notes: Variance well documented with proper recount verification. 
No obvious cause identified. Recommend additional training for counting 
procedures in this location.
Approved: 2025-01-20 11:50 AM
```

**Reviewing Tom's Damage Adjustment:**
Mike examines the water damage claim:
- Reviews photos showing extent of damage
- Confirms maintenance report and repair completion
- Verifies insurance claim was filed
- Checks that damaged items were properly segregated

Decision: Approved
```
Approval Notes: Damage well documented with photos and maintenance report. 
Insurance claim filed appropriately. Recommend quarterly roof inspections 
to prevent recurrence. Approve immediate write-off of damaged units.
Approved: 2025-01-20 11:55 AM
```

Both adjustments process automatically upon approval.

**Monday, 2:00 PM — Lisa, Quality Inspector**

Lisa completes testing of the 3 control modules that had minor water exposure.

**Test Results:**
- 2 units pass all functionality tests
- 1 unit fails electrical safety test

Lisa creates adjustments based on the test results:

**For the 2 good units:**
```
Action: Transfer from quarantine back to active storage
Method: Transfer transaction (not adjustment)
Reason: Units passed quality inspection after water exposure
```

**For the 1 failed unit:**
```
Product: Control Module CM-500
Location: Quarantine Area
Adjustment: -1 unit
Reason: DAMAGE
Value Impact: -$150
Approval: Auto-approved (under threshold)
Notes: Unit failed electrical safety test after water exposure. 
Cannot be repaired or sold. Adding to insurance claim.
```

**Monday, 4:00 PM — Jennifer, Inventory Analyst**

During a warehouse reorganization, Jennifer discovers 20 pressure sensors that were mislabeled and never properly recorded.

**Investigation:**
- Items were labeled as different part number
- Physical inspection confirms they're pressure sensors
- All items in good condition
- Estimated cost: $50 per unit

Jennifer creates a positive adjustment:
```
Product: Pressure Sensor PS-100
Location: Storage Bin D-25
Adjustment: +20 units
Reason: FOUND
Value Impact: +$1,000
Approval Required: Manager (exceeds threshold)
Documentation: Photos of mislabeled items, investigation report
Notes: Items discovered during reorganization, were mislabeled as PS-200. 
All units in good condition. Recommend review of labeling procedures.
```

**Monday, 5:30 PM — Mike, Warehouse Manager**

Mike reviews Jennifer's found inventory adjustment.

**Evaluation:**
- Reviews photos showing mislabeling
- Confirms items are in good condition
- Checks that estimated cost is reasonable
- Considers process improvement recommendations

Decision: Approved
```
Approval Notes: Found inventory well documented. Mislabeling explains why 
items weren't in system. Estimated cost reasonable based on recent purchases. 
Approve addition to inventory. Implement better labeling verification process.
Approved: 2025-01-20 17:35 PM
```

**End of Day Summary:**

The adjustment process handled diverse scenarios while maintaining proper controls:

**Adjustments Processed:**
- 4 negative adjustments totaling -30 units, -$3,375 value
- 1 positive adjustment of +20 units, +$1,000 value
- Net impact: -10 units, -$2,375 value

**Approval Compliance:**
- 2 auto-approved adjustments (under thresholds)
- 3 manager-approved adjustments (proper authorization)
- All adjustments properly documented and justified

**Process Improvements Identified:**
- Need for quarterly roof inspections
- Enhanced counting procedures for location C-20
- Better labeling verification process
- Additional training for counting accuracy

**Audit Trail Maintained:**
- Complete documentation for all adjustments
- Proper approval chains with timestamps
- Supporting evidence attached
- Clear reasoning for all decisions

Each adjustment served its purpose: correcting system records to match physical reality while maintaining proper controls and providing insights for continuous improvement.

---

## Common Questions & Troubleshooting

### "What's the difference between an adjustment and a transfer?"

**Adjustments** change the total quantity of inventory in your system - they add or remove inventory. **Transfers** move inventory between locations without changing the total quantity.

Use adjustments when inventory is physically gained or lost. Use transfers when inventory moves from one location to another.

### "Can I adjust inventory that's allocated to orders?"

Generally, you should avoid adjusting allocated inventory because it affects customer promises. If you must adjust allocated inventory:

1. **Check the impact** on allocations first
2. **Consider reallocating** from other locations if possible
3. **Notify sales/customer service** if customer orders are affected
4. **Document the customer impact** in your adjustment notes

The system will automatically adjust allocation quantities when you reduce inventory.

### "Why do some adjustments require approval while others don't?"

Approval requirements are based on the financial impact and your organization's risk tolerance. Larger adjustments require approval because they:

- Have greater financial impact
- Could indicate process problems
- Need management oversight
- Require additional documentation

Check with your administrator about your specific approval thresholds.

### "What happens if I make an adjustment in error?"

If you catch the error quickly, you can usually reverse the adjustment:

1. **Create a reversal** with opposite quantities
2. **Document why** the reversal is needed
3. **Get appropriate approval** (may need same or higher authority)
4. **Make the correct adjustment** if still needed

The original adjustment remains for audit purposes, but the reversal cancels its effect.

### "How do adjustments affect my costs and financial statements?"

Adjustments directly impact your inventory valuation and cost of goods sold:

- **Positive adjustments** create new inventory value
- **Negative adjustments** remove inventory value and may create expense
- **Cost layers** are created or consumed based on your costing method
- **Financial statements** reflect the adjustment impact immediately

Work with your accounting team for significant adjustments.

### "Can I adjust serial numbered items?"

Yes, but you must specify the exact serial numbers being adjusted:

- **For negative adjustments:** Specify which serial numbers are being removed
- **For positive adjustments:** The system will create new serial number records
- **Verify serial numbers** exist and are in the correct status
- **Document the condition** of each serial number

### "Why can't I adjust inventory to negative quantities?"

The system prevents negative inventory because you can't physically have less than zero of something. If you need to adjust below zero:

1. **Check for pending transactions** that might affect the quantity
2. **Verify your current on-hand** quantity is correct
3. **Consider if a different transaction type** is more appropriate
4. **Investigate why** the system shows more than you physically have

### "How often should I be making adjustments?"

Frequent adjustments may indicate process problems. Healthy adjustment patterns:

- **Cycle count variances:** Should decrease over time as processes improve
- **Damage adjustments:** Should be infrequent and well-documented
- **System corrections:** Should be rare and trigger process improvements
- **Found inventory:** Should decrease as procedures improve

If you're making many adjustments, investigate the root causes.

### "What documentation do I need for adjustments?"

Documentation requirements depend on the adjustment value and type:

- **All adjustments:** Clear reason and notes
- **Damage claims:** Photos and damage reports
- **Theft:** Security reports and investigation results
- **Large variances:** Count sheets and investigation summaries
- **System corrections:** Error analysis and corrective actions

When in doubt, provide more documentation rather than less.

### "Can I make adjustments for past dates?"

Backdated adjustments are usually restricted because they can affect closed accounting periods. If you need to make a backdated adjustment:

1. **Check if the period is still open**
2. **Get special authorization** if required
3. **Document why** the backdating is necessary
4. **Consider the impact** on financial statements
5. **Work with accounting** to ensure proper handling

### "How do I know if my adjustment thresholds are appropriate?"

Review your adjustment patterns regularly:

- **Too many approvals:** Thresholds might be too low, slowing operations
- **Too few approvals:** Thresholds might be too high, reducing control
- **Approval delays:** May need more approvers or higher thresholds
- **Pattern analysis:** Look for trends that suggest threshold adjustments

Work with management to find the right balance between control and efficiency.

---

## Chapter Summary

Adjustments are powerful tools for maintaining inventory accuracy, but they require careful handling to preserve system integrity and provide meaningful insights.

**Key takeaways:**

**Adjustments correct reality, not hide problems** — Use adjustments to make your system match physical reality, not to cover up process issues or make numbers look better.

**Proper documentation is essential** — Every adjustment needs clear reasoning, supporting evidence, and detailed notes. This documentation supports audits and helps identify improvement opportunities.

**Approval workflows provide necessary control** — Thresholds and approval requirements ensure that significant adjustments receive appropriate oversight while maintaining operational efficiency.

**Reason codes enable pattern analysis** — Consistent use of reason codes helps identify trends, problem areas, and improvement opportunities across your organization.

**Audit trails support compliance** — Complete, immutable records of all adjustments, approvals, and reversals provide the transparency needed for financial and regulatory compliance.

**Timing matters for accuracy** — Make adjustments promptly when discrepancies are discovered, but take time to investigate and document properly.

**Cost impacts affect financial statements** — Understand how adjustments affect inventory valuation, cost of goods sold, and financial reporting.

**Patterns reveal process issues** — Regular analysis of adjustment patterns helps identify root causes and opportunities for process improvement.

**Reversals provide error correction** — When mistakes happen, proper reversal procedures maintain audit integrity while correcting errors.

**Integration supports efficiency** — Adjustments work with cycle counting, physical inventory, and other processes to maintain overall system accuracy.

Adjustments are not just about fixing numbers—they're about maintaining the integrity of your inventory system while providing insights that drive continuous improvement. When used properly, they help ensure your inventory records accurately reflect reality, support sound business decisions, and meet audit and compliance requirements.

The next chapters will show you how to handle transfers between locations and shipping operations. But remember that adjustments are often the final step in resolving discrepancies discovered through these other processes. Master adjustments, and you master a critical tool for inventory accuracy.