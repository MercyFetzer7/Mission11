import { useEffect, useState } from 'react';
import { Book } from './types/Book' // connects to the Book.ts file


function BookList () {
    const[books, setBooks] = useState<Book[]>([]);

    // this gets the data from the API
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('https://localhost:5000/Book/AllBooks');
            const data = await response.json();
            setBooks(data)
        };
        fetchBooks();
    }, []);


    return (
        <>
            <h1>Online Bookstore</h1>
            <br />
            {books.map((b) =>
                <div id='projectCard' className="card" key={b.bookId}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        <ul className="list-unstyled">
                            <li><strong>Author:</strong> {b.author}</li>
                            <li><strong>Publisher:</strong> {b.publisher}</li>
                            <li><strong>ISBN:</strong> {b.isbn}</li>
                            <li><strong>Classification:</strong> {b.classification}</li>
                            <li><strong>Category:</strong> {b.category}</li>
                            <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                            <li><strong>Price:</strong> {b.price}</li>
                        </ul>
                    </div>
                </div>
        )}  
        </>

    );
}

export default BookList