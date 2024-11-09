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

                double W0 = school.EarningsOneYear;   // Initial wage in year 1 ($)
                double Wmax = school.EarningsTenYear; // Maximum wage after 10 years ($)
                double D = 300000;    // Total debt ($)
                double r = 0.05;     // Annual interest rate (5%)
                double target = school.EarningsTenYear / 0.04; // Target retirement amount ($)

                var response = new SchoolResponse
                {
                    Institution = school.Institution,
                    Earnings = target,
                    Age = CalculateYearsToRetirement(W0, Wmax, D, r, target)
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

        static double CalculateYearsToRetirement(double W0, double Wmax, double D, double r, double target)
        {
            double total401kBalance = 0;
            double increase = Wmax - W0;
            double wage = W0;

            // Phase 1: First 10 years with wage increase and debt repayment
            for (int year = 1; year <= 10; year++)
            {
                wage += increase * 0.1;  // Wage increases 10% each year
                double contribution = 0.05 * (wage - (D * 0.1));

                // Compound interest on the contribution from the year it was made
                total401kBalance += contribution * Math.Exp(r * (10 - year));
            }

            // After 10 years, no debt and wage is fixed at Wmax
            // Phase 2: From year 11 onward, contributions are based on Wmax
            int n = 11;
            while (total401kBalance < target)
            {
                double contribution = 0.05 * Wmax;
                total401kBalance *= (1 + r); // Crecimiento anual del balance
                total401kBalance += contribution;
                n++; // Interest grows on past contributions
            }

            return n;
        }
    }
}

