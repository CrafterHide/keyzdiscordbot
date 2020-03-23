const ball = [
  "Oui",
  "Non",
  "Peut-être"];

const Discord = require('discord.js');


const Canvas = require('canvas');
const Snekfetch = require('snekfetch');



const ms = require('ms');
const bot = new Discord.Client();
const admin = [
  "452734732761825302",  // Finat0s
  "438467875439902722"]; // CrafterHide
const code_gens = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"];

bot.login(process.env.SECRET);

var prefix = 'mod!';

// Description

bot.on("ready", function() {
var jeuxs = [
    `${bot.user.username} [ ${prefix} ]`, 
    `Par CrafterHide`,
    `Par Finat0s`,
    `${bot.user.tag}`];

  setInterval(function(){

    var jeux = jeuxs[Math.floor(Math.random()*jeuxs.length)];
    
    bot.user.setPresence({ 
      game:{ 
        name: jeux, 
        type: 0
      } 
    });
}, 5000); 
});

////////////////////////////////// Automatique //////////////////////////////////
////////////////////////////////// Automatique //////////////////////////////////
////////////////////////////////// Automatique //////////////////////////////////
////////////////////////////////// Automatique //////////////////////////////////
////////////////////////////////// Automatique //////////////////////////////////

///// Arrivée /////
///// Arrivée /////

bot.on("guildMemberAdd", user => {
  user.guild.channels.find("id", "661124205055574020").send(":white_check_mark: "+user+" vient d'arriver !! Nous sommes maintenant "+user.guild.memberCount);
  user.guild.channels.find("id", "689882458833027192").setName("Membres : "+user.guild.memberCount)
  var autorole = user.guild.roles.find("name", "non-vérifié")
  user.addRole(autorole)
  
  var code = code_gens[Math.floor(Math.random()*code_gens.length)]+code_gens[Math.floor(Math.random()*code_gens.length)]+code_gens[Math.floor(Math.random()*code_gens.length)]+code_gens[Math.floor(Math.random()*code_gens.length)]+code_gens[Math.floor(Math.random()*code_gens.length)]
  
  let canvas = Canvas.createCanvas(788,433);
  let ctx = canvas.getContext("2d");
  let background = Canvas.loadImage('https://cdn.glitch.com/ea95599e-eb18-46d0-9418-8f9d7307817b%2Fsecurity.jpg?v=1584826180621');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  let {body:buffer} = Snekfetch.get(user.user.displayAvatarURL);
  let avatar = Canvas.loadImage(buffer);
  ctx.font("35px, Consolas");
  ctx.fillStyle = "#000"
  ctx.fillText = code
  ctx.drawImage(avatar, 300, 200, 200, 200);
  let attachment = new Discord.Attachment(
  canvas.toBuffer(),
  "password.png"
  )
  
  user.guild.channels.find("name", "vérification").send(attachment)
  
bot.on('message', message => {
  if(message.content(code)){
    let autorole = message.guild.roles.find("name", "non-vérifié");
    let memberrole = message.guild.roles.find("name", "ｍｅｍｂｒｅｓ 💻");
    user.addRole(memberrole.id);
    user.removeRole(autorole.id);
  }
})
  
});

// Parti /////
// Parti /////

bot.on("guildMemberRemove", user => {
  user.guild.channels.find("id", "661124205055574020").send(":x: "+user+" vient de nous quitter !! Nous sommes maintenant "+user.guild.memberCount);
  user.guild.channels.find("id", "689882458833027192").setName("Membres : "+user.guild.memberCount)
});

///// BlackList /////
///// BlackList /////

bot.on("message", message => {
  let detect = ['connard','putte','putain','salop', 'salope', 'ta gueule', 'tg', 'fils de putte', 'enculé'];
    let foundInText = false;
    for(var i in detect) {
        if(message.content.toLowerCase().includes(detect[i].toLowerCase())) foundInText = true;
    }
    if(foundInText){
      let logs = message.guild.channels.find("name", "logs")
      let args = message.content.split(" ").slice(1);
      if(!logs) {
        console.log('Création du salon !')
        message.guild.createChannel("logs", {
          type:'text',
        })
        console.log('Salon créé !')
      }
          let darkembed = new Discord.RichEmbed()
          .setTitle('Insulte')
          .setColor('RANDOM')
          .addField('Auteur : ', message.author.username)
          .addField('Message : ',message.content.toLowerCase())
        message.guild.channels.find("name", "logs").send(darkembed)
          message.delete();
    }
});

///// Mention aléatoire /////
///// Mention aléatoire /////

