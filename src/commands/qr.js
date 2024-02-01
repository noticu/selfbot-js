const QRcode = require("qrcode");
const path   = require("node:path");

module.exports = {
  name: "qr",
  description: "convierte un texto a un qr",
  usage: "qr <text>",
  async execute(msg, args) {
    let message = "";
    let i = 0;
    while (args[i] != undefined) {
      message += ` `+args[i];
      i++;
    }
    message = message.slice(1);
    const fname = msg.id + ".png";
    const savePath = path.join(__dirname + "/../../", "tmp/");
    QRcode.toFile(savePath + fname, message, {
      errorCorrectionLevel: 'H'
    });
    msg.delete();
    msg.channel.send({
      files: [{
        attachment: savePath + fname,
        name: fname
      }],
      content: "qr para: " + message,
    })

  }
}
