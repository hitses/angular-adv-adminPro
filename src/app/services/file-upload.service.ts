import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async uploadPhoto(
    file: File,
    type: 'users' | 'hospitals' | 'doctors',
    id: string
  ) {
    try {
      const url = `${baseUrl}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });
      const data = await resp.json();
      if (data.name) {
        return data.name;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
