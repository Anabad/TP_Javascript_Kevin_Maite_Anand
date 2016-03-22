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
    console.log('file://'+ __dirname + '/index.html');
    mainWindows.loadURL('file://'+ __dirname + '/index.html');
})