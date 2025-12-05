import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../features/layout/Layout';
import Home from '../../pages/home/Home';
import Privacy from '../../pages/privacy/Privacy';
import Section from '../../pages/section/Section';
import Product from '../../pages/product/Product';

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='privacy' element={<Privacy />} />
        <Route path='product/:slug' element={<Product />} />
        <Route path='section/:slug' element={<Section />} />
      </Route>
    </Routes>
  </BrowserRouter>;
}
