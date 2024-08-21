using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            var jobs = await _jobRepository.GetAllAsync();
            return Ok(jobs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            var job = await _jobRepository.GetByIdAsync(id);
            if (job == null)
            {
                return NotFound();
            }
            return Ok(job);
        }

        [HttpPost]
        public async Task<ActionResult<Job>> CreateJob(Job job)
        {
            await _jobRepository.AddAsync(job);
            return Ok(job);
            //return CreatedAtAction(nameof(GetJob), new { id = job.JobId }, job);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(int id, Job job)
        {
            if (id != job.JobId)
            {
                return BadRequest();
            }

            await _jobRepository.UpdateAsync(job);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            await _jobRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
