/**
 * @description "Request for delete foos by bar id"
 */
export interface DeleteFoosByBarIdRequest {

	/**
	 * @format uuid
	 */
	barId: string
}

export const DELETE_FOOS_BY_BAR_ID_REQUEST = "DeleteFoosByBarIdRequest";
