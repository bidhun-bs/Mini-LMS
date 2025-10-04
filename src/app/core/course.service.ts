import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get<Course[]>(`${this.base}/course/`);
  }
}