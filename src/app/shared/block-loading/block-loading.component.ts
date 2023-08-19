import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [DialogModule, ProgressSpinnerModule, CommonModule],
  selector: 'app-block-loading',
  templateUrl: './block-loading.component.html',
  styleUrls: ['./block-loading.component.scss']
})
export class BlockLoadingComponent {

  dialogVisible = true;
  isLoading$: Observable<boolean> | undefined;

  constructor(
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoadingShow;
  }

}
