import React from 'react';

// General Style

const mainStyle = {
	margin: '1.5rem auto 0 auto',
	fontFamily: 'Roboto',
}

//  Header Components

export const titleStyle = {
	fontSize: '72px',
	textAlign: 'center',
	lineHeight: '1.6',
	fontWeight: '300',
	letterSpacing: '0.6rem',
	backgroundColor: 'white',
	color: '#799BD2',
	borderRadius: '1rem 1rem 0 0',
	margin: 'unset',

}

const filterBarStyle = {
	backgroundColor: '#799BD2',
	color: '#fff',
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
	fontSize: '1rem',
	borderRadius: '1rem',
	height: '2rem',
	lineHeight: '30px',
	textStyle: 'Uppercase',
	letterSpacing: '0.6rem',
}

export const orderIconStyle = {
	cursor: 'pointer',
	letterSpacing: '0',
	padding: '0 1rem'
}

export const orderTitleStyle = {
	letterSpacing: '0',
	padding: '0 1rem'
}

//  Body Components

const bodyStyle = {
	marginTop: '5rem',
	display: 'flex',
	flexDirection: 'column',
}

export const firstArticleToAdd = {
	color: 'gray',
	border: '1px dashed gray',
	height: '6rem',
	display: 'flex',
	borderRadius: '1rem',
	marginBottom: '1rem',
	cursor: 'pointer'

}

export const articleStyle = {
	backgroundColor: 'rgb(224, 233, 255)',
	borderRadius: '1rem',
	color: '#799BD2',
	height: '6rem',
	display: 'flex',
	flexDirection: 'rows',
	justifyContent: 'start',
	alignItems: 'center',
	marginBottom: '1rem'
}



//  Footer Components



export const MainStyleWrapper = (props) => <main style={mainStyle}>{props.children}</main>
export const FilterBarStyleWrapper = (props) => <div style={filterBarStyle}>{props.children}</div>
export const BodyStyleWrapper = (props) => <div style={bodyStyle}>{props.children}</div>
export const EventStyleWrapper = (props) => <article style={articleStyle}>{props.children}</article>
