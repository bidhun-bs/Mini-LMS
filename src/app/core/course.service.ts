import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  description?: string;
  instructor?: string;
}


@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly base = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
 getCourses() {
  return this.http.get<any>(`${this.base}/course/`).pipe(
    map((res: any) => {
      const courses = res?.data?.results || [];
      return courses.map((c: any) => ({
        id: c.uid, 
        title: c.course_name,
        description: c.course_description,
        instructor: c.course_author
      })) as Course[];
    })
  );
}
}


// The api call from the backend was not mapping correctly,i have now mapped the backend fields (course_name, course_description, course_author) to the course interface (title, description, instructor).  
// With this change, the table now correctly displays all courses.  
// additionally some styling issues after displaying the courses, which have also been resolved.











