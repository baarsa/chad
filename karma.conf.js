

module.exports = function(config) {
	config.set({
		autoWatch: true,
		basePath: "",
		browsers: ["Chrome"],
		colors: true,
		exclude: [],
		files: ["src/**/*.spec.tsx"],
		frameworks: ["mocha", "chai", "sinon"],
		logLevel: config.LOG_INFO,
		plugins: ["karma-*"],
		port: 9876,
		preprocessors: {
			"src/**/*.spec.tsx": ["webpack"]
		},
		reporters: "mocha",
		singleRun: false,
		webpack: require('./webpack.config')
	});
};