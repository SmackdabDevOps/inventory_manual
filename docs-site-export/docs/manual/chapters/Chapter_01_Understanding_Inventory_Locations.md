# Chapter 1: Understanding Inventory Locations

**Contract Reference:** `foundation/inventory-locations/`

## The Living Map of Your Warehouse

Walk into a warehouse for the first time and you'll see rows of shelves, loading docks, and workers moving with purpose. Without a map, you'd be lost. But what if your map could do more than show where things are? What if it could warn you when a zone is getting crowded, remember which areas need special handling, and help you find the best place to store incoming goods?

That's what the Inventory Locations system does. It transforms your physical spaces—warehouses, stores, service vehicles, even customer sites—into an intelligent map that doesn't just track where everything is, but understands how your operation works.

Think of the difference between a paper map and GPS. The paper map shows roads; GPS knows traffic patterns, suggests better routes, and warns about delays. Your inventory locations work the same way—they're not just addresses, they're spaces that help you make better decisions every day.

### Quick Confidence Check

<LearningQuiz
  question="Why is picking the correct location type so important?"
  :options="[&quot;The type controls hierarchy, permissions, and operational rules&quot;, &quot;It changes the color of the bin in the mobile app&quot;, &quot;It guarantees the location never needs maintenance again&quot;]"
  :answer-index="0"
  :explanations="[&quot;Types drive how the system treats the location.&quot;, &quot;Color themes are unrelated to location behavior.&quot;, &quot;Maintenance is still required over time.&quot;]"
/>

---

::: info
**Before You Start**
- Review your master location naming convention so search, RF devices, and analytics stay aligned.
- Gather the operational facts: temperature requirements, hazardous materials flags, max pallet heights, and ownership rules.
- Confirm who approves new locations (ops lead, facilities, compliance) so the creation workflow does not stall partway through.
:::

::: danger
**Common Pitfalls**
- Copying an existing bin type without checking inherited rules (e.g., quarantine, temperature) leads to surprise blocking later.
- Leaving utilization thresholds at defaults can swamp staging areas during seasonal spikes.
- Forgetting to document why a location was created makes future audits painful—capture the business trigger in the notes right away.
:::

## Scenario: Expansion Week in Receiving

> Goal: Open a new receiving zone, shift overflow inventory, and keep auditors happy during the busiest week of the quarter.

**Monday 08:00 — Facilities Walkthrough**
- Floor lead tours an empty corner of the warehouse slated for expansion.
- Notes special requirements: cold chain pallets, temporary contractor staging, and lift-clearance limits near sprinkler lines.

**Monday 09:30 — Location Design Workshop**
- In Smackdab > Locations, clone an existing refrigerated zone but adjust capacity to 65 pallet positions.
- Add child bins for “Dock A – Cold Hold” and “Dock A – QA Review” with quarantine rules enabled.

**Monday 11:00 — Approval + API Sync**
- Ops lead approves the new zone; platform engineer calls the Locations API to push the structure to downstream integrations.
- Warehouse automation tooling is notified through the event feed (`inventory.location.created`), so pick/put-away algorithms start considering the new zone.

**Monday 14:00 — Controlled Go-Live**
- Team freezes the old overflow zone, activates the new bins, and re-routes inbound ASN appointments.
- Capacity dashboard shows the new zone trending at only 20% utilization while legacy receiving burns down to 60% by end of day.

**Tuesday 07:30 — Audit Check-In**
- Compliance officer views the timeline of freeze/unfreeze events plus audit notes captured in the location history—no manual spreadsheet required.

## Location Type Cheat Sheet

| Type | Ideal For | Key Rules | Watch Outs |
| --- | --- | --- | --- |
| Warehouse / Store | Top-level facilities | Holds child zones, tracks SLA targets | Cannot sit inside another location |
| Zone | Functional areas (Receiving, QA, Staging) | Inherits/propagates rules to children | Wrong type breaks bin hierarchy |
| Bin | Final storage positions | Tracks capacity, cycle counts, inventory states | Set correct UOM and dimensions |
| Quarantine | Holds pending inspections | Blocks picking/put-away until cleared | Requires reason + release workflow |
| Service Vehicle | Technician vans, mobile inventory | Enforces technician assignment, weight limits | Use alerts to restock before routes |
| Customer Site | Consignment/VMI locations | Links to customer account and billing cadence | Needs reconciliation schedule |
| Virtual | In transit, pending receipt | Keeps inventory visible without a physical slot | Do not leave inventory stranded here |

## API Blueprint: Create a Location Programmatically

When automations or external systems need to seed a new location, call the contract-first API. The example below mirrors the scenario above and can be pasted into your sandbox runner.

```http
POST /operations/locations/v1/locations
Content-Type: application/json

{
  "code": "REC-A-COLD",
  "name": "Receiving Zone A - Cold",
  "type": "ZONE",
  "parentCode": "WH-MAIN",
  "capacity": {
    "unit": "PALLET",
    "max": 65
  },
  "rules": {
    "temperatureRangeCelsius": { "min": 0, "max": 4 },
    "quarantineRequired": true,
    "receiving": { "dockDoor": "A", "asnOnly": true }
  },
  "notes": "Expanded cold receiving capacity for Q4 peak. Audit ref: FAC-2025-11."
}
```

```bash
curl -X POST https://api.smackdab.app/operations/locations/v1/locations \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d @payload.json
```

The response returns the location ID plus derived metadata (hierarchy path, utilization thresholds) so you can sync downstream systems.

## Practice Lab: Map Your Own Facility

<details>
<summary>Launch the guided lab</summary>

