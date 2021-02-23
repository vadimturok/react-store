import React, {useContext, useEffect, useState} from 'react'
import {Container, Button, Col, Row, Image} from 'react-bootstrap'
import { Context } from '../index'
import {observer} from 'mobx-react-lite'
import { fetchBasketItems , fetchOneBasketItem, getBasket} from '../http/basketAPI'
import { fetchDevices } from '../http/deviceAPI'
import BasketItem from '../components/BasketItem'
import {useHistory} from "react-router-dom"
import { ORDER_ROUTE } from '../utils/consts'





export const Basket = observer(() => {
    const {user, basket, device} = useContext(Context)
    const history = useHistory()
    const [item, setItem] = useState([{basketId: 0, deviceId: 0, name: null, price: 0, image: null}])
    let total = 0
    const deleteBasketItem = (deev) => {
        fetchOneBasketItem(deev).then(i => getBasket(user.user.id).then(info => fetchBasketItems(info.id).then(data => setItem(data))))
    }
    useEffect(() => {
        getBasket(user.user.id).then(info => fetchBasketItems(info.id).then(data => setItem(data))) 
    },[])

    return(
        <Container>
            <h1 className="mb-5">Ваша корзина</h1>
            {item.map((inf, index) => 
                <BasketItem device={device} deleteBasketItem={() => deleteBasketItem(inf.id)} className="mb-5" key={index} info={inf}>
                </BasketItem> 
            )}
            <h4>Всего: {total = item.reduce((a,x) => a += x.price, 0)} ₴</h4>
            {total !== 0 && <Button style={{marginBottom: "30px"}} onClick={() => history.push(ORDER_ROUTE)} size="lg">Оформить заказ</Button>}
        </Container>
    )
    
})

export default Basket
