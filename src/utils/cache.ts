interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const TTL_MS = 60_000;

export class InMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();
  constructor(private defaultTtlMs = TTL_MS) {}

  set<T>(key: string, value: T, ttlMs = this.defaultTtlMs): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return;
    }
    return entry.value as T;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
