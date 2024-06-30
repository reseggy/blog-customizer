import { ArrowButton } from 'components/arrow-button';
import { Select } from 'components/select';
import { Button } from 'components/button';
import { Separator } from '../separator';
import { RadioGroup } from 'components/radio-group';
import { useRef, useState, useEffect } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { renderApp } from 'src/index';

import {
	defaultArticleState,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

export const ArticleParamsFormCurrent = {
	fontFamilyOption: defaultArticleState.fontFamilyOption,
	fontSizeOption: defaultArticleState.fontSizeOption,
	fontColor: defaultArticleState.fontColor,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
};

export const ArticleParamsForm = () => {
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

	const [currentFont, setCurrentFont] = useState(
		ArticleParamsFormCurrent.fontFamilyOption
	);
	const [currentFontSize, setCurrentFontSize] = useState(
		ArticleParamsFormCurrent.fontSizeOption
	);
	const [currentFontColor, setCurrentFontColor] = useState(
		ArticleParamsFormCurrent.fontColor
	);
	const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
		ArticleParamsFormCurrent.backgroundColor
	);
	const [currentContentWidth, setCurrentContentWidth] = useState(
		ArticleParamsFormCurrent.contentWidth
	);

	const handleChangeFont = (font: OptionType) => {
		setCurrentFont(font);
	};
	const handleChangeFontSize = (fontSize: OptionType) => {
		setCurrentFontSize(fontSize);
	};
	const handleChangeFontColor = (fontColor: OptionType) => {
		setCurrentFontColor(fontColor);
	};
	const handleChangeBackgroundColor = (backgroundColor: OptionType) => {
		setCurrentBackgroundColor(backgroundColor);
	};
	const handleChangeContentWidth = (width: OptionType) => {
		setCurrentContentWidth(width);
	};

	const handleConfirmAll = () => {
		ArticleParamsFormCurrent.fontFamilyOption = currentFont;
		ArticleParamsFormCurrent.fontSizeOption = currentFontSize;
		ArticleParamsFormCurrent.fontColor = currentFontColor;
		ArticleParamsFormCurrent.backgroundColor = currentBackgroundColor;
		ArticleParamsFormCurrent.contentWidth = currentContentWidth;
		renderApp();
	};

	const handleReset = () => {
		setCurrentFont(defaultArticleState.fontFamilyOption);
		setCurrentFontSize(defaultArticleState.fontSizeOption);
		setCurrentFontColor(defaultArticleState.fontColor);
		setCurrentBackgroundColor(defaultArticleState.backgroundColor);
		setCurrentContentWidth(defaultArticleState.contentWidth);
		ArticleParamsFormCurrent.fontFamilyOption =
			defaultArticleState.fontFamilyOption;
		ArticleParamsFormCurrent.fontSizeOption =
			defaultArticleState.fontSizeOption;
		ArticleParamsFormCurrent.fontColor = defaultArticleState.fontColor;
		ArticleParamsFormCurrent.backgroundColor =
			defaultArticleState.backgroundColor;
		ArticleParamsFormCurrent.contentWidth = defaultArticleState.contentWidth;
		renderApp();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} toggleOpen={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form className={styles.form}>
					<Select
						selected={currentFont}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleChangeFont}
					/>
					<RadioGroup
						name={'fontSize'}
						options={fontSizeOptions}
						selected={currentFontSize}
						title={'Размер Шрифта'}
						onChange={handleChangeFontSize}
					/>
					<Select
						selected={currentFontColor}
						options={fontColors}
						title={'Цвет Шрифта'}
						onChange={handleChangeFontColor}
					/>
					<Separator />
					<Select
						selected={currentBackgroundColor}
						options={backgroundColors}
						title={'Цвет Фона'}
						onChange={handleChangeBackgroundColor}
					/>
					<Select
						selected={currentContentWidth}
						options={contentWidthArr}
						title={'Ширина Контента'}
						onChange={handleChangeContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button
							title='Применить'
							type='button'
							onClick={handleConfirmAll}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
