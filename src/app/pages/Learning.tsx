import { useState } from 'react';
import { BookOpen, Target, Bot, Plus, ChevronRight, Flame } from 'lucide-react';
import { useApp } from '../store/AppContext';

const priorityColor: Record<string, string> = {
  high: 'var(--os-red)',
  medium: 'var(--os-yellow)',
  low: 'var(--os-text-muted)',
};

const levelDots = (current: number, target: number) =>
  Array.from({ length: 5 }, (_, i) => ({
    filled: i < current,
    target: i === target - 1,
  }));

const resourceTypeIcon: Record<string, string> = {
  video: '▶',
  course: '◈',
  article: '◦',
  book: '◻',
};

const CATEGORY_GROUPS = ['Technical Craft', 'AI & Tools', 'Leadership', 'Business', 'Communication'];

export default function Learning() {
  const { learningGoals } = useApp();
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeGroup === 'all'
      ? learningGoals
      : learningGoals.filter(g => g.category === activeGroup);

  const highPriority = learningGoals.filter(g => g.priority === 'high').length;
  const avgProgress = Math.round(learningGoals.reduce((s, g) => s + g.progress, 0) / learningGoals.length);

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--os-text-primary)' }}>
              Learning OS
            </h1>
            <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', marginTop: 3 }}>
              {learningGoals.length} goals &nbsp;·&nbsp; {highPriority} high priority &nbsp;·&nbsp; avg {avgProgress}% progress
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost">
              <Bot size={13} />
              Build learning plan
            </button>
            <button className="btn-gold">
              <Plus size={13} />
              Add goal
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 mt-4" style={{ overflowX: 'auto' }}>
          {['all', ...CATEGORY_GROUPS].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveGroup(cat)}
              style={{
                padding: '4px 12px',
                borderRadius: 20,
                border: '1px solid',
                borderColor: activeGroup === cat ? 'rgba(201,168,68,0.4)' : 'var(--os-border)',
                background: activeGroup === cat ? 'var(--os-gold-muted)' : 'transparent',
                color: activeGroup === cat ? 'var(--os-gold)' : 'var(--os-text-secondary)',
                fontSize: 12,
                fontWeight: activeGroup === cat ? 500 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                transition: 'all 0.15s',
              }}
            >
              {cat === 'all' ? 'All Goals' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(goal => {
          const isExpanded = expandedId === goal.id;
          const dots = levelDots(goal.currentLevel, goal.targetLevel);

          return (
            <div
              key={goal.id}
              className="os-card"
              style={{
                padding: 0,
                overflow: 'hidden',
                transition: 'border-color 0.15s',
                borderColor: isExpanded ? 'rgba(255,255,255,0.12)' : 'var(--os-border)',
              }}
            >
              {/* Main row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : goal.id)}
                style={{
                  padding: '16px 18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                }}
              >
                {/* Priority */}
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: priorityColor[goal.priority],
                    flexShrink: 0,
                  }}
                />

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <p style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--os-text-primary)', letterSpacing: '-0.01em' }}>
                      {goal.skill}
                    </p>
                    <span
                      style={{
                        fontSize: 9.5,
                        padding: '1px 6px',
                        borderRadius: 4,
                        background: 'rgba(255,255,255,0.06)',
                        color: 'var(--os-text-muted)',
                        fontWeight: 500,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {goal.category}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--os-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {goal.reason}
                  </p>
                </div>

                {/* Level dots */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  {dots.map((d, i) => (
                    <div
                      key={i}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: d.filled
                          ? 'var(--os-gold)'
                          : d.target
                          ? 'rgba(201,168,68,0.3)'
                          : 'rgba(255,255,255,0.08)',
                        border: d.target && !d.filled ? '1px solid rgba(201,168,68,0.4)' : 'none',
                      }}
                    />
                  ))}
                  <span style={{ fontSize: 10.5, color: 'var(--os-text-muted)', marginLeft: 4 }}>
                    L{goal.currentLevel}→{goal.targetLevel}
                  </span>
                </div>

                {/* Progress */}
                <div style={{ width: 80, flexShrink: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 10, color: 'var(--os-text-muted)' }}>Progress</span>
                    <span style={{ fontSize: 10, color: 'var(--os-text-secondary)' }}>{goal.progress}%</span>
                  </div>
                  <div className="os-progress">
                    <div
                      className="os-progress-fill"
                      style={{
                        width: `${goal.progress}%`,
                        background: goal.progress >= 70 ? 'var(--os-green)' : goal.progress >= 30 ? 'var(--os-gold)' : 'var(--os-red)',
                      }}
                    />
                  </div>
                </div>

                {/* Priority badge */}
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 7px',
                    borderRadius: 5,
                    background: `${priorityColor[goal.priority]}18`,
                    color: priorityColor[goal.priority],
                    flexShrink: 0,
                    letterSpacing: '0.02em',
                    textTransform: 'capitalize',
                  }}
                >
                  {goal.priority}
                </span>

                <ChevronRight
                  size={14}
                  style={{
                    color: 'var(--os-text-muted)',
                    flexShrink: 0,
                    transition: 'transform 0.15s',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                  }}
                />
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div
                  style={{
                    borderTop: '1px solid var(--os-border)',
                    padding: '16px 18px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 16,
                  }}
                >
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 8 }}>
                      Resources
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {goal.resources.map((r, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span style={{ fontSize: 10, color: 'var(--os-text-muted)', width: 12, textAlign: 'center', flexShrink: 0 }}>
                            {resourceTypeIcon[r.type]}
                          </span>
                          <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{r.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    {goal.projectToPractice && (
                      <div style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                          Practice On
                        </p>
                        <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{goal.projectToPractice}</p>
                      </div>
                    )}
                    {goal.deadline && (
                      <div style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                          Target Date
                        </p>
                        <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)' }}>{goal.deadline}</p>
                      </div>
                    )}
                    {goal.notes && (
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--os-text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>
                          Notes
                        </p>
                        <p style={{ fontSize: 12.5, color: 'var(--os-text-secondary)', lineHeight: 1.5 }}>{goal.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Agent */}
        <div
          className="os-card"
          style={{
            padding: '18px 20px',
            background: 'linear-gradient(135deg, rgba(99,102,241,0.04) 0%, var(--os-surface) 100%)',
            border: '1px solid rgba(99,102,241,0.12)',
          }}
        >
          <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--os-blue)', marginBottom: 12 }}>
            Learning Agent
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[
              'Build a 30-day learning plan',
              'What should I learn next?',
              'Turn notes into a playbook',
              'Suggest a practice project',
              'Track what I learned this week',
              'Find resources for a skill',
            ].map(action => (
              <button key={action} className="btn-ghost" style={{ justifyContent: 'flex-start', fontSize: 12 }}>
                <Bot size={12} style={{ flexShrink: 0 }} />
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
