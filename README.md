# n8n-nodes-seotakeoff

This is an n8n community node for [SEOTakeoff](https://seotakeoff.com) - an AI-powered SEO content generation platform.

## Features

- **Triggers**: React to article events (ready, published, failed) and new clusters
- **Actions**: Generate articles, create clusters, search content

## Installation

### Community Nodes (Recommended)

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-seotakeoff`
4. Agree to the risks and install

### Manual Installation

```bash
npm install n8n-nodes-seotakeoff
```

## Credentials

You need a SEOTakeoff API key to use this node.

1. Log in to [SEOTakeoff](https://seotakeoff.com)
2. Go to **Settings** > **API Keys**
3. Create a new API key
4. Copy the key (starts with `stk_live_`)

## Operations

### Article
- **Generate**: Create a new article from a keyword
- **Get**: Retrieve article by ID
- **Get Many**: List articles
- **Search**: Search articles by title or keyword

### Cluster
- **Create**: Create a new topic cluster
- **Get Many**: List all topic clusters
- **Search**: Search clusters by name

## Triggers

- **Article Ready**: Fires when an article finishes generating
- **Article Published**: Fires when an article is published to CMS
- **Article Failed**: Fires when article generation fails
- **New Cluster**: Fires when a new topic cluster is created

## Example Workflows

### Auto-post to Social Media
1. SEOTakeoff Trigger (Article Published)
2. Twitter node to tweet article title + URL
3. LinkedIn node to post article summary

### Backup Articles to Google Sheets
1. SEOTakeoff Trigger (Article Ready)
2. Google Sheets node to append row with article data

### Notify Team on Slack
1. SEOTakeoff Trigger (Article Published)
2. Slack node to post in #content channel

### Generate Article from Airtable
1. Airtable Trigger (record status = "approved")
2. SEOTakeoff node (Generate Article with keyword from Airtable)

## Resources

- [SEOTakeoff Website](https://seotakeoff.com)
- [API Documentation](https://seotakeoff.com/docs/api)
- [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)

## License

MIT
