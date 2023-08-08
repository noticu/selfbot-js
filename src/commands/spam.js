const { setTimeout } = require("timers/promises");

module.exports = {
  name: "spam",
  description: "spamea un texto cierta cantidad de veces",
  async execute(msg, args) {
    let text = "";
    let i = 1;
    const amount = parseInt(args[0]);
    while (args[i] != undefined) {
    text += " " + args[i];
      i++;
    }

    if (text == null || isNaN(amount)) {
      await msg.edit("falta algun argumento para el comando");
      await setTimeout(1000);
      await msg.delete();
      return;
    }
    
    await msg.delete();
    for (let i = 0; i<=amount; ++i) {
      msg.channel.send(text);
      if (amount>=50) {
        await setTimeout(500);
      }
    }
  }
}
