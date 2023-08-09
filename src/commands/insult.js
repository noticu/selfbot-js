const axios = require('axios');

const api = "https://evilinsult.com/generate_insult.php?lang=en";

async function getInsult() {
  let insult;
  await axios.get(api).then((res) => {
    insult = res.data;
  });
  return insult;
}

module.exports = {
  name: "insult",
  description: "genera un insulto hacia un usuario", 
  async execute(msg, args) {
    const user = msg.mentions.users.first();

    let message = '';
    if (user) {
      message += `${user} `;
    }
    await getInsult().then((insult) => {
      message += insult;
    });
    
    msg.edit(message);
  }
}
