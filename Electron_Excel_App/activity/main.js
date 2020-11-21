
const electron=require("electron");

const ejse=require("ejs-electron");

//by docs
const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.ejs').then(function(){
      win.maximize();
      win.webContents.openDevTools();
  });
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)









//os specific code
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
