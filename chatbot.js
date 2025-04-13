function sendMessage() {
  let input = document.getElementById("userInput").value;
  if (input.trim() === "") return;

  let chatbox = document.getElementById("chatbox");
  let userDiv = document.createElement("div");
  userDiv.className = "user";
  userDiv.textContent = input;
  chatbox.appendChild(userDiv);

  let reply = getBotReply(input);
  let botDiv = document.createElement("div");
  botDiv.className = "bot";
  botDiv.textContent = reply;
  chatbox.appendChild(botDiv);

  document.getElementById("userInput").value = "";
  chatbox.scrollTop = chatbox.scrollHeight;
}

function getBotReply(input) {
  input = input.toLowerCase();

  if (input.includes("hello") || input.includes("hi")) {
    return "Hello! Kaise ho?";
  } else if (input.includes("how are you")) {
    return "Main theek hoon, tum batao?";
  } else if (input.includes("bye")) {
    return "Bye! Jaldi milte hain.";
  } else {
    return "Mujhe samajh nahi aaya. Kuch aur poocho?";
  }
}
