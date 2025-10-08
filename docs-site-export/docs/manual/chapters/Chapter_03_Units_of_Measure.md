# Chapter 3: Units of Measure (UOM)

**Contract Reference:** `foundation/uom/`

## The Language of Quantity

Imagine trying to run a business where everyone speaks a different language about quantities. The warehouse team talks about "cases," purchasing orders "pallets," sales quotes "each," and accounting needs everything in "units." Without a common language, chaos ensues—orders get confused, costs become inaccurate, and inventory counts never match.

Units of Measure (UOM) are your inventory system's universal translator. They don't just track quantities—they create a coherent language that lets every part of your business communicate precisely about how much of what you have, need, or are moving.

Think of UOM as the foundation that makes everything else possible. You can't allocate inventory without knowing whether you're promising "5 cases" or "5 units." You can't calculate costs accurately without converting between "purchase price per pallet" and "cost per unit sold." You can't track serial numbers without knowing that each serial represents exactly one base unit.

UOM transforms your inventory from a collection of vague quantities into a precise, measurable system where every number means exactly what it says, every conversion is mathematically accurate, and every transaction maintains perfect traceability from purchase to sale.

### Quick Confidence Check

<LearningQuiz
  question="What must stay true when defining alternate units of measure?"
  :options="[&quot;Conversion ratios need to be exact and auditable&quot;, &quot;Each unit should have a different product SKU&quot;, &quot;Conversions should be estimated each time you transact&quot;]"
  :answer-index="0"
  :explanations="[&quot;Accurate ratios keep inventory maths correct.&quot;, &quot;SKU proliferation is not required for every unit.&quot;, &quot;Estimating on the fly drives count errors.&quot;]"
/>

---

## Understanding UOM Categories

Every unit of measure belongs to a category that defines what type of quantity it measures. Understanding these categories helps you choose the right units and set up accurate conversions.

**Count (Discrete Items)**

Count units measure individual, distinct items that can't be subdivided. These are your "each," "pair," "dozen," and "case" units. Count is the most common category in inventory management because most products are tracked as discrete items.

**Examples:** Each (EA), Pair (PR), Dozen (DZ), Case (CS), Box (BX), Pallet (PLT)

**Key characteristic:** Always whole numbers. You can't have 2.5 pumps or 1.7 cases. The system enforces whole number quantities for count units to prevent logical errors.

**Length (Linear Measurements)**

Length units measure distance, height, width, or any linear dimension. Common in construction, textiles, and manufacturing where materials are sold by length.

**Examples:** Meter (M), Foot (FT), Inch (IN), Centimeter (CM), Yard (YD)

**Key characteristic:** Supports decimal quantities. You can have 2.5 meters of cable or 10.75 feet of pipe.

**Area (Surface Measurements)**

Area units measure two-dimensional surfaces. Used for materials like flooring, roofing, fabric, or land.

**Examples:** Square Meter (M2), Square Foot (FT2), Acre (AC), Square Inch (IN2)

**Key characteristic:** Often calculated from length measurements (length × width = area).

**Volume (Capacity Measurements)**

Volume units measure three-dimensional space or liquid capacity. Essential for chemicals, fuels, beverages, and bulk materials.

**Examples:** Liter (L), Gallon (GAL), Cubic Meter (M3), Fluid Ounce (FL OZ), Barrel (BBL)

**Key characteristic:** Can be liquid volume (gallons of paint) or dry volume (cubic feet of sand).

**Weight (Mass Measurements)**

Weight units measure how heavy something is. Critical for shipping calculations, chemical formulations, and bulk commodities.

**Examples:** Kilogram (KG), Pound (LB), Gram (G), Ounce (OZ), Ton (TON)

**Key characteristic:** Often used for shipping costs and handling limits. A forklift rated for 2,000 pounds can't safely lift a 2,500-pound pallet.

**Time (Duration Measurements)**

Time units measure duration or labor hours. Used for services, rental equipment, and labor tracking.

**Examples:** Hour (HR), Day (DAY), Week (WK), Month (MO), Minute (MIN)

**Key characteristic:** Often used for service items and time-based billing.

**Temperature (Thermal Measurements)**

Temperature units measure heat levels. Important for products requiring specific storage conditions.

**Examples:** Celsius (C), Fahrenheit (F), Kelvin (K)

**Key characteristic:** Usually used for storage requirements rather than quantities.

**Custom (Business-Specific)**

Custom units are unique to your industry or business. These fill gaps where standard units don't fit your needs.

**Examples:** Board-Foot (lumber), Gross (144 items), Ream (500 sheets), Spool (wire/cable)

**Key characteristic:** Defined by your organization to match industry practices or internal needs.

**Why categories matter:**

**Conversion rules** — You can only convert between units in the same category. You can't convert "each" to "gallons" without additional information (like how many gallons each unit contains).

**Validation** — The system prevents nonsensical operations like adding 5 meters to 3 pounds.

**Display logic** — Reports can group similar units together and apply appropriate formatting (whole numbers for count, decimals for weight).

**Business rules** — Different categories have different precision requirements and rounding rules.

---

## Setting Up Your UOM System

Building an effective UOM system starts with understanding your business needs and creating a logical hierarchy of units.

**Creating base units:**

