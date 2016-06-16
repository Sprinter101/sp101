var path = require('path'),
    ConfigBuilder = require('nodules/configBuilder');

var configPath = path.join(__dirname, '../config'),
    env = process.argv.slice(2)[0] || 'dev',
    configBuilder = new ConfigBuilder(configPath);

configBuilder.build(env);
