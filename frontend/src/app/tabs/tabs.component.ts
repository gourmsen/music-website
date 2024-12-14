// basic
import { Component } from "@angular/core";

// services
import { SongService } from "../services/http/song.service";

// interfaces
import { SongListResponse } from "../interfaces/song";

@Component({
    selector: "app-tabs",
    standalone: true,
    imports: [],
    templateUrl: "./tabs.component.html",
    styleUrl: "./tabs.component.css",
})
export class TabsComponent {
    songsSortedByArtist: any;

    songListResponse: SongListResponse;

    constructor(private songService: SongService) {}

    ngOnInit() {
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
            },
            error: (error) => {},
            complete: () => {},
        });
    }
}
