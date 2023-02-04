const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const userRoutes = require("./routes/user");
const expenseRouters = require("./routes/expense");
const paymentRouters = require("./routes/payment");
const passwordRouter = require("./routes/password");
const UserModel = require("./models/user");
const ExpenseModel = require("./models/expense");
const Order = require("./models/order");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRouters);
app.use("/payment", paymentRouters);
app.use("/password", passwordRouter);

UserModel.hasMany(ExpenseModel);
ExpenseModel.belongsTo(UserModel);

UserModel.hasMany(Order);
Order.belongsTo(UserModel);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    app.listen(3001, () => {
      console.log("DB CONNECTED");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// appjs is used as a source file
