process.env.NODE_ENV = 'development';

const { exec } = require('child_process');
const { join } = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config/webpack.config.dev');

export default ({ app, port }) => {
  const compiler = webpack(config);
  const middleware = webpackDevMiddleware(compiler, {
    contentBase: 'public',
    noInfo: true,
    publicPath: config.output.publicPath,
    port,
    stats: {
      colors: true,
      progress: true,
      timings: true,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (req, res) => {
    middleware.fileSystem.readFile(join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  exec('npm run update-schema', () => {
    app.listen(port, (error) => {
      // clearConsole();
      if (error) {
        console.error(error); // eslint-disable-line no-console
      } else {
        console.log('Server started 🚀!'); // eslint-disable-line no-console
      }
    });
  });
};
