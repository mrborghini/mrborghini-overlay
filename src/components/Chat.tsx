import { useState, useEffect, ReactElement, useRef } from "react";
import WebSocketClient from "./WebSocketClient";

function Chat() {
    const { messages } = WebSocketClient();
    const [showMessages, setShowMessages] = useState<ReactElement[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight + 2;
        }

        const updatedElements = messages.map((message, index) => (
            <div className="message" key={index}>{message}</div>
        ));
        setShowMessages(updatedElements);
    }, [messages, showMessages]);

    return (
        <>
            <div className="Chat" ref={chatRef}>
                {showMessages}
            </div>
        </>
    );
}

export default Chat;
