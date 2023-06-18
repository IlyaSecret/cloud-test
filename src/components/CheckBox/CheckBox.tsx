import styles from "./CheckBox.module.scss";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@schema/RegistrationForm";
import { memo } from "react";

export type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
	register: UseFormRegister<FormData>;
	label: keyof FormData;
	value: string;
	id: string;
};

export function CheckBox({
	register,
	label,
	value,
	id,
	...props
}: CheckBoxProps) {
	return (
		<label className={styles.checkbox} htmlFor={id}>
			<input
				{...props}
				type="checkbox"
				id={id}
				value={value}
				{...register(label)}
				className={styles.checkbox__original_hidden}
			/>
			<div className={styles.checkbox__custom} />
			{value}
		</label>
	);
}

export default memo(CheckBox);
