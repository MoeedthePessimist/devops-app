const { Builder, Browser, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const assert = require("assert"); //add this

const screen = {
  width: 640,
  height: 480,
};

const localhost = "http://localhost:3002";

// (async function example() {
//   let driver = await new Builder().forBrowser(Browser.CHROME).build();
//   try {
//     await driver.get("https://www.google.com/ncr");
//     await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
//     await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
//   } finally {
//     await driver.quit();
//   }
// })();

// task name input: document.querySelector("#task")
// task assignee input: document.querySelector("#assignee")
// task status select: document.querySelector("#root > div > div > div:nth-child(2) > div > div > div > div > div > form > div:nth-child(2) > div > select")
// task submit button: document.querySelector("#root > div > div > div:nth-child(2) > div > div > div > div > div > form > input")
// task edit button: document.querySelector("#root > div > div > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > div:nth-child(2) > button")
// task delete button: document.querySelector("#root > div > div > div:nth-child(3) > div > table > tbody > tr:nth-child(1) > td:nth-child(4) > div > div:nth-child(3) > button")

let driver = new Builder()
  .forBrowser("chrome")
  // .setChromeOptions(new chrome.Options().headless())
  .build();

const createTaskTestSuccess = async () => {
  try {
    await driver.get(localhost);
    const name = await driver.findElement(By.xpath('//*[@id="task"]'));
    const assignee = await driver.findElement(By.xpath('//*[@id="assignee"]'));
    const status = await driver.findElement(
      By.xpath(
        '//*[@id="root"]/div/div/div[2]/div/div/div/div/div/form/div[2]/div/select'
      )
    );
    const submitBtn = await driver.findElement(
      By.xpath('//*[@id="root"]/div/div/div[2]/div/div/div/div/div/form/input')
    );
    await name.sendKeys("automated task");
    await assignee.sendKeys("moeed");
    await status.sendKeys("Completed");

    await submitBtn.click();
    const text = await driver
      .findElement(By.xpath('//*[@id="message"]'))
      .getText();

    assert.equal(text, "PASSED, TASK CREATED");
    console.log("test passed");
  } catch (err) {
    console.log(err);
    console.log("test failed");
  } finally {
    //close the browser
    await driver.quit();
  }
};

const createTaskTestFail = async () => {
  try {
    await driver.get(localhost);
    // const name = await driver.findElement(By.xpath('//*[@id="task"]'));
    // const assignee = await driver.findElement(By.xpath('//*[@id="assignee"]'));
    // const status = await driver.findElement(
    //   By.xpath(
    //     '//*[@id="root"]/div/div/div[2]/div/div/div/div/div/form/div[2]/div/select'
    //   )
    // );
    const submitBtn = await driver.findElement(
      By.xpath('//*[@id="root"]/div/div/div[2]/div/div/div/div/div/form/input')
    );
    // await name.sendKeys("automted task");
    // await assignee.sendKeys("moeed");
    // await status.sendKeys("Completed");
    await submitBtn.click();

    const text = await driver
      .findElement(By.xpath('//*[@id="message"]'))
      .getText();

    assert.equal(text, "FAILED, PLEASE FILL IN ALL THE FIELDS");
    console.log("test passed");
  } catch (err) {
    console.log("test failed");
  } finally {
    //close the browser
    await driver.quit();
  }
};

const updateTaskTestSuccess = async () => {
  await driver.get(localhost);
  const random_text = "this is a random text";
  setTimeout(async () => {
    try {
      await driver.findElement(By.xpath('//*[@id="edit-btn-0"]')).click();

      await driver
        .findElement(By.xpath('//*[@id="edit-task"]'))
        .sendKeys(Key.chord(Key.CONTROL, "a"), random_text);

      await driver
        .findElement(By.xpath('//*[@id="edit-btn-submit-0"]'))
        .click();

      const text = await driver
        .findElement(By.xpath('//*[@id="td-0"]'))
        .getText();

      console.log(text, random_text);

      assert.equal(text, random_text);
      console.log("test passed");
    } catch (err) {
      console.log(err);
      console.log("test failed");
    } finally {
      //close the browser
      await driver.quit();
    }
  }, 2000);
};

const deleteTaskTestSuccess = async () => {
  await driver.get(localhost);
  setTimeout(async () => {
    try {
      await driver.findElement(By.xpath('//*[@id="delete-btn-0"]')).click();

      setTimeout(async () => {
        try {
          const text = await driver
            .findElement(By.xpath('//*[@id="message"]'))
            .getText();

          console.log(text);

          assert.equal(text, "PASSED, TASK DELETED");
          console.log("test passed");
        } catch (err) {
          console.log(err);
          console.log("test failed");
        } finally {
          //close the browser
          await driver.quit();
        }
      }, 1000);
    } catch (err) {
      console.log(err);
      console.log("test failed");
    } finally {
      //close the browser
      await driver.quit();
    }
  }, 2000);
};

createTaskTestSuccess();

createTaskTestFail();

updateTaskTestSuccess();

setTimeout(() => {
  deleteTaskTestSuccess();
}, 10000);
