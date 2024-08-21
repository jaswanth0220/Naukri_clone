using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TopJobs_API.Entities
{
    public class Job
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Requirements { get; set; }
        public string Location { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal Salary { get; set; }
        [ForeignKey("Employer")]
        public int PostedBy { get; set; } // Foreign Key to Employer
        public DateTime PostDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        [JsonIgnore]
        public Employer Employer { get; set; }
    }
}
