import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-short-info',
	templateUrl: './short-info.component.html',
	styleUrls: ['./short-info.component.scss'],
})
export class ShortInfoComponent implements OnInit {
	data: any[] = [];
	filteredData: any[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getShortInfoData().subscribe((result: any) => {
			this.data = result;
			this.filteredData = this.data;
			console.log('Short Info Data: ', this.data[0]);
		});
	}
}
