import classNames from "classnames";
import styles from "./Tip.module.scss";

export type ErrorTipProps = React.PropsWithChildren<{
	children: React.ReactNode;
	className?: string;
}>;

export function Tip({ children, className }: ErrorTipProps) {
	return <p className={classNames(styles.errorTip, className)}>{children}</p>;
}

export default Tip;
