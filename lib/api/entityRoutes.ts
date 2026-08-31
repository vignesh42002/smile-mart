import { NextRequest, NextResponse } from "next/server";
import type { ZodObject, ZodRawShape } from "zod";
import { requireAdmin } from "@/lib/auth/requireAdmin";

type EntitySchema = ZodObject<ZodRawShape>;

interface Timestamped {
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface CrudRepo<T extends Timestamped> {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  create: (input: Omit<T, "id" | "createdAt" | "updatedAt">) => Promise<T>;
  update: (id: string, patch: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<void>;
}

function unauthorized() {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

// Builds the GET (list) + POST (create) handlers shared by every admin
// entity (categories, products, business models, faqs, testimonials,
// business network) so each route.ts file only has to name its repo + schema.
export function listAndCreateHandlers<T extends Timestamped>(repo: CrudRepo<T>, schema: EntitySchema) {
  async function GET() {
    const session = await requireAdmin();
    if (!session) return unauthorized();
    return NextResponse.json(await repo.getAll());
  }

  async function POST(request: NextRequest) {
    const session = await requireAdmin();
    if (!session) return unauthorized();

    const body = await request.json().catch(() => null);
    const result = schema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const item = await repo.create(result.data as Omit<T, "id" | "createdAt" | "updatedAt">);
    return NextResponse.json(item, { status: 201 });
  }

  return { GET, POST };
}

// Builds the PATCH (update) + DELETE handlers for an entity's [id]/route.ts.
export function itemHandlers<T extends Timestamped>(repo: CrudRepo<T>, schema: EntitySchema) {
  async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin();
    if (!session) return unauthorized();

    const { id } = await context.params;
    const body = await request.json().catch(() => null);
    const result = schema.partial().safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid input", errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updated = await repo.update(id, result.data as Partial<T>);
    if (!updated) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  }

  async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const session = await requireAdmin();
    if (!session) return unauthorized();

    const { id } = await context.params;
    await repo.remove(id);
    return NextResponse.json({ ok: true });
  }

  return { PATCH, DELETE };
}
