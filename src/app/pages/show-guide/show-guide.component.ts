import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Guide } from 'src/app/classes/guide';
import { ActivatedRoute, Router } from '@angular/router';
import { GuideService } from 'src/app/services/guide.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-guide',
  templateUrl: './show-guide.component.html',
  styleUrls: ['./show-guide.component.scss']
})
export class ShowGuideComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public guide: Guide;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guideService: GuideService,
    private location: Location
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const guideId = params.get('id');
        this.guide = this.guideService.getGuideById(parseInt(guideId));
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  back() {
    this.location.back();
  }

  deleteGuide(): void {
    this.guideService.deleteGuide(this.guide.id);
    this.router.navigate(['']); // Go to Home page
  }
}
