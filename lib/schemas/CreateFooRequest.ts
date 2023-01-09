import { Foo } from "./Foo"

export interface CreateFooRequest extends Pick<Foo, "name"|"description"> {

	/** @format uuid */
	barId?:string
}

export const CREATE_FOO_REQUEST = "CreateFooRequest"
