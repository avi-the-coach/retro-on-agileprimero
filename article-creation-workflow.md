# Article Creation Workflow

This document describes the complete workflow for creating new bilingual articles for the retro website.

## Phase 1: Content Creation

Work with Claude Desktop to create your article content in both English and Hebrew. Focus purely on the content - don't worry about Jekyll formatting, tags, or file structure yet.

**What you need:**
- Article title (English and Hebrew)
- Article content (English and Hebrew)
- Rough idea of what the article is about (for tag suggestions)

**Output of this phase:**
- Polished English article content
- Polished Hebrew article content
- Satisfaction with both versions

## Phase 2: Publishing to Site

Once you're happy with the content, tell Claude Desktop: **"I'm ready to commit this article to the site"**

Claude Desktop will then:

### 1. Collect Existing Tags
- Scan all existing articles in `_posts/` directory
- Extract and list all currently used tags
- Show you the complete tag inventory

### 2. Suggest Tags
- Analyze your article content
- Suggest relevant existing tags
- Propose new tags if needed based on content analysis
- Present recommendations in an organized way

### 3. Tag Selection
- You review the suggestions
- You decide on the final tags to use
- Both English and Hebrew versions will use identical tags

### 4. Create Final Files
Claude Desktop will automatically:
- Generate proper filenames with today's date
- Create Jekyll frontmatter with all required fields
- Set up cross-language URL references
- Create both files in `_posts/` directory
- Ensure proper formatting and structure

### 5. Verification
- Files are saved in correct location
- Proper naming convention followed
- All required frontmatter fields populated
- Cross-language links configured
- Tags properly formatted

## File Structure Created

```
_posts/
├── YYYY-MM-DD-article-slug-en.md
└── YYYY-MM-DD-article-slug-he.md
```

## Required Frontmatter Format

```yaml
---
layout: post
title: "Your Article Title"
date: YYYY-MM-DD
lang: en  # or "he" for Hebrew
tags: [tag1, tag2, tag3]
english_url: /YYYY/MM/DD/article-slug-en/
hebrew_url: /YYYY/MM/DD/article-slug-he/
---
```

## Final Step

Simply refresh your website - the new articles will appear automatically in:
- Articles list with tag filtering
- Proper language switching
- All styling and functionality intact

## Example Command

When ready to publish, just say:
> "I'm ready to commit this article to the site"

Claude Desktop will handle the rest!

## Current Tags Inventory

To see all existing tags, Claude Desktop will scan these files:
- All files in `_posts/` directory
- Extract tags from frontmatter
- Present organized list for reference

## Notes

- **Same tags rule**: Both language versions must use identical tags
- **Date consistency**: Both files use the same publication date
- **URL format**: Follows Jekyll permalink structure
- **Automatic processing**: No manual file manipulation needed
- **Immediate publishing**: Changes appear after site refresh