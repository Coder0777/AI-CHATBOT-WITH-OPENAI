const fs = require("fs"); //File system api, it helps you to read an files;
const { keep_alive } = require("./keep_alive.js"); //Keep alive, it makes the bot always active with interaction in pinger. 
const login = require("fca-unofficial"); //Fca unofficiall package to connect your account in Facebook 'https://www.npmjs.com/package/fca-unofficial'
const { Configuration, OpenAIApi } = require("openai"); //Openai package 'https://www.npmjs.com/package/openai'
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
  try {
  const openai = new OpenAIApi(configuration);
  const completion = await openai.createCompletion({
    model: "text-davinci-003", //Ai model
    prompt: message, //Input from a user e.g. 'What is jupiter?'
    temperature: 1,
    max_tokens: 4000, 
    top_p: 1, 
    frequency_penalty: 1,
    presence_penalty: 1
  });
  api.sendMessage(completion.data.choices[0].text, event.threadID, event.messageID); //Send a answer or a message!
  } catch (error) { //Catching an error and log it what it does.
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
