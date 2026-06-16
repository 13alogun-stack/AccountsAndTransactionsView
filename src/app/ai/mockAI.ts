import type { Project, Opportunity, Reference, Memory, Document, Prompt } from '../types';

// ─── Mock AI generation layer ─────────────────────────────────────────────────
// Replace these functions with real Claude/OpenAI calls when API keys are wired up.
// Each function accepts structured context and returns formatted string output.

function delay(ms = 800): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}

export interface AIResult {
  output: string;
  sources: string[];
  suggestedNextActions: string[];
  confidence: number;
}

// ─── Project actions ──────────────────────────────────────────────────────────

export async function summarizeProject(project: Project): Promise<AIResult> {
  await delay();
  return {
    output: `**${project.title}** (${project.year}) — ${project.role} at ${project.client}\n\n${project.description}\n\n**Tools:** ${project.tools.join(', ')}\n**Portfolio readiness:** ${project.portfolioReadiness}%\n**Next action:** ${project.nextAction ?? 'None set'}`,
    sources: [project.id],
    suggestedNextActions: [
      'Generate case study from this summary',
      'Extract design language principles',
      'Create deck outline',
    ],
    confidence: 0.92,
  };
}

export async function generateCaseStudy(project: Project): Promise<AIResult> {
  await delay(1200);
  return {
    output: `# ${project.title} — Case Study

## Overview
${project.description}

## The Problem
${project.problem ?? `${project.client} needed a cohesive, scalable design solution for their ${project.industry} audience. Existing patterns were inconsistent and lacked visual hierarchy.`}

## My Role
As ${project.role}, I led the design direction across research, ideation, visual design, and production handoff.

## Process

### Discovery
- Audited existing design landscape across ${project.industry}
- Defined key user needs and business constraints
- Mapped opportunity areas within the product/brand surface

### Design Decisions
${project.designLanguageTags.map(t => `- Applied **${t.replace(/-/g, ' ')}** as a core design principle`).join('\n')}

### Solution
${project.solution ?? `Delivered a modular, scalable design system that addressed hierarchy, accessibility, and brand cohesion — built for long-term extension by the team.`}

## Outcome
${project.outcome ?? project.metrics ?? `Successfully shipped and adopted by the ${project.client} team. Improved consistency across product surfaces.`}

## Tools Used
${project.tools.join(' · ')}

---
*Portfolio readiness: ${project.portfolioReadiness}% — ${project.portfolioReadiness < 50 ? 'Missing assets and copy need attention' : project.portfolioReadiness < 80 ? 'Nearly there — needs final polish' : 'Ready to publish'}*`,
    sources: [project.id],
    suggestedNextActions: [
      'Save as document',
      'Convert to deck outline',
      'Generate Webflow CMS fields',
      'Create thumbnail direction',
    ],
    confidence: 0.85,
  };
}

export async function generateDeckOutline(project: Project): Promise<AIResult> {
  await delay();
  return {
    output: `# ${project.title} — Deck Outline

**Slide 1** · Cover
Title: "${project.title}"
Sub: ${project.role} · ${project.client} · ${project.year}

**Slide 2** · Context / The Brief
What was the challenge? Who was the audience?
${project.problem ?? 'Define the brief and constraints'}

**Slide 3** · Landscape Audit
What existed before? What were competitors doing?

**Slide 4** · Design Process
Research → Ideation → Direction → Execution

**Slide 5** · Key Design Decisions
${project.designLanguageTags.slice(0, 3).map((t, i) => `Decision ${i + 1}: ${t.replace(/-/g, ' ')}`).join('\n')}

**Slide 6** · The Solution
Hero visual + one-line positioning

**Slide 7** · Screens / Deliverables
Grid of key outputs — 3–6 hero frames

**Slide 8** · Outcome + Impact
${project.outcome ?? project.metrics ?? 'Results, reception, next phase'}

**Slide 9** · What I Learned
Reflection + design principle extracted

**Slide 10** · Next Steps
Where does this project go from here?`,
    sources: [project.id],
    suggestedNextActions: ['Save as deck document', 'Generate case study', 'Create Webflow prompt'],
    confidence: 0.88,
  };
}

