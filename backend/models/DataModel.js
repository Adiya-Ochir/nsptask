const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   unique: true,
  // },
  name: {
    type: String,
    required: [true, "Утга оруулна уу!"],
    unique: false,
    trim: true,
    maxlength: [25, "25 аас бага тэмдэгт оруулна уу!"],
  },
  email: {
    type: String,
    required: [true, "имэйл заавал оруулна уу!"],
  },
  status: {
    type: Number,
    default: 0,
  },
  // pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
});

module.exports = mongoose.model("Pet", DataSchema);
