const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, college, email, address, batch } = req.body;

    // Save the data to a file
    const data = `Name: ${name}\nPhone: ${phone}\nCollege: ${college}\nEmail: ${email}\nAddress: ${address}\nBatch: ${batch}\n\n`;

    fs.appendFile('form_data.txt', data, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).send('Failed to save data.');
        }
        res.status(200).send('Thank you! Your data has been saved.');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
