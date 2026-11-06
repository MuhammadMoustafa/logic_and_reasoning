const {defineConfig} = require('@playwright/test');
module.exports = defineConfig({
  testDir:'./tests/browser', workers:1,
  // Several tests walk every page and quiz, so their run time grows with the course.
  timeout:120000,
  use:{baseURL:'http://127.0.0.1:4173',launchOptions:{executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}},
  webServer:{command:'npm start',url:'http://127.0.0.1:4173',reuseExistingServer:true},
  reporter:'list'
});
