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
