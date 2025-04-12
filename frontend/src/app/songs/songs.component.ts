// basic
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ToastComponent } from "../shared/toast/toast.component";

// forms
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";

// services
import { SongService } from "../services/http/song.service";

// icons
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// interfaces
import { SongListResponse } from "../interfaces/song";

// enums
import { ToastTypes } from "../shared/toast/toast.enums";

@Component({
    selector: "app-songs",
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule, ToastComponent],
    templateUrl: "./songs.component.html",
    styleUrl: "./songs.component.css",
})
export class SongsComponent {
    songsLoaded = false;

    songs: any;
    songsSortedByArtist: any;

    searchForm: FormGroup;
    searchIcon = faMagnifyingGlass;

    toastVisible: boolean;
    toastType: ToastTypes;
    toastMessage: string;
    toastDuration: number;

    songListResponse: SongListResponse;

    constructor(private formBuilder: FormBuilder, private songService: SongService) {}

    ngOnInit() {
        this.toastVisible = false;

        this.searchForm = this.formBuilder.group({
            search: ["", [Validators.required]],
        });

        this.search?.valueChanges.subscribe(() => {
            this.filterSongs();
        });

        this.toastVisible = false;

        this.toastType = ToastTypes.Info;
        this.toastMessage = "Loading songs...";
        this.toastDuration = -1;

        setTimeout(() => {
            this.toastVisible = true;
        }, 10);

        this.songService.list().subscribe({
            next: (response) => {
                this.songListResponse = response.body!;

                this.songsSortedByArtist = this.songListResponse.payload.songs.sort((a: any, b: any) => {
                    let artistComparison = a.artist.localeCompare(b.artist);
                    if (artistComparison !== 0) {
                        return artistComparison;
                    }

                    let albumComparison = a.album.localeCompare(b.album);
                    if (albumComparison !== 0) {
                        return albumComparison;
                    }

                    return a.track_number - b.track_number;
                });

                this.songs = this.songsSortedByArtist;

                this.toastVisible = false;
                this.songsLoaded = true;
            },
            error: (error) => {
                this.toastVisible = false;

                this.toastType = ToastTypes.Danger;
                this.toastMessage = "Unable to retrieve songs";
                this.toastDuration = 5000;

                setTimeout(() => {
                    this.toastVisible = true;
                }, 10);

                this.songsLoaded = false;
            },
            complete: () => {},
        });
    }

    get search() {
        return this.searchForm.get("search");
    }

    filterSongs() {
        let searchValue = this.search?.value.toLowerCase().trim();

        if (!searchValue) {
            this.songs = this.songsSortedByArtist;
        } else {
            this.songs = this.songsSortedByArtist.filter((song: any) => {
                return (
                    song.artist.toLowerCase().includes(searchValue) ||
                    song.title.toLowerCase().includes(searchValue) ||
                    song.album.toLowerCase().includes(searchValue)
                );
            });
        }
    }

    onSongClick(songId: number) {
        // TODO: add logic to handle song click
    }

    onToastClosed() {
        this.toastVisible = false;
    }
}
