import FooModel from "../models/FooModel";

export interface Foo extends FooModel {

	/**
	 * @format uuid
	 * @description Readonly unique id, is set during creation
	 */
	id: string

	/*** @description Name of Foo */
	name: string

	/** @description Description of Foo */
	description: string

	/** @description Id of related Bar */
	barId?: string,

}

export const FOO = "Foo";
