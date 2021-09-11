import styled from 'styled-components/macro';

export const SelectWrapper = styled.div`
  position: relative;
`

export const InputSelect = styled.input`
  width: 100%;
  border: none;
  color: #FFF;
  background: none;
  font-size: 28px;
  box-shadow: rgba(255, 255, 255, 0.3) 0px 1px;
  padding: 0px 24px 12px 0px;
`

export const OptionsWrapper = styled.ul`
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  width: 100%;
`

export const Option = styled.li`
  cursor: pointer;
  border-radius: 4px;
  font-size: 19px;
  padding: 12px 10px 13px 10px;
  margin-bottom: 4px;
  transition: all .3s ease;
  background-color: rgb(110, 199, 179);
  box-shadow: rgba(255, 255, 255, 0.6) 0px 0px 0px 1px inset;
  color: rgb(255, 255, 255);
  &:hover {
    background: rgb(142, 212, 196);
  }
`