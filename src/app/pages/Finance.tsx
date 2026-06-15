import { DollarSign, TrendingUp, AlertCircle, Clock, CheckCircle2, Plus } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET, RATE_FLOOR, RATE_TARGET } from '../data/sample';

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

export default function Finance() {
  const { financeItems } = useApp();

  const paid = financeItems.filter(f => f.status === 'paid' && f.type !== 'expense').reduce((s, f) => s + f.amount, 0);
  const pending = financeItems.filter(f => f.status === 'pending').reduce((s, f) => s + f.amount, 0);
  const expenses = financeItems.filter(f => f.type === 'expense' || f.type === 'subscription').reduce((s, f) => s + f.amount, 0);
  const totalExpected = paid + pending;
  const progressPct = Math.min(100, Math.round((paid / MONTHLY_TARGET) * 100));
  const netExpected = totalExpected - expenses;

  const invoices = financeItems.filter(f => f.type === 'invoice' || f.type === 'retainer');
  const subscriptions = financeItems.filter(f => f.type === 'subscription' || f.type === 'expense');

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
              June 2025 &nbsp;·&nbsp; Target: ${MONTHLY_TARGET.toLocaleString()}
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
      </div>
    </div>
  );
}
