import React from 'react';
import {useHistory, useLocation} from "react-router-dom";
import styled from "styled-components";
import {ReactComponent as BackButton} from '../../image/back.svg';

const Setting = styled.div`
  font-size: 2rem;
  margin: 10px;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  position: absolute;
`;

const Back = styled.div`
    position: absolute;
  left: 0.5rem;
  top: 1.3rem;
  z-index: 1;
`

const Wrapper = styled.div`
    position: relative;
    height: 3.5rem;
  width: 100%;
`

const App = (props) => {
    const {Title, showBack} = props;
    const history = useHistory();

    return (
        <div>
            <Wrapper>
                {
                    showBack && <Back onClick={ () => history.goBack() }><BackButton width="25" heigt="25"/></Back>
                }
                <Setting><b>{Title}</b></Setting>
            </Wrapper>
            <hr />
        </div>
    )
}

export default App;