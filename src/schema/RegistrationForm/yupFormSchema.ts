import type {
	FormDataPart1,
	FormDataPart2,
	FormDataPart3,
	FormData,
	LoginPageData,
} from "./dataTypes";
import { object, array, string, number, ObjectSchema } from "yup";

export const loginPageSchema: ObjectSchema<LoginPageData> = object({
	phoneNumber: number()
		.required("Should have phone number.")
		.typeError("Should be a valid phone number.")
		.positive("Should be a valid phone number.")
		.integer("Should be a valid phone number.")
		.max(9999999999, "Should have 10 digits.")
		.min(1000000000, "Should have 10 digits."),
	email: string()
		.required("Should have email.")
		.matches(
			/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
			"Should be a valid email: example@domain.com."
		),
});

export const formPart1Schema: ObjectSchema<FormDataPart1> = object({
	nickname: string()
		.required("Should have nickname.")
		.max(30, "Nickname max length is 30.")
		.min(1, "Should have nickname.")
		.matches(
			/^[0-9a-zA-Z]*$/,
			"Nickname should have only numbers and letters."
		),
	name: string()
		.required("Should have name.")
		.max(50, "Name max length is 30.")
		.min(1, "Should have name.")
		.matches(
			/^[A-Z][a-z]*$/,
			"Name should have only letters and start with capital."
		),
	surname: string()
		.required("Should have surname.")
		.max(50, "Surname max length is 30.")
		.min(1, "Should have surname.")
		.matches(
			/^[A-Z][a-z]*$/,
			"Surname should have only letters and start with capital."
		),
	sex: string()
		.oneOf(["man", "woman"], "Sex should be a man or woman.")
		.required("Should have sex."),
});

export const formPart2Schema: ObjectSchema<FormDataPart2> = object({
	advantages: array()
		.of(
			object({ value: string().required() }).required(
				"Should have all advantages fields filled."
			)
		)
		.required("Should have advantages array."),
	checkbox: array()
		.of(
			number()
				.typeError("Should be a number.")
				.required("Should have checkbox item.")
		)
		.required("Should have checkbox."),
	radio: number()
		.typeError("Should be a number.")
		.required("Should have radio."),
});

export const formPart3Schema: ObjectSchema<FormDataPart3> = object({
	about: string()
		.required("Should have about.")
		.max(200, "About max length is 200."),
});

export const formDataSchema: ObjectSchema<FormData> = object()
	.concat(loginPageSchema)
	.concat(formPart1Schema)
	.concat(formPart2Schema)
	.concat(formPart3Schema)
	.required("Should have form.");
