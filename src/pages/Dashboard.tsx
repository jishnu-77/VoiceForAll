import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import TopicCard from '../components/TopicCard';
import './Dashboard.css';

const CATEGORIES = ['farming', 'health', 'government', 'education'];

const CATEGORY_META: Record<string, { label: string; emoji: string; color: string }> = {
  farming:    { label: 'Farming',    emoji: '🌾', color: '#4CAF50' },
  health:     { label: 'Health',     emoji: '🏥', color: '#2196F3' },
  government: { label: 'Government', emoji: '🏛️', color: '#FF9800' },
  education:  { label: 'Education',  emoji: '📚', color: '#9C27B0' },
};

interface Topic {
  id: string;
  category: string;
  title: Record<string, string>;
  content: Record<string, string>;
  helpline?: string;
  website?: string;
  updatedAt: number;
}

const Dashboard: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'topics'));
      const data: Topic[] = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<Topic, 'id'>),
      }));
      setTopics(data);
    } catch (err) {
      console.error('Failed to fetch topics', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTopics(); }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, 'topics', deleteTarget));
      setTopics(prev => prev.filter(t => t.id !== deleteTarget));
      setDeleteTarget(null);
    } catch (err) {
      console.error('Delete failed', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = async () => { await signOut(auth); };

  const filtered =
    activeCategory === 'all'
      ? topics
      : topics.filter(t => t.category === activeCategory);

  const grouped = CATEGORIES.reduce<Record<string, Topic[]>>((acc, cat) => {
    acc[cat] = topics.filter(t => t.category === cat);
    return acc;
  }, {});

  return (
    <div className="dash-root">
      <aside className="dash-sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="14" fill="#FF6B35" opacity="0.15" />
              <circle cx="14" cy="14" r="5" fill="#FF6B35" />
              <path d="M14 9 L14 5" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span>VoiceForAll</span>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span className="nav-emoji">📋</span>
            <span>All Topics</span>
            <span className="nav-count">{topics.length}</span>
          </button>

          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`nav-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="nav-emoji">{CATEGORY_META[cat].emoji}</span>
              <span>{CATEGORY_META[cat].label}</span>
              <span className="nav-count">{grouped[cat]?.length || 0}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="add-btn" onClick={() => navigate('/topic/new')}>
            <span>+</span> Add Topic
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      <main className="dash-main">
        <header className="dash-header">
          <div>
            <h1 className="dash-title">
              {activeCategory === 'all'
                ? 'All Topics'
                : CATEGORY_META[activeCategory]?.label}
            </h1>
            <p className="dash-sub">
              {filtered.length} topic{filtered.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="header-add-btn" onClick={() => navigate('/topic/new')}>
            + New Topic
          </button>
        </header>

        {loading ? (
          <div className="loading-state">
            <div className="loader" />
            <p>Loading topics…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p className="empty-emoji">📭</p>
            <p className="empty-text">No topics yet in this category.</p>
            <button className="add-btn" onClick={() => navigate('/topic/new')}>
              + Add First Topic
            </button>
          </div>
        ) : (
          <div className="topics-grid">
            {filtered.map(topic => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onEdit={() => navigate(`/topic/${topic.id}`)}
                onDelete={() => setDeleteTarget(topic.id)}
              />
            ))}
          </div>
        )}
      </main>

      {deleteTarget && (
        <div className="modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <h2>Delete Topic?</h2>
            <p>
              This action cannot be undone. The topic will be permanently
              removed from Firestore and will no longer appear in the app.
            </p>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button className="modal-confirm" onClick={handleDelete} disabled={deleting}>
                {deleting ? <span className="spinner" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
