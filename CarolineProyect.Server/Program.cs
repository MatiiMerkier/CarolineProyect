using CarolineProyect.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Configura para que la aplicación escuche en los puertos 80 y 443 solo en el entorno de desarrollo
if (builder.Environment.IsDevelopment())
{
    builder.WebHost.UseUrls("http://+:80", "https://+:443");
}
else
{
    // Solo HTTP en el entorno de producción (como cuando se ejecuta en Docker)
    builder.WebHost.UseUrls("http://+:80");
}

// Add services to the container.
builder.Services.AddSingleton(sp => new ExcelService("Data/data.xlsx"));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
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

// Para producción, desactivamos el redireccionamiento HTTPS
// Esto asegura que la app solo use HTTP en entornos como Docker
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();  // Solo se ejecuta en desarrollo
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
