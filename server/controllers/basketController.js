const {BasketDevice} = require('../models/models')
const uuid = require('uuid')
const path = require('path');

class BasketController{
    async create(req, res){
        let {cartId, deviceId, basketId, name, price, image} = req.body
        const basketDevice = await BasketDevice.create({cartId, deviceId, basketId, name, price, image})
        return res.json(basketDevice)
    }
    async getAll(req, res) {
        const {id} = req.params
        const itemsBasket = await BasketDevice.findAll({
            where: {basketId: id}
        })
        return res.json(itemsBasket)
    }
    async destroy(req, res){
        const {id} = req.params
        const delItem = await BasketDevice.destroy({
            where: {id: id}
        })
        return res.json(delItem)
    }
}

module.exports = new BasketController()