//return value of prop 'isDone'
export function getPropValue(data: object): string {
  //convert to string
  const stringifyData: string = JSON.stringify(data);
  //regexp
  const template: RegExp = /["]+isDone+[":]+[a-z]{4,5}/;
  //cut property with value
  const result: string= (stringifyData.match(template)!)[0];
  //cut boolean value
  const value: string = result.substring(9);
  return value[0].toUpperCase() + value.substring(1);
}


type resp = {
  [key: string]: any;
};


//format response to string 'url: isDone: True'
export async function getFormattedResponse(response: resp): Promise<string> {
  //string because of formatting True or False
  const isDone: string = getPropValue(await response.data);
  return `${response.config.url}: isDone - ${isDone}`;
}