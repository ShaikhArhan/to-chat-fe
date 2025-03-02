import { app, BrowserWindow, screen, Menu } from "electron";
import path from "path";
app.on("ready", () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const startScreenWidth = 500, startScreenHeight = 500

    const mainWindow = new BrowserWindow({
        width: startScreenWidth,
        height: startScreenHeight,
        x: width - startScreenWidth,
        y: height - startScreenHeight,
    })
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"))
    // mainWindow.loadURL('http://localhost:5173/')
    // Menu.setApplicationMenu(null);
})
