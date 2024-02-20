import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnChanges,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TasksMetadata} from "../../../models/board/board-content/tasks-metadata.model";
import {MatButtonModule} from "@angular/material/button";
import {HeaderComponent} from "../header/header.component";


@Component({
  selector: 'app-board-edit',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    MatButtonModule,
    HeaderComponent
  ],
  templateUrl: './board-edit.component.html',
  styleUrl: './board-edit.component.css'
})
export class BoardEditComponent implements AfterViewChecked{
  refList: CdkDropList<TasksMetadata[]>[] = []

  tasks: TasksMetadata[] = [
    {title: "Todo", list: ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']},
    {title: "Done", list: ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']},
    {title: "Test", list: ["Test1", "Test2"]},
  ]
  @ViewChildren('dropListRef') dropListRefs!: QueryList<CdkDropList<TasksMetadata[]>>;

  ngAfterViewChecked(){
    this.refList = this.dropListRefs.toArray();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  protected readonly CdkDropList = CdkDropList;
  protected readonly TasksMetadata = TasksMetadata;
}
