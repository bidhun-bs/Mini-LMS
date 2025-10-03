import { Component, OnInit } from '@angular/core';
import { Course, CourseService } from '../../core/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})


export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  loading = true;
  errorMsg = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (data: any) => {
        this.courses = Array.isArray(data) ? data : (data?.results ?? []);
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Failed to load courses';
        this.loading = false;
      }
    });
  }
}