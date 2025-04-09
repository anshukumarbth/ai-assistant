import React, { useContext, useState } from "react";
import aiimage from "./assets/ai.png";
import { FaMicrophone } from "react-icons/fa6";
import { dataconstext } from "./context/UseContext";
import imgageSpeaking from "./assets/speak.gif"
import { useEffect } from "react";
import speakgif from "./assets/aiVoice.gif"
function App() {
  let { recognition, speaking, setSpeaking,responsetext} = useContext(dataconstext);
  const fullText = ["Listennig......", "Processing......", "Thinking....."];
  const typingSpeed = 100;
  const typingDelay = 500;

  const [text, setText] = useState("");
  const [currentIndex, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    let timeout;
    if (!isDeleting && charIndex < fullText[currentIndex].length) {
      timeout = setTimeout(() => {
        setText((prev) => prev + fullText[currentIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === fullText[currentIndex].length) {
      timeout = setTimeout(() => setIsDeleting(true), typingDelay);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % fullText.length);
    }

    return () => clearTimeout(timeout);
  }, [text, currentIndex, charIndex, isDeleting, fullText]);
  return (
    <div className="container flex flex-col overflow-hidden items-center h-screen w-full bg-black">
      <div className="mt-10">
        <img src={aiimage} alt="AI Image" width={300} />
      </div>
      <div className="text-4xl bg-gradient-to-b from-[rgb(139,114,166)] to-[#799ae2] text-transparent bg-clip-text font-bold mt-10 text-center font-mono animate-bounce max-md:text-xl">
        I'm SRI,Your Advanced Virtual Assistant.
      </div>

      {/* click button to hidden button and showing listennig gif  */}
      {!speaking ? (
        <button
          className="mt-10 bg-blue-400 w-[12rem] border-none shadow-amber-500 flex justify-center h-[3rem] items-center rounded-full text-2xl gap-2 text-white font-bold"
          style={{
            boxShadow: "2px 2px 20px rgba( 79,224,234)",
          }}
          onClick={() => {
            recognition.start(), setSpeaking(true);
          }}
        >
          Click here <FaMicrophone className="text-black animate-bounce" />
        </button>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          {/* change gif according to respose */}
          {responsetext.length === 0 ? (<img src={imgageSpeaking} alt="Speaking-gif" width={120} />):(
            <img src={speakgif} alt="Speaking-gif" width={200}/>
          )}
          
          {/* showing for after response */}
          {responsetext.length === 0 ? (
            <p className="text-white font-sans">
              {text}
            </p>
          ) : (
            <p className="text-white font-sans text-wrap w-[90%] text-center">
              {responsetext}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
