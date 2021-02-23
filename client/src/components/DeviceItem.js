import React, {useState, useContext} from 'react';
import {Card, Col, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {useHistory} from "react-router-dom"
import { Context } from '../index';
import { addItem, getBasket } from '../http/basketAPI';
import {DEVICE_ROUTE} from "../utils/consts";
import SuccessBought from './modals/SuccessBought'

const DeviceItem = ({dev}) => {
    const history = useHistory()
    const [isBought, setIsBought] = useState(false)
    const {user, device} = useContext(Context)
    const [successVisible, setSuccessVisible] = useState(false)
        const additem = async () => {
        getBasket(user.user.id).then(data => addItem(data.id, dev.id, dev.name, dev.price, dev.img))
        setIsBought(true)
        setSuccessVisible(true)
        device.setIsBought(true)
    }
    return (
        <>
        <Col md={3} className={"mt-3"}>
            <Card style={{width: 250, cursor: 'pointer'}} border="#E0E0E0">
                <Image onClick={() => history.push(DEVICE_ROUTE + '/' + dev.id)} className="mt-1" width={248} height={248} src={process.env.REACT_APP_API_URL + dev.img}/>
                <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderTop: '1px solid 	#E0E0E0', marginTop: '2px'}} className="pl-2 pr-2">{dev.name}</div>
                <h4 className="pl-2 pr-2">{dev.price} ₴</h4>
                {user.isAuth ? isBought ? <Button style={{fontSize: '20px'}} variant="warning" size="sm">Добавлено корзину</Button> : <Button style={{fontSize: '20px'}} size="sm" onClick={() => additem()}>Купить</Button> : <Button disabled style={{fontSize: '20px'}} size="sm" onClick={() => additem()}>Купить</Button>}
            </Card>
        </Col>
        <SuccessBought device={dev} show={successVisible} onHide={() => setSuccessVisible(false)}></SuccessBought>
        </>
    );
};

export default DeviceItem;