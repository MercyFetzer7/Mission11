import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalNumberOfBooks: number;
}

const API_URL = 'https://mission13-fetzer-backend2.azurewebsites.net/Book';

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
): Promise<FetchBooksResponse> => {
    try { // what is being executed
        const categoryParams = selectedCategories
        .map((cat) => `titles=${encodeURIComponent(cat)}`)
        .join('&');

    const response = await fetch(
        `${API_URL}/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
    );

    // Error handling
    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    return await response.json();
    } catch (error) { // what happens if an error occurs
        console.error('Error fetching books:', error)
        throw error;
    }
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });
        if (!response.ok) {
            throw new Error('Failed to add books');
        }
        return await response.json();
    } catch (error) {
        console.error('Error adding books', error)
        throw error;
    }
};

export const updateBook = async (bookId: number, updatedBook: Book) : Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });
        return await response.json();

    } catch (error) {
        console.error('Error updating books', error);
        throw error
    }
};

export const deleteBook = async (bookId: number) : Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`,
            {
                method: "DELETE"
            }
        );
        if (!response.ok) {
            throw new Error('Failed to delete books')
        }
    } catch (error) {
        console.error('Error deleting books:', error)
        throw error
    }    
};