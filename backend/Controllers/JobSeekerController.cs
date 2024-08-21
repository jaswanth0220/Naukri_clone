using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<List<JobSeeker>>> GetJobSeekers()
        {
            var jobSeekers = await _jobSeekerRepository.GetAllAsync();
            return Ok(jobSeekers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JobSeeker>> GetJobSeeker(int id)
        {
            var jobSeeker = await _jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null)
            {
                return NotFound();
            }
            return Ok(jobSeeker);
        }

        [HttpPost]
        public async Task<ActionResult<JobSeeker>> CreateJobSeeker(JobSeeker jobSeeker)
        {
            await _jobSeekerRepository.AddAsync(jobSeeker);
            //return CreatedAtAction(nameof(GetJobSeeker), new { id = jobSeeker.JobSeekerId }, jobSeeker);
            return Ok(jobSeeker);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJobSeeker(int id, JobSeeker jobSeeker)
        {
            if (id != jobSeeker.JobSeekerId)
            {
                return BadRequest();
            }

            await _jobSeekerRepository.UpdateAsync(jobSeeker);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJobSeeker(int id)
        {
            await _jobSeekerRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{jobSeekerId}/applications")]
        public async Task<IActionResult> GetJobsAppliedTo(int jobSeekerId)
        {
            var applications = await _jobSeekerRepository.GetJobsApplied(jobSeekerId);
            return Ok(applications);
        }
    }

}
