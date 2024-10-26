import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { responseVm } from '../models/ResponseVM';
import { Teacher } from '../models/teacher';
import { AddStudentWithSubjectDTO } from '../models/AddStudentWithSubjectRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  gradeId:number;
  Domain:string;
  student:any;
  mySubject: BehaviorSubject<any> = new BehaviorSubject(null);
  diableSubjectForm:BehaviorSubject<any> = new BehaviorSubject(null);
  freeTeacher:BehaviorSubject<any> = new BehaviorSubject(null);
  AddSubjectToList = new Subject<any>();
  disableTeacherFromList:BehaviorSubject<any> = new BehaviorSubject(null);
  deleteTeacher = new Subject<any>();
  updateSubject = new Subject<any>();
  selectedTeacher:Teacher[]=[];
  teacherIdtoBeActive:any = null;
  constructor(private http:HttpClient) 
  {
      this.gradeId = 0;
      this.Domain = "https://localhost:7165/api" 
  }

  setGradeId(num:number){
    this.gradeId = num;
  }

  getGrades():Observable<responseVm<any>>{
    return this.http.get<responseVm<any>>(`${this.Domain}/Grade/GetAllGrades`);
    
  }
  getTeachers(id:number):Observable<responseVm<any>>{
    return this.http.get<responseVm<any>>(`${this.Domain}/Teacher/GetAllTeacherByGradeId/${id}`)
  }
  Submit(addStudentandSubject:AddStudentWithSubjectDTO)
  {
    return this.http.post<responseVm<any>>(`${this.Domain}/StudentandSubject/AddStudnetAndSubject`,addStudentandSubject);
  }
 
}
