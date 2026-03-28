import type { APIRoute } from 'astro';

export const prerender = false;

// TypeScript interfaces
interface ContributionData {
	username: string;
	contributions: any; // GitHub's contribution data structure
	cached: boolean;
}

interface CacheEntry {
	data: any;
	timestamp: number;
}

interface ErrorResponse {
	error: string;
	statusCode: number;
}

// In-memory cache with 5-minute TTL
const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Check if a cached entry is still valid based on TTL
 */
function isCacheValid(entry: CacheEntry): boolean {
	return Date.now() - entry.timestamp < CACHE_TTL;
}

/**
 * Get data from cache if it exists and is still valid
 */
function getFromCache(username: string): any | null {
	const entry = cache.get(username);
	if (entry && isCacheValid(entry)) {
		return entry.data;
	}
	// Remove stale entry if it exists
	if (entry) {
		cache.delete(username);
	}
	return null;
}

/**
 * Store data in cache with current timestamp
 */
function setCache(username: string, data: any): void {
	cache.set(username, {
		data,
		timestamp: Date.now(),
	});
}

/**
 * Validate username format according to GitHub rules:
 * - 1-39 characters
 * - Alphanumeric and hyphens only
 * - Cannot start or end with hyphen
 * - No consecutive hyphens
 */
function isValidUsername(username: string): boolean {
	if (!username || username.length === 0 || username.length > 39) {
		return false;
	}
	// GitHub username regex pattern
	const pattern = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
	return pattern.test(username);
}

/**
 * Fetch GitHub contribution data for a given username
 */
async function fetchGitHubContributions(username: string): Promise<any> {
	const url = `https://github.com/${username}.contribs`;
	
	const response = await fetch(url, {
		headers: {
			'User-Agent': 'Mona-Mayhem-Workshop/1.0',
		},
	});

	if (!response.ok) {
		if (response.status === 404) {
			throw new Error('User not found');
		}
		if (response.status === 429) {
			throw new Error('Rate limit exceeded');
		}
		throw new Error(`GitHub API error: ${response.status}`);
	}

	const data = await response.json();
	return data;
}

/**
 * GET handler for fetching GitHub contribution data
 * Returns cached data if available and valid, otherwise fetches fresh data
 */
export const GET: APIRoute = async ({ params }) => {
	const username = params.username;

	// Validate username parameter
	if (!username) {
		return new Response(
			JSON.stringify({
				error: 'Username parameter is required',
				statusCode: 400,
			} as ErrorResponse),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	// Validate username format
	if (!isValidUsername(username)) {
		return new Response(
			JSON.stringify({
				error: 'Invalid username format. Must be 1-39 alphanumeric characters or hyphens, cannot start/end with hyphen.',
				statusCode: 400,
			} as ErrorResponse),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	// Check cache first
	const cachedData = getFromCache(username);
	if (cachedData) {
		return new Response(
			JSON.stringify({
				username,
				contributions: cachedData,
				cached: true,
			} as ContributionData),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	// Fetch fresh data from GitHub
	try {
		const data = await fetchGitHubContributions(username);
		
		// Cache the successful response
		setCache(username, data);

		return new Response(
			JSON.stringify({
				username,
				contributions: data,
				cached: false,
			} as ContributionData),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	} catch (error) {
		// Handle specific error cases
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';

		if (errorMessage.includes('User not found')) {
			return new Response(
				JSON.stringify({
					error: 'User not found',
					statusCode: 404,
				} as ErrorResponse),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		if (errorMessage.includes('Rate limit exceeded')) {
			return new Response(
				JSON.stringify({
					error: 'GitHub API rate limit exceeded. Please try again later.',
					statusCode: 429,
				} as ErrorResponse),
				{
					status: 429,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		if (errorMessage.includes('fetch failed') || errorMessage.includes('network')) {
			return new Response(
				JSON.stringify({
					error: 'Network error. Unable to reach GitHub.',
					statusCode: 503,
				} as ErrorResponse),
				{
					status: 503,
					headers: { 'Content-Type': 'application/json' },
				}
			);
		}

		// Generic server error
		return new Response(
			JSON.stringify({
				error: `Failed to fetch contribution data: ${errorMessage}`,
				statusCode: 500,
			} as ErrorResponse),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
};
