/**
 * Builds a digest-style email for performance/ReDoS testing.
 * Generates many posts with URLs and repetitive patterns.
 */

const DEFAULT_CONFIG = Object.freeze({
    numDiscussions: 750,
    numMessages: 1500,
});

const LOREM = [
    'Lorem ipsum dolor sit amet.',
    'Consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt.',
    'Ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam quis.',
    'Nostrud exercitation ullamco laboris.',
    'Nisi ut aliquip ex ea commodo consequat.',
    'Duis aute irure dolor in reprehenderit.',
    'In voluptate velit esse cillum dolore.',
    'Eu fugiat nulla pariatur excepteur sint.',
];

/**
 * Creates a message block
 */
function createMessage(index) {
    return `  message by User${index % 20} (Jan ${1 + index % 28}, 2024)
${LOREM[index % LOREM.length]}
https://example.com/item/${100000 + index}
`;
}

/**
 * Creates a discussion block
 */
function createDiscussion(index, numMessages) {
    let block = `${numMessages} new posts from Group
topic: ${LOREM[index % LOREM.length]}

`;
    for (let i = 0; i < numMessages; i++) {
        block += createMessage(index * 10 + i) + '\n';
    }
    return block;
}

/**
 * Builds a long digest email for stress testing
 */
function buildDigestEmail(options = {}) {
    const config = { ...DEFAULT_CONFIG, ...options };

    let email = `You have ${config.numMessages} new posts.\n\n`;

    let messageCount = 0;
    let discussionCount = 0;

    while (messageCount < config.numMessages && discussionCount < config.numDiscussions) {
        const numPosts = Math.min(1 + (discussionCount % 3), config.numMessages - messageCount);
        email += createDiscussion(discussionCount, numPosts);
        messageCount += numPosts;
        discussionCount++;
    }

    email += '\n--\ndigest@example.com\n';

    return email;
}

module.exports = {
    buildDigestEmail,
};
