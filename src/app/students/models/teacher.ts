export interface Teacher{
    id:number;
    name:string;
    gradeId:number;
    isActive:boolean;
}
export interface Subject{
    id?:number;
    name:string;
    teacher:Teacher;
}