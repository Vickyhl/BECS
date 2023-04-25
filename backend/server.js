import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import HttpError from "./models/httpError.js";
import cors from "cors";
import Blood from "./models/bloodStock.js";
import User from "./models/userModel.js";
import userRoutes from "./routes/userRoutes.js";
import auditTrailRoutes from "./routes/auditTrailRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// const forAp = ["A+", "O+", "A-", "O-"];
// const forOp = ["O+", "O-"];
// const forBp = ["O+", "B+", "B-", "O-"];
// const forABp = ["A+", "O+", "B+", "AB+", "A-", "B-", "AB-", "O-"];
// const forAm = ["A-", "O-"];
// const forOm = ["O-"];
// const forBm = ["B-", "O-"];
// const forABm = ["A-", "B-", "AB-", "O-"];

app.get("/data", async (req, res) => {
  Blood.find({}).then(function (docs) {
    // console.log(docs);
    res.send(docs);
  });
});

app.post("/inRoutine", async (req, res) => {
  let { bloodType, bloodAmount } = req.body;
  let forAp = await Blood.findOne({ type: "A+" });
  let forOp = await Blood.findOne({ type: "O+" });
  let forBp = await Blood.findOne({ type: "B+" });
  let forABp = await Blood.findOne({ type: "AB+" });
  let forAm = await Blood.findOne({ type: "A-" });
  let forOm = await Blood.findOne({ type: "O-" });
  let forBm = await Blood.findOne({ type: "B-" });
  let forABm = await Blood.findOne({ type: "AB-" });

  console.log(forAp);
  if (bloodType == "A+") {
    if (bloodAmount > forAp.amount) {
      if (bloodAmount > forOp.amount) {
        if (bloodAmount > forAm.amount) {
          if (bloodAmount > forOm.amount) {
            res.send({
              message:
                "There is not enogh blood that maches the request, try another amount",
            });
          } else {
            res.send({
              message: `${bloodAmount} packets of type O- were produced at your request`,
            });
            forOm.amount = forOm.amount - bloodAmount;
            await forOm.save();
          }
        } else {
          res.send({
            message: `${bloodAmount} packets of type A- were produced at your request`,
          });
          forAm.amount = forAm.amount - bloodAmount;
          await forAm.save();
        }
      } else {
        res.send({
          message: `${bloodAmount} packets of type O+ were produced at your request`,
        });
        forOp.amount = forOp.amount - bloodAmount;
        await forOp.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type A+ were produced at your request`,
      });
      forAp.amount = forAp.amount - bloodAmount;
      await forAp.save();
    }
  } else if (bloodType == "O+") {
    if (bloodAmount > forOp.amount) {
      if (bloodAmount > forOm.amount) {
        res.send({
          message:
            "There is not enogh blood that maches the request, try another amount",
        });
      } else {
        res.send({
          message: `${bloodAmount} packets of type O- were produced at your request`,
        });
        forOm.amount = forOm.amount - bloodAmount;
        await forOm.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type O+ were produced at your request`,
      });
      forOp.amount = forOp.amount - bloodAmount;
      await forOp.save();
    }
  } else if (bloodType == "B+") {
    if (bloodAmount > forOp.amount) {
      if (bloodAmount > forBp.amount) {
        if (bloodAmount > forBm.amount) {
          if (bloodAmount > forOm.amount) {
            res.send({
              message:
                "There is not enogh blood that maches the request, try another amount",
            });
          } else {
            res.send({
              message: `${bloodAmount} packets of type O- were produced at your request`,
            });
            forOm.amount = forOm.amount - bloodAmount;
            await forOm.save();
          }
        } else {
          res.send({
            message: `${bloodAmount} packets of type B- were produced at your request`,
          });
          forBm.amount = forBm.amount - bloodAmount;
          await forBm.save();
        }
      } else {
        res.send({
          message: `${bloodAmount} packets of type B+ were produced at your request`,
        });
        forBp.amount = forBp.amount - bloodAmount;
        await forBp.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type O+ were produced at your request`,
      });
      forOp.amount = forOp.amount - bloodAmount;
      await forOp.save();
    }
  } else if (bloodType == "AB+") {
    if (bloodAmount > forAp.amount) {
      if (bloodAmount > forOp.amount) {
        if (bloodAmount > forBp.amount) {
          if (bloodAmount > forABp.amount) {
            if (bloodAmount > forAm.amount) {
              if (bloodAmount > forBm.amount) {
                if (bloodAmount > forABm.amount) {
                  if (bloodAmount > forOm.amount) {
                    res.send({
                      message:
                        "There is not enogh blood that maches the request, try another amount",
                    });
                  } else {
                    res.send({
                      message: `${bloodAmount} packets of type O- were produced at your request`,
                    });
                    forOm.amount = forOm.amount - bloodAmount;
                    await forOm.save();
                  }
                } else {
                  res.send({
                    message: `${bloodAmount} packets of type AB- were produced at your request`,
                  });
                  forABm.amount = forABm.amount - bloodAmount;
                  await forABm.save();
                }
              } else {
                res.send({
                  message: `${bloodAmount} packets of type B- were produced at your request`,
                });
                forBm.amount = forBm.amount - bloodAmount;
                await forBm.save();
              }
            } else {
              res.send({
                message: `${bloodAmount} packets of type A- were produced at your request`,
              });
              forAm.amount = forAm.amount - bloodAmount;
              await forAm.save();
            }
          } else {
            res.send({
              message: `${bloodAmount} packets of type AB+ were produced at your request`,
            });
            forABp.amount = forABp.amount - bloodAmount;
            await forABp.save();
          }
        } else {
          res.send({
            message: `${bloodAmount} packets of type B+ were produced at your request`,
          });
          forBp.amount = forBp.amount - bloodAmount;
          await forBp.save();
        }
      } else {
        res.send({
          message: `${bloodAmount} packets of type O+ were produced at your request`,
        });
        forOp.amount = forOp.amount - bloodAmount;
        await forOp.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type A+ were produced at your request`,
      });
      forAp.amount = forAp.amount - bloodAmount;
      await forAp.save();
    }
  } else if (bloodType == "A-") {
    if (bloodAmount > forAm.amount) {
      if (bloodAmount > forOm.amount) {
        res.send({
          message:
            "There is not enogh blood that maches the request, try another amount",
        });
      } else {
        res.send({
          message: `${bloodAmount} packets of type O- were produced at your request`,
        });
        forOm.amount = forOm.amount - bloodAmount;
        await forOm.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type A- were produced at your request`,
      });
      forAm.amount = forAm.amount - bloodAmount;
      await forAm.save();
    }
  } else if (bloodType == "O-") {
    if (bloodAmount > forOm.amount) {
      res.send({
        message:
          "There is not enogh blood that maches the request, try another amount",
      });
    } else {
      res.send({
        message: `${bloodAmount} packets of type O- were produced at your request`,
      });
      forOm.amount = forOm.amount - bloodAmount;
      await forOm.save();
    }
  } else if (bloodType == "B-") {
    if (bloodAmount > forBm.amount) {
      if (bloodAmount > forOm.amount) {
        res.send({
          message:
            "There is not enogh blood that maches the request, try another amount",
        });
      } else {
        res.send({
          message: `${bloodAmount} packets of type O- were produced at your request`,
        });
        forOm.amount = forOm.amount - bloodAmount;
        await forOm.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type B- were produced at your request`,
      });
      forBm.amount = forBm.amount - bloodAmount;
      await forBm.save();
    }
  } else {
    if (bloodAmount > forAm.amount) {
      if (bloodAmount > forBm.amount) {
        if (bloodAmount > forABm.amount) {
          if (bloodAmount > forOm.amount) {
            res.send({
              message:
                "There is not enogh blood that maches the request, try another amount",
            });
          } else {
            res.send({
              message: `${bloodAmount} packets of type O- were produced at your request`,
            });
            forOm.amount = forOm.amount - bloodAmount;
            await forOm.save();
          }
        } else {
          res.send({
            message: `${bloodAmount} packets of type AB- were produced at your request`,
          });
          forABm.amount = forABm.amount - bloodAmount;
          await forABm.save();
        }
      } else {
        res.send({
          message: `${bloodAmount} packets of type B- were produced at your request`,
        });
        forBm.amount = forBm.amount - bloodAmount;
        await forBm.save();
      }
    } else {
      res.send({
        message: `${bloodAmount} packets of type A- were produced at your request`,
      });
      forAm.amount = forAm.amount - bloodAmount;
      await forAm.save();
    }
  }
});

