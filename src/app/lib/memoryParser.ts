import type { MemoryType } from '../types';

export interface ParsedMemory {
  type: MemoryType;
  content: string;
  tags: string[];
  confidence: number;
  source: string;
}

// ─── Type inference ────────────────────────────────────────────────────────────
// Keyword → MemoryType heuristics. First match wins (ordered by specificity).
const TYPE_RULES: { type: MemoryType; keywords: RegExp }[] = [
  { type: 'pricing', keywords: /\b(price|pricing|rate|charge|\$\d|day rate|retainer|invoice|budget|quote|cost|hourly)\b/i },
  { type: 'design_language', keywords: /\b(design|typograph|layout|colou?r|grid|spacing|visual|aesthetic|brand|font|typeface|whitespace|composition|art direction)\b/i },
  { type: 'workflow', keywords: /\b(workflow|process|always|never|first i|my routine|i start by|step|then i|i use|tool for|shortcut)\b/i },
  { type: 'decision', keywords: /\b(decided|chose|went with|opted|the call was|we picked|i'll go with|final decision)\b/i },
  { type: 'lesson', keywords: /\b(learned|lesson|mistake|next time|realised|realized|takeaway|in hindsight|should have|don't|avoid)\b/i },
  { type: 'preference', keywords: /\b(prefer|i like|i hate|favou?rite|i'd rather|i tend to|i enjoy|my style)\b/i },
  { type: 'opportunity', keywords: /\b(client|opportunity|lead|interview|recruiter|job|role|gig|contract|prospect)\b/i },
  { type: 'finance', keywords: /\b(income|saving|expense|tax|salary|revenue|cash flow|payment)\b/i },
  { type: 'learning', keywords: /\b(learning|studying|course|skill|practice|tutorial|want to learn|getting better at)\b/i },
  { type: 'project', keywords: /\b(project|case study|portfolio|shipped|launched|built|deliverable)\b/i },
  { type: 'prompt', keywords: /\b(prompt|claude|chatgpt|gpt|ai model|llm|instruction|system message)\b/i },
];

function inferType(text: string): MemoryType {
  for (const rule of TYPE_RULES) {
    if (rule.keywords.test(text)) return rule.type;
  }
  return 'preference';
}

// ─── Tag extraction ─────────────────────────────────────────────────────────────
const TAG_HINTS = [
  'pricing', 'design', 'typography', 'layout', 'color', 'workflow', 'process',
  'client', 'portfolio', 'figma', 'webflow', 'claude', 'branding', 'web',
  'freelance', 'rate', 'case-study', 'outreach', 'proposal', 'motion', 'ai',
];

function extractTags(text: string): string[] {
  const lower = text.toLowerCase();
  const tags = TAG_HINTS.filter(t => lower.includes(t.replace('-', ' ')) || lower.includes(t));
  return Array.from(new Set(tags)).slice(0, 4);
}

// ─── Confidence heuristic ──────────────────────────────────────────────────────
// Definite language ("always", "never") → high. Hedged ("maybe", "I think") → lower.
function inferConfidence(text: string): number {
  const lower = text.toLowerCase();
  if (/\b(always|never|definitely|must|core|non-negotiable|the rule)\b/.test(lower)) return 95;
  if (/\b(maybe|sometimes|i think|probably|might|not sure|tend to)\b/.test(lower)) return 65;
  return 80;
}

// ─── Main parser ────────────────────────────────────────────────────────────────
// Splits pasted text into individual memory candidates. Handles:
//  • markdown bullets (-, *, •), numbered lists (1. 2.)
//  • markdown headers (## Section) become the source label for following lines
//  • blank-line-separated paragraphs as a fallback
export function parseMemories(raw: string, defaultSource = 'Imported'): ParsedMemory[] {
  const text = raw.trim();
  if (!text) return [];

  const lines = text.split('\n');
  const out: ParsedMemory[] = [];
  let currentSection = defaultSource;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    const joined = paragraphBuffer.join(' ').trim();
    paragraphBuffer = [];
    if (joined.length >= 8) {
      out.push(makeMemory(joined, currentSection));
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Blank line → paragraph break
    if (!line) {
      flushParagraph();
      continue;
    }

    // Markdown header → new section label
    const headerMatch = line.match(/^#{1,6}\s+(.*)/);
    if (headerMatch) {
      flushParagraph();
      currentSection = `${defaultSource} · ${headerMatch[1].replace(/[#:*]/g, '').trim()}`;
      continue;
    }

    // Bullet or numbered list item → each is its own memory
    const bulletMatch = line.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)/);
    if (bulletMatch) {
      flushParagraph();
      const content = bulletMatch[1].replace(/^\*\*(.+?)\*\*:?\s*/, '$1: ').trim();
      if (content.length >= 4) out.push(makeMemory(content, currentSection));
      continue;
    }

    // Otherwise accumulate into paragraph buffer
    paragraphBuffer.push(line);
  }
  flushParagraph();

  return out;
}

function makeMemory(content: string, source: string): ParsedMemory {
  // Strip trailing markdown / quote noise
  const clean = content.replace(/^["'>]+|["']+$/g, '').trim();
  return {
    content: clean,
    type: inferType(clean),
    tags: extractTags(clean),
    confidence: inferConfidence(clean),
    source,
  };
}
