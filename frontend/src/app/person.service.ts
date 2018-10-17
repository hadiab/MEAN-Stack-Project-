import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getPersons() {
    return this.http.get(`${this.uri}/persons`);
  }

  getPersonById(id) {
    return this.http.get(`${this.uri}/persons/${id}`);
  }

  addPerson(name, email, gender, phone) {
    const person = {
      name: name,
      email: email,
      gender: gender,
      phone: phone
    };
    return this.http.post(`${this.uri}/persons/add`, person);
  }

  updatePerson(id, name, email, gender, phone) {
    const person = {
      name: name,
      email: email,
      gender: gender,
      phone: phone
    };
    return this.http.post(`${this.uri}/persons/update/${id}`, person);
  }

  deletePerson(id) {
    return this.http.get(`${this.uri}/persons/delete/${id}`);
  }
}
