const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const req = require("request");

dotenv.config();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  const getVideo = (query) => {
    req(
      {
        url: `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&key=${process.env.KEY}&q=${query}`,
      },
      (_err, res) => {
        msg.channel.send(res.body);
      }
    );
  };

  msg.content == "search Youtube" && getVideo("Tutorial Vim Benawad");
});

client.login(process.env.TOKEN);
