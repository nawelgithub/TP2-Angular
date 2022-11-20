export interface product {
    //id: number; 
    id: string;
    name: string;
    price: number;
    promotion: boolean;

}


export interface PageProduct {
    products: product[];
    page: number;
    size: number;
    totalPages: number;
}