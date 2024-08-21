using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TopJobs_API.Entities
{
    public class Application
    {
        [Key]
        public int ApplicationId { get; set; }


        [ForeignKey("Job")]
        public int JobId { get; set; } 
        [ForeignKey("JobSeeker")]
        public int ApplicantId { get; set; } 
        public string Status { get; set; } 
        public DateTime ApplyDate { get; set; }
        [JsonIgnore]
        public Job Job { get; set; }
        [JsonIgnore]
        public JobSeeker JobSeeker { get; set; }
    }
}
