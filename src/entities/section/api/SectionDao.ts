import type { SectionType } from "../model/SectionType";

export default class SectionDao {

    static getSection(slug:string) {
        return new Promise<SectionType>((resolve, reject) => {
            setTimeout(() => {
                switch(slug) {
                    case 'apple': resolve({
                        products: [
                            { id: "1", name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)", 
                                slug: "apple-iphone-17-pro-max-256gb-orange",
                                price: 73499, discount: 6050, rating: 5, imageUrl: "/img/CosmicOrange-1397x1397.png.webp"}
                        ]
                    }); break;
                    default: reject('"Slug not found"');
                }
            }, 300);
        });
    }

}