export async function generateWebsitePrompt(project: Project): Promise<AIResult> {
  await delay();
  return {
    output: `# Webflow / Replit Prompt — ${project.title}

Build a single-page portfolio case study for "${project.title}".

**Design direction:**
- Palette: Based on ${project.color} as hero accent. Neutral dark or light base.
- Typography: Editorial. Large hero type. Clean body. Hierarchy matters.
- Layout: Full-width hero → narrow prose → wide visual grid → narrow closing section
- Style: ${project.designLanguageTags.join(', ')}

**Page sections:**
1. Hero — Full-width with project title, client, year, and one-line hook
2. Context — 2-column: brief on left, role/tools on right
3. Process — 3-step horizontal with icons or numbers
4. Key visuals — Full-width image or mockup showcase
5. Outcome — Metric callout + 2–3 bullet points
6. Footer CTA — "See more work" + contact link

**Copy tone:**
Confident, direct, specific. No buzzwords. No "I was responsible for." Show thinking, not just output.

**Tools:** Webflow, ${project.tools.join(', ')}`,
    sources: [project.id],
    suggestedNextActions: ['Save to prompt library', 'Create Replit version', 'Build asset checklist'],
    confidence: 0.9,
  };
}

export async function extractDesignLanguage(project: Project): Promise<AIResult> {
  await delay();
  return {
    output: `# Design Language Extracted — ${project.title}

**Visual principles observed:**
${project.designLanguageTags.map(t => `- ${t.replace(/-/g, ' ')}: Applied across key surfaces in this project`).join('\n')}

**Typography patterns:**
- Clear hierarchy with distinct size steps
- Purposeful weight contrast (bold headlines, light body)
- Functional over decorative type usage

**Layout patterns:**
- Modular, grid-anchored composition
- Breathing room as a design tool
- Strong visual anchors with clear entry points

**Colour approach:**
- ${project.color} as primary brand accent
- Restrained palette — 2–3 colours max
- Contrast-led accessibility decisions

**Craft notes:**
- Pixel-precise alignment
- Consistent spacing rhythm
- Strong QA mindset across all outputs

**Recommended tag additions:**
${project.designLanguageTags.map(t => `✓ ${t}`).join('\n')}

*Add these to your Design Language Memory to build pattern recognition over time.*`,
    sources: [project.id],
    suggestedNextActions: ['Update Design Language Memory', 'Save as memory', 'Apply to moodboard direction'],
    confidence: 0.82,
  };
}

export async function generateBaselineAndWild(project: Project): Promise<AIResult> {
  await delay(1000);
  return {
    output: `# Baseline + Wild — ${project.title}

---

## BASELINE
*Clean. Client-ready. Professional. Safe but strong.*

**Visual direction:**
Clean white or near-black canvas. ${project.color} used sparingly as an accent. Strong typographic hierarchy. Grid-aligned. Generous whitespace. Every element earns its place.

**Typography:**
Neutral sans-serif. Large display size for the hero stat or title. Tight tracking. High contrast between heading and body.

**Layout:**
Single-column narrative with pull-out callouts. Mobile-first. Scannable.

**Tone:**
Confident and clear. Shows expertise without over-explaining.

---

## WILD
*Ownable. Art-directed. Expressive. Creative-director-level.*

**Visual direction:**
Full-bleed colour field using ${project.color}. Oversized typography breaks the grid deliberately. Collage energy — type over image, image over type. Strong contrast. Unexpected composition.

**Typography:**
Display typeface with personality. Condensed or expanded weight for impact. Mixed sizing. Text as image.

**Layout:**
Asymmetric. Intentional tension between elements. Visual hierarchy through contrast, not just size. Unexpected entry point.

**Tone:**
Bold. Specific. Not trying to appeal to everyone — trying to land for the right person.

---

*Use Baseline for client pitches and safe portfolio entries. Use Wild for personal brand, creative director positioning, and standing-out moments.*`,
    sources: [project.id],
    suggestedNextActions: ['Save Baseline as document', 'Save Wild as document', 'Create moodboard from Wild direction'],
    confidence: 0.87,
  };
}

// ─── Opportunity actions ──────────────────────────────────────────────────────

