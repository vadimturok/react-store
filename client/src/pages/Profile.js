import React, { useState, useContext, useEffect } from "react";
import {
  Form,
  Container,
  Button,
  Col,
  Image,
  Row,
  Alert,
} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { check, editEmail, editName, editSurname, getRole } from "../http/userAPI";
import { Context } from "../index";
import image from "../images/fbpic_0.jpg";


export const Profile = observer(() => {
  const { user, basket } = useContext(Context);
  const [email, setEmail] = useState(user.user.email);
  const [name, setName] = useState(user.user.name);
  const [surname, setSurname] = useState(user.user.surname);
  const [trigger, setTrigger] = useState(false);

  const setInfo = (email, name, surname) => {
    setEmail(email)
    setName(name)
    setSurname(surname)
  }


  useEffect(() => {
    getRole(user.user.id).then(data => setInfo(data.email, data.name, data.surname))
  }, [])

  const editMail = () => {
    editEmail(user.user.id, email)
    setTrigger(true);
  };
  const editname = () => {
    editName(user.user.id, name)
    setTrigger(true);
  };
  const editsurname = () => {
    editSurname(user.user.id, surname)
    setTrigger(true);
  };
  
  
  return (
    <div className="pl-5">
      <h1>Ваш профиль</h1>
      <Col className="mt-5" md={6}>
        <Row>
          <Col md={4}>
            <Image src={image} width={200} height={200}></Image>
          </Col>
          <Col md={5}>
          <Form.Label>E-mail</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "300px", marginBottom: "3px", height: "30px" }}
              value={email}
            />
            
            <Form.Label>Имя</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              style={{ width: "300px", marginBottom: "3px", height: "30px" }}
              value={name}
            />
            <Form.Label>Фамилия</Form.Label>
            <Form.Control
              onChange={(e) => setSurname(e.target.value)}
              style={{ width: "300px", marginBottom: "3px", height: "30px" }}
              value={surname}
            />
          </Col>
          <Col className="mt-1"  md={1}>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editMail()}>✓</Button>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editname()}>✓</Button>
          <Button size="sm" style={{marginTop: "30px"}} onClick={() => editsurname()}>✓</Button>
          </Col>
        </Row>
        {trigger && (
       <Alert dismissible onClose={() => setTrigger(false)}  variant="success">
       Изменения успешно сохранены!
       </Alert>
      )}
      </Col>
    </div>
  );
});

export default Profile;
