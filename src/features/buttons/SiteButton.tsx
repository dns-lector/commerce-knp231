import ButtonTypes from "./types/ButtonTypes";
import './ui/SiteButton.css';

export default function SiteButton({buttonType, text} : {buttonType:ButtonTypes, text:string}) {

    const extraClass = 
      buttonType == ButtonTypes.Red ? 'button-red'
    : buttonType == ButtonTypes.White ? 'button-white'
    : "";

    return <div className={"site-button " + extraClass}>
        {text}
    </div>;
}