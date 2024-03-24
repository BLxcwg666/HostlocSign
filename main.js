const cron = require('node-cron');
const dotenv = require('dotenv').config();
const chrome = require('selenium-webdriver/chrome');
const { By, Builder } = require('selenium-webdriver');


const username = process.env.USERNAME;
const password = process.env.PASSWORD;

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function HostlocSign(username, password) {
    // const driver = new Builder()
    // .forBrowser('chrome')
    // .withCapabilities(Capabilities.chrome())
    // .setChromeOptions(new chrome.Options().headless())
    // .build();

    const options = new chrome.Options();
    options.addArguments('--headless'); // headless
    options.addArguments('--disable-gpu'); // 禁用GPU加速
    options.addArguments('--disable-extensions'); // 禁用扩展
    options.addArguments('--no-sandbox');
    // options.addArguments('--disable-dev-shm-usage'); // 禁用/dev/shm
    // options.addArguments('--disable-features=StylesWithCss=false'); // 禁用CSS加载
    // options.addArguments('--blink-settings=imagesEnabled=false'); // 禁用图片加载
    // options.page_load_strategy = 'eager' // DOM解析完后直接操作
    // options.addArguments(`--user-data-dir=${path.resolve(tempDir)}`);
    // options.addArguments(`--user-agent=${UA}`);
    // options.excludeSwitches(['enable-logging']);
    // options.addArguments('--log-level=OFF');

    driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        await driver.get('https://hostloc.com');
        await driver.findElement(By.id('ls_username')).sendKeys(username);
        await driver.sleep(500);
        await driver.findElement(By.id('ls_password')).sendKeys(password);
        await driver.sleep(500);
        await driver.findElement(By.id('ls_cookietime')).click();
        await driver.findElement(By.css('button.pn.vm')).click();
        await driver.sleep(5000);

        const cookies = await driver.manage().getCookies();

        try {

            for (const cookie of cookies) {
                await driver.manage().addCookie(cookie);
            }

            for (let i = 0; i < 13; i++) {
                await driver.get(`https://hostloc.com/?${random(50000, 65000)}`);
                await driver.sleep(700);

                try {
                    await driver.findElement(By.css('em[class="god"]')).click();
                } catch (error) {
                    console.error('Element not found:', error.message);
                }

                await driver.sleep(random(1500, 2500));
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            await driver.quit();
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
}

console.log('\n=.=\n');
HostlocSign(username, password);

cron.schedule('1 0 * * *', () => {
    console.log('\n=.=\n');
    HostlocSign(username, password);
});