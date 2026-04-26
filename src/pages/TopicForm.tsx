import React, { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import './TopicForm.css';

const LANGS = ['en', 'hi', 'ml', 'mr', 'ta', 'te', 'bn'];

const LANG_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  ml: 'Malayalam',
  mr: 'Marathi',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali'
};

const CATEGORIES = ['farming', 'health', 'government', 'education'];

type LangMap = Record<string, string>;

interface FormState {
  id: string;
  category: string;
  icon: string;
  helpline: string;
  website: string;
  title: LangMap;
  content: LangMap;
}

const emptyForm = (): FormState => ({
  id: '',
  category: 'farming',
  icon: '',
  helpline: '',
  website: '',
  title: Object.fromEntries(LANGS.map(l => [l, ''])),
  content: Object.fromEntries(LANGS.map(l => [l, '']))
});

const TopicForm: React.FC = () => {

  const { id } = useParams<{ id: string }>();
  const isNew = id === 'new';

  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>(emptyForm());
  const [activeLang, setActiveLang] = useState('en');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {

    if (!isNew && id) {

      const loadTopic = async () => {

        try {

          const snap = await getDoc(doc(db, 'topics', id));

          if (!snap.exists()) {
            setError('Topic not found.');
            return;
          }

          const data = snap.data();

          setForm({
            id: snap.id,
            category: data.category || 'farming',
            icon: data.icon || '',
            helpline: data.helpline || '',
            website: data.website || '',
            title: {
              ...Object.fromEntries(LANGS.map(l => [l, ''])),
              ...data.title
            },
            content: {
              ...Object.fromEntries(LANGS.map(l => [l, ''])),
              ...data.content
            }
          });

        } catch {
          setError('Failed to load topic.');
        } finally {
          setLoading(false);
        }

      };

      loadTopic();
    }

  }, [id, isNew]);

  const updateField = (
    field: 'title' | 'content',
    lang: string,
    value: string
  ) => {

    setForm(f => ({
      ...f,
      [field]: {
        ...f[field],
        [lang]: value
      }
    }));

  };

  const handleSave = async () => {

    if (!form.id.trim()) {
      setError('Topic ID is required.');
      return;
    }

    if (!form.title.en.trim()) {
      setError('English title is required.');
      return;
    }

    if (!form.content.en.trim()) {
      setError('English content is required.');
      return;
    }

    setError('');
    setSaving(true);

    try {

      await setDoc(doc(db, 'topics', form.id.trim()), {
        id: form.id.trim(),
        category: form.category,
        icon: form.icon.trim(),
        helpline: form.helpline,
        website: form.website,
        title: form.title,
        content: form.content,
        updatedAt: Math.floor(Date.now() / 1000)
      });

      navigate('/');

    } catch {
      setError('Failed to save topic.');
    } finally {
      setSaving(false);
    }

  };

  if (loading) {

    return (
      <div className="form-loading">
        <div className="loader" />
        <p>Loading topic…</p>
      </div>
    );

  }

  const filledCount =
    LANGS.filter(l => form.title[l] && form.content[l]).length;

  return (
    <div className="form-root">

      <div className="form-topbar">

        <button
          className="back-btn"
          onClick={() => navigate('/')}
        >
          ← Back
        </button>

        <div className="form-topbar-right">

          <div className="progress-pill">

            <span
              className="progress-fill"
              style={{
                width: `${(filledCount / 7) * 100}%`
              }}
            />

            <span className="progress-label">
              {filledCount}/7 languages
            </span>

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
            disabled={saving}
          >
            {saving
              ? <span className="spinner" />
              : (isNew ? 'Publish Topic' : 'Save Changes')}
          </button>

        </div>

      </div>

      <div className="form-body">

        <div className="form-meta-col">

          <h2 className="form-section-title">Topic Info</h2>

          <div className="field-group">
            <label>Topic ID *</label>
            <input
              value={form.id}
              disabled={!isNew}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  id: e.target.value.toLowerCase().replace(/\s/g, '_')
                }))
              }
            />
          </div>

          <div className="field-group">
            <label>Category *</label>
            <select
              value={form.category}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  category: e.target.value
                }))
              }
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="field-group">
            <label>Icon (emoji)</label>
            <input
              placeholder="e.g. 🧪 or 💊"
              value={form.icon}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  icon: e.target.value
                }))
              }
            />
            {form.icon && (
              <span style={{ fontSize: 28, marginTop: 6, display: 'block' }}>
                {form.icon}
              </span>
            )}
          </div>

          <div className="field-group">
            <label>Helpline</label>
            <input
              value={form.helpline}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  helpline: e.target.value
                }))
              }
            />
          </div>

          <div className="field-group">
            <label>Website</label>
            <input
              value={form.website}
              onChange={e =>
                setForm(f => ({
                  ...f,
                  website: e.target.value
                }))
              }
            />
          </div>

          {error && (
            <p className="form-error">{error}</p>
          )}

        </div>

        <div className="form-content-col">

          <div className="lang-tabs">

            {LANGS.map(l => (
              <button
                key={l}
                className={`lang-tab ${activeLang === l ? 'active' : ''}`}
                onClick={() => setActiveLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}

          </div>

          <div className="lang-editor">

            <h3 className="editor-lang-title">
              {LANG_NAMES[activeLang]}
            </h3>

            <div className="field-group">

              <label>
                Title ({LANG_NAMES[activeLang]})
              </label>

              <input
                value={form.title[activeLang]}
                onChange={e =>
                  updateField(
                    'title',
                    activeLang,
                    e.target.value
                  )
                }
              />

            </div>

            <div className="field-group">

              <label>
                Content ({LANG_NAMES[activeLang]})
              </label>

              <textarea
                rows={12}
                value={form.content[activeLang]}
                onChange={e =>
                  updateField(
                    'content',
                    activeLang,
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default TopicForm;
