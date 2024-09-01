public class ApplicantDto
{
    public int JobId { get; set; }
    public int ApplicantId { get; set; }
    public string Status { get; set; }
    public DateTime ApplyDate { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public int ApplicationId { get; set; } // Added ApplicationId
}
