using Microsoft.EntityFrameworkCore;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly TopJobsContext _context;

        public ApplicationRepository(TopJobsContext context)
        {
            _context = context;
        }

        public async Task<List<Application>> GetAllAsync()
        {
            try
            {
                return await _context.Applications.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while retrieving applications.", ex);
            }
        }

        public async Task<Application> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Applications.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the application with ID {id}.", ex);
            }
        }

        public async Task AddAsync(Application application)
        {
            try
            {
                _context.Applications.Add(application);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the application.", ex);
            }
        }

        public async Task UpdateAsync(Application application)
        {
            try
            {
                _context.Applications.Update(application);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the application.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var application = await _context.Applications.FindAsync(id);
                if (application != null)
                {
                    _context.Applications.Remove(application);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the application with ID {id}.", ex);
            }
        }

        public async Task UpdateStatus(int applicationId, string status)
        {
            try
            {
                var application = await _context.Applications.FindAsync(applicationId);
                if (application != null)
                {
                    application.Status = status;
                    _context.Applications.Update(application);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the status of application with ID {applicationId}.", ex);
            }
        }
    }
}
