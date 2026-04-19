import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Jarvis</h1>
        <button onClick={() => navigate('/login')}>Logout</button>
      </header>
      
      <main className="home-content">
        <div className="status-card">
          <h2>Session Status</h2>
          <p>Connected to Jarvis Core</p>
        </div>
        
        <div className="controls-card">
          <h2>Controls</h2>
          <button>Mute Microphone</button>
          <button>Disable Screen Capture</button>
          <button>Pause Jarvis</button>
        </div>
      </main>
    </div>
  );
}
