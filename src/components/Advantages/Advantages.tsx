import { useId } from "react-id-generator";
import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { FormData } from "@schema/RegistrationForm";
import RemoveIcon from "@assets/RemoveIcon.svg";
import CrossAddIcon from "@assets/CrossAddIcon.svg";
import styles from "./Advantages.module.scss";
import classNames from "classnames";
import { Button } from "@components/Button/Button";

type AdvantagesProps = {
	control: Control<FormData, unknown>;
	register: UseFormRegister<FormData>;
	className?: string;
};

export function Advantages({ control, register, className }: AdvantagesProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: "advantages",
	});

	const advantagesLength = fields.length;
	const advantagesId: React.Key[] = useId(advantagesLength, "advantages");
	const advantages = Array.from({ length: advantagesLength }).map(
		(_, index) => {
			return (
				<div
					key={advantagesId[index]}
					id="field-advantages"
					className={styles.advantages__container}
				>
					<input
						className={styles.advantages__input}
						{...register(`advantages.${index}.value`)}
						id={`field-advantages-${index + 1}`}
					/>
					<div
						className={styles.advantages__delete}
						onClick={() => remove(index)}
						id={`button-remove-${index + 1}`}
					>
						<img src={RemoveIcon} alt="remove" />
					</div>
				</div>
			);
		}
	);
	const addAdvantages = () => {
		append({ value: "" });
	};

	return (
		<fieldset className={classNames(styles.advantages, className)}>
			<label htmlFor="field-advantages">
				<p>Advantages</p>
				{advantages}
			</label>
			<Button
				className={styles.advantages__add}
				type="button"
				onClick={addAdvantages}
				id="button-add"
				style="border"
			>
				<img src={CrossAddIcon} alt="remove" />
			</Button>
		</fieldset>
	);
}

export default Advantages;
