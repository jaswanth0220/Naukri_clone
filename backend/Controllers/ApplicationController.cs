using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopJobs_API.Entities;
using TopJobs_API.Repositories;

namespace TopJobs_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicationController : ControllerBase
    {
        private readonly IApplicationRepository _applicationRepository;

        public ApplicationController(IApplicationRepository applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Application>>> GetApplications()
        {
            var applications = await _applicationRepository.GetAllAsync();
            return Ok(applications);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            var application = await _applicationRepository.GetByIdAsync(id);
            if (application == null)
            {
                return NotFound();
            }
            return Ok(application);
        }

        [HttpPost]
        public async Task<ActionResult<Application>> CreateApplication(Application application)
        {
            await _applicationRepository.AddAsync(application);
            //return CreatedAtAction(nameof(GetApplication), new { id = application.ApplicationId }, application);
            return Ok(application);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplication(int id, Application application)
        {
            if (id != application.ApplicationId)
            {
                return BadRequest();
            }

            await _applicationRepository.UpdateAsync(application);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            await _applicationRepository.DeleteAsync(id);
            return NoContent();
        }
        [HttpPut("application/{applicationId}/status")]
        public async Task<IActionResult> UpdateApplicationStatus(int applicationId, [FromBody] string status)
        {
            await _applicationRepository.UpdateStatus(applicationId, status);
            return NoContent();
        }

    }

}
