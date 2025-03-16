// basic
import { ApplicationConfig, provideZoneChangeDetection, inject, provideAppInitializer } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

// services
import { ThemeService } from "./services/app/theme.service";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideHttpClient(withInterceptorsFromDi()),
        provideAppInitializer(() => {
            const initializerFn = initializeTheme(inject(ThemeService));
            return initializerFn();
        }),
    ],
};

export function initializeTheme(themeService: ThemeService) {
    return (): void => {
        themeService.initTheme();
    };
}
