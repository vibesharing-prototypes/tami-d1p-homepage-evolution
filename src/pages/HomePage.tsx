import { useState } from 'react';

const RED = '#CC2027';
const DARK = '#111111';

const MILESTONES = [
  { id: 'today', label: 'Today',       date: 'Mar 2026', feature: 'App tiles',             tag: null   },
  { id: 'apr',   label: 'April 2026',  date: 'Apr 2026', feature: 'Director Appointment',  tag: 'HUC1' },
  { id: 'eq2',   label: 'Early Q2',    date: 'May 2026', feature: 'Connected Compliance',  tag: null   },
  { id: 'lq2',   label: 'Late Q2',     date: 'Jun 2026', feature: 'AAR Workflow',           tag: 'HUC5' },
];

function Icon({ d, size = 24, color = RED, sw = 1.8 }: {
  d: string; size?: number; color?: string; sw?: number;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const P: Record<string, string> = {
  menu:       'M4 6h16M4 12h16M4 18h16',
  home:       'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  chart:      'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  grid:       'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  users:      'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  document:   'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  globe:      'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  shield:     'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  target:     'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  archive:    'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
  check:      'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  userAdd:    'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
  sparkles:   'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  cpu:        'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18',
  cog:        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z',
  question:   'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  user:       'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  down:       'M19 9l-7 7-7-7',
  left:       'M15 19l-7-7 7-7',
  right:      'M9 5l7 7-7 7',
  star:       'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  bell:       'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
  clipboard:  'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  collection: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  chat:       'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
};

const MY_APPS = [
  { name: 'Home',            iconPath: P.archive,  starred: true  },
  { name: 'Activity Center', iconPath: P.bell,     starred: true  },
  { name: 'Boards',          iconPath: P.users,    starred: true  },
  { name: 'Installers',      iconPath: P.userAdd,  starred: true  },
  { name: 'Risk Manager',    iconPath: P.shield,   starred: true  },
  { name: 'ACL AI Studio',   iconPath: P.sparkles, starred: false },
];

function MyAppsPanel() {
  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 100,
      width: 320, backgroundColor: 'white', borderRadius: 12,
      boxShadow: '0 8px 32px rgba(0,0,0,0.13), 0 1px 4px rgba(0,0,0,0.07)',
      paddingBottom: 8, overflow: 'hidden',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px' }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>My Apps</span>
        <button style={{ background: 'none', border: '1.5px solid #d1d5db', borderRadius: 8, padding: '5px 12px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: '#374151' }}>
          Rearrange
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      </div>
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 5 }}>Search apps</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1.5px solid #d1d5db', borderRadius: 8, padding: '8px 12px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <span style={{ fontSize: 14, color: '#9ca3af' }}>Search my name</span>
        </div>
      </div>
      <div style={{ maxHeight: 320, overflowY: 'auto', marginTop: 8 }}>
        {MY_APPS.map((app) => (
          <div key={app.name} style={{ display: 'flex', alignItems: 'center', padding: '9px 20px', gap: 14, cursor: 'pointer' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, border: '1.5px solid #e5e7eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon d={app.iconPath} size={22} color="#374151" sw={1.5} />
            </div>
            <span style={{ flex: 1, fontSize: 15, color: '#111827' }}>{app.name}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill={app.starred ? '#111827' : 'none'}
              stroke="#111827" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={P.star} />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoButton({ dotColor = '#6b7280' }: { dotColor?: string }) {
  const [bentoOpen, setBentoOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setBentoOpen((v) => !v)} style={{
        background: bentoOpen ? '#f3f4f6' : 'none', border: 'none', cursor: 'pointer',
        padding: '6px 7px', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          {([2.5, 7.5, 12.5] as number[]).flatMap((cx) =>
            ([2.5, 7.5, 12.5] as number[]).map((cy) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.5" fill={bentoOpen ? '#111827' : dotColor} />
            ))
          )}
        </svg>
      </button>
      {bentoOpen && (
        <>
          <div onClick={() => setBentoOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
          <MyAppsPanel />
        </>
      )}
    </div>
  );
}

interface Tile { name: string; icon: string; isNew?: boolean; }
interface PageData { boardsGov: Tile[]; riskStrategy: Tile[]; auditAnalytics: Tile[]; }

function getPageData(id: string): PageData {
  const boardsGov: Tile[] = [
    { name: 'Boards', icon: P.users }, { name: 'BoardEffect', icon: P.document }, { name: 'Community', icon: P.globe },
  ];
  const riskStrategy: Tile[] = [
    { name: 'Risk Manager', icon: P.shield }, { name: 'AI Risk Essentials', icon: P.target },
    { name: 'Asset Manager', icon: P.archive }, { name: 'Strategy', icon: P.chart }, { name: 'Asset Inventory', icon: P.collection },
  ];
  const auditAnalytics: Tile[] = [
    { name: 'Results', icon: P.check }, { name: 'Fieldwork', icon: P.clipboard }, { name: 'Robots', icon: P.cpu },
    { name: 'Checklists', icon: P.document }, { name: 'Storyboards', icon: P.chart }, { name: 'Scripts', icon: P.collection },
  ];
  if (id === 'today') return { boardsGov, riskStrategy, auditAnalytics };
  if (id === 'apr') return { boardsGov: [...boardsGov, { name: 'Director Appointment', icon: P.userAdd, isNew: true }], riskStrategy, auditAnalytics };
  if (id === 'eq2') return { boardsGov: [...boardsGov, { name: 'Director Appointment', icon: P.userAdd }], riskStrategy, auditAnalytics };
  return { boardsGov: [...boardsGov, { name: 'Director Appointment', icon: P.userAdd }], riskStrategy, auditAnalytics: [...auditAnalytics, { name: 'Audit Report AI', icon: P.sparkles, isNew: true }] };
}

function NewBadge() {
  return <span style={{ backgroundColor: RED, color: 'white', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 8, letterSpacing: '0.05em', flexShrink: 0 }}>NEW</span>;
}

function AppTile({ name, icon, isNew = false }: Tile) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: '20px 12px', width: 120, backgroundColor: 'white',
        border: `1px solid ${hovered ? '#c9cdd3' : '#e5e7eb'}`, borderRadius: 8,
        cursor: 'pointer', position: 'relative', flexShrink: 0,
        boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.07)' : 'none', transition: 'box-shadow 0.15s, border-color 0.15s' }}>
      {isNew && <div style={{ position: 'absolute', top: 6, right: 6, backgroundColor: RED, color: 'white', fontSize: 9, fontWeight: 700, padding: '2px 5px', borderRadius: 8 }}>NEW</div>}
      <Icon d={icon} size={28} color={RED} sw={1.8} />
      <span style={{ fontSize: 12, color: '#374151', fontWeight: 500, textAlign: 'center', lineHeight: 1.3 }}>{name}</span>
    </div>
  );
}

function TilesRow({ tiles }: { tiles: Tile[] }) {
  return <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{tiles.map(t => <AppTile key={t.name} name={t.name} icon={t.icon} isNew={t.isNew} />)}</div>;
}

function SectionHead({ a, b, isNew = false }: { a: string; b: string; isNew?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 32 }}>
      <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111827', margin: 0 }}>{a} & <span style={{ color: RED, fontWeight: 600 }}>{b}</span></h2>
      {isNew && <NewBadge />}
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: P.menu, active: false }, { icon: P.home, active: true }, { icon: P.chart, active: false },
    { icon: P.grid, active: false }, { icon: P.star, active: false }, { icon: P.document, active: false },
    { icon: P.archive, active: false }, { icon: P.bell, active: false }, { icon: P.user, active: false }, { icon: P.cog, active: false },
  ];
  return (
    <div style={{ width: 54, backgroundColor: DARK, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 14, gap: 2, flexShrink: 0 }}>
      <div style={{ color: RED, fontWeight: 900, fontSize: 20, marginBottom: 18 }}>D</div>
      {items.map((item, i) => (
        <div key={i} style={{ width: 38, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, backgroundColor: item.active ? RED : 'transparent', cursor: 'pointer' }}>
          <Icon d={item.icon} size={17} color={item.active ? 'white' : '#6b7280'} sw={2} />
        </div>
      ))}
    </div>
  );
}

function PfizerLogo({ size = 32 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', backgroundColor: '#0060A9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 18 18" fill="none">
        {([0, 60, 120, 180, 240, 300] as number[]).map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return <line key={angle} x1={9 + 1.8 * Math.cos(rad)} y1={9 + 1.8 * Math.sin(rad)} x2={9 + 7.2 * Math.cos(rad)} y2={9 + 7.2 * Math.sin(rad)} stroke="white" strokeWidth="2.4" strokeLinecap="round" />;
        })}
      </svg>
    </div>
  );
}

function TopBar() {
  return (
    <div style={{ height: 52, backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <PfizerLogo size={32} />
        <span style={{ fontWeight: 600, fontSize: 14, color: '#111827', whiteSpace: 'nowrap' }}>Pfizer Compliance</span>
        <BentoButton dotColor="#6b7280" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {[P.question, P.cog, P.user].map((icon, i) => (
          <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon d={icon} size={20} color="#6b7280" sw={1.5} />
          </button>
        ))}
      </div>
    </div>
  );
}

function DirApptHeader() {
  return (
    <div style={{ height: 64, backgroundColor: '#ffffff', borderBottom: '1px solid #E2E2E5', display: 'flex', alignItems: 'center', padding: '0 28px', justifyContent: 'space-between', flexShrink: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <PfizerLogo size={32} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#242628', letterSpacing: '0.1px', whiteSpace: 'nowrap' }}>Pfizer Compliance</span>
        <BentoButton dotColor="#242628" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={P.question} size={20} color="#242628" sw={1.5} /></button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 7, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={P.cog} size={20} color="#242628" sw={1.5} /></button>
        <div style={{ width: 1, height: 32, backgroundColor: '#E2E2E5', margin: '0 10px', flexShrink: 0 }} />
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 5, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={P.user} size={22} color="#242628" sw={1.5} /></button>
      </div>
    </div>
  );
}

function MyFavorites() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#111827', margin: 0 }}>My Favorites</h1>
        <button style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', border: '1px solid #d1d5db', borderRadius: 6, backgroundColor: 'white', cursor: 'pointer', fontSize: 12, color: '#374151' }}>
          <Icon d={P.cog} size={13} color="#6b7280" sw={2} /> Customize page
        </button>
      </div>
      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: '16px 18px' }}>
        <div style={{ display: 'flex', gap: 20, marginBottom: 10 }}>
          {[100, 120, 90].map((w, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 18, height: 18, backgroundColor: '#e5e7eb', borderRadius: 4 }} />
              <div style={{ width: w, height: 11, backgroundColor: '#f3f4f6', borderRadius: 4 }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#9ca3af', margin: 0 }}>Have your favorite apps at hand by customizing this section.</p>
      </div>
    </div>
  );
}

function DirApptAgentView() {
  const [prompt, setPrompt] = useState('');
  const [focused, setFocused] = useState(false);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const suggestions = [
    { id: 's1', label: 'Review board nominees' }, { id: 's2', label: 'Check board composition' },
    { id: 's3', label: 'Start appointment workflow' }, { id: 's4', label: 'Governance requirements' },
  ];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 28px' }}>
      <div style={{ width: '100%', maxWidth: 620 }}>
        <h2 style={{ fontSize: 40, fontWeight: 300, color: '#282e37', textAlign: 'center', margin: '0 0 10px', lineHeight: '46px', letterSpacing: '-0.8px' }}>Your appointment agent is standing by</h2>
        <p style={{ fontSize: 15, color: '#6f7377', textAlign: 'center', margin: '0 0 32px', lineHeight: 1.65, maxWidth: 480, marginLeft: 'auto', marginRight: 'auto' }}>
          I can help you appoint a new director — reviewing nominees, checking board composition, managing governance compliance, and preparing appointment documentation.
        </p>
        {suggestionsOpen && (
          <div style={{ backgroundColor: '#ffffff', border: '1.5px solid #dadada', borderRadius: 10, padding: '10px 12px', marginBottom: 4, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {suggestions.map(s => (
              <button key={s.id} onClick={() => { setPrompt(s.label); setSuggestionsOpen(false); }}
                style={{ backgroundColor: '#f5f5f5', color: '#282e37', border: '1px solid #e2e2e2', borderRadius: 20, padding: '5px 14px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                {s.label}
              </button>
            ))}
          </div>
        )}
        <div style={{ border: `1.5px solid ${focused ? '#464e53' : '#dadada'}`, borderRadius: 12, backgroundColor: '#ffffff', boxShadow: focused ? '0 0 0 3px rgba(11,76,206,0.12)' : '0 1px 3px rgba(0,0,0,0.06)', transition: 'border-color 0.15s, box-shadow 0.15s', overflow: 'hidden' }}>
          <textarea value={prompt} onChange={e => setPrompt(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            placeholder="Ask me to appoint a director, review candidates, or check governance requirements…" rows={3}
            style={{ width: '100%', padding: '14px 16px 10px', border: 'none', outline: 'none', resize: 'none', fontSize: 14, color: '#282e37', fontFamily: 'inherit', backgroundColor: 'transparent', lineHeight: 1.55, boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 8px 8px', gap: 4, borderTop: '1px solid #f0f0f0' }}>
            <button onClick={() => setSuggestionsOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 5, height: 32, padding: '0 10px', backgroundColor: suggestionsOpen ? '#eef1ff' : 'transparent', border: `1px solid ${suggestionsOpen ? '#b8c3f8' : 'transparent'}`, borderRadius: 6, fontSize: 12, fontWeight: 500, color: suggestionsOpen ? '#1c4ee4' : '#6f7377', cursor: 'pointer', fontFamily: 'inherit' }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z"/></svg>
              Suggestions
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button aria-label="Voice input" style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid transparent', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#6f7377' }}>
                <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
              </button>
              <button style={{ width: 32, height: 32, background: prompt ? 'linear-gradient(135deg, #b11f62 0%, #1c4ee4 100%)' : '#e6e6e6', color: prompt ? 'white' : '#a0a2a5', border: 'none', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: prompt ? 'pointer' : 'default', flexShrink: 0 }}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DirApptBanner({ isNew }: { isNew: boolean }) {
  return (
    <div style={{ backgroundColor: 'white', border: `1px solid ${isNew ? RED : '#e5e7eb'}`, borderLeft: `4px solid ${RED}`, borderRadius: 8, padding: '14px 18px', marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, backgroundColor: `${RED}18`, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon d={P.userAdd} size={18} color={RED} sw={2} /></div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Director Appointment Pending</span>
            {isNew && <NewBadge />}
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Board seat pending approval — Pied Piper Board of Directors</p>
        </div>
      </div>
      <button style={{ backgroundColor: RED, color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Review &amp; Appoint</button>
    </div>
  );
}

function ConnectedComplianceSection({ isNew }: { isNew: boolean }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 32 }}>
        <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111827', margin: 0 }}>Connected <span style={{ color: RED, fontWeight: 600 }}>Compliance</span></h2>
        {isNew && <NewBadge />}
      </div>
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: 12, padding: '22px 24px', display: 'flex', alignItems: 'center', gap: 18, cursor: 'pointer' }}>
        <div style={{ width: 46, height: 46, backgroundColor: `${RED}28`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon d={P.chat} size={22} color={RED} sw={2} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'white', marginBottom: 4 }}>AI Compliance Assistant</div>
          <p style={{ fontSize: 12, color: '#94a3b8', margin: '0 0 12px' }}>AI-powered compliance workflows across your organisation. Ask anything, take action.</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Appoint a Board Member', 'Review board composition', 'Check compliance status'].map(s => (
              <span key={s} style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: '#cbd5e1', fontSize: 11, padding: '4px 10px', borderRadius: 20, cursor: 'pointer', whiteSpace: 'nowrap' }}>{s}</span>
            ))}
          </div>
        </div>
        <button style={{ backgroundColor: RED, color: 'white', border: 'none', borderRadius: 8, padding: '10px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Open Assistant →</button>
      </div>
    </>
  );
}

function AARSection({ isNew }: { isNew: boolean }) {
  const steps = ['Investigation', 'Evidence', 'Synthesis & Edit', 'Veracity scoring', 'Preview-Approve'];
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, marginTop: 32 }}>
        <h2 style={{ fontSize: 19, fontWeight: 700, color: '#111827', margin: 0 }}>Automated Audit <span style={{ color: RED, fontWeight: 600 }}>Reports</span></h2>
        {isNew && <NewBadge />}
      </div>
      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 10, padding: '20px 22px' }}>
        <p style={{ fontSize: 12, color: '#6b7280', margin: '0 0 18px' }}>AI-powered end-to-end audit reporting — investigation to approved report.</p>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {steps.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', border: `2px solid ${RED}`, backgroundColor: `${RED}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: RED, flexShrink: 0 }}>{String(i + 1).padStart(2, '0')}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#4b5563', textAlign: 'center', maxWidth: 70, lineHeight: 1.3 }}>{step}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, backgroundColor: '#e5e7eb', marginBottom: 20, marginLeft: 2, marginRight: 2, flexShrink: 0 }} />}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
          <button style={{ backgroundColor: RED, color: 'white', border: 'none', borderRadius: 6, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Start New Report</button>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: 6, padding: '7px 14px', fontSize: 12, cursor: 'pointer' }}>View All Reports</button>
        </div>
      </div>
    </>
  );
}

