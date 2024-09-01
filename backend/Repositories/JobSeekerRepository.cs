using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using TopJobs_API.DTOS;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class JobSeekerRepository : IJobSeekerRepository
    {
        private readonly TopJobsContext _context;

        public JobSeekerRepository(TopJobsContext context)
        {
            _context = context;
        }

        public async Task<List<JobSeeker>> GetAllAsync()
        {
            try
            {
                return await _context.JobSeekers.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching job seekers. Please try again later.", ex);
            }
        }

        public async Task<JobSeeker> GetByIdAsync(int id)
        {
            try
            {
                return await _context.JobSeekers.FindAsync(id);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the job seeker. Please try again later.", ex);
            }
        }

        public async Task AddAsync(JobSeeker jobSeeker)
        {
            try
            {
                _context.JobSeekers.Add(jobSeeker);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while adding the job seeker. Please try again later.", ex);
            }
        }

        public async Task UpdateAsync(JobSeeker jobSeeker)
        {
            try
            {
                _context.JobSeekers.Update(jobSeeker);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the job seeker. Please try again later.", ex);
            }
        }

        public async Task DeleteAsync(int id)
        {
            try
            {
                var jobSeeker = await _context.JobSeekers.FindAsync(id);
                if (jobSeeker != null)
                {
                    _context.JobSeekers.Remove(jobSeeker);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the job seeker. Please try again later.", ex);
            }
        }

        public async Task<List<JobApplication>> GetJobsApplied(int jobSeekerId)
        {
            try
            {
                var applications = await (from application in _context.Applications
                                          join job in _context.Jobs on application.JobId equals job.JobId
                                          where application.ApplicantId == jobSeekerId
                                          select new JobApplication
                                          {
                                              ApplicationId = application.ApplicationId,
                                              JobId = job.JobId,
                                              JobTitle = job.Title,
                                              Status = application.Status,
                                              ApplyDate = application.ApplyDate
                                          }).ToListAsync();
                return applications;

            }
            catch (Exception ex)
            {
                //return the error
                throw new Exception("an error occured while getting the applications", ex);

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
