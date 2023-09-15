// chatbot.js

const chatDisplay = document.getElementById("chat-display");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value;
  if (userMessage.trim() !== "") {
    // Send the user message to the server and retrieve the chatbot's response
    const response = await sendMessageToChatbot(userMessage);

    // Display the user message and chatbot response in the chat display
    displayMessage("User", userMessage);
    displayMessage("Chatbot", response);

    // Clear the user input field
    userInput.value = "";
  }
});

async function sendMessageToChatbot(message) {
  try {
    const response = await fetch("/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Failed to get chatbot response.");
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Error sending message to chatbot:", error);
    return "An error occurred.";
  }
}

function displayMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");
  messageElement.textContent = `${sender}: ${message}`;
  chatDisplay.appendChild(messageElement);
}
