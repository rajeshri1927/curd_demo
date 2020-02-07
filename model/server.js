const express = require('express');
const conn = require('./include/db.js');
const upload = require('./fileupload.js');
const nodeMailer = require('nodemailer');
// const router = require('./index.js');
//const router = require('./routes/index.js');
const router = express.Router();
router.get('/',(req, res) => {
  //console.log(req);
  let sql = "SELECT * FROM product order by product_id desc";
  let query = conn.query(sql,(err, results) => {
  console.log(results);
   if(err) throw err;
     res.render('./product_view',{
     results: results
     });
  });
});

/*Image code*/
router.post('/save',function (req, res) {
    upload(req,res,function(err) {
    if(err) {
        res.send('Error in File Uploading....');
    } 
  let data = {product_name:req.body.product_name, product_price: req.body.product_price,product_email:req.body.product_email,product_image:req.file.originalname};
  //console.log(data);
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
  if(err) throw err;
    res.redirect('/');
  });
 //router.post('/save', function (req, res) {
 let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'rajeshreepevekar@gmail.com',
        pass: 'sachin@1993'
    }
});
var htmlcontent =''
htmlcontent +='<div class="container" style="border:1px solid green">';
htmlcontent +='<h4>Welcome To Node JS </h4>';
htmlcontent +='<p>Dear ,'+ req.body.product_name +'<br>';
htmlcontent +='<p>Product Price:'+ req.body.product_price +'<br>';
htmlcontent +='<p>Product Email: '+ req.body.product_email +'<br>';
htmlcontent +='<br>You have successfully added In the System</p>';
htmlcontent +='</div>';
let mailOptions = {
    from: '"Rajeshri Pevekar" <rajeshreepevekar@gmail.com>', // sender address
    to:req.body.product_email,
    subject:'Enquiry Email',
    html: htmlcontent
    //html:'<b>Welcome To Node JS </b> <br><br> <br>Regards,<br>Rajeshri Pevekar',
  //   attachments: [
  //     { // Use a URL as an attachment
  //      //filename: req.body.product_image,
  //       path:'./upload/'.product_image
  //   }
  // ]
     //req.body.product_price' 
    //product_email:req.body.product_email, // plain text body
   // html: '<b>Welcome To Node JS.............</b>' // html body
};
console.log(mailOptions);
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
        res.render('index');
    });
});
});
//route for insert data
router.post('/update',(req, res) => {
  var fileupload="";
   if(req.file)
   {
    fileupload =",product_image='"+req.file.originalname+"'";
   }
   upload(req,res,function(err) {
	  if(err) {
	      res.send('Error in File Uploading....');
	  }
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"',product_price='"+req.body.product_price+"'"+fileupload+" WHERE product_id="+req.body.id;
  //console.log(sql)
  let query = conn.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/');
    
  });
});
});
//route for delete data
router.post('/delete',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.body.product_id+"";
  console.log(req.body.product_id);
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});
module.exports = router;
