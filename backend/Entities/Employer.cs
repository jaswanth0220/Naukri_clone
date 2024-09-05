using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
namespace TopJobs_API.Entities
{
    public class Employer
    {
        [Key]
        public int EmployerId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; } 
        public string CompanyName { get; set; }

        
        public User User { get; set; }
    }
}
