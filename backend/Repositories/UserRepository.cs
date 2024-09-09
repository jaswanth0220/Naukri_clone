using Microsoft.EntityFrameworkCore;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TopJobsContext _topJobsContext;
        private readonly IConfiguration _configuration;

        public UserRepository(TopJobsContext topJobsContext, IConfiguration configuration)
        {
            _topJobsContext = topJobsContext;
            _configuration = configuration;
        }

        public async Task Delete(int UserId)
        {
            try
            {
                var user = await _topJobsContext.Users.FindAsync(UserId);
                if (user == null)
                {
                    throw new ArgumentException($"User with ID {UserId} not found");
                }
                _topJobsContext.Users.Remove(user);
                await _topJobsContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while deleting the user. Please try again later.", ex);
            }
        }

        public async Task<List<User>> GetAll()
        {
            try
            {
                return await _topJobsContext.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching users. Please try again later.", ex);
            }
        }

        public async Task<User> GetUser(string email)
        {
            try
            {
                return await _topJobsContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while fetching the user. Please try again later.", ex);
            }
        }

        public async Task<bool> IsUserExists(string userName, string email)
        {
            return await _topJobsContext.Users
                .AnyAsync(u => u.UserName == userName || u.Email == email);
        }

        public async Task Register(User user)
        {
            try
            {
                // Add the new user to the database
                await _topJobsContext.Users.AddAsync(user);
                await _topJobsContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while registering the user. Please try again later.", ex);
            }
        }


        public async Task Update(User user)
        {
            try
            {
                _topJobsContext.Users.Update(user);
                await _topJobsContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while updating the user. Please try again later.", ex);
            }
        }

        public async Task<User> Validate(string email, string password)
        {
            try
            {
                return await _topJobsContext.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while validating the user. Please try again later.", ex);
            }
        }

        public async Task<User> GetUserById(int userId)
        {
            return await _topJobsContext.Users.FirstOrDefaultAsync(u => u.UserId == userId);
        }
    }
}
