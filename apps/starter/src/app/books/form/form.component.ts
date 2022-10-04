import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ofType } from '@ngrx/effects';
import { Store, ActionsSubject } from '@ngrx/store';

import { addBook } from '../state/actions/books/books.actions';
import { BooksActionsGroup } from '../state/actions/books/books.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  public booksForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private actionsSubject: ActionsSubject
  ) { }

  ngOnInit(): void {
    this.booksForm = this.fb.group({
      id: [''],
      name: [''],
      publisher: [''],
      author: ['']
    });

    this.actionsSubject
      .pipe(
        ofType(BooksActionsGroup.updateBookSuccess)
      )
      .subscribe(() => this.booksForm.reset());
  }

  public onSubmit(): void {
    console.log('form: ', this.booksForm.value);
    if (this.booksForm.value.id !== '') {
      this.store.dispatch(BooksActionsGroup.updateBook({
        book: this.booksForm.value
      }))
    } else {
      this.store.dispatch(addBook({ book: this.booksForm.value }))
    }
  }

}
