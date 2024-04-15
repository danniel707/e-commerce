import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdowm from '../../components/cart-dropdown/cart-dropdown.component'

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import { selectIsCartOpen } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { signOutUser } from '../../utils/firebase/firebase.utils';

import { NavigationContainer, NavLinks, NavLink, Logo } from './navigation.styles'

const Navigation = () => {

  const currentUser = useSelector(selectCurrentUser)
  const isCartOpen = useSelector(selectIsCartOpen)

  return (
    <Fragment>
      <NavigationContainer>
        <Logo to='/'>
          <CrwnLogo className='logo'/>
        </Logo>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {
            currentUser ? (
              <NavLink as='span' onClick={signOutUser}> SIGN OUT</NavLink>
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
    </Fragment>
  )
}

export default Navigation;