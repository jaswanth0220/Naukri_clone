using Microsoft.EntityFrameworkCore;
using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TopJobsContext _topJobsContext;
        private IConfiguration _configuration;
        public UserRepository(TopJobsContext topJobsContext, IConfiguration configuration)
        {
            _topJobsContext = topJobsContext;
            _configuration = configuration;
        }

        public async Task Delete(int UserId)
        {
            var user =await _topJobsContext.Users.FindAsync(UserId);
             _topJobsContext.Users.Remove(user);
           await _topJobsContext.SaveChangesAsync();
        }

        public async Task <List<User>> GetAll()
        {
            var users = await _topJobsContext.Users.ToListAsync();
            return users;
        }

        public async Task<User> GetUser(string email)
        {
            var user = await _topJobsContext.Users.SingleOrDefaultAsync(u => u.Email == email);
            return user;
        }

        public async  Task Register(User user)
        {
            await _topJobsContext.Users.AddAsync(user);
            await _topJobsContext.SaveChangesAsync();
        }

        public async Task Update(User user)
        {
            _topJobsContext.Users.Update(user);
            await _topJobsContext.SaveChangesAsync();
        }

        public async Task<User> Validate(string email, string password)
        {
            return await _topJobsContext.Users.SingleOrDefaultAsync(u => u.Email == email && u.Password == password);
        }
    }
}
