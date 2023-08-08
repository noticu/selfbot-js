function base64(input) {
  let buffer = Buffer.from(input, 'utf-8');
  let base64 = buffer.toString('base64');
  return base64;
}

module.exports = {
  name: "base64",
  description: "encodea un texto a base64", 
  async execute(msg, args) {
    let text = '';
    let i = 0;
    let base64text;
    while (args[i] != undefined) {
      text += ' ' + args[i];
      i++;
    }
    if (text == '') {
      msg.edit("no pusiste nada");
      return;
    }
    base64text = base64(text);

    msg.edit(`\`\`\`${text} -> ${base64text}\`\`\``)
  }
}