export async function scoreOpportunityFit(opp: Opportunity, projects: Project[]): Promise<AIResult> {
  await delay();
  const score = opp.fitScore;
  const tier = score >= 8 ? 'strong' : score >= 6 ? 'moderate' : 'weak';
  return {
    output: `# Opportunity Fit Score — ${opp.title} at ${opp.company}

**Fit score: ${score}/10** (${tier} match)

**Role type:** ${opp.type} · ${opp.location} · ${opp.remote ? 'Remote eligible' : 'On-site'}

**Why this fits:**
- Your ${projects.slice(0, 2).map(p => p.title).join(' and ')} work is directly relevant
- ${opp.type === 'contract' || opp.type === 'freelance' ? 'Contract/freelance structure aligns with current income strategy' : 'Full-time stability could help hit monthly targets'}
- Excitement score: ${opp.excitementScore ?? score - 1}/10

**Rate check:**
${opp.rateOrSalary ? `Posted: ${opp.rateOrSalary}` : 'Rate not listed — worth asking early in the conversation'}
${opp.minRate ? `Your floor: $${opp.minRate}/hr | Target: $${opp.targetRate ?? opp.minRate + 20}/hr` : ''}

**Recommended portfolio pieces:**
${projects.slice(0, 3).map(p => `- ${p.title} (${p.portfolioReadiness}% ready)`).join('\n')}

**Suggested next action:** ${opp.nextAction ?? 'Draft outreach message'}`,
    sources: [opp.id],
    suggestedNextActions: ['Draft outreach', 'Suggest portfolio pieces', 'Create interview prep doc'],
    confidence: 0.8,
  };
}

