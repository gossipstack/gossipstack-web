# GossipStack SDK

The official JavaScript SDK for [GossipStack](https://gossipstack.com) — Drop-in social feature SDKs for web and mobile application.

GossipStack provides ready-to-use **commenting** (Echo) and **social feed** (Chronicle) SDKs, backed by a centralized dashboard for content moderation, engagement analytics, webhook integrations, and role-based team management.


## NPM

```bash
# Latest
npm i @gossipstack/sdk

# Target a specific version
npm i @gossipstack/sdk@1.0.2
```

## CDN

```html
<!-- Target specific version for production -->
 
<script src="https://cdn.gossipstack.com/dist/core/1.0.2/gossipstack-sdk.min.js"></script>
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

---

## Framework compatibility

The SDK ships as a self-contained JavaScript bundle. All internal dependencies, 
including the Svelte runtime, are compiled and inlined — the host application 
requires no additional dependencies.

### How it works

Loading the SDK script registers a single custom HTML element:

```html
<gossipstack-app></gossipstack-app>
```

This element acts as the mount point for the SDK. Once it is present in the DOM,
calling `GossipStackSDK.initialize()` bootstraps the full SDK — loading the
editor and all internal components into the `<gossipstack-app>` node.

The initialization sequence is always:

1. Load the SDK script — `<gossipstack-app>` is registered
2. Create and append a `<gossipstack-app>` node to the DOM
3. Call `GossipStackSDK.initialize()` — the SDK mounts into that node

**`initialize()` must be called exactly once.** Calling it more than once will
attempt to re-register internal components that are already loaded, which throws
a browser error. Framework integration guides below handle this automatically.


## Framework compatibility

GossipStack is built on the Web Components standard — a native browser API supported by all modern browsers. The SDK ships as a plain JavaScript file with no framework dependency, which means it integrates into any frontend stack without a dedicated wrapper library.

The `<gossipstack-app>` element is a custom HTML element. Any framework that can render HTML and run JavaScript can host it.

Native wrappers for React, Vue 3, and other frameworks are on our roadmap.
These will be published as dedicated packages (`@gossipstack/react`, `@gossipstack/vue`)
and will handle the initialization sequence, DOM injection, and hooks
out of the box — with full TypeScript support.

In the meantime, the integration is straightforward and well-documented.
Each guide below includes a live StackBlitz example you can fork and run instantly.


| Framework | GitHub | StackBlitz |
|-----------|--------|------------|
| React | [gossipstack-for-react](https://stackblitz.com/edit/xyecqfgz-9xb1alce?file=src%2FApp.jsx) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/xyecqfgz-9xb1alce?file=src%2FApp.jsx) |
| Vue 3 | [gossipstack-for-vue](https://stackblitz.com/edit/ldvjx41u-5in5tysg?file=src%2FApp.vue) | [![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/ldvjx41u-5in5tysg?file=src%2FApp.vue) |


## Documentation

| Resource | Link |
|---|---|
| Overview | [docs.gossipstack.com/overview](https://docs.gossipstack.com/overview) |
| Web SDK installation | [docs.gossipstack.com/echo-installation-web](https://docs.gossipstack.com/echo-installation-web) |
| Changelog | [docs.gossipstack.com/changelog](https://docs.gossipstack.com/changelog) |


## License

Use of this software is governed by the GossipStack Terms of Service
available at [gossipstack.com/terms](https://gossipstack.com/terms).




