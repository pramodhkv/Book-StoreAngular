import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Books } from "./book.model";
import {map} from 'rxjs/operators';
import { Subject, Observable } from "rxjs";
import { BooksView } from "./book-view.model";

const httpOptions = {
    headers: new Headers({ 'Content-Type': 'application/json' })
  };

@Injectable()
export class BookService {

    books: Books[];

    booksChanged = new Subject<Books[]>();

    private booksURL: string = "http://localhost:8080/task/books/";

    private saveURL: string = "http://localhost:8080/task/details/";

    constructor(private http: Http) {}

    getAllBooks() {
        return this.http.get(this.booksURL);
    }

    setRecipes(books: Books[]) {
        this.books = books;
        this.booksChanged.next(this.books); 
    }

    saveBookViews(bookview: BooksView): Observable<any> {
        let result: Observable<Object>;
        console.log(this.saveURL);
        console.log(bookview)
        result = this.http.post(this.saveURL, bookview);

        return result;
    }

}