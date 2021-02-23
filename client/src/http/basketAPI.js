import {$authHost, $host} from "./index";


export const addItem = async (basketId, deviceId, name, price, image) => {
    const {data} = await $authHost.post('api/basketDevice', {basketId, deviceId, name, price, image})
    return data;
}

export const fetchBasketItems = async (id) => {
    const {data} = await $host.get(`api/basketDevice/items/${id}`)
    return data
}

export const getBasket = async (id) => {
    const {data} = await $host.get(`api/cart/${id}`)
    return data
}



export const fetchOneBasketItem = async (deviceId) => {
    const {data} = await $host.get(`api/basketDevice/${deviceId}`)
    return data
}