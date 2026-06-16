import { useState, useRef } from 'react';
import { DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle2, Plus, Upload } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET, RATE_FLOOR, RATE_TARGET } from '../data/sample';

const monthlyData = [
  { month: 'Jan', confirmed: 4791, pending: 0 },
  { month: 'Feb', confirmed: 5040, pending: 0 },
  { month: 'Mar', confirmed: 5200, pending: 0 },
  { month: 'Apr', confirmed: 5413, pending: 1086 },
  { month: 'May', confirmed: 5399, pending: 0 },
  { month: 'Jun', confirmed: 2542, pending: 2542 },
];

const statusColors: Record<string, string> = {
  paid: 'var(--os-green)',
  pending: 'var(--os-yellow)',
  overdue: 'var(--os-red)',
  recurring: 'var(--os-blue)',
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  paid: CheckCircle2,
  pending: Clock,
  overdue: AlertCircle,
  recurring: TrendingUp,
};

const typeLabels: Record<string, string> = {
  invoice: 'Invoice',
  retainer: 'Retainer',
  subscription: 'Subscription',
  expense: 'Expense',
};

interface KOHOTransaction {
  date: string;
  transaction: string;
  loads: number;
  withdrawal: number;
  balance: number;
  category: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Income': '#2dce89',
  'Groceries': '#6366f1',
  'Eating & Drinking': '#c9a844',
  'Transport': '#60a5fa',
  'Subscriptions': '#a855f7',
  'Cannabis': '#14b8a6',
  'Phone / Internet': '#f59e0b',
  'Health': '#ec4899',
  'Savings': '#2dce89',
  'Transfer Out': '#6b6b8a',
  'Transfer In': '#2dce89',
  'Rewards': '#c9a844',
  'KOHO Cover': 'transparent',
  'Other': '#4b5563',
};

function categorizeTx(name: string): string {
  const n = name.toLowerCase();
  if (n.includes('insight global') || n === 'canada') return 'Income';
  if (n.startsWith('e-transfer from')) return 'Transfer In';
  if (n.startsWith('e-transfer to')) return 'Transfer Out';
  if (n.includes('cover funds') || n.includes('cover bundle')) return 'KOHO Cover';
  if (n.includes('cash back') || n.includes('koho save') || n.includes('roundups')) return 'Rewards';
  if (n.includes('vault')) return 'Savings';
  if (n.includes('lcbo') || n.includes('rao') || n.includes('church st') || n.includes('artful dodger') || n.includes('bishop') || n.includes('black camel') || n.includes('coffee') || n.includes('espresso') || n.includes('resto') || n.includes('restobar') || n.includes('pizza') || n.includes('five guys') || n.includes('mcdonald') || n.includes('a&w') || n.includes('bear steak') || n.includes('damiano') || n.includes('gatherings') || n.includes('kensington') || n.includes('jerk') || n.includes('wing street') || n.includes('nightclub') || n.includes('flamingo') || n.includes('rooster coffee') || n.includes('earth coffeehouse') || n.includes('good earth') || n.includes('rebel ')) return 'Eating & Drinking';
  if (n.includes('rabba') || n.includes('longo') || n.includes('hasty market') || n.includes('dollarama') || n.includes('shoppers drug') || n.includes('independent') || n.includes('loblaw') || n.includes('wellesley conv') || n.includes('gateway news')) return 'Groceries';
  if (n.includes('bolt') || n.includes('uber') || n.includes('presto') || n.includes('lyft')) return 'Transport';
  if (n.includes('claude') || n.includes('openai') || n.includes('chatgpt') || n.includes('spotify') || n.includes('dazn') || n.includes('paddle') || n.includes('mockuuu') || n.includes('paypal *cine') || n.includes('upg*payment')) return 'Subscriptions';
  if (n.includes('bell canada')) return 'Phone / Internet';
  if (n.includes('canna') || n.includes('tokyo smoke')) return 'Cannabis';
  if (n.includes('shoppers') || n.includes('massage') || n.includes('friendly stranger')) return 'Health';
  return 'Other';
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') { inQuotes = !inQuotes; }
    else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += char; }
  }
  result.push(current);
  return result;
}

