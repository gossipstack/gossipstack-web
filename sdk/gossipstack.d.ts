/*!
 *
 * gossipstack.d.ts
 * GossipStack
 *
 * version 1.0.2
 *
 * Created by Honmono Studio SAS on 08-07-2026
 * Copyright © 2026 Honmono Studio SAS. All rights reserved.
 *
 * https://gossipstack.com
 *
 * This software and its source code (including any obfuscated, minified,
 * or compiled form) are the proprietary property of
 * Honmono Studio SAS.
 *
 * Use of this software is governed by the GossipStack Terms of Service
 * available at https://gossipstack.com/terms.
 *
 * Unauthorized copying, modification, reverse engineering, decompilation,
 * disassembly, redistribution, sublicensing, or commercial use of this
 * software, in whole or in part, by any means and in any form, is strictly
 * prohibited without the prior express written permission of Honmono Studio SAS.
 *
 * The publication of this software at a publicly accessible URL for the
 * purpose of distribution to authorized licensees does not constitute a
 * waiver of any intellectual property rights, nor does it grant any license
 * or right of use beyond those expressly set forth in the agreements
 * referenced above.
 */

/**
 * Attributes available on the <gossipstack-app> custom element.
 * 
 * See the {@link https://docs.gossipstack.com/echo-installation-web#full-page-example Web SDK guide} for details.
 * 
 * @example
 *  <gossipstack-app 
 *      app-id="__APP_ID__" 
 *      project-id="__PROJECT_ID__"
 *      page-id="__PAGE_ID__"
 *      theme="auto"
 *      language="en"
 *      sso-user="__BASE64_USER_DATA__" 
 *      sso-hash="__HMAC_SIGNATURE__">
 * </gossipstack-app>
 */
export interface GossipStackAppElement extends HTMLElement {
  /** Your GossipStack application identifier */
  'app-id': string;
  /** The project identifier (required when not using initialize()) */
  'project-id'?: string;
  /** Unique identifier scoping this comment section to a page or resource */
  'page-id': string;
  /** UI color theme */
  'theme'?: 'light' | 'dark' | 'auto';
  /** BCP 47 language code (e.g. 'en', 'fr', 'de') */
  'language'?: string;
  /** Logging verbosity */
  'log-level'?: 'debug' | 'info' | 'warn' | 'error';
  /** Toolbar features to enable */
  'toolbar'?: string;
  /** Base64-encoded SSO user payload (server-generated) */
  'sso-user'?: string;
  /** HMAC signature of the SSO user payload (server-generated) */
  'sso-hash'?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'gossipstack-app': GossipStackAppElement;
  }
}

// ---------------------------------------------------------------------------
// initialize() config
// ---------------------------------------------------------------------------

export interface GossipStackConfig {
  
  /** 
   * Your GossipStack project identifier 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#initialization-options Web SDK guide} for details.
   * */
  project_id: string;
  
  /** 
   * UI color theme. Defaults to 'auto' 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#initialization-options Web SDK guide} for details.
   * */
  theme?: 'light' | 'dark' | 'auto';
  
  /** 
   * BCP 47 language code (e.g. 'en', 'fr', 'de'). Defaults to 'en' 
   * 
   * See the {@link https://docs.gossipstack.com/echo-localization Web SDK guide} for details.
   * */
  language?: string;
  
  /** 
   * Toolbar features to enable 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#initialization-options Web SDK guide} for details.
   * */
  toolbar?: Array<'media' | 'mention' | 'hashtag'>;
  
  /**
   * When true, toast notifications are suppressed and forwarded to your
   * own handler via the toastEvent hook instead.
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#handling-toast-notifications Web SDK guide} for details.
   */
  handle_toasts_manually?: boolean;
  
  /** 
   * Logging verbosity. Defaults to 'warn' 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#logging-values Web SDK guide} for details.
   * */
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
  
  /** 
   * Base64-encoded SSO user payload — must be generated server-side 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#adding-sso-authentication Web SDK guide} for details.
   * */
  sso_user?: string;
  
  /** 
   * HMAC signature of the SSO payload — must be generated server-side 
   * 
   * See the {@link https://docs.gossipstack.com/echo-installation-web#adding-sso-authentication Web SDK guide} for details.
   * */
  sso_hash?: string;
}

// ---------------------------------------------------------------------------
// Hook payloads
// ---------------------------------------------------------------------------

export interface MentionSuggestion {
  id: number;
  /** Value inserted into the editor on selection */
  value: string;
  username: string;
  avatar?: string;
  email?: string;
}

export interface HashtagSuggestion {
  id: number;
  /** Value inserted into the editor on selection (without #) */
  value: string;
  /** Display label including the # symbol */
  hashtag: string;
  /** Human-readable reach count e.g. '2.3M' */
  reach?: string;
}

export interface ToastEvent {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  [key: string]: unknown;
}

export interface AvatarClickEvent {
  userId: number;
  username: string;
  [key: string]: unknown;
}

export interface TextClickEvent {
  type: 'mention' | 'hashtag' | 'link';
  value: string;
  [key: string]: unknown;
}

export interface CssLoadedEvent {
  [key: string]: unknown;
}

export interface UnauthenticatedActionEvent {
  action: string;
  [key: string]: unknown;
}

// ---------------------------------------------------------------------------
// Hook registry
// ---------------------------------------------------------------------------

export type HookName =
  | 'mention-suggestions'
  | 'hashtag-suggestions'
  | 'toast-event'
  | 'on-avatar-click-event'
  | 'text-click-event'
  | 'on-css-loaded'
  | 'on-unauthenticated-action';

export type HookFunction<T = unknown, R = unknown> = (payload: T) => R | Promise<R>;

// ---------------------------------------------------------------------------
// Action types
// ---------------------------------------------------------------------------

export type ObjectType = 'comment' | 'thread' | 'user';
export type ActionType = 'like' | 'dislike' | 'share' | string;

// ---------------------------------------------------------------------------
// GossipStackSDK
// ---------------------------------------------------------------------------

/**
 * GossipStack SDK — Drop-in social feature SDKs for web and mobile apps.
 *
 * Singleton class. Do not instantiate directly.
 * Use the static methods as your public API.
 *
 * See the {@link https://docs.gossipstack.com/echo-installation-web#adding-sso-authentication Web SDK guide} for details.
 * 
 * @example
 * 
 * GossipStackSDK.initialize({
 *     project_id: '__PROJECT_ID__',
 *     theme: 'light',
 *     language: 'en',
 *     sso_hash: "__HMAC_SIGNATURE__",
 *     sso_user: "__BASE64_USER_DATA__"
 * })
 */
declare class GossipStackSDK {

  /** Current SDK version */
  static readonly version: string;

  /**
   * Initialize the SDK. Must be called once before any other interaction
   * when using the programmatic integration pattern.
   *
   * @param config - SDK configuration object
   */
  static initialize(config: GossipStackConfig): Promise<void>;

  /**
  * Returns true when the SDK is fully initialized and ready.
  */
  static isReady(): boolean;
  
  /**
   * Register a hook function for a given lifecycle event.
   *
   * @param hookName   - The event to hook into
   * @param func       - Your handler function
   * @param pluginName - Optional label to identify your hook in logs
   *
   * See {@link https://docs.gossipstack.com/echo-installation-web#sdk-hook-events} for all available options.
   */
  static addHook<T = unknown, R = unknown>(
    hookName: HookName,
    func: HookFunction<T, R>,
    pluginName?: string
  ): void;
}

export default GossipStackSDK;

declare global {
  interface Window {
    GossipStackSDK: typeof GossipStackSDK;
  }
}