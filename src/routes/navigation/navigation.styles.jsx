import styled from 'styled-components';
import {Link} from 'react-router-dom';

export const NavigationContainer = styled.div`
  height: 70px;
  width: 100%;
  padding-bottom: 0em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 55px;
  border-bottom: 1px solid black;
`;

export const Logo = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;  
`

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const NavLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`

