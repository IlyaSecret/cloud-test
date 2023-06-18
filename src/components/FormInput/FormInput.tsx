import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./FormInput.module.scss";
import {
	RefCallBack,
	UseFormRegister,
	UseFormRegisterReturn,
} from "react-hook-form";
import classNames from "classnames";
import { FormData } from "@schema/RegistrationForm";
import { capitalizeFirstLetter } from "@utils/helperFunctions";
import { Tip } from "@components/Tip/Tip";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	register?: UseFormRegister<FormData>;
	inputName: keyof FormData;
	inputLabel?: string;
	className?: string;
	errors: string | undefined;
	type?: string;
	length?: "n" | "l";
} & Partial<UseFormRegisterReturn>;

export const FormInput = forwardRef(function Input(
	{
		register,
		inputName,
		className = "",
		errors,
		inputLabel,
		type = "text",
		length = "n",
		...props
	}: InputProps,
	ref: RefCallBack
) {
	const labelCapitalized =
		typeof inputLabel === "string"
			? inputLabel
			: capitalizeFirstLetter(inputName);
	const spreadProps = register ? { ...register(inputName) } : { ...props };
	return (
		<label
			htmlFor={`field-${inputName}`}
			className={classNames(styles.input, className)}
		>
			<p>{labelCapitalized}</p>
			<input
				type={type}
				className={classNames(
					styles.input__input,
					`${styles.input__input}_${length}`
				)}
				{...spreadProps}
				id={`field-${inputName}`}
				ref={ref}
			/>
			<Tip>{errors}</Tip>
		</label>
	);
});

export default FormInput;
