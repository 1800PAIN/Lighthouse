// Helper funcs go here.
const CryptoJS = require("crypto-js");
/**
 * Generates an object containing HTTP request cookies.
 * @param {object} req ExpressJS API request
 * @returns {object} Collected of cookies associated by request. Retrieve with object['key'].
 */
function getCookies(req) {
  // We extract the raw cookies from the request headers
  if (!req.headers.cookie) return 'undefined';
  const rawCookies = req.headers.cookie.split('; ');
 
  const parsedCookies = {};
  rawCookies.forEach(rawCookie=>{
  const parsedCookie = rawCookie.split('=');
  // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
   parsedCookies[parsedCookie[0]] = parsedCookie[1];
  });
  return parsedCookies;
 };

 /**
  * Checks if a string is a valid UUID.
  * @param {string} str - The string to check.
  * @returns {boolean} True if the string is a valid UUID, false otherwise.
  */
function checkUUID(str){
	let uuidRegex= /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
	return uuidRegex.test(str);
}

/**
 * Checks if the request is specifically an internal API call, or a browser making a request.
 * @param {object} req ExpressJS API request. 
 * @returns {boolean} true or false
 */
function apiEyesOnly(req) {
    if (req.headers['referer']) {
    // This is a browser.
       return true;
    } else {
      return false;     
    }
}

/**
 * Generates a token.
 * @param {number} n Length of token
 * @returns {string} token
 */
function generateToken(n) {
    const token = crypto.randomBytes(n).toString('hex');
    return token;
}
/**
 * Encrypts a string using AES encryption. DO NOT USE FOR PASSWORDS.
 * @param {String} text - The text to encrypt.
 * @param {String} passphrase - The passphrase to use for encryption.
 * @returns {String} The encrypted text.
 */
function encryptWithAES(text, passphrase = process.env.cryptkey){
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}

/**
 * Decrypts a string using AES encryption. DO NOT USE FOR PASSWORDS.
 * @param {String} ciphertext - The encrypted text to decrypt.
 * @param {String} passphrase - The passphrase to use for decryption.
 * @returns {String} The decrypted text.
 */
function decryptWithAES(ciphertext, passphrase = process.env.cryptkey){
  if (ciphertext == null || ciphertext == undefined || ciphertext === "") return "";
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}

module.exports = {
  getCookies,
  checkUUID,
  apiEyesOnly,
  generateToken,
  encryptWithAES,
  decryptWithAES
}