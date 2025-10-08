# Smackdab Inventory System Manual Writing Prompt

## Role and Goal
You are writing a chapter of the Smackdab Inventory System Manual that is practical, educational, and actionable. Your audience is non-technical operators, managers, and product designers who need to understand both HOW to use the system and WHY it works the way it does.

## Tone and Voice
- **Educational but not academic** — Teach concepts through doing, not lecturing
- **Practical and direct** — Start with "To do X, follow these steps..." then explain why
- **Conversational but precise** — Natural language flow, not rigid templates or bullet formats
- **Consequence-aware** — Always explain what happens if you choose wrong

## Absolute Grounding Rules
You MUST base every statement on the API contracts in this repository:
- `backend/inventory-contracts/openapi/inventory/foundation/[DOMAIN_PATH]/main.yaml`
- `backend/inventory-contracts/openapi/inventory/foundation/[DOMAIN_PATH]/paths/*.yaml`
- `backend/inventory-contracts/openapi/inventory/shared/schemas/*.yaml`
- `backend/inventory-contracts/openapi/inventory/shared/examples/*.json`

**Never speculate.** If it's not in the contracts, don't mention it. If you need to explain a concept, derive it from what the contracts actually support.

## Forbidden in Output
- Endpoint names, HTTP verbs, JSON structures
- Field names in technical format (use plain English instead)
- Screenshots or UI mockups
- "OpenAPI," "YAML," "schema," or other technical artifact references
- Roadmap features or speculative capabilities

## Structure and Content Formula

### 1. Start with Immediate How-To
Begin each major section with actionable steps:

**Good:**
```
**To add a location:**

1. **Name it clearly** — Use names that make sense to your team...
2. **Give it a code** — This is the short identifier your scanners will use...
3. **Choose a type** — This is critical because...
```

**Bad:**
```
Locations are fundamental to the inventory system. They represent physical spaces where...
[3 paragraphs before telling user what to actually do]
```

### 2. Explain Options with Full Context
For every choice the user must make (type, status, threshold, etc.), provide:
- **What it is** — Brief definition in plain language
- **When to use it** — Specific scenarios with examples
- **What the system does** — Behavior and enforcement
- **What goes wrong** — Consequences of wrong choice
- **How to decide** — Quick decision guide at the end

**Format this naturally in flowing paragraphs, NOT as repetitive "What it is / When to use it" bullets.**

**Example (GOOD):**
```
**Active** means normal operations—everything is allowed. You can receive inventory, pick items, transfer in/out, count, and adjust. This is your default for operational locations.

**Inactive** means the location exists but isn't in use right now. It blocks all movements and hides from most searches unless you specifically look for inactive locations. Use this for seasonal areas during off-season, locations being cleaned/repaired but not under audit, or areas you're not currently staffed to manage. Inactive is temporary (you plan to use it again); Archived is permanent.
```

**Example (BAD - too structured):**
```
**Active**
- What it is: Normal operations
- When to use it: Default for operational locations
- What you can do: Receive, pick, transfer, count, adjust
```

### 3. Blend Education with Instruction
Never separate "concepts" from "how-to." Teach concepts through doing.

**Good:**
```
**To freeze a location:**

1. Open the location
2. Click "Freeze"
3. Add a reason (required) — "Quality inspection in progress"
4. Optionally set an expiration — "Unfreeze automatically at 5 PM today"
5. Confirm

**What happens:** No new inventory can enter, nothing can be picked, and automated processes skip this location. Anyone scanning sees why it's frozen and when it unfreezes. Set automatic expiration so you don't forget to unfreeze after your audit completes.
```

**Bad:**
```
[Section explaining freeze concept for 3 paragraphs]
[Separate section later with steps to freeze]
```

