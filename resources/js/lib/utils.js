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
 * @returns {Promise<Uint8Array>} Encrypted Data
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

  return retBuffer;
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

/**
 * Takes a file extension or mime type and returns whether or not it is an image
 * @param {string} extensionOrMimeType file extension or mime type
 * @returns {boolean}
 */
export function isImage(extensionOrMimeType) {
  if (extensionOrMimeType.charAt(0) === ".") {
    extensionOrMimeType = extensionOrMimeType.slice(1);
  }
  switch (extensionOrMimeType.toLowerCase()) {
    // File extensions
    case "jpeg":
    case "jpg":
    case "png":
    case "gif":
    case "bmp":
    case "webp":
    case "tiff":
    case "svg":
    case "ico":
    case "avif":
    case "heif":
    case "heic":
    case "raw":
    case "nef":
    case "cr2":
    case "dng":
    case "arw":
    case "orf":
    case "sr2":
    case "pef":
    case "raf":
    case "rw2":
    case "psd":
    case "indd":
    case "eps":
    case "ai":
    case "xcf":
    case "pcx":
    case "tga":
    case "exr":
    case "sgi":
    case "hdr":
    case "ico":
    case "svgz":
    // MIME types
    case "image/jpeg":
    case "image/jpg":
    case "image/png":
    case "image/gif":
    case "image/bmp":
    case "image/webp":
    case "image/tiff":
    case "image/svg+xml":
    case "image/vnd.microsoft.icon":
    case "image/heif":
    case "image/heic":
    case "image/x-adobe-dng":
    case "image/x-canon-cr2":
    case "image/x-raw":
    case "image/x-nikon-nef":
    case "image/x-sony-arw":
    case "image/x-olympus-orf":
    case "image/x-raw":
    case "image/x-panasonic-rw2":
    case "image/vnd.adobe.photoshop":
    case "image/vnd.adobe.indesign":
    case "image/vnd.adobe.eps":
    case "image/vnd.adobe.ai":
    case "image/x-gimp-xcf":
    case "image/x-pcx":
    case "image/x-tga":
    case "image/x-exr":
    case "image/x-sgi":
    case "image/x-hdr":
      return true;
    default:
      return false;
  }
}

/**
 * Takes a file extension or mime type and returns whether or not it is a video
 * @param {string} extensionOrMimeType file extension or mime type
 * @returns {boolean}
 */
export function isVideo(extensionOrMimeType) {
  if (extensionOrMimeType.charAt(0) === ".") {
    extensionOrMimeType = extensionOrMimeType.slice(1);
  }
  switch (extensionOrMimeType.toLowerCase()) {
    // Video file extensions
    case "mp4":
    case "mkv":
    case "webm":
    case "avi":
    case "mov":
    case "flv":
    case "wmv":
    case "mpeg":
    case "mpg":
    case "3gp":
    case "ogv":
    case "ts": // Transport Stream
    case "m4v": // Common extension for MP4 video
    case "rm": // RealMedia video files
    case "rmvb": // RealMedia variable bitrate video files
    case "divx": // DivX video format
    case "xvid": // Xvid video format
    case "svi": // Samsung Video Interface (used by some mobile devices)
    case "iso": // Disc image that may contain videos (e.g., DVD images)
    case "vob": // Video Object (used in DVDs)
    // Video mime types
    case "video/mp4":
    case "video/x-matroska":
    case "video/webm":
    case "video/avi":
    case "video/quicktime":
    case "video/x-flv":
    case "video/x-ms-wmv":
    case "video/mpeg":
    case "video/3gpp":
    case "video/ogv":
    case "video/mp2t": // MPEG-2 Transport Stream
    case "video/x-avi": // Another mime type for AVI
    case "video/x-sgi-movie": // SGI movie file type (less common)
    case "video/x-realvideo": // RealVideo mime type
    case "video/divx": // DivX mime type
    case "video/x-xvid": // Xvid mime type
      return true;
    default:
      return false;
  }
}

/**
 * Takes a file extension or mime type and returns whether or not it is audio
 * @param {string} extensionOrMimeType file extension or mime type
 * @returns {boolean}
 */
export function isAudio(extensionOrMimeType) {
  if (extensionOrMimeType.charAt(0) === ".") {
    extensionOrMimeType = extensionOrMimeType.slice(1);
  }
  switch (extensionOrMimeType.toLowerCase()) {
    // File extensions
    case "mp3":
    case "wav":
    case "ogg":
    case "flac":
    case "aac":
    case "m4a":
    case "opus":
    case "wma":
    case "aiff":
    case "alac":
    case "amr":
    case "midi":
    case "mka":
    // Mime types
    case "audio/mp3":
    case "audio/wav":
    case "audio/ogg":
    case "audio/flac":
    case "audio/aac":
    case "audio/m4a":
    case "audio/opus":
    case "audio/x-ms-wma":
    case "audio/aiff":
    case "audio/x-apple-lossless":
    case "audio/amr":
    case "audio/midi":
    case "audio/x-matroska":
      return true;
    default:
      return false;
  }
}

/**
 * Takes a file name or url to a file and breaks off the extension
 * @param {string} nameOrUrl
 * @returns {{base: string, extension: string}}
 */
export function splitToBaseAndExtension(nameOrUrl) {
  const parts = nameOrUrl.split(".");
  const extension = parts.pop();
  const name = parts.join(".");
  return {
    base: name,
    extension: extension,
  };
}

/**
 * Takes a string and returns whether or not it is a url
 * @param {string} string
 * @returns {boolean}
 */
export function isUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
