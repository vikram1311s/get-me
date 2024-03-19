const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.static('public')); // Serve static files

const PORT = 3000;
const dataFilePath = path.join(__dirname, 'data.json');

app.post('/store-data', async (req, res) => {
    const { name, user_id, latitude, longitude } = req.body;
    console.log(req.body)

    const newData = { name, user_id, latitude, longitude };

    try {
        let existingData = await fs.readJson(dataFilePath);
        existingData.push(newData);
        await fs.writeJson(dataFilePath, existingData, { spaces: 4 });
        res.send({ status: 'success', message: 'Data updated successfully' });
    } catch (error) {
        console.error('Error updating the file:', error);
        res.status(500).send({ status: 'error', message: 'Error updating the data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