bot.on("message", message => {
  let detect = ['@random'];
    let foundInText = false;
    for(var i in detect) {
        if(message.content.toLowerCase().includes(detect[i].toLowerCase())) foundInText = true;
    }
    if(foundInText){
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")){
          message.delete()
            message.channel.send("Vous n'avez pas la permission de @someone !");
        } else {
            message.channel.send(`<@${message.guild.members.random().user.id}>`)
        }
    }
});

////////////////////////////////// Fun //////////////////////////////////
////////////////////////////////// Fun //////////////////////////////////
////////////////////////////////// Fun //////////////////////////////////
////////////////////////////////// Fun //////////////////////////////////
////////////////////////////////// Fun //////////////////////////////////

///// Say /////
///// Say /////

bot.on("message", message => {
  
    if(message.content.startsWith(prefix + "say"))  { 
    let args = message.content.split(" ").slice(1);
                                                    
      if(!args[0]) { return message.channel.send(":x: Utilisation : " + prefix + "say <message>");}else{
      message.delete();
      message.channel.send(args.join(" "));
      }
}});

///// 8ball /////
///// 8ball /////

bot.on('message', async message => {
  if(message.content.startsWith(prefix+"8ball")){
  let args = message.content.split(` `).slice(1);
    if(!args[0]) return message.channel.send("Utilisation : "+prefix+"8ball <question>");
    try {
      message.delete();
      let alea = ball[Math.floor(Math.random()*ball.length)]
      let msg = args.join(` `);
        let sondage_embed = new Discord.RichEmbed()
        .setTitle("8ball")
        .setColor("RANDOM")
        .addField(":inbox_tray: Question", ""+msg)
        .addField(":outbox_tray: Réponse", ""+alea)
        message.channel.send(sondage_embed)
        message.emoji(':one:')
    } catch(e) {
        message.channel.send(".");
    }
}
});

////////////////////////////////// Infos //////////////////////////////////
////////////////////////////////// Infos //////////////////////////////////
////////////////////////////////// Infos //////////////////////////////////
////////////////////////////////// Infos //////////////////////////////////
////////////////////////////////// Infos //////////////////////////////////

///// Help /////
///// Help /////

bot.on('message', message => {
  if(!message.guild) return;
  if(message.content.startsWith(prefix+"help")){
    if(!admin.includes(message.author.id)) {
      var helpembed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor("RANDOM")
    .addField(prefix+"help", "Envoie cette aide")
    .addField(prefix+"ping", "Donne le ping du bot")
    .addField(prefix+"infos", "Donne des infos")
    .addField(prefix+"say", "Fais dire quelque chose au bot")
    .addField(prefix+"8ball", "Donne une réponse aléatoire")
    message.channel.send(helpembed);
    }else{
    var helpembed = new Discord.RichEmbed()
    .setTitle("Help")
    .setColor("RANDOM")
    .addField(prefix+"help", "Envoie cette aide")
    .addField(prefix+"ping", "Donne le ping du bot")
    .addField(prefix+"infos", "Donne des infos")
    .addField(prefix+"say", "Fais dire quelque chose au bot")
    .addField(prefix+"8ball", "Donne une réponse aléatoire")
    .addField(prefix+"ban", "Bannir un joueur")
    .addField(prefix+"kick", "Expulser un joueur")
    .addField(prefix+"mute", "Mute un joueur")
    .addField(prefix+"unmute", "Unmute un joueur")
    message.channel.send(helpembed);
    }
  }
})

///// Infos /////
///// Infos /////

bot.on('message', message => {
    if (message.content.startsWith(prefix + "infos")){
        var infos_embed = new Discord.RichEmbed()
        .setTitle(">\u00A0"+message.guild.name+"\u00A0<")
        .setColor("RANDOM")
        .addField(":face_with_monocle: Votre ID :", message.author.id)
        .addField(":busts_in_silhouette: Nombre d'utilisateurs :", message.guild.memberCount)
        .addField(":gear: Commande utile :", prefix+"help")
        .addField(":o: Status :", message.author.status)
        .setTimestamp(new Date())
        .setFooter("Par CrafterHide#7224")
        message.channel.sendEmbed(infos_embed);
}});

///// Ping /////
///// Ping /////

bot.on('message', message => {
    if(message.content.startsWith(prefix + 'ping')) {

      let msgping1 = new Date();

    let botping = new Date() - message.createdAt;

    let msgping2 = new Date() - msgping1;

    let pingembed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("Informations sur les connections du bot")
        .addField(":cupid: Ping de l'api : ", Math.floor(bot.ping) + 'ms')
        .addField(':robot: Ping du bot : ', Math.floor(botping) + 'ms')
        .addField(':incoming_envelope: Ping des messages : ', '~' + Math.round(msgping2) + 'ms')
        .setTimestamp(new Date())
        .setFooter("Par CrafterHide");

        
    return message.channel.send(pingembed);
    }
});

