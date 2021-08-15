import { Builder, By, WebDriver } from 'selenium-webdriver';
import { firefoxCapabilities } from '../browserOptions'
jest.setTimeout(60000);

describe('selenium.dev', () => {
    let driver: WebDriver;
    describe('History', () => {
        beforeEach(async () => {
            driver = await new Builder()
                .usingServer('http://localhost:4444')
                .withCapabilities(firefoxCapabilities)
                .build()
            await driver.get('https://www.selenium.dev/')
        })

        afterEach(() => {
            driver.quit();
        })

        it('should have a link to W3C Recommendation', async () => {
            await driver.findElement(By.css("a.selenium-webdriver")).click();
            expect(await driver.getCurrentUrl()).toBe('https://www.selenium.dev/documentation/webdriver/');
            const w3cLink = await driver.findElement(By.linkText('W3C Recommendation'));

            expect(await w3cLink.getAttribute('href')).toBe('https://www.w3.org/TR/webdriver1/');
        })
    })
})
