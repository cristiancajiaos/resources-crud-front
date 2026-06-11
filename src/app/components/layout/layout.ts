import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Loading } from '../loading/loading';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, Loading],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
