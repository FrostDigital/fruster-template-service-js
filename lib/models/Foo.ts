import Bar from "./Bar";

interface User {
	id: string;
}

interface Foo {
	/**
	 * @format uuid
	 */
	id: string;
	name: string; // Mandatory property
	description?: string; // Optional property
	created: Date;
	createdBy: Pick<User, "id">;
	updated?: Date;
	updatedBy?: Pick<User, "id">;
	bar: Pick<Bar, "id">;
}

export default Foo;
