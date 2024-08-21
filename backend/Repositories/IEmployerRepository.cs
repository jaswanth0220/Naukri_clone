using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public interface IEmployerRepository
    {
        Task<List<Employer>> GetAllAsync();
        Task<Employer> GetByIdAsync(int id);
        Task AddAsync(Employer employer);
        Task UpdateAsync(Employer employer);
        Task DeleteAsync(int id);
        Task<List<Application>> GetJobApplications(int employerId);
    }
}
