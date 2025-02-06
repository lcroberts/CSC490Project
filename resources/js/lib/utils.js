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

/**
 * @param {string} string
 * @param {CryptoKey} key
 */
export async function encryptString(string, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    new TextEncoder().encode(string),
  );

  const buffer = new Uint8Array(iv.byteLength + encrypted.byteLength);
  buffer.set(iv, 0);
  buffer.set(encrypted, iv.byteLength);

  return btoa(String.fromCharCode.apply(null, buffer));
}

/**
 * @param {string} string
 * @param {CryptoKey} key
 */
export async function decryptString(string, key) {
  const encryptedBuffer = new Uint8Array(
    atob(string)
      .split("")
      .map((c) => c.charCodeAt(0)),
  );

  // buffers are the same
  const iv = encryptedBuffer.slice(0, 12);
  const ciphertext = encryptedBuffer.slice(12);
  const plaintext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    ciphertext,
  );
  return new TextDecoder().decode(plaintext);
}
