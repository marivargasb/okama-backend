const crypto = require('crypto').randomBytes(256).toString('hex'); // Provides cryptographic functionality (OpenSSL's hash, HMAC, cipher, decipher, sign and verify functions)

// Export config object
module.exports = {
  uri: 'mongodb+srv://marivargas:86161177@cluster0-brhfo.mongodb.net/test?retryWrites=true&w=majority', // Databse URI and database name
  useCreateIndex: true,
  useNewUrlParser: true,
  db: 'okama-backend' // Database name
}