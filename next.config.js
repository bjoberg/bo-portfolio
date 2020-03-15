require('dotenv').config()
module.exports = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    BO_API_ENDPOINT: process.env.BO_API_ENDPOINT,
  },
}