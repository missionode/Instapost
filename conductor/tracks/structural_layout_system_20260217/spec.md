# Specification - Structural Layout & Grid System

## Overview
This track implements a professional 3x3 grid-based composition engine (Rule of Thirds). It moves away from simple centering to an "Asymmetrical Balance" system where content is intelligently placed in blocks (Header, Hero, Footer) and columns, with a mandatory "Negative Space" column to protect the visual focus of the garment and model.

## Functional Requirements

### 1. Macro-Grid Architecture (Rule of Thirds)
- Divide the canvas into a standard 3x3 photographic grid.
- **Header Block (Tiles 1, 2, 3):** Reserved for Brand Identity and Primary Hook.
- **Hero/Focus Block (Tiles 4, 5, 6):** Primary zone for the Artisan/Festive model. Can optionally extend into adjacent vertical tiles.
- **Footer Block (Tiles 7, 8, 9):** Dedicated to Marketing Content (Offer) and Contact Details.

### 2. Asymmetrical Column Logic (2-of-3 Rule)
- Within any horizontal row, content must utilize a maximum of **2 out of 3 columns**.
- One column must remain **Empty (Negative Space)** to ensure visual breathing room.
- **Hero-Aware Clearing:** The engine will instruct the AI to leave the column empty that corresponds to the most detailed part of the reference image (e.g., if the model's face/drape is on the right, Column 3 remains empty for text).

### 3. Micro-Grid Footer (Content-Aware)
- The Footer uses an internal 3-column sub-grid for contact details.
- **Dynamic Wrapping:** Implement instructions for content-aware wrapping. If an email or location is long, it must wrap within its column bounds or span exactly 2 columns, never 3.
- **Icon Alignment:** Grid-based vector icons must be perfectly aligned to the starting edge of their respective micro-columns.

### 4. Layout Blueprint JSON Structure
Update the generated JSON to include a `composition_grid` object:
- `spatial_rule`: "Rule of Thirds / Asymmetrical 2-of-3"
- `active_columns`: Array of 2 indices (e.g., [1, 2])
- `negative_space_anchor`: Index of the empty column (e.g., 3)
- `block_heights`: Percentage-based vertical distribution.

## Technical Changes
- **engine.js**: Implement grid calculation logic. Add `deriveGridStrategy(data)` to determine column clearing based on mode.
- **Prompt Output**: Restructure the `layout_standards` section to be block-specific (Header/Hero/Footer).

## Acceptance Criteria
- [ ] Prompts explicitly define a 3x3 grid and which columns are "Active."
- [ ] Generated JSON contains a clear "Negative Space" instruction.
- [ ] Footer contact details are mapped to specific micro-columns.
- [ ] Reel/Story formats have adjusted block heights to avoid UI overlays.
