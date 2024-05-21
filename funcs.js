const express = require('express');
const router = express.Router();
const db = require('./db');
const client= db.client;
const crypto= require('crypto');
const CryptoJS = require("crypto-js");


/*


   _____          _                    ______                _   _                 
  / ____|        | |                  |  ____|              | | (_)                
 | |    _   _ ___| |_ ___  _ __ ___   | |__ _   _ _ __   ___| |_ _  ___  _ __  ___ 
 | |   | | | / __| __/ _ \| '_ ` _ \  |  __| | | | '_ \ / __| __| |/ _ \| '_ \/ __|
 | |___| |_| \__ \ || (_) | | | | | | | |  | |_| | | | | (__| |_| | (_) | | | \__ \
  \_____\__,_|___/\__\___/|_| |_| |_| |_|   \__,_|_| |_|\___|\__|_|\___/|_| |_|___/
                                                                                   
                                                                                   

  Keywords (for easy searching): custom functions, custom, functions, funcs
*/
/**
 * Uses HTTP request to determine if the user is logged in.
 * @param {object} req ExpressJS API's HTTP request
 * @returns {boolean} true or false
 */
function isLoggedIn(req){
    if (!req.cookies.u_id){
      return false;
    } else {
      return true;
    }
  }

/**
 * Generates an object containing HTTP request cookies.
 * @param {object} req ExpressJS API request
 * @returns {object} Collected of cookies associated by request. Retrieve with object['key'].
 */
const getCookies = (req) => {
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


  function encryptWithAES(text){
    const passphrase = process.env.cryptkey;
    return CryptoJS.AES.encrypt(text, passphrase).toString();
    }

     
    function decryptWithAES(ciphertext){
    const passphrase = process.env.cryptkey;
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
    }

/**
 * Renders a 403 error page.
 * @param {object} res ExpressJS API response.
 * @param {object} req ExpressJS API request.
 * @returns {*} An API response that serves an error 403 page.
 */
function forbidUser(res, req){
	return res.status(403).render('pages/403',{ session: req.session, code:"Forbidden", cookies:req.cookies });
}
/**
 * Determines if the cookies' user ID matches whatevever string of text.
 * @param {object} req ExpressJS API's HTTP request object, in order to grab the user ID.
 * @param {string} arg The information that should match the user ID
 * @returns {boolean} true or false
 */
function idCheck(req, arg){
	return getCookies(req)['u_id'] == arg;
	// return getCookies(req)['u_id']== req.session.u_id;
}

/**
 * Determines if an input is a number or a UUID.
 * @param {*} input 
 * @returns {boolean} true or false.
 */
function isNumberOrUuid(input) {
    // Check if it's a number
    if (typeof input === "number") {
      return true;
    }
  
    // Check if it's a valid UUID using a regular expression
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(input);
  }

/** Paginates an array.
  * @param a- The array you're paginating.
  * @param n- How many items per page.
  * @returns {Array} A paginated array
*/
function paginate (a, n){
	// Make a new array object that will carry the paginated results.
	let b= new Array();
	// Iterate 
	for (i in a){
		// Push an array that splices the original array from index 0 to however many items should be per page.
		b.push(a.splice(0,n));
	}
	// If there's a remainder, tack it on to the end.
	if (a.length > 0) b.push(a)
	return b;
}


/**
 * Renders a 404 error page.
 * @param {object} res ExpressJS API response.
 * @param {object} req ExpressJS API request.
 * @returns {*} An API response that serves an error 403 page.
 */
function lostPage(res, req){
	return res.status(404).render('pages/404',{ session: req.session, code:"Not Found",cookies:req.cookies });
}

module.exports = {
    isLoggedIn,
    getCookies,
    apiEyesOnly,
    encryptWithAES,
    decryptWithAES,
    forbidUser,
    lostPage,
    idCheck,
    isNumberOrUuid,
    paginate
}