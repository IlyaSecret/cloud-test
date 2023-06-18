import classNames from "classnames";
import styles from "./Select.module.scss";
import { UseFormRegister } from "react-hook-form/dist/types";
import { FormData } from "@schema/RegistrationForm/dataTypes";
import { SyntheticEvent, memo, useMemo, useState } from "react";
import { useId } from "react-id-generator";
import { capitalizeFirstLetter } from "@utils/helperFunctions";

type SelectProps = {
	register: UseFormRegister<FormData>;
	label: keyof FormData;
	options: string[];
	className: string;
};

export function Select({ register, label, options, className }: SelectProps) {
	const [visible, setVisible] = useState<boolean>(false);
	const [checked, setChecked] = useState<(typeof options)[number]>(options[0]);

	const checkboxId: React.Key[] = useId(options.length, label);
	const labelCapitalized = capitalizeFirstLetter(label);

	const optionsList = useMemo<JSX.Element[]>(() => {
		return options.map((value, index) => {
			const { onBlur, name, ref, onChange } = register(label, {
				onChange: (event: SyntheticEvent) => {
					const { target } = event;
					setChecked((target as HTMLInputElement).value);
					setVisible(false);
				},
			});

			return (
				<label
					key={checkboxId[index]}
					htmlFor={`field-${label}-option-${value}`}
					className={styles.select__label}
				>
					<input
						type="radio"
						value={value}
						id={`field-${label}-option-${value}`}
						className={styles.select__option}
						onChange={(...args) => void onChange(...args)}
						onBlur={(...args) => void onBlur(...args)}
						name={name}
						ref={ref}
					/>
					{value}
				</label>
			);
		});
	}, [checkboxId, labelCapitalized, checked, visible, setVisible, setChecked]);

	return (
		<label
			htmlFor={`field-${label}`}
			className={classNames(styles.select, className)}
		>
			<span>{labelCapitalized}</span>
			<span
				id={`field-${label}`}
				className={classNames(
					styles.select__container,
					visible && styles.select__container_expanded
				)}
				onClick={() => {
					const newState = !visible;
					setVisible(newState);
				}}
			>
				<span className={styles.select__checked}>{checked}</span>
				<div className={styles.select__optionsContainer}>{optionsList}</div>
			</span>
		</label>
	);
}

export default memo(Select);
