import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding-top: 30%;
  > p.tips {
    color: #9d9d9d;
    font-size: 14px;
  }
  > p.input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    margin-top: 30px;
    padding: 0 10%;
    font-weight: bold;
    font-size: 22px;
    white-space: nowrap;
    line-height: 30px;
    text-align: center;
    input {
      flex: 1;
      height: 30px;
      padding-left: 10px;
      border: none;
      outline: none;
      font-size: 22px;
      font-weight: bold;
      line-height: 30px;
    }
  }
  hr {
    height: 1px;
    margin: 0 10%;
    margin-top: 10px;
    border: none;
    background-color: #ccc;
  }
  .LoginBtn {
    display: block;
    width: 70%;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 30px;
    border-radius: 30px;
    background: #db3730;
    text-align: center;
    color: #fff;
    cursor: pointer;
    &.disabled {
      opacity: 0.3;
    }
  }
`;

export const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 40px;
  font-weight: bold;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  > img {
    position: absolute;
    height: 20px;
    top: 10px;
    left: 0;
  }
`;
