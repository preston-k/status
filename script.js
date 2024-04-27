let clicks = 0
document.querySelector('#link').addEventListener('click', () => {
  clicks += 1
  console.log('Clicks: '+clicks)
  if (clicks >= 5) {
    location.replace('/log.html')
  }
  setTimeout(() => {
    clicks = 0
    console.log('Switch timed out. Clicks set to: '+clicks)
  }, 3000)
})