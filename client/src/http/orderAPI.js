import {$authHost, $host} from "./index";

export const createOrder = async (name, surname, phone, region, city, department, delivery, payment, basketid, email) => {
    const {data} = await $authHost.post(`api/order/${email}`, {name, surname, phone, region, city, department, delivery, payment, basketid})
    return data
}