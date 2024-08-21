using TopJobs_API.Entities;

namespace TopJobs_API.Repositories
{
    public interface IUserRepository
    {
        Task Register(User user);
        Task<User> Validate(string email, string password);

        Task<List<User>> GetAll();

        Task Update (User user);
        Task Delete (int UserId);

        Task<User> GetUser(string email);
    }
}