Every UOM category needs a base unit—the fundamental measurement that other units convert to. Base units are the foundation of your conversion system.

**To create a base unit:**

1. **Choose the most common unit** — Pick the unit you use most often for inventory tracking. For most businesses, "Each" is the base unit for count items.

2. **Make it indivisible** — Base units should represent the smallest practical quantity you track. If you track individual items, use "Each." If you only track by cases, "Case" might be your base unit.

3. **Set precision** — Base units for count items use zero decimal places (whole numbers only). Base units for weight, volume, or length can use decimal places as needed.

4. **Mark as stock UOM** — The base unit is typically your stock UOM—how you track inventory internally.

**Example base unit setup:**
```
Code: EA
Description: Each
Category: COUNT
Precision: 0 decimal places
Is Stock UOM: Yes
Base Unit: (none - this IS the base)
```

**Creating derived units:**

Derived units are multiples or fractions of the base unit. They make purchasing, selling, and handling more convenient.

**To create a derived unit:**

1. **Define the relationship** — How does this unit relate to the base unit? A case contains 12 each, so the conversion factor is 12.

2. **Set the conversion factor** — This number tells the system how to convert between units. Always express as "how many base units equal one derived unit."

3. **Choose precision** — Derived units can have different precision than the base unit. Cases might be whole numbers, but you might sell in fractional cases.

4. **Validate the math** — Test conversions to ensure accuracy. 2 cases should equal 24 each if your conversion factor is 12.

**Example derived unit setup:**
```
Code: CS
Description: Case
Category: COUNT
Base Unit: EA
Conversion Factor: 12 (1 case = 12 each)
Precision: 3 decimal places
Is Stock UOM: No
```

**Understanding packaging hierarchies:**

Many products have multiple packaging levels that nest inside each other. Understanding these hierarchies helps you set up logical UOM relationships.

**Example packaging hierarchy:**
```
Each (EA) - Base unit, individual item
↓
Box (BX) - Contains 6 each
↓
Case (CS) - Contains 4 boxes (24 each total)
↓
Pallet (PLT) - Contains 40 cases (960 each total)
```

**Setting up the hierarchy:**

1. **Start with the base** — Each is your foundation (conversion factor = 1)
2. **Add the first level** — Box contains 6 each (conversion factor = 6)
3. **Add the second level** — Case contains 4 boxes, but express as 24 each (conversion factor = 24)
4. **Add the third level** — Pallet contains 40 cases, but express as 960 each (conversion factor = 960)

**Why express everything relative to the base unit?**

This approach prevents compounding errors and makes conversions more reliable. Instead of converting Pallet → Case → Box → Each (three conversion steps), you convert Pallet → Each directly (one conversion step).

**Validating conversions:**

Before activating new UOM relationships, test them thoroughly:

**To validate a conversion:**

1. **Open the UOM validation tool**
2. **Enter a test quantity** — Try converting 1 case to each
3. **Check the result** — Should show 12 each if your factor is correct
4. **Test reverse conversion** — Convert 24 each to cases, should show 2 cases
5. **Test edge cases** — Try fractional quantities if allowed
6. **Verify precision** — Ensure rounding behaves as expected

**Common validation errors:**

**Circular conversions** — A converts to B, B converts to C, C converts back to A. This creates infinite loops and must be prevented.

**Inconsistent factors** — If 1 case = 12 each, then 1 each must = 0.083333 cases. The system calculates reverse factors automatically, but inconsistencies indicate setup errors.

**Precision loss** — Converting large quantities through multiple steps can accumulate rounding errors. Direct conversions to the base unit minimize this risk.

**Cross-category attempts** — Trying to convert "each" to "gallons" without additional context. The system blocks these to prevent logical errors.

**Setting precision and rounding strategies:**

Different units need different precision levels based on how they're used.

**Precision guidelines:**

**Count units** — Usually 0 decimal places (whole numbers). You can't have 2.5 pumps.

**Weight units** — 2-6 decimal places depending on accuracy needs. Precious metals need more precision than bulk materials.

**Volume units** — 2-4 decimal places for most applications. Chemical formulations might need more precision.

**Length units** — 2-4 decimal places. Construction materials often use fractional inches (1/16, 1/8, etc.).

**Currency-related** — Match your currency precision. US dollars use 2 decimal places, some currencies use 3 or 4.

**Rounding strategies:**

**Round Half Up** — 2.5 becomes 3, 2.4 becomes 2. Most common and intuitive.

**Round Half Down** — 2.5 becomes 2, 2.6 becomes 3. Less common but sometimes required.

**Round Half Even** — 2.5 becomes 2, 3.5 becomes 4. Reduces bias in large datasets.

**Truncate** — 2.9 becomes 2. Rarely used except for specific business rules.

**Choose rounding strategies based on:**

**Financial impact** — Rounding errors in high-volume, low-margin items can add up quickly.

**Industry standards** — Some industries have specific rounding conventions.

**Regulatory requirements** — Tax calculations often have mandated rounding rules.

**Customer expectations** — Customers expect consistent, predictable rounding.

---

## Using UOM Effectively

Understanding how UOM works in daily operations helps you make better decisions and avoid common pitfalls.

**Stock UOM vs. derived UOMs:**

