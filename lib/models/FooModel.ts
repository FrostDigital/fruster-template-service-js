import { Metadata } from "./Metadata";

interface User {
	id: string;
}

interface FooModel {

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

	 metadata: Metadata
}

export default FooModel;
