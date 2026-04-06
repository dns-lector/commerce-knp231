import { useContext } from 'react';
import './ui/Cart.css';
import { AppContext } from '../../features/app_context/AppContext';
import CartItemCard from './ui/CartItemCard';
import SiteButton from '../../features/buttons/SiteButton';
import { useNavigate } from 'react-router-dom';
import CartDao from '../../entities/cart/api/CartDao';

export default function Cart() {
    const {cart, setCart, user, setUser, showModal} = useContext(AppContext);
    const navigate = useNavigate();

    const buyClick = () => {
        if(!user) {
            showModal({
                title: "Кошик",
                message: "Для оформлення замовлення необхідно увійти в систему",
                buttons: [
                    {title: "Увійти", callback: () => navigate('/auth')},
                    {title: "До покупок"},
                ]
            });
        }
        else {
            CartDao.order(cart, user.token)
            .then(_ => {
                showModal({
                    title: "Кошик",
                    message: "Замовлення створене",
                });
                setCart({
                    price: 0.0,
                    items: []
                });
            })
            .catch(err => {
                if(typeof err == 'number' && err == 401) {
                    setUser(null);
                    showModal({
                        title: "Кошик",
                        message: "Авторизована сесія добігла кінця",
                        buttons: [
                            {title: "Увійти", callback: () => navigate('/auth')},
                        ]
                    });
                }
                else {
                    showModal({
                        title: "Кошик",
                        message: "Виникла помилка, повторіть спробу пізніше",
                    });
                }
            });
        }
    };

    return <>
    <h1 className="display-4">
        <i className="bi bi-cart"></i>&thinsp; 
        Мій кошик &thinsp; 
        {cart.items.length} позицій &thinsp; 
        {cart.items.reduce((s,ci) => s + ci.cnt, 0)} товарів &thinsp; 
        на суму {cart.items.reduce((s,ci) => s + ci.price, 0)} грн
    </h1>
    {cart.items.map(cartItem => <CartItemCard key={cartItem.product.id} cartItem={cartItem} />)}

    {cart.items.length > 0 && <SiteButton text='Придбати' action={buyClick} />}
    </>;
}