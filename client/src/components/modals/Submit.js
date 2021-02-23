import React from 'react'
import {Modal, Button, Col, Image, Row} from 'react-bootstrap'
import {useHistory} from "react-router-dom"
import { createOrder } from '../../http/orderAPI'
import { BASKET_ROUTE, ORDER_SUCCESS_ROUTE } from '../../utils/consts'

export const Submit = ({show, onHide, name, surname, region, city, department, delivery, payment, item, phone, user}) => {
    const history = useHistory()
    const yes = async () => {
        await createOrder(name, surname, phone, region, city, department, delivery, payment, item[0].basketId, user.user.email)
        history.push(ORDER_SUCCESS_ROUTE)
    }
    return (
        <Modal
        show={show}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите заказ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         Вы действительно подтверждаете заказ?
        </Modal.Body>
        <Modal.Footer>
         <Button onClick={() => yes()}>Да</Button>
          <Button onClick={onHide} variant="secondary">
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
export default Submit