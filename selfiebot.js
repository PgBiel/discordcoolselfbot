/*jshint esversion:6*/
var Discord = require("discord.js");
const proto = require("helpful-prototypes");
const jsbeautify = require("js-beautify");
const beautify = jsbeautify.js_beautify;
const cheerio = require("cheerio");
proto.load();
const request = require("request");
let c = 0;
let coolarr = [];
let capitalize = function(str) {
  if (typeof str != "string") return str;
  if (str.length < 1) return str;
  if (str.length < 2) return str.toUpperCase();
  return `${str[0].toUpperCase()}${str.slice(1, str.length)}`;
};
let cut = function(text, joinStr = "\n ... \n ... \n ... \n", sliceCount = 500, blankStr = "\u2064") {
  let newtext = "";
  if (/^\s$/.test(blankStr)) {
    blankStr = "\u2064";
  }
  if (text.length === 0) {
    newtext = blankStr;
  } else if (text.length <= 1024) {
    newtext = text;
  } else {
    sliceCount = Math.min(sliceCount, 512);
    newtext = text.split ``.slice(0, sliceCount).join `` + joinStr + text.split ``.slice(-sliceCount).join ``;
    if (newtext.length >= 1024) {
      newtext = text.split ``.slice(0, 500).join `` + "\n ... \n ... \n ... \n" + text.split ``.slice(-500).join ``;
    }
  }
  return newtext;
};
let infarray = function stuff(amount, content, array = [], isoriginal = true) {
  let newarr = array;
  if (isoriginal) --amount;
  if (amount <= 0) {
    newarr[0] = content;
    return newarr;
  } else {
    newarr[0] = [];
    //console.log(util.inspect(newarr, {depth: Infinity}));
    let newam = amount - 1;
    stuff(newam, content, newarr[0], false);
  }
  if (isoriginal) return newarr;
};
let splitstring = function ss(str, splitat) {
  if (typeof str !== "string") return str;
  if (isNaN(splitat)) return str;
  return str.match(new RegExp(`[^]`.repeat(splitat <= 0 ? 1 : splitat), "g")).map(l => l.split ``);
};
let pairarray = (arr, splitat = 2) => {
  if (!(arr instanceof Array)) return arr;
  let newarr = [];
  let newobj = [];
  arr.map(i => {
    newobj.push(i);
    if (newobj.length === splitat) {
      newarr.push(newobj);
      newobj = [];
    }
  });
  return newarr;
};
let desplitstring = function ss(strarr) {
  if (!(strarr instanceof Array)) return strarr;
  return strarr.map(arr => arr.join("")).join("");
};
let swappairs = pairs => pairs instanceof Array ? pairs.map(arr => arr.reverse()) : (new TypeError("Pairs must be an array."));
let swapeach = (str, amount) => {
  return desplitstring(swappairs(splitstring(str, amount)));
};
let lastcharswap = function(str) {
  if (typeof str !== "string") return str;
  let lastchar = str.length <= 0 ? "" : str.match(/([^])$/)[1];
  let newstr = "";
  for (let letter of str) { newstr += letter; }
  if (lastchar) {
    let charregex = new RegExp(`(${lastchar}+)$`, "i");
    let chars = newstr.match(charregex)[1];
    newstr = `${chars}${newstr.replace(charregex, "")}`;
  }
  return newstr;
};

function ntoa(num) {
  let buf = new Buffer(4);
  buf.writeUInt32BE(num, 0);

  let a = [];
  for (let i = 0; i < 4; i++) {
    a[i] = buf.readUInt8(i);
  }

  return a.join('.');
}
let binarything = function(hexthing) {
  let hexs = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111"
  };
  let newstr = "";
  if (typeof hexthing !== "string") return hexthing;
  for (let letter of hexthing) { newstr += letter; }
  newstr = newstr.split("").map(l => hexs[l]).join("");
  return newstr;
};
let converthex = function(hex) {
  return parseInt(hex, 16); };
