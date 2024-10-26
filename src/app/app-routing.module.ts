import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './students/components/add-student/add-student.component';

const routes: Routes = [
  {
    path: 'student',
    component: AddStudentComponent,
    loadChildren: () =>
      import('./students/students.module').then(
        (m) => m.StudentsModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
