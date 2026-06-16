import { useState } from 'react';
import { FileText, Plus, Search, Download, Pencil, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../store/AppContext';
import type { Document, DocumentType, DocumentStatus } from '../types';

const TYPE_LABELS: Record<DocumentType, string> = {
  case_study: 'Case Study',
  deck_outline: 'Deck Outline',
  brief: 'Brief',
  proposal: 'Proposal',
  sow: 'Statement of Work',
  strategy: 'Strategy',
  prd: 'PRD',
  portfolio_copy: 'Portfolio Copy',
  outreach: 'Outreach',
  interview_prep: 'Interview Prep',
  learning_plan: 'Learning Plan',
  weekly_review: 'Weekly Review',
  prompt_pack: 'Prompt Pack',
  invoice_notes: 'Invoice Notes',
  brand_guidelines: 'Brand Guidelines',
  webflow_cms: 'Webflow CMS',
  standup: 'Standup',
  draft: 'Draft',
};

const STATUS_COLORS: Record<DocumentStatus, string> = {
  draft: 'rgba(255,255,255,0.15)',
  in_progress: 'rgba(232,80,4,0.2)',
  review: 'rgba(245,194,82,0.2)',
  final: 'rgba(45,206,137,0.2)',
  archived: 'rgba(255,255,255,0.06)',
};

const STATUS_TEXT: Record<DocumentStatus, string> = {
  draft: '#888',
  in_progress: '#E85004',
  review: '#f5c252',
  final: '#2dce89',
  archived: '#555',
};

const DOC_TYPES: DocumentType[] = [
  'case_study', 'deck_outline', 'brief', 'proposal', 'sow', 'strategy',
  'prd', 'portfolio_copy', 'outreach', 'interview_prep', 'learning_plan',
  'weekly_review', 'prompt_pack', 'invoice_notes', 'brand_guidelines',
  'webflow_cms', 'standup', 'draft',
];

interface EditorState {
  open: boolean;
  doc: Partial<Document> | null;
  isNew: boolean;
}

export default function Documents() {
  const { documents, addDocument, updateDocument, deleteDocument, projects, opportunities } = useApp();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<DocumentType | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<DocumentStatus | 'all'>('all');
  const [editor, setEditor] = useState<EditorState>({ open: false, doc: null, isNew: false });
  const [viewDoc, setViewDoc] = useState<Document | null>(null);

  const filtered = documents.filter(d => {
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.content.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === 'all' || d.type === filterType;
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchType && matchStatus;
  });

  const openNew = () => {
    setEditor({
      open: true,
      isNew: true,
      doc: { title: '', type: 'draft', status: 'draft', content: '', tags: [] },
    });
  };

  const openEdit = (doc: Document) => {
    setEditor({ open: true, isNew: false, doc: { ...doc } });
  };

  const saveEditor = () => {
    if (!editor.doc?.title?.trim()) return;
    if (editor.isNew) {
      addDocument(editor.doc as Omit<Document, 'id' | 'createdAt' | 'updatedAt'>);
    } else if (editor.doc?.id) {
      updateDocument(editor.doc.id, editor.doc);
    }
    setEditor({ open: false, doc: null, isNew: false });
  };

  const exportMarkdown = (doc: Document) => {
    const blob = new Blob([`# ${doc.title}\n\n${doc.content}`], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="os-page">
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="os-page-title">Documents</h1>
            <p className="os-page-subtitle">{documents.length} docs · {documents.filter(d => d.status === 'in_progress').length} in progress</p>
          </div>
          <button className="os-btn-primary" onClick={openNew}>
            <Plus size={14} /> New Document
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          <div className="os-search" style={{ minWidth: 220 }}>
            <Search size={13} style={{ color: 'var(--os-text-muted)', flexShrink: 0 }} />
            <input
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ background: 'none', border: 'none', outline: 'none', fontSize: 13, color: 'var(--os-text-primary)', flex: 1 }}
            />
          </div>
          <select
            value={filterType}
            onChange={e => setFilterType(e.target.value as DocumentType | 'all')}
            className="os-select"
          >
            <option value="all">All types</option>
            {DOC_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as DocumentStatus | 'all')}
            className="os-select"
          >
            <option value="all">All statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="final">Final</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Document grid */}
      {filtered.length === 0 ? (
        <div className="os-empty">
          <FileText size={28} style={{ color: 'var(--os-text-muted)', marginBottom: 12 }} />
          <p style={{ color: 'var(--os-text-muted)', fontSize: 14 }}>No documents yet</p>
          <p style={{ color: 'var(--os-text-muted)', fontSize: 12, marginTop: 4 }}>Create a case study, proposal, brief, or any creative output</p>
          <button className="os-btn-primary" style={{ marginTop: 16 }} onClick={openNew}>
            <Plus size={13} /> Create first document
          </button>
        </div>
      ) : (
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {filtered.map(doc => (
            <div
              key={doc.id}
              className="os-card"
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => setViewDoc(doc)}
            >
              {/* Type + status row */}
              <div className="flex items-center justify-between mb-3">
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--os-text-muted)',
                  }}
                >
                  {TYPE_LABELS[doc.type]}
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '2px 8px',
                    borderRadius: 999,
                    background: STATUS_COLORS[doc.status],
                    color: STATUS_TEXT[doc.status],
                    letterSpacing: '0.04em',
                  }}
                >
                  {doc.status.replace(/_/g, ' ')}
                </span>
              </div>

              <h3
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--os-text-primary)',
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {doc.title}
              </h3>

              <p
                style={{
                  fontSize: 12,
                  color: 'var(--os-text-muted)',
                  lineHeight: 1.6,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  marginBottom: 12,
                }}
              >
                {doc.content.replace(/^#+\s+.*/gm, '').replace(/\*\*/g, '').trim().slice(0, 120)}
              </p>

              {/* Tags */}
              {doc.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {doc.tags.slice(0, 3).map(t => (
                    <span key={t} className="os-tag">{t}</span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 4 }}>
                <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>
                  Updated {doc.updatedAt}
                </span>
                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                  <button
                    className="os-icon-btn"
                    onClick={() => exportMarkdown(doc)}
                    title="Export as Markdown"
                  >
                    <Download size={13} />
                  </button>
                  <button
                    className="os-icon-btn"
                    onClick={() => openEdit(doc)}
                    title="Edit"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    className="os-icon-btn os-icon-btn-danger"
                    onClick={() => deleteDocument(doc.id)}
                    title="Delete"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Document viewer */}
      {viewDoc && (
        <div className="os-modal-overlay" onClick={() => setViewDoc(null)}>
          <div
            className="os-modal os-modal-wide"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--os-text-muted)',
                  }}
                >
                  {TYPE_LABELS[viewDoc.type]}
                </span>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: 'var(--os-text-primary)',
                    marginTop: 4,
                  }}
                >
                  {viewDoc.title}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="os-btn-secondary"
                  onClick={() => { exportMarkdown(viewDoc); }}
                >
                  <Download size={13} /> Export MD
                </button>
                <button
                  className="os-btn-secondary"
                  onClick={() => { setViewDoc(null); openEdit(viewDoc); }}
                >
                  <Pencil size={13} /> Edit
                </button>
                <button className="os-icon-btn" onClick={() => setViewDoc(null)}>
                  <X size={16} />
                </button>
              </div>
            </div>

            <div
              className="os-doc-content"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: 13,
                lineHeight: 1.8,
                color: 'var(--os-text-secondary)',
                whiteSpace: 'pre-wrap',
                maxHeight: '60vh',
                overflowY: 'auto',
                padding: '16px 20px',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {viewDoc.content}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: STATUS_COLORS[viewDoc.status],
                  color: STATUS_TEXT[viewDoc.status],
                }}
              >
                {viewDoc.status.replace(/_/g, ' ')}
              </span>
              <span style={{ fontSize: 11, color: 'var(--os-text-muted)' }}>
                Updated {viewDoc.updatedAt}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Editor modal */}
      {editor.open && editor.doc && (
        <div className="os-modal-overlay" onClick={() => setEditor({ open: false, doc: null, isNew: false })}>
          <div
            className="os-modal os-modal-wide"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 600,
                  letterSpacing: '-0.02em',
                  color: 'var(--os-text-primary)',
                }}
              >
                {editor.isNew ? 'New Document' : 'Edit Document'}
              </h2>
              <button className="os-icon-btn" onClick={() => setEditor({ open: false, doc: null, isNew: false })}>
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input
                placeholder="Document title..."
                value={editor.doc.title ?? ''}
                onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, title: e.target.value } }))}
                className="os-input"
              />

              <div className="flex gap-2">
                <select
                  value={editor.doc.type ?? 'draft'}
                  onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, type: e.target.value as DocumentType } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  {DOC_TYPES.map(t => <option key={t} value={t}>{TYPE_LABELS[t]}</option>)}
                </select>
                <select
                  value={editor.doc.status ?? 'draft'}
                  onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, status: e.target.value as DocumentStatus } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  <option value="draft">Draft</option>
                  <option value="in_progress">In Progress</option>
                  <option value="review">Review</option>
                  <option value="final">Final</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex gap-2">
                <select
                  value={editor.doc.relatedProject ?? ''}
                  onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, relatedProject: e.target.value || undefined } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  <option value="">No related project</option>
                  {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
                <select
                  value={editor.doc.relatedOpportunity ?? ''}
                  onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, relatedOpportunity: e.target.value || undefined } }))}
                  className="os-select"
                  style={{ flex: 1 }}
                >
                  <option value="">No related opportunity</option>
                  {opportunities.map(o => <option key={o.id} value={o.id}>{o.title} @ {o.company}</option>)}
                </select>
              </div>

              <textarea
                placeholder="Document content (supports Markdown)..."
                value={editor.doc.content ?? ''}
                onChange={e => setEditor(s => ({ ...s, doc: { ...s.doc!, content: e.target.value } }))}
                className="os-textarea"
                rows={14}
              />

              <input
                placeholder="Tags (comma-separated)"
                value={(editor.doc.tags ?? []).join(', ')}
                onChange={e => setEditor(s => ({
                  ...s,
                  doc: { ...s.doc!, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) },
                }))}
                className="os-input"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="os-btn-secondary"
                onClick={() => setEditor({ open: false, doc: null, isNew: false })}
              >
                Cancel
              </button>
              <button className="os-btn-primary" onClick={saveEditor}>
                <Check size={13} /> {editor.isNew ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
