import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // define list of items
  items= [{name: 'sai', status: 'todo'},
  {name: 'preethi', status: 'todo'}];
  newToDoTask = "";

  // Write code to push new item
  submitNewItem() {
    var task = {
      status: "todo",
      name: this.newToDoTask
   };
    this.items.push(task);
    this.newToDoTask = "";
  }

  // Write code to complete item
  completeItem(pos) {
    this.items[pos].status = "done";
  }

  // Write code to delete item
  deleteItem(pos) {
    this.items.splice(pos, 1);
  }

}
