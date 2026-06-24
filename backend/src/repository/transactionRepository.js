import { Transaction, User } from "../models/index.js";

class TransactionRepository {
  async create(data) {
    return Transaction.create(data);
  }

  async listByUser(userId) {
    return Transaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async getUser(userId) {
    return User.findByPk(userId);
  }

  async updateUserBalance(userId, newBalance) {
    return User.update({ balance: newBalance }, { where: { id: userId } });
  }

  async createUser(email, password) {
    return User.create({ email, password });
  }

  async findUserByEmail(email) {
    return User.findOne({ where: { email } });
  }
}

export default new TransactionRepository();
