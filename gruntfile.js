'use strict';

module.exports = function (grunt)
{
	//load grunt modules
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("release",
    [
        "build",
        "htmlmin",
        "uglify"
    ]);
	
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
        "concat"
        //"htmlmin",
        //"uglify"
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
				tasks: ["newer:copy:css", "newer:concat"]
			},
			sass:
			{
				files: ["<%= config.src %>/**/*.scss"],
				tasks: ["newer:sass", "newer:copy:css", "newer:concat"]
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
						src: ["application.js", "appexternal.js"],
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
                    //banner: "'use strict';\n",
                    process: function(src, filepath) {
                        return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                    }
                },
                files: {
                    'dist/appexternal.js': [
                        'src/appexternal.js',
                        'src/externalrouting.js',
                        'src/external/**/*.js'
                    ],
                    'dist/dependencies.js': [
                        'src/dependencies/jquery/jquery.min.js',
                        'src/dependencies/extensions.js',
                        'src/dependencies/angular/angular.min.js',
                        'src/dependencies/angular-animate/angular-animate.min.js',
                        'src/dependencies/angular-aria/angular-aria.min.js',
                        'src/dependencies/angular-route/angular-route.min.js',
                        'src/dependencies/angular-material/angular-material.min.js',
                        'src/dependencies/angular-ui-router/release/angular-ui-router.min.js',
                        "src/dependencies/angular-messages/angular-messages.min.js",
                        'src/dependencies/angular-sanitize/angular-sanitize.min.js',
                        'src/dependencies/api-check/dist/api-check.min.js',
                        'src/dependencies/angular-formly/dist/formly.min.js',
                        'src/dependencies/ng-file-upload/ng-file-upload.min.js',
                        'src/dependencies/webbdudes/webbdudes-image-helper.js',
                        "src/dependencies/angular-loading-bar/build/loading-bar.min.js",
                        "src/dependencies/angular-drag-and-drop-lists/angular-drag-and-drop-lists.js",
                        "src/dependencies/showdown/compressed/showdown.min.js",
                        "src/dependencies/angular-markdown-directive/markdown.js",
                        "src/dependencies/angular-google-places-autocomplete/dist/autocomplete.min.js",
                        "src/dependencies/moment/min/moment.min.js",
                        "src/dependencies/angular-data-table/release/dataTable.min.js",
                        "src/dependencies/angular-translate/angular-translate.min.js",
                        "src/dependencies/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js"
                    ],
                    'dist/application.js': [
                        'src/app.js',
                        'src/filters.js',
                        'src/routing.js',
                        'src/adminrouting.js',
                        'src/services/*.js',
                        'src/directives/*.js',
                        'src/modules/**/*.js'
                    ],
                    'dist/content/css/modules.css': [
                        'dist/modules/**/*.css'
                    ],
                    'dist/content/css/dependencies.css': [
                        "src/dependencies/angular-google-places-autocomplete/dist/autocomplete.min.css",
                        "src/dependencies/angular-material/angular-material.min.css",
                        "src/dependencies/ng-ckeditor/ng-ckeditor.css",
                        "src/dependencies/angular-loading-bar/build/loading-bar.min.css",
                        "src/dependencies/angular-data-table/release/dataTable.css",
                        "src/dependencies/angular-data-table/release/material.css"
                    ],
                    'dist/content/css/externaldependencies.css': [
                        "src/dependencies/angular-material/angular-material.min.css",
                        "src/dependencies/angular-loading-bar/build/loading-bar.min.css"
                    ]
                }
			}
		}
	});
};