import { getSession } from "./session";

// Re-checked inside every admin API route in addition to proxy.ts, so a
// future routing refactor can't silently drop auth on one endpoint.
export function requireAdmin() {
  return getSession();
}
