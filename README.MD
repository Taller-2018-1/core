# ThinkAgro metrics - Core project

Master: [![Build Status](https://travis-ci.org/Taller-2018-1/core.svg?branch=master)](https://travis-ci.org/Taller-2018-1/core) 

Staging: [![Build Status](https://travis-ci.org/Taller-2018-1/core.svg?branch=staging)](https://travis-ci.org/Taller-2018-1/core)

This project is divided into two subprojects, both contained in the same repo, namely, a .NET Core 2.1 application and an Angular Project.

# .NET Core 2.1
In the former version we used .NET Core 2, but lately there is a patch to support the latest features, which is poorly documented. (thanks to @Vreyesm for noticing this). In order to make your environment fully compilant with this version, you need to do the following:

```bash
dotnet new -i "Microsoft.AspNetCore.SpaTemplates::*" # This installs single page application project templates, version 2.1
```

For more info, you can check [this](https://github.com/dotnet/templating/wiki/Available-templates-for-dotnet-new) page.

.NET controllers are unaffected by this change, so don't worry.
## How to run this project

### Prerequisites
* Node.js ≥ v8.9.0 + npm
* .NET Core 2
* wkhtmltox
* libssl1.0-dev

Install .NET Core. In some operating systems as OSX and Linux is also needed to install separatedly a node environment. It doesn't matter which version you use, as long as is 8+.

For Windows users, there is no problem as VisualStudio installs all the dependencies on the machine. For VSCode users, it applies the same of the above.

### Run on OSX - Linux hosts
```bash
export ASPNETCORE_Environment=Development
dotnet run
```

As an alternate way to run, you can embed the enviroment variables on the same command, as exporting env is not recommended.

```bash
ASPNETCORE_Environment=Development dotnet run
```

### Run - Windows command line
```bash
setx ASPNETCORE_Environment "Development"
dotnet run
```

# Angular 5
The contents of the former Angular4 project has been migrated to Angular5, due to many problems from the dev team. This migration enables to fully use all the native tools designed to work on Angular 5 without the need of any hacks.

## Before anything
This version of the template has the `node_modules` folder in the `ClientApp` subdirectory, so, now you will need to execute `npm install` inside of the ClientApp folder rather than at the root level of the project.

```bash
#example
cd ClientApp
npm install
```


## How to build the project

You have two ways to build the project.

### Build the production version
Use this method when preparing to ship code. This forces AoT on all components, hence revealing runtime errors before they go into production. Also, this way is also used by Travis to check if the project is correctly built.
```ng build --prod```

### Build the development version
Use this method when developing and you want absolute control over the angular project for debugging effects.
```ng serve```

### How to create new components
In the previous version, a patch was needed in order to make the @angular/cli tool to create components. In the 2.1 version of the template, angular projects have native support for those tools. To use them, you need to navigate to the folder `ClientApp` and then run the desired commands in there.

# Aditional considerations

## Database Requirements
This project uses Microsoft\'s Sql Server as its DBMS, and was tested against Sql server 2017 for linux.

## Database Connection
Before RC2, the MSSQL connection string must be configured in `Data/Datacontex.cs` In RC2, the MSSQL connection string is constructed based on the following environmental variables: MSSQL_SERVER, MSSQL_DB, MSSQL_USER, MSSQL_PASSWORD. For example in unix based systems:
```
export MSSQL_SERVER=127.0.0.3,1433
export MSSQL_DB=think_agro
export MSSQL_USER=tauser
export MSSQL_PASSWORD=tapassword1
```

## Building a Release Version
A release version can be build using standard deployment commands of ASP.NET CORE 2. In the following example the Release version is outputed into `./dist`
``` dotnet publish -c Release -o dist```

 
## Creating a Docker image
This project includes a Dockerfile that install all it's dependencies and creates a Docker image ready for use. 

### Compiling Docker image
``` docker build . -t think_agro_metrics ```

### Using image
``` docker run -e 'MSSQL_SERVER=ip,port' -e 'MSSQL_DB=dbname' -e 'MSSQL_USER=dbusername' -e 'MSSQL_PASSWORD=dbpassword' -p hostport:8080 think_agro
```
A custom docker volume is recomended for the `/app/wwwroo/Repository` directory as registries' backups are stored in this direction, the Dockerfile includes directives for a generic one, in order to store the backups in host and not the container.


## HTTPS/SSL
The HTTPS/TSL/SSL security layer must be added via a reverse proxy like Caddyserver, Apache or NGINX. This was chosen because, as for the start of this project, Kestrel provides lower security and load management features than the before mentioned. Therefore is a poor choise for a web facing web server.


