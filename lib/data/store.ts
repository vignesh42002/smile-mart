import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

// Serializes read-modify-write cycles per file so two concurrent admin
// requests can't interleave and corrupt the JSON. This is the sole extension
// point for swapping the JSON store for Prisma/Postgres later — every entity
// repo in lib/data/*.ts only calls the functions below, never touches fs directly.
const locks = new Map<string, Promise<unknown>>();

function withLock<T>(file: string, task: () => Promise<T>): Promise<T> {
  const previous = locks.get(file) ?? Promise.resolve();
  const next = previous.then(task, task);
  locks.set(
    file,
    next.catch(() => undefined)
  );
  return next;
}

async function readFile<T>(file: string, fallback: T): Promise<T> {
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
      return fallback;
    }
    throw error;
  }
}

async function writeFile<T>(file: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, file);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export function readCollection<T>(file: string): Promise<T[]> {
  return readFile<T[]>(file, []);
}

export function mutateCollection<T>(
  file: string,
  mutator: (data: T[]) => T[] | Promise<T[]>
): Promise<T[]> {
  return withLock(file, async () => {
    const current = await readFile<T[]>(file, []);
    const next = await mutator(current);
    await writeFile(file, next);
    return next;
  });
}

export function readSingleton<T>(file: string, fallback: T): Promise<T> {
  return readFile<T>(file, fallback);
}

export function mutateSingleton<T>(
  file: string,
  fallback: T,
  mutator: (data: T) => T | Promise<T>
): Promise<T> {
  return withLock(file, async () => {
    const current = await readFile<T>(file, fallback);
    const next = await mutator(current);
    await writeFile(file, next);
    return next;
  });
}
