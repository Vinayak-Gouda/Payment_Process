import transactionService from '../services/transactionService.js';

const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await transactionService.signup(email, password);
    res.json({ success: true, user: { id: user.id, email: user.email, balance: user.balance } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  try {
    const user = await transactionService.login(email, password);
    res.json({ success: true, user: { id: user.id, email: user.email, balance: user.balance } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const credit = async (req, res) => {
  const { userId, amount } = req.body;
  if (typeof amount !== 'number' || !userId) return res.status(400).json({ error: 'userId and amount required' });
  try {
    const result = await transactionService.credit(userId, amount);
    res.json({ status: result.status, success: result.success, transaction: result.record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const withdraw = async (req, res) => {
  const { userId, amount } = req.body;
  if (typeof amount !== 'number' || !userId) return res.status(400).json({ error: 'userId and amount required' });
  try {
    const result = await transactionService.withdraw(userId, amount);
    res.json({ status: result.status, success: result.success, transaction: result.record });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const history = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  try {
    const list = await transactionService.history(userId);
    res.json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const balance = async (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.status(400).json({ error: 'userId required' });
  try {
    const bal = await transactionService.getBalance(userId);
    res.json({ balance: bal });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { signup, login, credit, withdraw, history, balance };
