const { app, BrowserWindow } = require('electron');
const path = require('path');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});

let window;

app.on('ready', () => {
  window = new BrowserWindow({
    minWidth: 1000,
    width: 1100,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true
    }
  });

  window.loadFile(`${__dirname}/app/index.html`);
});

app.on('window-all-closed', () => {
  app.quit();
});
