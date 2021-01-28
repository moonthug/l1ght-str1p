module.exports = {
  apps: [
    {
      name: "l1ght-str1p",
      script: "index.js"
    },
    {
      name: "l1ght-str1p-update-daemon",
      script: "update.sh",
      cron: "*/15 * * * *"
    }
  ]
}
