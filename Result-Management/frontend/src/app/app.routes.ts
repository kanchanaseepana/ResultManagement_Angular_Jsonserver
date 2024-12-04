import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { ResultComponent } from './components/result/result.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { TeacherLoginComponent } from './components/teacher-login/teacher-login.component';
import { authGuard } from './guards/auth.guard';
import { AddStudentComponent } from './components/add-student/add-student.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'student', component: StudentComponent },
    { path: 'result', component: ResultComponent,canActivate: [authGuard]  },
    { path: 'teacher-dashboard', component: TeacherComponent,canActivate: [authGuard] },
    { path: 'add-student', component: AddStudentComponent },
    { path: 'teacher-login', component:TeacherLoginComponent}
];
