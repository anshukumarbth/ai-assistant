import React, { createContext, useState } from "react";
import run from "../gemini";
export const dataconstext = createContext();
function UseContext({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [responsetext, setResponsetext] = useState("");
  // for speek function
  function speak(text) {
    window.speechSynthesis.cancel();
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = "hi-IN";
    text_speak.pitch = 1;
    text_speak.rate = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
  }
  async function airesponse(prompt) {
    let text = await run(prompt);
    let newText =
      text.split("**") &&
      text.split("*") &&
      text.replace("google", "Anshu Kumar") &&
      text.replace("Google", "Anshu Kumar");
    takecommand(newText.toLowerCase());
    console.log(text);
  }
  // Add another future to like(open youtube,open google,open facebook etc)
  function takecommand(command) {
    if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("opening youtube...");
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5500);
    } else if (command.includes("open") && command.includes("linkedin")) {
      window.open("https://www.linkedin.com/", "_blank");
      speak("opening linkedin...");
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5500);
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("opening instagram...");
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5500);
    } else if (command.includes("open") && command.includes("github")) {
      window.open("https://www.github.com/", "_blank");
      speak("opening github...");
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5500);
    } else if (command.includes("open") && command.includes("facebook")) {
      window.open("https://www.facebook.com/", "_blank");
      speak("opening facebook...");
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5500);
    }
    else if(command.includes("open") && command.includes("portfolio")){
      window.open("https://anshukumar.vercel.app/","_blank")
      speak("opening portfolio...");
      setResponsetext(command);
      setTimeout(() => {
      setSpeaking(false);
    },5500);
  }
    else {
      speak(command);
      setResponsetext(command);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }
  }
  // speech recognition
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = new speechRecognition(0);
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transscript = e.results[currentIndex][0].transcript;
    console.log(transscript);
    airesponse(transscript);
  };
  const value = {
    recognition,
    speaking,
    setSpeaking,
    responsetext,
  };
  return (
    <div className="container">
      <dataconstext.Provider value={value}>{children}</dataconstext.Provider>
    </div>
  );
}
export default UseContext;
