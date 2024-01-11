/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
import { DocsExample } from '../../../components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategoryRow from './CategoryRow';
const Categories = () => {
    const [categories, setCategories] = useState([])
    const [totalCategories, setTotalCategories] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [showPerPage, setShowPerPage] = useState(3)
    useEffect(() => {
        const subscribe = async function(){
            const result = await axios.get(`/category/${currentPage}/${showPerPage}`).then(response => {
                // setCategories(response.data.categories)
                // setTotalCategories(response.data.categories.length)
                console.log(response)
            })
        }
        subscribe()
        return () => subscribe();
    },[showPerPage, currentPage])
    const totalPages = Math.ceil(totalCategories / showPerPage)
    const pages = [...Array(totalPages).keys()]
    const handleChangePage = (id) => {
        setCurrentPage(id)
    }
    
    console.log(currentPage)
    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                <CCardHeader>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <div><strong>Categories</strong></div>
                        <div><Link to={'/category/add'} className='btn btn-info text-white'>Add Category</Link></div>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <CTable striped>
                        <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Class</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
                        </CTableRow>
                        </CTableHead>
                        <CTableBody>
                        {
                            categories.map((category, index) => <CategoryRow key={index} category={category} count={++index} />)
                        }
                        </CTableBody>
                    </CTable>
                    <div className="flex">
                        {
                            pages.map(page => <button key={page} disabled={page == currentPage} onClick={() => handleChangePage(page)}>{page}</button>)
                        }
                    </div>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Categories;