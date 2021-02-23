import React, {useState, useEffect, useContext} from 'react'
import {Image, Row, Col, Button} from 'react-bootstrap'
import {fetchOneBasketItem,fetchBasketItems, getBasket, addItem} from '../http/basketAPI'
import { DEVICE_ROUTE } from '../utils/consts'
import {useHistory} from "react-router-dom"
import { Context } from '../index'
import { fetchOneDevice } from '../http/deviceAPI'
import {useParams} from 'react-router-dom'


export const OrderItem = ({info, deleteBasketItem}) => {
    const history = useHistory()
    const {user} = useContext(Context)
    return (
        <Row className="mb-3 d-flex align-items-center" style={{borderBottom: "1px solid #E0E0E0", borderLeft: "1px solid #E0E0E0", borderRight: "1px solid #E0E0E0", borderTop: "1px solid #E0E0E0"}} >
            <Col md={3}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + info.image}></Image>
            </Col>
            <Col style={{cursor: 'pointer'}} onClick={() => history.push(DEVICE_ROUTE + '/' + info.deviceId)} md={4}>
                <h5>{info.name}</h5>
            </Col>
            <Col style={{marginLeft: "40px"}} md={2}>
                <h4>{info.price} ₴</h4>
            </Col>
            <Col md={2}>
               <Button onClick={deleteBasketItem}>Убрать</Button> 
            </Col>
        </Row>
    )
}

export default OrderItem