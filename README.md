# DollarTracker v3.9.0 Family Profiles

Focus: add a clean Profile Manager for separate family ledgers while keeping the UI simple, local-only, and iPhone-safe.

## v3.9.0 changes

- Added **Family Profiles** for separate ledgers such as Me, Mom, Dad, and Brother.
- Existing records migrate safely into the default **Me** profile with no money recalculation.
- The top bar now has a small profile switcher beside the language control.
- Profile switching updates Home, History, monthly summary, budgets, categories, selected totals, and drafts to the active profile.
- Added a compact Profile sheet with switch, create, rename, archive, restore, delete, and photo controls.
- Profile photos are chosen from the device, cropped to a square, resized to 192×192, compressed as JPEG, and stored locally in the backup/settings data.
- Each profile has its own categories and category budgets; theme, language, exchange rate, and app name remain shared.
- JSON backup/export now includes all profiles, all records, profile photos, and profile metadata.
- Backup import preview now shows profile count and record count before replacing data.
- CSV export now includes a **Profile** column.
- History selection and open swipe actions clear when switching profiles to avoid confusing totals or stale actions.
- Kept recurring transactions out of this build so the new profile system can be tested cleanly first.

# DollarTracker Stable v3

Local-only mobile ledger app.

## Important fixes

- Balance loads from storage immediately on first open.
- USD/KHR choice stays saved after refresh/app close.
- Copy button has 3 layers:
  1. Clipboard API
  2. iOS textarea fallback
  3. Manual prompt fallback
- Clear All Records uses a tap-twice system, not browser confirm.
- Records migrate from older Wifey Money/DollarTracker storage keys.
- Service worker now uses network-first for app files to reduce stale cache bugs.
- Flag paths are PNG:
  - `flag-en.png`
  - `flag-kh.png`

## Upload these files

- index.html
- styles.css
- app.js
- manifest.webmanifest
- service-worker.js
- icon.png
- apple-touch-icon.png
- icon-192.png
- icon-512.png
- flag-en.png
- flag-kh.png
- theme-pink.svg
- theme-web.svg
- theme-symbiote.svg
- theme-blush.svg
- theme-ocean.svg
- theme-pearl.svg
- theme-frost-pine.svg
- README.md

`icon.svg` is a legacy file from before the approved chrome dollar PNG icon and is not referenced anywhere; safe to leave out. `theme-web-card.png` and `theme-pink-card.png` should NOT be uploaded — see the "Web/Pink SVG Restore" note above.

## If iPhone still shows old behavior

It means iOS is still running old cached JavaScript. Delete the Home Screen app and clear the website data for the GitHub Pages domain, then open and add it again.


## v3.0.1 Text field fix

- Disabled autocomplete/autocorrect/spellcheck on the transaction form.
- Draft description now saves on input, change, and blur.
- This reduces iPhone/PWA cases where a previous description like AC comes back after typing AC.


## v3.1 Simple PIN + Editable History

Simple stable additions only:
- Added simple PIN protection for edit, delete, and clear records.
- Skipped Face ID/passkey for now to avoid browser/PWA complexity.
- Added editable history records.
- History record amounts now display their original recorded amount/currency.
- Added `exchangeRateAtEntry` so changing current exchange rate does not rewrite history amounts.


## v3.2 Simple Features

Added low-risk practical features:
- Categories for records.
- Monthly Summary card.
- Quick Description chips.
- Edit History Log for changed records.
- PIN section now hides the PIN input after PIN is set.
- History money-in amounts no longer show `+`.
- Money-in history amount is green.
- History amounts remain locked to the original recorded amount/currency.


## v3.3 Bank PIN + Calculator

