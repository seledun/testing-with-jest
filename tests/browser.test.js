const { Builder, By, until } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5); // 5 minuter

// Det här körs innan vi kör testerna för att säkerställa att Firefox är igång
beforeAll(async () => {
console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

// Allra sist avslutar vi Firefox igen
afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

test('peeking an empty stack exactly 42 times in a row adds a good movie to the stack', async () => {
    let stack = await driver.findElement(By.id('peek'));
    for (let i = 0; i < 41; i++) {
        stack.click();
        let text = await driver.findElement(By.id('top_of_stack')).getText();
        expect(text).toEqual("undefined");    
    }
    
    stack.click();
    let text = await driver.findElement(By.id('top_of_stack')).getText();
    expect(text).toEqual("Hitchhiker's guide to the galaxy")
});

describe('Clicking "Pusha till stacken"', () => {
    it('should open a prompt box', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        let alert = await driver.switchTo().alert();
        await alert.sendKeys("Bananer");
        await alert.accept();
    });
});