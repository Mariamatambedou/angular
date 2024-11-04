import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit{
  public students : any;
  public dataSource : any;
  public displayedColumns = ['id','firstName','lastName','code','programId','photo'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  constructor(private http: HttpClient){}

  ngOnInit() {
    this.http.get('http://localhost:8021/students')
    .subscribe({
      next : data => {
         this.students = data;
         this.dataSource = new MatTableDataSource(this.students);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    })
      
  }

}
