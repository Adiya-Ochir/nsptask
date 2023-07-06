const DataModel = require("../models/DataModel");
const pool = require("../db");
const queries = require("../queries");
const MyError = require("../utils/MyError");
// const asyncHandler = require("express-async-handler");
exports.getDatas = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  console.log("==========>>>>>", page);
  // const startIndex = (page - 1) * limit;
  // const lastIndex = page * limit;
  const offset = (page - 1) * limit;
  const list = await new Promise((resolve, reject) => {
    pool.query(queries.getDatas, [offset, limit], (error, results) => {
      if (error) throw error;
      resolve(results?.rows);
    });
  });
  const total = await new Promise((resolve, reject) => {
    pool.query(queries.getDatasTotal, (error, results) => {
      if (error) throw error;
      resolve(results?.rows[0].count);
    });
  });
  res.status(200).json({
    success: true,
    data: { list, total },
    page,
    limit,
  });

  // const list = await DataModel.find().skip(startIndex).limit(limit);
  // const total = await DataModel.count();
  // const results = {};
  // results.totalUser = Data_mans.length;
  // results.pageCount = Math.ceil(Data_mans.length / limit);

  // TODO: tur haasan
  // if (lastIndex < Data_mans.length) {
  //   results.next = { page: page + 1 };
  // }
  // if (startIndex > 0) {
  //   results.prev = { page: page - 1 };
  // }
  // results.result = Data_mans.slice(startIndex, lastIndex);

  // Data_mans = Data_mans.skip(skip).limit(limit);
  // const Data_mans = await DataModel.find()
  //   .limit(perPage)
  //   .skip(perPage * page);
  // console.log("qwe =>", Data_mans);

  // res.status(200).json({
  //   success: true,
  //   data: { list, total },
  //   message: "Бүх data-г энд өгнө",
  // });

  // const page = req.query.p || 0;
  // const perPage = 5;

  // let Data = [];
  // const Data_mans = await DataModel.find()
  //   .limit(perPage)
  //   .skip(page * perPage)
  //   .forEach((data) => Data.push(data))
  //   .then(() => {
  //     res.status(200).json({
  //       success: true,
  //       data: Data_mans,
  //     });

  //     console.log("dataaaaaaaa", Data_mans);
  //   })
  //   .catch(() => {
  //     res.status(500).json({ error: "Could not fetch" });
  //   });

  //   res.send(Data_mans);
};
module.exports.getData = async (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getData, [id], (error, results) => {
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
exports.createData = async (req, res, next) => {
  const { uname, email, status } = req.body;
  console.info("bdoy", req.body);
  pool.query(queries.createData, [uname, email, status], (error, results) => {
    if (error) throw error;
    res.status(200).json({
      success: true,
      data: `${req.params.id} Шинэ data үүсгэх`,
    });
  });

  // const DataModel = await DataModel.create({
  //   // member_id: req.body.member_id,
  //   // Pet: req.body.Pet,
  // });
  // const list = await Pet.save();
  // console.log("qwe =>", list);
  // res.status(200).json({
  //   success: true,
  //   data: `${req.params.id} Шинэ data үүсгэх`,
  // });
};

// export const createUser = async (req, res) => {
//   try {
//     for (let name of User) {
//       var newUser = new User(name);
//       await newUser.save();
//     }
//     res.json("User created");
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const showAll = async (req, res) => {
//   try {
//     const users = await User.find().populate("Pet");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
// export const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).populate("Pet");
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

module.exports.saveData = (req, res) => {
  const { name, email, status } = req.body;
  // console.log("body", body);
  DataModel.create({ name, email, status })
    .then((data) => {
      console.log("Save data");
      res.status(201).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "Something went wrong! saved false" });
    });
};

module.exports.updateData = (req, res) => {
  const { id } = req.params;
  const { uname, email, status } = req.body;

  pool.query(
    queries.updateData,
    [uname, email, status, id],
    (error, result) => {
      if (error) throw error;
      res.status(200).send("User updated success");
    }
  );

  // const { _id } = req.params;
  // // res.status(401).send({ msg: "Something went wrong! updated false" });
  // // return;
  // const { name, email, status } = req.body;
  // DataModel.findByIdAndUpdate(_id, { name, email, status })
  //   .then(() => res.send("Update success"))
  //   .catch((err) => {
  //     console.log(err);
  //     res.send({ error: err, msg: "Something went wrong! updated false" });
  //   });
};

exports.deleteData = (req, res) => {
  const id = req.params.id;
  pool.query(queries.deleteData, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send("Deleted pet");
  });

  // const { _id } = req.params;
  // DataModel.findByIdAndDelete(_id)
  //   .then(() => res.send("Deleted success"))
  //   .catch((err) => {
  //     console.log(err);
  //     res.send({ error: err, msg: "Something went wrong! deleted false" });
  //   });
};