export async function draftOutreach(opp: Opportunity, projects: Project[]): Promise<AIResult> {
  await delay();
  return {
    output: `Subject: ${opp.title} — Ibraheem Balogun, Senior Designer

Hi ${opp.contact ?? 'there'},

I came across the ${opp.title} role at ${opp.company} and it caught my attention immediately — the combination of ${opp.type === 'contract' ? 'contract flexibility' : 'product focus'} and what you're building is exactly what I'm looking for.

I'm a senior designer with 10+ years across product design, brand systems, and creative direction. Recent work I'd point you to:

- **${projects[0]?.title ?? 'PC Masterbrand'}** — ${projects[0]?.description?.slice(0, 100) ?? 'Modular web design system for a major retail brand'}...
- **${projects[1]?.title ?? 'SHN'}** — ${projects[1]?.description?.slice(0, 100) ?? 'Product design for a health platform'}...

${opp.rateOrSalary ? `On rate: I'm targeting ${opp.rateOrSalary} — that works for me.` : "Happy to discuss rate once we've connected."}

Would you be open to a 20-minute intro call this week?

Best,
Ibraheem (Ibra) Balogun
Portfolio: ibrabalogun.com
Toronto, ON`,
    sources: [opp.id, ...projects.slice(0, 2).map(p => p.id)],
    suggestedNextActions: ['Save as document', 'Schedule follow-up reminder', 'Add to opportunity notes'],
    confidence: 0.83,
  };
}

// ─── Finance actions ──────────────────────────────────────────────────────────

export async function suggestPricing(context: { projectType: string; scope: string; targetRate: number }): Promise<AIResult> {
  await delay();
  return {
    output: `# Pricing Guidance — ${context.projectType}

**Scope:** ${context.scope}

**Your target rate:** $${context.targetRate}/hr

**Suggested range:**
- Day rate (8h): $${context.targetRate * 8} – $${context.targetRate * 8 + 200}
- Project estimate (2 weeks): $${context.targetRate * 8 * 10} – $${context.targetRate * 8 * 12}
- Rush premium: +25% on top

**What to quote:**
For "${context.scope}", I'd open at the higher end. You have 10+ years and the client isn't just paying for time — they're paying for judgment. Don't anchor low.

**Red flag budget:**
Anything under $${context.targetRate * 0.75}/hr for a scoped project is worth walking away from unless there's strategic value.

**Invoice note:**
50% upfront, 50% on delivery. Net-15.`,
    sources: [],
    suggestedNextActions: ['Create estimate', 'Add to finance tracker', 'Generate invoice notes'],
    confidence: 0.78,
  };
}

// ─── Learning actions ─────────────────────────────────────────────────────────

export async function generateLearningPlan(skill: string, currentLevel: number, targetLevel: number): Promise<AIResult> {
  await delay();
  return {
    output: `# 30-Day Learning Plan — ${skill}

**Current level:** ${currentLevel}/10 → **Target:** ${targetLevel}/10

## Week 1 — Foundation
- Day 1–2: Survey the landscape. Read/watch 3 high-quality examples of ${skill} done well.
- Day 3–4: Deconstruct one example in detail. Document what makes it work.
- Day 5–7: First attempt. Apply the skill to a real project or practice brief.

## Week 2 — Depth
- Day 8–10: Identify one specific gap from Week 1 and focus on it.
- Day 11–13: Find a mentor example — a designer or creator who's excellent at this.
- Day 14: Document your learning. Write up 3 things you've learned so far.

## Week 3 — Application
- Day 15–18: Apply to a real piece of work. Make it real, not an exercise.
- Day 19–21: Get feedback — share with someone who knows this well.

## Week 4 — Output
- Day 22–25: Polish and refine. Raise the quality bar from Week 3.
- Day 26–28: Package the output for portfolio or reference.
- Day 29–30: Write a short retrospective. What do you know now that you didn't before?

## Recommended resources:
1. Start with the most respected practitioners in ${skill}
2. Find 3 YouTube/YouTube Studio videos that show process, not just output
3. Find one community or Slack group to share work in

**Measure success by:** Output quality, not time logged.`,
    sources: [],
    suggestedNextActions: ['Save as document', 'Set deadline', 'Create practice project'],
    confidence: 0.84,
  };
}

// ─── System-wide actions ──────────────────────────────────────────────────────

export async function createWeeklyReview(data: {
  projects: Project[];
  opportunities: Opportunity[];
  memories: Memory[];
}): Promise<AIResult> {
  await delay(1000);
  const now = new Date();
  return {
    output: `# Weekly Review — Week of ${now.toLocaleDateString('en-CA', { month: 'long', day: 'numeric', year: 'numeric' })}

## Projects
${data.projects.filter(p => p.status === 'active').map(p => `- **${p.title}** — ${p.nextAction ?? 'No action set'} (${p.portfolioReadiness}% portfolio ready)`).join('\n')}

## Opportunities
${data.opportunities.filter(o => ['applied', 'replied', 'interviewing', 'follow_up'].includes(o.status)).map(o => `- **${o.title} @ ${o.company}** — Status: ${o.status} | Next: ${o.nextAction ?? 'Follow up'}`).join('\n') || '- No active opportunities this week'}

## Finance
Track your KOHO transactions and confirm Insight Global payroll cleared.

## Learning
Check in on your active learning goals — what output did you actually create this week?

## Next week priorities:
1. ${data.projects[0]?.nextAction ?? 'Move your most active project forward'}
2. ${data.opportunities[0] ? `Follow up on ${data.opportunities[0].title}` : 'Add one new opportunity to the pipeline'}
3. Write something — even one paragraph of case study copy

## Reflection questions:
- What did you finish this week?
- What did you avoid that you know you need to do?
- What's the highest-leverage thing for next week?`,
    sources: [],
    suggestedNextActions: ['Save as document', 'Set next week priorities', 'Add to memory'],
    confidence: 0.88,
  };
}

export async function improvePrompt(prompt: Prompt): Promise<AIResult> {
  await delay();
  return {
    output: `# Improved Prompt — ${prompt.title}

**Original:**
${prompt.promptText}

---

**Improved version:**
${prompt.promptText}

**What was changed:**
- Added role framing: "You are a senior ${prompt.category === 'design_critique' ? 'design critic' : 'creative director'}..."
- Made the output format explicit — "Return as numbered list / markdown / structured sections"
- Added context injectors: [PROJECT_NAME], [DESIGN_LANGUAGE], [TARGET_AUDIENCE] as placeholders
- Added quality bar: "The output should feel like it came from a 10+ year design director, not a junior"
- Added negative constraint: "Do not be generic. Do not use design jargon without specifics."

**Claude-optimized version:**
You are a senior designer and creative director with 10+ years of experience across brand, product, and motion. ${prompt.promptText} Return output that is specific, actionable, and reflects professional creative judgment. Avoid generic advice.

**ChatGPT version:**
Act as a senior creative director. ${prompt.promptText} Be specific and opinionated. Show your reasoning.`,
    sources: [prompt.id],
    suggestedNextActions: ['Save improved version', 'Test with Claude', 'Add to prompt library'],
    confidence: 0.86,
  };
}

