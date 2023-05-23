export class Product{
    _id!:string;
    creator?:string;
    productName!: string;
    productDescription!:string;
    productImage?:URL;
    price!:number;
    createdAt!: string;
}