# API Testing Guide

## Testing the GitHub Contribution API Proxy

### Prerequisites
1. Start the dev server: `npm run dev`
2. Server runs on: `http://localhost:4321`

### Test Cases

#### 1. Valid GitHub Username (e.g., "octocat")
```bash
curl http://localhost:4321/api/contributions/octocat
```
**Expected Response (200):**
```json
{
  "username": "octocat",
  "contributions": { ... },
  "cached": false
}
```

#### 2. Invalid/Non-existent Username
```bash
curl http://localhost:4321/api/contributions/this-user-does-not-exist-12345
```
**Expected Response (404):**
```json
{
  "error": "User not found",
  "statusCode": 404
}
```

#### 3. Malformed Username (empty)
```bash
curl http://localhost:4321/api/contributions/
```
**Expected Response (400):**
```json
{
  "error": "Username parameter is required",
  "statusCode": 400
}
```

#### 4. Malformed Username (special characters)
```bash
curl http://localhost:4321/api/contributions/@invalid-user!
```
**Expected Response (400):**
```json
{
  "error": "Invalid username format. Must be 1-39 alphanumeric characters or hyphens, cannot start/end with hyphen.",
  "statusCode": 400
}
```

#### 5. Cache Hit (within 5 minutes)
```bash
# First request
curl http://localhost:4321/api/contributions/octocat

# Second request (within 5 minutes)
curl http://localhost:4321/api/contributions/octocat
```
**Expected Response (200):**
```json
{
  "username": "octocat",
  "contributions": { ... },
  "cached": true  ← Note: cached is now true
}
```

#### 6. Cache Miss (after 5 minutes)
1. Make first request: `curl http://localhost:4321/api/contributions/octocat`
2. Wait 5+ minutes
3. Make second request: `curl http://localhost:4321/api/contributions/octocat`

**Expected:** Second response should have `"cached": false` and fresh data

### Browser Testing
Open in browser:
- http://localhost:4321/api/contributions/octocat (should return JSON)
- http://localhost:4321/api/contributions/invalid@user (should return error JSON)

### Testing Notes
- Cache resets on server restart
- Cache TTL is 5 minutes (300000ms)
- Rate limiting handled by GitHub's API (429 status)
- Network errors return 503 status
