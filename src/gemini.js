let apikey = "AIzaSyBwz9e48EZ5JYJ6psKRdGCp3cCsQT0N5I0";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apikey);

const model = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash",
});

const generationConfig = {
  temperature: 0.2,
  maxOutputTokens: 20,
  topP: 0.8,
  topK: 40,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const text = await result.response.text();
  return text;
}

export default run;
