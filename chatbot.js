const chatux = new ChatUx();
const initParam = {
  renderMode: "auto",
  api: {
    endpoint: "Google Apps Script Endpoint",
    method: "GET",
    dataType: "jsonp",
    errorResponse: {
      output: [{ type: "text", value: "network error" }],
    },
  },
  bot: {
    wakeupText: null,
    botPhoto:
      "https://img.uxwing.com/wp-content/themes/uxwing/download/brands-social-media/chatgpt-icon.svg",
    humanPhoto: null,
    widget: {
      sendLabel: "SEND",
      placeHolder: "Say Something",
    },
  },
  window: {
    title: "ChatGPT-ChatBot",
    infoUrl: null,
  },
  wakeupButton: {
    right: 20,
    bottom: 30,
    size: 60,
    fontSize: 25,
  },
};
chatux.init(initParam);
chatux.start(true);
