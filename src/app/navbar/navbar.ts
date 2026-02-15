// core
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// spartan
import { HlmH3, HlmSmall } from '@spartan-ng/helm/typography';
import { HlmNavigationMenuImports } from '@spartan-ng/helm/navigation-menu';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, HlmH3, HlmSmall, HlmNavigationMenuImports],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class Navbar {
    routes = [
        { name: 'Home', path: '/' },
        { name: 'Tabs', path: '/tabs' },
        { name: 'Music', path: '/music' },
        { name: 'About', path: '/about' },
        { name: 'FAQ', path: '/faq' },
    ];

    socials = [
        { name: 'YouTube', path: 'https://www.youtube.com/@MaxNiessl' },
        { name: 'Instagram', path: 'https://www.instagram.com/maxniessl/' },
        { name: 'Ultimate Guitar', path: 'https://www.ultimate-guitar.com/u/maxniessl' },
    ];
}
