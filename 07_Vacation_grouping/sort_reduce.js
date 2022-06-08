const data = require('./vacation_shedule.json');

function getShortedData(data){
    let obj;
    let ids = [];
    return data.reduce((result, item) => {
        if(!ids.includes(item.user._id)){

            ids.push(item.user._id);
            obj = {
                "userId": item.user._id,
                "name": item.user.name,
                "weekendDates": [
                    {
                        "startDate": item.startDate,
                        "endDate": item.endDate
                    }
                                ]
                };
            return [...result, obj]
        }else if(ids.includes(item.user._id)){
            result[result.findIndex(elem => elem.userId === item.user._id)].weekendDates.push(
                {
                    "startDate": item.startDate,
                    "endDate": item.endDate
                }
            )
            return result

        }
    }, []);
}
const start = new Date().getTime();
console.log(getShortedData(data));
const end = new Date().getTime();

console.log(`Time spend: ${end - start}ms`)//10ms-15ms