### 4. Use Real Scenarios Throughout
Weave practical examples into every section:
- "A warehouse manager once froze an entire zone for four hours during a ceiling repair..."
- "If Receiving Zone A hits 75%, the system automatically starts directing incoming shipments to Overflow Zone C..."
- "When Marcus the picker scans a location in the electronics zone, his scanner shows this is a high-value area requiring special handling gloves..."

### 5. Progressive Detail Levels
- **First pass:** The immediate action and basic reasoning
- **Second pass:** Options, variations, and when to use each
- **Third pass:** Edge cases, consequences, and decision guides

### 6. Section Structure Template

Each major capability section should follow this flow:

**Section Title: [Capability Name]**

1. **Opening context** (1-2 sentences) — Why this matters
2. **Primary how-to** — "To do X: [numbered steps]"
3. **Detailed explanations** — Expand each option/choice inline with consequences
4. **Examples** — Real scenarios showing it in use
5. **Decision guide** (if applicable) — Quick reference for choosing between options

## Specific Content Guidelines

### Location Types
For each type, explain in one flowing paragraph:
- What it represents physically
- When you'd create one (specific examples)
- What system behaviors it triggers
- What breaks if you choose wrong
- End with a decision guide

### Statuses
Explain what each status allows/blocks, why you'd use it, and how it differs from similar statuses. Always contrast Inactive vs. Archived, Frozen vs. Quarantine, etc.

### Capacity and Thresholds
- Explain different capacity units (pallets, cubic feet, units, weight)
- Detail what each threshold level means and what happens when hit
- Provide example threshold setups for different location types
- Explain why 95% max instead of 100% (operational reality)

### Relationships
For each relationship type:
- Describe the coordination pattern in plain terms
- Give step-by-step setup instructions
- Explain the rules and when automation triggers
- Provide a real use case scenario

### Performance Metrics
- Explain what each metric reveals about operations
- Show how to interpret patterns (good vs. bad)
- Give examples of acting on insights

## Length and Depth
- **Total chapter length:** 3,000-5,000 words
- **Individual sections:** As long as needed to cover the depth shown in examples above
- **Don't artificially limit detail** — If a choice has 8 options, explain all 8 thoroughly
- **Do write efficiently** — Use natural paragraphs, not repetitive templates

## Quality Checklist
Before finalizing, verify:
- [ ] Every capability maps to a contract path/schema
- [ ] Every section starts with actionable steps
- [ ] Every choice includes consequences of wrong selection
- [ ] Options are explained in flowing prose, not rigid bullet structures
- [ ] Real scenarios are woven throughout
- [ ] No endpoint names, JSON, or technical artifacts appear
- [ ] Decision guides appear for complex choices
- [ ] The chapter teaches through doing, not just explaining

## Reference Examples

**Good paragraph structure:**
> **Service Vehicle** — A truck, van, or vehicle that carries inventory to job sites with a specific technician. Use this for field service operations where technicians carry parts and supplies. The system requires technician assignment, enforces weight/volume limits, restricts access to the assigned technician only, and tracks mobile inventory. If you use a regular bin, anyone can access the inventory and you lose control over who has what in the field.

**Good how-to integration:**
> **To generate labels in bulk:**
>
> 1. Go to "Batch Labels"
> 2. Select multiple locations (or choose all in a zone)
> 3. Pick your template
> 4. Choose printer and material type
> 5. Set copies per location (default 1)
> 6. Preview to check for duplicates or errors
> 7. Print
>
> The system checks for duplicates and warns you before creating confusion. Reorganizing a zone and need to relabel 50 bins? This takes minutes instead of hours.

## When to Use This Prompt

Use this prompt whenever you need to:
- Write a new manual chapter for a different domain (Products, UOM, Returns, etc.)
- Revise an existing chapter to match this style
- Ensure consistency across all manual chapters
- Expand a section that's too thin on detail

Provide the prompt along with:
1. The domain you're documenting (e.g., "Inventory Locations," "Products," "Purchase Orders")
2. The relevant contract file paths
3. Any specific sections or capabilities to emphasize
