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

You have three ways to build the project.

### Build the production version
Use this method when preparing to ship code. This forces AoT on all components, hence revealing runtime errors before they go into production. Also, this way is also used by Travis to check if the project is correctly built.
```ng build --prod```

### Build the development version
Use this method when developing and you want absolute control over the angular project for debugging effects.
```ng serve```

### How to create new components
In the previous version, a patch was needed in order to make the @angular/cli tool to create components. In the 2.1 version of the template, angular projects have native support for those tools. To use them, you need to navigate to the folder `ClientApp` and then run the desired commands in there.