const axios = require("axios");

const ip_api = "http://ip-api.com/json/";


module.exports = {
  name: 'ipinfo',
  description: 'sacar informacion de una ip',
  usage: "ipinfo <ip>",
  async execute(msg, args) {
    const ip = args[0];
    let ipInfo;
    

    await axios.get(ip_api+ip).then((res) => {
      ipInfo = res.data;
    }); 

    

    if (ipInfo['status'] == 'fail') {
      await msg.edit("parece que la ip es de un rango reservado o la ip no es valida, por lo tanto no se le puede sacar informacion de la misma.");
      return;
    } 



    const finalInfo = `
\`\`\`
informacion sobre ${ip}

country -> ${ipInfo['country']}
region -> ${ipInfo['regionName']}
zip code -> ${ipInfo['zip']}
time zone -> ${ipInfo['city']}
isp -> ${ipInfo['isp']}

\`\`\`
`; 
    msg.edit(finalInfo);
    
  } 
}
