import styled from 'styled-components';
import style from '../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title{
    padding-left: 6px;
    font-weight: 700;
    font-size: 14px;
    line-height: 60px;
    color: ${style["font-color"]};
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
`;

export const ListItem = styled.div`
  position: relative;
  width: 32%;
  .decorate {
    z-index: 1;
    position: absolute;
    top: 0;
    width: 100%;
    height: 35px;
    border-radius: 3px;
    background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
  }
  .img_wrapper {
    position: relative;
    height: 0;
    padding-bottom: 100%;
    .play_count {
      z-index: 1;
      position: absolute;
      right: 2px; top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play{
        vertical-align: top;
      }
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
  }
  .desc {
    overflow: hidden;
    height: 50px;
		margin-top: 2px;
		padding: 0 2px;
		text-align: left;
		font-size: ${style["font-size-s"]};
		line-height: 1.4;
		color: ${style["font-color-desc"]};
	}
`;