**Stock UOM** is how you track inventory internally. It's your "source of truth" for quantities. All inventory transactions ultimately convert to stock UOM for accurate tracking.

**Derived UOMs** are convenience units for purchasing, selling, and handling. They make operations easier but always convert back to stock UOM for inventory accuracy.

**Example workflow:**
1. **Purchase** — Buy 5 cases (derived UOM)
2. **Convert** — System converts to 60 each (stock UOM)
3. **Track** — Inventory shows 60 each available
4. **Sell** — Sell 2 boxes (derived UOM)
5. **Convert** — System converts to 12 each (stock UOM)
6. **Update** — Inventory shows 48 each remaining

**Why this matters:**

**Accuracy** — All inventory calculations use the same base unit, preventing conversion errors.

**Auditability** — You can trace every transaction back to stock UOM quantities.

**Flexibility** — You can buy in cases, sell in boxes, and count in each without losing accuracy.

**Consistency** — Reports and analytics use consistent units for meaningful comparisons.

**Precision and rounding in practice:**

Different operations need different precision levels, and understanding when rounding occurs helps prevent surprises.

**When rounding happens:**

**Display** — User interfaces round for readability. Internal calculations use full precision.

**Transactions** — Final transaction quantities round to the unit's precision setting.

**Financial calculations** — Currency amounts round to currency precision (usually 2 decimal places).

**Reports** — Summary reports may round for presentation while detail reports show full precision.

**When rounding doesn't happen:**

**Internal calculations** — The system maintains 15 decimal places internally for accuracy.

**Conversion factors** — Stored with high precision to minimize cumulative errors.

**Intermediate steps** — Multi-step calculations maintain precision until the final result.

**Example precision workflow:**

```
Purchase: 5.333 cases
Internal calculation: 5.333 × 12 = 63.996 each
Stock UOM (0 decimals): 64 each (rounded up)
Display: "64 Each" (user sees whole number)
Cost calculation: $127.99 ÷ 64 = $1.999844 per each
Cost display: $2.00 per each (rounded to currency precision)
```

**Plan settings per UOM:**

Different UOMs can have different monitoring and planning settings based on how they're used.

**Monitoring frequency:**

**High-frequency** — Critical units checked constantly (stock UOM, primary sales UOM)

**Medium-frequency** — Important units checked regularly (purchase UOM, secondary sales UOM)

**Low-frequency** — Convenience units checked periodically (display UOM, report UOM)

**Plan-controlled** — Monitoring frequency determined by business planning cycles

**Example plan settings:**

```
Stock UOM (Each):
  Monitoring frequency: High (real-time)
  Alerts: Immediate
  Precision: 0 decimals
  Rounding: Round half up

Purchase UOM (Case):
  Monitoring frequency: Medium (hourly)
  Alerts: Batch
  Precision: 3 decimals
  Rounding: Round half up

Display UOM (Thousand):
  Monitoring frequency: Plan-controlled
  Alerts: None
  Precision: 2 decimals
  Rounding: Round half even
```

**UOM in different transaction types:**

Understanding how UOM works in various transactions helps you choose the right units for each operation.

**Purchase receipts:**

- **Accept any valid purchase UOM** — Buy in cases, pallets, or any configured unit
- **Convert to stock UOM** — System automatically converts for inventory tracking
- **Maintain original UOM** — Purchase records show original units for audit trails
- **Calculate unit costs** — Costs convert from purchase UOM to stock UOM

**Sales orders:**

- **Accept any valid sales UOM** — Sell in each, boxes, or any configured unit
- **Convert from stock UOM** — System converts available inventory to requested units
- **Check availability** — Availability checks use stock UOM for accuracy
- **Price calculations** — Prices convert from stock UOM to sales UOM

**Transfers:**

- **Use stock UOM only** — Transfers between locations use consistent units
- **No conversion needed** — Both locations track in the same stock UOM
- **Maintain accuracy** — No conversion means no rounding errors
- **Simplify tracking** — Easier to track movements with consistent units

**Adjustments:**

- **Use stock UOM only** — Adjustments modify stock quantities directly
- **Direct impact** — Changes immediately affect available inventory
- **Audit clarity** — Adjustments in stock UOM are easier to understand and verify
- **Prevent confusion** — No conversion means no questions about factors or rounding

**Cycle counts:**

- **Count in any UOM** — Count in whatever unit is most convenient
- **Convert for comparison** — System converts counts to stock UOM for variance calculation
- **Display variances** — Show variances in both count UOM and stock UOM
- **Adjustment creation** — Resulting adjustments use stock UOM

---

## Creating and Managing UOMs

Let's walk through the practical steps of setting up and maintaining your UOM system.

**To create a new UOM:**

1. **Plan the unit** — Determine what you're measuring and how it relates to existing units

2. **Choose a code** — Use a short, memorable code (2-10 characters). "CS" for case, "BX" for box, "PLT" for pallet

3. **Write a description** — Clear, unambiguous name that everyone will understand

4. **Select the category** — Count, Weight, Volume, Length, Area, Time, Temperature, or Custom

5. **Set the base unit** — Choose the existing unit this converts to, or leave blank if this IS the base unit

6. **Define the conversion factor** — How many base units equal one of this unit?

