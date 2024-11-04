import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent {
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      date: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      student: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.paymentForm.patchValue({
        file: event.target.files[0]
      });
    }
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const formData = new FormData();
      formData.append('file', this.paymentForm.get('file')?.value);
      formData.append('date', this.paymentForm.get('date')?.value);
      formData.append('amount', this.paymentForm.get('amount')?.value);
      formData.append('type', this.paymentForm.get('type')?.value);
      formData.append('studentCode', this.paymentForm.get('student')?.value);

      this.paymentService.addPayment(formData).subscribe(response => {
        console.log('Payment added successfully');
        this.router.navigate(['/payments']);
      }, error => {
        console.error('Error adding payment', error);
      });
    }
  }
}
