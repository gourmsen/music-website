// basic
import { APP_INITIALIZER, ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

// services
import { ThemeService } from "./services/app/theme.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        ThemeService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeTheme,
            deps: [ThemeService],
            multi: true,
        },
    ],
};

export function initializeTheme(themeService: ThemeService) {
    return (): void => {
        themeService.initTheme();
    };
}
