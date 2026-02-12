import { vi } from 'vitest'

// Chainable query builder mock
export function createMockQueryBuilder(resolvedData: any = null, resolvedError: any = null) {
  const builder: any = {
    select: vi.fn(() => builder),
    insert: vi.fn(() => builder),
    update: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    neq: vi.fn(() => builder),
    order: vi.fn(() => builder),
    limit: vi.fn(() => builder),
    single: vi.fn(() => Promise.resolve({ data: resolvedData, error: resolvedError })),
    then: undefined as any,
  }

  // Make builder itself thenable (for queries without .single())
  builder.then = (resolve: any) =>
    resolve({ data: resolvedData, error: resolvedError, count: Array.isArray(resolvedData) ? resolvedData.length : null })

  return builder
}

// Supabase client mock factory
export function createMockSupabaseClient() {
  const mockClient = {
    from: vi.fn((_table?: string): any => createMockQueryBuilder()),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signInWithPassword: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signUp: vi.fn().mockResolvedValue({ data: {}, error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
    rpc: vi.fn().mockResolvedValue({ data: null, error: null }),
  }

  return mockClient
}

// Shared instance for mocking
export const mockSupabaseClient = createMockSupabaseClient()

// Helper to configure from() to return specific data for a table
export function mockTable(tableName: string, data: any, error: any = null) {
  const builder = createMockQueryBuilder(data, error)
  mockSupabaseClient.from.mockImplementation((table?: string) => {
    if (table === tableName) return builder
    return createMockQueryBuilder()
  })
  return builder
}

// Helper to configure from() for multiple tables
export function mockTables(config: Record<string, { data: any; error?: any }>) {
  mockSupabaseClient.from.mockImplementation((table?: string) => {
    const entry = table ? config[table] : undefined
    if (entry) return createMockQueryBuilder(entry.data, entry.error || null)
    return createMockQueryBuilder()
  })
}
