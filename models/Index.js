const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    loggin: false,
  }
);

const Administrator = require("./Administrator")(sequelize, Model, DataTypes);
const Client = require("./Client")(sequelize, Model, DataTypes);
const Category = require("./Category")(sequelize, Model, DataTypes);
const Order = require("./Order")(sequelize, Model, DataTypes);
const Product = require("./Product")(sequelize, Model, DataTypes);
const PurchaseHistory = require("./PurchaseHistory")(
  sequelize,
  Model,
  DataTypes
);

// Relations
Client.hasMany(Order);
Order.belongsTo(Client);

Order.hasMany(Product);
Product.belongsTo(Order);

Category.hasMany(Product);
Product.belongsTo(Category);

Order.hasMany(PurchaseHistory);
PurchaseHistory.belongsTo(Order);

module.exports = {
  sequelize,
  Client,
  Category,
  Administrator,
  Order,
  Product,
  PurchaseHistory,
};
