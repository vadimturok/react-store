const {Order} = require('../models/models')
const mailer = require('../nodemailer')
const userController = require('./userController')
const {User} = require('../models/models')

class OrderController{
    async create(req, res){
        let {name, surname, phone, region, city, department, delivery, payment, basketid} = req.body
        const {email} = req.params
        const order = await Order.create({name, surname, phone, region, city, department, delivery, payment, basketid})
        const message = {
            to: email,
            subject: 'Заказ успешно оформлен!',
            text: `Поздравляем! Ваш заказ №${order.id} успешно обработан!`
        }
        mailer(message)
        return res.json(order)
    }
}

module.exports = new OrderController()