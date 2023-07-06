const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  // id: {
  //   type: Number,
  //   unique: true,
  // },
  pet_name: {
    type: String,
    required: [true, "Утга оруулна уу!"],
    unique: false,
    trim: true,
    maxlength: [25, "25 аас бага тэмдэгт оруулна уу!"],
  },
  pet_type: {
    type: String,
    required: [true, "pet заавал оруулна уу!"],
  },
  unit: {
    type: Number,
    default: 0,
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "member_id",
  },
});

module.exports = mongoose.model("Pets", PetSchema);
