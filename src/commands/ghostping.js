const { setTimeout } = require("timers/promises");

module.exports = {
  name: 'gping',
  description: "ghostpinguea a alguien, en los canales disponibles del server",
  usage: "gping <user mention>",
  async execute(msg, args)  {
    const user = msg.mentions.users.first();
    if(isNaN(user)) {
      msg.edit(`necesitas mencionar a alguien`);
      return;
    }
  
    msg.delete();
    msg.guild.channels.cache.forEach(async (ch) => {
      await setTimeout(100);

      if (ch.isText() && ch.permissionsFor(msg.guild.members.me).has('SEND_MESSAGES')){ 
        await ch.send(`${user}`).then(async (msgf) => {
          await msgf.delete();
        }).catch((err) => {
          console.log(`[!] - error al enviar el mensaje a ${ch.name}`);
        });
      }
    });
  }
}
