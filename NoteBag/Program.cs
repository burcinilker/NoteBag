global using System.ComponentModel.DataAnnotations;
global using Microsoft.EntityFrameworkCore;
global using NoteBag.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(setup => setup.AddDefaultPolicy(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin()));
// Add services to the container.

var cs = builder.Configuration.GetConnectionString("ApplicationDbContext");
builder.Services.AddDbContext<ApplicationDbContext>(optionBuilder => optionBuilder.UseSqlServer(cs));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();
