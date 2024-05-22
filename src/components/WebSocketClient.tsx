import { useState, useEffect } from 'react';

function WebSocketClient() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const socket = new WebSocket('wss://irc-ws.chat.twitch.tv:443');

        socket.onopen = () => {
            console.log('WebSocket connected');
            socket.send(`PASS oauth:${import.meta.env.VITE_OAUTH_TOKEN}`);
            socket.send(`NICK ${import.meta.env.VITE_CHANNEL_NAME}`);
            socket.send(`JOIN #${import.meta.env.VITE_CHANNEL_NAME}`);
        };

        socket.onmessage = (event) => {
            console.log(`Received ${event.data}`);
            if (`${event.data}`.includes("PING")) {
                socket.send("PONG");
                return;
            }

            if (`${event.data}`.includes("PRIVMSG")) {
                const splitHashTag = `${event.data}`.split("#");

                const splitColon = splitHashTag[1].split(":");

                const author = splitColon[0].split(" ")[0];

                const message = splitColon[1];

                const shownMessage = `${author}: ${message}`

                setMessages(prevMessages => [...prevMessages, shownMessage]);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            socket.close();
        };
    }, []);

    return { messages };
};

export default WebSocketClient;
