using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace NoteBag.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(
                new Note {Id=1,Title="sample post",Content= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquam alias illo vero nemo esse corrupti explicabo magni natus sunt consequatur quo voluptatum nisi accusamus rem, qui quia inventore rerum!" },
                new Note {Id=2,Title="sample post 2",Content= "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam aliquam alias illo vero nemo esse corrupti explicabo magni natus sunt consequatur quo voluptatum nisi accusamus rem, qui quia inventore rerum!" }
                
                );
        }
    }
}
