import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-short-info',
	templateUrl: './short-info.component.html',
	styleUrls: ['./short-info.component.scss'],
})
export class ShortInfoComponent implements OnInit {
	data: any[] = [];
	// filteredData: any[] = [];
	totalIssuedCredits: number = 0;
	averageCreditAmount: number = 0;
	totalIssuedCreditAmount: number = 0;
	totalInterestAmount: number = 0;
	returnedCredits: number = 0;
	groupIssuedCreditsByMonth: any = [];
	groupReturnedCreditsByMonth: any = [];

	constructor(private dataService: DataService) {}

	ngOnInit() {
		this.dataService.getShortInfoData().subscribe((result: any) => {
			this.data = result;
			// this.filteredData = this.data;

			// Загальна кількість виданих кредитів
			this.totalIssuedCredits = this.data.length;

			// Середня сума видачі кредитів
			this.averageCreditAmount =
				this.data.reduce((acc, curr) => acc + curr.body, 0) / this.data.length;

			// Загальна сума виданих кредитів
			this.totalIssuedCreditAmount = this.data.reduce((acc, curr) => acc + curr.body, 0);

			// Загальна сума нарахованих відсотків
			this.totalInterestAmount = this.data.reduce((acc, curr) => acc + curr.percent, 0);

			// Кількість повернених кредитів
			this.returnedCredits = this.data.filter(item => item.actual_return_date !== null).length;

			// Кількість виданих кредитів по місяцях
			// this.groupIssuedCreditsByMonth = this.data.reduce((acc, curr) => {
			// 	const month = this.getMonth(curr.issuance_date);
			// 	acc[month] = acc[month] ? acc[month] + 1 : 1;
			// 	return acc;
			// }, []);

			const groupIssuedCreditsByMonth = this.data.reduce((acc, curr) => {
				const month = this.getMonth(curr.issuance_date);
				acc[month] = acc[month] ? acc[month] + 1 : 1;
				return acc;
			}, {});

			const sortedGroupIssuedCreditsByMonth = Array.from({ length: 12 }, (_, i) => ({
				month: i + 1,
				value: groupIssuedCreditsByMonth[i] || 0,
			}));

			this.groupIssuedCreditsByMonth = sortedGroupIssuedCreditsByMonth;

			// Кількість повернених кредитів по місяцях
			this.groupReturnedCreditsByMonth = this.data.reduce((acc, curr) => {
				if (curr.actual_return_date) {
					const month = this.getMonth(curr.actual_return_date);
					acc[month] = acc[month] ? acc[month] + 1 : 1;
				}
				return acc;
			}, {});

			const sortedGroupReturnedCreditsByMonth = Array.from({ length: 12 }, (_, i) => ({
				month: i + 1,
				value: this.groupReturnedCreditsByMonth[i] || 0,
			}));

			this.groupReturnedCreditsByMonth = sortedGroupReturnedCreditsByMonth;
		});
	}

	getMonth(date: string) {
		return new Date(date).getMonth();
	}
}
