import { Link } from 'react-router';
import { Zap, ChevronRight, ArrowUpRight } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET } from '../data/sample';

const TODAY_PRIORITIES = [
  { label: 'Adobe Express interview — finalize case studies and motion work', urgency: 'high', project: 'Opportunity' },
  { label: 'Adobe Motion System — write case study draft', urgency: 'high', project: 'Portfolio' },
  { label: 'PC Masterbrand — capture final deliverables', urgency: 'medium', project: 'Portfolio' },
  { label: 'AI-First workflow — document and make it presentable', urgency: 'medium', project: 'Interview Prep' },
  { label: 'Case study writing — first complete draft by Jul 1', urgency: 'high', project: 'Portfolio' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Still up';
}

function getLiveDate() {
  return new Date().toLocaleDateString('en-CA', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });
}

export default function Home() {
  const { projects, opportunities, agentTasks, financeItems } = useApp();

  const now = new Date();
  const currentYearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const activeOpps = opportunities.filter(o =>
    ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status)
  ).length;
  const pendingAgentTasks = agentTasks.filter(t => t.status === 'review').length;

  const paidThisMonth = financeItems
    .filter(f => f.status === 'paid' && f.date.startsWith(currentYearMonth))
    .reduce((sum, f) => sum + f.amount, 0);

  const progressPct = Math.min(100, Math.round((paidThisMonth / MONTHLY_TARGET) * 100));
  const highUrgency = TODAY_PRIORITIES.filter(p => p.urgency === 'high').length;

  const topOpps = opportunities
    .filter(o => ['interviewing', 'follow_up', 'reply'].includes(o.status) || o.fitScore >= 8)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);

  const adobeOpp = opportunities.find(o => o.id === 'o1');

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-start justify-between">
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--os-text-primary)', marginBottom: 4, lineHeight: 1.1 }}>
              {getGreeting()}, Ibra.
            </h1>
            <p style={{ fontSize: 13, color: 'var(--os-text-secondary)' }}>
              {getLiveDate()} &nbsp;·&nbsp; {highUrgency} things need your attention
            </p>
          </div>
          <button className="btn-gold" style={{ marginTop: 4 }}>
            <Zap size={13} />
            Quick Capture
          </button>
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Adobe Express Interview Hero */}
        {adobeOpp && (
          <Link to="/opportunities" style={{ textDecoration: 'none' }}>
            <div className="interview-hero">
              <div className="flex items-start justify-between">
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span style={{
                      fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: 'var(--os-orange)', background: 'rgba(232,80,4,0.15)',
                      padding: '3px 8px', borderRadius: 4,
                    }}>
                      Active Interview
                    </span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.1)',
                      padding: '3px 8px', borderRadius: 4, letterSpacing: '0.04em',
                    }}>
                      Fit Score 10/10
                    </span>
                  </div>
                  <p style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4, lineHeight: 1.2 }}>
                    Designer — Adobe Express
                  </p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
                    Adobe · Remote / San Jose · 2026
                  </p>
                  <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                    {adobeOpp.nextAction}
                  </p>
                </div>
                <ArrowUpRight size={18} style={{ color: 'var(--os-orange)', flexShrink: 0, marginTop: 2 }} />
              </div>
            </div>
          </Link>
        )}

        {/* Stat Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="grid-4col">
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ borderLeft: '2px solid #6366f1', paddingLeft: 16, cursor: 'pointer' }}>
              <p className="stat-label">Active Projects</p>
              <p className="stat-value" style={{ fontSize: 48, color: '#6366f1' }}>{activeProjects}</p>
              <p className="stat-sub">In progress</p>
            </div>
          </Link>

          <Link to="/opportunities" style={{ textDecoration: 'none' }}>
            <div className="stat-card-orange" style={{ cursor: 'pointer' }}>
              <p className="stat-label" style={{ color: 'var(--os-orange)' }}>Opportunities</p>
              <p className="stat-value" style={{ fontSize: 48, color: 'var(--os-orange-bright)' }}>{activeOpps}</p>
              <p className="stat-sub" style={{ color: 'rgba(255,255,255,0.4)' }}>1 active interview</p>
            </div>
          </Link>

          <Link to="/finance" style={{ textDecoration: 'none' }}>
            <div className="stat-card-green" style={{ cursor: 'pointer' }}>
              <p className="stat-label" style={{ color: 'var(--os-green)' }}>{now.toLocaleDateString('en-CA', { month: 'long' })} Income</p>
              <p className="stat-value" style={{ fontSize: paidThisMonth > 0 ? 36 : 48, color: 'var(--os-green)' }}>
                {paidThisMonth > 0 ? `$${paidThisMonth.toLocaleString()}` : '—'}
              </p>
              <div style={{ marginTop: 4 }}>
                <div style={{ height: 2, background: 'rgba(45,206,137,0.15)', borderRadius: 1 }}>
                  <div style={{ height: 2, background: 'var(--os-green)', borderRadius: 1, width: `${progressPct}%` }} />
                </div>
                <p className="stat-sub" style={{ marginTop: 4, color: 'rgba(255,255,255,0.35)' }}>{progressPct}% of ${MONTHLY_TARGET.toLocaleString()} goal</p>
              </div>
            </div>
          </Link>

          <Link to="/agents" style={{ textDecoration: 'none' }}>
            <div className="stat-card-gold" style={{ cursor: 'pointer' }}>
              <p className="stat-label" style={{ color: 'var(--os-gold)' }}>Agent Queue</p>
              <p className="stat-value" style={{ fontSize: 48, color: pendingAgentTasks > 0 ? 'var(--os-gold)' : 'var(--os-text-muted)' }}>
                {pendingAgentTasks}
              </p>
              <p className="stat-sub" style={{ color: 'rgba(255,255,255,0.35)' }}>{pendingAgentTasks > 0 ? 'tasks need review' : 'all clear'}</p>
            </div>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="grid-2col">
          {/* Today's Focus */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
                Today's Focus
              </h3>
              <span style={{ fontSize: 10, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {new Date().toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {TODAY_PRIORITIES.map((item, i) => (
                <div key={i} className="flex items-start gap-3" style={{ padding: '10px 0', borderBottom: i < TODAY_PRIORITIES.length - 1 ? '1px solid var(--os-border)' : 'none' }}>
                  <div style={{
                    width: 3, minWidth: 3, alignSelf: 'stretch', borderRadius: 2,
                    background: item.urgency === 'high' ? 'var(--os-red)' : item.urgency === 'medium' ? 'var(--os-orange)' : 'var(--os-text-muted)',
                    marginTop: 2,
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)', lineHeight: 1.4 }}>{item.label}</p>
                    <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginTop: 2 }}>{item.project}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Opportunities */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
                Active Opportunities
              </h3>
              <Link to="/opportunities" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {topOpps.map(opp => (
                <div key={opp.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--os-border)' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                    background: opp.id === 'o1' ? 'rgba(232,80,4,0.15)' : 'rgba(255,255,255,0.05)',
                    border: opp.id === 'o1' ? '1px solid rgba(232,80,4,0.3)' : '1px solid var(--os-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 700, color: opp.id === 'o1' ? 'var(--os-orange)' : 'var(--os-text-muted)',
                  }}>
                    {opp.fitScore}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)', lineHeight: 1.3 }} className="truncate">{opp.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 1 }}>{opp.company}</p>
                  </div>
                  <span style={{
                    fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
                    color: opp.status === 'interviewing' ? 'var(--os-orange)' : 'var(--os-text-muted)',
                    textTransform: 'capitalize',
                  }}>
                    {opp.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
