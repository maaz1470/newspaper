/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    rePassword: ''
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const navigate = useNavigate();

  
  const handleRegistration = (e) => {
    e.preventDefault();
    if(user.password != user.rePassword){
      // toast.warning('Password or Repeate Password not matched.',{
      //   position: toast.POSITION.TOP_RIGHT
      // })
      Swal.fire('Error', 'Password or Repeate Password not matched.','error')
    }else{
      axios.post('/auth/registration',user).then(response => {
        if(response.data.status === 200){
          Swal.fire('Success',response.data.message,'success')
          // navigate('/auth/login',{
          //   replace: true
          // })
        }else if(response.data.status === 401){
          response.data.errors.forEach(el => {
            toast.error(el,{
              position: toast.POSITION.TOP_RIGHT
            })
          })
        }else if(response.data.status === 402){
          toast.error(response.data.message,{
            position: 'top-right'
          })
        }else{
          Swal.fire('Error','Something went wrong. Please try again.','error')
        }
      }).catch(error => {
        Swal.fire(error.message,error.response.data.message,'error')
      });
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <ToastContainer />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleRegistration}>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.firstName} name='firstName' placeholder="First Name" autoComplete="First Name" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.lastName} name='lastName' placeholder="Last Name" autoComplete="Last Name" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.username} name='username' placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.email} name='email' placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.password} name='password'
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput onChange={handleChange} value={user.rePassword} name='rePassword'
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type='submit'>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
