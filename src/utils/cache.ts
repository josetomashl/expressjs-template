interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

const TTL_MS = 60_000;

export class InMemoryCache<T = unknown> {
  private store = new Map<string, CacheEntry<T>>();

  constructor() {}

  set(key: string, value: T, ttlMs: number = TTL_MS): void {
    const expiration = ttlMs ? Date.now() + ttlMs : 0;
    this.store.set(key, { value, expiresAt: expiration });
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return;
    }
    return entry.value;
  }

  delete(key: string): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }
}
