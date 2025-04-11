export default {
  secretToken: process.env.AUTH_SECRET || "default",
  expiresInToken: process.env.AUTH_EXPIRES_TOKEN || "60m",
};
