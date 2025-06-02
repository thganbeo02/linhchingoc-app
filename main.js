const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    resizable: false,
    frame: false,
    titleBarStyle: 'customButtonsOnHover', // Alternative: try 'hidden' or 'hiddenInset'
    transparent: true,
    alwaysOnTop: false,
    skipTaskbar: false,
    show: false, // Don't show until ready
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the file and show when ready
  win.loadFile('index.html');
  
  win.once('ready-to-show', () => {
    win.show();
  });

  // Optional: Add close functionality to your custom close button
  // You can add this to your index.js if you want the X button to work
}

app.whenReady().then(createWindow);

// Handle window control messages from renderer
ipcMain.on('minimize-window', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.minimize();
});

ipcMain.on('close-window', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});