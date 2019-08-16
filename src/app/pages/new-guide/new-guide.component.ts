import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Guide } from 'src/app/classes/guide';
import { GuideService } from 'src/app/services/guide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-guide',
  templateUrl: './new-guide.component.html',
  styleUrls: ['./new-guide.component.scss']
})
export class NewGuideComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private guide: Guide;
  private instructions: FormArray;
  private materials: FormArray;
  public guideForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guideService: GuideService,
    private location: Location,
    private fb: FormBuilder
  ) { }


  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        const guideId = params.get('id');
        this.guide = this.guideService.getGuideById(parseInt(guideId));
        this.createForm();
      })
    );
  }


  private createForm(): void {
    this.guideForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      team: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      instructions: this.fb.array([]),
      materials: this.fb.array([])
    });

    this.instructions = this.guideForm.get('instructions') as FormArray;
    this.materials = this.guideForm.get('materials') as FormArray;

    this.addInstruction();
    this.addMaterial();
    
  }


  private createInstruction(step: string): FormGroup {
    return this.fb.group({
      step: [step, [Validators.required]]
    });
  }

  private createMaterial(amount: string, name: string): FormGroup {
    return this.fb.group({
      amount: [amount, [Validators.required]],
      name: [name, [Validators.required]]
    });
  }


  addInstruction(): void {
    this.instructions.push(this.createInstruction(''));
  }

  deleteInstruction(index: number): void {
    const arrayControl = this.guideForm.controls['instructions'] as FormArray;
    arrayControl.removeAt(index);
  }

  addMaterial(): void {
    this.materials.push(this.createMaterial('', ''));
  }

  deleteMaterial(index: number): void {
    const arrayControl = this.guideForm.controls['materials'] as FormArray;
    arrayControl.removeAt(index);
  }


  submitForm(): void {
    if(this.guideForm.valid){
      const {title, description, team, imageUrl, materials, instructions} = this.guideForm.value;
      const filteredInstructions = instructions.map(item => item.step);
      this.guideService.createGuide(
          title,
          description,
          team,
          imageUrl,
          materials,
          filteredInstructions
      );
      this.router.navigate(['']);
    } else {
      // else show an alert
      console.log("Form Error");
    }
  }

  back() {
    this.location.back();
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
