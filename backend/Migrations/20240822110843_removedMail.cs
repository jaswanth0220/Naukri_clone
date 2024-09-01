using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TopJobs_API.Migrations
{
    /// <inheritdoc />
    public partial class removedMail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContactEmail",
                table: "Employers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContactEmail",
                table: "Employers",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
