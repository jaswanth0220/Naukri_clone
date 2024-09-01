using Microsoft.EntityFrameworkCore;
using TopJobs_API.DTOS;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class JobRepository : IJobRepository
    {
        private readonly TopJobsContext _context;

        public JobRepository(TopJobsContext context)
        {
            _context = context;
        }

        public async Task<List<Job>> GetAllAsync()
        {
            try
            {
                return await _context.Jobs.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching jobs. Please try again later.", ex);
            }
        }

        public async Task<Job> GetByIdAsync(int id)
        {
            try
            {
                return await _context.Jobs.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the job. Please try again later.", ex);
            }
        }

        public async Task AddAsync(Job job)
        {
            try
            {
                _context.Jobs.Add(job);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the job. Please try again later.", ex);
            }
        }

        public async Task UpdateAsync(Job job)
        {
            try
            {
                _context.Jobs.Update(job);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the job. Please try again later.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var job = await _context.Jobs.FindAsync(id);
                if (job != null)
                {
                    _context.Jobs.Remove(job);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the job. Please try again later.", ex);
            }
        }
        public async Task<IEnumerable<Job>> GetJobsByEmployerId(int employerId)
        {
            return await _context.Jobs
                                 .Where(j => j.PostedBy == employerId)
                                 .ToListAsync();
        }
        public async Task<List<ApplicantDto>> GetApplicantsForJob(int jobId)
        {
            var applicants = await (from application in _context.Applications
                                    join jobSeeker in _context.JobSeekers on application.ApplicantId equals jobSeeker.JobSeekerId
                                    join user in _context.Users on jobSeeker.UserId equals user.UserId
                                    where application.JobId == jobId
                                    select new ApplicantDto
                                    {
                                        ApplicationId = application.ApplicationId, // Select ApplicationId
                                        JobId = application.JobId,
                                        ApplicantId = jobSeeker.JobSeekerId,
                                        Status = application.Status,
                                        ApplyDate = application.ApplyDate,
                                        UserName = user.UserName,
                                        Email = user.Email
                                    }).ToListAsync();

            return applicants;
        }



    }
}

