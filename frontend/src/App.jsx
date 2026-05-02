import React, { useMemo, useState, useEffect } from 'react'

const screenTabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'upload', label: 'Upload' },
  { id: 'badges', label: 'Badges' }
]

// Leaderboard now comes from the serverless API (`/api/sample`).
// Fallback static data removed; App will fetch on mount and pass to the dashboard.

const weeklyCarbon = [80, 75, 78, 65, 55, 50, 45]
const monthlyEnergy = [1240, 1410, 1380]

const uploads = [
  { title: 'Electricity Data H6 - Verified', meta: 'Hostel Council H6 · 2.4 MB', status: 'Verified', icon: 'bolt' },
  { title: 'Waste Management Report Q3', meta: 'Estate Office · 1.1 MB', status: 'Verified', icon: 'delete_sweep' },
  { title: 'Water Usage H1-H4 - Draft', meta: 'Maintenance Dept · 850 KB', status: 'Pending', icon: 'warning' },
  { title: 'Bio-Waste Records Aug', meta: 'Canteen Council · 1.8 MB', status: 'Verified', icon: 'eco' }
]

const badges = [
  { name: 'Zero Waste Hero', detail: '90% waste segregation for 30 days', tone: 'emerald' },
  { name: 'Energy Saver', detail: 'Reduced monthly electricity by 12%', tone: 'teal' },
  { name: 'Green Drive', detail: 'Participation in 3 sustainability events', tone: 'sky' }
]

const insights = [
  'Hostel 6 reduced electricity by 14% this week.',
  'Waste segregation improved after the awareness drive.',
  'Weekend compost volume is peaking; add a third bin.'
]

function formatEnergy(value) {
  return `${value.toLocaleString()} kWh`
}

function ScreenBadge({ active, children, onClick }) {
  return (
    <button className={`pill-tab ${active ? 'pill-tab-active' : ''}`} onClick={onClick} type="button">
      {children}
    </button>
  )
}

