const PetModel = require("../models/PetModel");
const pool = require("../db");
const queries = require("../queries");

exports.getPetDatas = async (req, res) => {
  pool.query(queries.getPetDatas, (error, results) => {
    if (error) throw error;
    res.status(200).json({
      success: true,
      data: results.rows,
    });
  });

  // const Petdata = await PetModel.find();
};

exports.getPetData = async (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getPetData, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
  // try {
  //   const Data_mans = await DataModel.findById(req.params.id);
  //   if (!Data_mans) {
  //     throw new MyError(req.params.id + "id tai data bhgvi", 402);
  //   }
  //   DataModel.findById(req.params.id);
  //   res.status(200).json({
  //     success: true,
  //     data: Data_mans,
  //     message: "ID-тэй data-г өгнө,",
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     success: false,
  //     error: err,
  //   });
  // }
};
exports.createPet = async (req, res) => {
  const { pet_name, pet_type, unit, member_id } = req.body;

  pool.query(
    queries.createPet,
    [pet_name, pet_type, unit, member_id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json({
        success: true,
        data: `${req.params.id} Шинэ data үүсгэх`,
      });
    }
  );

  //   pool.query(queries.checkPet_typesExists, [pet_type], (error, results) => {
  //     // if (results.rows) {
  //     //   res.send("pet_type already exists");
  //     // }
  //   });

  //   const Petlist = await PetModel.create({ pet_name, pet_type, unit });

  //   console.log("qwe =>", Petlist);
  //   res.status(200).json({
  //     success: true,
  //     data: `${req.params.id} Шинэ Petdata үүсгэх`,
  //   });
  //   res.status(404).json({ message: error.message });
};

module.exports.updatePetData = (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  const { pet_name, pet_type, unit } = req.body;

  pool.query(queries.getPetData, [id], (error, results) => {
    const noPetsFound = !results?.rows?.length;
    if (noPetsFound) {
      res.send("Pets does not exist in the database.");
    }
    console.log("result=>>>>>>>>>>>1111111111111111111", results);
    pool.query(
      queries.updatePetData,
      [pet_name, pet_type, unit, id],
      (error, results) => {
        console.log("result=>>>>>>>>>>>", results);
        if (error) throw error;
        res.status(200).send("Pets updated success");
      }
    );
  });
};

// res.status(401).send({ msg: "Something went wrong! updated false" });
// return;
//   const { name, email, status } = req.body;

//   DataModel.findByIdAndUpdate(_id, { name, email, status })
//     .then(() => res.send("Update success"))
//     .catch((err) => {
//       console.log(err);
//       res.send({ error: err, msg: "Something went wrong! updated false" });
//     });
// };

module.exports.savePetData = (req, res) => {
  const { pet_name, pet_type, unit } = req.body;
  const { _id } = req.params;
  console.log("body", body);
  PetModel.create(_id, { pet_name, pet_type, unit })
    .then((data) => {
      console.log("Save data");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong! saved false" });
    });
};

module.exports.deletePetData = (req, res) => {
  console.log(req.params);
  const id = req.params._id;
  console.log("id=>>>>>>>>>>>>>>>>>>>.", id);
  pool.query(queries.getPetData, [id], (error, results) => {
    const noPetsFound = !results?.rows?.length;
    if (noPetsFound) {
      res.send("Pets does not exist in the database.");
    }
    pool.query(queries.deletePetData, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Deleted pet");
    });
  });
};
