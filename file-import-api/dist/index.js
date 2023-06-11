"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataModel_1 = require("./models/dataModel");
const { dataRoutes } = require('./routes/dataRoutes');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/data', dataRoutes);
const PORT = process.env.PORT || 5000;
dataModel_1.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
