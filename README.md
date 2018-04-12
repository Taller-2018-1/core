Master: [![Build Status](https://travis-ci.org/Taller-2018-1/core.svg?branch=master)](https://travis-ci.org/Taller-2018-1/core) 

Staging: [![Build Status](https://travis-ci.org/Taller-2018-1/core.svg?branch=staging)](https://travis-ci.org/Taller-2018-1/core)

# Installation and run instructions

## Prerequisites
* Node.js ≥ v8.9.0 + npm
* .NET Core 2

## Installation
```bash
npm install
```

## Run
```bash
export ASPNETCORE_Environment=Development
dotnet run
```

## Run - Windows command line
```bash
setx ASPNETCORE_Environment "Development"
dotnet run
```

## Troubleshooting

1. Errors while running `dotnet run` caused by missing files inside `ClientApp/dist/` or `wwwroot/dist/`.
    
    Configure using webpack:

    - If webpack is globally installed:
    ```bash
    webpack --config webpack.config.vendor.js
    ``` 
    - If not installed globally, use the version dowloaded with `npm install`.

        **Note** : Run this on Windows PowerShell on Linux.
    ```
    node_modules/.bin/webpack --config webpack.config.vendor.js
    ```
    
