export default {
  secretToken: process.env.AUTH_SECRET || "default",
  expiresInToken: Number(process.env.AUTH_EXPIRES_TOKEN) || 3600,
};
