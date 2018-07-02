using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using AspNetCore.RouteAnalyzer;
using System.Diagnostics;
using think_agro_metrics.Data;
using Microsoft.EntityFrameworkCore;
using DinkToPdf.Contracts;
using DinkToPdf;

namespace ThinkAgroMetrics
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
//            
            // Database connection string.
            // Make sure to update the Password value below from "Your_password123" to your actual password.
//            var connection = @"Server=127.0.0.1,1433;Database=master;Integrated Security=False;User=sa;Password=Password1;MultipleActiveResultSets=True;";

            // This line uses 'UseSqlServer' in the 'options' parameter
            // with the connection string defined above.
//            services.AddDbContext<DataContext>(
//                options => options.UseSqlServer(connection));
            
            services.AddMvc();
            services.AddRouteAnalyzer();
            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });

			services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
              routes.MapRouteAnalyzer("/routes");
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
