const chalk = require('chalk');

const prod = process.env.NODE_ENV === 'production';
const log = `${chalk.red('>')} Is now production mode? The answer is ${chalk.red(prod)}!`;

console.log(log);

export const prefix = prod ? 'https://m.ctrip.com/hitched-api' : 'https://m.ctrip.com/hitched-api';
