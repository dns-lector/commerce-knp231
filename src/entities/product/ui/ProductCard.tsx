import './ProductCard.css';
import type { ProductType } from "../model/ProductType";
import Label from '../../../features/label/Label';
import LabelTypes from '../../../features/label/types/LabelTypes';
import SiteButton from '../../../features/buttons/SiteButton';
import ButtonTypes from '../../../features/buttons/types/ButtonTypes';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../features/app_context/AppContext';

export default function ProductCard({product}:{product: ProductType}) {
    const {cart, setCart, showToast} = useContext(AppContext);

    const buyClick = () => {
        let newCart = {...cart, price: cart.price + product.price};
        let item = newCart.items.find(i => i.product.id == product.id);
        if(item) {
            item.cnt += 1;
            item.price += product.price;
        }
        else {
            newCart.items.push({
                product: product, 
                price: product.price, 
                cnt: 1
            });
        }
        setCart(newCart);
        showToast({message: "Додано до кошику " + product.name});
    };

    return <div className="product-card">
        <Link to={"/product/" + (product.slug ?? product.id)}>
            {product.discount && product.discount > 0 &&
                <div className='product-card-discount'>
                    <Label type={LabelTypes.Violet} title={product.discount + " ₴"} />
                </div>}

            <div className='product-card-imgs'>
                <img src={product.imageUrl} alt={product.name} />
            </div>

            <div className='product-card-rating'>{product.rating}</div>
            
            <p>{product.name}</p>
        </Link>
        <div className='product-card-footer'>
            <SiteButton 
                buttonType={ButtonTypes.Red} 
                text='Купити'
                action={buyClick} />

            <span>{product.price} грн</span>
        </div>
    </div>;
}