import { Builder, By, Capabilities, Key, until, WebDriver } from 'selenium-webdriver';
jest.setTimeout(60000);

const capabilities: Capabilities = Capabilities.firefox()
capabilities.set('firefoxOptions', {
  args: [
    // '--headless',
    '--disable-gpu',
    '--window-size=1024,768'
  ],
  w3c: false
})

// start docker image with below command before run.
// docker run -d -p 4444:4444 -p 7900:7900 --shm-size="2g" selenium/standalone-firefox:4.0.0-rc-1-prerelease-20210804
describe('selenium.dev', () => {
    let driver: WebDriver;
    describe('History', () => {
        beforeEach(async () => {
            driver = await new Builder()
                .usingServer('http://localhost:4444')
                .withCapabilities(capabilities)
                .build()
            await driver.get('https://www.selenium.dev/')
        })

        afterEach(() => {
            driver.quit();
        })

        it('1st card should explain that Selenium was started by 2004', async () => {
            expect(await driver.getCurrentUrl()).toBe('https://www.selenium.dev/');
            await driver.findElement(By.linkText("About Selenium")).click();
            expect(await driver.getCurrentUrl()).toBe('https://www.selenium.dev/about/');
            const fistCard = (await driver.findElements(By.css('main .card')))[0];

            expect(await fistCard.findElement(By.css('h2')).getText()).toBe('History of Selenium');
            expect(await fistCard.findElement(By.css('p')).getText()).toMatch(/.*starts in 2004.*/);
        })
    })
})
