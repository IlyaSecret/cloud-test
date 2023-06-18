import styles from "./CheckboxGroup.module.scss";
import { useId } from "react-id-generator";
import { useMemo } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@schema/RegistrationForm";
import classnames from "classnames";
import { CheckBox } from "../CheckBox/CheckBox";

type CheckBoxGroupProps = {
	register: UseFormRegister<FormData>;
	className?: string;
	values: string[];
};

export function CheckBoxGroup({
	register,
	className,
	values,
}: CheckBoxGroupProps) {
	const checkboxId: React.Key[] = useId(values.length, "checkbox");
	const checkbox = useMemo(() => {
		return Array.from(values).map((item, index) => {
			const num = index + 1;
			return (
				<li key={checkboxId[index]}>
					<CheckBox
						id={`field-checkbox-group-option-${num}`}
						register={register}
						value={values[index]}
						label={"checkbox"}
					/>
				</li>
			);
		});
	}, [checkboxId]);
	return (
		<fieldset className={classnames(styles.checkboxGroup, className)}>
			<legend>Checkbox group</legend>
			<ul>{checkbox}</ul>
		</fieldset>
	);
}

export default CheckBoxGroup;
