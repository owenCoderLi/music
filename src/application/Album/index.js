// third plugin
import React, {
  useState, useEffect,
  useRef, useCallback, memo
} from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from "react-transition-group";
// component
import Scroll from '../../baseUI/scroll/index';
import Loading from '../../baseUI/loading/index';
import  Header  from '../../baseUI/header/index';
import MusicNote from '../../baseUI/music-note/index';
import AlbumDetail from '../../components/album-detail/index';
// style
import style from "../../assets/global-style";
import { Container } from "./style";
import { EnterLoading } from './../Singers/style';
// function
import { getAlbumList, changePullUpLoading, changeEnterLoading } from './store/actionCreators';
import { HEADER_HEIGHT } from './../../api/config';
import { isEmptyObject } from '../../api/utils';

function Album(props) {
  const [title, setTitle] = useState("歌单");
  const [showStatus, setShowStatus] = useState(true);
  const [isMarquee, setIsMarquee] = useState(false);
  const musicNoteRef = useRef();
  const headerEl = useRef();
  const id = props.match.params.id;

  const {
		currentAlbum, enterLoading, pullUpLoading, songsCount,
		getAlbumDataDispatch, changePullUpLoadingStateDispatch
	} = props;

  let currentAlbumJS = currentAlbum.toJS();

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const handleScroll = useCallback(pos => {
    let minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y/minScrollY);
    let headerDom = headerEl.current;
    if(pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent-1) / 2);
      setTitle(currentAlbumJS&&currentAlbumJS.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  }, [currentAlbumJS]);

  const handlePullUp = () => {
    changePullUpLoadingStateDispatch(true);
    changePullUpLoadingStateDispatch(false);
  };
  
  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const musicAnimation = (x , y) => {
    musicNoteRef.current.startAnimation({x, y});
  };

  return (
		<CSSTransition 
			in={showStatus} timeout={300}
			classNames="fly" unmountOnExit appear={true}
			onExited={props.history.goBack}>
			<Container play={songsCount}>
				<Header
          ref={headerEl} title={title}
          handleClick={handleBack} isMarquee={isMarquee} />
				{
					!isEmptyObject(currentAlbumJS) ? (
						<Scroll 
							onScroll={handleScroll} 
							pullUp={handlePullUp} 
							pullUpLoading={pullUpLoading}
							bounceTop={false}>
							<AlbumDetail
								currentAlbum={currentAlbumJS}
								pullUpLoading={pullUpLoading}
								musicAnimation={musicAnimation} />
						</Scroll>
					) : null
				}
				{ enterLoading ?  <EnterLoading><Loading /></EnterLoading> : null}
				<MusicNote ref={musicNoteRef} />
			</Container>
		</CSSTransition>
  );
};

const mapStateToProps = (state) => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  pullUpLoading: state.getIn(['album', 'pullUpLoading']),
  enterLoading: state.getIn(['album', 'enterLoading']),
  startIndex: state.getIn(['album', 'startIndex']),
  totalCount: state.getIn(['album', 'totalCount']),
  songsCount: state.getIn(['player', 'playList']).size
});

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbumDataDispatch(id) {
      dispatch(changeEnterLoading(true));
      dispatch(getAlbumList(id));
    },
    changePullUpLoadingStateDispatch(state) {
      dispatch(changePullUpLoading(state));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Album));