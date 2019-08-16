import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Guide } from 'src/app/classes/guide';
import { GuideService } from 'src/app/services/guide.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-guide',
  templateUrl: './edit-guide.component.html',
  styleUrls: ['./edit-guide.component.scss']
})
export class EditGuideComponent implements OnInit, OnDestroy {

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
      title: [this.guide.title, [Validators.required]],
      description: [this.guide.description, [Validators.required]],
      team: [this.guide.team, [Validators.required]],
      imageUrl: [this.guide.imageUrl, [Validators.required]],
      instructions: this.fb.array([]),
      materials: this.fb.array([])
    });

    this.instructions = this.guideForm.get('instructions') as FormArray;
    this.materials = this.guideForm.get('materials') as FormArray;

    this.guide.instructions.forEach(i => {
      this.instructions.push(this.createInstruction(i));
    });
    
    this.guide.materials.forEach(m => {
      this.materials.push(this.createMaterial(m.amount, m.name));
    });
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
      this.guideService.updateGuide(
        new Guide(
          {
            id: this.guide.id,
            title,
            description,
            team,
            imageUrl,
            materials,
            instructions: filteredInstructions
          }
        )
      );
      console.log("Form saved");
      this.router.navigate([`/guide/${this.guide.id}`]);
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
