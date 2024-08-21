using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public interface IApplicationRepository
    {
        Task<List<Application>> GetAllAsync();
        Task<Application> GetByIdAsync(int id);
        Task AddAsync(Application application);
        Task UpdateAsync(Application application);
        Task DeleteAsync(int id);
        Task UpdateStatus(int applicationId, string status);
    }
}