1. Open the sandbox environment and duplicate the “Main DC” warehouse.
2. Add a new **Zone** named “Lab Staging” with capacity of `20` pallets and a utilization warning at `70%`.
3. Create two **Bins** under the zone:
   - `LAB-STAGE-01` (standard, 110" height clearance)
   - `LAB-HAZ-01` (quarantine enabled, requires hazmat certification)
4. Freeze `LAB-HAZ-01`, add a note explaining the mock inspection, and set auto-unfreeze in 2 hours.
5. Use the **Inventory Rollup** tool to confirm the zone reports `0` capacity usage but shows the freeze reason in the hierarchy.
6. Capture a screenshot of the rollup and attach it to your runbook—this becomes your “done” proof.

Try variations: convert `LAB-STAGE-01` into a service vehicle, or simulate a transfer to test how alerts behave.

</details>

## Getting Started: Adding Your First Location

Let's start with the basics: creating a new location.

**To add a location:**

1. **Name it clearly** — Use names that make sense to your team. "Zone A - Receiving" is better than "ZN-001." Workers should know exactly what you mean when you say the name out loud.

2. **Give it a code** — This is the short identifier your scanners will use. Keep it simple and memorable: "A-RCV" or "BIN-A-47." Codes should be easy to type and hard to confuse. Avoid codes that look similar (like "O" and "0" or "I" and "1").

3. **Choose a type** — This is critical because the type determines what the system allows and enforces.

   **Warehouse or Store** — Your main building or retail location, the top of your location tree. Use this for "Main Distribution Center" or "Retail Store #5." This allows child locations (zones, bins) but can't be nested inside anything. If you mistakenly make a zone a warehouse, you can't nest it properly and your hierarchy breaks.

   **Zone** — A major functional area inside a facility, like a "department" within your warehouse. Use this for "Receiving," "Shipping," "Cold Storage," "Hazmat Area," or "Returns Processing." Zones sit inside warehouses, can contain bins or aisles, and inherit/pass down rules to children. If you make a bin a zone, you'll try to put other bins inside it and create confusion about capacity.

   **Bin** — The actual physical spot where inventory sits: a shelf, pallet position, or rack location. This is the final destination for storing items, like "Bin A-47" or "Pallet Rack 12-C." Bins hold inventory directly, can't contain other locations, and track exact quantities. If you make a zone a bin, you can't divide the space further when needed.

   **Quarantine** — A holding area where items wait for inspection, approval, or investigation before moving. Use this for returns processing, quality holds, damaged goods inspection, or receiving inspection areas. The system automatically blocks items from leaving without approval, requires inspection workflows, and flags items as "on hold." If you use a regular bin instead, items can leave freely without inspection and you lose quality control.

   **Service Vehicle** — A truck, van, or vehicle that carries inventory to job sites with a specific technician. Use this for field service operations where technicians carry parts and supplies. The system requires technician assignment, enforces weight/volume limits, restricts access to the assigned technician only, and tracks mobile inventory. If you use a regular bin, anyone can access the inventory and you lose control over who has what in the field.

   **Customer Site** — A location at your customer's facility where you store inventory you still own. Use this for consignment inventory, vendor-managed inventory (VMI), or equipment installed at customer locations. The system links to customer records, requires reconciliation schedules, tracks inventory separately from your warehouse, and may trigger billing when used. If you use a regular warehouse, you can't track which customer has what, making billing and reconciliation impossible.

   **Mobile** — Temporary or moving locations without fixed addresses. Use this for pop-up distribution points, temporary event inventory, or construction site storage. These allow flexible addressing, may not require full hierarchy, and can be activated/deactivated quickly. If you create a permanent warehouse for temporary sites, you'll clutter your system with inactive locations.

   **Virtual** — A logical location that doesn't physically exist, used for accounting or system purposes. Use this for "In Transit," "Pending Receipt," "Awaiting Transfer," or "Write-Off" locations. These hold inventory in the system without physical space, bridging inventory states between physical locations. If you try to put real inventory here, workers can't find it physically—it exists only in the system.

   **Drop Ship** — A virtual location representing inventory that ships directly from supplier to customer, never touching your warehouse. Use this for tracking orders where the supplier ships directly to your customer. The system records the transaction without requiring receiving or shipping from your facility and updates inventory as "sold" without ever showing "in stock." If you use a regular warehouse, you'll try to physically receive items that never arrive.

   **Decision guide:** Start with your building (Warehouse/Store), divide it into areas (Zone), create storage spots (Bin). Need inspection holds? Use Quarantine. Tracking tech vans? Use Service Vehicle. Storing items at customer locations? Use Customer Site. Need placeholders for in-transit items? Use Virtual.

   The type locks in certain behaviors. You can't convert a service vehicle into a regular bin without emptying it and removing the technician assignment. Choose correctly from the start.

4. **Select a parent** — Where does this location live? A bin goes inside a zone, a zone goes inside a warehouse. This creates your hierarchy. The parent determines what rules your new location inherits. If you put a frozen bin inside a room-temperature zone, you'll create conflicts. Match the parent's characteristics or plan to override them explicitly.

5. **Set capacity** — This tells the system how much the location can hold and when to warn you.

   **Total capacity** defines the maximum the location can hold. Choose a unit that makes sense: **Pallets** for large storage areas ("Zone A can hold 50 pallets"), **Cubic feet/meters** for oddly-shaped spaces or mixed storage, **Units** for small bins storing individual items ("Bin holds 200 units"), or **Weight** for vehicles or locations with weight limits ("Service van: 2,000 lbs max"). The system calculates utilization percentages based on this number. If you say a bin holds 100 units but it actually holds 50, the system will show 50% full when it's actually maxed out—so measure accurately.

   **Warning thresholds** tell the system when to alert you:

   **Warning level (typically 75%)** means "pay attention—this location is getting full." A yellow indicator appears and the location shows in "needs attention" lists. Set this early enough to take action before it becomes urgent. Fast-moving staging areas might warn at 85%; slow-moving storage might need attention at 60%.

   **Critical level (typically 90%)** means "take action now—space is running out." You'll see a red indicator, notifications go to supervisors, and the location appears in priority alerts. This is the point where you need to actively manage the situation. If items rarely leave, set this lower; if items move fast, you can run hotter.

   **Maximum level (typically 95%)** means "hard stop—don't add more without removing something." The system may block new receipts, automated processes skip this location, and you'll need an override to use it. Why not 100%? Leave room for operational reality—pallets don't stack perfectly, measurements aren't exact. Service vehicles might use 100% (weight limits are firm), but flexible storage might use 90% (you need working room).

   **Example setups:**
   - Receiving staging (fast flow): 85% warning, 95% critical, 98% max
   - Long-term storage (slow flow): 60% warning, 80% critical, 90% max
   - Service vehicle (hard limit): 70% warning, 90% critical, 100% max

6. **Mark the status** — This controls what operations are allowed.

   **Active** means normal operations—everything is allowed. You can receive inventory, pick items, transfer in/out, count, and adjust. This is your default for operational locations.

   **Inactive** means the location exists but isn't in use right now. It blocks all movements and hides from most searches unless you specifically look for inactive locations. Use this for seasonal areas during off-season, locations being cleaned/repaired but not under audit, or areas you're not currently staffed to manage. Inactive is temporary (you plan to use it again); Archived is permanent.

   **Receive Only** means inventory can come in but nothing can be picked out. You can receive shipments and transfers in, but you can't pick for orders or transfer out. Use this when building up stock in a new zone before it goes live, in holding areas where you accumulate items before moving them all at once, or when transitioning a location to inactive (clear it by blocking new receipts).

   **Pick Only** means inventory can go out but nothing new can come in. You can pick for orders and transfer out, but you can't receive new shipments or transfer in. Use this when clearing out a zone you're shutting down, phasing out locations (let them empty naturally), or managing areas under capacity pressure (stop adding, start removing).

   **Frozen** means completely locked—nothing in or out. All movements are blocked and you need an explicit unfreeze to use it again. Use this for cycle counts/audits, quality investigations, awaiting inspection approval, or maintenance/repairs in progress. You can set automatic expiration: "Freeze until 5 PM today" or "Freeze for 24 hours."

   **Quarantine** (status, not to be confused with Quarantine type) means items are on hold pending approval. Items can enter but require approval workflow to leave. Use this for returns processing, damaged goods investigation, or quality holds. Unlike Frozen (which blocks everything), Quarantine allows managed releases with approval.

   **Archived** means the location is retired and removed from active operations. It's hidden from all normal operations, can't receive inventory, and is preserved for historical reporting only. Use this for permanently closed locations, reorganized areas that no longer exist, or old customer sites you no longer service. Inactive means "not using now, will use later"; Archived means "done with this, probably forever."

   **Quick decision guide:** Normal operations → Active. Temporarily not in use → Inactive. Building stock before release → Receive Only. Clearing out an area → Pick Only. Counting or investigating → Frozen. Items need approval to leave → Quarantine. Done forever → Archived.

**Why this matters:** When you nest a bin inside a refrigerated zone, it automatically inherits the temperature requirements. You set the rule once at the zone level, and every location inside follows it. This inheritance saves configuration time and ensures consistency—you don't have to remember to set temperature requirements on every single bin.

---

## Understanding the Hierarchy

Every location has a family tree. Your setup might look like:

```
Main Warehouse
  └─ Receiving Zone
      └─ Staging Area
          └─ Bin A-47
```

When you view Bin A-47, you see the full path: Main Warehouse > Receiving Zone > Staging Area > Bin A-47. Click any part of that path to jump straight there. This breadcrumb navigation helps you understand context instantly—you know where you are and how to get anywhere else.

**Using hierarchy to your advantage:**

**Set rules once** — Set temperature requirements on the "Frozen Zone," and every bin inside automatically inherits it. Change one setting and all children follow. This prevents configuration drift where some bins have the right settings and others don't.

**Track capacity trends** — If Receiving Zone hits 90%, you know all the bins inside are tight. You don't need to check each bin individually—the zone tells you the overall situation. Look at zone-level metrics to spot problems before they cascade.

**Control access** — Mark a hazmat zone as requiring certification, and the system enforces it for every location inside. Workers scanning bins in that zone see the certification requirement automatically. You don't train people on individual bins; you train them on zones.

**Organize logically** — Group similar locations under common parents. All cold storage bins under "Cold Storage Zone," all receiving bins under "Receiving Zone." When you need to find or operate on similar locations, you know where to look.

**To move a location in the hierarchy:**

1. Open the location you want to move
2. Select "Move"
3. Choose the new parent location
4. Preview the change to see if any rules conflict
5. Confirm the move

The system checks compatibility before allowing the move. You can't accidentally move a frozen bin into a non-refrigerated zone—it will warn you about the temperature mismatch. You can't move a parent inside its own child (creating a circular reference). These guardrails prevent hierarchy corruption.

**Viewing child locations:**

Open any location and view its children to see what's inside. A warehouse shows its zones, a zone shows its bins. Children are listed with their capacity, status, and current inventory. This lets you drill down from high-level (warehouse) to specific (bin) or stay at whatever level makes sense for your task.

---

## Finding Locations Quickly

**Basic search:**
Type "Bin A-47" in the search box. You'll see the location, its current capacity, and its status. Search matches names, codes, and common abbreviations. It's fast and forgiving—partial matches work.

**Smart search:**
You can search by characteristics and the system understands context:
- "frozen storage less than 50% full" — Find available cold storage
- "quarantine active" — See all inspection hold areas that are operational
- "receiving zone" — Show all receiving locations

The system prioritizes useful results. Looking for a place to store frozen goods? It shows frozen zones with available capacity first, not frozen zones that are full or inactive. It understands what you're trying to accomplish and helps you get there.

**Using filters:**

Filters narrow results systematically:

**Status filter** — Show only Active, Frozen, Inactive, Quarantine, or Archived locations. Useful when you're auditing frozen locations or cleaning up inactive ones.

**Type filter** — Limit to Warehouse, Zone, Bin, Service Vehicle, Customer Site, etc. When you're looking for all service vehicles to plan restocking, filter to that type.

**Capacity range** — Show only locations between 30-70% full. Great for finding locations with room to grow but not so empty they're wasted space.

**Parent location filter** — See everything inside a specific zone. When Zone B needs attention, filter to show all children and spot the problem bins.

**Combine filters** for powerful queries: "Show me all active bins in the Receiving Zone that are more than 80% full." This finds exactly what needs immediate attention.

**Saved searches:**

Can't find a saved search feature in the contracts, but basic search with filters is powerful enough for most needs.

---

## Checking What's Stored Where

**To view inventory at a location:**

1. Open the location
2. Go to the "Inventory" section
3. See what products are there, how many units, and their states (available, allocated, in transit, etc.)

The inventory view breaks down by product. Each product shows quantities by state: how much is available for sale, how much is allocated to orders, how much is in transit. This state-level detail helps you understand not just what's there, but what you can actually use.

**For serial or lot-tracked items:**
You'll also see serial numbers or lot codes listed. This is crucial for traceability—if you need to recall a lot or find a specific serial, you know exactly where it is.

**Ownership breakdown:**
If you manage inventory for multiple companies or customers, you'll see how much belongs to each owner. This prevents accidentally selling or using someone else's stock.

**Inventory rollup across hierarchy:**

**To see all inventory in a zone (and its children):**

1. Open the zone
2. Go to "Inventory Rollup"
3. Choose grouping: by product, by category, or by unit of measure
4. Optionally set depth: include all descendants or just go down a few levels
5. Optionally include child breakdowns to see how inventory distributes

**What you see:**
- **By product** — Total units of each product across all child locations
- **By category** — Total inventory for product categories (useful for high-level planning)
- **By UOM** — Aggregated in different units (pallets, cases, units) depending on what makes sense

**Why this is powerful:**
You can check inventory at any level. Want to know how much is in your entire warehouse? Roll up from the warehouse root. Want to know what's in Zone A? Roll up from Zone A. Need to compare Zone A and Zone B? Roll up each separately and compare.

**Point-in-time views:**
You can ask "what was here yesterday?" by using the as-of parameter. This is invaluable for investigations: "We had 100 units yesterday, now we have 80—what happened?" Roll up inventory as of yesterday, compare to today, and investigate the 20-unit difference.

---

## Managing Capacity

Capacity is more than "full" or "empty." It's about understanding trends and acting before problems hit.

**Checking capacity:**

Open any location to see:
- **Total capacity** — Maximum space available
- **Current usage** — How much is occupied right now
- **Available space** — What's left
- **Utilization percentage** — The key number to watch
- **Reserved** — Space allocated but not yet filled
- **In use** — Active space being used

**Setting and adjusting alert thresholds:**

1. Open the location
2. Go to "Alerts" or "Thresholds"
3. Set your warning levels:
   - Warning at 75% — Yellow light, pay attention
   - Critical at 90% — Red light, take action
   - Maximum at 95% — Hard stop

These aren't one-size-fits-all. A staging area with fast turnover can run at 90% comfortably. Long-term storage with slow movement needs alerts at 60% because you can't clear space quickly.

**Adjust based on experience:**
Start with defaults (75/90/95). After a few weeks, review which locations trigger alerts frequently. If you're constantly getting warnings but never hitting critical, raise the warning threshold. If you hit critical before you can react, lower it.

**Reading capacity trends:**

The system doesn't just show current capacity—it shows patterns:
- **Trend line** — Is capacity climbing, stable, or declining?
- **Rate of change** — How fast is it filling? 5% per day or 5% per week?
- **Projected full date** — "At current rate, you'll hit 90% by Thursday 2 PM"

**Example scenario:**

It's Tuesday morning. Receiving is at 70% capacity—comfortable. But the trend shows it's climbing 5% per day. The system projects you'll hit critical (90%) by Thursday afternoon. Three large shipments are arriving Thursday. Without the trend data, you'd think you're fine. With it, you know Thursday will be a problem.

**Action:** Set up overflow relationships now (see Relationships section), or schedule some shipments to ship out Wednesday to free space.

---

## Freezing and Unfreezing Locations

Sometimes you need to pause a location temporarily—during an audit, quality inspection, or maintenance.

**To freeze a location:**

1. Open the location
2. Click "Freeze"
3. Add a reason (required) — "Quality inspection in progress" or "Cycle count in progress"
4. Optionally set an expiration — "Unfreeze automatically at 5 PM today" or "Freeze for 24 hours"
5. Confirm

**What happens when a location is frozen:**
- No new inventory can be added (receipts blocked)
- Nothing can be picked (picking blocked)
- Automated processes skip this location entirely
- Anyone scanning the location sees why it's frozen and when it unfreezes
- The freeze is visible in location lists and search results

**Why set automatic expiration:**
So you don't forget to unfreeze after your work completes. "Freeze until 5 PM" means you don't have to remember to come back and unfreeze manually. The system handles it, and operations resume automatically.

**To unfreeze a location:**

1. Open the frozen location
2. Click "Unfreeze"
3. Add a note (optional) — "Inspection complete, no issues found"
4. Confirm

The location immediately returns to its previous status (usually Active) and all normal operations resume. Items that were waiting can now be picked, new receipts can be accepted.

**When to freeze:**
- **Cycle counting** — Freeze the location so counts aren't disrupted by movements
- **Quality investigations** — Freeze while investigating damaged or suspect inventory
- **Inspections** — Freeze during regulatory or internal audits
- **Maintenance** — Freeze during repairs, cleaning, or reorganization

**Freezing entire zones:**
You can freeze a zone, and all child locations inherit the freeze. This is powerful for large-scale operations: freeze the entire Receiving Zone during an audit, and every bin inside is locked. When you unfreeze the zone, all children unfreeze too.

**Real example:**
A warehouse manager froze Zone C for four hours during a ceiling repair. The system automatically rerouted incoming shipments to overflow areas and notified the receiving team. Workers tried to put pallets in Zone C, their scanners showed "Frozen - Ceiling repair until 3 PM," and they went to the overflow zone instead. When the freeze lifted at 3 PM, everything returned to normal. No confusion, no lost inventory, no damaged goods from a leaky ceiling.

---

## Archiving and Activating Locations

When you reorganize or close seasonal areas, you need to retire locations without losing their history.

**To archive a location:**

1. Ensure the location is empty (no inventory)
2. Open the location
3. Click "Archive"
4. Add a reason — "Seasonal area closed for summer" or "Warehouse reorganization - bin no longer exists"
5. Confirm

**What happens when archived:**
- The location disappears from normal searches and lists
- It can't accept new inventory
- Historical data remains for reports and audits (you can still see what was there and when)
- You can still view it if you explicitly search for archived locations
- You can reactivate it later if needed

**Why archive instead of delete:**
Deletion would break historical reports. If you delete a location, any historical transaction that referenced it becomes orphaned. You'd lose the ability to trace where items were stored last year. Archiving keeps history intact while removing clutter from daily operations.

**To reactivate an archived location:**

1. Search with "Show Archived" enabled
2. Open the archived location
3. Click "Activate"
4. Add a note — "Reopening seasonal area for winter"
5. Choose the new status (usually Active)
6. Confirm

The location returns to active use immediately. It can accept inventory, be included in searches, and function normally. All historical data is still there—you didn't lose anything during archiving.

**Archive vs. Inactive vs. Frozen:**
- **Inactive** — Temporarily not in use, plan to use it again soon. Hidden from most searches but easily reactivated.
- **Frozen** — Temporarily locked for counting or investigation. Automatically unfreezes. Still visible and active, just locked.
- **Archived** — Done with this location, probably forever. Requires explicit reactivation.

---

## Labels and Barcodes

Labels and barcodes connect your digital system to the physical world. They're how workers interact with locations using scanners.

**Understanding label templates:**

Label templates define what information appears on printed labels and how it's formatted. You might have:
- **Standard Bin Labels** — Location code, name, capacity, parent zone
- **Hazmat Labels** — All of the above plus safety warnings, required PPE, special handling icons
- **Customer Site Labels** — Location code, customer name, contact information, site address
- **Service Vehicle Labels** — Vehicle ID, assigned technician, capacity limits

Different location types benefit from different templates. The template determines not just what prints, but colors, sizes, and layouts.

**To view available label templates:**

Go to the label templates section and see what's configured. Each template shows a preview and describes when to use it.

**To preview a label for a specific location:**

1. Open the location
2. Go to "Labels"
3. Choose a template
4. Optionally customize printer profile, material, or color settings
5. Click "Preview"

The preview shows exactly what will print, including the location's actual data. This lets you verify before printing hundreds of labels.

**To generate a label for one location:**

1. Preview the label (as above)
2. If it looks good, click "Print"
3. Choose your printer
4. Select material type (paper, polyester, laminated, etc.)
5. Set number of copies
6. Print

**To generate labels in bulk:**

1. Go to "Batch Labels"
2. Select multiple locations:
   - Individually pick them from a list
   - Select all locations in a zone
   - Use search results and "select all"
3. Choose your template
4. Set printer and material
5. Set copies per location (usually 1)
6. Preview (optional but recommended)
7. Confirm and print

**What happens:**
The system creates a batch print job. You can track the job status, see how many labels printed successfully, and handle any errors. If 50 labels succeed and 2 fail, you can reprint just the 2 failures.

**Checking batch job status:**

After submitting a batch job, you get a job ID. Use it to:
- See job status (queued, printing, complete, failed)
- View how many labels printed
- Download a summary of what printed
- Retry failed labels

This is essential for large print jobs. You don't sit at the printer watching—you submit the job and check status later.

**Understanding barcode formats:**

Barcodes encode location information in scannable form. The system supports multiple formats:
- **Code 128** — High-density, good for alphanumeric codes
- **Code 39** — Lower density, very widely supported
- **QR Code** — Can encode a lot of data, good for complex location info
- **Data Matrix** — Compact 2D barcode, good for small labels

Most warehouses use Code 128 for bins (compact, fast to scan) and QR codes for locations that need more data (customer sites, service vehicles with multiple data points).

**To preview a barcode for a location:**

1. Open the location
2. Go to "Barcodes"
3. Choose a format
4. Preview the barcode

**To generate a barcode:**

1. Preview it (as above)
2. If it looks good, click "Generate"
3. The system creates and assigns the barcode to the location

Now when workers scan that barcode, the system recognizes the location immediately.

**To generate barcodes in bulk:**

1. Go to "Batch Barcodes"
2. Select locations (same as batch labels)
3. Choose barcode format
4. Generate

The system creates barcodes for all selected locations. Track the job with the job ID, just like batch labels.

**Viewing barcode history:**

Open a location and view barcode history to see:
- When barcodes were generated
- What format was used
- Who generated them
- If they were replaced (old barcode vs. new barcode)

This is useful when troubleshooting scanning issues. If someone says "this barcode doesn't work," check history to see if it's been replaced or if there are multiple barcodes (which causes confusion).

**Real-world workflow:**

You're setting up a new zone with 50 bins:
1. Create all 50 bin locations (see "Adding Your First Location")
2. Go to Batch Labels, select all 50 bins, choose "Standard Bin Label" template, preview, print
3. Go to Batch Barcodes, select the same 50 bins, choose "Code 128" format, generate
4. Workers label the physical bins with the printed labels (which include the barcodes)
5. Scan each bin once to verify it works
6. Bins are ready for use

Total time: Maybe 30 minutes for 50 bins. Without batch operations, it would take hours.

---

## Connecting Locations Through Relationships

Locations often work together. Relationships tell the system how they coordinate and automate flows between them.

**Understanding relationship types:**

**Replenishment** — Links a pick location (where workers grab items) to bulk storage (where backup stock lives). When the pick location runs low, the system knows where to get more and can automatically create transfer tasks.

**Overflow** — Links a main location to a backup. When the main location hits a capacity threshold, the system automatically starts directing incoming goods to the overflow. When space opens in the main, it helps move items back.

**Cross-Dock** — Links receiving to shipping for items that barely stop. Products arriving for immediate shipment go through cross-dock locations optimized for quick transfer, not long-term storage.

**Adjacency** — Marks locations that are physically next to each other. Useful for planning pick paths and understanding physical layout.

**Hazard Buffer** — Enforces separation between locations storing incompatible materials. You can't store flammables next to oxidizers, and the hazard buffer relationship prevents it.

**To view relationships for a location:**

1. Open the location
2. Go to "Relationships"
3. See all relationships where this location is involved (as source or target)

Optionally filter by relationship type or direction to focus on specific connections.

**To create a replenishment relationship:**

This is the most common relationship type, so let's walk through it in detail.

1. Open the pick location (e.g., "Pick Bin A-12")
2. Go to "Relationships"
3. Click "Add Relationship"
4. Choose **Replenishment** as the type
5. Select the bulk storage location (e.g., "Bulk Storage Pallet Rack 5")
6. Set direction to **source to target** (bulk storage is the source, pick bin is the target)
7. Set priority (if multiple bulk locations feed this pick bin, lower number = higher priority)
8. Configure rules:
   - **Trigger below** — Replenish when pick bin drops below 20%
   - **Replenish to** — Fill it back up to 80%
   - **Max transfer per day** — Limit to prevent overloading (optional)
   - **Approval required** — Yes/no (usually no for routine replenishment)
   - **Allow partial** — Yes (don't wait for full replenishment if bulk storage is low)
9. Set automation:
   - **Enabled** — Yes (automatic transfer tasks) or No (manual only)
   - **Audit required** — Yes/no (record every replenishment event)
10. Confirm

**What happens:**
When Pick Bin A-12 drops to 20% capacity, the system automatically triggers a replenishment. If automation is enabled, it creates a transfer task: move items from Bulk Storage Pallet Rack 5 to Pick Bin A-12 until A-12 reaches 80%. Workers see the task, execute it, inventory moves, and the pick bin is restocked.

**Why this is powerful:**
You don't manually monitor every pick bin. The system watches them and triggers replenishment automatically. Pickers always have stock to pick from. You configure the rule once and it works forever (or until you change it).

**To create an overflow relationship:**

1. Open the main location (e.g., "Receiving Zone A")
2. Go to "Relationships"
3. Click "Add Relationship"
4. Choose **Overflow** as the type
5. Select the overflow location (e.g., "Overflow Zone C")
6. Set direction (usually source to target—main is source, overflow is target)
7. Configure rules:
   - **Trigger below** — When main hits 75% capacity, activate overflow
   - **Replenish to** — When main drops back to 60%, move items back from overflow
8. Set automation (enabled/disabled)
9. Confirm

**What happens:**
When Receiving Zone A hits 75% capacity, new incoming shipments automatically route to Overflow Zone C instead. When Zone A clears back to 60%, the system helps move items back from overflow to main. This prevents bottlenecks during surge periods.

**Viewing relationship graphs:**

For complex locations with many relationships, view the relationship graph. It shows a visual diagram: this location connects to these other locations via these relationship types. This is invaluable for understanding flow patterns and spotting problems.

**Example:** You have a product that's always out of stock in pick bins. View the relationship graph for those pick bins and discover they're not connected to bulk storage—there's no replenishment relationship. That's why they're not getting restocked automatically.

**To update a relationship:**

1. Open the location
2. Go to "Relationships"
3. Find the relationship you want to change
4. Click "Edit"
5. Update rules, schedules, or automation settings
6. Confirm

Changes take effect immediately. If you raise the replenishment trigger from 20% to 30%, the system starts replenishing earlier.

**To delete a relationship:**

1. Open the location
2. Go to "Relationships"
3. Find the relationship to remove
4. Click "Delete"
5. Confirm

The relationship is removed. Automation stops, but existing inventory and history remain unchanged.

**Relationship schedules:**

Some relationships should only work at certain times:

**Real-time mode** — Active 24/7, triggers whenever conditions are met
**Scheduled mode** — Only active during defined windows (e.g., replenish pick bins every morning at 6 AM)
**Manual mode** — Never triggers automatically, requires manual execution

Configure the schedule when creating or editing the relationship. Set a cron expression for precise timing or use simple schedules like "daily at 6 AM" or "every 4 hours."

---

## Tracking Performance

Performance metrics turn locations from static spaces into assets you can optimize.

**To view location performance:**

1. Go to "Location Performance" in the main menu
2. Set your date range — Last week, last month, or a custom range
3. Select locations to analyze:
   - Specific location IDs
   - All locations in a zone
   - Filter by type (e.g., all bins, all service vehicles)
4. Choose grouping — By individual location, by zone, or by parent
5. Optionally include trend data (time-series showing changes over the period)

**Key performance metrics:**

**Throughput** — How many inventory movements (in and out) occurred in this location during the period. High throughput in staging = healthy (items flow fast). High throughput in long-term storage = investigation needed (why is long-term storage churning?).

**Utilization** — Average capacity used during the period. Shows whether the location is earning its keep. Consistently low utilization (20-30%) suggests the space is wasted or oversized. Consistently maxed utilization (95%+) suggests you need more space or better flow management.

**Dwell time** — Average time items stay in the location before moving. Short dwell in staging = good. Long dwell in pick bins = items aren't selling. Increasing dwell time = slowing sales or overstocking. Decreasing dwell time in quarantine = faster inspections.

**Understanding trends:**

Performance isn't just a snapshot—it's patterns over time. The system can show:
- **Throughput trending up** — Location is getting busier
- **Utilization creeping higher** — Location is filling up gradually
- **Dwell time increasing** — Items are sitting longer

These trends predict future problems. If utilization climbs 2% per week, you know you'll hit capacity in 10 weeks. Plan now instead of reacting in crisis mode.

**Comparing locations:**

When you select multiple locations, the system compares them side-by-side. This reveals:
- Which bins are most productive (high throughput, good utilization, short dwell)
- Which bins are underperforming (low throughput, wasted space, long dwell)
- Outliers that need investigation (one bin has 10x the throughput of similar bins—why?)

**Using performance data for decisions:**

**Example 1:** Zone B's throughput dropped 20% last week. Investigation shows several bins were incorrectly marked "pick-only" after a reorganization, preventing replenishment. Fix the status, throughput returns to normal.

**Example 2:** Pick Bin C-15 has dwell time climbing from 3 days to 7 days. The product stored there is slowing down. Alert sales, consider reducing stock levels, or reallocate the bin to a faster-moving product.

**Example 3:** Service Vehicle 5 consistently runs at 95-98% capacity while Vehicle 7 runs at 40%. Rebalance technician assignments or inventory allocation to even out the load.

**Exporting performance data:**

You can export performance metrics for deeper analysis in spreadsheets or BI tools. This is useful for:
- Executive reporting
- Detailed variance analysis
- Correlation with sales or operational data
- Long-term trend analysis (year-over-year comparisons)

---

## Search and Mass Operations

When you need to find or change many locations at once, advanced search and mass operations save enormous time.

**Advanced location search:**

1. Go to "Location Search"
2. Build your query with filters:
   - **Status** — Active, inactive, frozen, quarantine, archived
   - **Type** — Warehouse, zone, bin, vehicle, customer site, virtual, mobile, drop ship, quarantine
   - **Parent** — All locations under a specific parent
   - **Capacity utilization** — Min and max percentages (e.g., 70-90% full)
   - **Zones** — Specific zone identifiers if your organization uses zone tags
3. Execute search
4. See results with key details (name, code, type, status, capacity)

**Search is the foundation for mass operations.** Find the locations you want to change, then apply mass updates to all of them at once.

**Mass update preview:**

Before making any mass change, always preview:

1. Use search to find locations (e.g., "all bins in Cold Storage Zone")
2. Go to "Mass Update"
3. Select locations from search results (or manually add IDs)
4. Choose what to change:
   - Status (e.g., change from active to receive-only)
   - Capacity thresholds (e.g., raise warning level from 75% to 80%)
   - Attributes (e.g., add temperature monitoring to all)
5. Click "Preview"

**What preview shows:**
- Exactly which locations will change
- What the old values are and what the new values will be
- How many inventory units are affected
- Any conflicts or warnings (e.g., can't change a location with pending transactions)

Preview is your safety net. It shows consequences before you commit. If preview says "147 locations will change, 2,830 inventory units affected," you know the impact.

**Executing mass updates:**

1. Review the preview carefully
2. If it looks correct, click "Execute"
3. The system creates a mass update job
4. Track the job with the job ID

**Tracking mass update jobs:**

1. Go to "Mass Update Jobs"
2. Find your job by ID or date
3. See status:
   - **Queued** — Waiting to start
   - **In Progress** — Actively updating locations
   - **Complete** — Finished successfully
   - **Partial** — Some succeeded, some failed
   - **Failed** — Update didn't work

For partial or failed jobs, see which locations succeeded and which failed. You can retry failures individually or investigate why they failed.

**Undoing mass updates:**

If a mass update was a mistake, you can undo it:

1. Go to "Mass Update Jobs"
2. Find the job you want to undo
3. Click "Undo"
4. Confirm

The system reverts all changes made by that job. Locations return to their previous state. This is a lifesaver when you accidentally update the wrong locations or realize the change broke something.

**Important:** Undo only works if you haven't made other changes to those locations in the meantime. If you mass update 50 locations, then manually edit 5 of them, undo will only revert the 45 you didn't touch.

**Real-world mass operation workflows:**

**Scenario 1: Seasonal cold storage activation**
It's November. You need to activate 80 cold storage bins for winter products.
1. Search: "all bins in Cold Storage Zone, status=inactive"
2. Mass update: Change status to active, set capacity thresholds (60/80/90)
3. Preview: Verify all 80 bins
4. Execute
5. Done in 5 minutes instead of 80 individual updates

**Scenario 2: Temperature monitoring compliance**
New regulations require temperature monitoring on all cold storage. You have 120 cold storage locations.
1. Search: "all locations, type=bin or zone, attributes include temperature-controlled"
2. Mass update: Add "temperature monitoring enabled" attribute
3. Preview: Confirm 120 locations
4. Execute
5. All locations now compliant

**Scenario 3: Capacity threshold adjustment**
After 3 months, you realize your receiving zone thresholds are too conservative. Alerts trigger constantly but never become problems.
1. Search: "all bins in Receiving Zone"
2. Mass update: Change warning threshold from 75% to 85%
3. Preview: See 45 bins affected
4. Execute
5. Alerts drop by 60%, only trigger when actually needed

**Scenario 4: Accidental mass update**
You meant to update bins in Zone A but accidentally selected Zone B.
1. Realize the mistake immediately
2. Go to Mass Update Jobs
3. Find the job (it just ran 2 minutes ago)
4. Click "Undo"
5. Zone B returns to original state
6. Run the correct update on Zone A

---

## Bringing It All Together: A Day in the Life

Let me show you how all these capabilities work together in a real operational day.

**Monday, 7:00 AM — Tom, Receiving Manager**

Tom starts his day by checking location capacity. He opens the capacity dashboard and sees Receiving Zone A at 68%—comfortable for now. But three large shipments arrive today. He checks the trend: climbing 5% per day means he'll hit 83% by end of day. Tomorrow's shipments would push him to 95%.

Tom sets up an overflow relationship: Receiving Zone A → Overflow Zone C, trigger at 80%. Now if Zone A hits 80%, incoming shipments automatically route to Overflow Zone C. Problem solved proactively.

**Monday, 9:30 AM — Lisa, Quality Manager**

A batch of returned items arrived Friday and sat in Bin D-123 over the weekend. Lisa needs to inspect them before they can be restocked or scrapped.

She opens Bin D-123, clicks "Freeze," adds reason: "Return inspection - quality hold." She sets automatic unfreeze for 5 PM today (she knows inspection will be done by then). Now workers can't accidentally pick from this bin or add more items to it. Her inspection team can work without interruption.

**Monday, 11:45 AM — Marcus, Picker**

Marcus is picking orders. He scans a bin in the electronics zone (Bin E-42). His scanner immediately displays:
- Location: Bin E-42, Electronics Zone
- Status: Active
- Special requirements: ESD gloves required, high-value area, QC scan before shipping
- Current stock: 47 units available

He doesn't need to remember which bins require ESD gloves—the location tells him. He grabs the gloves, picks the items, scans them for QC, and moves on.

**Monday, 1:15 PM — Janet, Operations Manager**

Janet reviews weekly performance metrics. She notices Zone B's throughput dropped 20% last week. That's unusual—Zone B is normally one of the busiest.

She drills down to individual bins in Zone B. Three bins show zero throughput, which is suspicious. She opens those bins and sees they're marked "pick-only" status. That's wrong—they should be active (both receiving and picking).

She uses mass update:
1. Selects the 3 problem bins
2. Changes status from "pick-only" to "active"
3. Previews (confirms only 3 bins change)
4. Executes

The 3 bins immediately start accepting replenishment again. Zone B's throughput will return to normal.

**Monday, 3:00 PM — Tom, Receiving Manager (continued)**

The third large shipment of the day arrives. Receiving Zone A is now at 82%. The overflow relationship Tom set up this morning kicks in automatically. The system directs this shipment to Overflow Zone C. Workers see on their tablets: "Zone A at capacity, use Zone C per overflow rule."

They take the shipment to Zone C, scan it in, and everything tracks correctly. No confusion, no bottlenecks, no supervisor scrambling to find space.

**Monday, 5:00 PM — Lisa, Quality Manager (continued)**

Lisa's inspection of Bin D-123 is complete. The items are fine—they can be restocked. She doesn't need to manually unfreeze the bin because she set automatic unfreeze for 5 PM. The bin automatically returns to active status. Workers can now restock or pick from it.

Lisa checks her notes: of the 30 returned items, 28 are good for resale, 2 need scrapping. She creates an adjustment for the 2 damaged units, documenting the reason. The adjustment reduces inventory by 2, and the transaction references the inspection freeze for audit trail purposes.

**Monday, 5:30 PM — Tom, Receiving Manager (wrap-up)**

Tom reviews the day. Receiving Zone A ended at 83%—right where he projected. Overflow Zone C has 4 pallets from this afternoon's shipment. Tomorrow morning, his team will move them back to Zone A as space opens up (or the overflow relationship will automatically trigger transfers).

He checks the replenishment relationships for pick bins. All good—pick bins are restocking automatically overnight. Tomorrow morning, pickers will have fresh stock.

He approves a mass update job that warehouse supervisor Sarah submitted: relabeling 25 bins in Zone D after reorganization. The preview looks correct (25 bins, no inventory impact, just new labels and barcodes). He clicks "Execute." The batch print job runs, labels print, and tomorrow workers will apply the new labels.

**End of day:**

The warehouse processed three large shipments without congestion. Quality inspections happened without disrupting operations. Pickers had the information they needed right when they scanned bins. An operations issue was identified and fixed in minutes. Everything tracked correctly, and audit trails are complete.

The location system orchestrated all of this, turning what could have been a chaotic Monday into smooth operations.

---

## Common Questions & Troubleshooting

### "Why can't I move items to this location?"

When the system prevents using a location, it's protecting you from problems. The location might be frozen for inspection, at maximum capacity, or designated for different product types. Instead of forcing items into the wrong place and creating problems later, the system stops you and explains why.

Check the location's status—is it frozen or inactive? Check capacity—is it at maximum? Check any special requirements—does it require certain product types or handling? The system tells you the specific reason. Fix that issue and you can use the location.

### "What does the warning symbol mean?"

Warning symbols are like a check-engine light—something needs attention before it becomes a problem. A yellow triangle might mean approaching capacity. A thermometer might indicate temperature requirements aren't being met. A clock might show the location hasn't been counted recently.

These aren't emergencies. They're the system saying, "You might want to look at this." Address warnings during slower periods to prevent urgent issues during busy times. Open the location to see the specific warning and recommended action.

### "How do I choose the right location type?"

Think about what the space does physically. A building = Warehouse. A major area inside = Zone. An individual storage spot = Bin. Items waiting for inspection = Quarantine. A tech's van = Service Vehicle. Inventory at a customer's facility = Customer Site. Placeholder for in-transit items = Virtual.

The type determines what rules the system enforces. Choose based on real-world function, not just convenience. If you're not sure, start with the closest match and test it. Changing types later is possible but requires emptying the location first.

### "Why do some locations have relationships and others don't?"

Not every location needs relationships—just locations that work together regularly. A pick face and its bulk storage backup need a replenishment relationship because they coordinate inventory flow. A main zone and its overflow need that connection. But a standalone long-term storage bin that rarely interacts with others? It's fine without relationships.

Add relationships when locations need to coordinate automatically, not just because the feature exists. Too many relationships create complexity without value.

### "What happens when I archive a location?"

Archiving removes the location from daily operations but preserves all history. The location disappears from normal searches and lists. It can't accept new inventory. But historical data remains intact—you can still see what was stored there last year, run reports that include it, and prove to auditors what happened.

This is crucial for locations that no longer exist physically. You reorganized Zone A last month and those bins are gone. Archive them so they don't clutter current operations, but keep history for compliance and analysis.

### "How often should I review location performance?"

Weekly reviews catch trends before they're problems. Look for locations with declining throughput (why?), increasing dwell times (items sitting too long?), or consistent capacity warnings (need more space? better flow?).

Monthly deep-dives spot seasonal patterns and help plan changes. Compare this month to last month and to the same month last year. Are patterns shifting? The system highlights anomalies and trends, so you're not hunting through spreadsheets.

Don't review obsessively (daily reviews of every bin is overkill), but don't ignore it for months either. Weekly for operational decisions, monthly for strategic planning.

### "Can I change a location's type after creation?"

Yes, but it requires planning. The system allows sensible changes (regular bin → quarantine) but prevents dangerous ones (hazmat area → food storage without proper certification and cleaning protocols).

Before changing type:
1. Ensure the location is completely empty
2. Verify all child locations are compatible with the new type
3. Check that new type requirements can be met (certifications, equipment, procedures)

It's often easier to create a new location with the correct type than to force an incompatible conversion. If you find yourself fighting the system, that's a sign the type change doesn't make sense.

### "How do I handle locations with multiple purposes?"

You don't. Create separate locations for separate purposes. If a zone sometimes stores frozen goods and sometimes stores dry goods, you're asking for trouble. Create "Zone A - Frozen" and "Zone A - Dry" as distinct locations.

Mixing purposes in a single location creates:
- Confusion for workers (which products go here today?)
- Incorrect capacity tracking (frozen capacity ≠ dry capacity)
- Safety risks (wrong product in wrong environment)
- Audit problems (can't prove temperature compliance if it's mixed)

Multiple locations means clear rules, accurate tracking, and safer operations.

### "Why did my mass update job fail?"

Common reasons:
- **Locations have pending transactions** — Can't change a location while a transaction is actively moving inventory
- **Invalid status transitions** — Can't go from archived directly to frozen (must activate first)
- **Capacity conflicts** — Setting maximum below current usage
- **Hierarchy conflicts** — Moving locations would create circular references
- **Permission denied** — You lack permission for some locations in the batch

Check the job details for specific failures. The system lists which locations failed and why. Fix those specific issues (complete pending transactions, correct invalid transitions, etc.) and retry just the failures. You don't have to redo successful updates.

### "What if I accidentally unfreeze during a count?"

If you unfreeze a location during a count, inventory movements can happen immediately, invalidating the count. If this happens:

1. Re-freeze the location immediately (stop further movements)
2. Check transaction history—did any movements occur during the unfreeze window?
3. If yes, void the count and start over (it's no longer accurate)
4. If no movements occurred, you got lucky—continue the count and be more careful about automatic unfreezes

Prevention: When freezing for counts, don't set automatic unfreeze times unless you're certain the count will complete before then. It's safer to manually unfreeze after verifying count completion.

---

## Chapter Summary

Inventory locations transform physical spaces into intelligent assets that guide decisions, enforce rules, and automate workflows. Every location has a type, status, capacity, and position in the hierarchy. These properties determine what the location can do and how it interacts with the rest of your operation.

**Key takeaways:**

**Start simple** — Warehouse → Zone → Bin is the foundation. Add complexity (relationships, special types, automation) only when you need it.

**Let hierarchy work for you** — Set rules once at the zone level and every child inherits them. Don't configure every bin individually.

**Use the right type** — Type determines behavior. Choose based on real-world function (what does this space actually do?).

**Track capacity proactively** — Warning thresholds and trends prevent problems before they happen. React to warnings, not crises.

**Freeze for accuracy** — Freeze locations during counts and investigations to ensure data integrity. Use automatic expiration to prevent forgotten unfreezes.

**Automate with relationships** — Replenishment and overflow relationships reduce manual coordination. Configure once, benefit forever.

**Label and barcode systematically** — Batch operations make labeling 100 bins as easy as labeling 1. Workers need scannable references to locations.

**Monitor performance** — Throughput, utilization, and dwell time reveal problems and opportunities. Weekly reviews catch issues early.

**Mass operations save time** — Search finds the locations you need, mass update changes them all at once, preview prevents mistakes, undo fixes accidents.

The inventory locations system is your warehouse's operating system. Master it, and you master your physical inventory operation.
