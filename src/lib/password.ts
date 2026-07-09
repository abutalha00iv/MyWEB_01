import bcrypt from "bcryptjs";

// Node-only (bcryptjs) — import this from API routes / server actions, never
// from middleware.ts.

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!hash) return false;
  return bcrypt.compare(password, hash);
}
