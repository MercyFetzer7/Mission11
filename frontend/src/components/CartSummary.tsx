import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext";

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();
    
    // Calculate total amount and total items in the cart
    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0); // Sum of all item quantities

    return(
        <div 
            style={{
                position: 'fixed',
                top: '10px',
                right: '20px',
                background: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                fontSize: '16px',
                gap: '10px' // Add some gap between cart icon and total amount
            }}
            onClick={() => navigate('/cart')}
        >
            🛒
            <strong>${totalAmount.toFixed(2)}</strong>
            
            {/* Add Badge for item count */}
            {totalItems > 0 && (
                <span className="badge bg-danger" style={{ fontSize: '14px' }}>
                    {totalItems}
                </span>
            )}
        </div>
    );
}

export default CartSummary;
