import Keycloak from 'https://cdn.jsdelivr.net/npm/keycloak-js@25.0.5/+esm';
const keycloak = new Keycloak({
    url: 'http://localhost:8080',
    realm: 'intellilink',
    clientId: 'app1-frontend',
  });
  
  keycloak.init({
    onLoad: 'check-sso',
    pkceMethod: 'S256',
    flow: 'standard',
    storage: 'local'
  }).then(authenticated => {
    if (authenticated) {
      const username = keycloak.tokenParsed?.preferred_username || '不明なユーザー';
      document.getElementById('status').innerText = `ログイン中: ${username}`;
  
      // トークン表示
      console.log("Access Token:", keycloak.token);
      console.log("ID Token:", keycloak.idToken);
      console.log("Refresh Token:", keycloak.refreshToken);
    } else {
      document.getElementById('status').innerText = '未ログインです';
    }
  }).catch(err => {
    console.error('Keycloak init error:', err);
  });
  
  document.getElementById('loginBtn').addEventListener('click', () => {
    keycloak.login();
  });
  
  document.getElementById('logoutBtn').addEventListener('click', () => {
    keycloak.logout({
      redirectUri: window.location.origin
    });
  });