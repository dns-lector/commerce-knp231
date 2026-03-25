import Base64 from "../../../shared/base64/Base64";
import Config from "../../config/Config";
import type { UserType } from "../model/UserType";

export default class UserDao {

    static authenticate(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve, reject) => {
            fetch(`${Config.backendUrl}/User/SignIn`, {
                method: "PUT",
                headers: {
                    "Authorization": "Basic " + Base64.encode(`${login}:${password}`)
                }
            })
            .then(r => r.json())
            .then(j => {
                console.log(j);
                resolve({
                    name: "Досвічений користувач",
                    email: "user@i.ua",
                    address: "Одеса, Садова 3",
                    login: "user",
                    dob: "08 грудня 2025",
                    imageUrl: "/img/user.jpg"
                });
            })
            .catch(reject);
        });
    }

    static authenticateMock(login:string, password:string) : Promise<UserType|null> {
        return new Promise((resolve, _) => {
            setTimeout(
                () => {
                    if(login == "user" && password == "123") {
                        resolve({
                            name: "Досвічений користувач",
                            email: "user@i.ua",
                            address: "Одеса, Садова 3",
                            login: "user",
                            dob: "08 грудня 2025",
                            imageUrl: "/img/user.jpg"
                        })
                    }
                    else resolve(null);
                },
                700,
            )
        });
    }
}