const express = require('express');
const { exec } = require('youtube-dl-exec');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/convert', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).send('No URL provided');
    }

    const videoId = new URL(url).searchParams.get('v');
    const filePath = path.resolve(__dirname, 'public', `${videoId}.mp3`);

    try {
        await exec(url, {
            extractAudio: true,
            audioFormat: 'mp3',
            output: filePath,
        });
        res.json({ file: `${videoId}.mp3` });
    } catch (error) {
        res.status(500).send('Error processing video');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
