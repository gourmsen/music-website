import { Routes } from "@angular/router";

// components
import { HomeComponent } from "./home/home.component";
import { TabsComponent } from "./tabs/tabs.component";
import { MusicComponent } from "./music/music.component";
import { FaqComponent } from "./faq/faq.component";

export const routes: Routes = [
    {
        title: "Home | Max Niessl",
        path: "",
        component: HomeComponent,
    },
    {
        title: "Tabs | Max Niessl",
        path: "tabs",
        component: TabsComponent,
    },
    {
        title: "Music | Max Niessl",
        path: "music",
        component: MusicComponent,
    },
    {
        title: "FAQ | Max Niessl",
        path: "faq",
        component: FaqComponent,
    },
];
