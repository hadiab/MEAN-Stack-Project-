import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Person } from '../../person';
import { PersonService } from '../../person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  persons: Person[];
  displayedColumns = ['name', 'email', 'gender', 'phone', 'actions'];

  constructor(private personService: PersonService, private router: Router) { }

  ngOnInit() {
    this.fetchPersons();
  }

  fetchPersons() {
    this.personService
    .getPersons()
    .subscribe((data: Person[]) => {
      this.persons = data;
      console.log('Data requested ...');
      console.log(this.persons);
    });
  }

  editPerson(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deletePerson(id) {
    this.personService.deletePerson(id).subscribe(() => {
      this.fetchPersons();
    });
  }

}
