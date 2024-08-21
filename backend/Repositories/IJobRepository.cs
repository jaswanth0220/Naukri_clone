using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public interface IJobRepository
    {
        Task<List<Job>> GetAllAsync();
        Task<Job> GetByIdAsync(int id);
        Task AddAsync(Job job);
        Task UpdateAsync(Job job);
        Task DeleteAsync(int id);
    }
}
