import React from 'react'
import {Row, Image, Col} from 'react-bootstrap'
import image from '../images/test-account.png'

export const ReviewItem = ({item, user}) => {
    return (
       <Row className="ml-5 mr-5 mt-3 pb-2">
           <Col md={0.3}>
           <Image width={70} height={70} src={image}></Image>
           </Col>
           <Col md={5}>
            <h6>{user.user.name}</h6>
            <p>{item.text}</p>
           </Col>
       </Row>
    )
}

export default ReviewItem