let infspec = a => require("util").inspect(a, { depth: Infinity });
const cmdss = require("./cmds.js");
let coolstuff = () => {
  Object.defineProperty(Discord.Channel.prototype, "sender", {
    get: function() {
      //console.log(this);
      return new cmdss.Send(this, me);
    }
  });
  Discord.Channel.prototype.sendr = function(content, options = {}) {
    return this.sender.send(content, options);
  };
};
//mem usage: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
const fs = require("fs");
process.chdir("Insert/Dir/Here.js");
var me = new Discord.Client({
  bot: false,
  disabledEvents: ["TYPING_START", "TYPING_STOP"]
});
//console.log(fs.readdirSync("./"));
let tags = require("./tagstags.json");

function writeTags() {
  fs.writeFileSync("./tagstags.json", JSON.stringify(tags));
  tags = require("./tagstags.json");
}

me.on("debug", console.log);
me.on("warn", console.log);
me.on("message", message => {
  let msg = message;
  var input = message.content;
  var chanel = message.channel;
  var themsg = message.content;

  if (message.author.id === "180813971853410305") {
    if (/^\/hidden\s{1,4}/.test(input)) {
      message.delete();
    }
    if (/^\/botoff$/i.test(input)) {
      message.delete().then(process.exit(1));
    }
    if (/^\/eval\s{1,4}/i.test(input)) {
      var functionToEval = message.content.match(/^\/eval\s{1,4}([^]+)$/i)[1];
      let evald;
      try {
        /*jshint ignore:start*/
        evald = eval(functionToEval);
        /*jshint ignore:end*/
        if (typeof evald != 'string') {
          evald = require('util').inspect(evald, { depth: 0 });
        }
        let replacea = { token: new RegExp(`${me.token}`, "ig"), email: new RegExp(`${me.user.email}`, "ig") };
        evald = evald.replace(replacea.token, '[le token]').replace(replacea.email, '[le email]');
        message.edit("", {
          embed: {
            title: "~---==Eval==---~",
            color: 0xe1ee17,
            fields: [{
              name: "Input",
              value: `\`\`\`js\n${functionToEval}\`\`\``
            }, {
              name: "Output",
              value: `\`\`\`js\n${evald}\`\`\``
            }]
          }
        });
      } catch (err) {
        let replacea = { token: new RegExp(`${me.token}`, "ig"), email: new RegExp(`${me.user.email}`, "ig") };
        message.edit("", {
          embed: {
            title: "~---==Eval==---~",
            color: 0xFF0000,
            fields: [{
              name: "Input",
              value: `\`\`\`js\n${functionToEval}\`\`\``
            }, {
              name: "Error!",
              value: `\`\`\`js\n${err.message.replace(replacea.token, "[le token]").replace(replacea.email, "[le email]")}\`\`\``
            }]
          }
        });
        console.log(err.message);
      }
    }
    if (/^\/deleval\s{1,4}/i.test(input)) {
      let functionToEval = message.content.match(/^\/deleval\s{1,4}([^]+)$/i)[1];
      let evald;
      try {
        /*jshint ignore:start*/
        evald = eval(functionToEval /*.replace(/\r?\n|\r/g, ' ')*/ );
        /*jshint ignore:end*/
        if (typeof evald != 'string') {
          evald = require('util').inspect(evald, { depth: 0 });
        }
        let replacea = { token: new RegExp(`${me.token}`, "ig"), email: new RegExp(`${me.user.email}`, "ig") };
        evald = evald.replace(replacea.token, '[le token]').replace(replacea.email, '[le email]');
        message.edit("", {
          embed: {
            title: "~---==Eval==---~",
            color: 0xe1ee17,
            fields: [{
              name: "Input",
              value: `\`\`\`js\n${functionToEval}\`\`\``
            }, {
              name: "Output",
              value: `\`\`\`js\n${evald}\`\`\``
            }]
          }
        });
      } catch (err) {
        message.delete();
        console.error(`${err instanceof Error?err.name:"Error"} (deleval) -> ${err instanceof Error?err.toString().replace(new RegExp(`^${err.name}:\\s?`), ""):err}`);
      }
    }
    /*if() {
      var justtestingok = message.content.replace(/PR ?/i, "");
      var cmonworkpls = justtestingok.split(" ");
      procedural(cmonworkpls[0],cmonworkpls[1]);
    }*/
    if(/^\/str\s{1,4}/i.test(input)) {
      var stro = input.replace(/^\/str\s{1,4}/i, "");
      var finalstroke = "~~" + stro + "~~";
      message.edit(finalstroke);
    }
    if(/^\/lenny$/i.test(input)) {
      message.edit("( ͡° ͜ʖ ͡°)");
    }
    if(/^\/nothing$/i.test(input)) {
      message.delete();
      chanel.sendMessage("_ _");
    }
    if(/^\/box\s{1,4}/i.test(input)) {
      var bxm = input.replace(/^\/box\s{1,4}/i, "");
      message.edit("```" + bxm + "```");
    }
    if (/^\/reply\s{1,4}(?:\d+|<@!?\d+>)\s{1,4}[^]+/i.test(input)) {
      let counted = 0;
      let replyTo = input.match(/^\/reply\s{1,4}(\d+)[^]*$/i) ? input.match(/^\/reply\s{1,4}(\d+)[^]*$/i)[1] : input.match(/^\/reply\s{1,4}(?:\d+|<@!?(\d+)>)\s{1,4}[^]+/i)[1];
      let oldreplyto = replyTo + "a";
      if (/^\/reply\s{1,4}<@!?(\d+)>\s{1,4}[^]+/i.test(input)) {
        if (me.users.has(replyTo)) {
          chanel.fetchMessages({limit: 20}).then(msgs=>{for (let msg of Array.from(msgs)) {
            let mmsg = msg[1];
            if (mmsg.author.id == replyTo) {
              replyTo = mmsg.id;
              break;
            }
          }
            if (replyTo == oldreplyto.replace(/a$/, "")) return message.edit("No message found by that user in the last 20 messages!");
            if (replyTo == "ohnoe") return message.edit("User not found.");
            const replyText = input.match(/^\/reply\s{1,4}(?:\d+|<@!?\d+>)\s{1,4}([^]+)/i)[1];
            message.channel.fetchMessages({limit: 1, around: replyTo}).then(messages=> {
                const replyToMsg = messages.first();
                message.channel.sendMessage(replyToMsg.author + ", " + replyText, {embed: {
                color: 3447003,
                  author: {
                    name: `${replyToMsg.author.username}`,
                    icon_url: replyToMsg.author.avatarURL
                  },
                  description: replyToMsg.content,
                  timestamp: new Date(),
                  footer: { text:`ID: ${replyToMsg.author.id}` }
                }})
                .then(() => message.delete());
            }).catch(err=>console.log(err.message));
          });
        }
        else {
          replyTo = "ohnoe";
        }
      } else {
        const replyText = input.match(/^\/reply\s{1,4}(?:\d+|<@!?\d+>)\s{1,4}([^]+)/i)[1];
        message.channel.fetchMessages({limit: 1, around: replyTo}).then(messages=> {
          if (messages.size !== 0) {
              const replyToMsg = messages.first();
              message.channel.sendMessage(replyToMsg.author + ", " + replyText, {embed: {
                color: 3447003,
                author: {
                  name: `${replyToMsg.author.username}`,
                  icon_url: replyToMsg.author.avatarURL
                },
                description: replyToMsg.content,
                timestamp: new Date(),
                footer: { text:`ID: ${replyToMsg.author.id}` }
              }})
              .then(() => message.delete());
          } else {
            message.edit("Message not found! [in this channel]");
            message.delete(3001);
          }
        }).catch(err=>console.log(err.message));
      }
    }
    if (/^\/anger\s{1,4}\d+$/i.test(input)) {
      let meter = input.match(/^\/anger\s{1,4}(\d)\d*$/i)[1];
      if (meter == 1) {
        message.edit(`/¯¯¯¯¯¯¯¯¯¯\\
  |:neutral_face: :angry: :rage:|
  \\\\\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_/
  :arrow_up:`);
      } else if (meter == 2) {
        message.edit(`/¯¯¯¯¯¯¯¯¯¯\\
  |:neutral_face: :angry: :rage:|
  \\\\\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_/
         :arrow_up:`);
      } else if (meter == 3) {
        message.edit(`/¯¯¯¯¯¯¯¯¯¯\\
  |:neutral_face: :angry: :rage:|
  \\\\\\_\\_\\_\\_\\_\\_\\_\\_\\_\\_/
                 :arrow_up:`);
      } else {
        message.edit(`Max anger number is 3.`).then(msg=>msg.delete(3000));
      }
    }
    if (/^\/reverse\s{1,4}[^]+$/i.test(input)) {
      let text = input.match(/^\/reverse\s{1,4}([^]+)$/i)[1];
      message.edit(text.split("").reverse().join(""));
    }
    if (/^\/revers\s{1,4}[^]+$/i.test(input)) {
      let text = input.match(/^\/revers\s{1,4}([^]+)$/i)[1];
      message.edit("\u202E"+text);
    }
    if (/^\/error\s{1,4}[^]+$/i.test(input)) {
      let text = input.match(/^\/error\s{1,4}([^]+)$/i)[1];
      message.edit(`\`\`\`js\nError:\n${text}\`\`\``);
    }
    if(/^\/cmd\s{1,4}[^]*$/i.test(message.content)) {
        message.delete();
        var query = message.content.match(/^\/cmd\s{1,4}([^]*)$/i)[1];
        var embed = new Discord.RichEmbed();
        var cp = require("child_process");
        embed.setTitle("~---=Command Line=---~");
        embed.addField("Query:", `\`\`\`js\n${query}\n\`\`\``);
        try {
        cp.exec(query, (error, stdout, stderr) => {
          let replacea = new RegExp(`${me.token.replace(/\./g, "\\.")}|${me.user.email.replace(/\./g, "\\.")}`, "ig");
            if (error) {
                embed.setColor(0xff0000);
                embed.addField("Error:", `\`\`\`js\n${error.toString().replace(replacea, "")}\n\`\`\``);
      console.log(`Command ${query} finished with error:\n${error}`);
                message.channel.sendEmbed(embed);
            } else {
              stdout = stdout.replace(replacea, "");
              stderr = stderr.replace(replacea, "");
                embed.setColor(0x00ff00);
                if (stdout || (!stdout && !stderr)) embed.addField("Stdout:", `\`\`\`js\n${stdout}\n\`\`\``);
                if (stderr) embed.addField("Stderr:", `\`\`\`js\n${stderr}\n\`\`\``);
                if (stderr.length !== 0) {
                    embed.setColor(0xffff00);
                }
                message.channel.sendEmbed(embed);
                console.log(`Command ${query} finished with stdout:\n${stdout}\nand with stderr:\n${stderr}`);
            }
        });
        } catch (err) {
            embed.setColor(0xff0000);
            embed.addField("Error:", `\`\`\`js\n${err.toString()}\n\`\`\``);
    console.log(`Command ${query} finished with error in try / catch: ${err.toString().replace(replacea, "")}`);
            message.channel.sendEmbed(embed);
        }
    }
    if (/^\/beautify(?:\s{1,4}[^]+)?$/i.test(input)) {
      let mode;
      if (!(/^\/beautify\s{1,4}[^]+$/i.test(input))) mode = "any";
      else {
        mode = input.match(/^\/beautify\s{1,4}([^]+)$/i)[1];
        if (!(["any", "self", "others"].testprop(mode))) return message.edit("Unknown mode, modes are `any`, `self`, and `others`.").then(m=>m.delete(3000));
      }
      let successful = false;
      chanel.fetchMessages({limit: 25}).then(msgs=>{
        successful = true;
        let checkspassed = false;
        msgs.map(m=>{
          if (/```js\n[^]+```/.test(m.content)) {
            if (!checkspassed) {
              if (mode == "any" || (mode == "others" && m.author.id !== me.user.id) || (mode == "self" && m.author.id == me.user.id)) {
                checkspassed = true;
                let beautified = m.content.match(/^[^]*```js\n([^]+)```[^]*$/)[1];
                beautified = beautify(beautified);
                message.edit("```js\n"+beautified+"```");
              }
            }
          }
        });
        if (!checkspassed) {
          message.edit("No code blocks found at mode `"+mode+"`!").then(mm=>mm.delete(3000));
        }
      });
    }
    if (/^\/t(?:ag)?\s{1,4}[^]+$/i.test(input)) {
      let tag = input.match(/^\/t(?:ag)?\s{1,4}([^]+)$/i)[1];
      if (!(tag.toLowerCase() in tags)) return message.edit(["Tag not found!", message.delete(4000)][0]);
      let taganswer = tags[tag.toLowerCase()];
      message.edit(taganswer);
    }
    if (/^\/mtag\s{1,4}.+\s{1,4}{.+}\s{1,4}[^]+$/i.test(input)) {
      let action = input.match(/^\/mtag\s{1,4}(.+)\s{1,4}{.+}\s{1,4}[^]+$/i)[1];
      if (!(["add", "remove", "a", "r"].testprop(action))) return message.edit(["Valid actions are add and remove!", message.delete(4000)][0]);
      let tag = input.match(/^\/mtag\s{1,4}.+\s{1,4}{(.+)}\s{1,4}[^]+$/i)[1];
      let response = input.match(/^\/mtag\s{1,4}.+\s{1,4}{.+}\s{1,4}([^]+)$/i)[1];
      if (["add", "a"].testprop(action)) tags[tag.toLowerCase()] = response;
      else delete tags[tag.toLowerCase()];
      writeTags();
      message.edit([`Tag ${["add", "a"].testprop(action)?"added":"removed"} successfully!`, message.delete(3500)][0]);
    }
    if (/^\/dark\s{1,4}[^]+$/i.test(input)) {
      let dark = input.match(/^\/dark\s{1,4}([^]+)$/i)[1];
      let darkified = dark.split("").map(g=>{
        if (/[a-z\s]/i.test(g)) {
          return ` ${g}`;
        }
        return g;
      }).join("");
      message.edit(darkified);
    }
    if (/^\/reg\s{1,4}[^]+$/i.test(input)) {
      let content = input.match(/^\/reg\s{1,4}([^]+)$/i)[1];
      let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l=>l.toLowerCase());
      let regionals = "🇦 🇧 🇨 🇩 🇪 🇫 🇬 🇭 🇮 🇯 🇰 🇱 🇲 🇳 🇴 🇵 🇶 🇷 🇸 🇹 🇺 🇻 🇼 🇽 🇾 🇿".split(" ").map(l=>l+" ");
      let numbers = "one two three four five six seven eight nine keycap_ten".split(" ").map(n=>`:${n}:`);
      let characters = {
        "?": "❔",
        "!": "❕",
        "#": "#⃣",
        "*": "*⃣",
        "$": "💲",
        "+": "➕",
        "-": "➖",
        "÷": "➗",
        "×": "✖"
      };
      let charkeys = Object.keys(characters);
      let charregex = new RegExp("["+charkeys+"]", "i");
      let newcontent = content.split("");
      newcontent = newcontent.map((c, ind)=>{
        if (/[a-z]/i.test(c)) {
          let index;
          alphabet.map((l, i)=>{
            if (l == c.toLowerCase())
              index = i;
          });
          return regionals[index];
        } else if (/\d/.test(c)) {
          let index = Number(c);
          if (newcontent[ind+1] === "0" && c == 1) {
            return ":keycap_ten:";
          } else if (newcontent[ind-1] === "1" && c == 0) {
            return "";
          }
          return numbers[index-1];
        } else if (/\s/.test(c)) {
          return c.repeat(3);
        } else if (charregex.test(c)) {
          return characters[c];
        }
        return c;
      }).join("");
      message.edit(newcontent);
    }
    if (/^\/dstatus$/i.test(input)) {
      request("https://status.discordapp.com/", (err, resp, body)=>{
        if (!err && resp.statusCode === 200) {
          let $ = cheerio.load(body);
          let embed = new Discord.RichEmbed();
          embed.setAuthor("Discord Status", "http://is2.mzstatic.com/image/thumb/Purple111/v4/09/9a/70/099a7006-64c4-a170-de06-42d859a2af9d/source/175x175bb.jpg", "https://status.discordapp.com");
          if ($(".page-status.status-none").length > 0) {
              embed.setColor(0x56A270)
              .setTitle("All systems operational")
              .setDescription("👍🏼");
            message.edit("", {embed});
          } else {
            //console.log("1+1");
            let incident = $(".unresolved-incident");
            let classes = incident.attr("class").split(" ");
            let _$ = cheerio.load(incident.html());
            let title = cheerio.load(_$(".incident-title").html());
            title = title(".actual-title");
            let description = cheerio.load(_$(".updates").html());
            description = description(".update").html().replace(/<strong>([^]+)<\/strong>/g, "**$1**").replace(/<small>[^]+<\/small>/g, "").replace(/<br(?:\s?\/)?>/g, "\n").replace(/"/g, "");
            //console.log(String(2+2)+`\n${description}`);
            //console.log(description);
            let decode = require("html-entities").AllHtmlEntities;
            decode = new decode().decode;
            //console.log(classes);
            description = cut(description);
            embed.setTitle(title.text())
            .setDescription(decode(description));
            let color;
            //console.log(classes[1]);
            switch(classes[1]){
              case "impact-none":
                color=0x333333;
                break;
              case "impact-critical":
                color=0xf04747;
                break;
              case "impact-major":
                color=0xf26522;
                break;
              case "impact-minor":
                color=0xfaa61a;
                break;
              case "impact-maintenance":
                color=0x3498DB;
                break;
            }
            //console.log(color);
            if (color) embed.setColor(color);
            message.edit("", {embed});
          }
        } else {
          console.error("Error at requesting discord status: "+err);
          message.edit("An error occured at requesting discord status!").then(()=>message.delete(3000));
        }
      });
    }
    if (/^\/enc\s{1,4}[^]+$/i.test(input)) {
      let content = input.match(/^\/enc\s{1,4}([^]+)$/i)[1];
      message.edit(zws.encode(content));
      console.log("ZWS: "+zws.encode(content));
    }
    if (/^\/dec\s{1,4}[^]+$/i.test(input)) {
      let content = input.match(/^\/dec\s{1,4}([^]+)$/i)[1];
      message.edit(zws.decode(content));
      console.log("ZWS-de: "+zws.decode(content));
    }
    if (/^\/badge\s.+$/i.test(message.content)) {
      let term = message.content.match(/^\/badge\s(.+)$/i)[1];
      message.delete();
      chanel.sendFile(`https://img.shields.io/badge/${encodeURIComponent(term)}.png`);
      /*let embed = new Discord.RichEmbed();
      embed.setColor(0x00ff00);
      embed.setImage(`https://img.shields.io/badge/${encodeURIComponent(term)}.png`);
      embed.setTitle("Badge");
      message.edit({
          embed
      });*/
    }
    if (/^\/log\s{1,4}[^]+$/i.test(input)) {
      let logg = input.match(/^\/log\s{1,4}([^]+)$/i)[1];
      message.delete();
      if (/-\w+$/.test(logg)) {
        let arg = logg.match(/^[^]*-(\w+)$/)[1];
        if (colors[arg]) {
          logg = logg.replace(/-\w+$/, "");
          console.log(colors[arg](logg));
        } else {
          console.log(logg);
        }
      } else
        console.log(logg);
    }
    if (/^\/logg\s{1,4}[^]+$/i.test(input)) {
      let logg = input.match(/^\/logg\s{1,4}([^]+)$/i)[1];
      message.delete();
      eval(`console.log(${logg})`);
    }
  }
});

me.on("disconnect", ()=>process.exit(1));
me.on("reconnect", ()=>process.exit(1));
me.login("insert token");
