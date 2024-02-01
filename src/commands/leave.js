const quotes = [
	"hell nah im leaving",
	"goodbye",
	"bye bye",
	"this server sucks, bye"
];

module.exports = {
  name: "leave",
  description: "comando para abandonar el servidor",
  usage: "leave",
  async execute(msg, args) {
    if (msg.guild) {
	  	if (msg.guild.ownerId == msg.author.id) {
	  	   await msg.edit("```hermano enserio cree que se puede ir de su propio servidor```");
	  	   return;
	  	}

      await msg.edit(`\`\`\`${quotes[Math.floor(Math.random()*quotes.length)]}\`\`\``);
      await msg.guild.leave();
    }
    else {
      await msg.edit("no estas en un servidor como para irte")
    }
  } 
}
