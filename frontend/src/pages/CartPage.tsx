import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage () {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId}>
                                {item.title} - ${item.price.toFixed(2)} x
                                <label style={{ marginLeft: '10px', marginRight: '10px' }}> {item.quantity}</label>
                                = ${item.subtotal.toFixed(2)}
                                <button onClick={() => removeFromCart(item.bookId)} style={{ marginLeft: '10px' }}>Remove</button>
                                <br />
                                <br />
                            </li>
                        ))}
                    </ul>

                    
                )}
            </div>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <br />
            <button>Checkout</button>
            <br />
            <br />
            <button onClick={() => navigate('/books')}>Continue Browsing</button>
        </div>
    );
};

export default CartPage;