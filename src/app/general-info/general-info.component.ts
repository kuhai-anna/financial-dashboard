import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-general-info',
	templateUrl: './general-info.component.html',
	styleUrls: ['./general-info.component.scss'],
})
export class GeneralInfoComponent implements OnInit {
	data: any[] = [];
	filteredData: any[] = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getGeneralInfoData().subscribe((result: any) => {
			this.data = result;
			this.filteredData = this.data;
			console.log('General Info Data: ', this.data[0]);
		});
	}

	// Логіка фільтрації за датою видачі кредиту (issuance_date)
	filterByIssuanceDate(startDate: Date, endDate: Date) {
		this.filteredData = this.data.filter(item => {
			const issuanceDate = new Date(item.issuance_date);
			return issuanceDate >= startDate && issuanceDate <= endDate;
		});
	}

	// Логіка фільтрації за датою повернення кредиту (actual_return_date)
	filterByReturnDate(startDate: Date, endDate: Date) {
		this.filteredData = this.data.filter(item => {
			if (item.actual_return_date) {
				const returnDate = new Date(item.actual_return_date);
				return returnDate >= startDate && returnDate <= endDate;
			}
			return false;
		});
	}

	// Логіка фільтрації для просрочених кредитів
	filterByOverdueCredits() {
		const currentDate = new Date();
		this.filteredData = this.data.filter(item => {
			if (item.actual_return_date) {
				const returnDate = new Date(item.return_date);
				const actualReturnDate = new Date(item.actual_return_date);
				return actualReturnDate > returnDate || returnDate < currentDate;
			}
			return false;
		});
	}
}
