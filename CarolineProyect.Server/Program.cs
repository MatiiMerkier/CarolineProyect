using CarolineProyect.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Configurar puerto dinámico para Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000"; // Si no se encuentra la variable de entorno, usa el puerto 5000 por defecto
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
builder.Services.AddSingleton(sp => new ExcelService("Data/data.xlsx"));
builder.Services.AddControllers();
// Configuración Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
