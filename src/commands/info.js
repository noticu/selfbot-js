const { setTimeout } = require("timers/promises");
module.exports = {
  name: "info",
  description: "muestra informacion sobre un usuario",
  usage: "info <user mention>",
  async execute(msg, args) {
    const animation = ["|", "/", "-", "\\"]
	 const quotes = [
		  "gathering ur data from the nasa database",
		  "doxing ur ass",
		  "gathering info"
	 ]
    const user = msg.mentions.users.first();
	 const quote = quotes[Math.floor(Math.random() * quotes.length)];

    let mutualFriends;

    await user.mutualFriends.then((friends) => mutualFriends = friends.size)
    if (isNaN(user)) {
      await msg.edit("no haz proporcionado un usuario");
      await setTimeout(3000);
      await msg.delete();
      return;
    }

    const text = `
${user} info 
\`\`\`
id -> ${user.id}
creacion -> ${user.createdAt}
avatar ->  ${user.avatarURL({format: "jpg", size: 4096})}
bot ->   ${user.bot ? "si" : "no"}
mutual friends ->  ${mutualFriends}
\`\`\`
`

    animation.forEach(async (frame) => {
      await msg.edit(`${quote} ${frame}`)
      await setTimeout(1000);
    });

    msg.edit(text);

  }
}
