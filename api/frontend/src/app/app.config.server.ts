import { ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    ...(appConfig.providers ?? []),
  ],
};

// 👇 agrega esta línea para satisfacer el import de main.server.ts
export const config = serverConfig;
