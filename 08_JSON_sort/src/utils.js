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

//reqursive way to find 'isDone' value
function getPropValueReсursive(data){
    console.log(data)
    let props = Object.keys(data);
    if(props.includes('isDone')){
        return data['isDone']
    }
    for(const prop of props){
        if(typeof (data[prop]) === 'object' && !Array.isArray(data[prop])){
            console.log('>>'+data[prop], )
            return getPropValueReсursive(data[prop])
        }
    }
}

module.exports = { getPropValue, getFormattedResponse };
