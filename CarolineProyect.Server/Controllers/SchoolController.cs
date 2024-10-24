using CarolineProyect.Server.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

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
        public List<School> GetAll(int skip = 0)
        {
            return _schools.Skip(skip).Take(20).ToList();
        }

        [HttpGet("filter")]
        public List<School> Filter(string filter)
        {
            var results = _schools.Where(x => x.Institution.ToLower().Contains(filter.ToLower()) || x.FieldOfStudy.ToLower().Contains(filter.ToLower())).Take(20).ToList();
            return results;
        }

        [HttpPost("compare")]
        public List<School> Compare(List<int> ids)
        {
            var selectedList = new List<School>();
            foreach(int id in ids)
            {
                var school = _schools.Where(x => x.Id.Equals(id)).FirstOrDefault();
                selectedList.Add(school);
            }
            
            // MATH


            return _schools;
        }
    }
}
