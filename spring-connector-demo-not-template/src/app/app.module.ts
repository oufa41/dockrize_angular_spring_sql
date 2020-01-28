import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ListOperationsComponent } from './list-operations/list-operations.component';
import { GetComponent } from './get/get.component';
import { PostComponent } from './post/post.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { EmployeeErrorHandlerModule, EmployeeErrorHandler } from './modules/employee-error-handler/employee-error-handler.module';
import { AlertModule } from 'ngx-bootstrap/alert';
import { EmployeeService } from './services/employee.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListOperationsComponent,
    GetComponent,
    PostComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'operations', component: ListOperationsComponent,
      children: [
        { path: 'get', component: GetComponent },
        { path: 'post', component: PostComponent },
        { path: 'put', component: UpdateComponent },
        { path: 'delete', component: DeleteComponent }
      ] },
      { path: 'operations/updateEmployee/:id', component: UpdateComponent },
      //{ path: 'operations/get', component: GetComponent }
    ]),
    AlertModule.forRoot()
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
