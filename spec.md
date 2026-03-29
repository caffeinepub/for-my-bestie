# For My Bestie

## Current State
Tribute website for Myra (Chhota Don) with hero section, "Why You're the Best" section, and a Love Notes (guestbook) section. Footer credits aadiiiii.

## Requested Changes (Diff)

### Add
- "Talk to Myra" interactive chat section: user types a message and Myra replies with a cheerful, happy, uplifting response. Responses are pre-written and picked smartly based on keywords (sad, angry, tired, etc.) or randomly from a happy pool.

### Modify
- Add "Talk to Myra" nav link and section to the page.

### Remove
- Nothing.

## Implementation Plan
1. Add a `myraChatResponses` array with ~20 warm, happy, Myra-flavored replies.
2. Add a keyword-matching function to pick a relevant or random response.
3. Build a chat UI inside a new `<section id="talk-to-myra">` with message bubbles, input, and send button.
4. Wire up the nav link to scroll to the section.
