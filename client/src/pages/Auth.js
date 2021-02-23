import React, {useContext, useState, useEffect} from 'react';
import {Container, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import {NavLink, useLocation, useHistory} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {getRole, login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import { createBasket } from '../http/deviceAPI';
import SuccessRegistration from '../components/modals/SuccessRegistration';

const Auth = observer(() => {
    const {user, basket} = useContext(Context)
    const location = useLocation()
    const history = useHistory()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [successVisible, setSuccessVisible] = useState(false)


    const toLog = async () => {
        try {

            let data
            let basketData
            let guest
            data = await login(email, password)
            user.setUser(data)
            basket.setBasket(basketData)
            user.setIsAuth(true)
            user.setGuest('false')
            localStorage.setItem('guest', 'false')
            history.push(SHOP_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
            
    }

    const reg = async () => {
        try {
            let data
            let basketData
            let guest
            data = await registration(email, password, name, surname)
            user.setUser(data)
            user.setIsAuth(true)
            user.setGuest('false')
            localStorage.setItem('guest', 'false')
            history.push(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            {isLogin ?
            
            <Card style={{width: 600}} className="p-5">
            <h2 className="m-auto">Авторизация</h2>
            <Form className="d-flex flex-column">
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш email..."
                    value={email}
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <Form.Control
                    className="mt-3"
                    placeholder="Введите ваш пароль..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                />
                <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                    {isLogin ?
                        <div>
                            Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                        </div>
                        :
                        <div>
                            Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                        </div>
                    }
                   {email === '' || password === '' ?<Button
                        disabled
                        variant={"success"}
                        onClick={toLog}
                    >
                        Войти
                    </Button> :
                    <Button
                    variant={"success"}
                    onClick={toLog}
                >
                    Войти
                </Button>
                    }
                </Row>

            </Form>
        </Card>
        :
        <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">Регистрация</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваше имя..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите вашу фамилию..."
                        value={surname}
                        onChange={e => setSurname(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Введите ваш пароль..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        {name === '' || surname === '' || email === '' || password === '' ? <Button
                            variant={"success"}
                            onClick={reg}
                            disabled
                        >
                            Регистрация
                        </Button> :
                        <Button
                        variant={"success"}
                        onClick={reg}
                    >
                        Регистрация
                    </Button>}
                    </Row>

                </Form>
            </Card>
            }
            <SuccessRegistration show={successVisible} onHide={() => setSuccessVisible(false)}></SuccessRegistration>
        </Container>
    );
});

export default Auth;