import { Link, Outlet } from "react-router-dom";
import './ui/Layout.css';
import Label from "../label/Label";
import LabelTypes from "../label/types/LabelTypes";

export default function Layout() {
    return <>
    <header>
        <nav className="navbar navbar-expand-lg border-bottom">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Комерція
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                <div className="nav-item">
                    <Label title="Каталог" type={LabelTypes.Black } />
                </div>    

                <form className="d-flex flex-grow-1" role="search">
                    <input className="form-control me-2 nav-search" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
                
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" title="Trade-In" aria-label="Trade-In">
                            <Label title="Trade-In" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/privacy" className="nav-link" title="Ремонт" aria-label="Ремонт">
                            <Label title="Ремонт" type={LabelTypes.Violet} />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/privacy" className="nav-link" title="Кабінет" aria-label="Кабінет">
                            <Label title="Кабінет" type={LabelTypes.Blue  } />
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
    </header>
    <main className="container mt-4"><Outlet /></main>
    <footer className="border-top p-3 text-muted">
        &copy; IT Step University &copy; KN-P-231, 2025. &emsp;
        Розробка комерційний застосунків. &emsp;
        <Link to="/privacy">Політика конфіденційності сайту</Link>
    </footer>
    </>;
}