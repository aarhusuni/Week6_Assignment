// Import Lighthouse tool
const lighthouse = require('lighthouse').default;

// Import tool that starts Chrome automatically
const chromeLauncher = require('chrome-launcher');

// Start an async function (needed because Lighthouse uses await)
(async () => {

  // Open Chrome in background (headless = invisible browser)
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  });

  // Run Lighthouse on the website
  const result = await lighthouse(
    'https://www.dengamleby.dk/',
    {
      port: chrome.port, // connect Lighthouse to opened Chrome
      onlyCategories: ['performance', 'accessibility'], // only test these 2
    }
  );

  // Get Performance score
  const perf = Math.round(
    result.lhr.categories.performance.score * 100
  );

  // Get Accessibility score
  const access = Math.round(
    result.lhr.categories.accessibility.score * 100
  );

  // Print scores
  console.log('--------------------------------');
  console.log('LIGHTHOUSE RESULTS');
  console.log('--------------------------------');

  console.log('Performance:   ', perf);
  console.log('Accessibility: ', access);

  console.log('--------------------------------');

  // PASS / FAIL rules
  if (perf >= 70) {
    console.log('✅ Performance PASS');
  } else {
    console.log('❌ Performance FAIL');
  }

  if (access >= 80) {
    console.log('✅ Accessibility PASS');
  } else {
    console.log('❌ Accessibility FAIL');
  }

  console.log('--------------------------------');

  // Close Chrome
  await chrome.kill();

})();