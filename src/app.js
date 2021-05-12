const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const req = require("request");

const { searchURL, command } = require("./utils/var");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

const makeURL = (query) => {
  return `${searchURL}${process.env.KEY}&q=${query}`;
};

const dateParser = (str) => {
  return str.split("T")[0];
};
const makeEmbed = (obj) => {
  const videoContainer = new Discord.MessageEmbed();
  const mainData = obj.items[0];

  return videoContainer
    .setTitle(mainData.snippet.title)
    .setURL(`https://www.youtube.com/watch?v=${mainData.id.videoId}`)
    .setImage(`https://i.ytimg.com/vi/${mainData.id.videoId}/maxresdefault.jpg`)
    .setColor("FF0000")
    .setDescription(`${mainData.snippet.description}`)
    .setAuthor(
      `${mainData.snippet.channelTitle} - ${dateParser(
        mainData.snippet.publishTime
      )}`
    );
};

client.on("message", (msg) => {
  const qValue = msg.content.split(command)[1];

  const getVideo = (query) => {
    req({ url: makeURL(query) }, (_err, res) => {
      msg.channel.send(makeEmbed(JSON.parse(res.body)));
    });
  };

  msg.content.includes(command) && getVideo(qValue);
});

client.login(process.env.TOKEN);
