# Usa una imagen base de .NET para la ejecución
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Copia los archivos publicados desde la carpeta local 'publish' al contenedor
COPY ./CarolineProyect.Server/publish .

# Configura el comando para iniciar la aplicación
ENTRYPOINT ["dotnet", "CarolineProyect.Server.dll"]
