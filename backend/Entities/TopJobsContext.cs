using Microsoft.EntityFrameworkCore;

namespace TopJobs_API.Entities
{
    public class TopJobsContext:DbContext
    {
        private  IConfiguration _configuration;

        public TopJobsContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Job> Jobs { get; set; }    
        public DbSet <JobSeeker> JobSeekers { get; set; }
        public DbSet <Employer> Employers { get; set; }
        public DbSet <Application> Applications { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("TopJobsConnection"));
        }
    }
}
