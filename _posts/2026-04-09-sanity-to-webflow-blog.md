---
layout: post
title: "Sanity to Webflow - blog"
---

Node conversion script for converting Sanity JSON data to CSV for import to Webflow Collection

# Sanity → Webflow Blog Migration Script

This project provides a Node.js script to migrate blog content from **Sanity** to **Webflow CMS**.

It supports:

* ✅ Full dataset migration
* ✅ Single post test runs (by slug, ID, or title)
* ✅ Local dataset exports (NDJSON / JSON)
* ✅ Portable Text → HTML conversion
* ✅ CSV output for Webflow import
* ✅ Preview mode for safe testing

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
npm install
```

---

## 2. Configure environment variables

Create a `.env` file:

```bash
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_TOKEN=your_read_token
```

> ⚠️ Required for API mode and image URL generation

---

## 3. Run the script

### Preview a single post (recommended first step)

```bash
npm run preview:slug
```

Or manually:

```bash
node migrate-sanity-blog-to-webflow.mjs --slug=my-blog-post --preview --no-write
```

---

# 🧪 Testing Modes

## Preview Mode (Safe)

```bash
--preview
```

Prints:

* mapped fields
* generated HTML
* pageBuilder block types
* final CSV object

## No Write Mode

```bash
--no-write
```

Prevents writing JSON/CSV files.

---

# 🎯 Single Post Testing

Run migration on one post only:

### By slug

```bash
node migrate-sanity-blog-to-webflow.mjs --slug=my-blog-post
```

### By ID

```bash
node migrate-sanity-blog-to-webflow.mjs --id=your-doc-id
```

### By title

```bash
node migrate-sanity-blog-to-webflow.mjs --title="My Blog Post"
```

---

# 📦 Local Dataset Mode

Use a Sanity export file instead of the API.

## Supported formats

* `.ndjson` (Sanity CLI export)
* `.json` (array or `{ documents: [] }`)

## Example

```bash
node migrate-sanity-blog-to-webflow.mjs \
  --local-file=./sanity-export.ndjson \
  --slug=my-blog-post \
  --preview \
  --no-write
```

---

# 🔄 Full Migration

Export all blog posts:

```bash
npm run migrate
```

Or:

```bash
node migrate-sanity-blog-to-webflow.mjs
```

---

# 📁 Output

Files are written to:

```
/output/
```

### Generated files

* `webflow-blog-import-*.json`
* `webflow-blog-import-*.csv`

---

# 🧱 Field Mapping (Sanity → Webflow)

| Sanity Field      | Webflow Field  |
| ----------------- | -------------- |
| title             | Name           |
| slug.current      | Slug           |
| subtitle          | Subtitle       |
| summary           | Summary        |
| pageBuilder       | Body (HTML)    |
| publishedAt       | Published Date |
| author->name      | Author         |
| topics[]->title   | Topics         |
| featuredImage.url | Featured Image |
| featuredImage.alt | Image Alt      |

---

# 🧠 How Content Is Transformed

## Portable Text → HTML

* paragraphs, headings, links
* inline images
* formatting marks

## pageBuilder → HTML

Supported block types:

* `row` → rich text
* `table` → HTML table
* `section-heading`
* `fullWidthImage`
* `embedCode`

---

# ⚠️ Known Limitations

## Custom Modules

The following require manual handling:

* `button-insert`

These are output as placeholders:

```html
<div>[Button Insert module requires manual mapping]</div>
```

---

## Webflow Constraints

* No deeply nested content
* Limited structured data support
* Rich text may need cleanup after import

---

## Image Handling

Local dataset exports may contain asset references like:

```
image-abc123-1200x800-png
```

The script reconstructs URLs using:

* `SANITY_PROJECT_ID`
* `SANITY_DATASET`

---

# 🧪 Recommended Workflow

1. Export dataset from Sanity
2. Run preview on a single post
3. Inspect HTML output
4. Export one post to CSV
5. Import into Webflow test collection
6. Validate formatting
7. Fix edge cases
8. Run full migration

---

# 📜 Example Commands

## Preview local post

```bash
npm run preview:local
```

## Export single post

```bash
npm run export:slug
```

## Export from local dataset

```bash
npm run export:local
```

---

# 🛠 Troubleshooting

## No posts found

* Check slug/title/ID matches exactly
* Verify dataset contents

## Images not showing

* Ensure `.env` has correct project ID + dataset
* Confirm asset references exist

## HTML looks broken

* Check `pageBuilder` structure
* Inspect preview output
* Verify custom blocks

---

# 🧩 Future Improvements

* Webflow API direct upload
* Custom module serializers
* Rich text cleanup pipeline
* Multi-site migration support

---

# ✅ Summary

This tool provides a safe, testable way to migrate structured blog content from Sanity into Webflow by:

* flattening structured content
* converting Portable Text → HTML
* exporting Webflow-ready CSV

---

If you want enhancements like direct Webflow API publishing or custom module support, those can be layered on top of this script.
