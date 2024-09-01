using System.ComponentModel.DataAnnotations.Schema;

namespace TopJobs_API.DTOS
{
    public class ApplicationDto
    {
        
        public int JobId { get; set; }
        public int ApplicantId { get; set; }
        public string Status { get; set; }
        public DateTime ApplyDate { get; set; }
    }
}
