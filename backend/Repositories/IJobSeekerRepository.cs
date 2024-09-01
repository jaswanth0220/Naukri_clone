using TopJobs_API.DTOS;
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
        Task <List<JobApplication>> GetJobsApplied(int jobSeekerId);
        Task<JobSeeker> GetJobSeekerByUserId(int userId);
        Task<Employer> GetEmployerByUserId(int userId); 

    }
}
