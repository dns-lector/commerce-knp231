import { useState } from 'react';
import './ui/Back.css';

export default function Back() {
    const [json, setJson] = useState<string>("");

    const btnClick = () => {
        fetch("http://localhost:8080/java231web/gson")
        .then(r => r.text())
        .then(setJson);
    };
    const postClick = () => {
        fetch("http://localhost:8080/java231web/gson", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "x": 10,
                "str": null,
                "cyr": "Ґранд POST посилка",
                "b": true,
                "date": "2026-09-15 10:52:13"
            })
        })
        .then(r => r.text())
        .then(setJson);
    };

    const putClick = () => {
        fetch("http://localhost:8080/java231web/gson", {
            method: "PUT"
        })
        .then(r => r.text())
        .then(setJson);
    };

    return <>
    <button onClick={btnClick}>Get JSON</button>
    <button onClick={postClick}>Post JSON</button>
    <button onClick={putClick}>Put JSON</button>
    <p>{json}</p>
    </>;
}
/*
Д.З. На сторінці /back розмістити кнопки, що випробують
усі НТТР-методи запиту. Переконатись у правильній передачі
даних усіма методами. Додати скріншоти.
*/