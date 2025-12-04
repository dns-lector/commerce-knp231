import { useParams } from "react-router-dom";

export default function Section() {
    const {slug} = useParams();

    return <>
    <h1>Розділ: {slug}</h1>
    </>;
}