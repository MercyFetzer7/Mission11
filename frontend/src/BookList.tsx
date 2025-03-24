import { useEffect, useState } from 'react';
import { Book } from './types/Book' // connects to the Book.ts file


function BookList ({selectedCategories}: {selectedCategories: string[]}) {
    const[books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const[pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');  // Track sort order

    // this gets the data from the API
    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&')
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            setBooks(data.books)
            setTotalItems(data.totalNumberOfBooks)
            setTotalPages(Math.ceil(totalItems/pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum, totalItems, selectedCategories]);

    // Sort books based on the selected order
    const sortedBooks = [...books].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.title.localeCompare(b.title); // Ascending order
        } else {
            return b.title.localeCompare(a.title); // Descending order
        }
    });


    return (
        <>
            <label>
                Sort by Title:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
            </label>
            <br />
            {sortedBooks.map((b) =>
                <div id="projectCard" className="card" key={b.bookId} style={{ width: '700px' }}>
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
        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
        
        {/* builds an array of the number of pages; acts as a for loop */}
        {[...Array(totalPages)].map((_, index) => (
            <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === index + 1}>
                {index + 1}
            </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br />
        <label>
            Results per page:
            <select value={pageSize} onChange={(p) => {setPageSize(Number(p.target.value)); setPageNum(1)}}>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='20'>20</option>
            </select>
        </label>   
        </>
    );
}

export default BookList