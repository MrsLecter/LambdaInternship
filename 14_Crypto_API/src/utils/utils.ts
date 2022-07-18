import {objectRate} from './types';

export const getAverage = (arr: objectRate[]) => {
    let avg : {[index: string]:any} = arr[0];
    for(let i = 1; i < arr.length; i++){
       for (const [key, value] of Object.entries(arr[i])) {
            if(key.localeCompare('timestamp') !== 0){
                avg[key] = +avg[key]+ +value;
                if(i === arr.length-1){
                    avg[key] = (+avg[key]/(arr.length)).toFixed(5);
                }
            }
           
       }
    }
    return avg;
}