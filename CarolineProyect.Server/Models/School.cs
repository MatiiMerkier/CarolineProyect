using System.Net;

namespace CarolineProyect.Server
{
    public class School
    {
        public int Id { get; set; }
        public string State { get; set; }
        public string Institution { get; set; }
        public string CredentialType { get; set; }
        public string FieldOfStudy { get; set; }
        public float EarningsOneYear { get; set; }
        public float EarningsTenYear { get; set; }
        public float ReturnOnInvestmentOnTime { get; set; }
        public float ReturnOnInvestmentRisk { get; set; }
    }
}
