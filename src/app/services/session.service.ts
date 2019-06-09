import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable()
export class SessionService {

	constructor(private http: HttpService, private router: Router) { }

	async validateLogin(user, pwd) {
		let result = false;
		await this.http.validateUser()
			.then((data) => {
				let dataJson = data.json();
				let login = dataJson.find((userData) => {

					if (userData.user == user && userData.pwd == pwd) {

						//Create Session
						sessionStorage.setItem("Session", JSON.stringify({
							name: dataJson.name,
							date: new Date(),
							user: dataJson.user
						}));

						result = true;
					}
				})
			});

		return result;
	}

	validateSession() {
		if (sessionStorage.getItem("Session") == null){
			this.router.navigate([''])
			return false;
		}

		return true;
	}

	logOut(){
		sessionStorage.removeItem("Session");
		this.router.navigate([''])
	}
}
