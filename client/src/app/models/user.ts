import { Product } from "./product";

export class User{
email!: string;
firstName!: string;
lastName!: string;
phoneNumber!: number;
products!:Array<Product>;
}
