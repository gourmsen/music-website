// basic
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

// services
import { SongService } from "../services/http/song.service";

// interfaces
import { SongDetailResponse } from "../interfaces/song";

@Component({
    selector: "app-song",
    imports: [],
    templateUrl: "./song.component.html",
    styleUrl: "./song.component.css",
})
export class SongComponent {
    songLoaded = false;

    songDetailResponse: SongDetailResponse;

    constructor(private songService: SongService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        let songId = parseInt(this.activatedRoute.snapshot.paramMap.get("id") as string);

        this.songService.view(songId).subscribe({
            next: (response) => {
                this.songDetailResponse = response.body!;

                this.songLoaded = true;
            },
        });
    }
}
