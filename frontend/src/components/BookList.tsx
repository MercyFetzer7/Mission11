import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap"; // Import Bootstrap's JS API
import Pagination from "./Pagination";
import { fetchBooks } from "../api/BooksAPI";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories)
                setBooks(data.books)
                setTotalPages(Math.ceil(data.totalNumberOfBooks / pageSize));
            } catch (error) {
                setError((error as Error). message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum, selectedCategories])

    if (loading) return <p>Loading books...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    const sortedBooks = [...books].sort((a, b) =>
        sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

    // Function to manually toggle collapse
    const toggleCollapse = (bookId: number) => {
        const collapseElement = document.getElementById(`collapse${bookId}`);
        if (collapseElement) {
            const collapseInstance = new Collapse(collapseElement);
            collapseInstance.toggle();
        }
    };

    return (
        <>
            <label>
                Sort by Title:
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </label>
            <br />
            {sortedBooks.map((b) => (
                <div id="projectCard" className="card" key={b.bookId} style={{ width: "700px" }}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                        {/* Bootstrap Accordion */}
                        <div className="accordion" id={`accordion${b.bookId}`}>
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={`heading${b.bookId}`}>
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        onClick={() => toggleCollapse(b.bookId)} // Use manual toggle function
                                        aria-expanded="false"
                                        aria-controls={`collapse${b.bookId}`}
                                    >
                                        View Details
                                    </button>
                                </h2>
                                <div
                                    id={`collapse${b.bookId}`}
                                    className="accordion-collapse collapse"
                                    aria-labelledby={`heading${b.bookId}`}
                                    data-bs-parent={`#accordion${b.bookId}`}
                                >
                                    <div className="accordion-body">
                                        <ul className="list-unstyled">
                                            <li><strong>Author:</strong> {b.author}</li>
                                            <li><strong>Publisher:</strong> {b.publisher}</li>
                                            <li><strong>ISBN:</strong> {b.isbn}</li>
                                            <li><strong>Classification:</strong> {b.classification}</li>
                                            <li><strong>Category:</strong> {b.category}</li>
                                            <li><strong>Page Count:</strong> {b.pageCount}</li>
                                            <li><strong>Price:</strong> ${b.price}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success mt-2" onClick={() => navigate(`/addbook/${b.title}/${b.bookId}/${b.price}`)}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
            <Pagination currentPage={pageNum} totalPages={totalPages} pageSize={pageSize} onPageChange={setPageNum} onPageSizeChange={(newSize) => {setPageSize(newSize); setPageNum(1);}}/>
            </>
    );
}

export default BookList;
