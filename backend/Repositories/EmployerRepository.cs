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
            try
            {
                return await _context.Employers.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching employers. Please try again later.", ex);
            }
        }

        public async Task<Employer> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Employers.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the employer. Please try again later.", ex);
            }
        }

        public async Task AddAsync(Employer employer)
        {
            try
            {
                _context.Employers.Add(employer);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the employer. Please try again later.", ex);
            }
        }

        public async Task UpdateAsync(Employer employer)
        {
            try
            {
                _context.Employers.Update(employer);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the employer. Please try again later.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var employer = await _context.Employers.FindAsync(id);
                if (employer != null)
                {
                    _context.Employers.Remove(employer);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the employer. Please try again later.", ex);
            }
        }

        public async Task<List<Application>> GetJobApplications(int employerId)
        {
            try
            {
                return await _context.Applications
                                     .Where(a => a.Job.PostedBy == employerId)
                                     .Include(a => a.JobSeeker)
                                     .Include(a => a.Job)
                                     .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching job applications. Please try again later.", ex);
            }
        }

        public async Task<JobSeeker> GetJobSeekerByUserId(int userId)
        {
            return await _context.JobSeekers.FirstOrDefaultAsync(j => j.UserId == userId);
        }

        public Task<Employer> GetEmployerByUserId(int userId)
        {
            return _context.Employers.FirstOrDefaultAsync(e => e.UserId == userId);
        }
    }
}
