const { URL } = require("./dist/data/listOfUrls");
const { getPropValue } = require("./dist/utils");
const axios = require("axios").default;

const getPromiseArr = (urls) => {
  try {
    const promises = urls.map(
      async (url) =>
        await axios.get(url, {
          validateStatus: function (status) {
            return status < 400;
          },
        }),
    );
    return promises;
  } catch (error) {
    throw new Error(err.message);
  }
};

const retryAndReturnOnlyFulfilled = async (failedUrls) => {
  try {
    const failedPromises = await getPromiseArr(failedUrls);
    const results = await Promise.allSettled(failedPromises);
    const fulfilledPromises = results.filter(
      (result) => result.status === "fulfilled",
    );
    if (fulfilledPromises.length) {
      return fulfilledPromises;
    }
    return [];
  } catch (err) {
    throw new Error(err.message);
  }
};

const runPromises = async (arrayOfPromises, urls) => {
  let restUrls = urls;
  try {
    const results = await Promise.allSettled(arrayOfPromises);

    const fulfilledPromises = results.filter(
      (result) => result.status.localeCompare("fulfilled") === 0,
    );

    fulfilledPromises.forEach((object) => {
      let index = restUrls.indexOf(object.value.config.url);
      restUrls.splice(index, 1);
    });

    let rejectedPromisesAmount = restUrls.length;

    let resubmissionData = [];

    for (let i = 0; i < 3; i++) {
      resubmissionData = retryAndReturnOnlyFulfilled(restUrls);
      if (resubmissionData.length) {
        rejectedPromisesAmount -= resubmissionData.length;
        resubmissionData.forEach((object) => {
          let index = restUrls.indexOf(object.value.config.url);
          restUrls.splice(index, 1);
        });
        fulfilledPromises.push(...resubmissionData);
        if (!rejectedPromisesAmount) break;
      }
    }

    console.error(
      `Error! ${rejectedPromisesAmount} promise(-s) rejected ! Url(-s): ${restUrls}`,
    );
    return fulfilledPromises;
  } catch (err) {
    throw Error(err.message);
  }
};

const getFormattedResponse = (responsesArr) => {
  let counter = { true: 0, false: 0 };
  return responsesArr.map((response, index) => {
    if (index === responsesArr.length - 1) {
      return `Значений True: ${counter.true}  Значений False: ${counter.false}`;
    }
    const isDone = getPropValue(response.value.data);
    isDone === "True" ? (counter.true += 1) : (counter.false += 1);
    return `${response.value.config.url}: isDone - ${isDone}`;
  });
};

const getRequest = async (urls) => {
  const promisesArr = await getPromiseArr(urls);
  const promisesResponseObject = await runPromises(promisesArr, URL);
  return getFormattedResponse(promisesResponseObject);
};

getRequest(URL)
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
