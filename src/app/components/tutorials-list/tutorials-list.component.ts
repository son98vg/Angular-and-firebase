import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any;
  currentTutorial = null;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit() {
    this.retrieveTutorials();
  }

  refreshList(){
    this.currentTutorial = null;
    this.currentIndex = -1;
    this.retrieveTutorials();
  }

  retrieveTutorials(){
    this.tutorialService.getAll().snapshotChanges().pipe(map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id,
             ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tutorials = data;
      console.log(data);
    });
  }

  setActiveTutorial(tutorial, index) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }
}
