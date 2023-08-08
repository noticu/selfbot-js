const { setTimeout } = require("timers/promises");

module.exports = {
  name: "info",
  description: "muestra informacion sobre un usuario",
  async execute(msg, args) {
    const animation = ["|", "/", "-", "\\"]
    const user = msg.mentions.users.first();

    if (isNaN(user)) {
      await msg.edit("no haz proporcionado un usuario");
      await setTimeout(3000);
      await msg.delete();
      return;
    }

    user.fetch();
    const text = `

${user} doxing 
\`\`\`

id -> ${user.id}
fecha de creacion -> ${user.createdAt}
bio -> ${user.bio}
avatar -> ${user.displayAvatarURL()}
bot? -> ${user.bot ? "si" : "no"}
\`\`\`
`

    animation.forEach(async (frame) => {
      await msg.edit(`doxing your ass ${frame}`)
      await setTimeout(1000);
    });

    msg.edit(text);

  }
}
