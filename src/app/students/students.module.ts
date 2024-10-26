import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { AddSubjectComponent } from './components/add-subject/add-subject.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations' 
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from './services/students.service';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ListSubjectsComponent } from './components/list-subjects/list-subjects.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AddStudentComponent,
    AddSubjectComponent,
    ListSubjectsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    TableModule
  ],
  providers:[StudentsService],
  exports:[AddStudentComponent,AddSubjectComponent]
})
export class StudentsModule { }
