const express = require('express')
const router = express.Router()
const Member = require("../Models/members");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const path = require('path')
const multer = require('multer');
const multipleUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads')
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const upload = multer({ storage: multipleUpload })


router.post('/createMember', upload.any('addressdoc'),
  async (req, res) => {

    try {
      const alreadyMember = await Member.findOne({ "email": req.body.email })
      if (alreadyMember) {
        res.status(401).json({
          success: false,
          message: "Email ID is already registered with ESI Membership Application."
        })
      }
      else {
        const obj2 = {
          image: req.files.image,
          addressdoc: req.files.addressdoc,
          pandoc: req.files.pandoc,
          mbbsdoc: req.files.mbbsdoc,
          mddoc: req.files.mddoc,
          dmdoc: req.files.dmdoc,
          mcidoc: req.files.mcidoc,
        }
         console.log(req.files);
        if (!obj2) {
          throw new CustomAPIError.BadRequestError('Please upload documents')
        }
        else {
        const x = new Date()

        var characters = 'A6BC0DEFG1H2IJ7KLMNO4P5QRSTU3VW8XY9Z';
        var result = ""
        var charactersLength = characters.length;

        for (var i = 0; i < 6; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        const obj1 = {
          applicationId: result,
          name: req.body.name,
          email: req.body.email,
          mobile: req.body.mobile,
          institute: req.body.institute,
          designation: req.body.designation,
          gender: req.body.gender,
          state: req.body.state,
          country: req.body.country,
          address: req.body.address,
          panno: req.body.panno,
          pname: req.body.pname,
          pemail: req.body.pemail,
          pesi: req.body.pesi,
          sname: req.body.sname,
          semail: req.body.semail,
          sesi: req.body.sesi,
          appCreateTime: x

        }
        const member = await Member.create(obj1);
        if (member) {
          const msg = {
            to: member.email,
            from: "noreply@saascraft.studio",
            subject: `ESI Membership Application No. ${member.applicationId}`,
            text: `Your ESI Membership Application No.  ${member.applicationId}`,
            html: `
            Dear ${member.name}<br/>

Subject: ESI Membership Application No.  ${member.applicationId}<br/>

We have recived your ESI membership application and under review. <br/>
<br/>

Name: ${member.name}<br/>
Institute: ${member.institute}<br/>
Designation: ${member.name}<br/>
Email: ${member.email}<br/>
Proposure Name: ${member.pname}<br/>
Seconder Name: ${member.sname}<br/>
<br/>
<br/>
Thanks<br/>
ESI Sec<br/>
Hyderabad, TS `,
          }
          await sgMail.send(msg);
          res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Register successfully applicationId sent to your email, please check it",
            "user email": member.email,

          })
        }
        else {
          res.status(404).json({
            success: false,
            message: "Error during form fillup"
          })

        }
      }
    }
  }
    
    catch (error) {
      console.log(error);
    }
  })

router.get('/getAllMembers', async (req, res) => {
  const members = await Member.find({});
  res.status(StatusCodes.OK).json({ members, counts: members.length });
});


module.exports = router