Careful larger update:
- Flag images moved to root folder: `flag-en.png`, `flag-kh.png`.
- No `assets/` folder is required anymore.
- Removed the old bank wording everywhere; quick descriptions use AC/ACLEDA only.
- Added bank-style custom PIN setup with 4 PIN or 6 PIN choice.
- PIN entry uses an in-app number pad, not the phone letter keyboard.
- Protected unlock session lasts 5 minutes while the app is open.
- Unlock resets when the app is closed/backgrounded/reopened.
- Added Lock Now button.
- Added calculator inside the Add page, not the navbar.
- Calculator supports USD/KHR and fills the amount field.
- KHR uses whole Riel only, no decimals.
- Navbar active state now slides like a smooth dragging pill.


## v3.3.1 Rechecked Patch

- Fixed KHR backup/import edge case:
  if a record has `exchangeRateAtEntry` but no `amountUSD`, migration now uses the entry rate, not the current settings rate.
- Bumped app version and service worker cache again.
- Re-ran static and logic checks before delivery.


## 3.4.0-phase1-deepfix-final

Final Phase 1 deepfix:
- Rebuilt from stable v3.3.1.
- Replaced the entire old v3.3 PIN/calculator CSS block.
- Removed PIN/security UI and logic.
- Kept calculator, but made the open button SVG icon-only.
- Used the approved chrome dollar PNG icon for app icons.
- Used user-provided root language flags.


## 3.4.0-phase2-history-filter

Phase 2: Cleaner History page
- Search stays visible on History.
- All/In/Out chips stay visible.
- From date, To date, Sort, Clear Filters moved into a bottom sheet.
- Added Filter button with active state when advanced filters are applied.
- Confirmed no old PIN/security logic was present before building.


## 3.4.0-phase3-performance

Phase 3: Performance cleanup
- Debounced History search rendering only.
- Amount, date, sort, transaction, and settings inputs still update immediately.
- `translateUI()` no longer runs inside every normal render.
- Translations still run on boot, page change, and language change.
- Built from the clean Phase 2 History Filter version after checking no PIN/security leftovers.


## 3.4.0-phase4-backup-calc-polish

Phase 4: Backup reminder + calculator polish
- Adds a non-blocking backup reminder banner on Home.
- Reminder appears when records exist and no backup exists, or last backup is 7+ days old.
- Dismiss hides the reminder for the day.
- Export Backup from the banner updates the backup date and hides the reminder.
- Calculator backspace key now uses an iOS-style delete/backspace SVG icon in the requested slot.
- Built from Phase 3 after checking no PIN/security leftovers.


## 3.4.0-phase5-budget-caps

Phase 5: Category budget caps
- Adds monthly budget caps for Food, Transfer, Shopping, Transport, Savings, and Other.
- Budgets are stored internally in USD in `settings.categoryBudgets`.
- Budget inputs display in the current USD/KHR mode.
- KHR budget inputs use whole Riel display.
- Home shows monthly budget progress using this month's Out records.
- Built from Phase 4 after checking no PIN/security leftovers.


## 3.4.0-phase6-categories-chart

Phase 6: Manageable categories + monthly category breakdown
- Categories can be added, renamed, removed, and reset to defaults.
- Other is protected and cannot be removed.
- Removing a category moves existing records in that category to Other.
- Resetting categories restores default categories and moves custom-category records to Other.
- Budgets follow the current category list.
- Added This Month category breakdown bar chart.
- Built from Phase 5 after checking no PIN/security leftovers.


## 3.4.0-phase7-ui-polish

Phase 7: UI declutter + polish
- Settings page is less crowded by collapsing Manage Categories and Category Budgets into expandable panels.
- Home hides Monthly Budgets until at least one budget cap is set.
- Home hides Category Breakdown until this month has spending data.
- Add page received light spacing polish and a shorter optional note field.
- No money logic, storage structure, category logic, backup logic, or calculator logic was changed.
- Built from Phase 6 after checking no PIN/security leftovers.


## 3.5.0-phase8-liquid-glass

