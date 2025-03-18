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
        public IEnumerable<Book> GetBooks()
        {
            var something = _bookContext.Books.ToList();
            return something;
        }
        
        [HttpGet("FictionBooks")]
        public IEnumerable<Book> GetFictionBooks()
        {
            var something = _bookContext.Books.Where(b => b.Classification == "Fiction").ToList();
            return something;
        }
        
    }
}
