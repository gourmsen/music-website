// core
import { Component, OnInit } from '@angular/core';

// primeng
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
    selector: 'app-navbar',
    imports: [MenubarModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
    items: MenuItem[] = [];

    ngOnInit() {
        this.items = [
            { label: 'Home', routerLink: '/' },
            { label: 'Songs', routerLink: '/songs' },
            { label: 'Projects', routerLink: '/projects' },
            { label: 'FAQ', routerLink: '/faq' },
        ];
    }
}
