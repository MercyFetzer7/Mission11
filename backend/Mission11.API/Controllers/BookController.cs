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
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1)
        {
            var something = _bookContext.Books
                .Skip((pageNum - 1) * pageHowMany) // skip number of records
                .Take(pageHowMany) // display the number you want
                .ToList();
            
            var totalNumberOfBooks = _bookContext.Books.Count();
            
            var someObject = new
            {
                Books = something,
                TotalNumberOfBooks = totalNumberOfBooks
            };
            return Ok(someObject);
        }

        [HttpGet("FictionBooks")]
        public IEnumerable<Book> GetFictionBooks()
        {
            var something = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
            return something;
        }
        
    }
}
