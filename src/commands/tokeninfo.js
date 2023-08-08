const axios = require("axios");
const { setTimeout } = require("timers/promises");
module.exports = {
  name: "tinfo",
  description: "conseguir informacion sobre una token",
  async execute(msg, args) {
    const token = args[0];
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
      'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11"
    };
    let info, infoJson, text;

    await axios.get("https://discordapp.com/api/v6/users/@me", { headers }).then((res) => {
      info = res;
      infoJson = res.data;
    }).catch(async (error) => {
      await msg.edit("no haz proporcionado una token o la token no es valida");
      await setTimeout(3000);
      await msg.delete();
      return;
    });

    if (info.status != 200) {
      await msg.edit("token proporcionada no valida");
      await setTimeout(3000);
      await msg.delete();
      return;
    }
    
    text = `
informacion sobre la token 
\`\`\`

token -> ${token}
nombre -> ${infoJson['username']}#${infoJson['discriminator']}
id -> ${infoJson['id']}
email -> ${infoJson['email']}
telefono -> ${infoJson['phone']}
avatar -> ${infoJson['avatar']}
\`\`\`
`;
    msg.edit(text);
  }
}
