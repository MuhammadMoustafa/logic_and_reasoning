const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir:'./tests/browser', workers:1,
  use:{baseURL:'http://127.0.0.1:4173',launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}},
  webServer:{command:'npm start',url:'http://127.0.0.1:4173',reuseExistingServer:true},
  reporter:'list'
});
