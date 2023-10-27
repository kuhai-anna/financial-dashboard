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
	filteredItems: any[] = [];
	startDate: any = '';
	endDate: any = '';

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getGeneralInfoData().subscribe((result: any) => {
			this.data = result;
			this.filteredData = this.data;
			this.startDate = null;
			this.endDate = null;
		});
	}

	// Фільтр періоду дат видачі кредиту (issuance_date)
	filterByIssuanceDate() {
		const start = this.convertToDate(this.startDate);
		const end = this.convertToDate(this.endDate);
		this.filteredData = [];

		this.data?.forEach(item => {
			const issuanceDate = this.convertToDate(item.issuance_date);

			if (this.isDateInRange(issuanceDate, start, end)) {
				this.filteredData.push(item);
			}
		});
	}

	// Фільтр за датою повернення кредиту (actual_return_date)
	filterByReturnDate() {
		const start = this.convertToDate(this.startDate);
		const end = this.convertToDate(this.endDate);
		this.filteredData = [];

		this.data?.forEach(item => {
			const actualReturnDate = this.convertToDate(item.actual_return_date);
			if (this.isDateInRange(actualReturnDate, start, end)) {
				this.filteredData.push(item);
			}
		});
	}

	// Фільтр для просрочених кредитів
	filterByOverdueCredits() {
		const start = this.convertToDate(this.startDate);
		const end = this.convertToDate(this.endDate);
		const currentDate = new Date();
		this.filteredData = [];

		this.data?.forEach(item => {
			const returnDate = this.convertToDate(item.return_date);
			const actualReturnDate = this.convertToDate(item.actual_return_date);
			if (this.isDateInRange(returnDate, start, end)) {
				if (actualReturnDate > returnDate || returnDate < currentDate) {
					this.filteredData.push(item);
				}
			}
		});
	}

	convertToDate(dateString: any): Date {
		return new Date(dateString);
	}

	isDateInRange(date: Date, start: Date, end: Date): boolean {
		return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
	}

	clearFilteredData() {
		this.filteredData = this.data;
		this.startDate = null;
		this.endDate = null;
	}
}
