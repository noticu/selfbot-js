const axios = require('axios');

let api = "https://evilinsult.com/generate_insult.php?lang=";

async function getInsult(lang) {
  let insult;
  await axios.get(api+lang).then((res) => {
    insult = res.data;
  });
  return insult;
}

module.exports = {
  name: "insult",
  description: "genera un insulto hacia un usuario", 
  usage: "insult <lang example: es> <optional user mention>",
  async execute(msg, args) {
    let lang = args[0];
    const user = msg.mentions.users.first();

    let message = '';

    if (!lang || lang.startsWith("<@")) {
      lang = "en";
    }

    if (user) {
      message += `${user} `;
    }
    await getInsult(lang).then((insult) => {
      message += insult;
    });
     
    msg.edit(message);
  }
}
