// https://raw.githubusercontent.com/angular/angular.io/master/public/docs/_examples/ngmodule/ts/app/app.module.1.ts
/// <reference path="../_references.d.ts" />
import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }