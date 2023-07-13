import Bar from "../models/Bar";
import Foo from "../models/Foo";

interface FooWithBar extends Foo {
	bar: Bar;
}

export default FooWithBar;