Phase 8: Liquid Glass retheme + 8 color themes
- Rebuilt `.glass` / `.glass-strong` / `.glass-lite` with a layered specular highlight and refined inner/outer shadows for a true frosted-glass depth, instead of a flat translucent fill.
- Added 7 new color themes alongside the original Mono (now "Silver") and Pink: **Gold**, **Sky**, **Matcha**, **Sunset**, **Lavender**, **Christmas**. Pick any of the 8 from Settings → Appearance; each supports both Dark and Light display mode.
- Buttons, active nav/segment/chip states, and progress bars now render in each theme's own accent gradient instead of a flat white/black invert, so themes look genuinely different from one another, not just re-tinted backgrounds.
- Selected theme swatch now shows a checkmark badge in its own accent color.
- Money direction now reads consistently everywhere: Add Out / Add In cards, the Out/In type selector, and the All/In/Out history filter chips are tinted with the same red/green used for record amounts.
- Home balance card gets a soft accent-colored glow behind the number, and empty History/Home lists show a small icon instead of bare text.
- Browser/PWA `theme-color` now updates live to match whichever theme + mode is active.
- No money logic, storage structure, category logic, budget logic, backup logic, or calculator logic was changed — this is a visual/UX pass only.
- Bumped app version and service worker cache; service worker registration now reads the version from `APP_VERSION` directly so future bumps only need one edit.


## 3.6.0-final-smoothness

Final Smoothness Update:
- Added smooth Balance Left count animation from old balance to new balance after saving a record.
- Added iOS-style sliding pills for In/Out segmented controls and USD/KHR switches.
- Added a soft fade/blur language switch to reduce EN/KH flicker.
- Added Niradei-first Khmer font stack with Noto Sans Khmer fallback; no font files are bundled.
- Optimized rendering so only the active page rebuilds heavy sections.
- Added History render limit with Show more batches of 50 records.
- Debounced draft-style localStorage saves while keeping record/settings/backup saves immediate.
- Added service-worker update toast for new PWA versions.
- Bumped cache/version strings for cleaner iPhone/PWA updates.


## 3.6.1-font-polish

Khmer font polish patch:
- Added Google Fonts loading for **Kantumruy Pro** as a real modern Khmer webfont fallback.
- Kept **Niradei** first in the Khmer font stack, so the app will use Niradei automatically if the licensed font is installed/loaded later.
- Khmer font stack is now: `Niradei → Kantumruy Pro → Noto Sans Khmer → Khmer OS → system`.
- Added Khmer-specific heading/line-height tuning to reduce the thick default-web-font look.
- No Niradei font files are bundled. Use licensed webfont files only if you add them later.
- Bumped app/script/style version and service-worker cache to reduce stale iPhone/PWA font cache issues.


## v3.7.0 Signature Themes

Theme-only polish update:
- Kept the Liquid Glass material and app layout intact.
- Kept Silver, Gold, Sky, Matcha, Sunset, and Lavender palettes visually the same.
- Upgraded the theme picker into a more compact swatch grid so more themes fit without feeling crowded.
- Added one tiny Balance-card-only signature accent for selected themes.
- Pink gets a subtle sakura/petal accent.
- Christmas is now styled as Frost Pine with a tiny snowflake and cozy dark-mode glow.
- Added new minimal inspired themes: Web, Symbiote, Blush Pop, Ocean, and Pearl.
- No new money logic, storage structure, pages, PIN/security, currencies, or heavy libraries were added.

## v3.7.1 Signature Object Polish

Theme polish patch:
- Kept the Liquid Clear Glass material, layout, and money logic untouched.
- Kept Silver, Gold, Sky, Matcha, Sunset, and Lavender as clean core themes.
- Grouped the theme picker into **Core** and **Signature** sections so the settings screen feels less crowded.
- Upgraded the special themes with small CSS-made 3D-style balance-card objects only:
  - Pink: sakura branch with soft cloud mist.
  - Frost Pine: pine greenery, soft snow, warm light bulbs, and a tiny bell/ribbon detail.
  - Web: glossy abstract web corner.
  - Symbiote: glossy dark liquid shard.
  - Blush Pop: pearl-pink charm and sparkle.
  - Ocean: glass droplet and wave accent.
  - Pearl: pearl/crystal cluster.
