using Microsoft.EntityFrameworkCore;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly TopJobsContext _context;

        public EmployerRepository(TopJobsContext context)
        {
            _context = context;
        }

        public async Task<List<Employer>> GetAllAsync()
        {
            return await _context.Employers.ToListAsync();
        }

        public async Task<Employer> GetByIdAsync(int id)
        {
            return await _context.Employers.FindAsync(id);
        }

        public async Task AddAsync(Employer employer)
        {
            _context.Employers.Add(employer);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Employer employer)
        {
            _context.Employers.Update(employer);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var employer = await _context.Employers.FindAsync(id);
            if (employer != null)
            {
                _context.Employers.Remove(employer);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Application>> GetJobApplications(int employerId)
        {
            return await _context.Applications
                                 .Where(a => a.Job.PostedBy == employerId)
                                 .Include(a => a.JobSeeker)
                                 .Include(a => a.Job)
                                 .ToListAsync();
        }

        
    }

}
