import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Loading from '../../baseUI/loading/index';
import Scroll from '../../baseUI/scroll/index';
import { List, ListItem, SongList, Container } from './style';
import { EnterLoading } from './../Singers/style';
import { getRankList } from './store/index'
import { filterIndex } from '../../api/utils';

function Rank(props) {
  const {
    rankList:list, loading, songsCount,
    getRankListDataDispatch
  } = props;

  let rankList = list ? list.toJS() : [];

  useEffect(() => {
    if(!rankList.length){
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`);
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  };

  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
      {
        list.map((item, index) => {
          return (
            <ListItem
              key={`${item.coverImgId}${index}`}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}>
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate" />
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              { renderSongList(item.tracks)  }
            </ListItem>
          )
        })
      } 
      </List>
    )
  };

  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  let displayStyle = loading ? {"display":"none"}:  {"display": ""};

  return (
    <Container play={songsCount}>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
          { loading ? <EnterLoading><Loading /></EnterLoading> : null }
        </div>
      </Scroll> 
      { renderRoutes(props.route.routes) }
    </Container>
    );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading']),
  songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch() {
      dispatch(getRankList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Rank));