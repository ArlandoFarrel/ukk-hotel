const pemesananModel = require(`../models/index`).pemesanan;
const detailsOfPemesananModel = require(`../models/index`).detail_pemesanan;
const userModel = require(`../models/index`).user;
const roomModel = require(`../models/index`).kamar;
const tipeModel = require(`../models/index`).tipe_kamar;
const moment = require("moment");
const Op = require(`sequelize`).Op

const Sequelize = require("sequelize");
const { request, response } = require("../routes/user_route");
const sequelize = new Sequelize("hotell", "root", "", {
  host: "localhost",
  dialect: "mysql",
})

// exports.addPemesanan = async (request, response) => {
//     let nomor_kamar = request.body.nomor_kamar;
//     let room = await roomModel.findOne({
//       where: {
//         [Op.and]: [{ nomor_kamar: { [Op.substring]: nomor_kamar } }],
//       },
//       attributes: [
//         "id",
//         "nomor_kamar",
//         "id_tipe_kamar",
//         "createdAt",
//         "updatedAt",
//       ],
//     });
//     let numberRandom = Math.floor(
//       Math.random() * (10000000 - 99999999) + 99999999
//     );
// let tw = Date.now();

//     let nama_user = request.body.nama_user;
//     let userId = await userModel.findOne({
//       where: {
//         [Op.and]: [{ nama_user: { [Op.substring]: nama_user } }],
//       },
//     });

//     if (room === null) {
//       return response.json({
//         success: false,
//         message: `Kamar yang anda inputkan tidak ada`,
//       });
//     } else if (userId === null) {
//       return response.json({
//         success: false,
//         message: `User yang anda inputkan tidak ada`,
//       });
//     } else {
//       let newData = {
//         nomor_pemesanan: numberRandom,
//         nama_pemesan: request.body.nama_pemesan,
//         email_pemesan: request.body.email_pemesan,
//         tgl_pemesanan: tw,  
//         tgl_check_in: request.body.tgl_check_in,
//         tgl_check_out: request.body.tgl_check_out,
//         nama_tamu: request.body.nama_tamu,
//         jumlah_kamar: request.body.jumlah_kamar,
//         id_tipe_kamar: room.id_tipe_kamar,
//         status_pemesanan: request.body.status_pemesanan,
//         id_user: userId.id,
//       };

//       let roomCheck = await sequelize.query(
//         `SELECT * FROM detail_pemesanans WHERE id_kamar = ${room.id} AND tgl_akses= "${request.body.check_in}" ;`
//       );

//       if (roomCheck[0].length === 0) {
//         pemesananModel
//           .create(newData)
//           .then((result) => {
//             let pemesananID = result.id;
//             let detailsOfPemesanan = request.body.details_of_pemesanan;

//             for (let i = 0; i < detailsOfPemesanan.length; i++) {
//               detailsOfPemesanan[i].id_pemesanan = pemesananID;
//             }

//             let tgl1 = new Date(request.body.tgl_check_in);
//             let tgl2 = new Date(request.body.tgl_check_out);
//             let checkIn = moment(tgl1).format("YYYY-MM-DD");
//             let checkOut = moment(tgl2).format("YYYY-MM-DD");

//             // check if the dates are valid
//             if (
//               !moment(checkIn, "YYYY-MM-DD").isValid() ||
//               !moment(checkOut, "YYYY-MM-DD").isValid()
//             ) {
//               return response
//                 .status(400)
//                 .send({ message: "Invalid date format" });
//             }

//             let success = true;
//             let message = '';
//             let duration = moment.duration(moment(checkOut).diff(moment(checkIn)));
// let totalDays = duration.asDays();
// let totalHarga = totalDays * detailsOfPemesanan[0].harga;

//             for (
//               let m = moment(checkIn, "YYYY-MM-DD");
//               m.isBefore(checkOut);
//               m.add(1, "days")
//             ) {
//               let date = m.format("YYYY-MM-DD");
//               let newDetail = {
//                 id_pemesanan: pemesananID,
//                 id_kamar: room.id,
//                 tgl_akses: moment(checkIn).format("YYYY-MM-DD"),
//                 // harga: detailsOfPemesanan[0].harga,
//                 harga: totalHarga,
//               };
//               detailsOfPemesananModel
//                 .create(newDetail)
//                 .catch((error) => {
//                   success = false;
//                   message = error.message;
//                 });
//             }

//             if (success) {
//               return response.json({
//                 success: true,
//                 message: `New transactions have been inserted`,
//               });
//             } else {
//               return response.json({
//                 success: false,
//                 message: message,
//               });
//             }
//       })          
//           .catch((error) => {
//             return response.json({
//               success: false,
//               message: error.message,
//             });
//           });
//       } else {
//         return response.json({
//           success: false,
//           message: `Kamar yang anda pesan sudah di booking`,
//         });
//       }
//     }
//   };

