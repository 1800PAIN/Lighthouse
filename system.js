// System Router
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
  

/*

   ____      _     ____                            _       
  / ___| ___| |_  |  _ \ ___  __ _ _   _  ___  ___| |_ ___ 
 | |  _ / _ \ __| | |_) / _ \/ _` | | | |/ _ \/ __| __/ __|
 | |_| |  __/ |_  |  _ <  __/ (_| | |_| |  __/\__ \ |_\__ \
  \____|\___|\__| |_| \_\___|\__, |\__,_|\___||___/\__|___/
                                |_|                        
  Keywords (for easy searching): get requests, get, requests
*/

router.get("/communal-journal", async function(req, res){
    // If there's an id provided, it's a system communal journal. Grab based on user id AND sys_id
    // If no id provided, just grab from their user id.
    if (isLoggedIn(req)){
        let commJournInfo;
        let pinnedComm;
        let sysChoice= req.query.sys || null; 
        let pageNumber = req.query.pg || 1;
        if (!sysChoice){
          // This is the regular communal journal. 
          commJournInfo = await db.query(client, "SELECT * FROM comm_posts WHERE u_id=$1 AND is_pinned=false AND system_id IS NULL ORDER BY created_on DESC;", [getCookies(req)['u_id']], res, req);

          pinnedComm = await db.query(client, "SELECT * FROM comm_posts WHERE u_id=$1 AND is_pinned=true AND system_id IS NULL ORDER BY created_on DESC;", [getCookies(req)['u_id']], res, req);

        } else {
          // This is a system journal-- Do ID checks before we grab posts.
          const sysCheck = await db.query(client, "SELECT sys_id FROM systems WHERE user_id=$1", [getCookies(req)['u_id']], res, req);
          const sysList = sysCheck.map(obj => obj.sys_id);
          if (!(sysList.includes(sysChoice))) return res.status(404).render(`pages/404`, { session: req.session, code:"Not Found", cookies:req.cookies }); 

          // Grab posts.
          commJournInfo = await db.query(client, "SELECT * FROM comm_posts WHERE system_id=$1 AND is_pinned=false ORDER BY created_on DESC;", [`${sysChoice}`], res, req); // non-pinned posts
          pinnedComm = await db.query(client, "SELECT * FROM comm_posts WHERE system_id=$1 AND is_pinned=true ORDER BY created_on DESC;", [`${sysChoice}`], res, req); // pinned posts.

          // Grab system information.
          const sysInfo = await db.query(client, "SELECT * FROM systems WHERE sys_id=$1", [`${sysChoice}`], res, req);
          req.session.chosenSystem= sysInfo[0]
        }
        let entries = paginate(commJournInfo, 25)
        let finalPage= entries.length;
        // Now... Is the requested page higher than the final page?
        if (pageNumber > finalPage) pageNumber= finalPage;
        res.status(200).render(`pages/commjourn`, { session: req.session, cookies: req.cookies, posts: entries, pinned:pinnedComm, pageNum: pageNumber, sysChoice:sysChoice, finalPage: finalPage });
        // res.send("<h1>Communal Journal</h1>")

    } else {
        forbidUser(res, req);
    }
})

/*
  _____          _     _____                            _       
 |  __ \        | |   |  __ \                          | |      
 | |__) |__  ___| |_  | |__) |___  __ _ _   _  ___  ___| |_ ___ 
 |  ___/ _ \/ __| __| |  _  // _ \/ _` | | | |/ _ \/ __| __/ __|
 | |  | (_) \__ \ |_  | | \ \  __/ (_| | |_| |  __/\__ \ |_\__ \
 |_|   \___/|___/\__| |_|  \_\___|\__, |\__,_|\___||___/\__|___/
                                     | |                        
                                     |_|                        
  Keywords (for easy searching): post requests, post, requests
*/


router.post("/communal-journal", async function(req, res){
  let sysChoice= req.query.sys;
  let isPinned = req.body.ispinned == 'on' ? true : false;
  if (!sysChoice){
    // Standard Communal Journal post.
    await db.query(client, "INSERT INTO comm_posts (u_id, title, body, is_pinned) VALUES ($1, $2, $3, $4);", [getCookies(req)['u_id'], `${encryptWithAES(req.body.title)}`, `${encryptWithAES(req.body.body)}`, `${isPinned}`], res, req);
    res.status(304).redirect("/system/communal-journal");
  } else {
    // ID check.
    const sysInfo = await db.query(client, "SELECT sys_id FROM systems WHERE user_id=$1", [getCookies(req)['u_id']], res, req);
    const sysList = sysInfo.map(obj => obj.sys_id);
    if (!(sysList.includes(sysChoice))) return res.status(404).render(`pages/404`, { session: req.session, code:"Not Found",cookies:req.cookies }); 

    // Passed the check, so proceed to enter the data.
    await db.query(client, "INSERT INTO comm_posts (u_id, title, body, is_pinned, system_id) VALUES ($1, $2, $3, $4, $5);", [getCookies(req)['u_id'], `${encryptWithAES(req.body.title)}`, `${encryptWithAES(req.body.body)}`, `${isPinned}`, `${req.body.sysid}`], res, req);
    res.status(304).redirect(`/system/communal-journal?sys=${sysChoice}`);
  }
  
});


module.exports = router;