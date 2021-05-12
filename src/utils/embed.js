module.exports = makeEmbed = (mainData, defEmbed, detailData) => {
  const dateParser = (str) => {
    return str.split("T")[0];
  };

  const intParser = (str) => {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return defEmbed
    .setTitle(`${mainData.snippet.title}`)
    .setURL(`https://www.youtube.com/watch?v=${mainData.id.videoId}`)
    .setImage(`https://i.ytimg.com/vi/${mainData.id.videoId}/maxresdefault.jpg`)
    .setColor("FF0000")
    .setDescription(`${mainData.snippet.description}`)
    .setAuthor(
      `${mainData.snippet.channelTitle} - ${dateParser(
        mainData.snippet.publishTime
      )}`
    )
    .setFooter("Dimas Andhika")
    .setTimestamp()
    .addFields({
      name: ":bar_chart: Statistics",
      value: `:eyes: Views: ${intParser(detailData.viewCount)}
      :thumbsup: Likes: ${intParser(detailData.likeCount)}
      :speech_balloon: Comments: ${intParser(detailData.commentCount)}
      :thumbsdown: Dislikes: ${intParser(detailData.dislikeCount)}`,
    });
};
