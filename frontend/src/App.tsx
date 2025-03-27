import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BooksPage from './pages/BooksPage'
import CartPage from './pages/CartPage'
import AddBookPage from './pages/AddBookPage'
import { CartProvider } from './context/CartContext'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This ensures JS components work


function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BooksPage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/addbook/:title/:bookId/:price' element={<AddBookPage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
