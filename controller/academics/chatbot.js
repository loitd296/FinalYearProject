const fetch = require("node-fetch");

const apiKey = "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"; // Replace with your ChatGPT API key
const apiEndpoint = "https://api.openai.com/v1/chat/completions";

// Rate limiting settings
const requestsPerMinute = 60;
const requestInterval = (1000 * 60) / requestsPerMinute; // Calculate the interval in milliseconds

let lastRequestTime = 0;

// Function to interact with the chatbot
const chatbotInteraction = async (message) => {
  try {
    const currentTime = Date.now();

    // Calculate the time elapsed since the last request
    const timeSinceLastRequest = currentTime - lastRequestTime;

    // If the time elapsed is less than the request interval, delay the request
    if (timeSinceLastRequest < requestInterval) {
      const delay = requestInterval - timeSinceLastRequest;
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Make the API request
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        max_tokens: 100, // Set the maximum number of tokens (words) in the response
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.statusText}`);
    }

    // Update the last request time
    lastRequestTime = Date.now();

    const data = await response.json();
    const reply = data.choices[0].message.content;
    return reply;
  } catch (error) {
    console.error("Chatbot error:", error);
    return "An error occurred while processing your request.";
  }
};

module.exports = { chatbotInteraction };
