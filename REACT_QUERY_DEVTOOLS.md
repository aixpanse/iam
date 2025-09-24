# React Query DevTools Guide

The React Query DevTools have been added to your application to help you debug and monitor your queries and mutations.

## Features

🔍 **Query Inspector**: View all active, inactive, and cached queries
📊 **Query Timeline**: See query lifecycle and state changes  
🔄 **Mutation Tracking**: Monitor mutation status and results
📈 **Performance Metrics**: View query timing and cache statistics
🧹 **Cache Management**: Manually invalidate or refetch queries
⚙️ **Configuration View**: See query configurations and options

## How to Access

### In Development Mode

- The DevTools are automatically available when running `npm run dev`
- Look for a floating React Query logo button in the bottom-right corner of your browser
- Click the logo to open/close the DevTools panel
- The DevTools only appear in development mode (`NODE_ENV === 'development'`)

### DevTools Panel Sections

1. **Queries Tab**:
   - View all queries with their keys, status, and data
   - See fetch status (idle, fetching, paused, error)
   - Inspect query data and error states
   - Manually trigger refetch or invalidation

2. **Mutations Tab**:
   - Monitor active and recent mutations
   - See mutation status and variables
   - View mutation results and errors

3. **Query Cache Tab**:
   - Explore the entire query cache
   - See cache size and memory usage
   - Clear specific cache entries

## Useful Actions

### Query Actions

- **Refetch**: Force a query to refetch fresh data
- **Invalidate**: Mark a query as stale (will refetch on next use)
- **Remove**: Remove query from cache
- **Reset**: Reset query to initial state

### Debugging Tips

1. **Check Query Keys**: Make sure your query keys are unique and descriptive
2. **Monitor Stale Time**: See when queries become stale and need refetching
3. **Watch Network Requests**: See which queries are actually making network calls
4. **Cache Size**: Monitor memory usage and cache efficiency
5. **Error States**: Quickly identify failed queries and their error messages

## Current Configuration

Your QueryClient is configured with:

- **Stale Time**: 1 minute (queries stay fresh for 60 seconds)
- **Retry**: 3 attempts for queries, 1 for mutations
- **Refetch on Window Focus**: Disabled (better dev experience)
- **Refetch on Reconnect**: Enabled

## Example Usage in Your App

Your current queries that will appear in DevTools:

- `['apps']` - Apps list query
- `['users']` - Users list query (if implemented)

Your current mutations:

- Create App mutation
- Update App mutation
- Delete App mutation

## Production

The DevTools are automatically excluded from production builds, so they won't affect your production bundle size or performance.
