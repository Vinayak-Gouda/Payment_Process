import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
const API = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api/transactions';

function Badge({ status }) {
  const cls = status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${cls}`}>{status}</span>;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [amount, setAmount] = useState(10);
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [log, setLog] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      const res = await fetch(`${API}/balance?userId=${user.id}`);
      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      setLog(String(err));
    }
  };

  const call = async (path) => {
    setLoading(true);
    setLog('Waiting...');
    try {
      const res = await fetch(`${API}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, amount: Number(amount) })
      });
      const data = await res.json();
    //   setLog(data.error || JSON.stringify(data));
    setLog(data.error || `Transaction ${data.status}: $${data.transaction.amount}`);
    } catch (err) {
      setLog(String(err));
    } finally {
      setLoading(false);
      fetchBalance();
      fetchHistory();
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`${API}/history?userId=${user.id}`);
      const list = await res.json();
      setHistory(list);
    } catch (err) {
      setHistory([]);
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white p-4 shadow">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">💳 Payment Gateway</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.email}</span>
            <button onClick={logout} className="bg-indigo-700 hover:bg-indigo-800 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-gray-600 text-sm">Current Balance</div>
            <div className="text-4xl font-bold text-indigo-600">${balance.toFixed(2)}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-gray-600 text-sm">Quick Action</div>
            <div className="flex gap-2 mt-3">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => call('credit')}
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Credit
              </button>
              <button
                onClick={() => call('withdraw')}
                disabled={loading}
                className="flex-1 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="text-sm text-gray-600 mb-2">Last Response</div>
          <div className="p-3 bg-gray-50 rounded font-mono text-sm overflow-auto max-h-24">
            {log || 'No activity yet'}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction History</h2>
          <div className="space-y-3 max-h-96 overflow-auto">
            {history.length === 0 && <div className="text-gray-500">No transactions yet</div>}
            {history.map(t => (
              <div key={t.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <div className="text-sm text-gray-700">
                    {t.type} • <span className="font-medium">${t.amount}</span>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge status={t.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
