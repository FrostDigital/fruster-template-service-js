export interface Metadata {

	/** @description:timestamp of creation */
	created?: Date;

	/**
	 * @description userId of creator
	 * @format uuid
	 */
	createdBy?: string;

	/** @description timestamp of latest update */
	updated?: Date;

	/**
	 * @description userId of latest user to update
	 * @format uuid
	 */
	updatedBy?: string;
}
