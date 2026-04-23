/**
 * Fetches mention suggestions from your backend based on the user's query.
 *
 * Replace the mock data below with a real API call to your backend:
 * const response = await fetch(`/api/users/search?q=${encodeURIComponent(query)}`)
 * const users = await response.json()
 *
 * @param {string} query - The text typed after '@' (e.g., "jan" when user types "@jan").
 * @returns {Promise<Array<Object>>} A list of user objects matching the query.
 */
async function remoteFetchMentions(query) {
    const users = [
        {
            id: 2,
            value: "jane_smith",
            username: "Jane Smith",
            avatar: "https://i.pravatar.cc/100?img=30",
            email: "jane@example.com"
        },
        {
            id: 3,
            value: "mike_wilson",
            username: "Mike Wilson",
            avatar: "https://i.pravatar.cc/100?img=53",
            email: "mike@example.com"
        }
    ]
    return users;
}

/**
 * Fetches hashtag suggestions from your backend based on the user's query.
 * This function is called automatically when the user types '#' in the editor.
 *
 * The returned objects must follow this shape:
 * {
 *   id:      {number} - Unique identifier for the hashtag
 *   value:   {string} - The hashtag value without '#' (used internally by the editor)
 *   hashtag: {string} - The display label including '#' (shown in the suggestion list)
 *   reach:   {string} - Human-readable reach count (e.g. '2.3M', '34.3K')
 * }
 *
 * Replace the mock data below with a real API call to your backend:
 * const response = await fetch(`/api/hashtags/search?q=${encodeURIComponent(query)}`)
 * const hashtags = await response.json()
 *
 * @param {string} query - The text typed after '#' (e.g., "aw" when user types "#aw").
 * @returns {Promise<Array<Object>>} A list of hashtag objects matching the query.
 */
async function remoteFetchHashtags(query) {
    // const response = await fetch(`/api/hashtags/search?q=${encodeURIComponent(query)}`)
    // const hashtags = await response.json()
    const hashtags = [
        {
            id: 1,
            value: "gossipstack",
            hashtag: "#gossipstack",
            reach: "12.4K"
        },
        {
            id: 2,
            value: "webdev",
            hashtag: "#webdev",
            reach: "8.9M"
        },
        {
            id: 3,
            value: "javascript",
            hashtag: "#javascript",
            reach: "24.1M"
        },
        {
            id: 4,
            value: "opensource",
            hashtag: "#opensource",
            reach: "5.2M"
        },
        {
            id: 5,
            value: "saas",
            hashtag: "#saas",
            reach: "3.7M"
        }
    ]
    return hashtags
}

/**
 * Fired when a @mention or #hashtag is clicked inside a comment.
 *
 * @param {Object} event - The click event object.
 */
function handleTextClickEvent(event) {
    console.log('(@mention / #hashtag) =>', event)
}

/**
 * Fired when a user avatar is clicked.
 * Use this to navigate to the user profile page.
 *
 * @param {Object} event - The click event object.
 */
function handleAvatarClickEvent(event) {
    console.log('avatar =>', event)
}

/**
 * Handles actions attempted by unauthenticated users.
 * Use this to prompt the user to sign in or create an account.
 *
 * @param {Object} event - The unauthenticated action event.
 * @param {string} event.type - The action the user attempted to perform.
 */
function handleUnauthenticatedAction(event) {
    // Show your sign-in or sign-up modal
    // showAuthModal({ message: `Please sign in to ${formatActionLabel(event.type)}.` })
    console.log('Unauthenticated action =>', event.type)
}

/**
 * Maps an action type to a human-readable label.
 *
 * @param {string} type - The action type.
 * @returns {string} A human-readable label.
 */
function formatActionLabel(type) {
    const labels = {
        'comment_like':    'like a comment',
        'comment_dislike': 'dislike a comment',
        'comment_create':  'post a comment',
        'comment_reply':   'reply to a comment',
        'comment_report':  'report a comment',
    }
    return labels[type] || 'perform this action'
}

/**
 * Initializes the GossipStack SDK with your project identifier,
 * SSO authentication, and custom hook handlers. 
 * Leave `sso_user` and `sso_hash` empty for guest users.
 *
 * Never compute the HMAC signature in client-side code.
 * See: https://docs.gossipstack.com/authentication-overview
 */
function initGossipStackSDK() {
    GossipStackSDK.initialize({
        project_id: '__PROJECT_ID__',
        theme: 'light',
        handle_toasts_manually: false,
        language: 'en',
        sso_user: '__BASE64_USER_DATA__',
        sso_hash: '__HMAC_SIGNATURE__'
    });

    GossipStackSDK.addHook('mention-suggestions',       remoteFetchMentions);
    GossipStackSDK.addHook('hashtag-suggestions',       remoteFetchHashtags);
    GossipStackSDK.addHook('text-click-event',          handleTextClickEvent);
    GossipStackSDK.addHook('on-avatar-click-event',     handleAvatarClickEvent);
    GossipStackSDK.addHook('on-unauthenticated-action', handleUnauthenticatedAction);
}

initGossipStackSDK()