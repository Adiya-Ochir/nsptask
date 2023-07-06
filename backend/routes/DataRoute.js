const { Router } = require("express");

const {
  getDatas,
  getData,
  saveData,
  createData,
  deleteData,
  updateData,
} = require("../controllers/DataController");

const {
  getPetDatas,
  createPet,
  getPetData,
  savePetData,
  updatePetData,
  deletePetData,
} = require("../controllers/PetController");

const router = Router();
router.route("/").get(getDatas).post(createData);
router.route("/pet").get(getPetDatas).post(createPet);
router.get("/get/:id", getData);
router.get("/pet/get/:id", getPetData);
router.get("/save", saveData);
router.get("/pet/save", savePetData);
router.put("/update/:id", updateData);
router.put("/pet/update/:id", updatePetData);
router.delete("/delete/:id", deleteData);
router.delete("/pet/delete/:_id", deletePetData);

module.exports = router;
