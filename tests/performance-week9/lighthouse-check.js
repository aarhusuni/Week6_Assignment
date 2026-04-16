const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  const options = {
    logLevel: 'info',
    output: 'html',
    port: chrome.port,
  };

  const runnerResult = await lighthouse(
    'https://raider-test-site.onrender.com/',
    options
  );

const fs = require('fs');
fs.writeFileSync('lighthouse-report.html', runnerResult.report);
const open = require('open');
await open('lighthouse-report.html');

  const scores = runnerResult.lhr.categories;

  const performance = scores.performance.score * 100;
  const accessibility = scores.accessibility.score * 100;
  const bestPractices = scores['best-practices'].score * 100;
  const seo = scores.seo.score * 100;

  console.log('------ LIGHTHOUSE REPORT ------');
  console.log(`Performance: ${performance}`);
  console.log(`Accessibility: ${accessibility}`);
  console.log(`Best Practices: ${bestPractices}`);
  console.log(`SEO: ${seo}`);

  let passed = true;

  if (performance < 60) passed = false;
  if (accessibility < 80) passed = false;

  console.log('------------------------------');

  if (passed) {
    console.log('✅ PASS Performance Budget');
  } else {
    console.log('❌ FAIL Performance Budget');
  }

  await chrome.kill();
})();