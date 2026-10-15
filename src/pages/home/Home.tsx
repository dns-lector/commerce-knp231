import {  useEffect, useState } from "react";

import SectionCard from "../../features/section_card/SectionCard";
import "./ui/Home.css";
import SectionDao from "../../entities/section/api/SectionDao";
import type IRestPagination from "../../entities/_rest/model/IRestPagination";
import type IProductSection from "../../entities/section/model/SectionType";

export default function Home() {
    const [homePageContent, setHomePageContent] = useState<HomePageContent|null>(null);
    const [pagination, setPagination] = useState<IRestPagination>({page:1, pageSize:4, totalItems:0, totalPages: 0});
    
    useEffect(() => {
        SectionDao.getSections(pagination.page, pagination.pageSize).then(r => {
            setHomePageContent({
                sections: r.data
            });
            setPagination(r.meta.pagination!);
        });
    }, [pagination.page]);

    return <>
    <h1 className="display-4"><i className="bi bi-house-heart"></i> Home, sweet home</h1>
    
    <div className="content-container">
        {homePageContent?.sections.map(sec => 
            <SectionCard section={sec} key={sec.title} />)}
    </div>

    {pagination.totalPages > 1 && <>
        <nav aria-label="Page navigation example" data-bs-theme="dark">
            <ul className="pagination">
                <li className={"page-item" + (pagination.page <= 1 ? " disabled" : "")}>
                    <span 
                        onClick={() => setPagination({...pagination, page:pagination.page-1})} 
                        className="page-link"
                        role="button"
                        aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                    </span>
                </li>
                {Array.from({length: pagination.totalPages}).map((_,i) => 
                    <li className={"page-item" + (pagination.page == i+1 ? " active" : "")} key={i}>
                        <span 
                            className="page-link" 
                            onClick={ pagination.page == i+1 ? undefined : 
                                () => setPagination({...pagination, page: i + 1})
                            }
                            role={pagination.page == i+1 ? undefined : "button"}>{i + 1}</span>
                    </li>
                )}
                <li className={"page-item" + (pagination.page >= pagination.totalPages ? " disabled" : "")}>
                    <span 
                        onClick={() => setPagination({...pagination, page:pagination.page+1})} 
                        className="page-link" 
                        role="button"
                        aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                    </span>
                </li>
            </ul>
        </nav>
    </>}

    </>;
}

type HomePageContent = {
    sections: Array<IProductSection>,
}
