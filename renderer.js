const BrowserWindow = require('electron').remote.BrowserWindow
const path = require('path')
const dialog = require('electron').remote.dialog

const manageWindowBtn = document.getElementById('manage-window')
manageWindowBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, '/windows/modal.html')
    let win = new BrowserWindow({ width: 400, height: 275 })

    win.on('resize', updateReply)
    win.on('move', updateReply)

    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()

    function updateReply () {
        const manageWindowReply = document.getElementById('manage-window-reply')
        const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`

        manageWindowReply.innerText = message
    }
})

const framelessWindowBtn = document.getElementById('frameless-window')
framelessWindowBtn.addEventListener('click', function(event) {
    let win = new BrowserWindow({
        // transparent: true,
        frame: false
    })
    win.loadURL(`file://${__dirname}/windows/modal.html`);
    win.on('close', function() { win = null })
    win.show()
})

const processCrashBtn = document.getElementById('process-crash')
processCrashBtn.addEventListener('click', function(event) {
    let win = new BrowserWindow({ width: 400, height: 320 })
    win.webContents.on('crashed', function() {
        const options = {
            type: 'info',
            title: 'Rendered process crashed',
            message: 'This process has crashed',
            buttons: ['Reload', 'Close']
        }
        dialog.showMessageBox(options, function(index) {
            if (index === 0) win.reload()
            else win.close()
        })
    })
    win.on('close', function() { win = null })
    win.loadURL(`file://${__dirname}/windows/process-crash.html`)
    win.show()
})

const {ipcRenderer} = require('electron')
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"

ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg)
})
ipcRenderer.send('asynchronous-message', 'ping')
