namespace TopJobs_API.DTOS
{
    public class JobApplication
    {
        public int ApplicationId { get; set; }
        public int JobId { get; set; }
        public string JobTitle { get; set; }
        public string Status { get; set; }
        public DateTime ApplyDate { get; set; }
    }
}
