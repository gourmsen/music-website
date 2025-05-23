// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";
import { ActivatedRoute, ParamMap, RouterModule } from "@angular/router";
import { catchError, EMPTY, map, switchMap, take, tap } from "rxjs";

// services
import { SongService } from "../services/http/song.service";

// interfaces
import { Song } from "../interfaces/song";

// enums
import { ToastType } from "../shared/toast/toast.enums";

@Component({
    selector: "app-song",
    imports: [CommonModule, RouterModule, ToastComponent],
    templateUrl: "./song.component.html",
    styleUrl: "./song.component.css",
})
export class SongComponent {
    songsLoaded = false;

    songs: Song[] = [];
    song: Song;

    songsOfAlbum: Song[] = [];

    toastVisible: boolean;
    toastType: ToastType;
    toastMessage: string;
    toastDuration: number;

    constructor(private songService: SongService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.toastVisible = false;

        this.toastType = ToastType.Info;
        this.toastMessage = "Loading songs...";
        this.toastDuration = -1;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        // read song list and extract song
        this.songService
            .list()
            .pipe(
                take(1),
                catchError((err) => {
                    this.toastVisible = false;

                    this.toastType = ToastType.Danger;
                    this.toastMessage = "Unable to retrieve songs";
                    this.toastDuration = 5000;

                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);

                    this.songsLoaded = false;

                    return EMPTY;
                }),

                // set songs
                tap((response) => (this.songs = response.body!.payload.songs)),

                // listen to route params and get id
                switchMap(() => this.activatedRoute.paramMap),
                map((pm: ParamMap) => +pm.get("id")!),

                // map id to song
                map((id) => this.findSongById(id)),
                catchError((err) => {
                    this.toastVisible = false;

                    this.toastType = ToastType.Warning;
                    this.toastMessage = "Song not found";
                    this.toastDuration = 5000;

                    setTimeout(() => {
                        this.toastVisible = true;
                    }, 10);

                    this.songsLoaded = false;

                    return EMPTY;
                }),

                // set song
                tap((song) => (this.song = song)),

                // set album songs
                tap(() => {
                    this.songsOfAlbum = this.songs.filter((song: Song) => song.album === this.song.album);

                    this.toastVisible = false;
                    this.songsLoaded = true;
                })
            )
            .subscribe();
    }

    get id() {
        return this.song?.id;
    }

    get track_number() {
        return this.song?.track_number;
    }

    get title() {
        return this.song?.title;
    }

    get artist() {
        return this.song?.artist;
    }

    get album() {
        return this.song?.album;
    }

    get difficulty() {
        return this.song?.difficulty;
    }

    get created_at() {
        return this.song?.created_at;
    }

    get updated_at() {
        return this.song?.updated_at;
    }

    findSongById(id: number) {
        let song = this.songs.find((song: Song) => song.id === id);

        if (song) {
            return song;
        } else {
            throw new Error();
        }
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
