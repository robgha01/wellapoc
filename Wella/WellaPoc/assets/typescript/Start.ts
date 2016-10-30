require("../stylesheets/wella.css");

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";
import { AppModule } from "./app/app.module";
platformBrowserDynamic().bootstrapModule(AppModule);