7. **Set precision** — How many decimal places are allowed?

8. **Choose rounding strategy** — How should fractional quantities be rounded?

**Example: Creating a "Case" UOM**

```
Code: CS
Description: Case
Category: COUNT
Base Unit: EA (Each)
Conversion Factor: 12
Precision: 3 decimal places
Rounding Strategy: Round Half Up
```

**What this means:**
- 1 case = 12 each
- You can have fractional cases (2.5 cases = 30 each)
- Fractional quantities round up at .5 (2.5 becomes 3 when displayed as whole cases)

**To update an existing UOM:**

**What you can change:**
- Description (for clarity)
- Precision (more or fewer decimal places)
- Rounding strategy (different rounding behavior)

**What you cannot change:**
- Code (would break references)
- Category (would invalidate conversions)
- Base unit (would break conversion math)
- Conversion factor (would invalidate historical data)

**Why these restrictions exist:**

Changing core UOM properties would invalidate historical transactions and create audit problems. If you need different conversion factors or categories, create a new UOM and phase out the old one.

**To safely update a UOM:**

1. **Check usage** — See how many products and transactions use this UOM
2. **Plan the change** — Understand the impact on existing data
3. **Test in preview** — Use the preview function to see effects before committing
4. **Communicate changes** — Notify users who work with this UOM
5. **Monitor after change** — Watch for unexpected issues or confusion

**Adding conversion pairs:**

When you have multiple UOMs in the same category, you can create direct conversion pairs for efficiency.

**To add a conversion pair:**

1. **Open the source UOM** — The unit you're converting from
2. **Go to "Conversions"**
3. **Click "Add Conversion"**
4. **Select target UOM** — The unit you're converting to
5. **Enter conversion factor** — How many target units equal one source unit
6. **Test the conversion** — Verify the math works correctly
7. **Save the pair**

**Example conversion pair:**

```
From: Gallon (GAL)
To: Liter (L)
Factor: 3.78541
Meaning: 1 gallon = 3.78541 liters
```

**The system automatically creates the reverse:**

```
From: Liter (L)
To: Gallon (GAL)
Factor: 0.264172
Meaning: 1 liter = 0.264172 gallons
```

**Understanding packaging hierarchies:**

Packaging hierarchies help you manage complex product packaging where multiple levels nest inside each other.

**To define a packaging hierarchy:**

1. **Start with the base unit** — Usually "Each" for individual items
2. **Define the first packaging level** — How many base units fit in the first container
3. **Define subsequent levels** — How each level contains the previous level
4. **Set cumulative quantities** — Total base units in each packaging level
5. **Assign barcodes** — Each packaging level can have its own barcode

**Example packaging hierarchy setup:**

```
Level 1: Each (EA)
  Quantity: 1
  Cumulative: 1
  Barcode: Individual item barcode

Level 2: Inner Pack (IN)
  Quantity: 6 EA
  Cumulative: 6 EA
  Barcode: Inner pack barcode

Level 3: Case (CS)
  Quantity: 4 IN
  Cumulative: 24 EA
  Barcode: Case barcode

Level 4: Pallet (PLT)
  Quantity: 40 CS
  Cumulative: 960 EA
  Barcode: Pallet barcode
```

**Why packaging hierarchies matter:**

**Receiving efficiency** — Scan a pallet barcode to receive 960 units instantly

**Picking flexibility** — Pick by case, inner pack, or individual units as needed

**Inventory accuracy** — All levels convert to the same base unit for consistent tracking

**Cost allocation** — Costs distribute accurately across all packaging levels

**Shipping optimization** — Choose the most efficient packaging level for each shipment

**Validating conversion proposals:**

Before implementing new conversions, validate them to prevent errors.

**To validate a conversion:**

1. **Open the validation tool**
2. **Enter the proposed conversion** — Source UOM, target UOM, and factor
3. **Test sample quantities** — Try converting various amounts
4. **Check reverse conversions** — Ensure the math works both ways
5. **Verify precision** — Confirm rounding behaves as expected
6. **Test edge cases** — Try very large and very small quantities

**Common validation issues:**

**Factor too small** — Conversion factor less than 0.000001 may cause precision problems

**Factor too large** — Conversion factor greater than 999,999 may cause overflow

**Circular references** — A→B→C→A creates infinite loops

**Category mismatches** — Trying to convert between incompatible categories

**Precision conflicts** — Target UOM precision can't handle converted quantities

**Example validation process:**

```
Proposed: 1 Barrel (BBL) = 42 Gallons (GAL)

Test 1: 1 BBL → 42 GAL ✓
Test 2: 42 GAL → 1 BBL ✓
Test 3: 0.5 BBL → 21 GAL ✓
Test 4: 21 GAL → 0.5 BBL ✓
Test 5: 100 BBL → 4,200 GAL ✓

Validation: PASSED
```

---

## Common UOM Scenarios

Understanding how UOM works in real-world situations helps you apply these concepts effectively.

**Scenario 1: Multi-level purchasing**

**Situation:** You buy products in pallets but sell them individually.

**Setup:**
- Stock UOM: Each (EA) - Base unit for inventory tracking
- Purchase UOM: Pallet (PLT) - How you buy from suppliers
- Sales UOM: Each (EA) - How you sell to customers
- Conversion: 1 PLT = 960 EA

