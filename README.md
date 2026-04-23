# GossipStack SDK

The official JavaScript SDK for [GossipStack](https://gossipstack.com) — Drop-in social feature SDKs for web and mobile application.

GossipStack provides ready-to-use **commenting** (Echo) and **social feed** (Chronicle) SDKs, backed by a centralized dashboard for content moderation, engagement analytics, webhook integrations, and role-based team management.


## NPM

```bash
# Latest
npm i @gossipstack/sdk

# Target a specific version
npm i @gossipstack/sdk@0.9.28
```

## CDN

```html
<!-- Target specific version for production -->
 
<script src="https://cdn.gossipstack.com/dist/core/0.9.28/gossipstack-sdk.min.js"></script>
```

## How It Works

Create a Project in the [GossipStack dashboard](https://dashboard.gossipstack.com) and configure your authorized domains.
Install the SDK in your web application.
Authenticate users via Stateless SSO — your backend signs user data with a private key, and the SDK forwards it to the GossipStack API for verification.
The SDK handles all rendering, state management, API communication. Your dashboard gives you access to analytics, moderation queues, webhook configuration, and team management.


## Quick Start

Add the `<gossipstack-app>` html element where you want the comment section to appear.

```html
<gossipstack-app
  app-id="__APP_ID__"
  project-id="__PROJECT_ID__"
  page-id="my-article-slug"
  theme="light"
  language="en"
  sso-user="__BASE64_USER_DATA__"
  sso-hash="__HMAC_SIGNATURE__">
</gossipstack-app>
```


## SSO Authentication

GossipStack supports Single Sign-On to authenticate your existing users. There are two integration approaches depending on your architecture.

> ⚠️ **Security notice:** The `sso-user` and `sso-hash` values must always be generated server-side. Never compute the HMAC signature in client-side code — your SSO private key must remain on your server. [See documentation](https://docs.gossipstack.com/authentication-overview)

### Option 1 — HTML attributes (server-rendered pages)

When using HTML attributes, `app-id` and `project-id` are both required on the element.

```html
<gossipstack-app
  app-id="__APP_ID__"
  project-id="__PROJECT_ID__"
  page-id="my-article-slug"
  theme="auto"
  language="en"
  echo-toolbar="['media']"
  sso-user="__BASE64_USER_DATA__"
  sso-hash="__HMAC_SIGNATURE__">
</gossipstack-app>
```

### Option 2 — Programmatic (single-page applications)

When initializing via JavaScript, only `app-id` and `page-id` are needed on the element. Pass `project-id` and SSO credentials to the `initialize()` method instead.

```html
<gossipstack-app
  app-id="__APP_ID__"
  page-id="my-article-slug"
  echo-toolbar="['media', 'mention', 'hashtag']">
</gossipstack-app>
```

```js
GossipStackSDK.initialize({
  project_id: '__PROJECT_ID__',
  theme: 'light',
  language: 'en',
  handle_toasts_manually: false,
  logLevel: 'debug',
  sso_user: '__BASE64_USER_DATA__',
  sso_hash: '__HMAC_SIGNATURE__'
})
```

## Documentation

| Resource | Link |
|---|---|
| Overview | [docs.gossipstack.com/overview](https://docs.gossipstack.com/overview) |
| Web SDK installation | [docs.gossipstack.com/echo-installation-web](https://docs.gossipstack.com/echo-installation-web) |
| Changelog | [docs.gossipstack.com/changelog](https://docs.gossipstack.com/changelog) |


## License

Use of this software is governed by the GossipStack Terms of Service
available at [gossipstack.com/terms](https://gossipstack.com/terms).




