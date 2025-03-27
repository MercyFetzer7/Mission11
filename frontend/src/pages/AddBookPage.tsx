import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";


function AddBookPage () {
    const navigate = useNavigate();
    const {title, bookId, price} = useParams();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState<number>(1);  // Track quantity


    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId : Number(bookId),
            title: title || "No Book Found",
            price : Number(price),
            quantity,
            subtotal: 0
        }
        addToCart(newItem);
        navigate('/cart') 
    }
    return(
        <>
            <WelcomeBand />
            <h2>Add {title} to your cart</h2>
            <div>
                <input type="number" placeholder="Enter quantity here" value={quantity} onChange={(x) => setQuantity(Math.max(1, Number(x.target.value)))} min='1'/>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate('/books')}>Go Back</button>
            {/* I you were to do navigate(-1) it would take you back to the last page you were on */}
        </>
    );
}

export default AddBookPage