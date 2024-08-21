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
        private IConfiguration _configuration;

        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost, Route("Register")]
        public async Task<IActionResult> AddUser(User user)
        {
            await _userRepository.Register(user);
            return Ok(user);
        }
        [HttpPost, Route("Login")]
        public async Task<IActionResult> Validate(Login login)
        {

            var user = await _userRepository.Validate(login.Email, login.Password);
            if (user == null)
            {
                return NotFound("User not found");
            }
            return Ok(user);
        }

        

        [HttpGet, Route("GetAllUsers")]
        public async Task<IActionResult> GetAll()
        {
            var users = await _userRepository.GetAll();
            return Ok(users);
        }

        [HttpPut, Route("Update")]
        public async Task<IActionResult> Update(User user)
        {
            await _userRepository.Update(user);
            return Ok(user);
        }

        [HttpDelete, Route("Delete")]
        public async Task<IActionResult> Delete(int UserId)
        {
            await _userRepository.Delete(UserId);
            return Ok();
        }
        [HttpGet, Route("GetUserByEmail")]
        public async Task <IActionResult> GetUserByEmail(string email)
        {
            
            return Ok(await _userRepository.GetUser(email));
        }
    }
}
