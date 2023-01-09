import { BarModel } from "../models/BarModel";
import { Foo } from "./Foo";

export interface FooWithBar extends Foo {
	bar?: BarModel
}

export const FOO_WITH_BAR = "FooWithBar";
