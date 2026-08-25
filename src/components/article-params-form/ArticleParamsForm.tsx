import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
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
import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Text } from 'src/ui/text';

type ArticleParamsFormProps = {
	onApply: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
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
						onChange={(selected) =>
							setFormState({ ...formState, fontFamilyOption: selected })
						}
					/>
					<RadioGroup
						name='fontsize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='размер шрифта'
						onChange={(selected) =>
							setFormState({ ...formState, fontSizeOption: selected })
						}
					/>
					<Select
						selected={formState.fontColor}
						options={fontColors}
						title='цвет шрифта'
						onChange={(selected) =>
							setFormState({ ...formState, fontColor: selected })
						}
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='цвет фона'
						onChange={(selected) =>
							setFormState({ ...formState, backgroundColor: selected })
						}
					/>
					<Select
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='ширина контента'
						onChange={(selected) =>
							setFormState({ ...formState, contentWidth: selected })
						}
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