function parseKOHOCSV(text: string): KOHOTransaction[] {
  const lines = text.trim().split('\n').slice(1);
  return lines
    .map(line => {
      const cols = parseCSVLine(line);
      const name = (cols[1] || '').trim();
      return {
        date: (cols[0] || '').split(' ')[0],
        transaction: name,
        loads: parseFloat(cols[2] || '0') || 0,
        withdrawal: parseFloat(cols[3] || '0') || 0,
        balance: parseFloat(cols[4] || '0') || 0,
        category: categorizeTx(name),
      };
    })
    .filter(t => t.date && t.date.startsWith('20') && t.transaction);
}

export default function Finance() {
  const { financeItems } = useApp();

  const [kohoTxs, setKohoTxs] = useState<KOHOTransaction[]>(() => {
    try {
      const s = localStorage.getItem('ibra-os-koho');
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  });
  const fileRef = useRef<HTMLInputElement>(null);

  function handleCSVImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      const parsed = parseKOHOCSV(text);
      // Merge with existing, dedup by date+transaction
      setKohoTxs(prev => {
        const existing = new Set(prev.map(t => `${t.date}|${t.transaction}|${t.withdrawal}|${t.loads}`));
        const newTxs = parsed.filter(t => !existing.has(`${t.date}|${t.transaction}|${t.withdrawal}|${t.loads}`));
        const merged = [...prev, ...newTxs].sort((a, b) => b.date.localeCompare(a.date));
        localStorage.setItem('ibra-os-koho', JSON.stringify(merged));
        return merged;
      });
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  const paid = financeItems.filter(f => f.status === 'paid' && f.type !== 'expense').reduce((s, f) => s + f.amount, 0);
  const pending = financeItems.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0);
  const expenses = financeItems.filter(f => f.type === 'expense' || f.type === 'subscription').reduce((s, f) => s + f.amount, 0);
  const totalExpected = paid + pending;
  const progressPct = Math.min(100, Math.round((paid / MONTHLY_TARGET) * 100));
  const netExpected = totalExpected - expenses;

  const invoices = financeItems.filter(f => f.type === 'invoice' || f.type === 'retainer');
  const subscriptions = financeItems.filter(f => f.type === 'subscription' || f.type === 'expense');

  // Compute spending breakdown from KOHO transactions
  const spendingByCategory = kohoTxs.reduce<Record<string, number>>((acc, t) => {
    if (t.withdrawal > 0 && t.category !== 'KOHO Cover' && t.category !== 'Transfer Out' && t.category !== 'Rewards') {
      acc[t.category] = (acc[t.category] || 0) + t.withdrawal;
    }
    return acc;
  }, {});

  const totalSpend = Object.values(spendingByCategory).reduce((a, b) => a + b, 0);
  const spendCategories = Object.entries(spendingByCategory)
    .sort((a, b) => b[1] - a[1])
    .filter(([, v]) => v > 0);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Finance + Pricing
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })} &nbsp;·&nbsp; Target: ${MONTHLY_TARGET.toLocaleString()}
            </p>
          </div>
          <button className="btn-gold">
            <Plus size={13} />
            Add item
          </button>
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <div className="stat-card">
            <p className="stat-label">Confirmed</p>
            <p className="stat-value" style={{ color: 'var(--os-green)' }}>${paid.toLocaleString()}</p>
            <p className="stat-sub">Paid & cleared</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Pending</p>
            <p className="stat-value" style={{ color: 'var(--os-yellow)' }}>${pending.toLocaleString()}</p>
            <p className="stat-sub">Awaiting payment</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Expenses</p>
            <p className="stat-value" style={{ color: 'var(--os-red)' }}>–${expenses.toLocaleString()}</p>
            <p className="stat-sub">Tools + subscriptions</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Net Expected</p>
            <p className="stat-value">${netExpected.toLocaleString()}</p>
            <p className="stat-sub">After expenses</p>
          </div>
        </div>

        {/* Income Overview Chart */}
        <div className="os-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', marginBottom: 16 }}>
            Income Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gradConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#c9a844" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#c9a844" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPending" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6b6b8a" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6b6b8a" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#6b6b8a', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b6b8a', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ background: '#111118', border: '1px solid #2a2a3a', borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: '#e8e8f0', fontWeight: 600, marginBottom: 4 }}
                itemStyle={{ color: '#e8e8f0' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Area type="monotone" dataKey="confirmed" name="Confirmed" stroke="#c9a844" strokeWidth={2} fill="url(#gradConfirmed)" />
              <Area type="monotone" dataKey="pending" name="Pending" stroke="#6b6b8a" strokeWidth={2} fill="url(#gradPending)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-2">
            <div className="flex items-center gap-2">
              <div style={{ width: 10, height: 2, background: '#c9a844', borderRadius: 1 }} />
              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div style={{ width: 10, height: 2, background: '#6b6b8a', borderRadius: 1 }} />
              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>Pending</span>
            </div>
          </div>
        </div>

        {/* Monthly target progress */}
        <div className="os-card" style={{ padding: 20 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
              June Target Progress
            </h3>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)' }}>
              {progressPct}%
            </span>
          </div>
          <div className="os-progress" style={{ height: 6, marginBottom: 10 }}>
            <div
              className="os-progress-fill"
              style={{
                width: `${progressPct}%`,
                background: progressPct >= 80 ? 'var(--os-green)' : progressPct >= 50 ? 'var(--os-gold)' : 'var(--os-red)',
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: 11.5, color: 'var(--os-text-muted)' }}>${paid.toLocaleString()} confirmed</span>
            <span style={{ fontSize: 11.5, color: 'var(--os-text-muted)' }}>Goal: ${MONTHLY_TARGET.toLocaleString()}</span>
          </div>
          {pending > 0 && (
            <div
              style={{
                marginTop: 12,
                padding: '10px 14px',
                background: 'var(--os-yellow-muted)',
                borderRadius: 8,
                border: '1px solid rgba(244,185,66,0.15)',
              }}
            >
              <p style={{ fontSize: 12, color: 'var(--os-yellow)' }}>
                +${pending.toLocaleString()} pending — if all collected, you'll reach ${(paid + pending).toLocaleString()} this month
              </p>
            </div>
          )}
        </div>

        {/* Rate Guidance */}
        <div className="os-card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em', marginBottom: 14 }}>
            Rate Guidance
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: 'var(--os-red-muted)',
                border: '1px solid rgba(232,69,69,0.15)',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-red)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Floor Rate</p>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--os-text-primary)' }}>${RATE_FLOOR}/hr</p>
              <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 2 }}>Do not go below this</p>
            </div>
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: 'var(--os-gold-muted)',
                border: '1px solid rgba(201,168,68,0.2)',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-gold)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Target Rate</p>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--os-text-primary)' }}>${RATE_TARGET}/hr</p>
              <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 2 }}>Aim for this on all new work</p>
            </div>
            <div
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: 'var(--os-green-muted)',
                border: '1px solid rgba(45,206,137,0.15)',
              }}
            >
              <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--os-green)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 6 }}>Min Project Budget</p>
              <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--os-text-primary)' }}>$10k</p>
              <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 2 }}>Minimum for new projects</p>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', marginBottom: 12 }}>
            Invoices & Retainers
          </h3>
          <div className="os-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--os-border)' }}>
                  {['Description', 'Client / Project', 'Amount', 'Status', 'Due Date'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoices.map((item, i) => {
                  const StatusIcon = statusIcons[item.status] || Clock;
                  return (
                    <tr
                      key={item.id}
                      style={{ borderBottom: i < invoices.length - 1 ? '1px solid var(--os-border)' : 'none' }}
                    >
                      <td style={{ padding: '12px 16px' }}>
                        <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)' }}>
                          {typeLabels[item.type]} — {item.notes || item.category || item.type}
                        </p>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12.5, color: 'var(--os-text-secondary)' }}>
                        {item.client || item.project || '—'}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: 'var(--os-text-primary)' }}>
                          ${item.amount.toLocaleString()}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div className="flex items-center gap-1.5">
                          <StatusIcon size={12} style={{ color: statusColors[item.status] }} />
                          <span style={{ fontSize: 12, color: statusColors[item.status], fontWeight: 500, textTransform: 'capitalize' }}>
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--os-text-muted)' }}>
                        {item.dueDate || '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Subscriptions & Expenses */}
        <div>
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', marginBottom: 12 }}>
            Tools & Expenses
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {subscriptions.map(item => (
              <div
                key={item.id}
                className="os-card"
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--os-text-primary)' }}>{item.notes}</p>
                  <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginTop: 2, textTransform: 'capitalize' }}>{item.status}</p>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: item.type === 'expense' ? 'var(--os-red)' : 'var(--os-text-secondary)',
                  }}
                >
                  –${item.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* KOHO Transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)' }}>
                KOHO Card — Transactions
              </h3>
              {kohoTxs.length > 0 && (
                <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 2 }}>
                  {kohoTxs.length} transactions loaded
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {kohoTxs.length > 0 && (
                <button
                  style={{ fontSize: 11, color: 'var(--os-text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '6px 8px' }}
                  onClick={() => { setKohoTxs([]); localStorage.removeItem('ibra-os-koho'); }}
                >
                  Clear
                </button>
              )}
              <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={handleCSVImport} />
              <button className="btn-gold" style={{ display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => fileRef.current?.click()}>
                <Upload size={12} />
                Import CSV
              </button>
            </div>
          </div>

          {kohoTxs.length === 0 ? (
            <div
              className="os-card"
              style={{ padding: '28px 20px', textAlign: 'center', borderStyle: 'dashed', cursor: 'pointer' }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload size={20} style={{ color: 'var(--os-text-muted)', margin: '0 auto 8px' }} />
              <p style={{ fontSize: 13, color: 'var(--os-text-secondary)', marginBottom: 4 }}>
                Drop your KOHO monthly CSV here
              </p>
              <p style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>
                KOHO app → Profile → Statements → Monthly Report → Download
              </p>
            </div>
          ) : (
            <>
              {/* Spending by category */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8, marginBottom: 16 }}>
                {spendCategories.map(([cat, amt]) => (
                  <div
                    key={cat}
                    className="os-card"
                    style={{ padding: '12px 14px' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[cat] || '#6b6b8a', flexShrink: 0 }} />
                      <p style={{ fontSize: 11, color: 'var(--os-text-muted)', fontWeight: 500 }}>{cat}</p>
                    </div>
                    <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
                      ${amt.toFixed(0)}
                    </p>
                    <div style={{ marginTop: 6, height: 2, background: 'var(--os-border)', borderRadius: 1 }}>
                      <div style={{ height: 2, background: CATEGORY_COLORS[cat] || '#6b6b8a', borderRadius: 1, width: `${Math.min(100, (amt / totalSpend) * 100 * 3)}%`, maxWidth: '100%' }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Transaction list */}
              <div className="os-card" style={{ overflow: 'hidden' }}>
                <div style={{ maxHeight: 360, overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, background: 'var(--os-card)', zIndex: 1 }}>
                      <tr style={{ borderBottom: '1px solid var(--os-border)' }}>
                        {['Date', 'Transaction', 'Category', 'Amount'].map(h => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {kohoTxs.slice(0, 100).map((tx, i) => (
                        <tr
                          key={i}
                          style={{ borderBottom: i < Math.min(100, kohoTxs.length) - 1 ? '1px solid var(--os-border)' : 'none' }}
                        >
                          <td style={{ padding: '9px 16px', fontSize: 11.5, color: 'var(--os-text-muted)', whiteSpace: 'nowrap' }}>
                            {tx.date}
                          </td>
                          <td style={{ padding: '9px 16px', fontSize: 12.5, color: 'var(--os-text-primary)', maxWidth: 240 }}>
                            {tx.transaction}
                          </td>
                          <td style={{ padding: '9px 16px' }}>
                            <div className="flex items-center gap-1.5">
                              <div style={{ width: 6, height: 6, borderRadius: '50%', background: CATEGORY_COLORS[tx.category] || '#6b6b8a', flexShrink: 0 }} />
                              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{tx.category}</span>
                            </div>
                          </td>
                          <td style={{ padding: '9px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                            {tx.loads > 0 && (
                              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-green)' }}>+${tx.loads.toFixed(2)}</span>
                            )}
                            {tx.withdrawal > 0 && (
                              <span style={{ fontSize: 13, fontWeight: 500, color: tx.category === 'KOHO Cover' ? 'var(--os-text-muted)' : 'var(--os-text-primary)' }}>–${tx.withdrawal.toFixed(2)}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {kohoTxs.length > 100 && (
                    <p style={{ textAlign: 'center', padding: '12px', fontSize: 11, color: 'var(--os-text-muted)' }}>
                      Showing 100 of {kohoTxs.length} transactions
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
