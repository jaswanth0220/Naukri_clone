namespace TopJobs_API.DTOS
{
    public class EmployerDto
    {
        public int UserId { get; set; }
        public string CompanyName { get; set; }

        public string CompanyDescription { get; set; }
        public string CompanyLocation { get; set; }

        public string ContactEmail { get; set; }

        public string ContactNumber { get; set; }
    }
}
