const DEFAULT_AUTHOR = Object.freeze({
	name: 'Test User',
	title: 'Manager',
	company: 'Test Company',
	phone: '01234567890',
	mobile: '09876543210',
	email: 'test@example.com',
	website: 'www.example.com',
	tagline: 'Test Services'
});

/**
 * Creates a Gmail-style paragraph with default styling
 * @param {string} text - The paragraph content
 * @returns {string} HTML string
 */
function createGmailParagraph(text) {
	return `<div class="gmail_default" style="font-family: arial, sans-serif; font-size: small;">${text}&nbsp;</div>`;
}

/**
 * Creates a WiseStamp-style email signature
 * @param {Object} person - Author details
 * @returns {string} HTML signature block
 */
function createSignature(person) {
	const logoUrl = 'https://example.com/logo.png';
	const signoffUrl = 'https://example.com/signoff.gif';

	return `<div dir="ltr" class="gmail_signature"><div dir="ltr"><table style="direction: ltr; border-collapse: collapse;"><tbody><tr><td style="font-size: 0px; height: 12px; line-height: 0;"></td></tr><tr><td><table cellpadding="0" cellspacing="0" border="0" style="width: 100%;" width="100%"><tbody><tr><td><table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width: 100%; line-height: normal;"><tbody><tr><td height="0" style="height: 0px; font-family: Arial; text-align: left;"><p style="margin: 1px;"><img style="height: 57px;" src="${signoffUrl}" alt="Kind regards," height="57"></p></td></tr></tbody></table></td></tr><tr><td height="0" style="height: 0px; line-height: 1%; padding-top: 16px; font-size: 1px;"></td></tr><tr><td><table cellpadding="0" cellspacing="0" style="border-collapse: collapse; line-height: 1.15;"><tbody><tr><td style="height: 1px; width: 200px; vertical-align: top; padding: 0.01px 1px;"><table cellpadding="0" cellspacing="0" style="border-collapse: collapse;"><tbody><tr><td style="vertical-align: top; padding: 0.01px 1px 0.01px 0.01px; width: 200px; text-align: center;"><img border="0" src="${logoUrl}" height="70" width="200" alt="photo" style="width: 200px; vertical-align: middle; border-radius: 0px; height: 70px; border: 0px; display: block;"></td></tr></tbody></table></td><td valign="top" style="padding: 0.01px 0.01px 0.01px 14px; vertical-align: top;"><table cellpadding="0" cellspacing="0" style="border-collapse: collapse;"><tbody><tr><td style="line-height: 1.2; padding: 0.01px 0.01px 14px; border-bottom: 2px solid rgb(189, 189, 189);" nowrap=""><p style="margin: 0.1px; line-height: 120%; font-size: 17px;"><span style="font-family: Arial; font-size: 17px; font-weight: bold; color: rgb(69, 102, 142); letter-spacing: 0px; white-space: nowrap;">${person.name}</span><br><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: rgb(100, 100, 100); white-space: nowrap;">${person.title},<span>&nbsp;</span></span><span style="font-family: Arial; font-size: 14px; font-weight: bold; color: rgb(100, 100, 100); white-space: nowrap;">${person.company}</span></p></td></tr><tr><td nowrap="" width="193" height="0" style="height: 0px; padding-top: 14px; white-space: nowrap; width: 193px; font-family: Arial;"><p style="margin: 1px; line-height: 99%; font-size: 13px;"><span style="white-space: nowrap;"><a href="tel:${person.phone}" style="font-family: Arial; text-decoration: unset;" rel="nofollow noreferrer" target="_blank"><span style="line-height: 120%; font-family: Arial; font-size: 13px; color: rgb(33, 33, 33); white-space: nowrap;">${person.phone}</span></a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="tel:${person.mobile}" style="font-family: Arial; text-decoration: unset;" rel="nofollow noreferrer" target="_blank"><span style="line-height: 120%; font-family: Arial; font-size: 13px; color: rgb(33, 33, 33); white-space: nowrap;">${person.mobile}</span></a></span></p></td></tr><tr><td nowrap="" width="150" height="0" style="height: 0px; padding-top: 9px; white-space: nowrap; width: 150px; font-family: Arial;"><p style="margin: 1px; line-height: 99%; font-size: 13px;"><span style="white-space: nowrap;"><a href="https://${person.website}" style="font-family: Arial; text-decoration: unset;" rel="nofollow noreferrer" target="_blank"><span style="line-height: 120%; font-family: Arial; font-size: 13px; color: rgb(33, 33, 33); white-space: nowrap;">${person.website}</span></a></span></p></td></tr><tr><td nowrap="" width="180" height="0" style="height: 0px; padding-top: 9px; white-space: nowrap; width: 180px; font-family: Arial;"><p style="margin: 1px; line-height: 99%; font-size: 13px;"><span style="white-space: nowrap;"><a href="mailto:${person.email}" style="font-family: Arial; text-decoration: unset;" rel="nofollow noreferrer" target="_blank"><span style="line-height: 120%; font-family: Arial; font-size: 13px; color: rgb(33, 33, 33); white-space: nowrap;">${person.email}</span></a></span></p></td></tr><tr><td nowrap="" width="255" height="0" style="height: 0px; padding-top: 9px; white-space: nowrap; width: 255px; font-family: Arial;"><p style="margin: 1px; line-height: 99%; font-size: 13px;"><span style="white-space: nowrap;"><span style="font-family: Arial; line-height: 1.2; color: rgb(33, 33, 33); font-size: 13px; white-space: nowrap;">${person.tagline}</span></span></p></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td height="0" style="height: 0px; line-height: 1%; padding-top: 16px; font-size: 1px;"></td></tr><tr><td><table cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; width: 100%; color: gray; border-top: 1px solid gray; line-height: normal;"><tbody><tr><td height="0" style="height: 0px; padding: 9px 8px 0px 0px;"><p style="color: rgb(2, 2, 2); text-align: left; font-size: 11px; margin: 1px; line-height: 120%; font-family: Arial;">IMPORTANT: The contents of this email and any attachments are confidential.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></div></div>`;
}

