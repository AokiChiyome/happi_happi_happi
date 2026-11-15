import crypto from "crypto";

// Khóa dẫn xuất 256-bit chuẩn quân sự từ ACCESS_TOKEN_SECRET
const getDerivedKey = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET || "happi_default_secret_key_couple_app_2026";
  // Sử dụng scrypt với salt cố định của ứng dụng để tạo khóa 32 bytes (256 bits)
  return crypto.scryptSync(secret, "happi_couple_privacy_salt_v1", 32);
};

/**
 * Mã hóa dữ liệu bài viết / bình luận bằng thuật toán AES-256-GCM
 * @param {string} text - Văn bản cần mã hóa
 * @returns {string} - Chuỗi mã hóa dạng iv:authTag:encryptedHex
 */
export const encryptText = (text) => {
  if (!text || typeof text !== "string") return text;

  try {
    const key = getDerivedKey();
    const iv = crypto.randomBytes(12); // GCM khuyến nghị IV 12 bytes
    const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag().toString("hex");

    // Định dạng lưu trữ: iv:authTag:ciphertext
    return `${iv.toString("hex")}:${authTag}:${encrypted}`;
  } catch (error) {
    console.error("Lỗi khi mã hóa dữ liệu:", error);
    return text;
  }
};

/**
 * Giải mã dữ liệu bài viết / bình luận AES-256-GCM
 * @param {string} cipherText - Chuỗi mã hóa
 * @returns {string} - Văn bản gốc ban đầu
 */
export const decryptText = (cipherText) => {
  if (!cipherText || typeof cipherText !== "string") return cipherText;

  const parts = cipherText.split(":");
  if (parts.length !== 3) {
    // Không phải định dạng mã hóa AES-256-GCM (văn bản thuần cũ)
    return cipherText;
  }

  try {
    const [ivHex, authTagHex, encryptedHex] = parts;
    const key = getDerivedKey();
    const iv = Buffer.from(ivHex, "hex");
    const authTag = Buffer.from(authTagHex, "hex");

    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encryptedHex, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    console.error("Lỗi khi giải mã dữ liệu (có thể bị sửa đổi hoặc sai khóa):", error.message);
    return cipherText;
  }
};
