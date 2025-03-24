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
        
    }
}
