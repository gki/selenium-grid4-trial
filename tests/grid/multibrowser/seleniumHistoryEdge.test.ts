import { Browser, Builder, By, WebDriver } from 'selenium-webdriver';
import { edgeCapabilities } from '../../browserOptions'

describe('selenium.dev', () => {
    let driver: WebDriver;
    describe('History', () => {
        beforeEach(async () => {
            driver = await new Builder()
                .usingServer('http://localhost:4444')
                .withCapabilities(edgeCapabilities)
                .forBrowser(Browser.EDGE)
                .build()
            await driver.get('https://www.selenium.dev/')
        })

        afterEach(() => {
            driver.quit();
        })

        it('1st card should explain that Selenium was started by 2004', async () => {
            await driver.findElement(By.linkText("About Selenium")).click();
            expect(await driver.getCurrentUrl()).toBe('https://www.selenium.dev/about/');
            const fistCard = (await driver.findElements(By.css('main .card')))[0];

            expect(await fistCard.findElement(By.css('h2')).getText()).toBe('History of Selenium');
            expect(await fistCard.findElement(By.css('p')).getText()).toMatch(/.*starts in 2004.*/);
        })
    })
})
