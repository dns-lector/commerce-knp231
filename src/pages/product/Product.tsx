import { useParams } from "react-router-dom";
import "./ui/Product.css";
import { useContext, useEffect, useState, useRef, type MouseEventHandler } from "react";
import ProductDao from "../../entities/product/api/ProductDao";
import { AppContext } from "../../features/app_context/AppContext";
import type ProductPageType from "../../entities/product/model/ProductPageType";
import ProductCard from "../../entities/product/ui/ProductCard";
import type IRestResponse from "../../entities/_rest/model/IRestResponse";



export default function Product() {
    const {setBusy, isBusy} = useContext(AppContext);
    const {slug} = useParams<string>();
    const [pageData, setPageData] = useState<ProductPageType|null>(null);

    useEffect(() => {
        if(slug) {
            setBusy(true);
            ProductDao
                .getProduct(slug)
                .then((r:IRestResponse) => {
                    setPageData({product: r.data});
                })
                .catch(err => {
                    setPageData(null);
                    console.error(err);
                })
                .finally(() => setBusy(false));
        }
    }, [slug]);

    return pageData === undefined ? <h1>Loading...</h1>
    : isBusy ? <></>
    : pageData === null ? <h1>Not Found</h1>
    : <>
    <div className="row"></div>
    {pageData.product.versions.map(pv =>
    <div className="row mb-3" key={pv.id}>
        <div className="col col-5">
            <img className="w-100" src={pv.imageUrl} alt={pageData?.product.title} />
        </div>
        <div className="col col-7 product-info">
            <h1>{pageData?.product.title} {pv.titleAddon}</h1>            
            <div>
                <div className='product-rating'>★★★★★ ({pageData.product.rating})</div>
                {pv.stock === 0
                ? <div className="product-unavailable">Передзамовлення</div>
                : pv.stock && pv.stock > 0 && pv.stock < 5
                    ? <div className="product-low-stock">Залишилось мало</div>
                    : <div className="product-available">У наявності</div>
                }
            </div>
            <div className="product-old-price">{pv.price + (pageData?.product.discount ?? 0)}</div>
            <div className="product-new-price">{pv.price}</div>
        </div>    
    </div>)}

    <br/>
    {/* <Recommended pageData={pageData} /> */}
    </>;
}

function Recommended({pageData}:{pageData:ProductPageType}) {
    const scrollRightRef = useRef<HTMLDivElement>(null);

    const scrollRightClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        scrollRightRef.current?.scrollBy({
            left: 150,
            behavior: "smooth",
          });
    };
    const scrollLeftClick: MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        scrollRightRef.current?.scrollBy({
            left: -150,
            behavior: "smooth",
          });
    };

    return <div className="recommended-box">

        <div className="recommended-container" ref={scrollRightRef}>
            <div className="recommended-row">
                {pageData?.recommended?.map(product => <ProductCard product={product} key={product.id} />)}
            </div>
        </div>

        <div className="scroll-left" role="button" onClick={scrollLeftClick}>
            &lt;
        </div>
        <div className="scroll-right" role="button" onClick={scrollRightClick}>
            &gt;
        </div>
    </div>
     ;
}
/*
Д.З. Змінити структуру сторінки product/{slug}:
якщо у товару є декілька версій, то залишити спільну для всіх назву
один раз заголовком сторінки, а різні версії відображати тільки з
додатками (Addon);
якщо версія одна, то лишити структуру без змін
*/