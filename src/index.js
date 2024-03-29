const {Client, Collection, RichPresence} = require("discord.js-selfbot-v13");
const config = require("./config.js");
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");

const serv = express();
const client = new Client({
  checkUpdate: false,
});
client.commands = new Collection();

function onError(err) {
  console.log(`[x] - error: ${err}`);
}

const cogsPath = path.join(__dirname, 'commands/');
const cogFiles = fs.readdirSync(cogsPath).filter(file => file.endsWith('.js'));

for (const file in cogFiles) {

  const filePath = path.join(cogsPath, cogFiles[file]);

  const cog = require(filePath);

  if ('name' in cog && 'description' in cog) {
    console.log(`[+] - cargando comando ${cog.name} desde ${filePath}`)
    client.commands.set(cog.name, cog);
  } else {
    console.log(`[!] - el comando en ${filePath} le falta el name o la descripcion dentro de el, haz el favor de revisar que todo este correcto`);
  }
}



client.on('ready', () => {
  console.log(`[+] - loggeado como ${client.user.username}`);

  // poner un estado
  if (config.rpcEnabled) {
    console.log("[+] - cargando el rpc")
    const presence = new RichPresence();
	  presence.setApplicationId(config.rpcID);
		presence.setType('PLAYING');
		presence.setURL(config.rpcURL);
		presence.setName(config.rpcName);
		presence.setDetails(config.rpcDescription);
		presence.setStartTimestamp(Date.now());
		presence.setAssetsLargeImage(config.rpcImgURL);
		presence.addButton(config.rpcButtonText, config.rpcButtonURL);

		client.user.setActivity(presence);
  }
});
 
/*  handlear los comandos   */
client.on('messageCreate', async (msg) => {

  if (msg.author.id != client.user.id) return; // si el la id del mensaje del autor no es igual a la del cliente no hacer nada  

  if (!msg.content.startsWith(config.prefix)) return;

  const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  
  await client.commands.get(command).execute(msg, args)
    .catch(async (err) => {
      onError(err);
  });
});

serv.get('/', (_, res) => {
	res.send(`<h1>selfbot hosted sucefully</h1> <br>user -> ${client.user.username}<br>id -> ${client.user.id}<br> <img src="${client.user.avatarURL({format: "jpg", size: 4096})}">`);
});
serv.listen(1337);

client.login(config.token);

