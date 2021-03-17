import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

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

  get imgUrl(): string {
    const imgUrl = this.img.includes('https') ? this.img : `${baseUrl}/upload/users/${this.img}`;
    return imgUrl;
  }
}