function convert(input) {
  let out = "";
  for (const char of input) {
    out += `\\x${char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')}`;
  }
  return out;
}
module.exports = {
  name: 'shellcode',
  description: "convierte un string a caracteres de escape en hexadecimal",
  usage: "shellcode <texto>",
  async execute(msg, args)  {
    let string = "";
    let i = 0;
    while (args[i] != undefined) {
      string += ' '+args[i];
      i++;
    }
    string.slice(1);
    if (string == "") {
      msg.edit("no pusiste nada");
      return;
    }
    const modified = convert(string);
    msg.edit(`\`\`\`${string} -> ${modified}\`\`\``)
  }
}
