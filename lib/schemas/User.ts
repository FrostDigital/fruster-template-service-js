// export default {
// 	id: "User",
// 	description: "User object",
// 	type: "object",
// 	properties: {
// 		id: {
// 			type: "string",
// 			format: "uuid",
// 			description: "Readonly unique id, is set during creation"
// 		}
// 	}
// };

export interface User {
	/**
	 * @format: uuid
	 * @description: "Readonly unique id, is set during creation"
	 */
	id: string
}
