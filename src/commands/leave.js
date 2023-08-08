module.exports = {
  name: "leave",
  description: "comando para abandonar el servidor",
  async execute(msg, args) {
    if (!msg.guild) {
      msg.edit("solo se pueden abandonar servidores");
      return;
    }
    await msg.edit(`\`\`\`Goodbye!\`\`\``);
    await msg.guild.leave();
  } 
}
