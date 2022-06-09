const axios = require("axios").default;

//return value of prop 'isDone'
function getPropValue(data) {
  //convert to string
  const stringifyData = JSON.stringify(data);
  //cut property with value
  const result = stringifyData.match(/["]+isDone+[":]+[a-z]{4,5}/);

  //if property exists
  if (result[0] !== null) {
    //cut boolean value
    const value = result[0].substring(9);
    return value[0].toUpperCase() + value.substring(1);
  } else {
    return "no matches found!";
  }
}

async function getFormattedResponse(response) {
  const isDone = getPropValue(await response.data);
  return `${response.config.url}: isDone - ${isDone}`;
}

module.exports = { getPropValue, getFormattedResponse };
