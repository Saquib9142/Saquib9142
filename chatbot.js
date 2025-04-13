function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  let chatbox = document.getElementById("chatbox");

  // User message
  let userDiv = document.createElement("div");
  userDiv.className = "message user";
  userDiv.textContent = input;
  chatbox.appendChild(userDiv);

  // Bot response
  let botDiv = document.createElement("div");
  botDiv.className = "message bot";
  botDiv.textContent = getBotReply(input);
  chatbox.appendChild(botDiv);

  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! Main SaquibBot hoon.";
  } else if (input.includes("how are you")) {
    return "Main badiya hoon, tum kaise ho?";
  } else if (input.includes("saquib")) {
    return "Saquib toh mera creator hai!";
  } else if (input.includes("bye")) {
    return "Bye bye! Jaldi wapas aana.";
  } else {
    return "Hmm... main is sawal ka jawaab nahi jaanta, par main seekh raha hoon.";
  }
}
