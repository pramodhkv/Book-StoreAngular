import { Component, OnInit } from '@angular/core';
import { BookService } from '../shared/book.service';
import { Books } from '../shared/book.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BooksView } from '../shared/book-view.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  myBooks: Books[];

  bookView: BooksView;

  subscription: Subscription;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute,
      private modalService: NgbModal) { }

  ngOnInit() {
    console.log("inside book list component ng on init");
    this.bookService.getAllBooks().subscribe(
      (response: any) => {
        console.log(response);
        this.myBooks = response.json();
      }
    );
  }

  onShowDetails(index: number, detailsContent: any) {
    /* console.log(this.myBooks);
    console.log(this.myBooks[index].details);
    return this.myBooks[index].details; */

    /* this.router.navigate(['/details'], {relativeTo: this.route}); */

    if (index == 0) {
      this.bookView = new BooksView(this.myBooks[index].name, 'test1@check24.de');
    } else if (index == 1) {
      this.bookView = new BooksView(this.myBooks[index].name, 'test2@check24.de');
    } else if (index == 2) {
      this.bookView = new BooksView(this.myBooks[index].name, 'test3@check24.de');
    }
    console.log(index);
    console.log(this.bookView);
    this.bookService.saveBookViews(this.bookView)
    .subscribe(
      (response) => {
        console.log(response);
        let data = response.json();
        this.bookView = new BooksView(data.bookName, data.username);
        this.modalService.open(detailsContent);
      }
    );
  }

}
