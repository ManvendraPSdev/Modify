/**
 * Comma-separated list of allowed browser origins (with credentials).
 * Example: http://localhost:5173,https://modify-neon.vercel.app
 */
function parseAllowedOrigins() {
  const raw = process.env.CORS_ORIGINS || "http://localhost:5173";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function corsOptions() {
  const allowedOrigins = parseAllowedOrigins();

  return {
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  };
}

module.exports = { corsOptions, parseAllowedOrigins };
