public class AuthResponse
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public string Role { get; set; }
    public string Token { get; set; }
    public int? EmployerId { get; set; }
    public int? JobSeekerId { get; set; }
}
