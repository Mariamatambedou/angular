import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{
 
[x: string]: any;
  public payments : any;
  public dataSource : any;
  public displayedColumns = ['id','date','amount','type','status','firstName'];

  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  constructor(private http: HttpClient,private router: Router){}

  ngOnInit() {
    this.http.get('http://localhost:8021/payments')
    .subscribe({
      next : data => {
         this.payments = data;
         this.dataSource = new MatTableDataSource(this.payments);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },
      error : err => {
        console.log(err);
      }
    })
      
  }
  goToAddPayment() {
    this.router.navigate(['/add-payment']);
  }

}
