using System.ComponentModel.DataAnnotations;

namespace TopJobs_API.Entities
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string UserName { get; set; }

        public string Password { get; set; }
        public string Email { get; set; }

        public string Role { get; set; }
    }
}
