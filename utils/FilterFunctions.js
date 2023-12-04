import { CATEGORIES_ID, VALID_CATEGORIES } from "../constants/categories.js"


export const validDate = (checkinDate) => {
    const checkinday = new Date(checkinDate)
    return (offer) => {
        let diff = new Date(offer.valid_to) - checkinday;
        diff /= (1000 * 60 * 60 * 24);
        return diff > 5; 
    }

}

export const validCategory = offer => {
    // Mapping from valid categories to id 
    let cate_id = VALID_CATEGORIES.map(cate => CATEGORIES_ID[cate]);

    // check offer's category is valid
    return cate_id.includes(offer.category)
}

export const filterMerchants = (offers) => {

    offers.forEach(offer => {
        // find  the closest merchant
        let merchant_min = offer.merchants.reduce((minMerchant, currentMerchant) => (currentMerchant.distance < minMerchant.distance ? currentMerchant : minMerchant));
        offer.merchants = [merchant_min]
    })

    return offers; 
}