/* Created by:
    E1GHTS1X
*/

'use strict'

const tmi = require ('tmi.js')
const config = require ("./config.json")
const colors = require ('colors')
const discord = require('discord.js')
const disclient = new discord.Client()

const options = {
    options: {debug: true},
    connection : {
        reconnect: true,
        secure:true,
    },
    identify: {
        username: config.username,
        password: config.oauth
    },
    channels: ['Put someones channel here.']
}

disclient.login(config.token)
disclient.on('ready', ()=> {
    console.log(`Discord Connected.`.rainbow)
})

const client = new tmi.client(options)

client.connect()
client.on('connected', (adress, port, err) => {
    if (err) {
        console.log("An error occurred".red, err.red)
        const channeldis = disclient.channels.cache.get(config.defaultchannel)
        channeldis.send(`An error occurred while trying to connect in twitch's api. ${err}`)
    }
    else {
        console.log("Twitch Connected.".rainbow, adress, port)
        const channeldis = disclient.channels.cache.get(config.defaultchannel)
        channeldis.send(`Twitch Connected. ${adress} ${port}`)
    }
})

client.on('message', (channel, tags, message) =>{
    if(message == config.mention) {
        const channeldis = disclient.channels.cache.get(config.defaultchannel)
        console.log(`${tags.username} mentioned you in: ${channel}`)
        channeldis.send(`${tags.username} mentioned you in: ${channel}`)
    }
})

disclient.on('message', msg => {
    if (msg.content == "!clear") {
        const channeldis = disclient.channels.cache.get(config.defaultchannel)
        channeldis.bulkDelete(100)
        msg.channel.send(`Chat clear by:: ${msg.author}`)
        console.log("Mentioning channel cleared.".blue)
    }
})