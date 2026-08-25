import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import type { ArticleStateType, OptionType } from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const formContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isSettingsOpen) return;
		const handleClick = (e: MouseEvent) => {
			if (
				e.target instanceof Node &&
				!formContainerRef.current?.contains(e.target)
			) {
				setIsSettingsOpen(false);
			}
		};
		window.addEventListener('mousedown', handleClick);
		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isSettingsOpen]);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	const handleChange = (field: keyof ArticleStateType) => (value: OptionType) =>
		setFormState((prevState) => ({ ...prevState, [field]: value }));

	return (
		<div ref={formContainerRef}>
			<ArrowButton
				isOpen={isSettingsOpen}
				onClick={() =>
					setIsSettingsOpen((prevIsSettingsOpen) => !prevIsSettingsOpen)
				}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isSettingsOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='шрифт'
						onChange={handleChange('fontFamilyOption')}
					/>
					<RadioGroup
						name='fontsize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={handleChange('fontSizeOption')}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={handleChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={handleChange('backgroundColor')}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={handleChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
