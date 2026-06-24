import transactionRepository from '../repository/transactionRepository.js';

function randomSuccess() {
  return Math.random() < 0.7;
}

class TransactionService {
  async signup(email, password) {
    const existing = await transactionRepository.findUserByEmail(email);
    if (existing) throw new Error('Email already exists');
    return transactionRepository.createUser(email, password);
  }

  async login(email, password) {
    const user = await transactionRepository.findUserByEmail(email);
    if (!user || user.password !== password) throw new Error('Invalid email or password');
    return user;
  }

  async credit(userId, amount) {
    const user = await transactionRepository.getUser(userId);
    if (!user) throw new Error('User not found');
    
    const success = randomSuccess();
    const status = success ? 'SUCCESS' : 'FAILED';
    const record = await transactionRepository.create({ userId, type: 'CREDIT', amount, status });
    
    if (success) {
      await transactionRepository.updateUserBalance(userId, user.balance + amount);
    }
    
    return { success, status, record };
  }

  async withdraw(userId, amount) {
    const user = await transactionRepository.getUser(userId);
    if (!user) throw new Error('User not found');
    if (user.balance < amount) throw new Error('Insufficient balance');
    
    const success = randomSuccess();
    const status = success ? 'SUCCESS' : 'FAILED';
    const record = await transactionRepository.create({ userId, type: 'DEBIT', amount, status });
    
    if (success) {
      await transactionRepository.updateUserBalance(userId, user.balance - amount);
    }
    
    return { success, status, record };
  }

  async history(userId) {
    return transactionRepository.listByUser(userId);
  }

  async getBalance(userId) {
    const user = await transactionRepository.getUser(userId);
    if (!user) throw new Error('User not found');
    return user.balance;
  }
}

export default new TransactionService();
