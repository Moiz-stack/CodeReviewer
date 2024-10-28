import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(express.json());

app.post('/api/review', async (req, res) => {
    const { code } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: `Review the following code:\n${code}`,
                max_tokens: 150,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json({ review: data.choices[0].text });
    } catch (error) {
        console.error("Error in /api/review endpoint:", error);
        res.status(500).json({ review: 'Error generating review.' });
    }
});

app.listen(5000, () => console.log('Backend server running on port 5000'));
