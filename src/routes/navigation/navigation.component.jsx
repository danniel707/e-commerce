import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdowm from '../../components/cart-dropdown/cart-dropdown.component'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import Footer from '../../components/footer/footer.component'
import { NavigationContainer, NavLinks, NavLink, Logo, Brand } from './navigation.styles'

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)
  const navigate = useNavigate();
  console.log(currentUser)
  const signOutHandler = () => {   
    navigate('/')       
    signOutUser() 
  }

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to='/'>
          <img src="../../../logo.png" alt="brand"></img>   
        </Logo>
        <Brand to='/'>
          
        </Brand>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutHandler}> SIGN OUT</NavLink>
             ) : (
             <NavLink to='/auth'>
             LOG IN/SIGN IN
            </NavLink>
          )}
           <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdowm />}
      </NavigationContainer>
      <Outlet />{/*Is where all the other pages are contained*/}
      <Footer />
    </Fragment>
  )
}

export default Navigation;