- The objects stay on the Balance card only and are kept behind the main text to avoid crowding.
- Bumped app/script/style version and service-worker cache for cleaner PWA updates.


## 3.7.1 Web Theme Red Patch

- Adjusted the Web theme from red/blue to a cleaner dark crimson + black palette.
- Removed the blue accent from the Web theme preview and 3D web object.
- Kept the same v3.7.1 Signature Object system and did not change app logic.
- Bumped cache/query versions so GitHub Pages/PWA loads the patch cleanly.


## 3.7.1 Christmas Luxe Patch

- Refined Frost Pine signature object to better match the festive reference direction.
- Replaced the cheap-looking abstract corner with a richer pine, warm-lights, bells, and bow cluster using a dedicated SVG asset.
- Added softer snowy top-edge accents on the balance card.
- Kept Liquid Clear Glass intact and changed no app logic.


## 3.7.1 Christmas Snowlights Patch

- Simplified the Christmas signature object for sharper iPhone rendering.
- Replaced the previous busy festive cluster with a cleaner snowy garland asset featuring a snow pile and warm fairy lights.
- Kept the balance card cozy with a soft snowy top-edge accent.


## 3.7.1 Signature Asset Polish

- Upgraded the remaining signature themes to use dedicated SVG decorative assets instead of CSS-drawn accents.
- Pink: sakura branch with soft cloud mist.
- Web: dark-crimson glossy web corner.
- Symbiote: glossy black liquid shard.
- Blush Pop: polished pink charm with sparkles.
- Ocean: glass droplet and soft wave lines.
- Pearl: pearl cluster with crystal sparkle.


## 3.7.1 Testing Patch

- Web theme balance card now uses the provided Spider-Man-inspired image as a softly blended card visual, concentrated in the empty card area with a readability fade under the text.
- Pink theme balance card now uses the provided sakura landscape image in the same blended card-background style.
- Removed the visible SVG accent usage for Web and Pink in favor of image-based card visuals for this testing build.


## 3.7.1 Testing Patch 2

- Refined Web and Pink balance-card image blending to feel more embedded in the rounded glass card.
- Switched to full-card cover treatment with stronger text-side fade instead of visible rectangular image blocks.
- Softened light-mode color palettes for Web and Pink to better preserve the iPhone-like liquid-glass feel.


## 3.7.1 Web/Pink SVG Restore (copyright fix)

- Removed `theme-web-card.png` and `theme-pink-card.png` from the app entirely. `theme-web-card.png` was a Spider-Man game promotional screenshot (Marvel/Sony IP) and `theme-pink-card.png` was an unlicensed, watermarked Adobe Stock image — neither is safe to ship on a public site.
- Web and Pink themes are back to the original approach: a small original SVG corner accent on the Balance card (`theme-web.svg`, `theme-pink.svg`), same as Symbiote/Blush Pop/Ocean/Pearl already do.
- Rebuilt `theme-web.svg` from scratch as an original abstract "glossy web corner" (radiating lines + connecting arcs in dark crimson/black) — a generic decorative motif, not a depiction of any character, suit, or logo.
- Kept the light-mode color-token refinements for Web and Pink that were added alongside the photo experiment; those were original tokens, not photos, so they're safe to keep.
- Removed both PNGs from the service worker cache list and bumped cache/version strings.
- No money logic, storage, categories, budgets, or calculator logic touched.


## 3.7.2 Swipe Actions + Haptics + Perf Pass

