const openaiApiKey =
  PropertiesService.getScriptProperties().getProperty("APIKEY");
const openaiApiUrl = "https://api.openai.com/v1/chat/completions";

function doGet(e) {
  const userInputText = e.parameter.text;
  const callback = e.parameter.callback;
  const response = {
    output: [{ type: "text", value: postOpenAI(userInputText) }],
  };

  let responseText = "";
  if (callback) {
    // JSONP
    responseText = `${callback}(${JSON.stringify(response)})`;
    return ContentService.createTextOutput(responseText).setMimeType(
      ContentService.MimeType.JAVASCRIPT
    );
  } else {
    // JSON
    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function postOpenAI(message) {
  const messages = [{ role: "user", content: message }];
  const headers = {
    Authorization: "Bearer " + openaiApiKey,
    "Content-type": "application/json",
    "X-Slack-No-Retry": 1,
  };
  const options = {
    muteHttpExceptions: true,
    headers: headers,
    method: "POST",
    payload: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
    }),
  };
  const response = JSON.parse(
    UrlFetchApp.fetch(openaiApiUrl, options).getContentText()
  );
  return response.choices[0].message.content.trim();
}
