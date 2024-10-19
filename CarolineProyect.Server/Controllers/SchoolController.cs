using CarolineProyect.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarolineProyect.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SchoolController : ControllerBase
    {

        private readonly ILogger<SchoolController> _logger;
        private readonly List<School> _schools;

        public SchoolController(ILogger<SchoolController> logger, ExcelService excelService)
        {
            _logger = logger;
            _schools = excelService.GetSchoolsFromExcel();
        }

        [HttpGet("get-all")]
        public List<School> GetAll()
        {
            return _schools;
        }

        [HttpPost("compare")]
        public List<School> Compare(SchoolRequest request)
        {
            return _schools;
        }
    }
}
