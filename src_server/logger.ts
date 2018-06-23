import * as appRoot from 'app-root-path'
import * as winston from 'winston'
import * as fs from 'fs'

const logDir = `${appRoot.path}/log`;

const options = {
	file: {
		level: 'info',
		filename: logDir + `/app.log`,
		handleExceptions: true,
	    json: true,
	    maxsize: 5242880, 
	    maxFiles: 5,
	    colorize: false,
	}
}

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logger = new winston.Logger({
	transports: [
		new winston.transports.File(options.file)
	],
	exitOnError: false
});

export default logger;