**Workflow:**
1. **Purchase order** — Order 5 pallets from supplier
2. **Receipt** — Receive 5 PLT, system converts to 4,800 EA
3. **Inventory** — Shows 4,800 EA available
4. **Sales order** — Customer orders 100 EA
5. **Allocation** — System allocates 100 EA from available inventory
6. **Shipping** — Ship 100 EA, inventory reduces to 4,700 EA

**Benefits:**
- **Efficient purchasing** — Order in large quantities
- **Flexible selling** — Sell any quantity down to individual units
- **Accurate tracking** — All inventory in consistent units
- **Cost accuracy** — Costs convert properly from pallet price to unit cost

**Scenario 2: Variable packaging**

**Situation:** The same product comes in different package sizes from different suppliers.

**Setup:**
- Stock UOM: Each (EA) - Consistent internal tracking
- Supplier A: Case of 12 (CS12) - 1 CS12 = 12 EA
- Supplier B: Case of 24 (CS24) - 1 CS24 = 24 EA
- Supplier C: Box of 6 (BX6) - 1 BX6 = 6 EA

**Workflow:**
1. **Purchase from A** — 10 CS12 = 120 EA
2. **Purchase from B** — 5 CS24 = 120 EA
3. **Purchase from C** — 20 BX6 = 120 EA
4. **Total inventory** — 360 EA from three different package sizes
5. **Sales** — Sell in any quantity, system tracks in EA

**Benefits:**
- **Supplier flexibility** — Work with different packaging standards
- **Inventory consolidation** — All quantities combine in stock UOM
- **Cost comparison** — Compare supplier prices per EA
- **Simplified operations** — Internal processes use consistent units

**Scenario 3: Fractional quantities**

**Situation:** You sell bulk materials that can be divided into fractional quantities.

**Setup:**
- Stock UOM: Kilogram (KG) - Base unit for weight tracking
- Sales UOM: Kilogram (KG) - Sell by weight
- Purchase UOM: Metric Ton (MT) - Buy in large quantities
- Conversion: 1 MT = 1,000 KG
- Precision: 3 decimal places for accurate measurements

**Workflow:**
1. **Purchase** — Buy 2.5 MT = 2,500 KG
2. **Customer order** — Customer wants 127.5 KG
3. **Allocation** — System allocates 127.5 KG
4. **Weighing** — Warehouse weighs out 127.5 KG
5. **Shipping** — Ship exact weight, inventory reduces by 127.5 KG

**Benefits:**
- **Precise quantities** — Sell exact amounts needed
- **Minimal waste** — No rounding to whole units
- **Accurate costing** — Costs calculated on actual quantities
- **Customer satisfaction** — Customers get exactly what they pay for

**Scenario 4: Service time tracking**

**Situation:** You track labor time for service work and bill by different time units.

**Setup:**
- Stock UOM: Hour (HR) - Base unit for time tracking
- Billing UOM: Hour (HR) - Bill customers by hour
- Planning UOM: Day (DAY) - Plan projects by day
- Conversion: 1 DAY = 8 HR (standard work day)

**Workflow:**
1. **Project planning** — Estimate 5 days of work = 40 hours
2. **Time tracking** — Technicians log actual hours worked
3. **Progress monitoring** — Track hours against 40-hour estimate
4. **Customer billing** — Bill for actual hours worked
5. **Project completion** — Compare actual vs. estimated time

**Benefits:**
- **Flexible planning** — Plan in days, track in hours
- **Accurate billing** — Bill for actual time worked
- **Performance analysis** — Compare estimates to actuals
- **Resource management** — Understand capacity in hours or days

**Scenario 5: Cross-category conversions**

**Situation:** You need to convert between different measurement types using additional context.

**Setup:**
- Product: Paint
- Volume UOM: Gallon (GAL) - How you buy and sell
- Area UOM: Square Foot (FT2) - Coverage area
- Conversion context: 1 GAL covers 350 FT2 (coverage rate)

**Workflow:**
1. **Customer inquiry** — "How much paint for 1,400 FT2?"
2. **Calculation** — 1,400 FT2 ÷ 350 FT2/GAL = 4 GAL
3. **Inventory check** — Do we have 4 GAL available?
4. **Quote** — Quote 4 gallons for the project
5. **Order** — Customer orders 4 GAL

**Benefits:**
- **Customer service** — Answer coverage questions immediately
- **Accurate estimates** — Provide precise quantity recommendations
- **Inventory planning** — Understand demand in different units
- **Sales support** — Help customers buy the right amount

---

## Troubleshooting Common UOM Issues

Even well-designed UOM systems encounter problems. Understanding common issues and their solutions helps you resolve problems quickly.

### "Why can't I convert between these units?"

**Different categories** — The most common issue. You're trying to convert between units in different categories (like "each" to "gallons").

Check the UOM categories. Count units can't convert to volume units without additional context. If you need this conversion, you'll need to set up a cross-category conversion with appropriate context (like "each bottle contains 0.5 gallons").

**No conversion path** — The units are in the same category but no conversion factor exists.

Check if both units have conversion factors to a common base unit. If not, add the missing conversion factors. For example, if you have "Inch → Foot" and "Foot → Meter" but need "Inch → Meter," the system should calculate the path automatically.

