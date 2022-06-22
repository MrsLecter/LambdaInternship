var LangCost;
(function (LangCost) {
    LangCost[LangCost["ua"] = 0.05] = "ua";
    LangCost[LangCost["ru"] = 0.05] = "ru";
    LangCost[LangCost["en"] = 0.12] = "en";
})(LangCost || (LangCost = {}));
;
// return price, time, deadline, deadline date
function getCost(language, signCount, docType) {
    var sign_cost = ((signCount * LangCost[language]) < (LangCost[language] * 1000)) ? (LangCost[language] * 1000) : (signCount * LangCost[language]);
    if (docType === "other") {
        sign_cost += sign_cost * 0.2;
    }
    return sign_cost;
}
;
console.log(getCost('ua', 50, 'docx'));
