import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector'
import { setIsCartOpen } from '../../store/cart/cart.action'
import { selectCurrentUser } from '../../store/user/user.selector'
import {ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {

	const dispatch = useDispatch();
	const currentUser = useSelector(selectCurrentUser)
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen))

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			{currentUser ? (<ItemCount>{cartCount}</ItemCount>
				) : (
				<ItemCount>0</ItemCount>
				)
			}
		</CartIconContainer>
	)
}

export default CartIcon;