import { randomUUID } from "crypto";
import { readCollection, mutateCollection } from "./store";

interface Timestamped {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Factory shared by every simple entity repo (categories, products, business
// models, faqs, testimonials, business network) so create/update/remove
// aren't reimplemented six times. Entity-specific behaviour (e.g. lead notes)
// lives alongside a repo built from this, not inside it.
export function createCrudRepo<T extends Timestamped>(file: string) {
  return {
    getAll: (): Promise<T[]> => readCollection<T>(file),

    getById: async (id: string): Promise<T | null> => {
      const items = await readCollection<T>(file);
      return items.find((item) => item.id === id) ?? null;
    },

    create: async (input: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T> => {
      const now = new Date().toISOString();
      const item = { ...input, id: randomUUID(), createdAt: now, updatedAt: now } as T;
      await mutateCollection<T>(file, (items) => [...items, item]);
      return item;
    },

    update: async (id: string, patch: Partial<T>): Promise<T | null> => {
      let updated: T | null = null;
      await mutateCollection<T>(file, (items) =>
        items.map((item) => {
          if (item.id !== id) return item;
          updated = { ...item, ...patch, id: item.id, updatedAt: new Date().toISOString() };
          return updated;
        })
      );
      return updated;
    },

    remove: async (id: string): Promise<void> => {
      await mutateCollection<T>(file, (items) => items.filter((item) => item.id !== id));
    },
  };
}
