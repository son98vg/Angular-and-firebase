# FireBase in Angular🗒️

-   Install 
 ```npm install --save firebase @angular/fire```
 - add config in enviroment
 ```
 export const environment = {
  production: false,
  firebaseConfig : {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID"
  }
};
 ```
 - import app.module.ts
 ```
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
        // [...]
    imports: [
        // [...]
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule
    ],	
```
- create id: `this.fireStore.createId()`
- Insert: `this.fireStore.collection('name_collection').add(data)`
- Get data in material table
 ```
 getInfoFirebase() {
    this.fireStore.collection('DockerManager').snapshotChanges().subscribe(data =>{      
      data.forEach(a => {
       const data = a.payload.doc.data();
       this.data1.push(data)
        this.info = this.data1;
        this.dataSource = new MatTableDataSource<PCDockerInfo>(this.info);
      this.ngAfterViewInit();
      })
    })
  } 
 ```
- Create data
 ```
 create(tutorial: Tutorial): any {
    return this.tutorialsRef.add({ ...tutorial });
  }
 ```
 - update data
 ```
 update(id: string, data: any): Promise<void> {
    return this.tutorialsRef.doc(id).update(data);
  }
 ```

 - delete
 ```
 delete(id: string): Promise<void> {
    return this.tutorialsRef.doc(id).delete();
  }
