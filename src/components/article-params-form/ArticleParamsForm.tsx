import { ArrowButton } from 'components/arrow-button';
import { Select } from 'components/select';
import { Button } from 'components/button';
import { Separator } from '../separator';
import { RadioGroup } from 'components/radio-group';
import { useRef, useState, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	ArticleStateType,
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

export const ArticleParamsForm = ({
	setArticleState,
}: {
	setArticleState: any;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLElement | null>(null);

	const handleClickOutside = (event: Event) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const [state, setState] = useState(defaultArticleState);

	const handleOnChange = (field: keyof ArticleStateType) => {
		return (value: OptionType) => {
			setState((prevState) => ({ ...prevState, [field]: value }));
		};
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleState(state);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={state.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleOnChange('fontFamilyOption')}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						title={'Размер Шрифта'}
						onChange={handleOnChange('fontSizeOption')}
					/>
					<Select
						selected={state.fontColor}
						options={fontColors}
						title={'Цвет Шрифта'}
						onChange={handleOnChange('fontColor')}
					/>
					<Separator />
					<Select
						selected={state.backgroundColor}
						options={backgroundColors}
						title={'Цвет Фона'}
						onChange={handleOnChange('backgroundColor')}
					/>
					<Select
						selected={state.contentWidth}
						options={contentWidthArr}
						title={'Ширина Контента'}
						onChange={handleOnChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
