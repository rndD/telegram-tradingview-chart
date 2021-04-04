import puppeteer from 'puppeteer';

function waitForFrame(page) {
    let fulfill;
    const promise = new Promise(x => fulfill = x);
    checkFrame();
    return promise;
  
    function checkFrame() {
      const frame = page.frames().find(f => f.name().startsWith('tradingview'));
      if (frame)
        fulfill(frame);
      else
        page.once('frameattached', checkFrame);
    }
}


export async function captureScreenshot(ticker, interval='D') {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1366 });
  let buf = null;
  try {
    await page.goto(`https://charts.st00nsa.workers.dev/?ticker=${ticker}&int=${interval}`);
    await page.waitFor(2000);
    await waitForFrame(page);

    buf = await page.screenshot({
        type: 'jpeg',
        quality: 75,
        omitBackground: true,
    });
    // await page.screenshot({ path: `./screenshots/b.jpeg` });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    console.log(`\n🎉`);
  }

  page.close();

  return buf;
}

captureScreenshot();