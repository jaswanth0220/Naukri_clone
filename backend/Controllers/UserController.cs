using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TopJobs_API.Entities;
using TopJobs_API.Models;
using TopJobs_API.Repositories;

namespace TopJobs_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IJobSeekerRepository _jobSeekerRepository;
        private readonly IEmployerRepository _employerRepository;

        public UserController(IUserRepository userRepository, IConfiguration configuration, IJobSeekerRepository jobSeekerRepository,IEmployerRepository employerRepository)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _jobSeekerRepository = jobSeekerRepository;
            _employerRepository = employerRepository;
        }

        [HttpPost, Route("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> AddUser(User user)
        {
            try
            {
                await _userRepository.Register(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPost, Route("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Validate(Login login)
        {
            try
            {
                AuthResponse authResponse = null;
                var user = await _userRepository.Validate(login.Email, login.Password);
                if (user == null)
                {
                    return NotFound("User not found");
                }

                // Fetch additional info based on user role
                int? employerId = null;
                int? jobSeekerId = null;

                if (user.Role == "Employer")
                {
                    var employer = await _employerRepository.GetEmployerByUserId(user.UserId);
                    if (employer != null)
                    {
                        employerId = employer.EmployerId;
                    }
                }
                else if (user.Role == "JobSeeker")
                {
                    var jobSeeker = await _jobSeekerRepository.GetJobSeekerByUserId(user.UserId);
                    if (jobSeeker != null)
                    {
                        jobSeekerId = jobSeeker.JobSeekerId;
                    }
                }

                authResponse = new AuthResponse
                {
                    UserId = user.UserId,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role,
                    EmployerId = employerId,
                    JobSeekerId = jobSeekerId,
                    Token = GetToken(user)
                };
                return Ok(authResponse);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }


        private string GetToken(User user)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);
            //Header section
            var signingCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature
            );
            //Payload section
            var subject = new ClaimsIdentity(new[]
            {
                        new Claim(ClaimTypes.Name,user.UserName),
                        new Claim(ClaimTypes.Role, user.Role),
                        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString())
                    });

            var expires = DateTime.UtcNow.AddMinutes(10);//token will expire after 10min

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = subject,
                Expires = expires,
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = signingCredentials
            };
            //generate token using tokenDescription
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            return jwtToken;
        }

        [HttpGet, Route("GetAllUsers")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var users = await _userRepository.GetAll();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpPut, Route("Update")]
        [Authorize(Roles="Admin")]
        public async Task<IActionResult> Update(User user)
        {
            try
            {
                await _userRepository.Update(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpDelete, Route("Delete")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int UserId)
        {
            try
            {
                await _userRepository.Delete(UserId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }

        [HttpGet, Route("GetUserByEmail")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            try
            {
                var user = await _userRepository.GetUser(email);
                if (user == null)
                {
                    return NotFound("User not found");
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
    }
}
