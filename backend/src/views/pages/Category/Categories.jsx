/* eslint-disable no-unused-vars */
import React from 'react';
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
const Categories = () => {
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
                        <CTableRow>
                            <CTableHeaderCell scope="row">1</CTableHeaderCell>
                            <CTableDataCell>Mark</CTableDataCell>
                            <CTableDataCell>Otto</CTableDataCell>
                            <CTableDataCell>@mdo</CTableDataCell>
                        </CTableRow>
                        </CTableBody>
                    </CTable>
                </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Categories;