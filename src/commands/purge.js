module.exports = {
  name: "purge",
  description: "comando para purgear mensajes",
  usage: "purge <message quantity>",
  async execute(msg, args) {
    await msg.delete()
    const amount = parseInt(args[0]); 
    let counter = 0;
    if (isNaN(amount)) {
      return msg.edit("dame un numero de mensajes");
    }
    const messages = await msg.channel.messages.fetch();
    const userMessages = messages.filter((message) => message.author.id == msg.author.id);
    userMessages.forEach(mesg => {
      if (counter == amount) {
        return;
      }
      mesg.delete();
      counter += 1;
      });
  } 
}
