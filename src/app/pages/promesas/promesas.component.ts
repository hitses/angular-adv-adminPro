import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.scss']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers().then(users => {
      console.log(users);
    });
  }

  promesas() {
    const promesas = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola mundo');
      } else {
        reject('Adiós mundo');
      }
    });
    promesas.then((mess) => {
      console.log(mess);
    }).catch((err) => {
      console.log(err);
    });
    console.log('Fin del Init');
  }

  getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users?page=1')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
    });
  }
}
