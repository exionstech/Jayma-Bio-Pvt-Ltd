"use client";

declare global {
  interface Window {
    botpressWebChat: any;
  }
}

import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.botpressWebChat.init({
        botId: "90d917d2-5b11-41fb-8bda-902bc0d68b2a",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "90d917d2-5b11-41fb-8bda-902bc0d68b2a",
      });
    };
  }, []);

  return <div id="webchat" />;
};

export default Chatbot;
