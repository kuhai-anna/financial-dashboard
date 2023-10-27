import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ShortInfoComponent } from './short-info/short-info.component';

@NgModule({
	declarations: [AppComponent, GeneralInfoComponent, ShortInfoComponent, NavigationComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
