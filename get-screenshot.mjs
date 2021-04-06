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
  const browser = await puppeteer.launch({ headless: true,  args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1366 });
  let buf = null;
  try {
    console.debug(`Open ${ticker} for ${interval}`);
    await page.goto(`https://charts.st00nsa.workers.dev/?ticker=${ticker}&int=${interval}`);
    await page.waitFor(2000);
    console.debug(`Waiting for ${ticker} iframe`);
    await waitForFrame(page);

    buf = await page.screenshot({
        type: 'jpeg',
        quality: 75,
        omitBackground: true,
    });
    console.debug(`Screenshot for ${ticker} ready`);
    // await page.screenshot({ path: `./screenshots/b.jpeg` });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    console.log(`🎉 ${ticker}`);
  }


  browser.close();
  
  return buf;
}

captureScreenshot();