const { URL } = require("../data/listOfUrls");
const axios = require("axios").default;
const { getFormattedResponse } = require("./utils");

const handleUrl = async (url: string, counter = 1): Promise<string> => {
  if (counter == 4) return "error!";
  try {
    const response = await axios
      .get(url, {
        validateStatus: (status: number): boolean => {
          return status < 400;
        },
      })
      .catch((error: any) => {
        throw Error((error as Error).message);
      });
    return getFormattedResponse(await response);
  } catch (error: any) {
    if (error.response.status) {
      handleUrl(url, (counter += 1));
      return `Error during request processing url [${url}] : ${error.response.status} ${error.response.statusText}`;
    } else {
      return "ERROR: " + error;
    }
  }
};

const runQueue = async (URLS: string[]): Promise<string[]> => {
  let arr = [] as string[];
  for (const url of URLS) {
    await handleUrl(url)
      .then((res) => arr.push("" + res))
      .catch((err) => console.log(err));
  }
  return arr;
};

runQueue(URL)
  .then((res) => console.log(res.join("\n")))
  .catch((err) => console.log(err));