**Circular conversions** — A converts to B, B converts to C, C converts back to A, creating an infinite loop.

Review your conversion setup and remove the circular reference. Usually this means one conversion is set up backwards or there's an unnecessary direct conversion that conflicts with the calculated path.

### "Why are my conversion calculations wrong?"

**Precision loss** — Multiple conversion steps accumulate rounding errors.

Use direct conversions to the base unit instead of multi-step conversions. Instead of Pallet → Case → Box → Each, set up Pallet → Each directly.

**Wrong conversion factor** — The factor is incorrect or entered backwards.

Verify the conversion factor by testing both directions. If 1 case = 12 each, then 12 each should = 1 case. If this doesn't work, the factor is wrong.

**Rounding strategy mismatch** — Different rounding strategies give different results.

Check the rounding strategy for each UOM. Ensure all related units use compatible rounding strategies. Financial calculations usually require "round half up" for consistency.

**Outdated conversion factors** — Conversion factors changed but old transactions still use old factors.

The system should version conversion factors by date. Check if you're looking at transactions from before the factor change. Historical transactions should use the factors that were active when they occurred.

### "Why can't I change this UOM?"

**UOM in use** — The UOM is being used by products or transactions and can't be modified.

Check which products and transactions use this UOM. You can't change core properties (like conversion factors) for UOMs that are actively used. Create a new UOM with the correct properties and migrate products to it.

**Stock UOM lock** — Stock UOMs can't be changed after the first transaction.

This is a safety feature to prevent data corruption. If you need a different stock UOM, you'll need to create a new product with the correct UOM. The system prevents changing stock UOMs to maintain historical accuracy.

**Permission restrictions** — You don't have permission to modify UOMs.

Check your user permissions. UOM modifications usually require administrator privileges because they affect system-wide calculations.

**System UOM protection** — System-defined UOMs can't be modified.

Standard UOMs like "Each," "Kilogram," and "Meter" are protected from modification. You can create custom UOMs but can't change the system-provided ones.

### "Why are my inventory quantities wrong after UOM changes?"

**Conversion factor changes** — Changing conversion factors affects calculated quantities.

The system should prevent changing conversion factors for active UOMs. If factors must change, the system should version them and apply new factors only to future transactions.

**Base unit changes** — Changing the base unit invalidates all conversions.

Base units can't be changed for UOMs in use. This would require recalculating all historical transactions, which could introduce errors and break audit trails.

**Precision changes** — Changing precision can cause rounding differences.

Increasing precision is usually safe. Decreasing precision can cause rounding differences. Test precision changes carefully and understand the impact on existing data.

**Timing issues** — Changes applied while transactions were in progress.

UOM changes should be applied during maintenance windows when no transactions are active. If changes must be made during business hours, ensure all in-progress transactions complete before applying changes.

### "Why do my costs not match after conversions?"

**Rounding accumulation** — Multiple conversions accumulate rounding errors.

Use high-precision internal calculations and round only for display. Store costs with sufficient precision to handle multiple conversions without significant error accumulation.

**Currency precision mismatch** — UOM precision doesn't match currency precision.

Ensure cost calculations use appropriate precision for your currency. US dollars need 2 decimal places, but internal calculations should use more precision to prevent rounding errors.

**Conversion timing** — Costs calculated with old conversion factors.

Cost calculations should use the conversion factors that were active when the cost was established. Historical costs shouldn't change when conversion factors are updated.

**Mixed UOM transactions** — Transactions mixing different UOMs create cost allocation problems.

Ensure all cost calculations convert to a common UOM (usually the stock UOM) before performing calculations. This prevents mixing different units in the same calculation.

### "Why can't I delete this UOM?"

**Active usage** — The UOM is being used by products, transactions, or other UOMs.

Check the usage report to see what's using this UOM. You can't delete UOMs that are actively referenced. Deactivate the UOM instead of deleting it to preserve historical data.

**Base unit dependency** — Other UOMs use this as their base unit.

Check if any other UOMs use this as their base unit. You can't delete a base unit while derived units depend on it. Delete or modify the derived units first.

**Historical transactions** — Past transactions reference this UOM.

UOMs used in historical transactions can't be deleted to preserve audit trails. Deactivate the UOM to prevent future use while preserving historical data.

**System protection** — System UOMs can't be deleted.

Standard system UOMs are protected from deletion. You can deactivate them if you don't use them, but you can't delete them entirely.

### Prevention strategies:

**Plan before implementing** — Design your UOM system carefully before going live. Changes become much harder after you have transaction history.

**Test thoroughly** — Validate all conversions before activating them. Test edge cases and verify that reverse conversions work correctly.

**Document decisions** — Record why you chose specific conversion factors and precision levels. This helps troubleshoot issues later.

**Monitor after changes** — Watch for unexpected behavior after making UOM changes. Users may notice problems that aren't immediately obvious.

**Train users** — Ensure users understand which UOMs to use in different situations. Many problems come from using the wrong UOM for a transaction.

**Regular audits** — Periodically review your UOM setup to ensure it still meets your business needs. Remove unused UOMs and add new ones as needed.

