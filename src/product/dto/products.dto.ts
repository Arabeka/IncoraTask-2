import { IsDefined } from "class-validator";

export class CreateProductsDto{
   title:string;
   price:number;
   quantity:number;
   tax:number;
}

export class GetProductDto{
   id:number;
   title:string;
   total_price:number;
   quantity:number;
   description:string;
   code:string;
}

export class QueryParamsDto{
   @IsDefined()
   offset:number;
   limit:number;
   sort_by:string;
   sort_type:string;
   s:string;
}

