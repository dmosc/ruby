import styled from 'styled-components';

const Container = styled.div`
  padding-top: 120px;
  padding-left: 120px;
  padding-right: 120px;
  padding-bottom: 120px;
  height: 91vh;
`;

const Box = styled.div`
  height: 25vh;
  font-size: 14px;
  line-height: 120px;
  background: #0092ff;
  border-radius: 4px;
  text-align: center;
  opacity: 0.6;
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const Text = styled.div`
  padding: 8px 16px;
  font-size: 13px;
  background: #f9f9f9;
  border-radius: 6px;
`;

export {Container, Box, Text};
