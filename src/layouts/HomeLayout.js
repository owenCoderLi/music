import React from 'react';
import { NavLink } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Player from '../application/Player/index';
import { Top, Tab, TabItem } from './HomeLayout.style';

function Home(props) {
	const {route} = props;
	return (
		<div>
			<Top>
				<span className="iconfont menu">&#xe65c;</span>
				<span className="title">云音乐</span>
				<span
					className="iconfont search"
					onClick={() => props.history.push('/search')}>
					&#xe62b;
				</span>
			</Top>
			<Tab>
				<NavLink to="/recommend" activeClassName="selected">
					<TabItem><span>推荐</span></TabItem>
				</NavLink>
				<NavLink to="/singers" activeClassName="selected">
					<TabItem><span>歌手</span></TabItem>
				</NavLink>
				<NavLink to="/rank" activeClassName="selected">
					<TabItem><span>排行榜</span></TabItem>
				</NavLink>
			</Tab>
			{ renderRoutes(route.routes) }
			<Player />
		</div>
	)
}

export default React.memo(Home);