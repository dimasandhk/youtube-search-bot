const Discord = require("discord.js");
const client = new Discord.Client();
const dotenv = require("dotenv");
const req = require("request");

// Config, local modules
const { searchURL, command, statisticsURL } = require("./utils/var");
const embedConfig = require("./utils/embed");
dotenv.config();

client.on("ready", () => console.log(`Logged in as ${client.user.tag}`));

const makeURL = (query = "", useQuery, videoID) => {
  if (useQuery) return `${searchURL}${process.env.KEY}&q=${query}`;

  return `${statisticsURL}${process.env.KEY}&id=${videoID}`;
};

const makeEmbed = (obj, detail) => {
  const videoContainer = new Discord.MessageEmbed();
  const mainData = obj.items[0];

  return embedConfig(mainData, videoContainer, detail);
};

client.on("message", (msg) => {
  const qValue = msg.content.split(command)[1];

  const getVideo = (query) => {
    const dataStatistics = async (_err, res) => {
      const resBody = JSON.parse(res.body);

      // Get Statistics
      const id = resBody.items[0].id.videoId;
      const sendEmbed = (_err, detailData) => {
        const statistics = JSON.parse(detailData.body).items[0].statistics;

        msg.channel.send(makeEmbed(resBody, statistics));
      };
      req({ url: makeURL("", false, id) }, sendEmbed);
    };
    // Get Video Data
    req({ url: makeURL(query, true) }, dataStatistics);
  };

  msg.content.includes(command) && getVideo(qValue);
});

client.login(process.env.TOKEN);