export async function answerQuestion(question: string, context: {
  projects: Project[];
  opportunities: Opportunity[];
  memories: Memory[];
}): Promise<AIResult> {
  await delay(600);
  const q = question.toLowerCase();

  if (q.includes('work on today') || q.includes('priority')) {
    return {
      output: `**What to work on today:**\n\n1. **${context.projects.find(p => p.status === 'active')?.nextAction ?? 'Move SHN work forward'}** — this is your highest-leverage active project\n2. **Write something** — even one paragraph of portfolio copy. Compound over time.\n3. **Check opportunities** — ${context.opportunities.filter(o => o.status === 'follow_up').length} need a follow-up\n\nFocus on output, not activity.`,
      sources: context.projects.slice(0, 2).map(p => p.id),
      suggestedNextActions: ['Open Projects', 'Open Opportunities', 'Start a document'],
      confidence: 0.85,
    };
  }

  if (q.includes('portfolio') || q.includes('case study') || q.includes('ready')) {
    const ready = [...context.projects].sort((a, b) => b.portfolioReadiness - a.portfolioReadiness);
    return {
      output: `**Portfolio readiness ranking:**\n\n${ready.map((p, i) => `${i + 1}. **${p.title}** — ${p.portfolioReadiness}% · ${p.nextAction ?? 'No action set'}`).join('\n')}\n\n**Focus on:** ${ready[0]?.title} first — it's closest to done.`,
      sources: ready.slice(0, 3).map(p => p.id),
      suggestedNextActions: ['Generate case study', 'Open Projects', 'Create deck outline'],
      confidence: 0.9,
    };
  }

  if (q.includes('charge') || q.includes('rate') || q.includes('price')) {
    return {
      output: `**Rate guidance:**\n\nYour floor is $65/hr. Your target is $75–85/hr for contract work.\n\nFor a senior designer in Toronto with your experience: $80–95/hr is defensible. Open at your target and don't anchor low.\n\nProject rates: 2-week engagements → $7,000–12,000 depending on scope and client size.\n\nDon't discount to win work you'll resent.`,
      sources: context.memories.filter(m => m.type === 'pricing').map(m => m.id),
      suggestedNextActions: ['Open Finance', 'Create estimate', 'Review rate goals'],
      confidence: 0.87,
    };
  }

  if (q.includes('follow up') || q.includes('opportunities')) {
    const followUps = context.opportunities.filter(o => ['follow_up', 'applied', 'replied'].includes(o.status));
    return {
      output: `**Opportunities needing attention (${followUps.length}):**\n\n${followUps.map(o => `- **${o.title} @ ${o.company}** — ${o.status} · ${o.nextAction ?? 'Follow up'}`).join('\n') || 'No active follow-ups right now.'}\n\nKeep the pipeline moving — one touchpoint per open opp per week.`,
      sources: followUps.map(o => o.id),
      suggestedNextActions: ['Open Opportunities', 'Draft follow-up', 'Add new opportunity'],
      confidence: 0.88,
    };
  }

  return {
    output: `**Re: "${question}"**\n\nI don't have enough context to answer this precisely yet. The more you add to your projects, memories, and design language profile, the better I can help.\n\n**What I can do:**\n- Summarize any project\n- Score opportunity fit\n- Generate case studies and decks\n- Create outreach drafts\n- Build learning plans\n- Run a weekly review\n\nTry asking: "What should I work on today?" or "Which projects are portfolio-ready?"`,
    sources: [],
    suggestedNextActions: ['Add a project', 'Update design language', 'Run weekly review'],
    confidence: 0.5,
  };
}
