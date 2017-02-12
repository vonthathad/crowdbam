/**
 * Created by dat on 12/02/2017.
 */
import {Challenge} from './challenge';
import {User} from './user';
export class Comment{
  constructor(
  public challenge?: Challenge,
  public comment?:Comment,
  public created?:any,
  public modified?:any,
  public creator?: User,
  public votes?: number
  ){}
}
