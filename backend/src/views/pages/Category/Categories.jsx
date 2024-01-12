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
    const [showPerPage, setShowPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const subscribe = async function(){
            const result = await axios.get(`/category?page=${currentPage}&limit=${showPerPage}`).then(response => {
                setCategories(response.data.categories)
                setLoading(false)
            })
            const totalData = await axios.get('/category/total-category').then(response => {
                setTotalCategories(response.data.categories)
            })
        }
        subscribe()
        return () => subscribe();
    },[showPerPage, currentPage])
    const totalPages = Math.ceil(totalCategories / showPerPage)
    const pages = [...Array(totalPages).keys()]
    const handleChangePage = (id) => {
        setLoading(true)
        setCurrentPage(id)
    }
    
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
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                        {
                            loading ? <tr><td colSpan={4}>Loading...</td></tr> : categories.map((category, index) => <CategoryRow key={index} category={category} count={++index} />)
                        }
                        </CTableBody>
                    </CTable>
                    <div className="d-flex gap-2">
                        {
                            pages.map(page => {
                                let i = page;
                                return <button className={`btn ${page == currentPage ? 'btn-danger' : 'btn-success'} text-white`} key={page} disabled={page == currentPage} onClick={() => handleChangePage(page)}>{++i}</button>
                            })
                        }
                    </div>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Categories;