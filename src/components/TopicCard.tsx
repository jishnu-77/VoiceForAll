import React from 'react';
import './TopicCard.css';

interface Topic {
  id: string;
  category: string;
  title: Record<string, string>;
  content: Record<string, string>;
  helpline?: string;
  website?: string;
  updatedAt: number;
}

interface Props {
  topic: Topic;
  onEdit: () => void;
  onDelete: () => void;
}

const CATEGORY_META: Record<string, { emoji: string; color: string }> = {
  farming: { emoji: '🌾', color: '#4CAF50' },
  health: { emoji: '🏥', color: '#2196F3' },
  government: { emoji: '🏛️', color: '#FF9800' },
  education: { emoji: '📚', color: '#9C27B0' },
};

const LANGS = ['en', 'hi', 'ml', 'mr', 'ta', 'te', 'bn'];

const LANG_LABELS: Record<string, string> = {
  en: 'EN',
  hi: 'HI',
  ml: 'ML',
  mr: 'MR',
  ta: 'TA',
  te: 'TE',
  bn: 'BN',
};

const TopicCard: React.FC<Props> = ({ topic, onEdit, onDelete }) => {

  const meta = CATEGORY_META[topic.category] || {
    emoji: '📌',
    color: '#888',
  };

  const titleEn = topic.title?.en || topic.id;

  const updatedDate = topic.updatedAt
    ? new Date(Number(topic.updatedAt)).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '—';

  const filledLangs = LANGS.filter(
    (l) => topic.title?.[l] && topic.content?.[l]
  );

  const filledSet = new Set(filledLangs);

  const categoryLabel =
    topic.category.charAt(0).toUpperCase() + topic.category.slice(1);

  return (
    <div className="topic-card">
      <div className="tc-header">

        <div
          className="tc-cat"
          style={{
            color: meta.color,
            background: `${meta.color}18`,
          }}
        >
          <span>{meta.emoji}</span>
          <span>{categoryLabel}</span>
        </div>

        <div className="tc-actions">
          <button
            className="tc-btn edit"
            onClick={onEdit}
            title="Edit"
          >
            ✏️
          </button>

          <button
            className="tc-btn delete"
            onClick={onDelete}
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="tc-title">{titleEn}</h3>

      <p className="tc-id">{topic.id}</p>

      {(topic.helpline || topic.website) && (
        <div className="tc-meta">

          {topic.helpline && (
            <span className="tc-tag">
              📞 {topic.helpline}
            </span>
          )}

          {topic.website && (
            <span className="tc-tag">
              🌐 Website
            </span>
          )}

        </div>
      )}

      <div className="tc-langs">

        {LANGS.map((l) => (
          <span
            key={l}
            className={`lang-badge ${
              filledSet.has(l) ? 'filled' : 'empty'
            }`}
            title={
              filledSet.has(l)
                ? `${l} content present`
                : `${l} missing`
            }
          >
            {LANG_LABELS[l]}
          </span>
        ))}

      </div>

      <p className="tc-updated">
        Updated {updatedDate}
      </p>
    </div>
  );
};

export default TopicCard;