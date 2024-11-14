using Microsoft.AspNetCore.Routing.Constraints;
using System.Net;

namespace CarolineProyect.Server
{
    public class SchoolResponse
    {
        public string Institution { get; set; }
        public double Earnings { get; set; }
        public double Age { get; set; }
        public double ROI { get; set; }
    }
}
