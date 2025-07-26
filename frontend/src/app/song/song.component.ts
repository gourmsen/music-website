// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";
import { ActivatedRoute, ParamMap, RouterModule } from "@angular/router";
import { catchError, EMPTY, map, switchMap, take, tap } from "rxjs";
import { YouTubePlayer } from "@angular/youtube-player";

// services
import { SongService } from "../services/http/song.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCircleDown } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { Song } from "../interfaces/song";

// enums
import { ToastType } from "../shared/toast/toast.enums";

@Component({
    selector: "app-song",
    imports: [CommonModule, RouterModule, ToastComponent, YouTubePlayer, FontAwesomeModule],
    templateUrl: "./song.component.html",
    styleUrl: "./song.component.css",
})
export class SongComponent {
    songsLoaded = false;

    songs: Song[] = [];
    song: Song;

    songsOfAlbum: Song[] = [];

    currentVideoUrl: string;
    selectedVideo: number;

    downloadIcon = faCircleDown;

    toastVisible: boolean;
    toastType: ToastType;
    toastMessage: string;
    toastDuration: number;

    constructor(private songService: SongService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.toastVisible = false;

        this.showToast(ToastType.Info, "Loading songs...", -1);

        // read song list and extract song
        this.songService
            .list()
            .pipe(
                take(1),
                catchError((err) => {
                    this.showToast(ToastType.Danger, "Unable to retrieve songs", 5000);

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
                    this.showToast(ToastType.Warning, "Song not found", 5000);

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
                }),

                // set current video url
                tap(() => {
                    this.onSwitchVideo(0);
                })
            )
            .subscribe();
    }

    get id() {
        return this.song?.id;
    }

    get trackNumber() {
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

    get videoUrl() {
        return this.song?.video_url;
    }

    get isolatedUrl() {
        return this.song?.isolated_url;
    }

    get backingUrl() {
        return this.song?.backing_url;
    }

    get tabUrl() {
        return this.song?.tab_url;
    }

    get createdAt() {
        return this.song?.created_at;
    }

    get updatedAt() {
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

    onSwitchVideo(type: number) {
        switch (type) {
            case 0:
                this.currentVideoUrl = this.videoUrl || "";
                this.selectedVideo = 0;
                break;
            case 1:
                this.currentVideoUrl = this.isolatedUrl || "";
                this.selectedVideo = 1;
                break;
            case 2:
                this.currentVideoUrl = this.backingUrl || "";
                this.selectedVideo = 2;
                break;
            default:
                this.currentVideoUrl = this.videoUrl || "";
                this.selectedVideo = 0;
                break;
        }
    }

    onToastClosed() {
        this.toastVisible = false;
    }

    showToast(type: ToastType, message: string, duration: number) {
        this.toastVisible = false;

        this.toastType = type;
        this.toastMessage = message;
        this.toastDuration = duration;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);
    }
}
