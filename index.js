/**
 * Created by tom on 22/03/16.
 */
var app = require('app');
var BrowserWindow = require('browser-window');

app.on('ready',function(){
    var mainWindows = new BrowserWindow({
        width:400,
        height:600
    })
    mainWindows.loadURL('file://'+ __dirname + '/view/index.html');
})