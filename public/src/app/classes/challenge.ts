import {Category} from './category';
export class Challenge{
 constructor(
     public title?: string,
     public description?: string,
     public thumb?:string,
     public url?: string,
     public categories?:Category[]
 ){}
}