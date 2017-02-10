import {Category} from './category';
import {Timeline} from './timeline';
export class Challenge{
 constructor(
     public id?: string,
     public _id?: string,
     public title?: string,
     public description?: string,
     public thumb?:string,
     public prize?: number,
     public url?: string,
     public categories?:Category[],
     public timelines?:Timeline[]
 ){}
}