Most UOM issues stem from inadequate planning or trying to change fundamental properties after the system is in use. Careful initial setup and conservative change management prevent most problems.

---

## Bringing It All Together: A Day in the Life

Let me show you how UOM works across different roles and operations in a real business day.

**Monday, 7:00 AM — Sarah, Purchasing Manager**

Sarah reviews purchase orders for the week. She's ordering pumps from three different suppliers, each with different packaging:

- **Supplier A:** Sells in cases of 12 units at $240 per case
- **Supplier B:** Sells in boxes of 6 units at $125 per box  
- **Supplier C:** Sells individually at $21 per unit

Sarah needs 150 pumps total. She uses the UOM system to compare costs:

- **Supplier A:** $240 ÷ 12 = $20.00 per unit
- **Supplier B:** $125 ÷ 6 = $20.83 per unit
- **Supplier C:** $21.00 per unit

Supplier A offers the best price. Sarah orders 13 cases (156 units) to cover the 150 needed plus some safety stock. The system automatically converts: 13 cases × 12 units/case = 156 units in stock UOM.

**Monday, 9:30 AM — Mike, Receiving Clerk**

Mike receives the shipment from Supplier A. He scans the case barcode and enters "13" as the quantity. The system shows:

- **Received:** 13 cases
- **Converted to stock:** 156 each
- **Unit cost:** $20.00 per each (calculated from $240 per case ÷ 12)

The inventory system now shows 156 pumps available in stock UOM (each), even though they arrived in cases. Mike doesn't need to do any math—the UOM system handles all conversions automatically.

**Monday, 11:15 AM — Lisa, Sales Representative**

A customer calls asking for 48 pumps. Lisa checks availability and sees 156 each in stock—plenty to cover the order. She quotes the customer based on the unit cost of $20.00 each, plus markup.

The customer asks, "How many boxes is that?" Lisa uses the UOM conversion: 48 each ÷ 6 each/box = 8 boxes. She tells the customer, "That's 8 boxes of 6 pumps each."

**Monday, 1:45 PM — Tom, Warehouse Picker**

Tom receives a pick list for the 48-pump order. The pick list shows:

- **Product:** Pump Model XYZ
- **Quantity:** 48 each
- **Alternative:** 8 boxes of 6 each
- **Location:** Bin A-15

Tom finds it easier to pick 8 complete boxes rather than counting 48 individual units. He picks 8 boxes and scans each box barcode. The system converts: 8 boxes × 6 each/box = 48 each picked.

**Monday, 3:20 PM — Jennifer, Inventory Analyst**

Jennifer reviews inventory levels for reorder planning. She looks at pump inventory:

- **Current stock:** 108 each (156 received - 48 shipped)
- **Reorder point:** 50 each
- **Reorder quantity:** 120 each (10 cases)

The system shows inventory in "each" (stock UOM) for consistency, but Jennifer can view it in any UOM:
- **108 each** = 18 boxes = 9 cases = 0.1125 pallets

This flexibility helps her communicate with different stakeholders who think in different units.

**Monday, 4:00 PM — David, Cost Accountant**

David reviews the day's transactions for cost accuracy:

**Purchase transaction:**
- **Received:** 13 cases at $240 per case = $3,120 total
- **Unit cost:** $3,120 ÷ 156 each = $20.00 per each
- **Inventory value:** 156 each × $20.00 = $3,120 ✓

**Sales transaction:**
- **Sold:** 48 each at $20.00 cost = $960 cost of goods sold
- **Remaining:** 108 each × $20.00 = $2,160 inventory value
- **Total:** $960 + $2,160 = $3,120 ✓

The UOM conversions maintained perfect cost accuracy throughout all transactions.

**Monday, 5:30 PM — Rachel, Quality Manager**

Rachel discovers a quality issue with 12 pumps from the morning's shipment. She needs to quarantine them. She creates an adjustment:

- **Adjustment type:** Quality hold
- **Quantity:** 12 each (stock UOM)
- **Reason:** Quality inspection required
- **Location:** Move to quarantine area

The system reduces available inventory by 12 each, leaving 96 each available for sale. Rachel notes this equals exactly 2 boxes worth, which helps her communicate the impact to the sales team.

**End of day summary:**

The UOM system orchestrated complex quantity management throughout the day:

- **Purchasing** compared prices across different packaging units
- **Receiving** converted supplier packaging to internal tracking units
- **Sales** communicated quantities in customer-friendly terms
- **Picking** used the most efficient packaging for fulfillment
- **Analysis** viewed data in the most meaningful units for each purpose
- **Accounting** maintained cost accuracy through all conversions
- **Quality** managed issues using precise quantities

Every conversion was mathematically accurate, every cost calculation was precise, and every stakeholder could work with quantities in the units that made most sense for their role. The UOM system provided the foundation that made all other inventory operations possible.

---

## Common Questions & Troubleshooting

### "What's the difference between a base UOM and a stock UOM?"

**Base UOM** is the fundamental unit in a UOM category—the unit that other units in that category convert to. For example, "Meter" might be the base UOM for the Length category.

**Stock UOM** is the unit you use to track inventory for a specific product. It's often the same as the base UOM, but doesn't have to be. You might use "Each" as your stock UOM even if "Dozen" is more common in your industry.

