import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Grade } from '../../models/Grade';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit{
  backEnable:boolean = true;
  grades:Grade[]=[];
  selectedGrade:any;
  change:boolean = false;
  diableButton:boolean = false;
  @Output() AddSubject:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private fb:FormBuilder,private studentService:StudentsService){}
  ngOnInit()
  {
    console.log("11")
    this.studentService.getGrades().subscribe(grades=>{
      this.grades = grades.data;
    },error=>{
      console.log(error)
    });
  }
  formStud = this.fb.group({
    name:['', Validators.required],
    address:['',Validators.required],
    school:['',Validators.required],
    gradeId:['',Validators.required],
  })
  changeGrade(event:any)
  {
    console.log(event.value);
    this.selectedGrade = event.value;
    this.change = true;
  }
  Complete(){
    if (!this.formStud.valid) {
      return; 
  }
    console.log('Student Added')
    this.formStud.disable();
    this.studentService.student = this.formStud.value;
    this.backEnable = false;
    this.studentService.setGradeId(this.selectedGrade);
    console.log(this.change)
    if(this.change)
    {
      console.log("this.selectedGrade",this.selectedGrade);
      this.studentService.mySubject.next(this.selectedGrade);
    }
    this.studentService.diableSubjectForm.next(false);

    this.AddSubject.emit(true);
    this.change = false;
  }
  Back(){
    this.backEnable = true;

    this.formStud.enable();
    this.studentService.diableSubjectForm.next(true);
  }


}
