/**
 * Amazon Affiliate & URL Utilities for Shop Limit
 */

/**
 * Validates whether an affiliate URL is a genuine, properly-formed Amazon Special Link or product URL.
 * Strictly avoids pseudo or fake links.
 */
export function isValidAmazonAffiliateUrl(url: string | undefined | null): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;

  try {
    const parsed = new URL(trimmed);
    const validHostnames = [
      'amazon.com',
      'www.amazon.com',
      'amzn.to',
      'smile.amazon.com',
      'link.amazon',
      'a.co'
    ];
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      (validHostnames.some(host => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`)) ||
       parsed.hostname === 'amazon' ||
       parsed.hostname.endsWith('.amazon') ||
       /(^|\.)amazon\.[a-z.]+$/.test(parsed.hostname) ||
       /(^|\.)amzn\.[a-z.]+$/.test(parsed.hostname))
    );
  } catch {
    return false;
  }
}

/**
 * Amazon Associate compliance rel attributes for outbound affiliate links.
 * Requires: 'sponsored nofollow noopener noreferrer'
 */
export const AMAZON_AFFILIATE_LINK_REL = 'sponsored nofollow noopener noreferrer';

/**
 * Standard Amazon Associate disclosure statement required by Amazon Operating Agreement.
 */
export const AMAZON_ASSOCIATE_DISCLOSURE = 
  'As an Amazon Associate I earn from qualifying purchases.';

/**
 * Extended FTC-compliant disclosure for placement near buy buttons and product listings.
 */
export const FTC_PRODUCT_DISCLOSURE = 
  'Affiliate Disclosure: Shop Limit evaluates products independently. When you click our genuine Amazon links and make a purchase, we may earn an affiliate commission at no extra cost to you. Product pricing, ratings, and availability are subject to real-time change on Amazon.com.';
