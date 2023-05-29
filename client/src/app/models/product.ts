import { User } from "./user";
export class Product{
    _id!:string;
    creator!:User;
    productName!: string;
    productDescription!:string;
    productImage?:URL;
    price!:number;
    createdAt!: string;
}