////////////////////////////////// Modération //////////////////////////////////
////////////////////////////////// Modération //////////////////////////////////
////////////////////////////////// Modération //////////////////////////////////
////////////////////////////////// Modération //////////////////////////////////
////////////////////////////////// Modération //////////////////////////////////

///// TestCommand /////
///// TestCommand /////

bot.on('message', message => {
  if(message.content.startsWith(prefix+'test')){
  if(admin.includes(message.author.id)) {
    message.channel.send('Test !')
    message.addReaction("");
  }else{
    message.reply('Seul un administrateur du bot paut faire cela !')
  }
  }
});

///// Re-Setup /////
///// Re-Setup /////

bot.on('message', message => {
  if(message.content.startsWith(prefix+"resetup")){
    if(admin.includes(message.author.id)){
    message.guild.channels.find("id", "689882458833027192").setName("Membres : "+message.guild.memberCount)
    var resetupembed = new Discord.RichEmbed()
    .setTitle("Re-setup")
    .setColor("RANDOM")
    .addField("MemberCount : ", message.guild.memberCount + " :white_check_mark:")
    }else{
      message.reply('Seul un administrateur du bot peut faire cela !')
    }
    }
});

///// Ban /////
///// Ban /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'ban')) {
    const user = message.mentions.users.first();
    if(message.member.hasPermission("BAN_MEMBERS")){
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'Aucune raison précisée',
        }).then(() => {
          message.reply(`L'utilisateur suivant a bien été banni : ${user.tag}`);
        }).catch(err => {
          message.reply(':x: Cet utilisateur à un rôle plus haut ou égal au miens :x:');
          console.error(err);
        });
      } else {
        message.reply(':x: Cet utilisateur n\'est pas dans le serveur :x:');
      }
    } else {
      message.reply(':x: Vous devez mentionner un utilisateur :x:');
    }
  }else{
    message.reply(':x: Vous n\'avez pas la permission requise :x:')
  }}
});

///// Kick /////
///// Kick /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'kick')) {
  if(message.member.hasPermission("KICK_MEMBERS")){
    const user = message.mentions.users.first();
    if(user) {
      const member = message.guild.member(user);
      if (member) {
        member.kick('Optional reason that will display in the audit logs').then(() => {
          message.reply(`L'utilisateur suivant a été kick : ${user.tag}`);
        }).catch(err => {
          message.reply(':x: Cet utilisateur à un rôle plus haut ou égal au miens :x:');
          console.error(err);
        });
      } else {
        message.reply(':x: Cet utilisateur n\'est pas dans le serveur :x:');
      }
    } else {
      message.reply(':x: Vous devez mensionner un utilisateur :x:');
    }
  }else{
    message.reply(':x: Vous n\'avez pas la permission requise :x:');
  }}
});

///// Evaluer Code /////
///// Evaluer Code /////

bot.on('message', async message => {
  if(message.content.startsWith(prefix+"eval")){
  let args = message.content.split(` `).slice(1);
    if(!admin.includes(message.author.id))return message.reply("Seul un administrateur du bot peut faire cela.");
    if(!args[0]) return message.channel.send("Entrez du code svp");
    try {
        let codein = args.join(" ");
        let code = eval(codein);

        if (typeof code !== 'string')
            code = require('util').inspect(code, { depth: 0 });
        let embed = new Discord.RichEmbed()
        .setAuthor('Evaluate')
        .setColor('RANDOM')
        .addField(':inbox_tray: Entrée', `\`\`\`js\n${codein}\`\`\``)
        .addField(':outbox_tray: Sortie', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send(embed)
    } catch(e) {
        message.channel.send(`\`\`\`js\n${e}\n\`\`\``);
    }
}
});

///// Sondage /////
///// Sondage /////

bot.on('message', async message => {
  if(message.content.startsWith(prefix+"sondage")){
  let args = message.content.split(` `).slice(1);
    if(!admin.includes(message.author.id))return message.reply("Seul un administrateur du bot peut faire cela.");
    if(!args[0]) return message.channel.send("Utilisation : "+prefix+"sondage <titre> <élément1> <élément2>");
    if(!args[1]) return message.channel.send("Utilisation : "+prefix+"sondage <titre> <élément1> <élément2>");
    if(!args[2]) return message.channel.send("Utilisation : "+prefix+"sondage <titre> <élément1> <élément2>");
    try {
      message.delete();
        let sondage_embed = new Discord.RichEmbed()
        .setTitle(args[0])
        .setColor("RANDOM")
        .addField(":a:"+args[1], ".")
        .addField(":b:"+args[2], ".")
        message.channel.send(sondage_embed)
        message.react('✅')
    } catch(e) {
        message.channel.send("@Sondage");
    }
}
});

///// MP /////
///// MP /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'mp')) {
    let args = message.content.split(" ").slice(1);
  if(admin.includes(message.author.id)) {
    const user = message.mentions.users.first();
    if(user) {
      const member = message.guild.member(user);
      if (member) {
        if(!args[1]){
          
        }
          //message.user.createDM().then(channel => {
        message.delete();
        message.channel.send("message bien envoyé à "+user.username+" !!")
        let warning = args.join(` `);
        let warnembed = new Discord.RichEmbed()
        .setTitle("Attention")
        .setColor("RED")
        .addField("Par : "+message.author.username,"Message : "+warning);
        user.sendMessage(warnembed);
        //}).catch(err => {
          //message.reply(':x: Cet utilisateur à un rôle plus haut ou égal au miens :x:');
          //console.error(err);
        //});
      } else {
        message.reply(':x: Cet utilisateur n\'est pas dans le serveur :x:');
      }
    } else {
      message.reply(':x: Vous devez mensionner un utilisateur :x:');
    }
  }else{
    message.reply('Seul un administrateur du bot peut faire cela.');
  }}
});

