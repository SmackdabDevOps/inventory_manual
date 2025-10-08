---
outline: deep
generated_from: docs/manual/TOC.md
status: draft
---

# How-To: How To: Move and Fulfill

This page contains task-driven examples for "How To: Move and Fulfill" based on the manual's Table of Contents.

## Tasks in this section
- Create picks for your team
- Confirm picked items and handle shortages
- Transfer stock between locations
- Record shipments and track delivery status
- Confirm delivery when goods arrive

## Prerequisites
- Basic familiarity with Smackdab navigation
- Appropriate roles/permissions

## Scenario: Morning Rush Fulfillment Sprint

It is 7:30 AM at Main Warehouse. Overnight orders stacked up because a carrier arrived late and inventory is sitting in receiving. Your goal: clear the backlog before the first truck leaves at 10:00 AM.

### 07:30 — Triage dashboards
- Open **Operations → Fulfillment Control Tower** to spot orders at risk (filter: `ship-by <= today`).
- Tag high-priority orders with the `Rush` flag so pick waves surface them automatically.
- Check `/education/dashboards-and-visualization` for interpreting the red/yellow service badges.

### 07:45 — Shape the pick wave
- Launch a **cluster pick** for the rush orders (menu: `Fulfillment → Picks → Create Wave`).
- Use the slotting heat map to optimize the route; this avoids crossing aisles twice.
- Generate pick tasks to the RF devices assigned to Team Alpha and confirm acknowledgements.

### 08:05 — Handle shortages on the floor
- A picker flags a shortage for Item `CM-500`. Jump to **Inventory → Transfers** and see that Downtown Store has surplus.
- Start an **emergency move** (`Transfer Type → Emergency`) for 10 units with a two-hour SLA.
- Add context in the notes: _“Rush order #SO-22018 waiting. ETA backfill 09:15.”_
- Cross-link the transfer ID inside the order so customer service can answer “where is it?”

### 08:40 — Stage and load
- As picks complete, scan totes into **Staging Zone B**; the system validates that all priority lines exist.
- Print the shipment manifest and attach it digitally to the order; this feeds the API endpoint `/operations/shipping/v1/shipments`.
- If a tote arrives without a scanned pick, trigger an exception workflow (see `/education/transactions-overview`).

### 09:20 — Verify cross-dock arrivals
- The emergency move arrives; receiving books it directly into staging with a **cross-dock receipt** so stock never hits storage.
- Update the wave status to `Ready to Load` and release the truck at 09:45, ahead of the commitment.
- Capture a quick debrief in `/examples/09-how-to-count-and-reconcile` to feed tomorrow’s stand-up.

## Common pitfalls
- **Skipping transfer context.** Missing notes leave approvers guessing and slows down emergency moves.
- **Ignoring tote exceptions.** Unscanned totes mask picking errors; resolve before loading.
- **Late cross-dock confirmations.** If receiving does not flip status immediately, on-hand balances mislead the next wave.

## Related education
- `/education/transfers-between-locations` — choosing transfer types and running the playbooks.
- `/education/allocations-reserving-inventory` — ensuring the rush order keeps its promised stock.
- `/education/workflow-automation` — auto-triggering alerts when waves slip from their SLA.
