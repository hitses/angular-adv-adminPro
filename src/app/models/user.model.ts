export class User {
  constructor(
    public name: string,
    public email: string,
    public pass?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public id?: string,
  ) { }
}