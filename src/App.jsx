
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [authCode, setAuthCode] = useState(null);

  useEffect(() => {
    // Check for 'code' parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      setAuthCode(code);
      
      // Remove the code and state parameters from the URL
      urlParams.delete('code');
      urlParams.delete('state');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const login = async () => {
    // Open Ironclad OAuth authorization page
    const clientId = 'you client id here';
    const redirectUri = encodeURIComponent(window.location.origin + '/'); // the IC app has a redirect URI of 'http://localhost:5137/'
    const responseType = 'code';
    const scope = encodeURIComponent('public.records.readRecords');
    const state = encodeURIComponent(Math.random().toString(36).substring(2));
    
    const authUrl = `https://na1.ironcladapp.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`;
    console.log('Auth URL:', authUrl); // Debug log to see the generated URL
    window.open(authUrl, "_self");
  }

  return (
    <>
      <div>
        <button onClick={login}>login</button>
        {authCode && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
            <h3>Authorization Code Received:</h3>
            <p style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{authCode}</p>
          </div>
        )}
      </div>
    </>
  )
}

export default App
