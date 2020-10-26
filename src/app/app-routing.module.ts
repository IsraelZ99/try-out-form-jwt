import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from "./auth/auth.module";
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: "auth", pathMatch: 'full' },
  { path: 'auth', loadChildren: "./auth/auth.module#AuthModule" },
  { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
