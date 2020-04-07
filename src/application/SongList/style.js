import styled from 'styled-components';
import style from '../../assets/global-style';

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  ${props => props.showBackground ? `background: ${style['highlight-background-color']}` : ''};
  .first_line {
    position: relative;
    padding: 10px 0;
    margin-left: 10px;
    border-bottom: 1px solid ${style['border-color']};
    .play_all {
      line-height: 24px;
      color: ${style['font-color-desc']};
      .iconfont {
        margin-right: 10px;
        font-size: 24px;
        vertical-align: top;
      }
      .sum {
        font-size: ${style['font-size-s']};
        color: ${style['font-color-desc-v2']};
      }
      >span {
        vertical-align: top;
      }
    }
    .add_list, .isCollected {
      display: flex;
      align-items: center;
      position: absolute;
      right: 0; top: 0; bottom: 0;
      width: 130px;
      line-height: 34px;
      background: ${style['theme-color']};
      color: ${style['font-color-light']};
      font-size: 0;
      border-radius: 3px;
      vertical-align: top;
      .iconfont {
        vertical-align: top;
        font-size: 10px;
        margin: 0 5px 0 10px;
      }
      span {
        font-size: 14px;
        line-height: 34px;
      }
    }
    .isCollected {
      display: flex;
      background: ${style['background-color']};
      color: ${style['font-color-desc']};
    }
  }
`;

export const SongItem = styled.ul`
  >li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      padding: 5px 0;
      border-bottom: 1px solid ${style["border-color"]};
      ${style.noWrap()}
      >span {
        ${style.noWrap()}
      }
      >span:first-child {
        color: ${style["font-color-desc"]};
      }
      >span:last-child {
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;