export interface BarModel {
	/**
	 * @format uuid
	 */
	id:string,
	type: BarType
}

export enum BarType {
	D_TYPE= "DType",
	E_TYPE = "EType"
}
