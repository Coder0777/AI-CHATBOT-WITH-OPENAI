const fs = require("fs");
const { keep_alive } = require("./keep_alive.js");
const login = require("fca-unofficial");
const { Configuration, OpenAIApi } = require("openai");
let prefix = '$';
let admin = ['100081144393297']; //Bruhhh this is a test uid

const configuration = new Configuration({
  apiKey: "", //Openai apikey here!
});


login({ appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8')) }, (err, api) => {
    if (err) return console.error(err);
    api.setOptions({ listenEvents: true });
    const listenEmitter = api.listen(async (err, event) => {
        if (err) return console.error(err);
        switch (event.type) {
            case "message":
            if (event.body != null) {
            let message = event.body;
               
               
if(message.startsWith("")) {
  let txt = message;
  try {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: txt,
    temperature: 1,
    max_tokens: 4000, 
    top_p: 1, 
    frequency_penalty: 1,
    presence_penalty: 1
  });
  api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID);
  } catch (error) {
      if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
      } else {
          console.log(error.message);
          api.sendMessage(error.message, event.threadID);                    
      }
  } 
}        
  
               
    }   
  }   
 })
});
