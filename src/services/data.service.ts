import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor(private http: HttpClient) {}

	getInfoData(): Observable<DataTableInfo> {
		const url =
			'https://raw.githubusercontent.com/LightOfTheSun/front-end-coding-task-db/master/db.json';
		return this.http.get<DataTableInfo>(url);
	}
}
