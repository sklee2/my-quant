import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { AEditorComponent } from './a-editor/a-editor.component';
import { TradedataSearchComponent } from './tradedata-search/tradedata-search.component';
import { AuthGuard } from './login/auth.guard';


const routes: Routes = [    
  { path: '',canActivate: [AuthGuard], component: DashboardComponent }, //로그인해야만 이동할 수 있도록 canActivate 설정함

  { path: '',  canActivate: [AuthGuard],component: DashboardComponent },
  { path: 'dashboard',  canActivate: [AuthGuard],component: DashboardComponent },
  { path: 'trade-data-search', canActivate: [AuthGuard], component: TradedataSearchComponent },
  
  // { path: 'a-editor', component: AEditorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
