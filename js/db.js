const { Pool, Client,pg } = require('pg');

const encryptWithAES = (text) => {
  const passphrase = process.env.cryptkey;
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptWithAES = (ciphertext) => {
  const passphrase = process.env.cryptkey;
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  ssl: { rejectUnauthorized: false }
});

client.connect();

console.log(`Test?`);
// delete an entry from the inner world table.
function deleteIWEntry( iwID, page ){
  client.query({text: "DELETE FROM inner_worlds WHERE id=$1;", values:[iwID]}, (err, result)=>{
    if (err){
      console.log(err.stack);
      res.status(400).render('pages/400',{ session: req.session, code:"Bad Request", splash:splash });;
    }

    res.render(`pages/${page}`, { session: req.session, splash:splash });
    splash=null;
  });
}
