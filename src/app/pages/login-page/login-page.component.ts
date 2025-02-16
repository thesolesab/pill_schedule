import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms'
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.indexedDbService.getAllData('user-store').then(el => {
      if (el.length > 0) {
        this.router.navigate(['/home'])
      }
    })
  }

  form = new FormGroup({
    username: new FormControl(null, Validators.required),
    userHeight: new FormControl(null, Validators.required),
    userWeight: new FormControl(null, Validators.required),
  })

  async onSubmit() {
    if (this.form.valid) {
      const { userHeight, userWeight, username } = this.form.value

      const date = new Date();
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });

      const imt = Math.round(userWeight! / ((userHeight! / 100) ** 2));

      const weightHistory = [{ weight: userWeight, date: formattedDate }]
      const IMTHistory = [{ imt, date: formattedDate }]

      const data = {
        username,
        userHeight,
        weightHistory,
        IMTHistory
      };
      await this.indexedDbService.addData('user-store', data);
      this.router.navigate(['/home'])
    }
  }
}
