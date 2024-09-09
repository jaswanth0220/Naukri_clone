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
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _employerRepository;
        private readonly IJobRepository _jobRepository;

        public EmployerController(IEmployerRepository employerRepository, IJobRepository jobRepository)
        {
            _employerRepository = employerRepository;
            _jobRepository = jobRepository; 
        }

        [HttpGet]
        //[Authorize(Roles="Admin")]
        public async Task<ActionResult<List<Employer>>> GetEmployers()
        {
            try
            {
                var employers = await _employerRepository.GetAllAsync();
                return Ok(employers);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{id}")]
        [Authorize(Roles="Employer,Admin")]
        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            try
            {
                var employer = await _employerRepository.GetByIdAsync(id);
                if (employer == null)
                {
                    return NotFound("Employer not found.");
                }
                return Ok(employer);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<Employer>> CreateEmployer(EmployerDto employerDto)
        {
            try
            {
                // Check if the UserId is already used by a JobSeeker
                var existingJobSeeker = await _employerRepository.GetJobSeekerByUserId(employerDto.UserId);
                if (existingJobSeeker != null)
                {
                    return BadRequest("UserId is already in use by a Job Seeker.");
                }

                // Check if the UserId is already used by another Employer
                var existingEmployer = await _employerRepository.GetEmployerByUserId(employerDto.UserId);
                if (existingEmployer != null)
                {
                    return BadRequest("UserId is already in use by another Employer.");
                }

                var employer = new Employer
                {
                    UserId = employerDto.UserId,
                    CompanyName = employerDto.CompanyName,
                    CompanyDescription = employerDto.CompanyDescription,
                    CompanyLocation = employerDto.CompanyLocation,
                    ContactEmail = employerDto.ContactEmail,
                    ContactNumber = employerDto.ContactNumber,
                };

                await _employerRepository.AddAsync(employer);
                return Ok(employer);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }


        [HttpPut("{id}")]
        [Authorize(Roles="Employer")]
        public async Task<IActionResult> UpdateEmployer(int id, EmployerDto employerDto)
        {
            try
            {
                var employer = await _employerRepository.GetByIdAsync(id);
                if (employer == null)
                {
                    return NotFound("Employer not found.");
                }

                employer.CompanyName = employerDto.CompanyName;

                await _employerRepository.UpdateAsync(employer);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> DeleteEmployer(int id)
        {
            try
            {
                await _employerRepository.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("{employerId}/applications")]
        [Authorize(Roles = "Employer,Admin")]
        public async Task<IActionResult> GetJobApplicationsByEmployer(int employerId)
        {
            try
            {
                var applications = await _employerRepository.GetJobApplications(employerId);
                return Ok(applications);
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet("GetEmployerByUserId/{userId}")]
        public async Task<ActionResult<int>> GetEmployerByUserId(int userId)
        {
            try
            {
                var employer = await _employerRepository.GetEmployerByUserId(userId);
                if (employer == null)
                {
                    return NotFound("Employer not found.");
                }

                return Ok(employer.EmployerId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("GetPostedJobs")]
        public async Task<IActionResult> GetPostedJobs(int employerId)
        {
            try
            {
                // Fetch the jobs posted by the employer
                var jobs = await _jobRepository.GetJobsByEmployerId(employerId);

                if (jobs == null || !jobs.Any())
                {
                    return NotFound("No jobs found for this employer.");
                }

                return Ok(jobs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

    }
}
