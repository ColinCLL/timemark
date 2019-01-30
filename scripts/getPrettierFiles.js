const glob = require('glob');

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync('src/**/*.js*', { ignore: ['**/node_modules/**', 'build/**'] });
  const tsFiles = glob.sync('src/**/*.ts*', { ignore: ['**/node_modules/**', 'build/**'] });
  const scriptFiles = glob.sync('scripts/**/*.js');
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  files = files.concat(scriptFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
