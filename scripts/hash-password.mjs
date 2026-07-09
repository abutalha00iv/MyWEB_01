#!/usr/bin/env node
// Usage: npm run hash-password -- "your-new-password"
// Copy the printed hash into ADMIN_PASSWORD_HASH in .env.

import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash-password -- "your-new-password"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Choose a password with at least 8 characters.");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
const escaped = hash.replace(/\$/g, "\\$");

console.log("\nPaste this into ADMIN_PASSWORD_HASH in your .env file:\n");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
console.log(
  "\n(The $ characters are escaped as \\$ — Next.js's env loader otherwise treats $2b, $12, etc. as variable references and silently mangles the hash.)\n"
);
