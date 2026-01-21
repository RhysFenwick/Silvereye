/**

* Content JSON Schema Documentation
* ============================================================================
*
* This document describes the structure of JSON content files.
*
* HERO CONTENT (hero.json)
* ========================
* Structure:
* {
* "subtitle": "string - Main hero subtitle text"
* }
*
*
* TEXT CONTENT (about.json, contact.json)
* ========================================
* Structure:
* {
* "title": "string - Section title",
* "body": "string - Main text content (supports basic text)"
* }
*
*
* CARD-BASED CONTENT (services.json, blog.json)
* ==============================================
* Structure:
* {
* "items": [
*     {
*       "title": "string - Card title",
*       "description": "string - Card description text",
*       "date": "string (ISO 8601) - Optional, mainly for blog posts",
*       "tags": ["string", ...] - Optional array of tag strings,
*       "cta": {
*         "text": "string - Button text",
*         "link": "string - URL or anchor link"
*       }
*     }
* ]
* }
*
*
* EXAMPLE: services.json
* ======================
* {
* "items": [
*     {
*       "title": "Individual Therapy",
*       "description": "One-on-one therapy sessions...",
*       "tags": ["Therapy", "Individual"],
*       "cta": {
*         "text": "Schedule Now",
*         "link": "#contact"
*       }
*     }
* ]
* }
*
*
* EXAMPLE: blog.json
* ==================
* {
* "items": [
*     {
*       "title": "Understanding Anxiety",
*       "description": "Anxiety is a normal emotion...",
*       "date": "2026-01-15",
*       "tags": ["Mental Health", "Anxiety"],
*       "cta": {
*         "text": "Read Full Article",
*         "link": "/blog/understanding-anxiety"
*       }
*     }
* ]
* }
*
*
* FIELD REFERENCE
* ===============
*
* title (string, required for cards)
* * The heading for the section or card
* * Used as <h2> or <h3> in the rendered HTML
*
* description (string, required for cards)
* * Paragraph text for the card or section
* * Rendered as <p>
*
* body (string, used in text sections)
* * Longer form content for text-only sections
* * Rendered as <p>
*
* date (string, optional, ISO 8601 format: YYYY-MM-DD)
* * Publication date for blog posts
* * Automatically formatted to readable format (e.g., "January 15, 2026")
*
* tags (array of strings, optional)
* * Category/topic tags
* * Rendered as badge components
* * Useful for filtering and categorization
*
* cta (object, optional)
* * Call-to-action button configuration
* * text: Button label
* * link: URL or internal link (use # for internal sections)
*
*
* ADDING NEW CONTENT SECTIONS
* ============================
*
* 1. Create a new JSON file in the content/ directory
* 2. Follow the appropriate schema above
* 3. Add loading logic to contentLoader.js:
*
* const myData = await ContentLoader.load('my-section');
* if (myData) {
*        ContentLoader.renderCards(myData.items, '#selector');
* }
*
* 4. Add the corresponding HTML element with matching selector
*

 */
