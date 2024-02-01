const path = require("node:path");
const fs = require("node:fs");
const { prefix } = require("../config.js")

module.exports = {
  name: "help",
  description: "comando de ayuda para el bot",
  usage: "help <optional command>",
  async execute(msg, args) {
    let helpText = `ayuda para el selfbot\n\`\`\`\n`;
    const cogsPath = path.join(__dirname, './');
    const cogFiles = fs.readdirSync(cogsPath).filter(file => file.endsWith('.js'));

	 const command = args[0];
	 let found = false;
    for (const file in cogFiles) {
		
      const filePath = path.join(cogsPath, cogFiles[file]);

      const cog = require(filePath);
		
		if (!command){
        	helpText += `${cog.name} `;
			found = true;
	 	}
		if (command == cog.name) {
			helpText += `comando: ${cog.name}\ndescripcion: ${cog.description}\nuso: ${cog.usage}`
			found = true;
			break;
		}
	 }
	 if (!found) {
		helpText += "command \"" + command + "\" not found!"
	 }
	 if (!command){
		helpText += `\n\npara mas detalles pon:\n${prefix}help <commando>`
	 }
    helpText += `\`\`\``;
    await msg.edit(helpText);
  }
}
