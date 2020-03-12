const production = {
  CORS_ORIGIN: "https://moshsocial.herokuapp.com",
  PORT: process.env.PORT,
  SESSION_SECRET: "yoursecret"
};

const development = {
  CORS_ORIGIN: "http://localhost:3000",
  PORT: 8080,
  SESSION_SECRET: "yoursecret"
};

const config = process.env.NODE_ENV ? production : development;

module.exports = config;
