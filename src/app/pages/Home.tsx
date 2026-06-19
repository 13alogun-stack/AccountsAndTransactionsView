import { Link } from 'react-router';
import { ArrowUpRight, ChevronRight, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET } from '../data/sample';

const TODAY_PRIORITIES = [
  { label: 'Write one paragraph of the PCMB case study', urgency: 'high', project: 'Portfolio' },
  { label: 'Decide DX Studio homepage direction — baseline or wild', urgency: 'high', project: 'Studio' },
  { label: 'Follow up with Vercel — screening call', urgency: 'high', project: 'Opportunity' },
  { label: 'Document SHN provider portal decisions', urgency: 'medium', project: 'SHN · Loblaw' },
  { label: 'Figure out the monthly savings target', urgency: 'low', project: 'Finance' },
];

const DESIGN_NOTE = '"Good design isn\'t about the number of options — it\'s about reducing them to the essential one."';

const STATUS_COLORS: Record<string, string> = {
  active: '#2dce89',
  completed: '#50506a',
  paused: '#f4b942',
  idea: '#6366f1',
  needs_assets: '#f4b942',
  needs_writing: '#a855f7',
  portfolio_ready: '#2dce89',
  published: '#2dce89',
  archived: '#50506a',
};

export default function Home() {
  const { projects, opportunities, agentTasks, financeItems } = useApp();

  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const paidThisMonth = financeItems
    .filter(f => f.status === 'paid' && f.date.startsWith(ym))
    .reduce((sum, f) => sum + f.amount, 0);
  const progressPct = Math.min(100, Math.round((paidThisMonth / MONTHLY_TARGET) * 100));

  const activeProjects = projects.filter(p => p.status === 'active');
  const readinessScore = Math.round(
    projects.filter(p => p.featured || p.status === 'active').reduce((sum, p) => sum + p.portfolioReadiness, 0) /
    Math.max(1, projects.filter(p => p.featured || p.status === 'active').length)
  );

  const topOpps = opportunities
    .filter(o => ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status))
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 4);

  const recentTasks = agentTasks.filter(t => t.status !== 'archived').slice(0, 3);
  const highCount = TODAY_PRIORITIES.filter(p => p.urgency === 'high').length;

  const dayStr = now.toLocaleDateString('en-CA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        padding: '16px 20px 0',
        gap: 10,
      }}
    >
      {/* ── Top date bar ─────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--os-text-muted)', textTransform: 'uppercase' }}>
          {dayStr}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', color: 'var(--os-text-muted)' }}>
          {timeStr}
        </span>
      </div>

      {/* ── Main bento grid ───────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr 1fr',
          gridTemplateRows: 'auto auto auto',
          gap: 10,
          flex: 1,
        }}
      >
        {/* ── IBRA wordmark panel ─────────────────────────────── */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '1 / 3',
            background: 'var(--os-surface)',
            border: '1px solid var(--os-border)',
            borderRadius: 14,
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 16 }}>
              Creative OS
            </p>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 900,
                letterSpacing: '-0.06em',
                lineHeight: 0.88,
                color: 'var(--os-text-primary)',
                marginBottom: 0,
              }}
            >
              IBRA
            </h1>
            <p
              style={{
                fontSize: 13,
                fontStyle: 'italic',
                color: 'var(--os-orange)',
                marginTop: 8,
                letterSpacing: '-0.01em',
                lineHeight: 1.4,
              }}
            >
              Build brands.<br />Shape culture.
            </p>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 24 }}>
            <div style={{ marginBottom: 10 }}>
              {['Designer', 'Director', 'RGD'].map(tag => (
                <span
                  key={tag}
                  style={{
                    display: 'inline-block',
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: 'var(--os-text-muted)',
                    marginRight: 8,
                    marginBottom: 4,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 11, color: 'var(--os-text-muted)', lineHeight: 1.5 }}>
              Toronto · Loblaw Digital · Freelance
            </p>
          </div>
        </div>

        {/* ── Portfolio Score + Focus ─────────────────────────── */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '1',
            display: 'grid',
            gridTemplateColumns: '180px 1fr',
            gap: 10,
          }}
        >
          {/* Score circle */}
          <div
            style={{
              background: 'var(--os-surface)',
              border: '1px solid var(--os-border)',
              borderRadius: 14,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Portfolio Score
            </p>
            <ScoreCircle value={readinessScore} />
            <p style={{ fontSize: 11, color: 'var(--os-text-muted)', textAlign: 'center', lineHeight: 1.4 }}>
              {readinessScore >= 80 ? 'Portfolio-ready' : readinessScore >= 60 ? 'Getting there' : 'Needs work'}
            </p>
          </div>

          {/* System status quick stats */}
          <div
            style={{
              background: 'var(--os-surface)',
              border: '1px solid var(--os-border)',
              borderRadius: 14,
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)', marginBottom: 12 }}>
              System Status
            </p>
            {[
              { label: 'Active Projects', value: activeProjects.length, max: 10, color: 'var(--os-orange)' },
              { label: 'Pipeline', value: topOpps.length, max: 10, color: 'var(--os-green)' },
              { label: 'Income %', value: progressPct, max: 100, color: 'var(--os-gold)' },
              { label: 'Agent Queue', value: agentTasks.filter(t => t.status === 'review').length, max: 10, color: '#a855f7' },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: item.color, fontVariantNumeric: 'tabular-nums' }}>
                    {item.label === 'Income %' ? `${item.value}%` : item.value}
                  </span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(item.value / item.max) * 100}%`,
                      background: item.color,
                      borderRadius: 999,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Finance snapshot ────────────────────────────────── */}
        <Link to="/finance" style={{ textDecoration: 'none', gridColumn: '3', gridRow: '1' }}>
          <div
            style={{
              height: '100%',
              background: 'linear-gradient(145deg, #081a0f, #060f0a)',
              border: '1px solid rgba(45,206,137,0.2)',
              borderRadius: 14,
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-green)' }}>
                Finances · {now.toLocaleString('en-CA', { month: 'long' })}
              </p>
              <ArrowUpRight size={14} style={{ color: 'var(--os-green)', opacity: 0.6 }} />
            </div>
            <div>
              <p
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: '-0.05em',
                  lineHeight: 0.9,
                  color: '#fff',
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: 10,
                }}
              >
                ${(paidThisMonth / 1000).toFixed(1)}k
              </p>
              <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden', marginBottom: 8 }}>
                <div style={{ height: '100%', width: `${progressPct}%`, background: 'var(--os-green)', borderRadius: 999 }} />
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                {progressPct}% of ${MONTHLY_TARGET.toLocaleString()} target
              </p>
            </div>
          </div>
        </Link>

        {/* ── TODAY / FOCUS ────────────────────────────────────── */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '2',
            background: 'var(--os-surface)',
            border: '1px solid var(--os-border)',
            borderRadius: 14,
            padding: 20,
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Today / Focus
            </p>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.05em',
                padding: '2px 7px',
                borderRadius: 5,
                background: 'rgba(232,80,4,0.15)',
                color: 'var(--os-orange)',
              }}
            >
              {highCount} HIGH
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TODAY_PRIORITIES.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < TODAY_PRIORITIES.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color:
                      item.urgency === 'high' ? 'var(--os-orange)'
                      : item.urgency === 'medium' ? 'var(--os-yellow)'
                      : 'var(--os-text-muted)',
                    width: 20,
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--os-text-primary)', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 10, color: 'var(--os-text-muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {item.project}
                  </p>
                </div>
                {item.urgency === 'high' && (
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: 'rgba(232,80,4,0.15)',
                      color: 'var(--os-orange)',
                      letterSpacing: '0.05em',
                      flexShrink: 0,
                    }}
                  >
                    HIGH
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Pipeline ─────────────────────────────────────────── */}
        <div
          style={{
            gridColumn: '3',
            gridRow: '2',
            background: 'var(--os-surface)',
            border: '1px solid var(--os-border)',
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Pipeline
            </p>
            <Link to="/opportunities" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
              All <ChevronRight size={11} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {topOpps.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--os-text-muted)', textAlign: 'center', padding: '20px 0' }}>No active pipeline</p>
            ) : (
              topOpps.map(opp => (
                <Link key={opp.id} to="/opportunities" style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '9px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
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
                        fontWeight: 800,
                        color: 'var(--os-text-secondary)',
                        flexShrink: 0,
                      }}
                    >
                      {opp.company.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--os-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {opp.title}
                      </p>
                      <p style={{ fontSize: 10, color: 'var(--os-text-muted)', textTransform: 'capitalize' }}>
                        {opp.company} · {opp.status.replace('_', ' ')}
                      </p>
                    </div>
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: opp.fitScore >= 8 ? 'var(--os-green)' : 'var(--os-yellow)',
                        fontVariantNumeric: 'tabular-nums',
                        flexShrink: 0,
                      }}
                    >
                      {opp.fitScore}
                    </span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* ── Active Projects ──────────────────────────────────── */}
        <div
          style={{
            gridColumn: '1',
            gridRow: '3',
            background: 'var(--os-surface)',
            border: '1px solid var(--os-border)',
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Active Projects
            </p>
            <Link to="/projects" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
              All ({projects.length}) <ChevronRight size={11} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {activeProjects.slice(0, 4).map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ width: 3, height: 28, borderRadius: 2, background: proj.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--os-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {proj.title}
                    </p>
                    <p style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>{proj.client}</p>
                  </div>
                  <span
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: `${STATUS_COLORS[proj.status]}20`,
                      color: STATUS_COLORS[proj.status],
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                    }}
                  >
                    {proj.status.replace('_', ' ')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Design note / quote ──────────────────────────────── */}
        <div
          style={{
            gridColumn: '2',
            gridRow: '3',
            background: 'linear-gradient(145deg, #1a0f08, #0e0a08)',
            border: '1px solid rgba(232,80,4,0.2)',
            borderRadius: 14,
            padding: 22,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 12 }}>
            Design Note
          </p>
          <p
            style={{
              fontSize: 15,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.55,
              letterSpacing: '-0.01em',
              flex: 1,
            }}
          >
            {DESIGN_NOTE}
          </p>
          <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 14 }}>— Ibra, June 2026</p>
        </div>

        {/* ── Agent queue ──────────────────────────────────────── */}
        <div
          style={{
            gridColumn: '3',
            gridRow: '3',
            background: 'var(--os-surface)',
            border: '1px solid var(--os-border)',
            borderRadius: 14,
            padding: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
              Agent Queue
            </p>
            <Link to="/agents" style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
              All <ChevronRight size={11} />
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {recentTasks.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--os-text-muted)', textAlign: 'center', padding: '20px 0' }}>Queue clear</p>
            ) : (
              recentTasks.map(task => {
                const iconColors: Record<string, string> = {
                  queued: 'var(--os-text-muted)',
                  in_progress: 'var(--os-blue)',
                  review: 'var(--os-orange)',
                  completed: 'var(--os-green)',
                };
                const Icon = task.status === 'completed' ? CheckCircle2 : task.status === 'review' ? AlertCircle : Clock;
                return (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <Icon size={13} style={{ color: iconColors[task.status] || 'var(--os-text-muted)', marginTop: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--os-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: 10, color: 'var(--os-text-muted)', textTransform: 'capitalize' }}>
                        {task.agentType.replace('_', ' ')} · {task.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom status bar ─────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '8px 4px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          marginTop: 4,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--os-green)', display: 'inline-block' }} />
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--os-text-muted)' }}>
            Ibra OS V2
          </span>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>·</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--os-green)' }}>
          All Systems Operational
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.15)' }}>·</span>
        <span style={{ fontSize: 10, color: 'var(--os-text-muted)', fontVariantNumeric: 'tabular-nums' }}>
          {activeProjects.length} active · {topOpps.length} in pipeline · ${MONTHLY_TARGET.toLocaleString()} target
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>Data local · no sync</span>
        </div>
      </div>
    </div>
  );
}

// ── Score circle ──────────────────────────────────────────────────
function ScoreCircle({ value }: { value: number }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  const color = value >= 80 ? '#2dce89' : value >= 60 ? '#f4b942' : '#e84545';
  return (
    <svg width={96} height={96} viewBox="0 0 96 96">
      <circle cx={48} cy={48} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={6} />
      <circle
        cx={48}
        cy={48}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={6}
        strokeDasharray={`${filled} ${circ - filled}`}
        strokeLinecap="round"
        transform="rotate(-90 48 48)"
        style={{ transition: 'stroke-dasharray 0.8s ease' }}
      />
      <text
        x={48}
        y={48}
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: 22,
          fontWeight: 900,
          fill: '#fff',
          fontFamily: 'Inter, system-ui',
          letterSpacing: '-0.04em',
        }}
      >
        {value}
      </text>
    </svg>
  );
}
