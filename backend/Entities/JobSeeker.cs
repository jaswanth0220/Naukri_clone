using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;


namespace TopJobs_API.Entities
{
    
    public class JobSeeker
    {
        [Key]
        public int JobSeekerId { get; set; }

        [ForeignKey("User")]

        public int UserId { get; set; } 
        public string? Resume { get; set; }
        public string? Skills { get; set; }
        public string? Experience { get; set; }
        public string? Education { get; set; }



        [JsonIgnore]
        public User User { get; set; }
    }
}
