import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import userService from '../../utils/userService';
import { useHistory } from 'react-router-dom';


export default function SignUpPage(props){
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = userState('');
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
        passwordConf: '',
        bio: ''
    });
    const history = useHistory();



 
    
    return (
        
       
           <h1>SIGNUP PAGE</h1>
        
        
      );   
    
}
