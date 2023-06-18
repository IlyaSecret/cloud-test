import { useMemo } from "react";
import { useId } from "react-id-generator";
import styles from "./RadioGroup.module.scss";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@schema/RegistrationForm";
import classNames from "classnames";

type RadioGroupProps = {
	register: UseFormRegister<FormData>;
	className?: string;
	values: string[];
};

export function RadioGroup({ register, className, values }: RadioGroupProps) {
	const radioId: React.Key[] = useId(values.length, "radio");
	const radio = useMemo(() => {
		return Array.from(values).map((item, index) => {
			const id = `field-radio-group-option-${index + 1}`;
			return (
				<li key={radioId[index]}>
					<label htmlFor={id} className={styles.radio__itemContainer}>
						<input
							type="radio"
							id={id}
							value={item}
							className={styles.radio__item}
							{...register("radio")}
						/>
						{item}
					</label>
				</li>
			);
		});
	}, [radioId]);

	return (
		<fieldset className={classNames(styles.radio, className)}>
			<legend>Radio group</legend>
			<ul>{radio}</ul>
		</fieldset>
	);
}

export default RadioGroup;
