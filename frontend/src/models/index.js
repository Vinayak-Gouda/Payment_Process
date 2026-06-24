import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:", { logging: false });

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    balance: { type: DataTypes.FLOAT, defaultValue: 0, allowNull: false },
  },
  { timestamps: true },
);

const Transaction = sequelize.define(
  "Transaction",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM("CREDIT", "DEBIT"), allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM("SUCCESS", "FAILED"), allowNull: false },
    meta: { type: DataTypes.JSON, allowNull: true },
  },
  { timestamps: true },
);

User.hasMany(Transaction, { foreignKey: "userId" });
Transaction.belongsTo(User, { foreignKey: "userId" });

export { sequelize, User, Transaction };
