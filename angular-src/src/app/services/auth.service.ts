import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
	authToken: any;
	user: any;
	readonly tokenName = 'id_token';

	constructor(private http: Http) { }

	registerUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/users/register', user, { headers: headers }).map(res => res.json());
	}

	authenticateUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/users/authenticate', user, { headers: headers }).map(res => res.json());
	}

	getProfile() {
		let headers = new Headers();
		this.loadToken();
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', this.authToken);
		return this.http.get('http://localhost:3000/users/profile', { headers: headers }).map(res => res.json());
	}

	loadToken() {
		const token = localStorage.getItem(this.tokenName);
		this.authToken = token;
	}

	storeUserData(token, user) {
		localStorage.setItem(this.tokenName, token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	loggedIn() {
		return tokenNotExpired(this.tokenName);
	}

	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}
}
