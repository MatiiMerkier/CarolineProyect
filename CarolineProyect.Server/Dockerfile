# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
# Expose default ports
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["carolineproyect.client/nuget.config", "carolineproyect.client/"]
COPY ["CarolineProyect.Server/CarolineProyect.Server.csproj", "CarolineProyect.Server/"]
COPY ["carolineproyect.client/carolineproyect.client.esproj", "carolineproyect.client/"]
RUN dotnet restore "./CarolineProyect.Server/CarolineProyect.Server.csproj"
COPY . .
WORKDIR "/src/CarolineProyect.Server"
RUN dotnet build "./CarolineProyect.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./CarolineProyect.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Set ASPNETCORE_URLS to use the PORT environment variable
ENV ASPNETCORE_URLS=http://+:${PORT}

ENTRYPOINT ["dotnet", "CarolineProyect.Server.dll"]