app.post("/MCI", async (req, res) => {
  let { bloodAmount } = req.body;
  let forOm = await Blood.findOne({ type: "O-" });
  if (forOm.amount == 0) {
    res.send({
      message: "There is a shortage of O- blood",
    });
  } else if (forOm.amount < bloodAmount) {
    res.send({
      message: `The requested quantity is not available. ${forOm.amount} batches were produced`,
    });
    forOm.amount = 0;
    await forOm.save();
  } else {
    res.send({
      message: `${bloodAmount} packets of type O- were produced at your request`,
    });
    forOm.amount = forOm.amount - bloodAmount;
    await forOm.save();
  }
});

app.post("/donation", async (req, res) => {
  const { firstName, lastName, id, bloodType, donationDate } = req.body;
  const createdUser = new User({
    firstName,
    lastName,
    email: id,
    id,
    bloodType,
    donationDate,
  });
  console.log(createdUser.email);
  await createdUser.save();

  let forX = await Blood.findOne({ type: bloodType });

  forX.amount += 1;
  await forX.save();
  res.send({
    message: "Congrats on the donation!",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auditTrails", auditTrailRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/*============================
        listen
=============================*/
app.listen(5000, () => {
  console.log("Server is runing at port 5000");
});

// /*=================================
//         Database
// ===================================*/

mongoose
  .connect("mongodb+srv://Vicky:123456EAF@eaf.rhcan5b.mongodb.net/BECS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });
