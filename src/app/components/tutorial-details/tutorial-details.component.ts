import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import Tutorial from 'src/app/models/tutorial';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit, OnChanges {

  @Input() tutorial: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = null;
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
    this.message = '';
  }

  ngOnChanges() {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status){

    this.tutorialService.update(this.currentTutorial.id, { published: status })
      .then(() => {
        this.currentTutorial.published = status;
        this.message = 'The status was updated successfully!';
      })
      .catch(err => console.log(err));
  }

  updateTutorial() {
    const data = {
      title:  this.currentTutorial.title,
      description:  this.currentTutorial.description
    };

    this.tutorialService.update(this.currentTutorial.id, data).then(() => this.message = 'Updated successfully!')
      .catch(err => console.log(err));
  }

  deleteTutorial() {
    console.log(this.currentTutorial.id);
    this.tutorialService.delete(this.currentTutorial.id).then(() => {

        this.refreshList.emit();

        this.message = 'Updated successfully!';
      })
      .catch(err => console.log(err));
  }

}
