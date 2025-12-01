import SiteButton from "../../features/buttons/SiteButton";
import ButtonTypes from "../../features/buttons/types/ButtonTypes";

export default function Home() {
    return <>
    <h1 className="display-4"><i className="bi bi-house-heart"></i> Home, sweet home</h1>
    <SiteButton buttonType={ButtonTypes.Red} text="Red Button"/>
    <SiteButton buttonType={ButtonTypes.White} text="White Button"/>
    </>;
}
