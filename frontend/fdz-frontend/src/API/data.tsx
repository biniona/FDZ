import React from "react";
import { API_URL } from "../constants";
export const loadCards = (setCards: React.Dispatch<any>) => {
    fetch(`${API_URL}/get-notes`, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((json) => setCards(json))
        .catch((err) => {
            throw err;
        });
};

export const saveCard = (filePath: string, content: string) => {
    const payload = JSON.stringify({ content: content, filePath: filePath });
    console.log(payload);
    fetch(`${API_URL}/save`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: payload,
    })
        .then((res) => {
            return console.log(res);
        })
        .catch((err) => {
            throw err;
        });
};
