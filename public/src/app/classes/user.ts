export class User {
    constructor(
        public _id?:string,
        public avatar?: string,
        public username?: string,
        public displayName?: string,
        public bio?: string,
        public website?: string,
        public role?: string,
        public email?: string,
        public password?: string,
        public token?: string,
        public recommendations ?: string[]
    ) { }
}
