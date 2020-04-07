import React, { useEffect, memo } from 'react';
import { connect } from "react-redux";
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import Slider from '../../components/slider/index';
import RecommendList from '../../components/list/index';
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading-v2/index';
import * as actionTypes from './store/actionCreators';
import { Content } from './style';
import { EnterLoading } from './../Singers/style';



function Recommend(props){
  const {
    bannerList, recommendList, songsCount, enterLoading,
    getBannerDataDispatch, getRecommendListDataDispatch
  } = props;

  useEffect(() => {
    if(!bannerList.size){
      getBannerDataDispatch();
    }
    if(!recommendList.size){
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() :[];

  return (
    <Content play={songsCount}>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading? <EnterLoading><Loading /></EnterLoading> : null}
      { renderRoutes(props.route.routes) }
    </Content> 
  );
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  songsCount: state.getIn(['player', 'playList']).size,
  enterLoading: state.getIn(['recommend', 'enterLoading'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
