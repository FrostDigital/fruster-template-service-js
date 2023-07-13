import Foo from "../models/Foo";

type GetFooRequest = Pick<Foo, "id">;

export default GetFooRequest;
