import Foo from "../models/Foo";

type CreateFooRequest = Pick<Foo, "name" | "description">;

export default CreateFooRequest;
