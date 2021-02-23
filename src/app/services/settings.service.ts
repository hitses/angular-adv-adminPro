import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public year = new Date().getFullYear();
  private linkTheme = document.querySelector('#theme');

  constructor() {
    const URL = localStorage.getItem('theme') || './assets/css/colors/megna-dark.css';
    this.linkTheme.setAttribute('href', URL);
  }

  changeTheme(theme: string) {
    const URL = `./assets/css/colors/${theme}.css`;
    this.linkTheme.setAttribute('href', URL);

    localStorage.setItem('theme', URL);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const LINKS = document.querySelectorAll('.selector');
    LINKS.forEach(elem => {
      elem.classList.remove('working');
      const BTN_THEME = elem.getAttribute('data-theme');
      const BTN_THEME_URL = `./assets/css/colors/${BTN_THEME}.css`;
      const CURRENT_THEME = this.linkTheme.getAttribute('href');

      if (BTN_THEME_URL === CURRENT_THEME){
        elem.classList.add('working');
      }
    });
  }
}
