using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace TopJobs_API.Entities
{
    public class Employer
    {
        public int EmployerId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; } 
        public string CompanyName { get; set; }
        public string ContactEmail { get; set; }
        [JsonIgnore]
        public User User { get; set; }
    }
}
