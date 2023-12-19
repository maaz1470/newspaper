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

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        status: 1
    })

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('/category/add',category).then(response => {
            console.log(response)
        })

    }

    return (
        <CRow>
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
                        <div className="mb-3">
                            <button type='submit' className='btn btn-success text-white'>Submit</button>
                        </div>
                    </CForm>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default AddCategory;