/**
 * Creates a Gmail-style quote header
 * @param {string} date - Date string
 * @param {string} senderName - Sender's name
 * @param {string} senderEmail - Sender's email
 * @returns {string} HTML quote header
 */
function createQuoteHeader(date, senderName, senderEmail) {
	return `<div><div><p class="MsoNormal">On ${date}, ${senderName} &lt;<a href="mailto:${senderEmail}" target="_blank">${senderEmail}</a>&gt; wrote:<u></u><u></u></p></div>`;
}

/**
 * Creates a blockquote wrapper for quoted content
 * @param {string} content - Content to wrap
 * @returns {string} HTML blockquote
 */
function createBlockquote(content) {
	return `<blockquote style="border-style: none none none solid; border-left-width: 1pt; border-left-color: rgb(204, 204, 204); padding: 0cm 0cm 0cm 6pt; margin-left: 4.8pt; margin-right: 0cm;">${content}</blockquote></div>`;
}

/**
 * Creates a Gmail original message wrapper
 * @param {string[]} paragraphs - Array of paragraph contents
 * @param {string} signature - Signature HTML
 * @returns {string} HTML message wrapper
 */
function createGmailMessage(paragraphs, signature) {
	const content = paragraphs.map(createGmailParagraph).join(createGmailParagraph('<br>'));
	return `<div dir="ltr" gmail_original="1"><div>${content}<br clear="all"></div><div>${signature}</div></div>`;
}

/**
 * Builds nested quotes recursively
 * @param {number} depth - Nesting depth
 * @param {string} message - Message template
 * @param {Object} author - Author details
 * @returns {string} Nested HTML quotes
 */
function buildNestedQuotes(depth, message, author) {
	if (depth === 0) {
		return message;
	}
	const innerContent = buildNestedQuotes(depth - 1, message, author);
	const quoteHeader = createQuoteHeader('Mon, 1 Jan 2026 at 10:00', author.name, author.email);
	return message + quoteHeader + createBlockquote(innerContent);
}

/**
 * Builds a long email thread with repeating structure for performance testing
 * @param {Object} [options] - Configuration options
 * @param {number} [options.depth=500] - Nesting depth
 * @returns {string} Complete HTML email thread
 */
function buildLongEmailThread(options = {}) {
	const { depth = 500 } = options;

	const signature = createSignature(DEFAULT_AUTHOR);
	const message = `<div><p>This is a test message.<u></u><u></u></p><p>Best regards</p></div>${signature}`;
	const nestedThread = buildNestedQuotes(depth, message, DEFAULT_AUTHOR);
	const topMessage = createGmailMessage(['Test message'], signature);

	return topMessage + nestedThread + topMessage + nestedThread;
}

module.exports = {
	buildLongEmailThread
};
