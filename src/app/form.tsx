"use client";
import {type FormEvent, useState, useEffect} from "react";
import {v4 as uuidv4} from "uuid";

export default function Form() {
    const [message, setMessage] = useState("");
    const [url, setUrl] = useState("");
    const [userId, setUserId] = useState("");
    const [isActive, setIsActive] = useState(false);

    if (url === "") {
        setUrl("http://localhost/api/chat");
        setUserId(uuidv4());
        setIsActive(false);
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const request = {message: formData.get("message"), user_id: userId};

        if (url !== null) {

            const commentsList = document.querySelector(".screen");

            const comment = document.createElement("div");
            comment.className ='message'
            comment.innerHTML =
                `
                   <div class="sender-box">
                        <div class="sender-name">
                            <span>Client:</span>
                        </div>
                        <span> ` +
                formData.get("message")?.toString() + `
                        </span>
                    </div>

			`;

            setMessage("");
            setIsActive(true);
            commentsList?.append(comment);
            const response = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
            });

            if (response.ok) {
                const data = (await response.json()) as { Response: string };

                const commentResponse = document.createElement("div");
                commentResponse.className ='message'
                commentResponse.innerHTML =
                    `
                   <div class="receiver-box">
                        <div class="sender-name">
                            <span>Chat</span>
                        </div>
                        <span> ` +
                    data.Response + `
                        </span>
                    </div>

			`;
                setIsActive(false);
                commentsList?.append(commentResponse);
            }
        }
    }

    async function initChat() {

        console.log(url);
        const request = {message: "init", user_id: userId};
        setIsActive(true);

        const response = await fetch((url + '/init').toString(), {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            const data = (await response.json()) as { Response: string };

            const commentResponse = document.createElement("div");
            commentResponse.className ='message'
            commentResponse.innerHTML =
                `
                   <div class="receiver-box">
                        <div class="sender-name">
                            <span>Chat</span>
                        </div>
                        <span> ` +
                            data.Response + `
                        </span>
                    </div>

			`;
            setIsActive(false);
            const commentsList = document.querySelector(".screen");
            commentsList?.append(commentResponse);

        }
    }

    useEffect(() => {
        void initChat();
    }, []);

    return (

        <div className="phone">
            <div className="screen">
                <div className="message">

                </div>
            </div>
            <div className="input-box">
                <form onSubmit={onSubmit}>
                    <div>
                    <input
                        type="text"
                        name="message"
                        className="w-9/12"
                        id="message"
                        value={message}
                        placeholder="Type your message..."
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    </div>
                    <div className="send-bar">
                    {isActive &&
                    <div className="loading" >
                        <span className="loading-text">Sending...</span>
                        <div className="loader"></div>
                        <button className="loading-button" disabled>Send</button>
                    </div>
                    }
                    {!isActive &&
                    <button className="send-button" type="submit">Send</button>
                    }
                    </div>
                </form>
            </div>
        </div>


    );
}
