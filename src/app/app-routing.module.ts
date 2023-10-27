import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralInfoComponent } from './general-info/general-info.component';
import { ShortInfoComponent } from './short-info/short-info.component';

const routes: Routes = [
	{ path: 'general-info', component: GeneralInfoComponent },
	{ path: 'short-info', component: ShortInfoComponent },
	{ path: '', redirectTo: '/general-info', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
