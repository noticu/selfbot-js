const path = require("node:path");
const fs = require("node:fs");

module.exports = {
  name: "help",
  description: "comando de ayuda para el bot",
  async execute(msg, args) {
    let helpText = `ayuda para el selfbot\n\`\`\`\n`;
    const cogsPath = path.join(__dirname, './');
    const cogFiles = fs.readdirSync(cogsPath).filter(file => file.endsWith('.js'));

    for (const file in cogFiles) {

      const filePath = path.join(cogsPath, cogFiles[file]);

      const cog = require(filePath);

      if ('name' in cog && 'description' in cog) {
        helpText += `nombre: ${cog.name}\ndescripcion: ${cog.description}\n`;
      }
    }
    helpText += `\`\`\``;
    await msg.edit(helpText);
  }
}
