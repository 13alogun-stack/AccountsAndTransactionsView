import { Link } from 'react-router';
import {
  ArrowUpRight,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useApp } from '../store/AppContext';
import { MONTHLY_TARGET } from '../data/sample';

const TODAY_PRIORITIES = [
  { label: 'Write one paragraph of the PCMB case study', urgency: 'high', project: 'Portfolio' },
  { label: 'Decide DX Studio homepage direction — baseline or wild', urgency: 'high', project: 'Studio' },
  { label: 'Follow up with Vercel — screening call', urgency: 'high', project: 'Opportunity' },
  { label: 'Document SHN provider portal decisions', urgency: 'medium', project: 'SHN · Loblaw' },
  { label: 'Figure out the monthly savings target', urgency: 'medium', project: 'Finance' },
];

const urgencyColor: Record<string, string> = {
  high: 'var(--os-orange)',
  medium: 'var(--os-yellow)',
  low: 'var(--os-text-muted)',
};

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

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const activeOpps = opportunities.filter(o =>
    ['applied', 'replied', 'interviewing', 'follow_up', 'proposal'].includes(o.status)
  ).length;
  const pendingAgentTasks = agentTasks.filter(t => ['review', 'in_progress'].includes(t.status)).length;

  const now = new Date();
  const ym = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const paidThisMonth = financeItems
    .filter(f => f.status === 'paid' && f.date.startsWith(ym))
    .reduce((sum, f) => sum + f.amount, 0);

  const progressPct = Math.min(100, Math.round((paidThisMonth / MONTHLY_TARGET) * 100));

  const highPriorityCount = TODAY_PRIORITIES.filter(p => p.urgency === 'high').length;
  const recentAgentTasks = agentTasks.filter(t => t.status !== 'archived').slice(0, 4);

  const topOpps = opportunities
    .filter(o => ['interviewing', 'follow_up', 'replied', 'proposal'].includes(o.status) || o.fitScore >= 8)
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 4);

  const interview = opportunities.find(o => o.status === 'interviewing');

  return (
    <div className="os-page" style={{ maxWidth: 1240 }}>
      {/* ── Editorial hero header ───────────────────────────────── */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--os-orange)',
            marginBottom: 10,
          }}
        >
          {getLiveDate()}
        </p>
        <h1
          style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 0.98,
            color: 'var(--os-text-primary)',
            marginBottom: 14,
          }}
        >
          {getGreeting()}, Ibra.
        </h1>
        <p style={{ fontSize: 15, color: 'var(--os-text-secondary)', maxWidth: 520, lineHeight: 1.5 }}>
          {highPriorityCount > 0
            ? <>You've got <span style={{ color: 'var(--os-orange)', fontWeight: 600 }}>{highPriorityCount} high-priority moves</span> today. Pick one and start.</>
            : 'Nothing urgent. Good time to write a case study.'}
        </p>
      </div>

      {/* ── Big color-block stats ───────────────────────────────── */}
      <div className="grid-4col" style={{ marginBottom: 28 }}>
        <Link to="/projects" style={{ textDecoration: 'none' }}>
          <BlockStat
            bg="linear-gradient(145deg, #E85004, #c0410a)"
            fg="#fff"
            label="Active Projects"
            value={activeProjects}
            sub="in motion"
          />
        </Link>
        <Link to="/opportunities" style={{ textDecoration: 'none' }}>
          <BlockStat
            bg="var(--os-surface)"
            fg="var(--os-text-primary)"
            border
            label="Opportunities"
            value={activeOpps}
            sub={activeOpps > 0 ? 'in play' : 'add your next move'}
            accent="var(--os-green)"
          />
        </Link>
        <Link to="/finance" style={{ textDecoration: 'none' }}>
          <BlockStat
            bg="var(--os-surface)"
            fg="var(--os-text-primary)"
            border
            label={`${now.toLocaleString('en-CA', { month: 'long' })} Income`}
            value={`$${(paidThisMonth / 1000).toFixed(1)}k`}
            sub={`${progressPct}% of target`}
            accent="var(--os-gold)"
            progress={progressPct}
          />
        </Link>
        <Link to="/agents" style={{ textDecoration: 'none' }}>
          <BlockStat
            bg="var(--os-surface)"
            fg="var(--os-text-primary)"
            border
            label="Agent Queue"
            value={pendingAgentTasks}
            sub={pendingAgentTasks > 0 ? 'need review' : 'all clear'}
            accent="#a855f7"
          />
        </Link>
      </div>

      {/* ── Interview hero (only if active) ─────────────────────── */}
      {interview && (
        <Link to="/opportunities" style={{ textDecoration: 'none' }}>
          <div
            className="interview-hero"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #1a0f08, #0e0a08)',
              border: '1px solid rgba(232,80,4,0.3)',
              borderRadius: 16,
              padding: 28,
              marginBottom: 28,
            }}
          >
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-orange)', marginBottom: 8 }}>
              ● Active Interview
            </p>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', color: '#fff', marginBottom: 4 }}>
              {interview.title}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              {interview.company} · Fit {interview.fitScore}/10 · {interview.nextAction}
            </p>
          </div>
        </Link>
      )}

      {/* ── Two-column body ─────────────────────────────────────── */}
      <div className="grid-2col" style={{ marginBottom: 28 }}>
        {/* Today's Focus — editorial list */}
        <Panel title="Today's Focus" count={`${highPriorityCount} urgent`}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {TODAY_PRIORITIES.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 16,
                  padding: '14px 0',
                  borderBottom: i < TODAY_PRIORITIES.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  cursor: 'pointer',
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 800,
                    color: urgencyColor[item.urgency],
                    width: 22,
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--os-text-primary)', lineHeight: 1.4, letterSpacing: '-0.01em' }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {item.project}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Active Opportunities */}
        <Panel title="Pipeline" link="/opportunities">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {topOpps.map(opp => (
              <div
                key={opp.id}
                className="flex items-center gap-3"
                style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: 'var(--os-surface-raised)',
                    border: '1px solid var(--os-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    fontWeight: 800,
                    color: 'var(--os-text-secondary)',
                    flexShrink: 0,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {opp.company.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--os-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {opp.title}
                  </p>
                  <p style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>{opp.company} · {opp.status.replace('_', ' ')}</p>
                </div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: opp.fitScore >= 8 ? 'var(--os-green)' : 'var(--os-yellow)',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {opp.fitScore}
                  <span style={{ fontSize: 11, color: 'var(--os-text-muted)', fontWeight: 500 }}>/10</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Projects + Agents ───────────────────────────────────── */}
      <div className="grid-2col" style={{ marginBottom: 28 }}>
        <Panel title="Active Projects" link="/projects">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {projects.filter(p => p.status === 'active').map(proj => (
              <Link key={proj.id} to={`/projects/${proj.id}`} style={{ textDecoration: 'none' }}>
                <div className="flex items-center gap-3" style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: 4, height: 36, borderRadius: 2, background: proj.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--os-text-primary)' }}>{proj.title}</p>
                    <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 240 }}>
                      {proj.nextAction || proj.client}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--os-text-primary)', fontVariantNumeric: 'tabular-nums' }}>
                      {proj.portfolioReadiness}
                      <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>%</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel title="Agent Tasks" link="/agents">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recentAgentTasks.map(task => {
              const statusColors: Record<string, string> = {
                queued: 'var(--os-text-muted)',
                in_progress: 'var(--os-blue)',
                review: 'var(--os-orange)',
                completed: 'var(--os-green)',
              };
              const StatusIcon = task.status === 'completed' ? CheckCircle2 : task.status === 'review' ? AlertCircle : Clock;
              return (
                <Link key={task.id} to="/agents" style={{ textDecoration: 'none' }}>
                  <div className="flex items-start gap-3" style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <StatusIcon size={15} style={{ color: statusColors[task.status] || 'var(--os-text-muted)', marginTop: 2, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--os-text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--os-text-muted)', marginTop: 1, textTransform: 'capitalize' }}>
                        {task.agentType.replace('_', ' ')} · {task.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Panel>
      </div>

      {/* ── Finance band — full-bleed editorial ─────────────────── */}
      <Link to="/finance" style={{ textDecoration: 'none' }}>
        <div
          style={{
            background: 'linear-gradient(145deg, #081a0f, #060f0a)',
            border: '1px solid rgba(45,206,137,0.25)',
            borderRadius: 16,
            padding: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--os-green)', marginBottom: 10 }}>
              {now.toLocaleString('en-CA', { month: 'long', year: 'numeric' })} · Income
            </p>
            <p className="hero-number" style={{ color: '#fff' }}>
              ${paidThisMonth.toLocaleString()}
            </p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
              {progressPct}% of ${MONTHLY_TARGET.toLocaleString()} monthly target
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--os-green)', fontSize: 14, fontWeight: 600 }}>
            View Finance <ArrowUpRight size={18} />
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── Big color-block stat ───────────────────────────────────────
function BlockStat({
  bg, fg, label, value, sub, accent, border, progress,
}: {
  bg: string;
  fg: string;
  label: string;
  value: number | string;
  sub: string;
  accent?: string;
  border?: boolean;
  progress?: number;
}) {
  return (
    <div
      style={{
        background: bg,
        border: border ? '1px solid var(--os-border)' : 'none',
        borderRadius: 16,
        padding: 22,
        minHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="flex items-start justify-between">
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: accent ?? 'rgba(255,255,255,0.65)' }}>
          {label}
        </p>
        <ArrowUpRight size={15} style={{ color: accent ?? 'rgba(255,255,255,0.5)', opacity: 0.6 }} />
      </div>
      <div>
        <p
          style={{
            fontSize: 52,
            fontWeight: 800,
            letterSpacing: '-0.05em',
            lineHeight: 0.9,
            color: fg,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </p>
        {progress !== undefined && (
          <div style={{ height: 3, background: 'rgba(255,255,255,0.12)', borderRadius: 999, marginTop: 10, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: accent ?? '#fff', borderRadius: 999 }} />
          </div>
        )}
        <p style={{ fontSize: 12, color: accent ? 'var(--os-text-muted)' : 'rgba(255,255,255,0.55)', marginTop: progress !== undefined ? 8 : 6 }}>
          {sub}
        </p>
      </div>
    </div>
  );
}

// ── Panel wrapper ──────────────────────────────────────────────
function Panel({ title, link, count, children }: { title: string; link?: string; count?: string; children: React.ReactNode }) {
  return (
    <div className="os-card" style={{ padding: 22 }}>
      <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--os-text-primary)' }}>
          {title}
        </h3>
        {count && (
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-orange)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {count}
          </span>
        )}
        {link && (
          <Link to={link} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--os-text-muted)', textDecoration: 'none' }}>
            All <ChevronRight size={12} />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