// update data for status_pemesanan attribute

exports.addPemesanan = async (request, response) => {
  const tipe_kamar = request.body.tipe_kamar;
  const nama_user = request.body.nama_user;

  try {
    // Find the 'tipe' based on 'tipe_kamar'
    const tipe = await tipeModel.findOne({
      where: {
        nama_tipe_kamar: {
          [Op.substring]: tipe_kamar,
        },
      },
    });

    if (tipe === null) {
      return response.status(404).json({
        success: false,
        message: `Tipe Kamar ${tipe_kamar} tidak ditemukan`,
      });
    }
    // console.log("tipe object:", tipe);
    console.log("tipe.id:", tipe.id);


    // Check for booked rooms within the specified date range
    const bookedRooms = await sequelize.query(
      `SELECT id_kamar FROM detail_pemesanans WHERE tgl_akses BETWEEN "${request.body.tgl_check_in}" AND "${request.body.tgl_check_out}"`
    );
    const bookedRoomIds = bookedRooms[0].map((row) => row.id_kamar);

    // Find available rooms for the specified 'tipe_kamar'
    const rooms = await roomModel.findAll({
      where: {
        id_tipe_kamar: tipe.id,
        id: {
          [Op.notIn]: bookedRoomIds,
        },
      },
      attributes: ['id', 'nomor_kamar', 'id_tipe_kamar', 'createdAt', 'updatedAt'],
    });



    // Find the user based on 'nama_user'
    const user = await userModel.findOne({
      where: {
        nama_user: {
          [Op.substring]: nama_user,
        },
      },
    });

    if (rooms.length === 0) {
      return response.json({
        success: false,
        message: `Waduh Habis Sam Kamarnya`,
      });
    } else if (user === null) {
      return response.json({
        success: false,
        message: `User yang anda inputkan tidak ditemukan`,
      });
    } else {
      const date = moment();
      const tgl = date.format('YYYY-MM-DD');
      let numberRandom = Math.floor(
        Math.random() * (10000000 - 99999999) + 99999999
      );
      // const tgl_pesan = `${tgl}-${randomString}`;
      const today = new Date();


      const newData = {
        nomor_pemesanan: numberRandom,
        nama_pemesan: request.body.nama_pemesan,
        email_pemesan: request.body.email_pemesan,
        tgl_pemesanan: today,
        tgl_check_in: request.body.tgl_check_in,
        tgl_check_out: request.body.tgl_check_out,
        nama_tamu: request.body.nama_tamu,
        jumlah_kamar: request.body.jumlah_kamar,
        id_tipe_kamar: tipe.id, // Updated to 'id_tipe_kamar'
        status_pemesanan: 'baru',
        id_user: user.id,
      };

      // Check if the room is already booked on 'tgl_check_in'
      const roomCheck = await sequelize.query(
        `SELECT * FROM detail_pemesanans WHERE id_kamar = '${newData.id_tipe_kamar}' AND tgl_akses= "${request.body.tgl_check_in}"`
      );

      if (roomCheck[0].length === 0) {
        let success = true;
        let message = '';

        const availableRooms = rooms.slice(0, newData.jumlah_kamar);

        if (availableRooms.length < newData.jumlah_kamar) {
          return response.json({
            success: false,
            message: `Hanya Wonten ${availableRooms.length} kamar for tipe kamar ${tipe_kamar}`,
          });
        }

        // Create a new pemesanan
        const result = await pemesananModel.create(newData);

        const pemesananID = result.id;
        const detail_pemesanan = tipe.harga;

        const tgl_check_in = moment(request.body.tgl_check_in, 'YYYY-MM-DD');
        const tgl_check_out = moment(request.body.tgl_check_out, 'YYYY-MM-DD');
        const totalDays = tgl_check_out.diff(tgl_check_in, 'days');

        const totalHarga = tipe.harga * newData.jumlah_kamar * totalDays;

        // Create detail_pemesanan entries for each day and room
        for (
          let m = moment(newData.tgl_check_in, 'YYYY-MM-DD');
          m.isBefore(newData.tgl_check_out);
          m.add(1, 'days')
        ) {
          const date = m.format('YYYY-MM-DD');

          for (let i = 0; i < availableRooms.length; i++) {
            const roomNumber =
              availableRooms.length > 1
                ? `${availableRooms[i].nomor_kamar}-${m.diff(
                  moment(request.body.tgl_check_in, 'YYYY-MM-DD'),
                  'days'
                ) + 1}`
                : availableRooms[i].nomor_kamar;

            const newDetail = {
              id_pemesanan: pemesananID,
              id_kamar: availableRooms[i].id,
              tgl_akses: date,
              harga: totalHarga,
              nomor_kamar: roomNumber,
            };

            await detailsOfPemesananModel
              .create(newDetail)
              .catch((error) => {
                success = false;
                message = error.message;
              });
          }
        }

        if (success) {
          return response.json({
            success: numberRandom,
            message: `New transactions`,
            nomor_pemesanan: numberRandom,
          });
        } else {
          return response.json({
            success: false,
            message: message,
            nomor_pemesanan: null,
          });
        }
      } else {
        return response.json({
          success: false,
          message: `Kamar yang akan dipesan sudah di booking`,
        });
      }
    }
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateStatusPemesanan = async (request, response) => {
  const pemesananID = request.params.id;
  const { status_pemesanan } = request.body;

  try {
    const updatedPemesanan = await pemesananModel.update(
      { status_pemesanan },
      { where: { id: pemesananID } }
    );

    if (updatedPemesanan[0] === 0) {
      return response.json({
        success: false,
        message: "Pemesanan tidak ditemukan",
      });
    }

    return response.json({
      success: true,
      message: "Status pemesanan telah diperbarui",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};




//update data
exports.updatePemesanan = async (request, response) => {
  let nomor_kamar = request.body.nomor_kamar;
  let room = await roomModel.findOne({
    where: {
      [Op.and]: [{ nomor_kamar: { [Op.substring]: nomor_kamar } }],
    },
    attributes: [
      "id",
      "nomor_kamar",
      "id_tipe_kamar",
      "createdAt",
      "updatedAt",
    ],
  });

  let nama_user = request.body.nama_user;
  let userId = await userModel.findOne({
    where: {
      [Op.and]: [{ nama_user: { [Op.substring]: nama_user } }],
    },
  });

  let newData = {
    nomor_pemesanan: request.body.nomor_pemesanan,
    nama_pemesanan: request.body.nama_pemesanan,
    email_pemesanan: request.body.email_pemesanan,
    tgl_pemesanan: request.body.tgl_pemesanan,
    tgl_check_in: request.body.tgl_check_in,
    tgl_check_out: request.body.tgl_check_out,
    nama_tamu: request.body.nama_tamu,
    jumlah_kamar: request.body.jumlah_kamar,
    id_tipe_kamar: room.id_tipe_kamar,
    status_pemesanan: request.body.status_pemesanan,
    id_user: userId.id,
  };

  let pemesananID = request.params.id;

  pemesananModel
    .update(newData, { where: { id: pemesananID } })
    .then(async (result) => {
      await detailsOfPemesananModel.destroy({
        where: { id_pemesanan: pemesananID },
      });

      let detailsOfPemesanan = request.body.details_of_pemesanan;

      for (let i = 0; i < detailsOfPemesanan.length; i++) {
        detailsOfPemesanan[i].id_pemesanan = pemesananID;
      }

      let tgl1 = new Date(request.body.tgl_check_in);
      let tgl2 = new Date(request.body.tgl_check_out);
      let checkIn = moment(tgl1).format("YYYY-MM-DD");
      let checkOut = moment(tgl2).format("YYYY-MM-DD");

      // check if the dates are valid
      if (
        !moment(checkIn, "YYYY-MM-DD").isValid() ||
        !moment(checkOut, "YYYY-MM-DD").isValid()
      ) {
        return response
          .status(400)
          .send({ message: "Invalid date format" });
      }

      let success = true;
      let message = '';

      for (
        let m = moment(checkIn, "YYYY-MM-DD");
        m.isBefore(checkOut);
        m.add(1, "days")
      ) {
        let date = m.format("YYYY-MM-DD");
        let newDetail = {
          id_pemesanan: pemesananID,
          id_kamar: room.id,
          tgl_akses: date,
          harga: detailsOfPemesanan[0].harga,
        };
        detailsOfPemesananModel
          .create(newDetail)
          .catch((error) => {
            success = false;
            message = error.message;
          });
      }

      if (success) {
        return response.json({
          success: true,
          message: `New transactions have been inserted`,
        });
      } else {
        return response.json({
          success: false,
          message: message,
        });
      }
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

//delete data
exports.deletePemesanan = async (request, response) => {
  let pemesananID = request.params.id;

  detailsOfPemesananModel
    .destroy({
      where: { id_pemesanan: pemesananID },
    })
    .then((result) => {
      pemesananModel
        .destroy({ where: { id: pemesananID } })
        .then((result) => {
          return response.json({
            success: true,
            message: `Transaction has been deleted`,
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

//mendapatkan semua data
exports.getAllPemesanan = async (request, response) => {
  const result = await sequelize.query(
    "SELECT pemesanans.id, pemesanans.nama_pemesan,pemesanans.email_pemesan,pemesanans.tgl_pemesanan,pemesanans.tgl_check_in,pemesanans.tgl_check_out,pemesanans.nama_tamu,pemesanans.jumlah_kamar,pemesanans.status_pemesanan, users.nama_user, tipe_kamars.nama_tipe_kamar, kamars.nomor_kamar FROM pemesanans JOIN tipe_kamars ON tipe_kamars.id = pemesanans.id_tipe_kamar JOIN users ON users.id=pemesanans.id_user JOIN detail_pemesanans ON detail_pemesanans.id_pemesanan=pemesanans.id JOIN kamars ON kamars.id=detail_pemesanans.id_kamar GROUP BY pemesanans.id"
  );

  response.json({
    success: true,
    data: result[0],
    message: `All Transaction have been loaded`,
  });
};

//mendapatkan salah satu data
exports.findPemesanan = async (request, response) => {
  let memberID = request.params.id;

  const result = await sequelize.query(
    `SELECT pemesanans.id, pemesanans.nama_pemesan,pemesanans.email_pemesan,pemesanans.tgl_pemesanan,pemesanans.tgl_check_in,pemesanans.tgl_check_out,pemesanans.nama_tamu,pemesanans.jumlah_kamar,pemesanans.status_pemesanan, users.nama_user, tipe_kamars.nama_tipe_kamar, kamars.nomor_kamar FROM pemesanans JOIN tipe_kamars ON tipe_kamars.id = pemesanans.id_tipe_kamar JOIN users ON users.id=pemesanans.id_user JOIN detail_pemesanans ON detail_pemesanans.id_pemesanan=pemesanans.id JOIN kamars ON kamars.id=detail_pemesanans.id_kamar WHERE pemesanans.id=${memberID}`
  );

  return response.json({
    success: true,
    data: result[0],
    message: `Transaction have been loaded`,
  });
};
//   exports.findPemesananUser = async (request, response) => {
//     let userId = request.user.id; // Assuming the user ID is available in request.user.id after authentication

//     try {
//         const result = await sequelize.query(
//             `SELECT pemesanans.id, pemesanans.nama_pemesan, pemesanans.email_pemesan, pemesanans.tgl_pemesanan, pemesanans.tgl_check_in, pemesanans.tgl_check_out, pemesanans.nama_tamu, pemesanans.jumlah_kamar, pemesanans.status_pemesanan, users.nama_user, tipe_kamars.nama_tipe_kamar, kamars.nomor_kamar FROM pemesanans 
//             JOIN tipe_kamars ON tipe_kamars.id = pemesanans.id_tipe_kamar 
//             JOIN users ON users.id = pemesanans.id_user 
//             JOIN detail_pemesanans ON detail_pemesanans.id_pemesanan = pemesanans.id 
//             JOIN kamars ON kamars.id = detail_pemesanans.id_kamar 
//             WHERE pemesanans.id_user = ${userId}`
//         );

//         return response.json({
//             success: true,
//             data: result[0],
//             message: `Transaction data for user ID ${userId} has been loaded`,
//         });
//     } catch (error) {
//         console.error(error);
//         return response.status(500).json({
//             success: false,
//             message: 'Internal server error',
//         });
//     }
// };

exports.getPemesananById = async (request, response) => {
  let id = request.params.id; // Mengambil nilai 'keyword' dari query string URL

  const result = await sequelize.query(
    `SELECT DISTINCT
      pemesanans.id,
      detail_pemesanans.harga,
      pemesanans.nomor_pemesanan,
      pemesanans.nama_pemesan,
      pemesanans.email_pemesan,
      pemesanans.tgl_pemesanan,
      pemesanans.tgl_check_in,
      pemesanans.tgl_check_out,
      pemesanans.nama_tamu,
      pemesanans.jumlah_kamar,
      pemesanans.status_pemesanan,
      users.nama_user,
      tipe_kamars.nama_tipe_kamar,
      GROUP_CONCAT(kamars.nomor_kamar) AS nomor_kamar
  FROM
      pemesanans
  JOIN
      tipe_kamars ON tipe_kamars.id = pemesanans.id_tipe_kamar
  JOIN
      users ON users.id = pemesanans.id_user
  JOIN
      detail_pemesanans ON detail_pemesanans.id_pemesanan = pemesanans.id
  JOIN
      kamars ON kamars.id = detail_pemesanans.id_kamar
  WHERE
      users.id LIKE '%${id}%'
  GROUP BY
      pemesanans.nomor_pemesanan
  ORDER BY
      nomor_pemesanan ASC;
  
      `
  );

  return response.json({
    success: true,
    data: result[0],
    message: `Transaction Sampun Terload ALL`,
  });
};


