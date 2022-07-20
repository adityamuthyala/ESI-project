const mongoose = require("mongoose");
const validator = require("validator");

const memberSchema = new mongoose.Schema({
  applicationId: {
    type: String
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide valid email',
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  mobile: {
    type: Number,
    required: true,
  },

  designation: {
    type: String,
    // required: true
  },

  institute: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    // required: true
  },
  country: {
    type: String,
    // required: true,
  },
  panno: {
    type: String,
    required: true,
  },
  pandoc: [{
    type: String,
    required: true,
  }],
  addressdoc: [{
    type: String,
    required: true,

  }],

  image: [{
    type: String

  }],

  mbbsdoc: [{
    type: String,
    required: true,

  }],

  mddoc: [{
    type: String,
    required: true,
  }],

  dmdoc: [{
    type: String,
    required: true
  }],

  mcidoc: [{
    type: String,
    required: true
  }],

  pname: { type: String },
  pemail: { type: String },
  pesi: { type: String },
  sname: { type: String },
  semail: { type: String },
  sesi: { type: String },
  bio: { type: String },
  pname: { type: String },
  pemail: { type: String },
  pesi: { type: String },
  sname: { type: String },
  semail: { type: String },
  sesi: { type: String },

  pstatus: {
    type: Boolean,
    default: false
  },
  sstatus: {
    type: Boolean,
    default: false
  },
  ccstatus: {
    type: Boolean,
    default: false
  },
  hsstatus: {
    type: Boolean,
    default: false
  },

  appCreateTime: { type: String }
});



module.exports = mongoose.model("Details", memberSchema);
