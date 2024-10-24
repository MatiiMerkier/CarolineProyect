using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace CarolineProyect.Server.Services
{
    public class ExcelService
    {
        private readonly string _filePath;

        public ExcelService(string filePath)
        {
            _filePath = filePath;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
        }
        public List<School> GetSchoolsFromExcel()
        {
            List<School> schools = new List<School>();

            FileInfo fileInfo = new FileInfo(_filePath);
            using (ExcelPackage package = new ExcelPackage(fileInfo))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];

                int rowCount = worksheet.Dimension.Rows;
                int colCount = worksheet.Dimension.Columns;

                for (int row = 2; row <= rowCount; row++)
                {
                    School school = new School
                    {
                        Id = row - 1,
                        State = worksheet.Cells[row, 1].Text,        
                        Institution = worksheet.Cells[row, 2].Text,
                        CredentialType = worksheet.Cells[row, 3].Text,
                        FieldOfStudy = worksheet.Cells[row, 4].Text,
                        EarningsOneYear = float.Parse(worksheet.Cells[row, 5].Text),
                        EarningsTenYear = float.Parse(worksheet.Cells[row, 6].Text),
                        ReturnOnInvestmentOnTime = float.Parse(worksheet.Cells[row, 7].Text),
                        ReturnOnInvestmentRisk = float.Parse(worksheet.Cells[row, 8].Text),
                    };

                    schools.Add(school);
                }
            }

            return schools;
        }
    }
}
