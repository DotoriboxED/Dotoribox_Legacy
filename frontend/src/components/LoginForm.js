import React from 'react';
import styled from 'styled-components';

const LoginForm = styled.form`
    display: inline-block;
`
const Form = styled.div`
    text-align: center;

`
const FormElem = styled.div`
    margin: 10px;
`

const Input = styled.input`
    margin: 3px;
`

const App = () => {
    return (
        <Form>
            <h1>관리자 페이지입니다.</h1>

            <LoginForm method="POST">
                <FormElem>
                    <Input name="id" placeholder="ID"/>
                    <br />
                    <Input name="password" type="password" placeholder="Password" />
                </FormElem>
                <br />
                <button type="submit">Login</button>
            </LoginForm>
        </Form>
    )
}

export default App;