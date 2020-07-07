interface User {
	id: string;
}

interface FooModel {
	id: string;
	name: string; // Mandatory property
	description?: string; // Optional property
	created?: Date;
	createdBy?: User;
	updated?: Date;
	updatedBy?: User;
	bar?: object;
	barId?: string;
}

export default FooModel;
