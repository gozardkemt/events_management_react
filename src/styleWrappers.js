import React from 'react';

export const MainStyleWrapper = (props) => <main>{props.children}</main>
export const BarStyleWrapper = (props) => <div className="bar">{props.children}</div>
export const EventStyleWrapper = (props) => <article className="article">{props.children}</article>
export const EventDateStyleWrapper = (props) => <div style={{padding: '0 1.5rem', width: '7rem'}}>{props.children}</div>
export const BodyStyleWrapper = (props) => <div className="body">{props.children}</div>