///// Mute /////
///// Mute /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'mute')) {
    let args = message.content.split(" ").slice(1);
  if(admin.includes(message.author.id)) {
    const user = message.mentions.members.first();
    if(user) {
      const member = message.guild.member(user);
      if (member) {
        if(!args[1]){
          
        }
        
        let autorole = message.guild.roles.find("name", "MUTED");
        let memberrole = message.guild.roles.find("name", "ｍｅｍｂｒｅｓ 💻");
        user.addRole(autorole.id);
        user.removeRole(memberrole.id);
          
      } else {
        message.reply(':x: Cet utilisateur n\'est pas dans le serveur :x:');
      }
    } else {
      message.reply(':x: Vous devez mensionner un utilisateur :x:');
    }
  }else{
    message.reply('Seul un administrateur du bot peut faire cela.');
  }}
}); 

///// Unmute /////
///// Unmute /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'unmute')) {
    let args = message.content.split(" ").slice(1);
  if(admin.includes(message.author.id)) {
    const user = message.mentions.members.first();
    if(user) {
      const member = message.guild.member(user);
      if (member) {
        if(!args[1]){
          
        }
        
        let autorole = message.guild.roles.find("name", "MUTED");
        let memberrole = message.guild.roles.find("name", "ｍｅｍｂｒｅｓ 💻");
        user.removeRole(autorole.id);
        user.addRole(memberrole.id);
          
      } else {
        message.reply(':x: Cet utilisateur n\'est pas dans le serveur :x:');
      }
    } else {
      message.reply(':x: Vous devez mensionner un utilisateur :x:');
    }
  }else{
    message.reply('Seul un administrateur du bot peut faire cela.');
  }}
}); 

///// TempMute /////
///// TempMute /////

bot.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix+'tempmute')) {
  if(admin.includes(message.author.id)) {
    let args = message.content.split(" ").slice(1);
    let member = message.mentions.members.first();
    if(!member) return message.reply('Nope : 1');
    let MuteRole = message.guild.roles.find('name', 'MUTED');
    if(!MuteRole) return message.reply('Nope: Ce rôle n\'existe pas');
    let temps = args[1];
    if(!temps) return message.reply('Nope: Le temps n\'est pas réel');
    
    member.addRole(MuteRole.id);
    message.channel.send('Vous avez mute '+member.user.username+' pour '+ms(ms(temps), {long: true}))
    
    setTimeout(function(){
      member.removeRole(MuteRole);
      message.channel.send(member+' est unmute')
    }, ms(temps));
  }else{
      message.reply('Seul un administrateur du bot paut faire cela !')
  }
  }
}); 

///// Clear /////
///// Clear /////

bot.on('message', message => {
  if(!message.guild) return;
  if(message.content.startsWith(prefix+'clear')){
  if(admin.includes(message.author.id)) {
    let args = message.content.split(" ").slice(1);
    let count = args[0];
    if(!count){
      message.reply('Veuillez définir un nombre de messages !')
    }else{
      if(isNaN(count)) {
        message.reply('Veuillez définir un nombre valide !')
      }else{
        if(count < 1 || count > 100){
          message.reply('Veuillez définir un nombre entre **1** et **100** !')
        }else{
          message.channel.bulkDelete(parseInt(count)+1);
        }
      }
    }
  }else{
    message.reply('Seul un administrateur du bot paut faire cela !')
  }
  }
});

///// Purge /////
///// Purge /////

bot.on('message', message => {
  if(message.content.startsWith(prefix+'purge')){
  if(admin.includes(message.author.id)) {
    message.channel.bulkDelete(100);
  }else{
    message.reply('Seul un administrateur du bot paut faire cela !')
  }
  }
});
