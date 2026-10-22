# Writing folder

Drop finished writing pieces here (PDF, Word, Markdown or text). The Writing page on the site lists every file in this folder automatically.

To give a piece a nicer title, a category, the outlet, a date or a short summary, add it to `pieces.json`. Example:

```json
{
  "files": {
    "my-article.pdf": {
      "title": "The Green Squeeze",
      "category": "Policy",
      "outlet": "ODI",
      "date": "2024-07",
      "summary": "A short description shown on the card."
    }
  },
  "links": [
    { "title": "An article published elsewhere", "url": "https://example.com", "category": "Journalism", "outlet": "Mustang Business Journal", "date": "2026-03" }
  ]
}
```
