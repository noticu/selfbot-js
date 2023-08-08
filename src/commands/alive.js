const os = require('os');
const util = require('util');
const { exec } = require('child_process');

const execPromise = util.promisify(exec);

async function getSystemInfo() {
  const systemInfo = {};

  // Temperatura (Ejemplo)
  try {
    const { stdout } = await execPromise('cat /sys/class/thermal/thermal_zone0/temp');
    const temperature = parseFloat(stdout) / 1000; // Convertir a Celsius
    systemInfo.temperature = temperature;
  } catch (error) {
    console.error(`Error obteniendo temperatura: ${error.message}`);
  }

  // Distribución
  try {
    const { stdout } = await execPromise('uname -r');
    systemInfo.distributionInfo = stdout;
  } catch (error) {
    console.error(`Error obteniendo información de la distribución: ${error.message}`);
  }

  // Espacio en el Disco
  const { stdout } = await execPromise('df -h /');
  const lines = stdout.split('\n');
  const data = lines[1].split(/\s+/);
  systemInfo.diskSpace = data[1];

  // Uso de la RAM
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  systemInfo.ramUsage = usedMemory;

  // Uso de la CPU
  const cpuUsage = os.loadavg();
  systemInfo.cpuUsage = {
    '1min': cpuUsage[0],
    '5min': cpuUsage[1],
    '15min': cpuUsage[2]
  };

  return systemInfo;
}

module.exports = {
  name: "alive",
  description: "ver informacion de donde esta hosteado el selfbot",
  async execute(msg, args) {
    let info = await getSystemInfo();

    const stringInfo = `
🌡️ -> Temperatura: ${info.temperature.toFixed(2)}°C
🌐 -> Distribucion: ${info.distributionInfo || 'No disponible'}
💽 -> Espacio en el Disco: ${info.diskSpace}B
💻 -> Uso de la RAM: ${(info.ramUsage / 1073741824).toFixed(2)} GB
🔄 -> Uso de la CPU: 1min: ${info.cpuUsage['1min']}, 5min: ${info.cpuUsage['5min']}, 15min: ${info.cpuUsage['15min']}
`;
    msg.edit(`\`\`\`info del hosting:\n${stringInfo}\`\`\``)
    return;
  } 
}
