const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'frontend');

let backendProcess = null;

// Probe port 8000 to see if FastAPI is already running
function checkBackendHealth(callback) {
  let called = false;
  const done = (val) => {
    if (!called) {
      called = true;
      callback(val);
    }
  };

  const req = http.request({
    hostname: '127.0.0.1',
    port: 8000,
    path: '/api/trustguard/status',
    method: 'GET',
    timeout: 1000
  }, (res) => {
    done(res.statusCode < 500);
  });

  req.on('error', () => done(false));
  req.on('timeout', () => {
    req.destroy();
    done(false);
  });
  req.end();
}

function startBackend() {
  const pythonPath = process.platform === 'win32'
    ? path.join(__dirname, 'backend', '.venv', 'Scripts', 'python.exe')
    : path.join(__dirname, 'backend', '.venv', 'bin', 'python');

  const backendDir = path.join(__dirname, 'backend');
  const pyExec = fs.existsSync(pythonPath) ? pythonPath : 'python';

  console.log(`[CREOVA Combined Runner] Spawning Python FastAPI on port 8000 via ${pyExec}...`);
  backendProcess = spawn(pyExec, ['-m', 'uvicorn', 'main:app', '--host', '127.0.0.1', '--port', '8000'], {
    cwd: backendDir,
    stdio: 'inherit',
    shell: true
  });

  backendProcess.on('error', (err) => {
    console.error('[CREOVA Combined Runner] Failed to start backend:', err.message);
  });
}

function cleanup() {
  if (backendProcess) {
    console.log('\n[CREOVA Combined Runner] Shutting down FastAPI backend process...');
    try {
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', backendProcess.pid, '/f', '/t']);
      } else {
        backendProcess.kill('SIGTERM');
      }
    } catch (e) {}
  }
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;

  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Reverse proxy API and OpenAPI docs to FastAPI on port 8000
  if (pathname.startsWith('/api/') || pathname.startsWith('/docs') || pathname.startsWith('/openapi.json')) {
    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: 8000,
      path: req.url,
      method: req.method,
      headers: { ...req.headers, host: '127.0.0.1:8000' }
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });
    proxyReq.on('error', (e) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Backend gateway error', detail: e.message }));
    });
    req.pipe(proxyReq, { end: true });
    return;
  }

  const safeSuffix = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, safeSuffix);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>404 Not Found</h1><p>Resource ${pathname} was not found on this server.</p>`);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

checkBackendHealth((isAlreadyRunning) => {
  if (isAlreadyRunning) {
    console.log('[CREOVA Combined Runner] FastAPI backend is active and responding on port 8000.');
  } else {
    startBackend();
  }

  server.listen(PORT, () => {
    console.log(`\n=============================================================`);
    console.log(`  🛡️  CREOVA TRUSTGUARD — AI Marketplace & Verification Engine`);
    console.log(`=============================================================`);
    console.log(`  🚀 All-In-One Hub:    http://localhost:${PORT}/pages/hub.html`);
    console.log(`  Marketplace App:    http://localhost:${PORT}`);
    console.log(`  Signup (OTP):       http://localhost:${PORT}/pages/signup.html`);
    console.log(`  Login (Dual Mode):  http://localhost:${PORT}/pages/login.html`);
    console.log(`  Creator Studio:     http://localhost:${PORT}/pages/creator-dashboard.html`);
    console.log(`  Company Workspace:  http://localhost:${PORT}/pages/company-dashboard.html`);
    console.log(`  Brand Hub:          http://localhost:${PORT}/pages/brand-dashboard.html`);
    console.log(`  AI Fraud Sandbox:   http://localhost:${PORT}/pages/trustguard-sandbox.html`);
    console.log(`  Creator Discovery:  http://localhost:${PORT}/pages/discover.html`);
    console.log(`  Interactive Docs:   http://localhost:${PORT}/docs`);
    console.log(`  Backend Direct:     http://127.0.0.1:8000`);
    console.log(`=============================================================\n`);
  });
});
