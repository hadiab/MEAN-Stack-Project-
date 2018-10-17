import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { PersonService } from '../../person.service';
import { Person } from '../../person';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  person: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      email: '',
      gender: '',
      phone: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.personService.getPersonById(this.id).subscribe(res => {
        this.person = res;
        this.updateForm.get('name').setValue(this.person.name);
        this.updateForm.get('email').setValue(this.person.email);
        this.updateForm.get('gender').setValue(this.person.gender);
        this.updateForm.get('phone').setValue(this.person.phone);
      });
    });
  }

  updatePerson(name, email, gender, phone) {
    console.log(gender)
    this.personService.updatePerson(this.id, name, email, gender, phone).subscribe(() => {
      this.snackBar.open('Person updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
