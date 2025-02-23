import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const ENCRYPTION_KEY_NAME = "studyBuddyEncryptionKey";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * @param {string} base64
 * @returns {Uint8Array}
 */
export function base64ToArray(base64) {
  return new Uint8Array(
    atob(base64)
      .split("")
      .map((c) => c.charCodeAt(0)),
  );
}

/**
 * @param {Uint8Array} array
 * @returns {string}
 */
export function arrayToBase64(array) {
  return btoa(String.fromCharCode.apply(null, array));
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
  localStorage.setItem(ENCRYPTION_KEY_NAME, JSON.stringify(exportKey));
}

export async function getEncryptionKey() {
  return await crypto.subtle.importKey(
    "jwk",
    JSON.parse(localStorage.getItem(ENCRYPTION_KEY_NAME)),
    "AES-GCM",
    false,
    ["decrypt", "encrypt"],
  );
}

/**
 * @param {string} string
 * @param {CryptoKey} key
 * @returns {Promise<string>} a base64 encoded binary string
 */
export async function encryptString(string, key) {
  const buffer = new TextEncoder().encode(string);
  return encryptBuffer(buffer, key);
}

/**
 * @param {string} string A base64 encoded binary string
 * @param {CryptoKey} key
 */
export async function decryptString(string, key) {
  const data = await decryptData(string, key);
  return new TextDecoder().decode(data.buffer.slice(0, data.byteLength));
}

/**
 * @param {Uint8Array} buffer
 * @param {CryptoKey} key
 * @returns {Promise<string>} a base64 encoded binary string
 */
export async function encryptBuffer(buffer, key) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      buffer,
    ),
  );

  const retBuffer = new Uint8Array(iv.byteLength + encrypted.byteLength);
  retBuffer.set(iv, 0);
  retBuffer.set(encrypted, iv.byteLength);

  return arrayToBase64(retBuffer);
}

/**
 * @param {string} string Should be a base64 encrypted binary string
 * @param {CryptoKey} key
 * @returns {Promise<Uint8Array>} the decoded binary data
 */
export async function decryptData(string, key) {
  const encryptedBuffer = base64ToArray(string);

  const iv = encryptedBuffer.slice(0, 12);
  const ciphertext = encryptedBuffer.slice(12);
  const plaintext = new Uint8Array(
    await crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      ciphertext,
    ),
  );
  return plaintext;
}
