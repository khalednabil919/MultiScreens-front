import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { Teacher } from '../../models/teacher';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit{
  formSub:any;
  selectedTeacher:any;
  gradeId:any
  teachers:Teacher[]=[];
  id:number=0;
  add=true;
  constructor(private fb:FormBuilder, private studentService:StudentsService){}
  ngOnInit()
  {
    this.initiateForm();
    this.studentService.diableSubjectForm.subscribe(x=>{
      if(x)
        this.formSub.disable();
      else
        this.formSub.enable();
    })
    this.studentService.mySubject.subscribe(x=>{

      console.log(this.formSub.get('teacher').value,x)
        if( !this.formSub.get('teacher').value || x !== this.formSub.get('teacher').value.gradeId)
        {
          this.formSub.get('teacher').setValue('');
          this.formSub.markAsPristine()
          this.getTeachers(x);
        }
    })
   
   this.deleteTeacherAfterDeleteSubject();
   this.updateSubject();
  }
  initiateForm()
  {
    this.formSub= this.fb.group({
      id:[''],
      name:['', Validators.required],
      teacher:['',Validators.required],
    })
  
  }

  getTeachers(gradeId:number)
  {
    this.studentService.getTeachers(gradeId).subscribe(response=>{
      this.teachers=[];
      console.log("this.teachers",this.teachers);

      // this.teachers = response.data.map((teacher:any) => ({
      //   ...teacher,
      //   isActive: false
      // }));

      this.teachers = response.data;
      this.teachers.forEach(x=>x.isActive = false);
      this.teachers.forEach(tea=>{
        
        let selectedTeachers = this.studentService.selectedTeacher;
        console.log("selectedTeachers",selectedTeachers)
        var response = selectedTeachers.find(x=>x.id === tea.id);
        console.log("response",response)
        if(response !== undefined)
          tea.isActive = true;
      })

      console.log("this.teachers",this.teachers);
          },error=>{
      console.log(error);
    })
  }
  addSubject(){
    if (!this.formSub.valid) 
      return; 
    
    this.id +=1;
    let formValue = this.formSub.value;
    console.log('formValue',formValue)
    console.log(formValue);
    if(formValue.id === '' || formValue.id === null)
      formValue.id = this.id;
    
    this.studentService.AddSubjectToList.next(this.formSub.value);

    this.teachers = this.teachers.map(teacher =>
      teacher.id === formValue.teacher.id ? { ...teacher, isActive: true } : teacher
    );
    this.formSub.reset('')
    this.formSub.get('teacher').markAsPristine();
    console.log(formValue);
    console.log(this.teachers)
    this.add=true;

    if(this.studentService.teacherIdtoBeActive !== null)
    {
      let teacherId = this.studentService.teacherIdtoBeActive;
      console.log(teacherId);
      this.teachers.forEach(y=>{
        if(y.id===teacherId && teacherId !== formValue.teacher.id)
        {
          console.log('here')
          y.isActive = false;
        }
          

      })
  
    }  


  }

  deleteTeacherAfterDeleteSubject()
  {
    this.studentService.deleteTeacher.subscribe(x=>{

      this.teachers.forEach(y=>{
        if(y.id === x)
          y.isActive = false;
      })
    })

  }

  updateSubject()
  {
    this.studentService.updateSubject.subscribe(x=>{
      this.add = false;
      let vari = x;
      vari.teacher.isActive=true;
      this.formSub.patchValue(vari);
      // this.formSub.get('name').setValue(x.name);
      // console.log(x)
      // console.log(x.teacher);
     

      // // debugger;
      // let variable = x.teacher;
      // variable.isActive = true;
      // // this.formSub.get('teacher').setValue({name:variable.name, value:variable.id});
      // this.formSub.get('teacher').setValue(variable);
      // // this.selectedTeacher = x.teacher;
      // console.log(this.selectedTeacher,"ss");
      // this.formSub.get('id').setValue(x.id);
    
    })
  }
  

}


