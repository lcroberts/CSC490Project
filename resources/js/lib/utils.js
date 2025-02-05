import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function generateEncryptionKey(password) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const hash = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const basedata = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    { name: "PBKDF2" },
    false,
    ["deriveKey"],
  );

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-512",
      salt: hash,
      iterations: 210000, // Based off of an OWASP reccomendation found here https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#pbkdf2
    },
    basedata,
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );
  const exportKey = await crypto.subtle.exportKey("jwk", key);
  localStorage.setItem("encryptionKey", JSON.stringify(exportKey));
}

export async function getEncryptionKey() {
  return await crypto.subtle.importKey(
    "jwk",
    JSON.parse(localStorage.getItem("encryptionKey")),
    "AES-GCM",
    false,
    ["decrypt", "encrypt"],
  );
}