function MetricCard({ label, value, delta, icon, accent = 'emerald' }) {
  return (
    <div className="metric-card">
      <div className="metric-card-top">
        <div className={`icon-badge icon-${accent}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <span className={`delta delta-${delta.startsWith('-') ? 'down' : 'up'}`}>{delta}</span>
      </div>
      <div>
        <div className="metric-label">{label}</div>
        <div className="metric-value">{value}</div>
      </div>
    </div>
  )
}

function BarChart({ values, labels, suffix = '' }) {
  const max = Math.max(...values)
  return (
    <div className="bar-chart" aria-label="chart">
      {values.map((value, index) => (
        <div className="bar-group" key={labels[index]}>
          <div className="bar-label-top">{value}{suffix}</div>
          <div className="bar-track">
            <div className="bar-fill" style={{ height: `${(value / max) * 100}%` }} />
          </div>
          <div className="bar-label-bottom">{labels[index]}</div>
        </div>
      ))}
    </div>
  )
}

function DashboardScreen({ leaderboard }) {
  return (
    <>
      <section className="hero-grid">
        <article className="hero-card hero-card-main">
          <div className="eyebrow">IITB Green Cup</div>
          <h1>Campus Sustainability Hub</h1>
          <p>
            A data-driven platform for hostel rankings, carbon analytics, and sustainability engagement.
          </p>
          <div className="hero-pills">
            <span className="status-pill">Live hostel rankings</span>
            <span className="status-pill muted">Participation tracking</span>
          </div>
        </article>

        <article className="hero-card score-card">
          <div className="eyebrow muted">Green Score</div>
          <div className="score-ring">
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="50" className="ring-back" />
              <circle cx="60" cy="60" r="50" className="ring-front" />
            </svg>
            <div className="score-ring-value">94</div>
          </div>
          <p>Excellent standing</p>
        </article>
      </section>

      <section className="metrics-grid">
        <MetricCard label="Campus Green Score" value="82 / 100" delta="+5.2%" icon="eco" accent="emerald" />
        <MetricCard label="Carbon Offset" value="12.4 tons" delta="+1.1%" icon="co2" accent="teal" />
        <MetricCard label="Event Participation" value="78%" delta="Target met" icon="groups" accent="sky" />
      </section>

      <section className="content-grid">
        <article className="panel panel-leaderboard">
          <div className="panel-header">
            <div>
              <div className="panel-title">Live Hostel Leaderboard</div>
              <div className="panel-subtitle">Week 12 · campus sustainability performance</div>
            </div>
            <div className="live-chip">Live</div>
          </div>
          <div className="leaderboard-list">
            {leaderboard && leaderboard.length > 0 ? leaderboard.map((item, index) => (
              <div className="leaderboard-row" key={item.hostel}>
                <div className={`rank-circle rank-${index + 1 <= 1 ? 'gold' : 'neutral'}`}>{index + 1}</div>
                <div className="leaderboard-main">
                  <div className="leaderboard-hostel">{item.hostel}</div>
                  <div className="leaderboard-note">{item.note}</div>
                </div>
                <div className="leaderboard-side">
                  <div className="leaderboard-score">{item.score}</div>
                  <div className={`trend trend-${item.trend.startsWith('-') ? 'down' : 'up'}`}>{item.trend}</div>
                </div>
              </div>
            )) : (
              <div className="leaderboard-empty">Loading leaderboard…</div>
            )}
          </div>
        </article>

        <aside className="panel panel-stack">
          <div className="mini-panel">
            <div className="panel-title small">Energy Reduction</div>
            <p>Monthly reduction against a baseline across hostels.</p>
            <div className="mini-value">-12%</div>
          </div>
          <div className="mini-panel">
            <div className="panel-title small">Waste Segregation</div>
            <p>Wet and dry waste compliance across canteen areas.</p>
            <div className="mini-value">85%</div>
          </div>
          <div className="mini-panel badge-highlight">
            <div>
              <div className="panel-title small">Next Goal</div>
              <p>Zero Waste Hero</p>
            </div>
            <span className="material-symbols-outlined">military_tech</span>
          </div>
        </aside>
      </section>

      <section className="banner-card">
        <div>
          <div className="eyebrow">Behavior change</div>
          <h2>Join the Green Drive</h2>
          <p>Weekend clean-up and sapling plantation drive starts Saturday at 8 AM.</p>
        </div>
        <button className="primary-button" type="button">Register now</button>
      </section>
    </>
  )
}

function AnalyticsScreen() {
  return (
    <section className="analytics-layout">
      <article className="panel chart-panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Carbon Emission Trend</div>
            <div className="panel-subtitle">Weekly reduction performance</div>
          </div>
          <div className="live-chip muted-chip">12% reduction</div>
        </div>
        <BarChart values={weeklyCarbon} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} suffix="" />
      </article>

      <article className="panel analytics-side">
        <MetricCard label="Electricity Usage" value={formatEnergy(1240)} delta="-2.4%" icon="bolt" accent="sky" />
        <MetricCard label="Waste Segregation" value="88%" delta="+5.1%" icon="delete_sweep" accent="emerald" />
        <MetricCard label="Participation" value="78%" delta="Target met" icon="groups" accent="teal" />
      </article>

      <article className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Monthly Energy Benchmarking</div>
            <div className="panel-subtitle">Hostel 6 compared with recent months</div>
          </div>
        </div>
        <div className="energy-bars">
          {monthlyEnergy.map((value, index) => (
            <div className="energy-row" key={['Oct', 'Sep', 'Aug'][index]}>
              <div className="energy-row-head">
                <span>{['October', 'September', 'August'][index]}</span>
                <strong>{formatEnergy(value)}</strong>
              </div>
              <div className="progress-track">
                <div className={`progress-fill progress-${index}`} style={{ width: `${100 - index * 12}%` }} />
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="panel insight-panel">
        <div className="panel-title">Eco-Insights</div>
        <div className="insight-list">
          {insights.map((text) => (
            <div className="insight-item" key={text}>
              {text}
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

function UploadScreen() {
  return (
    <section className="upload-layout">
      <article className="panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Data Upload</div>
            <div className="panel-subtitle">CSV uploads for hostel council and estate records</div>
          </div>
          <div className="switch-shell"><span /></div>
        </div>
        <div className="upload-zone">
          <div className="upload-icon">
            <span className="material-symbols-outlined">cloud_upload</span>
          </div>
          <h3>Select CSV files to upload</h3>
          <p>Drag and drop institutional data files here, or browse your computer.</p>
          <div className="file-chip-row">
            <span className="file-chip">hostel_council_data.csv</span>
            <span className="file-chip">estate_utility_log.csv</span>
          </div>
        </div>
      </article>

      <article className="panel upload-list-panel">
        <div className="panel-header">
          <div>
            <div className="panel-title">Recent Uploads</div>
          </div>
        </div>
        <div className="upload-list">
          {uploads.map((item) => (
            <div className="upload-item" key={item.title}>
              <div className="upload-item-main">
                <div className="upload-item-icon">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <div className="upload-title">{item.title}</div>
                  <div className="upload-meta">{item.meta}</div>
                </div>
              </div>
              <span className={`status-badge ${item.status === 'Verified' ? 'verified' : 'pending'}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </article>

      <article className="panel upload-footer-panel">
        <div>
          <div className="panel-title">Data Quality Score</div>
          <div className="panel-subtitle">Toward institutional transparency badge</div>
        </div>
        <div className="quality-track">
          <div className="quality-fill" />
        </div>
      </article>
    </section>
  )
}

function BadgesScreen() {
  return (
    <section className="badges-layout">
      <article className="panel badges-hero">
        <div>
          <div className="eyebrow">Gamification</div>
          <h2>Hostel achievements and milestones</h2>
          <p>Badges reinforce participation and make sustainability progress visible to students.</p>
        </div>
      </article>
      <div className="badge-grid">
        {badges.map((badge) => (
          <article className={`badge-card badge-${badge.tone}`} key={badge.name}>
            <span className="material-symbols-outlined">military_tech</span>
            <div className="badge-name">{badge.name}</div>
            <div className="badge-detail">{badge.detail}</div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard')
  const [leaderboard, setLeaderboard] = useState([])
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true)
  const [leaderboardError, setLeaderboardError] = useState(null)
  const activeLabel = useMemo(() => screenTabs.find((tab) => tab.id === activeScreen)?.label ?? 'Dashboard', [activeScreen])

  useEffect(() => {
    let mounted = true
    setLoadingLeaderboard(true)
    fetch('/api/sample')
      .then((r) => {
        if (!r.ok) throw new Error('Network response was not ok')
        return r.json()
      })
      .then((data) => {
        if (!mounted) return
        if (data && Array.isArray(data.leaderboard)) {
          // map server data shape to UI shape
          const mapped = data.leaderboard.map((it) => ({
            hostel: it.hostel,
            score: it.greenScore ?? it.score ?? 0,
            trend: '',
            note: ''
          }))
          setLeaderboard(mapped)
        } else {
          setLeaderboard([])
        }
      })
      .catch((err) => { if (mounted) setLeaderboardError(err.message || String(err)) })
      .finally(() => { if (mounted) setLoadingLeaderboard(false) })
    return () => { mounted = false }
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark brand-mark-logo" aria-hidden="true">
            <img src="/Scell-Logo.svg" alt="" className="brand-logo" />
          </div>
          <div>
            <div className="brand-title">Green Cup</div>
          </div>
        </div>
        <nav className="topnav" aria-label="Screens">
          {screenTabs.map((tab) => (
            <ScreenBadge key={tab.id} active={tab.id === activeScreen} onClick={() => setActiveScreen(tab.id)}>
              {tab.label}
            </ScreenBadge>
          ))}
        </nav>
      </header>

      <main className="page-content">
        <section className="page-title-row">
          <div>
            <h1>{activeLabel}</h1>
          </div>
        </section>

        {activeScreen === 'dashboard' && <DashboardScreen leaderboard={leaderboard} />}
        {activeScreen === 'analytics' && <AnalyticsScreen />}
        {activeScreen === 'upload' && <UploadScreen />}
        {activeScreen === 'badges' && <BadgesScreen />}
      </main>
    </div>
  )
}
