import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormTextarea, CRow } from "@coreui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TagsInput from "react-tagsinput";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

export default function EditCategory(){
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState({
        name: '',
        status: 1,
        meta_title: '',
        meta_description: '',
        meta_keywords: []
    })
    const {id} = useParams()
    const navigate = useNavigate()
    useState(() => {
        axios.get(`/category/edit/${id}`).then(response => {
            console.log(response.data.category)
            if(response.data.status === 200){
                let data = response.data.category
                const metaKeywords = response.data.category.seo
                delete data.seo;
                data = {
                    ...data,
                    ...metaKeywords
                }
                const convertArray = data.meta_keywords.split(',')
                const remainingData = {
                    ...data,
                    meta_keywords: convertArray
                }
                setCategory(remainingData)
            }else if(response.data.status === 404){
                Swal.fire('Error','Category Not found','error')
                navigate('/category',{
                    replace: true
                })
            }
        })
    },[])
    console.log(category)

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
                                value={category.name}
                                id="name"
                                onChange={handleChange}
                                name='name'
                                placeholder="Category Name"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel htmlFor="exampleFormControlInput1">Status</CFormLabel>
                            <select name="status" value={category.status} onChange={handleChange} className='form-control' id="">
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
    )
}