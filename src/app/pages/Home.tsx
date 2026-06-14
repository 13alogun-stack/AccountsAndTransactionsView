import { Link } from 'react-router';
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET } from '../data/sample';

const TODAY_PRIORITIES = [
  { label: 'Send Northstar Capital proposal', urgency: 'high', project: 'Freelance' },
  { label: 'Follow up with Vercel — schedule screening call', urgency: 'high', project: 'Opportunity' },
  { label: 'Continue Carbon Fight case study', urgency: 'medium', project: 'Portfolio' },
  { label: 'Prepare TechFlow portfolio presentation', urgency: 'high', project: 'Opportunity' },
  { label: 'DX Studio homepage hero — start concepting', urgency: 'medium', project: 'Studio' },
];

const urgencyColor: Record<string, string> = {
  high: 'var(--os-red)',
  medium: 'var(--os-yellow)',
  low: 'var(--os-text-muted)',
};

export default function Home() {
  const { projects, opportunities, agentTasks, financeItems } = useApp();

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const activeOpps = opportunities.filter(o =>
    ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status)
  ).length;
  const pendingAgentTasks = agentTasks.filter(t => t.status === 'review').length;

  const paidThisMonth = financeItems
    .filter(f => f.status === 'paid' && f.date.startsWith('2025-06'))
    .reduce((sum, f) => sum + f.amount, 0);
  const pendingIncome = financeItems
    .filter(f => f.status === 'pending')
    .reduce((sum, f) => sum + f.amount, 0);

  const progressPct = Math.min(100, Math.round((paidThisMonth / MONTHLY_TARGET) * 100));

  const recentAgentTasks = agentTasks.filter(t => t.status !== 'archived').slice(0, 3);

  const topOpps = opportunities
    .filter(o => ['interviewing', 'follow_up', 'reply'].includes(o.status) || o.fitScore >= 8)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-start justify-between">
          <div>
            <h1
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: 'var(--os-text-primary)',
                marginBottom: 4,
              }}
            >
              Good morning, Ibra.
            </h1>
            <p style={{ fontSize: 13, color: 'var(--os-text-secondary)' }}>
              Saturday, 14 June 2025 &nbsp;·&nbsp; 3 things need your attention today
            </p>
          </div>
          <button className="btn-gold" style={{ marginTop: 4 }}>
            <Zap size={13} />
            Quick Capture
          </button>
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Stat Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <Link to="/projects" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer', transition: 'border-color 0.15s' }}>
              <p className="stat-label">Active Projects</p>
              <p className="stat-value">{activeProjects}</p>
              <p className="stat-sub">2 need next action</p>
            </div>
          </Link>
          <Link to="/opportunities" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <p className="stat-label">Opportunities</p>
              <p className="stat-value">{activeOpps}</p>
              <p className="stat-sub">1 interview pending</p>
            </div>
          </Link>
          <Link to="/finance" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <p className="stat-label">June Income</p>
              <p className="stat-value" style={{ color: 'var(--os-green)' }}>
                ${paidThisMonth.toLocaleString()}
              </p>
              <div style={{ marginTop: 4 }}>
                <div className="os-progress">
                  <div className="os-progress-fill" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="stat-sub" style={{ marginTop: 4 }}>
                  ${pendingIncome.toLocaleString()} pending · ${MONTHLY_TARGET.toLocaleString()} target
                </p>
              </div>
            </div>
          </Link>
          <Link to="/agents" style={{ textDecoration: 'none' }}>
            <div className="stat-card" style={{ cursor: 'pointer' }}>
              <p className="stat-label">Agent Queue</p>
              <p className="stat-value" style={{ color: pendingAgentTasks > 0 ? 'var(--os-gold)' : undefined }}>
                {pendingAgentTasks}
              </p>
              <p className="stat-sub">{pendingAgentTasks > 0 ? 'tasks need review' : 'all clear'}</p>
            </div>
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Today's Priorities */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--os-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Today's Focus
              </h3>
              <Calendar size={13} style={{ color: 'var(--os-text-muted)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {TODAY_PRIORITIES.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-2.5 rounded-lg"
                  style={{ transition: 'background 0.1s', cursor: 'pointer' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: urgencyColor[item.urgency],
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)', lineHeight: 1.4 }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginTop: 1 }}>
                      {item.project}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Opportunities */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--os-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Active Opportunities
              </h3>
              <Link to="/opportunities" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {topOpps.map(opp => (
                <div
                  key={opp.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg"
                  style={{ transition: 'background 0.1s', cursor: 'pointer' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: 'var(--os-surface-raised)',
                      border: '1px solid var(--os-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--os-text-secondary)',
                      flexShrink: 0,
                    }}
                  >
                    {opp.company.slice(0, 2).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {opp.title}
                    </p>
                    <p style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{opp.company}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: opp.fitScore >= 8 ? 'var(--os-green)' : 'var(--os-yellow)',
                      }}
                    >
                      {opp.fitScore}/10
                    </p>
                    <p style={{ fontSize: 10, color: 'var(--os-text-muted)', marginTop: 1 }}>
                      {opp.status.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Active Projects */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--os-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Active Projects
              </h3>
              <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {projects.filter(p => p.status === 'active').map(proj => (
                <Link
                  key={proj.id}
                  to={`/projects/${proj.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="flex items-center gap-3 p-2.5 rounded-lg"
                    style={{ transition: 'background 0.1s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: proj.color, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)' }}>{proj.title}</p>
                      <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 1 }}>{proj.nextAction || proj.client}</p>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <div className="os-progress" style={{ width: 48 }}>
                          <div className="os-progress-fill" style={{ width: `${proj.portfolioReadiness}%` }} />
                        </div>
                        <span style={{ fontSize: 10, color: 'var(--os-text-muted)', width: 28, textAlign: 'right' }}>
                          {proj.portfolioReadiness}%
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Agent Tasks */}
          <div className="os-card" style={{ padding: 20 }}>
            <div className="flex items-center justify-between mb-4">
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--os-text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                Agent Tasks
              </h3>
              <Link to="/agents" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentAgentTasks.map(task => {
                const statusColors: Record<string, string> = {
                  queued: 'var(--os-text-muted)',
                  in_progress: 'var(--os-blue)',
                  review: 'var(--os-gold)',
                  completed: 'var(--os-green)',
                };
                const StatusIcon = task.status === 'completed' ? CheckCircle2 : task.status === 'review' ? AlertCircle : Clock;
                return (
                  <Link key={task.id} to="/agents" style={{ textDecoration: 'none' }}>
                    <div
                      className="flex items-start gap-3 p-2.5 rounded-lg"
                      style={{ transition: 'background 0.1s' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.background = 'transparent')}
                    >
                      <StatusIcon
                        size={14}
                        style={{ color: statusColors[task.status], marginTop: 1, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12.5, color: 'var(--os-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {task.title}
                        </p>
                        <p style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginTop: 1, textTransform: 'capitalize' }}>
                          {task.agentType.replace('_', ' ')} · {task.status.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--os-border)' }}>
              <Link to="/agents">
                <button className="btn-ghost w-full" style={{ justifyContent: 'center' }}>
                  <Zap size={12} />
                  New Agent Task
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Financial snapshot */}
        <div
          className="os-card"
          style={{
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div>
            <p className="stat-label">June Target</p>
            <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
              ${MONTHLY_TARGET.toLocaleString()}
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>Progress</span>
              <span style={{ fontSize: 11, color: 'var(--os-text-secondary)' }}>{progressPct}%</span>
            </div>
            <div className="os-progress" style={{ height: 4 }}>
              <div className="os-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
          <div>
            <p className="stat-label">Confirmed</p>
            <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-green)' }}>
              ${paidThisMonth.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="stat-label">Pending</p>
            <p style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--os-yellow)' }}>
              ${pendingIncome.toLocaleString()}
            </p>
          </div>
          <Link to="/finance">
            <button className="btn-ghost">
              View Finance <ArrowRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