Think of base UOM as the mathematical foundation for conversions, and stock UOM as the practical unit for inventory tracking.

### "Can I change conversion factors after I start using them?"

Generally, no. Changing conversion factors would invalidate historical transactions and create audit problems. If you need different factors, create new UOMs with the correct conversions and migrate products to them.

The system prevents changes to conversion factors for UOMs that are actively used. This protects data integrity and ensures historical transactions remain accurate.

### "Why can't I convert between 'each' and 'gallons'?"

These units are in different categories (Count vs. Volume) and can't be directly converted without additional context. To convert between them, you need to know how much volume each unit contains.

If you need this conversion regularly, set up a cross-category conversion with the appropriate context (like "each bottle contains 0.5 gallons").

### "How many decimal places should I use for different UOMs?"

**Count units:** Usually 0 decimal places (whole numbers only)
**Weight/Volume:** 2-4 decimal places for most applications
**Length:** 2-4 decimal places, depending on precision needs
**Currency-related:** Match your currency precision (usually 2 decimal places)
**High-precision applications:** Up to 6 decimal places for scientific or pharmaceutical use

Choose based on your business needs and industry standards.

### "What happens if I deactivate a UOM that's being used?"

Deactivating a UOM prevents it from being used in new transactions but preserves historical data. Existing products keep their UOM assignments, and historical transactions remain unchanged.

Users won't be able to select the deactivated UOM for new transactions, but all existing data remains intact for audit and reporting purposes.

### "Can I have multiple base units in the same category?"

Technically yes, but it's not recommended. Multiple base units in the same category can create confusion and make conversions more complex.

It's better to choose one base unit per category and convert all other units to that base. This simplifies the conversion math and reduces the chance of errors.

### "Why do my conversion calculations sometimes give slightly different results?"

This is usually due to rounding at different stages of the calculation. The system maintains high precision internally (15 decimal places) but rounds for display and final transactions.

To minimize this, use direct conversions to the base unit instead of multi-step conversions, and ensure all related UOMs use compatible rounding strategies.

### "How do I handle products that come in variable packaging?"

Set up multiple UOMs for the different package sizes and use the same stock UOM for all of them. For example:

- Stock UOM: Each
- Supplier A packaging: Case12 (1 = 12 each)
- Supplier B packaging: Case24 (1 = 24 each)
- Supplier C packaging: Box6 (1 = 6 each)

This lets you buy from different suppliers while maintaining consistent inventory tracking.

### "Can I use UOMs for services and time tracking?"

Yes. Set up time-based UOMs like Hour, Day, Week, or Month. You can track service time, bill customers, and manage capacity using the same UOM principles as physical products.

For example: Stock UOM = Hour, Billing UOM = Hour, Planning UOM = Day (1 day = 8 hours).

### "What's the best way to migrate from an old UOM system?"

1. **Map existing units** to new UOM categories and conversions
2. **Create new UOMs** with correct factors and precision
3. **Test conversions** thoroughly before going live
4. **Migrate products** in batches to new UOMs
5. **Train users** on the new system
6. **Monitor closely** for issues after migration

Don't try to change everything at once. Migrate gradually and keep the old system running until you're confident the new one works correctly.

### "How do I handle UOMs for international operations?"

Set up UOMs for both measurement systems (metric and imperial) with accurate conversion factors. Use localization settings to show the preferred units for each region while maintaining consistent internal tracking.

For example, track inventory in metric units internally but display in imperial units for US operations and metric units for European operations.

---

## Chapter Summary

Units of Measure are the foundation that makes precise inventory management possible. They transform vague quantities into exact, measurable amounts that everyone in your organization can understand and work with confidently.

**Key takeaways:**

**UOM categories provide structure** — Count, Weight, Volume, Length, Area, Time, Temperature, and Custom categories ensure logical groupings and prevent nonsensical conversions.

**Base units create consistency** — Every category needs a fundamental unit that other units convert to. This creates a stable foundation for all calculations.

**Conversion factors enable flexibility** — You can buy in pallets, track in each, and sell in boxes while maintaining perfect mathematical accuracy throughout.

**Stock UOM ensures accuracy** — Having one consistent unit for inventory tracking prevents confusion and maintains data integrity across all operations.

**Precision and rounding matter** — Different units need different precision levels, and consistent rounding strategies prevent accumulating errors.

**Packaging hierarchies simplify operations** — Multi-level packaging (each → box → case → pallet) makes receiving, picking, and shipping more efficient.

**Validation prevents problems** — Testing conversions before implementing them catches errors early and prevents data corruption.

**Immutability protects history** — Once UOMs are in use, core properties can't be changed. This protects historical data and maintains audit trails.

**Cross-category conversions require context** — Converting between different measurement types (like each to gallons) needs additional information about the relationship.

**Planning and monitoring adapt to usage** — Different UOMs can have different monitoring frequencies and precision requirements based on how they're used.

The UOM system is your inventory's mathematical foundation. Every allocation, every transaction, every cost calculation, and every report depends on accurate unit conversions. Master UOM, and you master the language of precise inventory management.

When someone asks "How much do we have?" your answer will be exact, meaningful, and trusted by everyone who hears it. That precision is the difference between inventory chaos and inventory control.