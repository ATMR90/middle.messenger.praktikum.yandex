const fallback = require ('express-history-api-fallback')
const express = require('express');
const path = require('path');

const { PORT } = require('./utils/constants');
const { NODE_ENV } = require('./utils/constants');
const { DIST_DIR } = require('./utils/constants');

const pathDistDir = path.join(__dirname, '../', DIST_DIR);

const app = express();

app.use(express.static(pathDistDir));
app.use(fallback('index.html', { root: pathDistDir }))

app.listen(PORT, () => console.log(`Server http://localhost:${PORT}`+` Path:${pathDistDir}`+` node_env:${NODE_ENV}`));
