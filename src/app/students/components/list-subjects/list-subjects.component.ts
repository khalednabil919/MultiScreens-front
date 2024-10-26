import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Subject } from '../../models/teacher';
import { AddStudentWithSubjectDTO } from '../../models/AddStudentWithSubjectRequestDTO';

@Component({
  selector: 'app-list-subjects',
  templateUrl: './list-subjects.component.html',
  styleUrls: ['./list-subjects.component.css']
})
export class ListSubjectsComponent implements OnInit{
  subjects:Subject[]=[];
  subjectRequestDTO:any[]=[];
  cols:string[]=["subject","teacher"]
  addStudentandSubject:AddStudentWithSubjectDTO;
  constructor(private studentService:StudentsService) 
  {
    this.addStudentandSubject = new AddStudentWithSubjectDTO();
  }

  ngOnInit() 
  {

    this.studentService.AddSubjectToList.subscribe(x=>{
      console.log("x",x)
      console.log(this.subjects)
      
      let index = this.subjects.findIndex(s=>s.id ===x.id );
      console.log(index)
      if(index !== -1)
        this.subjects[index]= x;  

      else
        this.subjects.push(x) 
      
      this.studentService.selectedTeacher.push(x.teacher);
    })

  }
  deleteSubject(subject:Subject,index:number)
  {
    this.subjects.splice(index, 1);
    const teacherIndex = this.studentService.selectedTeacher.findIndex(x=>x.id===subject.teacher.id);
    this.studentService.selectedTeacher.splice(teacherIndex, 1);

    this.studentService.deleteTeacher.next(subject.teacher.id);
  }
  updateSubject(subject:Subject,index:number){
    // this.studentService.deleteTeacher.next(subject.teacher.id);
    this.studentService.teacherIdtoBeActive = subject.teacher.id
    console.log('updatedSubject',subject)
    this.studentService.updateSubject.next(subject);
  }
  Submit()
  {
    this.subjectRequestDTO = [];
    console.log(this.subjects);
    console.log(this.studentService.student);
    this.subjects.forEach(x=>{
      this.subjectRequestDTO.push({name:x.name,teacherId:x.teacher.id});
    })

    this.addStudentandSubject={studentRequestDTO:this.studentService.student,subjectRequestsDTO:this.subjectRequestDTO}
    console.log(this.addStudentandSubject)
    this.studentService.Submit(this.addStudentandSubject).subscribe(response=>{
      console.log(response);
    });

  }
}
