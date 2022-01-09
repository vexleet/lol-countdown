const { app, BrowserWindow, ip } = require('electron')
const fetch = require('electron-fetch').default

function LoLCountdown() {
  let win = undefined;

  this.createWindow = () => {
    win = new BrowserWindow({
      width: 350,
      height: 105,
      frame: false,
      type: 'toolbar'
    })

    win.loadFile('index.html');

    // app.dock.hide();
    win.setAlwaysOnTop(true, "floating");
    win.setVisibleOnAllWorkspaces(true);
    win.setFullScreenable(false);

    // win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    // win.setAlwaysOnTop(true, 'normal');
    // win.setFullScreenable(false);
    //
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
  setInterval(() => {
    fetch('https://127.0.0.1:2999/liveclientdata/allgamedata')
      .then((res) => res.json())
      .then((data) => {
        if (data && BrowserWindow.getAllWindows().length === 0) {
          console.log('Opening Window...')
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
