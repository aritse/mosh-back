const production = {
  CORS_ORIGIN: "https://moshsocial.herokuapp.com",
  PORT: process.env.PORT
};

const development = {
  CORS_ORIGIN: "http://localhost:3000",
  PORT: 8080
};

const config = process.env.NODE_ENV ? production : development;

module.exports = config;
