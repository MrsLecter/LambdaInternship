const { URL } = require("./data/listOfUrls");
const axios = require("axios").default;
const { getFormattedResponse } = require("./src/utils");

async function toHandleUrl(url, counter = 1) {
  //counter to count the number of recursive calls
  if (counter == 4) return 1;
  try {
    const response = await axios.get(url, {
      //pass without errors 400 and above
      validateStatus: function (status) {
        return status < 400;
      },
    });
    return getFormattedResponse(await response);
  } catch (error) {
    //if error connected with user or server errors
    if (error.response.status) {
      //repeat same request 3 times(every time counter is incremented)
      toHandleUrl(url, (counter += 1));
      console.log(
        `Error during request processing url [${url}] : ${error.response.status} ${error.response.statusText}`
      );
    //handle other types of errors
    } else {
      console.log("ERROR: " + error);
    }
  }
}

async function toStartQueue(URL) {
  let arr = [];
  for (const url of URL) {
    await toHandleUrl(url)
      .then((res) => arr.push(res))
      .catch((err) => console.log(err));
  }
  return arr;
}


toStartQueue(URL)
  .then((res) => console.log(res.join("\n")))
  .catch((err) => console.log(err));
