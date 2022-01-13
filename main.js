const { app, BrowserWindow, ipcMain } = require('electron')
const fetch = require('electron-fetch').default


function LoLCountdown() {
  let win = undefined;

  this.createWindow = () => {
    win = new BrowserWindow({
      width: 350,
      height: 150,
      // frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      }
    })

    win.loadFile('index.html');

    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setAlwaysOnTop(true, 'normal');
    win.setFullScreenable(false);
    // win.moveTop();
  }

  this.closeAppWindow = () => {
    if(win) {
      win.close()
    }
  }
}

app.commandLine.appendSwitch('ignore-certificate-errors', true);

app.whenReady().then(() => {
  const lolChampWindow = new LoLCountdown();

  console.log('Looking for a game...')
  setInterval(() => {
    fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
      .then((res) => res.json())
      .then((data) => {
        if (data && BrowserWindow.getAllWindows().length === 0) {
          console.log('Opening Window...')
          ipcMain.once('hasLoaded', (event) => {
            event.sender.send('asynReply', data);
          });
          lolChampWindow.createWindow()

        }
      }).catch((e) => {
        if(BrowserWindow.getAllWindows().length === 1){
          console.log('Closing Window...')
          lolChampWindow.closeAppWindow()
        }
      });
  }, 1500)
})

app.on('window-all-closed', e => e.preventDefault() )
