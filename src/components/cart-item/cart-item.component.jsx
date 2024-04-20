import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action'

import './cart-item.styles.scss';

const CartItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));

	return (
		<div className='cart-item-container'>
			<img src={imageUrl} alt={`${name}`}/>
			<div className='item-details'>
				<span className='name'>{name}</span>
				<span className='price'>{quantity} x ${price}</span>
			</div>
			<div className='cart-remove-button' onClick={clearItemHandler}>&#10005;</div>

		</div>
	)
}

export default CartItem;