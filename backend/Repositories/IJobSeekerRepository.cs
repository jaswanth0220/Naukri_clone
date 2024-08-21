using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public interface IJobSeekerRepository
    {
        Task<List<JobSeeker>> GetAllAsync();
        Task<JobSeeker> GetByIdAsync(int id);
        Task AddAsync(JobSeeker jobSeeker);
        Task UpdateAsync(JobSeeker jobSeeker);
        Task DeleteAsync(int id);
        Task <List<Job>> GetJobsApplied(int jobSeekerId);
    }
}