- History record cards now support iOS-style swipe-to-reveal: swipe a card left to reveal Edit/Delete, matching Apple Mail/Reminders-style list interactions.
- Added a small "more" (⋯) button on each card as an always-visible, discoverable way to open the same Edit/Delete panel without needing to know the swipe gesture — no functionality is swipe-only.
- Removed the permanent Edit/Delete text row that sat under every record's description; the card is calmer at rest and the actions only appear when asked for.
- Tapping elsewhere (another card, nav, background) closes any open swipe panel automatically.
- Added light haptic feedback (`navigator.vibrate`, silently ignored on iOS Safari which doesn't support it) on: opening a swipe panel, saving a record, deleting a record, picking a theme swatch, and the two-step Clear All confirm.
- Uses the Pointer Events API so the same code handles touch and mouse/trackpad drag, and swipe-drag transform writes are batched with `requestAnimationFrame` so a fast finger can't out-write the frame rate.
- Fixed real nested backdrop-filter: `.currency-switch` (glass-lite) inside `.balance-hero` (glass-strong), `.segmented` inside the Add-page panel, and `.calc-currency-switch` inside `.calculator-sheet` were each compositing two independent blur layers in the same spot — a known iOS Safari jank source. Inner glass elements now skip their own blur when already sitting on a blurred glass/glass-strong parent.
- Trimmed base blur/saturate slightly across `.glass` (30px→26px), `.glass-strong` (38px→32px), `.glass-lite` (24px→20px) for more headroom on older devices; visually very close to before.
- Added `will-change: transform` to the floating background orbs so they get their own compositor layer instead of forcing a repaint of the blurred glass above them every animation tick.
- No money logic, storage, categories, budgets, backup, or calculator logic touched — delete still goes through the same confirm() dialog as before.
- Bumped app/script/style version and service-worker cache.


## 3.7.3 Swipe Reveal Bleed-Through Fix

- Fixed a real bug: the Edit/Delete swipe panel was visible underneath every record card at all times (not just when swiped), showing through as ghosted icons/text overlapping the amount. Cause: `.record-card-body`'s translucent glass background (`~13% opacity` by design) sat on top of the swipe actions in z-index order, but wasn't nearly opaque enough to actually hide them — translucent isn't the same as covered.
- Fixed by layering the existing translucent tint on top of a fully opaque backing color, so cards still look identical (same glass tint) but now actually occlude what's behind them until swiped or tapped open.
- Made the swipe-actions panel width explicit (132px) instead of relying on flex shrink-to-fit sizing.
- No money logic, storage, categories, budgets, backup, or calculator logic touched.

## v3.7.5 Stability + Selection Patch

Focused stability patch built from v3.7.3.

- Fixed KHR edit safety: editing only description, date, note, category, or type no longer recalculates historical KHR records with the current exchange rate.
- Fixed boot order so saved drafts and the previously active page survive app reloads instead of being overwritten during startup.
- Added missing Edit History translation keys so logs show real labels instead of raw key names.
- Filled missing Khmer strings for categories, budgets, edit logs, and selection summary UI.
- Switched calendar helpers from UTC date slicing to local calendar dates, avoiding early-morning date/month drift.
- Hardened legacy currency migration for `KHR`, `៛`, and older `currencyMode` values.
- Fixed dedupe for legacy records without stable IDs.
- Allowed valid backups with zero records to import correctly.
- Restored Frost Pine's dedicated SVG balance-card asset.
- Improved History swipe actions so open Edit/Delete panels close smoothly when another record, the page, nav, or scroll is touched.
- Added selectable History records with a compact floating selected-total pill above the bottom nav.
- Added small accessibility labels for History search, category creation, and modal dialogs.

No storage schema change. No money logic changes beyond preserving historical KHR rates correctly during non-money edits.

## v3.7.5 Phone Interaction Polish

- Added a floating Save Record button that appears once a valid amount is entered on the Add page, so saving does not require scrolling to the bottom of the form.
- Moved the selected-record total out of the History glass panel and into a real fixed bottom control above the navigation bar, avoiding Safari fixed-position issues caused by backdrop-filter parents.
- Hid swipe actions until an actual horizontal swipe or more-button open state, preventing Edit/Delete color bleed and the flash when selecting records.
- Made the swipe action tray wider, fully clipped to the card edge, and removed the content card's right rounding while open so Edit/Delete feels more like a connected iOS action reveal.
- Disabled swipe dragging while a record is selected, keeping selection mode calm and preventing accidental Edit/Delete reveals.
- Removed small-screen signature SVG scaling/drop-shadow filters so balance-card theme artwork renders sharper on iPhone.
- Bumped app/script/style version and service-worker cache for cleaner PWA refresh.


## v3.7.6 Signature SVG Sharpness Patch

- Sharpened all signature Balance-card SVG assets for iPhone/Safari rendering.
- Removed heavy internal SVG drop-shadow/blur filters from Web, Pink, Symbiote, Blush Pop, Ocean, and Pearl assets.
- Reduced Frost Pine glow/shadow blur while keeping the warm lights visible.
- Locked mobile signature sizing to intrinsic SVG aspect ratios instead of stretched background sizing.
- Kept money logic, storage, History selection, swipe behavior, backup, and calculator logic untouched.
- Bumped app/script/style version and service-worker cache for a clean PWA refresh.


## v3.8.1 iPhone Selection Paint Fix

- Fixed iOS long-press on History records triggering native text selection/copy handles.
- Long-press now stays focused on entering selection mode only.
- Disabled native selection/callout on record cards, nav items, quick cards, chips, and history filter buttons while keeping inputs editable.
- Removed the iOS Safari light-mode paint/content-visibility clipping that could show a square background slab around selected History cards.
- Kept the v3.8.0 UI/feature set unchanged; this is a bugfix and polish patch only.

## Next update watchlist

- Continue testing History selection on real iPhone PWA mode.
- Tune Quick Add only if it feels useful without crowding the Add flow.
- Keep recurring transactions separate for a future build with a clean management UI.

## v3.9.1 Profile + Dropdown Polish

- Polished the profile switcher sheet with smoother iOS-style motion and a cleaner active-profile card.
- Simplified Profile Management so each profile is a compact row first, with editing controls hidden until the user opens that specific profile.
- Reduced crowding by grouping profile photo, save, archive/restore, and delete actions inside each profile's own edit panel.
- Restyled native dropdown/select controls with a cleaner glass appearance, stronger focus state, and clearer chevron treatment.
- Added softer reveal animations to collapsible profile and settings sections.
- No storage schema or money logic was changed.


## v3.9.2 Legacy Import Safety Patch

- Fixed old pre-profile backups importing into the profile app as a full app reset.
- Old backups without profile data now import into the currently selected profile only.
- Other profiles, profile photos, profile names, and profile management stay untouched.
- Profile-aware v3.9+ backups still restore all profiles as a full backup.
- Added safer import preview wording so the user knows whether the import replaces one profile or the whole app.
- Preserved imported backup categories and budgets on the target profile.
- Improved record normalization so records keep categories against their own profile instead of the active profile only.


## v3.9.3 Final Functional Completeness Pass

- Audited the profile-era app for unfinished or half-connected functionality.
- Changed the Danger Zone clear action to clear only the current profile's records, preventing accidental deletion of other family profiles.
- Updated the Danger Zone wording in English and Khmer to match the safer profile-scoped behavior.
- Added a clear toast when the profile limit is reached instead of silently doing nothing.
- Hardened profile avatar import by accepting only safe base64 JPEG/PNG/WebP data URLs and escaping avatar image attributes.
- Added fallback recovery for profile-aware backups that contain `profileId` records but no profile list, so those records no longer collapse into Me.
- Restricted selected-record cleanup to the active profile so stale selections cannot cross profiles.
- Made invalid backup/file-read failures use the in-app toast instead of a browser alert.
- Added Escape-key support for closing the top open sheet or exiting History selection.
- Centralized modal-open body state so closing one sheet does not unlock background scroll while another sheet is still open.
- Guarded invalid backup dates from rendering as Invalid Date.
- Optimized root language flag images into real small PNG files for faster top-bar rendering.
- Kept UI simple and avoided adding new visible features in this pass.


## v3.9.4 Calculator + Release Polish

- Kept the History swipe card itself rounded while Edit/Delete actions are revealed, avoiding the blocky middle seam while preserving the iOS-style swipe interaction.
- Rebuilt the calculator keypad into an iOS-inspired layout with AC, plus/minus, percent, operator column, wide zero key, and equals key.
- Added a small calculator expression line so the previous amount/operator stays visible while doing math.
- Calculator USD display now shows `$5` for whole-dollar values and preserves decimals only when typed or produced by math, instead of forcing `$5.00`.
- Added a compact Settings Diagnostics panel with app version, profiles, record counts, storage estimate, service-worker availability, and a Run Data Check button.
- Kept records, backup format, profile storage, and money-history logic unchanged.


## v3.9.7 Final Stability + iOS Picker Polish

- Replaced the remaining native select/dropdown opening behavior with a shared iOS-style choice sheet for Add category, Edit category, Edit currency, and History sort.
- Kept the closed dropdown fields visually calm and close to the older clean style, without the jumpy focus movement.
- Added smooth choice-sheet motion, checkmarked active choices, outside-tap/Escape close behavior, and safe-area-aware bottom placement.
- Fixed calculator edge cases around negative second operands, incomplete operations, typed decimal trails, Use Amount behavior, repeated equals, and currency switching.
- Preserved explicit USD decimal typing in the calculator trail while still showing whole-dollar values as `$5` by default.
- Made primary record storage authoritative so stale legacy mirrors cannot revive deleted or older records after profile-era updates.
- Replaced the record-count-only backup reminder trigger with a backup change counter that tracks real app changes and resets after a successful backup export.
- Added clearer localStorage failure warning behavior so save failures are not silent.
- Kept the History swipe action seam rounded and polished without changing record or profile storage schemas.

## v3.9.7 Ultimate Safari Thermal Patch

- Removed the pill-shaped swipe-action seam: the record body now slides over a flat Edit/Delete tray, and individual action buttons no longer carry their own rounded corners.
- Strengthened iPhone/Safari thermal mode by removing continuous aurora/orb paint work entirely on touch devices.
- Removed live backdrop blur from top/bottom bars and modal sheets in thermal mode, replacing it with static layered surfaces.
- Disabled the large blurred balance glow on thermal-lite devices.
- Reduced card and sheet shadow cost on iPhone while keeping the same clean rounded layout.
- Kept storage, profiles, backups, calculator logic, money math, and data schema unchanged.


## v3.9.8 Ultimate Safari Optimization + Calculator Display Spacing

- Fixed the swipe action tray seam so the record item stays rounded while the action buttons remain flat.
- Added more breathing room in the calculator display so large values do not feel cramped against the right edge on iPhone.
- Reduced visual overhead further for Safari/iPhone thermal mode by simplifying shadows and button transitions.


## v3.9.9 Opaque iOS Choice Sheet

- Increased picker sheet opacity so underlying form fields no longer show through.
- Strengthened the backdrop dim and made option rows more solid for readability.
- Kept Safari thermal mode free of live backdrop blur.


## v3.9.10 Lower Translucency + Native iOS Picker

- Reduced dark-mode translucency across calculator, sheets, cards, and form controls so content is easier to read on iPhone.
- Restored native iOS picker behavior for dropdown fields instead of the custom category choice sheet.
- Strengthened dark backdrop overlays while keeping Safari thermal optimization.


## v3.9.11 Balanced Liquid Glass Restoration

- Restored the original liquid-glass feel in dark mode instead of the heavy opaque black look.
- Kept native iOS pickers.
- Preserved the Safari thermal optimizations that matter most: no continuous orb animation, lower blur radii, lighter shadows, and calmer GPU activity.
