/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormTextarea,
    CRow,
  } from '@coreui/react'
  import { DocsExample } from './../../../components'
import axios from 'axios';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2';
const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        status: 1,
        meta_title: '',
        meta_description: '',
        meta_keywords: []
    })
    const [loading, setLoading] = useState(false)

    const handleTagChange = (e) => {
        setCategory({
            ...category,
            meta_keywords: e
        })
    }

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post('/category/add',category).then(response => {
            if(response.data.status === 401){
                response.data.errors.forEach(el => toast.error(el,{
                    position: 'top-right'
                }))
            }else if(response.data.status === 200){
                Swal.fire('Success',response.data.message,'success')
                setCategory({
                    name: '',
                    status: 1, 
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: []
                })
            }
            setLoading(false)
        })

    }

    return (
        <CRow>
            <ToastContainer />
            <CCol xs={12}>
                <CCard className="mb-4">
                <CCardHeader>
                    <strong>Add Category</strong>
                </CCardHeader>
                <CCardBody>
                    <CForm onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Name</CFormLabel>
                            <CFormInput
                                type="text"
                                id="name"
                                onChange={handleChange}
                                name='name'
                                placeholder="Category Name"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                            <select name="status" onChange={handleChange} className='form-control' id="">
                                <option value="1">Published</option>
                                <option value="0">Unpublished</option>
                            </select>
                        </div>
                        <br />
                        <strong>SEO</strong>
                        
                        <div className="mb-3">
                            <CFormInput
                                type="text"
                                id="name"
                                onChange={handleChange}
                                name='meta_title'
                                value={category.meta_title}
                                placeholder="Meta Title"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormTextarea 
                                onChange={handleChange}
                                name='meta_description'
                                value={category.meta_description}
                                placeholder='Meta Description'
                            />
                        </div>
                        <div className="mb-3">
                            <TagsInput className='form-control' onChange={handleTagChange} value={category.meta_keywords} />
                        </div>
                        <div className="mb-3">
                            <button type='submit' className='btn btn-success text-white' disabled={loading}>{loading ? 'Processing...' : 'Submit'}</button>
                        </div>
                    </CForm>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default AddCategory;