export class AddStudentWithSubjectDTO{
    studentRequestDTO:StudentRequestDTO = new StudentRequestDTO();
    subjectRequestsDTO:SubjectRequestDTO[] = [];
}
export class StudentRequestDTO{
    name:string = ''
    gradeId:number = 0
    address:string = ''
    school:string = ''
}
export class SubjectRequestDTO
{
    name:string = ''
    teacherId:number = 0
}