import { useContext, useEffect, useState } from "react";
import SiteButton from "../../features/buttons/SiteButton";
import ButtonTypes from "../../features/buttons/types/ButtonTypes";
import UserDao from "../../entities/user/api/UserDao";
import { AppContext } from "../../features/app_context/AppContext";
import Profile from "./ui/Profile";
import GlobalState from "../../features/global_state/GlobalState";
import type ISignupData from "../../entities/user/model/ISignupData";

export default function Auth() {
    const {user} = useContext(AppContext);
    return user == null ? <AuthPage /> : <Profile />;
}

function AuthPage() {
    const [pageMode, setPageMode] = useState(1);
    return <>
    <div className="text-center">
        <SiteButton 
            text="Автентифікація"
            action={() => setPageMode(1)}
            buttonType={ButtonTypes.Red}
            />
        &emsp;    
        <SiteButton 
            text="Реєстрація"
            action={() => setPageMode(2)}
            buttonType={ButtonTypes.White}
            />
    </div>
        <hr />
        {pageMode == 1 ? <AuthForm /> : <SignUp />}
    </>
}



function SignUp() {
    const {setBusy} = useContext(AppContext);
    const [signupData, setSignupData] = useState<ISignupData>({
        name: "", email: "", login: "", password: "", repeat: "", isAgree: false,        
    });    
    const [isFormValid, setFormValid] = useState<boolean>(false);

    useEffect(() => {
        setFormValid(signupData.name.length > 2 && signupData.email.length > 5 && 
            signupData.login.length > 2 && signupData.password.length > 2 && 
            signupData.password == signupData.repeat && signupData.isAgree);
    }, [signupData]);

    const onRegister = () => {
        setBusy(true);
        UserDao.signUp(signupData)
        .then(r => console.log(r))
        .catch(console.error)
        .finally(() => setBusy(false));
    };

    return <>
    <h1 className="display-4 text-center">Реєстрація</h1>
    <div className="row mt-4">
        <div className="col col-6 offset-3 text-center">
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="name-addon"><i className="bi bi-person"></i></span>
                <input type="text" className="form-control" placeholder="Name" 
                    value={signupData.name} 
                    onChange={e => setSignupData({...signupData, name: e.target.value})}
                    aria-label="Name" aria-describedby="name-addon"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="email-addon"><i className="bi bi-envelope"></i></span>
                <input type="text" className="form-control" placeholder="Email" 
                    value={signupData.email} 
                    onChange={e => setSignupData({...signupData, email: e.target.value})}
                    aria-label="E-mail" aria-describedby="email-addon"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="login-addon"><i className="bi bi-key"></i></span>
                <input type="text" className="form-control" placeholder="Логін" 
                    value={signupData.login} 
                    onChange={e => setSignupData({...signupData, login: e.target.value})}
                    aria-label="Логін" aria-describedby="login-addon"/>
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="password-addon"><i className="bi bi-unlock2"></i></span>
                <input type="password" className="form-control" placeholder="Пароль" 
                    value={signupData.password} 
                    onChange={e => setSignupData({...signupData, password: e.target.value})}
                    aria-label="Пароль" aria-describedby="password-addon"/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="repeat-addon"><i className="bi bi-unlock2"></i></span>
                <input type="password" className="form-control" placeholder="Повтор" 
                    value={signupData.repeat} 
                    onChange={e => setSignupData({...signupData, repeat: e.target.value})}
                    aria-label="Повтор" aria-describedby="repeat-addon"/>
            </div>
            <div>
                <label>
                    <input type="checkbox" checked={signupData.isAgree} className=" mb-3"
                        onChange={e => setSignupData({...signupData, isAgree: e.target.checked})}/>&thinsp;
                    Згоден з політикою конфіденційності сайту
                </label>
            </div>
            
            <SiteButton 
                text="Реєстрація"
                action={onRegister}
                buttonType={isFormValid ? ButtonTypes.Red : ButtonTypes.White}
                />
        </div>
    </div>
    </>;
    /*
Д.З. Реалізувати вхід (автентифікацію) до фронтенду у разі
успішного результату реєстрації (з використанням введених логіну і паролю)
    */
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
                    GlobalState.token = null;
                    alert("У вході відмовлено");
                }
                else {
                    // зберігаємо одержану інформацію у постійному сховищі
                    if(remember) {
                        window.localStorage.setItem("user-231", JSON.stringify(res));
                    }
                    // змінюємо стан застосунку
                    GlobalState.token = res.token;
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
