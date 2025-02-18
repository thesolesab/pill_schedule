import { Component, OnInit } from '@angular/core';
import { Pill } from '../../data/interfaces/pill.interface';
import { IndexedDbService } from '../../data/services/indexed-db.service';
import { PillComponent } from '../../common-ui/pill/pill.component';
import { AddDataDialogComponent } from '../../common-ui/add-data-dialog/add-data-dialog.component';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from "../../common-ui/user-profile/user-profile.component";
import { User } from '../../data/interfaces/user.interface';

@Component({
  selector: 'app-main-page',
  imports: [PillComponent, AddDataDialogComponent, CommonModule, UserProfileComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit {
  pills: Pill[] = [];
  isDialogOpen = false;
  user: any = {};

  constructor(private indexedDbService: IndexedDbService) { }

  ngOnInit() {
    this.loadAll(); // Загружаем таблетки при старте
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.loadAll(); // После закрытия диалога загружаем список заново
  }

  async loadAll() {
    this.pills = await this.indexedDbService.getAllData('pills-store');
    this.user = (await this.indexedDbService.getAllData('user-store')).at(0);
  }

  onPillDeleted() {
    this.loadAll()
  }
}
