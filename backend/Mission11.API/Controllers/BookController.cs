using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.API.Data;

namespace Mission11.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;

        public BookController(BookDbContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? bookTypes = null)
        {
            var query = _bookContext.Books.AsQueryable();
            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));
            }
            
            var totalNumberOfBooks = query.Count();

            var something = query
                .Skip((pageNum - 1) * pageHowMany) // skip number of records
                .Take(pageHowMany) // display the number you want
                .ToList();
            
            
            var someObject = new
            {
                Books = something,
                TotalNumberOfBooks = totalNumberOfBooks
            };
            return Ok(someObject);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _bookContext.Books
                .Select(s => s.Category)
                .Distinct()
                .ToList();
            return Ok(bookTypes);
        }

        // Add a project to the database
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook) 
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }

        // Edit a project in the database
        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook) 
        {
            var existingBook = _bookContext.Books.Find(bookId);
            if (existingBook == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;
            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();
            return Ok(existingBook);
        }

        // Delete a project in the database
        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _bookContext.Books.Find(bookId);

            if (book == null) 
            {
                return NotFound(new { message = "Book not found" });
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent();
        }
        
    }
}
