const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767});
const settings = require("./settings.json")
const fs = require("fs");
require('./Loader.js')(client);

client.commands = new Discord.Collection(); 
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);
  console.log(`${files.length} komut yüklenecek.`); 
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} komutu yüklendi.`);
    client.commands.set(props.config.name, props); 
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(settings.token)
