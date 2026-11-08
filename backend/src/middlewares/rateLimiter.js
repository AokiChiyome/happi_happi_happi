// In-memory token bucket / sliding window rate limiter
const ipRequests = new Map();

// Periodic cleanup every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of ipRequests.entries()) {
    if (now > data.resetTime) {
      ipRequests.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Tạo middleware giới hạn tốc độ truy cập theo IP
 * @param {Object} options
 * @param {number} options.windowMs - Khoảng thời gian tính (ms), mặc định 1 phút
 * @param {number} options.max - Số lượng request tối đa trong khoảng thời gian
 * @param {string} options.message - Thông báo lỗi khi vượt quá
 */
export const rateLimit = ({
  windowMs = 60 * 1000,
  max = 20,
  message = "Bạn thao tác quá nhanh. Vui lòng thử lại sau giây lát!",
} = {}) => {
  return (req, res, next) => {
    // Lấy IP client
    const forwarded = req.headers["x-forwarded-for"];
    const ip = (typeof forwarded === "string" ? forwarded.split(",")[0] : req.socket.remoteAddress) || "unknown";
    const key = `${req.baseUrl || ""}${req.path}:${ip}`;
    const now = Date.now();

    const record = ipRequests.get(key);

    if (!record || now > record.resetTime) {
      ipRequests.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    record.count++;

    if (record.count > max) {
      const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader("Retry-After", retryAfterSeconds);
      return res.status(429).json({
        message,
        retryAfterSeconds,
      });
    }

    next();
  };
};
