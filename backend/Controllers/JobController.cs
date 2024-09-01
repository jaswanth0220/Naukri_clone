using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopJobs_API.DTOS;
using TopJobs_API.Entities;
using TopJobs_API.Repositories;

namespace TopJobs_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly IJobRepository _jobRepository;

        public JobController(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        [HttpGet]
        [Authorize(Roles = "JobSeeker,Employer,Admin")]

        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            try
            {
                var jobs = await _jobRepository.GetAllAsync();
                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "JobSeeker,Employer,Admin")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            try
            {
                var job = await _jobRepository.GetByIdAsync(id);
                if (job == null)
                {
                    return NotFound("Job not found.");
                }
                return Ok(job);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost]
        [Authorize(Roles = "Employer,Admin")]
        public async Task<ActionResult<Job>> CreateJob(JobDto jobDto)
        {
            try
            {
                var job = new Job
                {
                    PostedBy = jobDto.PostedBy,
                    Title = jobDto.Title,
                    Description = jobDto.Description,
                    Requirements = jobDto.Requirements,
                    Location = jobDto.Location,
                    Salary = jobDto.Salary,
                    PostDate = jobDto.PostDate,
                    ExpiryDate = jobDto.ExpiryDate
                };
                await _jobRepository.AddAsync(job);
                return Ok(job);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> UpdateJob(int id, JobDto jobDto)
        {
            try
            {
                var job = await _jobRepository.GetByIdAsync(id);
                if (job == null)
                {
                    return NotFound("Job not found.");
                }

                job.Title = jobDto.Title;
                job.Description = jobDto.Description;
                job.Requirements = jobDto.Requirements;
                job.Location = jobDto.Location;
                job.Salary = jobDto.Salary;
                job.PostDate = jobDto.PostDate;
                job.ExpiryDate = jobDto.ExpiryDate;

                await _jobRepository.UpdateAsync(job);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            try
            {
                await _jobRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("GetApplicantsForJob/{jobId}")]
        public async Task<ActionResult<List<JobSeeker>>> GetApplicantsForJob(int jobId)
        {
            try
            {
                var applicants = await _jobRepository.GetApplicantsForJob(jobId);

                if (applicants == null || !applicants.Any())
                {
                    return NotFound("No applicants found for this job.");
                }

                return Ok(applicants);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
    }
}
