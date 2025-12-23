import { useContext, useEffect, useState } from "react";
import SiteButton from "../../features/buttons/SiteButton";
import ButtonTypes from "../../features/buttons/types/ButtonTypes";
import UserDao from "../../entities/user/api/UserDao";
import { AppContext } from "../../features/app_context/AppContext";

export default function Auth() {
    const {user} = useContext(AppContext);
    return user == null ? <AuthForm /> : <Profile />;
}

function AuthForm() {
    const {setUser, setBusy} = useContext(AppContext);

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isFormValid, setFormValid] = useState<boolean>(false);
    const [remember, setRemember] = useState(true);

    useEffect(() => {
        setFormValid(login.length > 2 && password.length > 2);
    }, [login, password]);

    const onAuthClick = () => {
        setBusy(true);
        UserDao
            .authenticate(login, password)
            .then(res => {
                if(res == null) {
                    alert("У вході відмовлено");
                }
                else {
                    // зберігаємо одержану інформацію у постійному сховищі
                    if(remember) {
                        window.localStorage.setItem("user-231", JSON.stringify(res));
                    }
                    // змінюємо стан застосунку
                    setUser(res);
                }
            })
            .finally(() => {
                setBusy(false);
            });
    };

    return <>
    <h1 className="display-4 text-center">Автентифікація</h1>
    <div className="row mt-4">
        <div className="col col-6 offset-3 text-center">
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-key"></i></span>
                <input type="text" className="form-control" placeholder="Логін" 
                    value={login} onChange={e => setLogin(e.target.value)}
                    aria-label="Логін" aria-describedby="login-addon"/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-unlock2"></i></span>
                <input type="password" className="form-control" placeholder="Пароль" 
                    value={password} onChange={e => setPassword(e.target.value)}
                    aria-label="Пароль" aria-describedby="password-addon"/>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={remember} className=" mb-3"
                        onChange={e => setRemember(e.target.checked)}/>&thinsp;
                    Запам'ятати
                </label>
            </div>
            
            <SiteButton 
                text="Вхід"
                action={onAuthClick}
                buttonType={isFormValid ? ButtonTypes.Red : ButtonTypes.White}
                />
        </div>
    </div>
    </>;
}

function Profile() {
    const {user, setUser} = useContext(AppContext);

    const exitAuth = () => {
        window.localStorage.removeItem("user-231");
        setUser(null);
    };

    return <>
    <h1 className="display-4 text-center">Кабінет користувача</h1>
    <div className="row">
        <div className="col col-6 offset-3 border text-center p-3">
            <div className="row">
                <div className="col col-4 offset-4">
                    <img src={user?.imageUrl} alt={user?.login} className="w-100 rounded-circle" />       
                </div>
            </div>
            <h2 className="display-5">{user?.name}</h2>
            <div className="row text-start mt-3">
                <div className="col col-3 offset-2">Ім'я</div>
                <div className="col col-5">{user?.name}</div>
                <div className="col col-1"><i className="bi bi-pencil"></i></div>
            </div>
            <div className="row text-start mt-3">
                <div className="col col-3 offset-2">E-mail</div>
                <div className="col col-5">{user?.email}</div>
                <div className="col col-1"><i className="bi bi-pencil"></i></div>
            </div>
            <div className="row text-start mt-3">
                <div className="col col-3 offset-2">Адреса</div>
                <div className="col col-5">{user?.address}</div>
                <div className="col col-1"><i className="bi bi-pencil"></i></div>
            </div>
            
            <div className="row mt-5">
                <div className="col col-4 offset-4">
                    <div className="row">
                        <SiteButton 
                            text="Вихід" 
                            buttonType={ButtonTypes.Red} 
                            action={exitAuth} /> 
                    </div>                    
                </div>                    
            </div>
                   
        </div>
    </div>
    </>;
}