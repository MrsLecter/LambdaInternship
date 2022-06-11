import {URL} from "./data/listOfUrls";
import axios from 'axios';
import  {getFormattedResponse} from "./src/utils";

async function toHandleUrl(url:string, counter:number = 1): Promise<void | string>{
  //counter to count the number of recursive calls
  if (counter == 4) return '1';
  try {
    type resp = {
      [key: string]: any;
    };
    const response: resp  = await axios.get(url, {
      //pass without errors 400 and above
      validateStatus: function (status: number): boolean {
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


async function toStartQueue(URL: Array<string>): Promise<Array<string>> {
  let arr: Array<string> = [];
  for (const url of URL) {
    let resp: string | void = await toHandleUrl(url)
      .then((res:string|void):string => res+'')
      .catch((err) => console.log(err));
    arr.push(resp + '');
  }
  return arr;
}


toStartQueue(URL)
  .then((res: Array<string>):void => console.log(res.join("\n")))
  .catch((err) => console.log(err));
