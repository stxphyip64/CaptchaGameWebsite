// Note: this sketch consists of additional JavaScript
// files. Make sure to duplicate it, rather than copying
// and pasting code :)

let local_sd_api = "https://gpu.gohai.xyz:3000/";
let openai_api_proxy = "https://sordid-hexagonal-bunny.glitch.me/";
let replicate_api_proxy = "https://splashy-rambunctious-leader.glitch.me/";
let img;
let gameCompleted = false;
let messages = [
  {
    role: "system",
    content:
      "You are testing if the user is a robot or not by asking them a series of questions you are given. Do not ask user if they are ready to begin the game or not, just begin. Ask one question at a time. For each question, if the user says that they don't know the answer, they must provide reasoning for you to give them the answer to the question. If they can convince you that it is a good idea to give them the answer, you can provide them that answer to the question. First question, you will ask the user if they are a robot. If they say no, they can move on to second question. If they say yes, ask them again.  The second question you will give the user a random mathematical equation they have to solve. This should be easy to solve by the user and a different question each time asked. Make sure they solve it correctly. If they solve it correctly, they can move on to the third question. If they are incorrect, they must return to the first question.  Question three, you will ask the user to solve a random question that everyone should know the answer to. This should be easy to solve by the user and a different question each time asked. If the user solves it correctly, they can move on to question four. If they solve it incorrectly, they must return to the first question. For question four, say question four. Question four, you will simply tell the user to Type the letters they see. You do not need to provide the letters. Just ask the question. If they type the letter O, they have answered correctly and can move on to question five. If they do not answer it correctly, they must return to question one. For question five, say question five. Question five, you will ask the user if the image has a car in it. You do not need to provide the image, just ask the question and check the answer. If they answer it correctly, they have completed the game. If they do not answer correctly, they must return to the first question and say you are unsure if they are a robot or not. You do not need to ask the user if they are ready or not. You also do not need to tell the user what question they are on.",
  },
];

function setup() {
  createCanvas(500, 500);
  background(255);

  requestLSD("GET", "sdapi/v1/options", gotOptions);

  select("#submit").mouseClicked(sendMessage);
}

function gotOptions(results) {
  console.log(results);
  console.log("Using model " + results.sd_model_checkpoint);
}

function sendMessage() {
  createCanvas(500, 500);
  background(255);
  let content = select("#content").value();
  fill(0);
  noStroke();
  // don't send empty messages to the API
  if (content == "") {
    return;
  }
  messages.push({
    role: "user", // this comes from the user
    content: select("#content").value(),
  });

  select("#content").value("");
  // add the text to the array of messages
  // draw to the screen
  textSize(14);
  fill(0);
  textAlign(RIGHT, BOTTOM);
  text(content, 20, 20, width - 20, height - 20);
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);
}

function levelFour(results) {
  createCanvas(500, 500);
  fill(0);
  noStroke();
  textSize(14);
  // draw to the screen
  textAlign(LEFT, TOP);
  fill(0);
  text('Great! This is question four. Type the letter you see:', 20, 20, width - 20, height - 20);
  
  //let prompt = "black background ";
      let modelInput = {
      prompt: "Just the Letter O in block letter art style",
      
      }
        requestLSD("POST", "sdapi/v1/txt2img", modelInput, doneSDPredicting);
 
  console.log("Prompt: " + prompt);  
  
  //requestOAI("POST", "/v1/chat/completions", params, doneSDPredicting);
  }    
  //let modelInput = {
    //prompt: "5 letters in a row in a black background",
    // for more parameters, see the WebUI and results.parameters
  //};

  
  /*let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, doneSDPredicting);
  */

  
function predictImage() {
 let modelInput = {
    image: get(),
    prompt: "Is there a car in this image?"
  };

  predictReplicate(
    "yorickvp/llava-13b:2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591",
    modelInput,
    doneReplicatePredicting
  );

  console.log('Starting prediction, this might take a bit');
}
function doneReplicatePredicting(results) {
   console.log(results.join(""));
  //if (results == "Yes" && sendMessage(results) == "Yes") {
    //console.log("You have proven you are not a robot!")
  //} else if (results == "No" && sendMessage(results) == "No") {
    //console.log("You have proven you are not a robot!")
  //} 
}

function levelFive(results) {
  createCanvas(500, 500);
  fill(0);
  noStroke();
  textSize(14);
  // draw to the screen
  textAlign(LEFT, TOP);
  fill(0);
  text('Last Question! This is Question Five. Does the image have a car in it?', 20, 20, width - 20, height - 20);
  let modelInput = {
    prompt: "car",
    // for more parameters, see the WebUI and results.parameters
  };

  requestLSD("POST", "sdapi/v1/txt2img", modelInput, doneSDPredicting);

  /*
  console.log("Starting prediction, this might take a bit");
  let params = {
    model: "gpt-3.5-turbo",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, donePredicting);
  */
}


function doneSDPredicting(results) {
  //console.log(results);
  if (results && results.images.length > 0) {
    img = loadImage("data:image/png;base64," + results.images[0]);
  //messages.push(results.choices[0].message);
  }  
  
}


function gotResults(results) {
  console.log(results);
  background(255);
  // add the first response-choice to the messages array
  messages.push(results.choices[0].message);

  textSize(14);
  // draw to the screen
  textAlign(LEFT, TOP);
  fill(0);
  text(results.choices[0].message.content, 20, 20, width - 20, height - 20);
  if (results.choices[0].message.content.includes("fourth")) {
    levelFour(results);
  } else if (results.choices[0].message.content.includes("four")) {
    levelFour(results);
  }
  if (results.choices[0].message.content.includes("five")) {
    levelFive(results);
  } else if (results.choices[0].message.content.includes("final")) {
    levelFive(results);
    //gameCompleted = true;
  } else if 
    (results.choices[0].message.content.includes("Congratulations!")) {
      gameCompleted = true;
    }
  // use WebUI to change settings
}

function draw() {
  if (img && !gameCompleted) {
  
  //imageMode(CENTER);
  image(img, 0, 80, img.width , img.height );
  
  } 
  
}
