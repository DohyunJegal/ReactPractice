import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';

/*
    option
        null: 아무나 출입 가능
        true: 로그인 한 유저만 출입 가능
        false: 로그인 한 유저 추입 불가
    adminRoute
        null: 모든 사용자 출입 가능
        true: 관리자만 출입 가능
*/
export default function (SpecificComponent, option, adminRoute = null){
    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        const navigate = useNavigate();

        useEffect(() => {
          dispatch(auth()).then(response => {
            console.log(response)

            if(!response.payload.isAuth){
                if(option){
                    navigate('/login')
                }
            } else {
                if(adminRoute && !response.payload.isAdmin){
                    navigate('/')
                } else {
                    if(option === false){
                        navigate('/')
                    }
                }
            }
          })
        }, [])

        return(
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck;
}