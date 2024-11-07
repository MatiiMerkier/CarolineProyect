using CarolineProyect.Server.Services;
using MathNet.Numerics;
using Microsoft.AspNetCore.Mvc;
using System.Net.Cache;
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
        public object Compare([FromBody] List<int> ids)
        {
            var selectedList = new List<SchoolResponse>();
            foreach(int id in ids)
            {
                var school = _schools.Where(x => x.Id.Equals(id)).FirstOrDefault();

                var N = Calculation(school);

                var response = new SchoolResponse
                {
                    Institution = school.Institution,
                    Earnings = school.EarningsTenYear / 0.04,
                    Age = Math.Round(N) + 22
                };

                selectedList.Add(response);
            }

            object result = new
            {
                result = selectedList,
                status = true
            };

            return result;
        }

        private double Calculation(School school) {
            double MAX_WAGE = school.EarningsTenYear; ; 
            double TOTAL_DEBT = 20000; // Ejemplo de valor


            double initialValue = school.EarningsOneYear;
            double increment = (school.EarningsTenYear - school.EarningsOneYear) / 10; 
            double WAGETOTALAFTERFIRST10YEARS = 0;

            for (int i = 0; i <= 10; i++)
            {
                WAGETOTALAFTERFIRST10YEARS += initialValue + (increment * i);
            }


            // Definir la función integral en términos de N
            Func<double, double> integralFunction = (double N) =>
            {
                return Integrate.OnClosedInterval(x =>
                    (WAGETOTALAFTERFIRST10YEARS * 0.05) +
                    (MAX_WAGE * 0.05 * N) -
                    (TOTAL_DEBT + (MAX_WAGE / 0.04)),
                    10, N);
            };

            // Resolver para encontrar N cuando la integral sea igual a 0
            double targetValue = 0;
            double nLower = 10;
            double nUpper = 100; // Ajustar el límite superior según sea necesario
            double tolerance = 1e-5;
            double nResult = FindN(integralFunction, targetValue, nLower, nUpper, tolerance);

            return nResult;

        }

        static double FindN(Func<double, double> function, double target, double lower, double upper, double tolerance)
        {
            double mid = 0;
            while ((upper - lower) > tolerance)
            {
                mid = (lower + upper) / 2;
                double result = function(mid);

                if (Math.Abs(result - target) < tolerance)
                    return mid;

                if (result < target)
                    lower = mid;
                else
                    upper = mid;
            }
            return mid;
        }
    }
}
