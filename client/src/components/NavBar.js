import React, {useContext} from 'react'
import { Context } from '../index'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE } from '../utils/consts'
import {NavLink} from 'react-router-dom'
import {Button, Image} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {useHistory} from 'react-router-dom'
import image from '../images/test-account.png'

export const NavBar = observer(({}) => {
    const {user, device} = useContext(Context)
    const history = useHistory()
    const role = user.user.role

    const logOut = () => {
        user.setGuest(true)
        localStorage.setItem('guest', user.guest)
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('surname')
        user.setUser({})
        user.setIsAuth(false)
        history.push(LOGIN_ROUTE)
    }
    const reset = () => {
        history.push(BASKET_ROUTE)
        device.setIsBought(false)
    }

    return (
        <Navbar className="pl-5 pr-5" sticky="top" bg="dark" variant="dark">
        
                <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>ELECTRONICS</NavLink>
        {

            user.isAuth ? <Nav className="ml-auto" style={{color: 'white'}}>
                {role === 'ADMIN' && <Button onClick ={() => history.push(ADMIN_ROUTE)}>Администратор</Button>}
          <Nav.Link onClick={() => logOut()}>Выйти</Nav.Link>
          <Nav.Link onClick={() => reset()}>Корзина</Nav.Link>
          {device.isBought && <span style={{width: "15px", height: "15px", backgroundColor: "red", borderRadius: "50%"}}></span>}
            <Image onClick={() => history.push(PROFILE_ROUTE)} style={{cursor: 'pointer'}} className="ml-3" src={image} width={40} height={40}></Image>
        </Nav>
        :
        <Nav className="ml-auto" style={{color: 'white'}}> 
            <Nav.Link onClick={() => history.push(LOGIN_ROUTE)}>Авторизация</Nav.Link>
        </Nav>
        }
            
        
        
      </Navbar>
    )
})
export default NavBar
