// server/routes/chatbot.js
const express = require('express');
const router = express.Router();
const openai = require('openai');

openai.apiKey = process.env.OPENAI_API_KEY;

router.post('/', async (req, res) => {
    const userMessage = req.body.message;
    
    const messages = [
        { role: "system", content: "You are a specialist in growing plants and crops. You know everything about how to start a farm, how to take care of crops growing in all stages as well as fertilizing and pest control." },
        { role: "user", content: userMessage }
    ];
    
    const response = await openai.ChatCompletion.create({
        model: "gpt-4",
        messages: messages,
    });
    
    const botMessage = response['choices'][0]['message']['content'];
    res.json({ message: botMessage });

});

module.exports = router;