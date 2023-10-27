import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
    <nav>
      <a routerLink="/general-info">Загальна таблиця</a>
      <a routerLink="/short-info">Коротка інформація</a>
    </nav>
  `,
  styles: [
    `
      nav {
        background-color: lightblue;
        padding: 10px;
      }
      a {
        margin-right: 20px;
        color: white;
        text-decoration: none;
      }
    `,
  ],
})
export class NavigationComponent {}
