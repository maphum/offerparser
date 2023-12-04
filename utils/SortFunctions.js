
export const sortClosestEachCategory = (offers) => {

    // map hold closest offer for each category
    let map = {}
    offers.forEach(offer => {
        let cate = offer.category;
        if (map[cate] && map[cate].merchants[0].distance > offer.merchants[0].distance) {
            map[cate] = offer
        }
        else if (map[cate] == undefined) {
            map[cate] = offer
        }
    })

    // turn object to array
    return Object.values(map)
}

export const topOffers = (offers) => {
    offers.sort((offer1, offer2 )=> offer1.merchants[0].distance - offer2.merchants[0].distance)
    
    return offers.slice(0,2) 
}