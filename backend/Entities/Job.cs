using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace TopJobs_API.Entities
{
    public class Job
    {
        [Key]
        public int JobId { get; set; }
        [ForeignKey("Employer")]
        public int PostedBy { get; set; } // Foreign Key to Employer
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Requirements { get; set; }
        public string? Location { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Salary { get; set; }
        
        public DateTime? PostDate { get; set; }
        public DateTime? ExpiryDate { get; set; }

        public Employer Employer { get; set; }
    }
}
