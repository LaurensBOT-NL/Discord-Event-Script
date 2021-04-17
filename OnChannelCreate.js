const moment = require("moment")

const interpret = require("./intepreter")

const edit = require('edit')

const Discord = require("discord.js")
const addreactions_ = require("addreactions")
const delete_ = require('delete')

const channelCreate = async (client, CH) => {

    client.channelCreate.map(async command => {
    
    let message = {
        id: CH,
        content: "",
        idd: Math.floor(Math.random() * 10101003949393),
        author: client.user
    } 

    let created = moment(CH.createdAt).format("LLLL");

    let commandCode = command.code.replace("{id}", CH.id)
    .replace("{name}", CH.name)
    .replace("{type}", CH.type)
    .replace("{mention}", CH.toString(CH.id))
    .replace("{parentposition}", CH.position)
    .replace("{rawposition}", CH.rawPosition)
    .replace("{parentid}", CH.parentID)
    .replace("{parentname}", CH.parent.name)
    .replace("{guildid}", CH.guild.id)
    .replace("{guildname}", CH.guild.name)
    .replace("{created}", created)

    
    let name = await interpret(client, message, message.content.split(" "), command.name, command.name)
    
    let channel = client.channels.cache.get(name)
    
    if (!channel) return console.error(`Channel not found: ChannelCreateCommand[${name}]`)
    
    client.embeds.set(message.idd, new Discord.MessageEmbed())

    let code = await interpret(client, message, message.content.split(" "), command.name, commandCode)
    
    if (code) {
      let msg = channel.send(code, client.embeds.get(message.idd)).catch(err => {})
      
      edit(client, message, msg, client.editIn.get(message.idd)) 

      delete_(client, message, msg)

      addreactions_(client, message, msg)

      client.addReactions.delete(message.idd)
      
      client.suppress.delete(message.idd)
      
      client.embeds.delete(message.idd)
    } 

    })
}

module.exports = channelCreate;
