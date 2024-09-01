namespace TopJobs_API.DTOS
{
    public class JobSeekerDto
    {
        public int UserId { get; set; }
        public string? Resume { get; set; }
        public string? Skills { get; set; }
        public string? Experience { get; set; }
        public string? Education { get; set; }
    }
}
