module.exports = {
  db: {
    connectionString: process.env.DATABASE_URL
  },
  externalService: {
    host: process.env.EXTERNAL_SERVICE_HOST,
    port: process.env.EXTERNAL_SERVICE_PORT
  }
};
