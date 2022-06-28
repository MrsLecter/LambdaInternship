enum LangCost {
    'ua'=0.05,
    'ru'=0.05,
   'en'=0.12
};

type mime = "none"|"doc"|"docx"|"rtf"|"other";
type lang = "ua" | "ru" | "en";

// return price, time, deadline, deadline date
export function getCost(language: lang, signCount: number, docType: mime): number{
    let sign_cost = ((signCount * LangCost[language]) < (LangCost[language]* 1000))? (LangCost[language] * 1000) :(signCount *LangCost[language]) ;
    const percent = 0.2;
    if(docType === "other"){
        sign_cost += sign_cost * percent;
    }
    return +sign_cost.toFixed(3);
};

