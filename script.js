// Ustawienia (dostosuj tutaj)
const BOT_NAME = 'MyBot';
const INVITE_LINK = 'https://discord.com/oauth2/authorize?client_id=ID&scope=bot%20applications.commands&permissions=8';
const SUPPORT_LINK = 'https://discord.gg/your-support';
const API_STATUS_URL = ''; // opcjonalne: endpoint JSON {status:'online'|'offline', guilds:123, users:456, last_activity:'2025-08-30T12:34:56Z'}

// Inicjalizacja UI
document.getElementById('bot-name').textContent = BOT_NAME;
document.getElementById('hero-title').textContent = BOT_NAME + ' — Twój bot na Discorda';
document.getElementById('invite-link').href = INVITE_LINK;
document.getElementById('support-link').href = SUPPORT_LINK;
document.getElementById('year').textContent = new Date().getFullYear();

async function fetchStatus(){
  const dot = document.getElementById('status-dot');
  const txt = document.getElementById('status-text');
  const detail = document.getElementById('status-detail');
  const g = document.getElementById('stat-guilds');
  const u = document.getElementById('stat-users');
  if(!API_STATUS_URL){
    dot.style.background = '#f59e0b';
    txt.textContent = 'Tryb demo — brak API';
    detail.textContent = 'Ustaw API_STATUS_URL w script.js, aby wyświetlać status.';
    g.textContent = '—'; u.textContent = '—';
    return;
  }
  try{
    const res = await fetch(API_STATUS_URL);
    if(!res.ok) throw new Error('Błąd sieci');
    const data = await res.json();
    dot.style.background = data.status === 'online' ? '#10b981' : '#ef4444';
    txt.textContent = data.status === 'online' ? 'Online' : 'Offline';
    detail.textContent = data.last_activity ? ('Ostatnia aktywność: ' + new Date(data.last_activity).toLocaleString('pl-PL')) : '';
    g.textContent = data.guilds ?? '—';
    u.textContent = data.users ?? '—';
  }catch(e){
    dot.style.background = '#6b7280';
    txt.textContent = 'Brak połączenia z API';
    detail.textContent = e.message;
  }
}

fetchStatus();
