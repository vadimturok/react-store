import React, {useState, useEffect, useContext} from "react";
import { Container, Col, Image, Row, Card, Button, Popover, OverlayTrigger, Form, Alert } from "react-bootstrap";
import {useParams} from 'react-router-dom'
import { Context } from "../index";
import {  fetchDevices, fetchOneDevice } from "../http/deviceAPI";
import { addItem, getBasket } from '../http/basketAPI'
import {observer} from 'mobx-react-lite'
import { createReview, fetchReviews } from "../http/reviewAPI";
import SuccessBought from '../components/modals/SuccessBought'
import ReviewItem from '../components/ReviewItem'
import { DEVICE_ROUTE } from "../utils/consts";
import {useHistory} from "react-router-dom"

export const DevicePage = observer(() => {
  const {user, device, basket} = useContext(Context)
  const history = useHistory()
  const [dev, setDevice] = useState({info: []})
  const [isBought, setIsBought] = useState(false)
  const [review, setReview] = useState([{text: '', userId: 0}])
  const {id} = useParams()
  const [text, setText] = useState('')
  const [successVisible, setSuccessVisible] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)


  const setInfo = (info) => {
    if(info.length === 0){
      setIsEmpty(true)
      setReview(info)
    }else{
      setReview(info)
    }

  }
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
    fetchReviews(id).then(rev => setInfo(rev))
    user.isAuth ? user.setIsAuth(true) : user.setIsAuth(false)
    fetchDevices(null, null, 1, 20).then(data => {
      device.setDevices(data.rows)
      device.setTotalCount(data.count)
  })
  window.scrollTo(0, 0);
  }, [])

  const seeRec = (itemId) => {
    history.push(DEVICE_ROUTE + '/' + itemId)
    window.location.reload();
    window.scrollTo(0, 0);
  }

  
  
  const additem = async () => {
    getBasket(user.user.id).then(data => addItem(data.id, dev.id, dev.name, dev.price, dev.img))
    setIsBought(true)
    setSuccessVisible(true)
    device.setIsBought(true)
  }

  const addReview = (deviceId, userId, text) => {
    createReview(deviceId, userId, text).then(data => fetchReviews(id).then(rev => setReview(rev)))
    setTrigger(true)
    setText('')
    setIsEmpty(false)
  }
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Войдите в аккаунт</Popover.Title>
      
    </Popover>
  );



  return (
    <div className="p-5">
      <h2>{dev.name}</h2>
      <Row>
        <Col md={3}>
        <Image width={300} height={300} src={process.env.REACT_APP_API_URL + dev.img}/>
        </Col>
        <Col className="d-flex align-items-center" md={6}>
          <div>{dev.text}</div>
        </Col>
        <Col className="d-flex align-items-center" md={3}>
          {user.isAuth ?
          <Card style={{width: 300, height: 300, fontSize: 32, border: '2px solid #E0E0E0'}} className="d-flex flex-column align-items-center justify-content-around">
          <h3>От {dev.price} ₴</h3>
          <Image width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwvmvoj0a97WUW31Ge5WOp5LmU0Nxif5nzw&usqp=CAU"></Image>
          {isBought ? <Button size="lg">Товар в корзине</Button> : <Button style={{color: "white"}} size="lg" onClick={() => additem()} variant="warning">Купить</Button>}
          </Card>
          :
          <Card style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}} className="d-flex flex-column align-items-center justify-content-around">
          <h3>От {dev.price} ₴</h3>
          <Image width={100} height={100} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiwvmvoj0a97WUW31Ge5WOp5LmU0Nxif5nzw&usqp=CAU"></Image>
          <OverlayTrigger trigger="click" placement="right" overlay={popover}>
            <Button size="lg" variant="warning">Купить</Button>
            </OverlayTrigger>
          </Card>
          }
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
          <h1>Характеристики</h1>
          {dev.info.map((info, index) => 
          <Row key={index}>
           <Col style={{height: "40px"}}>
           {info.title}:
           </Col>
           <Col style={{height: "40px"}}>
           {info.description}
           </Col>
           </Row>
            )}
      </Row>
      <div style={{borderBottom: "2px solid #E0E0E0", marginTop: "30px", marginBottom: "20px"}}></div>
        <Row>
          <Col md={6}>
          {user.guest === 'false' && <Form style={{marginLeft: "30px"}}>
            {trigger && <Alert dismissible onClose={() => setTrigger(false)} variant="success">
          Отзыв успешно отправлен!</Alert>}
            <Form.Label>Напишите отзыв о товаре</Form.Label>
            <Form.Control value={text} onChange={e => setText(e.target.value)} style={{width: '500px', marginBottom: '10px'}} as="textarea" rows={3} />
            <Button onClick={() => addReview(dev.id, user.user.id, text)}>Отправить</Button>
          </Form>}
          </Col>  
        </Row>
        <SuccessBought device={dev} show={successVisible} onHide={() => setSuccessVisible(false)}></SuccessBought>
        <h3 style={{textAlign: "center"}}>Отзывы о товаре</h3>
        <div style={{borderBottom: "2px solid #E0E0E0"}}></div>
        {isEmpty && <p style={{marginLeft: "550px", marginTop: "30px", paddingBottom: "30px", color: "#bdbebd", fontSize: "20px"}}>На этот товар пока нет отзывов</p>}
        {review.map((item, index) =>
          <ReviewItem user={user} item={item} key={index}></ReviewItem>
        )}
        <h3 style={{textAlign: "center", marginTop: "40px"}}>Похожие товары</h3>
        <div style={{borderBottom: "2px solid #E0E0E0"}}></div>
        <Row className=" mt-4 d-flex justify-content-center">
         {device.devices.map((item, index) => (
             (dev.typeId === item.typeId && dev.id !== item.id) &&
             <Card className="mr-3" key={index} style={{width: 250, cursor: 'pointer'}} border="#E0E0E0">
                 <Image  className="mt-1" width={248} height={248} src={process.env.REACT_APP_API_URL + item.img}/>
                 <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', borderTop: '1px solid  #E0E0E0', marginTop: '2px'}} className="pl-2 pr-2">{item.name}</div>
                 <h4 className="pl-2 pr-2">{item.price} ₴</h4>
                 <Button  onClick={() => seeRec(item.id)}  style={{fontSize: '20px'}} size="sm">Посмотреть</Button> 
             </Card>
        ))}
        </Row>
    </div>
  );
});
export default DevicePage;
