// Alters Router
const express = require('express');
const router = express.Router();
const db = require('./db');
const client= db.client;
const crypto= require('crypto');
const CryptoJS = require("crypto-js");

const {isLoggedIn,
  getCookies,
  apiEyesOnly,
  encryptWithAES,
  decryptWithAES,
  forbidUser,
  lostPage,
  idCheck,
  isNumberOrUuid,
  paginate} = require("./funcs.js")


router.get("/edit-journal/:id", async (req, res)=>{
    if (isLoggedIn(req)){
      let journCheck = await db.query(client, "SELECT systems.user_id FROM systems INNER JOIN journals ON journals.sys_id = systems.sys_id WHERE journals.alt_id = $1;", [`${req.params.id}`], res, req);
      if (!idCheck(req, journCheck[0].user_id)) return lostPage(res, req);

      let journalInfo = await db.query(client, "SELECT journals.*, alters.*, systems.* FROM journals INNER JOIN alters ON journals.alt_id = alters.alt_id INNER JOIN systems ON systems.sys_id = alters.sys_id WHERE journals.alt_id=$1", [`${req.params.id}`], res, req);
      

      res.render(`pages/edit-journal`, { session: req.session, journal:journalInfo[0], cookies:req.cookies });
    } else {
      forbidUser(res, req)
    }
});

router.post("/edit-journal/:id", async (req, res)=>{
  if (isLoggedIn(req)){
    // Is this their alter/their journal?
    let journCheck = await db.query(client, "SELECT systems.user_id FROM systems INNER JOIN journals ON journals.sys_id = systems.sys_id WHERE journals.alt_id = $1;", [`${req.params.id}`], res, req);
    if (!idCheck(req, journCheck[0].user_id)) return lostPage(res, req);

    let isPixel = req.body.ispixel ? true : false;
    if (req.files){
      // They uploaded something-- This is the uploaded skin!
      await db.query(client, "UPDATE journals SET skin_blob=$2, skin_mimetype=$3, img_url=null, skin=1, is_pixelart=$4 WHERE alt_id=$1", [`${req.params.id}`, req.files.imgupload.data, req.files.imgupload.mimetype, isPixel], res, req);
    } else if (req.body.imgurl){
      // They put in a URL
      await db.query(client, "UPDATE journals SET skin_blob=null, skin_mimetype=null, img_url=$2, skin=1, is_pixelart=$3 WHERE alt_id=$1", [`${req.params.id}`, `${encryptWithAES(req.body.imgurl)}`, isPixel], res, req);
    } else if (req.body.journ) {
      // They picked a preset.
      await db.query(client, "UPDATE journals SET skin_blob=null, skin_mimetype=null, img_url=null, skin=$2, is_pixelart=true WHERE alt_id=$1", [`${req.params.id}`, `${req.body.journ}`], res, req);
    } 

    return res.redirect(`/alter/${req.params.id}`)

  } else {
    forbidUser(res, req);
  }
})


module.exports = router;