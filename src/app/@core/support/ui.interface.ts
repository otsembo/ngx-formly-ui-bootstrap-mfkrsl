import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export interface Alert {
	type: 'success'| 'info'| 'warning'| 'danger'| 'primary'| 'secondary'| 'light' | 'dark';
	message: string;
}

export interface Dialog {
	title: string
	body: string
	btnOkText: string
	btnDeclineText?: string
	btnOkClass?: string
	btnDeclineClass?: string
	options?: NgbModalOptions
}