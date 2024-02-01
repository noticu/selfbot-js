let cfg;
try {
  cfg = require("../config.json");
} catch(err) {
  console.log("[!] - ERROR archivo de configuracion no encontrado")
}

module.exports = {
  token: cfg["token"],
  prefix: cfg["prefix"] || ',',
  rpcEnabled: cfg["rpcEnabled"],
  rpcID: cfg["rpc"]["id"],
  rpcName: cfg["rpc"]["name"],
  rpcDescription: cfg["rpc"]["desc"],
  rpcImgURL: cfg["rpc"]["img_url"],
  rpcButtonText: cfg["rpc"]["button_text"],
  rpcButtonURL: cfg["rpc"]["button_url"],
  rpcURL: cfg["rpc"]["url"]
}