function TimelineBar({ activeIdx, onSelect }: { activeIdx: number; onSelect: (i: number) => void }) {
  return (
    <div style={{ backgroundColor: '#0f172a', padding: '10px 24px', display: 'flex', alignItems: 'center', flexShrink: 0, borderBottom: '1px solid #1e293b', gap: 0 }}>
      <span style={{ color: '#64748b', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 24, whiteSpace: 'nowrap', flexShrink: 0 }}>D1P · 2026 Roadmap</span>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
        {MILESTONES.map((m, i) => (
          <div key={m.id} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
            <button onClick={() => onSelect(i)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '7px 14px', borderRadius: 8, border: activeIdx === i ? `1.5px solid ${RED}` : '1.5px solid transparent', backgroundColor: activeIdx === i ? `${RED}1a` : 'transparent', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0 }}>
              <span style={{ color: activeIdx === i ? 'white' : '#94a3b8', fontSize: 12, fontWeight: 700 }}>{m.label}</span>
              <span style={{ color: activeIdx === i ? '#fca5a5' : '#64748b', fontSize: 11, fontWeight: 500 }}>{m.feature}</span>
              {m.tag && <span style={{ backgroundColor: activeIdx === i ? RED : '#334155', color: 'white', fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4 }}>{m.tag}</span>}
            </button>
            {i < MILESTONES.length - 1 && <div style={{ flex: 1, height: 2, minWidth: 8, backgroundColor: i < activeIdx ? RED : '#1e293b', transition: 'background-color 0.3s' }} />}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginLeft: 20, flexShrink: 0 }}>
        {([
          { icon: P.left, disabled: activeIdx === 0, fn: () => onSelect(activeIdx - 1) },
          { icon: P.right, disabled: activeIdx === MILESTONES.length - 1, fn: () => onSelect(activeIdx + 1) },
        ] as const).map((btn, i) => (
          <button key={i} onClick={btn.fn} disabled={btn.disabled} style={{ width: 30, height: 30, borderRadius: 6, border: '1px solid #334155', backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: btn.disabled ? 'not-allowed' : 'pointer', opacity: btn.disabled ? 0.35 : 1 }}>
            <Icon d={btn.icon} size={14} color="#94a3b8" sw={2.5} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const data = getPageData(MILESTONES[activeIdx].id);
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif', overflow: 'hidden' }}>
      <TimelineBar activeIdx={activeIdx} onSelect={setActiveIdx} />
      {activeIdx === 1 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <DirApptHeader />
          <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f3f3f3', display: 'flex', flexDirection: 'column' }}>
            <DirApptAgentView />
          </div>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TopBar />
            <div style={{ flex: 1, overflowY: 'auto', backgroundColor: '#f9fafb', padding: '24px 28px' }}>
              <div style={{ maxWidth: 920 }}>
                <MyFavorites />
                {activeIdx >= 2 && <DirApptBanner isNew={false} />}
                {activeIdx >= 2 && <ConnectedComplianceSection isNew={activeIdx === 2} />}
                {activeIdx >= 3 && <AARSection isNew={activeIdx === 3} />}
                <SectionHead a="Boards" b="Governance" />
                <TilesRow tiles={data.boardsGov} />
                <SectionHead a="Risk" b="Strategy" />
                <TilesRow tiles={data.riskStrategy} />
                <SectionHead a="Audit" b="Analytics" />
                <TilesRow tiles={data.auditAnalytics} />
                <div style={{ height: 40 }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
