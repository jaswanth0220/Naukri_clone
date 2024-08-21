using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TopJobs_API.Entities;
using TopJobs_API.Repositories;

namespace TopJobs_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _employerRepository;

        public EmployerController(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<Employer>>> GetEmployers()
        {
            var employers = await _employerRepository.GetAllAsync();
            return Ok(employers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employer>> GetEmployer(int id)
        {
            var employer = await _employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return NotFound();
            }
            return Ok(employer);
        }

        [HttpPost]
        public async Task<ActionResult<Employer>> CreateEmployer(Employer employer)
        {
            await _employerRepository.AddAsync(employer);
            //return CreatedAtAction(nameof(GetEmployer), new { id = employer.EmployerId }, employer);
            return Ok(employer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployer(int id, Employer employer)
        {
            if (id != employer.EmployerId)
            {
                return BadRequest();
            }

            await _employerRepository.UpdateAsync(employer);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployer(int id)
        {
            await _employerRepository.DeleteAsync(id);
            return NoContent();
        }

        [HttpGet("{employerId}/applications")]
        public async Task<IActionResult> GetJobApplicationsByEmployer(int employerId)
        {
            var applications = await _employerRepository.GetJobApplications(employerId);
            return Ok(applications);
        }
    }

}
