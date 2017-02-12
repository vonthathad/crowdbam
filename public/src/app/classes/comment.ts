/**
 * Created by dat on 12/02/2017.
 */
import {Challenge} from './challenge';
import {User} from './user';
export class Comment {
  constructor(public _id?: string,
              public challenge?: Challenge,
              public comment?: string,
              public created?: any,
              public modified?: any,
              public content?:string,
              public creator?: User,
              public votes?: number,
              public comments?: Comment[]) {
  }
}
