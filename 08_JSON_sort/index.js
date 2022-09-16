const { URL } = require("./data/listOfUrls");
const axios = require("axios").default;
const { getFormattedResponse } = require("./src/utils");

const handleUrl = async (url, counter = 1) => {
  if (counter == 4) return 1;
  try {
    const response = await axios
      .get(url, {
        validateStatus: function (status) {
          return status < 400;
        },
      })
      .catch((error) => {
        throw Error(error.message);
      });
    return getFormattedResponse(await response);
  } catch (error) {
    if (error.response.status) {
      handleUrl(url, (counter += 1));
      console.log(
        `Error during request processing url [${url}] : ${error.response.status} ${error.response.statusText}`,
      );
    } else {
      console.log("ERROR: " + error);
    }
  }
};

const runQueue = async (URL) => {
  let arr = [];
  for (const url of URL) {
    await handleUrl(url)
      .then((res) => arr.push(res))
      .catch((err) => console.log(err));
  }
  return arr;
};

runQueue(URL)
  .then((res) => console.log(res.join("\n")))
  .catch((err) => console.log(err));
