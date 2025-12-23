import type ProductPageType from "../model/ProductPageType";
const p1 = { 
    id: "1", 
    name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)", 
    slug: "apple-iphone-17-pro-max-256gb-orange",
    price: 73499, discount: 6050, rating: 5, 
    imageUrl: "/img/CosmicOrange-1397x1397.png.webp",
    stock: 10
};
const p2 = { 
    id: "2", name: "Навушники Apple AirPods Pro 3 (MFHP4) (2025)", 
    slug: "navushnyky-apple-airpods-pro-3",
    price: 11899, discount: 2200, rating: 5, 
    imageUrl: "/img/vbfbg-1397x1397.png.webp",
    stock: 3
};
const p3 = { 
    id: "814897", name: "Apple iPhone 15 256GB (Pink)", 
    slug: "apple-iphone-15-256gb--pink-",
    price: 37999, discount: 2800, rating: 5, 
    imageUrl: "/img/pink (1)-1397x1397.jpeg.webp",
    stock: 0
};
// const p4 = 
// const p5 = 
export default class ProductDao {
    static getProduct(slugOrId:string): Promise<ProductPageType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch(slugOrId) {
                    case p1.id : case p1.slug : resolve({
                        product: p1,
                        recommended: [p2, p3]
                    }); break;

                    case p2.id : case p2.slug  : resolve({
                        product: p2,
                        recommended: [p1, p3]
                    }); break;   

                    case p3.id : case p3.slug  : resolve({
                        product: p3,
                        recommended: [p1, p2]
                    }); break;   

                    default: reject("Not Found: " + slugOrId);
                }
            }, 700);
        });
    }
}