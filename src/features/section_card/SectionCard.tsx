import { Link } from "react-router-dom";
import "./ui/SectionCard.css";
import type IProductSection from "../../entities/section/model/SectionType";

export default function SectionCard({section}: {section: IProductSection}) {
    
    return <Link className="section-card text-decoration-none" 
                 to={"/section/" + section.slug}>
        <div>
            <img src={section.imageUrl} />
        </div>        
        <p>{section.title} {section.children?.length}</p>
    </Link>;
}