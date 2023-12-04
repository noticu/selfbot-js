module.exports = {
  name: "leave",
  description: "comando para abandonar el servidor",
  async execute(msg, args) {
    await msg.delete();
    if (msg.guild) {
      if (!args[0]) {
        await msg.send(`\`\`\`hell nah im leaving\`\`\``);
      }
      await msg.guild.leave();
    }
    else {
      await msg.send("no estas en un servidor como para irte")
    }
  } 
}
