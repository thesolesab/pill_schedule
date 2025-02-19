import { Component } from '@angular/core';
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { UserProfileComponent } from "../../common-ui/user-profile/user-profile.component";
import { User, WeightEntry } from '../../data/interfaces/user.interface';
import { Router } from '@angular/router';
import { UserChartComponent } from "../../common-ui/user-chart/user-chart.component";

@Component({
  selector: 'app-user-page',
  imports: [UserProfileComponent, UserChartComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent {
  user: User = {
    username: '',
    userHeight: 0,
    weightHistory: []
  };
  weightHistory: WeightEntry[] | null = null

  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadUser()
  }

  async loadUser() {
    this.user = (await this.indexedDbService.getAllData('user-store')).at(0);
    this.weightHistory = this.user.weightHistory
  }

  async deleteAll() {
    await this.indexedDbService.clearAllData()
    this.router.navigate(['/login'])
  }
}
