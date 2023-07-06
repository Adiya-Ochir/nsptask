exports.getPetDatas = "SELECT *FROM pets";
exports.getPetData = "SELECT * FROM pets WHERE member_id = $1";
exports.checkPet_typesExists = "SELECT s FROM pets WHERE s.pet_type = $1";
exports.createPet =
  "INSERT INTO pets (pet_name, pet_type, unit, member_id) VALUES ($1, $2, $3, $4)";
exports.deletePetData = "DELETE FROM pets WHERE id = $1";
exports.updatePetData =
  "UPDATE pets SET pet_name = $1, pet_type = $2, unit = $3 WHERE id = $4 ";

exports.getDatas = "SELECT * FROM data_mans offset $1 limit $2 ";

exports.getDatasTotal = "SELECT COUNT(*) FROM data_mans";
exports.createData =
  "INSERT INTO data_mans (uname, email, status) VALUES ($1, $2, $3)";
exports.deleteData = "DELETE FROM data_mans WHERE id =$1";
exports.updateData =
  "UPDATE data_mans SET uname = $1, email = $2, status = $3 WHERE id = $4";

exports.getData = "SELECT * FROM data_mans WHERE id = $1";
