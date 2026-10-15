import { useParams } from "react-router-dom";
import './ui/Section.css';
import { useEffect, useState } from "react";
import SectionDao from "../../entities/section/api/SectionDao";
import ProductCard from "../../entities/product/ui/ProductCard";
import type IProductSection from "../../entities/section/model/SectionType";
import SectionCard from "../../features/section_card/SectionCard";

export default function Section() {
    const {slug} = useParams<string>();
    const [pageData, setPageData] = useState<IProductSection|null>(null);

    useEffect(() => {
        if(typeof(slug) != 'undefined') {
            SectionDao.getSection(slug).then(setPageData);
        }        
    }, [slug]);

    return <>
    <h1>Розділ: {pageData?.title}</h1>
    {(pageData?.children?.length ?? 0) > 0 && <div className="products-container">
        {pageData!.children!.map(s => <SectionCard section={s} key={s.title} />)}
    </div>}
    <div className="products-container">
        {pageData?.products.map(product => <ProductCard product={product} key={product.id} />)}
    </div>
    </>;
}