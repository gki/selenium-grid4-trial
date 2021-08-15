import { Capabilities } from 'selenium-webdriver';

const baseParams = {
    args: [
        '--headless',
        '--disable-gpu',
        '--window-size=1024,768'
      ],
      w3c: false
}
export const firefoxCapabilities: Capabilities = Capabilities.firefox()
firefoxCapabilities.set('firefoxOptions', baseParams)


export const chromeCapabilities: Capabilities = Capabilities.chrome()
chromeCapabilities.set('chromeOptions', baseParams)


export const edgeCapabilities: Capabilities = Capabilities.edge()
chromeCapabilities.set('edgeOptions', baseParams)
