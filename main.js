const {app, BrowserWindow} = require('electron')

const manageWindowBtn = document.getElementById('manage-window')

manageWindowBtn.addEventListener('click', function(event) {
    let win = new BrowserWindow({width: 400, height: 275})
    win.on('resize', updateReply)
    win.on('move', updateReply)
    win.on('close', function() { win = null })
    win.loadURL(`file://${__dirname}/index.html`)
    win.show()
})

function updateReply() {
    const manageWindowReply = document.getElementById('manage-window-reply')
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`

    manageWindowReply.innerText = message
}

// function createWindow() {
//     win = new BrowserWindow({width: 800, height: 600})
//     win.loadURL(`file://${__dirname}/index.html`)
//     win.webContents.openDevTools()
//     win.on('close', () => win = null)
// }

// app.on('ready', createWindow)
// app.on('window-all-closed', () => {
//     if(process.platform !== 'darwin') {
//         app.quit()
//     }
// })
// app.on('activate', () => {
//     if (win == null) {
//         createWindow()
//     }
// })
