'use strict';

module.exports = function (grunt)
{
	//load grunt modules
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
	
	grunt.registerTask("server",
	[
	  "build",
	  //"open:chrome",
	  "connect",
	  "watch"
	]);

	grunt.registerTask("build",
	[
        "clean:all",
        "copy",
        "sass",
        "concat",
        //"htmlmin",
        "uglify"
	]);

	grunt.registerTask("default",
	[
		"server"
	]);

    grunt.registerTask('con',
    [
        "concat"
    ]);

	grunt.initConfig(
	{
		config:
		{
			src: "src",
			dist: "dist"
		},
		open:
		{
			chrome:
			{
				path: "http://localhost:9000",
				app: "Chrome"
			},
			firefox:
			{
				path: "http://localhost:9000",
				app: "Firefox"
			}
		},
		connect:
		{
			options:
			{
				port: 9000,
				livereload: 35729,
				hostname: '*'
			},
			livereload:
			{
				options:
				{
					base:
						[
							'<%= config.dist %>'
						]
				}
			}
		},
		watch:
		{
			options:
			{
				livereload: true
			},
			css:
			{
				files: ["<%= config.src %>/**/*.css"],
				tasks: ["newer:copy:css"]
			},
			sass:
			{
				files: ["<%= config.src %>/**/*.scss"],
				tasks: ["newer:sass"]
			},
			images:
			{
				files: ["<%= config.src %>/**/*.{png,jpg}"],
				tasks: ["newer:copy:images"]
			},
			markup:
			{
				files: ["<%= config.src %>/**/*.html"],
				tasks: ["newer:copy:markup"]
			},
			scripts:
			{
				files: ["<%= config.src %>/**/*.js"],
				tasks: ["newer:concat"]
			},
			json:
			{
				files: ["<%= config.src %>/**/*.json"],
				tasks: ["newer:copy:json"]
			}
		},
		htmlmin:
		{
			dist:
			{
				options:
				{
					removeComments: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					minifyCSS: true,
					caseSensitive: true
				},
				files: 
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "**/*.html",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		uglify:
		{
			options:
			{
				mangle:
				{
					except: ["jQuery", "*.min.js"]
				}
			},
			all:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.dist %>",
						src: "application.js",
						dest: "<%= config.dist %>"
					}
				]
			}
		},
		sass:
		{
			dist:
			{
				options:
				{
					includePaths: require("node-neat").includePaths,
					outputStyle: "compressed"
				},
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.scss",
						dest: "<%= config.dist %>",
						ext: ".css"
					}
				]
			}
		},
		copy:
		{
			fonts:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{svg,ttf,woff,eot}",
						dest: "<%= config.dist %>"
					}
				]
			},
			css:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.css",
						dest: "<%= config.dist %>"
					}
				]
			},
			images:
			{
				files:
				[
					{
						expand: true,
						cwd: "<%= config.src %>",
						src: "**/*.{jpg,png}",
						dest: "<%= config.dist %>"
					}
				]
			},
			//scripts:
			//{
			//	files:
			//	[
			//		{
			//			expand: true,
			//			cwd: "<%= config.src %>",
			//			src: "**/*.js",
			//			dest: "<%= config.dist %>"
			//		}
			//	]
			//},
			markup:
			{
				files:
					[
						{
							expand: true,
							cwd: "<%= config.src %>",
							src: "**/*.html",
							dest: "<%= config.dist %>"
						}
					]
			},
			map:
			{
				files:
					[
						{
							expand: true,
							cwd: "<%= config.src %>",
							src: "**/*.map",
							dest: "<%= config.dist %>"
						}
					]
			},
			json:
			{
				files:
					[
						{
							expand: true,
							cwd: "<%= config.src %>",
							src: "**/*.json",
							dest: "<%= config.dist %>"
						}
					]
			}
		},
		jshint:
		{
			all: ['<%= config.src %>/**/*.js']
		},
		clean:
		{
			binaries: ["<%= config.dist %>/bin/**/*"],
			all: ["<%= config.dist %>/**/*"]
		},
		concat:
		{
			dist: {
                options: {
                    // Replace all 'use strict' statements in the code with a single one at the top
                    banner: "'use strict';\n",
                    process: function(src, filepath) {
                        return '// Source: ' + filepath + '\n' +
                            src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                files: {
                    'dist/appexternal.js': [
                        'src/appexternal.js',
                        'src/externalrouting.js',
                        'src/external/**/*.js'
                    ],
                    'dist/dependencies/dependencies.js': [
                        'src/dependencies/jquery/jquery.min.js',
                        'src/dependencies/extensions.js',
                        'src/dependencies/angular/angular.min.js',
                        'src/dependencies/angular-animate/angular-animate.min.js',
                        'src/dependencies/angular-aria/angular-aria.min.js',
                        'src/dependencies/angular-route/angular-route.min.js',
                        'src/dependencies/angular-material/angular-material.min.js',
                        'src/dependencies/angular-ui-router/release/angular-ui-router.min.js',
                        'src/dependencies/api-check/dist/api-check.min.js',
                        'src/dependencies/angular-formly/dist/formly.min.js',
                        'src/dependencies/ng-file-upload/ng-file-upload.min.js',
                        'src/dependencies/webbdudes/webbdudes-image-helper.js'
                    ],
                    'dist/application.js': [
                        'src/app.js',
                        'src/routing.js',
                        'src/adminrouting.js',
                        'src/directives/helpers.js',
                        'src/modules/**/*.js'
                    ]
                }
			}
		}
	});
};