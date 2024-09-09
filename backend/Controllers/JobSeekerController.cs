using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopJobs_API.DTOS;
using TopJobs_API.Entities;
using TopJobs_API.Repositories;

namespace TopJobs_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobSeekerController : ControllerBase
    {
        private readonly IJobSeekerRepository _jobSeekerRepository;

        public JobSeekerController(IJobSeekerRepository jobSeekerRepository)
        {
            _jobSeekerRepository = jobSeekerRepository;
        }

        [HttpGet]
        //[Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<JobSeeker>>> GetJobSeekers()
        {
            try
            {
                var jobSeekers = await _jobSeekerRepository.GetAllAsync();
                return Ok(jobSeekers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "JobSeeker,Admin")]
        public async Task<ActionResult<JobSeeker>> GetJobSeeker(int id)
        {
            try
            {
                var jobSeeker = await _jobSeekerRepository.GetByIdAsync(id);
                if (jobSeeker == null)
                {
                    return NotFound("Job Seeker not found.");
                }
                return Ok(jobSeeker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost]
        
        public async Task<ActionResult<JobSeeker>> CreateJobSeeker(JobSeekerDto jobSeekerdto)
        {
            try
            {
                // Check if the UserId is already used by an Employer
                var existingEmployer = await _jobSeekerRepository.GetEmployerByUserId(jobSeekerdto.UserId);
                if (existingEmployer != null)
                {
                    return BadRequest("UserId is already in use by an Employer.");
                }

                // Check if the UserId is already used by another JobSeeker
                var existingJobSeeker = await _jobSeekerRepository.GetJobSeekerByUserId(jobSeekerdto.UserId);
                if (existingJobSeeker != null)
                {
                    return BadRequest("UserId is already in use by another JobSeeker.");
                }

                var jobSeeker = new JobSeeker
                {
                    UserId = jobSeekerdto.UserId,
                    FirstName = jobSeekerdto.FirstName,
                    LastName = jobSeekerdto.LastName,
                    Address = jobSeekerdto.Address,
                    City = jobSeekerdto.City,
                    State = jobSeekerdto.State,
                    Zip = jobSeekerdto.Zip,
                    Phone = jobSeekerdto.Phone,
                    Email = jobSeekerdto.Email,
                    Objective = jobSeekerdto.Objective,
                    Resume = jobSeekerdto.Resume,
                    Skills = jobSeekerdto.Skills,
                    Experience = jobSeekerdto.Experience,
                    Education = jobSeekerdto.Education
                };

                await _jobSeekerRepository.AddAsync(jobSeeker);
                return Ok(jobSeeker);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }


        [HttpPut("{id}")]
        [Authorize(Roles = "JobSeeker")]
        public async Task<IActionResult> UpdateJobSeeker(int id, JobSeekerDto jobSeekerdto)
        {
            try
            {
                var jobSeeker = await _jobSeekerRepository.GetByIdAsync(id);
                if (jobSeeker == null)
                {
                    return NotFound("Job Seeker not found.");
                }

                jobSeeker.Resume = jobSeekerdto.Resume;
                jobSeeker.Skills = jobSeekerdto.Skills;
                jobSeeker.Experience = jobSeekerdto.Experience;
                jobSeeker.Education = jobSeekerdto.Education;

                await _jobSeekerRepository.UpdateAsync(jobSeeker);
                return Ok("Successfully updated");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteJobSeeker(int id)
        {
            try
            {
                await _jobSeekerRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{jobSeekerId}/applications")]
        [Authorize(Roles = "JobSeeker,Admin")]
        public async Task<IActionResult> GetJobsAppliedTo(int jobSeekerId)
        {
            try
            {
                var applications = await _jobSeekerRepository.GetJobsApplied(jobSeekerId);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
    }
}
