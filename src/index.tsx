import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import {
	ArticleParamsForm,
	ArticleParamsFormCurrent,
} from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': ArticleParamsFormCurrent.fontFamilyOption.value,
					'--font-size': ArticleParamsFormCurrent.fontSizeOption.value,
					'--font-color': ArticleParamsFormCurrent.fontColor.value,
					'--container-width': ArticleParamsFormCurrent.contentWidth.value,
					'--bg-color': ArticleParamsFormCurrent.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm />
			<Article />
		</div>
	);
};

export function renderApp() {
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
}

renderApp();
