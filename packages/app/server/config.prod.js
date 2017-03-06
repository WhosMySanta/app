const {resolve} = require('path');
const express = require('express');

export default ({app, port}) => {
  app.use(express.static(resolve(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '../build/index.html'));
  });

  app.listen(port, (error) =>
    error ?
      console.error(error) && process.exit(1) : // eslint-disable-line no-console
      console.log('Server started 🚀!'), // eslint-disable-line no-console
  );
};
