/// <reference path="../_references.d.ts" />

import { Component } from "@angular/core";

@Component({
    selector: "my-app",
    template: "<h1>{{title}}</h1>"
})
export class AppComponent {
    title = "Minimal NgModule";
}