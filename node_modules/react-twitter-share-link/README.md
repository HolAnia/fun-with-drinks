# react-twitter-share-link

Create "share this on Twitter" links in React.

## Installation

With npm:

```bash
npm install --save react-twitter-share-link
```

Or with Yarn:

```bash
yarn add react-twitter-share-link
```

## Usage

```jsx
import ShareLink from 'react-twitter-share-link'

...

<ShareLink link='https://your-site.com/some-page'>
   {link => (
      <a href={link} target='_blank'>Share this on Twitter</a>
   )}
</ShareLink>
```

## ShareLink Properties

| Name              |  Type             | Default                | Description |
|-------------------|-------------------|------------------------|-------------|
| link              | string            | document.location.href | link the tweet will reference to |
| text              | string            | null                   | text before the link |
| hashtags          | string / string[] | null                   | hashtags with comma or space separated string "twitter,twitterdev" / "twitter twitterdev" or array ["twitter","twitterdev"] |
| via               | string            | null                   | via references a user account at the end of the tweet (e.g "via @twitter") |
| related           | string / string[] | null                   | related accounts with comma or space separated string "twitter,twitterdev" / "twitter twitterdev" or array ["twitter","twitterdev"] |
| customQueryParams | string / object   | null                   | ability to add custom query params to the tweet url  |
