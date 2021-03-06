import { Builder, By, Capabilities, Key, until, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome'
import { chromeCapabilities } from '../browserOptions';

describe('selenium.dev', () => {
    let driver: WebDriver;
    describe('History', () => {
        beforeEach(async () => {
            driver = await new Builder()
                .withCapabilities(chromeCapabilities)
                .setChromeService(new chrome.ServiceBuilder('./webdriver/mac/chrome/chromedriver') )
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
