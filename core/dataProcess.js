import fs from "fs/promises"
import {INPUT, OUTPUT} from "../constants/file.js"
import { validDate, validCategory, filterMerchants } from "../utils/FilterFunctions.js";
import { sortClosestEachCategory, topOffers } from '../utils/SortFunctions.js';


export const jsonDataProcess = (jsonData, checkinDate) => {
    let offers = jsonData.offers;

    // filter offer: validTo -> valid category -> choose only one closest merchant
    offers = offers.filter(validDate(checkinDate))
    
    offers = offers.filter(validCategory);

    offers = filterMerchants(offers);

    // sort offers base on distance for each category and get the top 2 closest
    offers = sortClosestEachCategory(offers);

    offers = topOffers(offers);


    jsonData.offers = offers;
    return jsonData;
}

export const dataProcess = async (checkinDate) => {
    try {
        const data = await fs.readFile(INPUT, 'utf-8');

        let jsonData = JSON.parse(data);
        jsonData = jsonDataProcess(jsonData, checkinDate);

        await fs.writeFile(OUTPUT, JSON.stringify(jsonData, null, 2), 'utf8');
        console.log("Processing Successfully")
    }
    catch (err) {
      console.error('Error reading the file:', err);

    }
}