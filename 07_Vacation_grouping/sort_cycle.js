const data = require('./vacation_shedule.json');

function getShortedData(data){
    let shorted_data = {};
    for(let i = 0; i < data.length; i++){
        if(!shorted_data[data[i].user._id]){
        shorted_data[data[i].user._id] = {
            "userId": data[i].user._id,
            "name": data[i].user.name,
            "weekendDates": [
                {
                    "startDate": data[i].startDate,
                    "endDate": data[i].endDate
                }
                            ]
            };
        }else if(shorted_data[data[i].user._id]){
            shorted_data[data[i].user._id].weekendDates.push({
                "startDate": data[i].startDate,
                "endDate": data[i].endDate
            })
        }
    }
    return Object.values(shorted_data);
}
const start = new Date().getTime();
console.log(getShortedData(data));
const end = new Date().getTime();

console.log(`Time spend: ${end - start}ms`)//10ms-16ms
