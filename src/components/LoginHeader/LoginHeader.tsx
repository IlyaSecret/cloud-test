import styles from "./LoginHeader.module.scss";
import { memo } from "react";
import FolderIcon from "@assets/FolderIcon.svg";

export function LoginHeader() {
	const name = "Илья Косяков";
	const userImg = name
		.split(" ")
		.map((el) => el.charAt(0))
		.join("");

	return (
		<header className={styles.header}>
			<div className={styles.header__userImg}>{userImg}</div>
			<h1 className={styles.header__title}>{name}</h1>
			<span className={styles.header__linkContainer}>
				<a href="https://t.me/iluxascale" className={styles.header__link}>
					<img src={FolderIcon} alt="icon for personal link" />
					<span className={styles.header__linkButton}>Telegram</span>
				</a>
				<a href="https://github.com/IlyaSecret" className={styles.header__link}>
					<img src={FolderIcon} alt="icon for personal link" />{" "}
					<span className={styles.header__linkButton}>GitHub</span>
				</a>
				<a
					href="https://hh.ru/resume/1303dd23ff095ef14f0039ed1f37485a364952"
					className={styles.header__link}
				>
					<img src={FolderIcon} alt="icon for personal link" />
					<span className={styles.header__linkButton}>Resume</span>
				</a>
			</span>
		</header>
	);
}

export default memo(LoginHeader);
