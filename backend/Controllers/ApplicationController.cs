using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopJobs_API.DTOS;
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
            try
            {
                var applications = await _applicationRepository.GetAllAsync();
                return Ok(applications);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            try
            {
                var application = await _applicationRepository.GetByIdAsync(id);
                if (application == null)
                {
                    return NotFound("Application not found.");
                }
                return Ok(application);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<Application>> CreateApplication([FromBody] ApplicationDto applicationDto)
        {
            try
            {
                if (applicationDto == null)
                    return BadRequest("Invalid application data.");

                var application = new Application
                {
                    JobId = applicationDto.JobId,
                    ApplicantId = applicationDto.ApplicantId,
                    Status = applicationDto.Status,
                    ApplyDate = applicationDto.ApplyDate
                };
                await _applicationRepository.AddAsync(application);
                return Ok(application);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplication(int id, ApplicationDto applicationDto)
        {
            try
            {
                var application = await _applicationRepository.GetByIdAsync(id);
                if (application == null)
                {
                    return NotFound("Application not found.");
                }

                application.JobId = applicationDto.JobId;
                application.ApplicantId = applicationDto.ApplicantId;
                application.Status = applicationDto.Status;
                application.ApplyDate = applicationDto.ApplyDate;

                await _applicationRepository.UpdateAsync(application);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            try
            {
                await _applicationRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPut("{applicationId}/status")]
        public async Task<IActionResult> UpdateApplicationStatus(int applicationId, [FromBody] string status)
        {
            try
            {
                await _applicationRepository.UpdateStatus(applicationId, status);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
    }
}
