import { Routes } from "@angular/router";

// components
import { HomeComponent } from "./home/home.component";
import { SongsComponent } from "./songs/songs.component";
import { SongComponent } from "./song/song.component";
import { MusicComponent } from "./music/music.component";
import { FaqComponent } from "./faq/faq.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { VerifyComponent } from "./verify/verify.component";
import { ResetComponent } from "./reset/reset.component";

export const routes: Routes = [
    {
        title: "Home | Max Niessl",
        path: "",
        component: HomeComponent,
    },
    {
        title: "Songs | Max Niessl",
        path: "songs",
        component: SongsComponent,
    },
    {
        title: "Song Details | Max Niessl",
        path: "songs/:id",
        component: SongComponent,
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
    {
        title: "Login | Max Niessl",
        path: "login",
        component: LoginComponent,
    },
    {
        title: "Register | Max Niessl",
        path: "register",
        component: RegisterComponent,
    },
    {
        title: "Verify | Max Niessl",
        path: "verify",
        component: VerifyComponent,
    },
    {
        title: "Reset | Max Niessl",
        path: "reset",
        component: ResetComponent,
    },
];
