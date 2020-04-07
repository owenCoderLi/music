import React, { useRef, useEffect, memo } from 'react';
import { connect } from 'react-redux';
import  LazyLoad, {forceCheck} from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import Horizen from '../../baseUI/horizen-item/index';
import Scroll from "../../baseUI/scroll/index";
import Loading from '../../baseUI/loading/index';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
  getSingerList, changeCategory, changeAlpha,
  getHotSingerList, changeListOffset, refreshMoreSingerList,
  changePullUpLoading, changePullDownLoading, refreshMoreHotSingerList
} from './store/actionCreators';
import { 
  NavContainer, ListContainer, List,
  ListItem, EnterLoading
} from "./style";


function Singers(props){
  const scrollRef = useRef(null);

  const {
    singerList, category, alpha, pageCount,
    songsCount, pullUpLoading,pullDownLoading, enterLoading,
    getHotSinger, updateCategory, updateAlpha, pullUpRefresh, pullDownRefresh
  } = props;

  useEffect(() => {
    if(!singerList.length && !category && !alpha) {
      getHotSinger();
    }
    // eslint-disable-next-line
  }, []);

  const enterDetail = (id)  => {
    props.history.push(`/singers/${id}`);
  };

  const handlePullUp = () => {
    pullUpRefresh(category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefresh(category, pageCount);
  };

  const handleUpdateCategory = (newVal) => {
    if(category === newVal) return;
    updateCategory(newVal);
    scrollRef.current.refresh();
  };

  const handleUpdateAlpha = (newVal) => {
    if(alpha === newVal) return;
    updateAlpha(newVal);
    scrollRef.current.refresh();
  };

  const renderSingerList = () => {
    const {singerList} = props;
    return (
      <List>
      {
        singerList.toJS().map((item, index) => {
          return (
            <ListItem key={item.accountId+""+index} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music" />}>
                  <img src={`${item.picUrl}?param=300x300`} alt="music" />
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          )
        })
      }
      </List>
    )
  };

  return (
    <div>
      <NavContainer>
        <Horizen
          title={"分类(默认热门):"} list={ categoryTypes }
          handleClick={(v) => handleUpdateCategory(v)} oldVal={category} />
        <Horizen
          title={"首字母:"} list={ alphaTypes }
          handleClick={(v) => handleUpdateAlpha(v)} oldVal={alpha} />
      </NavContainer>
      <ListContainer play={songsCount}>
        <Scroll 
          onScroll = {forceCheck}  pullUp={handlePullUp}
          pullDown = {handlePullDown} ref={scrollRef}
          pullUpLoading = {pullUpLoading}
          pullDownLoading = {pullDownLoading}>
          { renderSingerList() }
        </Scroll>
      </ListContainer>
      { enterLoading ? <EnterLoading><Loading /></EnterLoading> : null}
      { renderRoutes(props.route.routes) }
    </div>
  )
}
const mapStateToProps = (state) => ({
  alpha: state.getIn(['singers', 'alpha']),
  category: state.getIn(['singers', 'category']),
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount']),
  songsCount: state.getIn(['player', 'playList']).size
});
const mapDispatchToProps = (dispatch) => {
  return {
    getHotSinger() {
      dispatch(getHotSingerList());
    },
    updateCategory(newVal) {
      dispatch(changeCategory(newVal));
      dispatch(getSingerList());
    },
    updateAlpha(newVal) {
      dispatch(changeAlpha(newVal));
      dispatch(getSingerList());
    },
    pullUpRefresh(hot, count) {
      dispatch(changePullUpLoading(true));
      if(hot){
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList());
      }
    },
    pullDownRefresh(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changeListOffset(0));
      if(category === '' && alpha === ''){
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList());
      }
    }
  }
};   

export default connect(mapStateToProps, mapDispatchToProps)(memo(Singers));