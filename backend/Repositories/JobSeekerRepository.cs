using Microsoft.EntityFrameworkCore;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class JobSeekerRepository: IJobSeekerRepository
    {
        private readonly TopJobsContext _context;

        public JobSeekerRepository(TopJobsContext context)
        {
            _context = context;
        }

        public async Task<List<JobSeeker>> GetAllAsync()
        {
            return await _context.JobSeekers.ToListAsync();
        }

        public async Task<JobSeeker> GetByIdAsync(int id)
        {
            return await _context.JobSeekers.FindAsync(id);
        }

        public async Task AddAsync(JobSeeker jobSeeker)
        {
            _context.JobSeekers.Add(jobSeeker);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(JobSeeker jobSeeker)
        {
            _context.JobSeekers.Update(jobSeeker);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var jobSeeker = await _context.JobSeekers.FindAsync(id);
            if (jobSeeker != null)
            {
                _context.JobSeekers.Remove(jobSeeker);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Job>> GetJobsApplied(int jobSeekerId)
        {
            return await _context.Applications.Where(a => a.ApplicantId == jobSeekerId)
                .Include(a => a.Job)
                .Select(a => a.Job)
                .ToListAsync();
        }
    }
}
