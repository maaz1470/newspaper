import { cilEyedropper, cilPen, cilTrash, cilViewStream } from "@coreui/icons"
import CIcon from "@coreui/icons-react"
import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"
import { Link } from "react-router-dom"

export default function CategoryRow({ category, count }) {
    const { id, name, status, url } = category
    return (
        <>
            <CTableRow>
                <CTableHeaderCell scope="row">{id}</CTableHeaderCell>
                <CTableDataCell>{name}</CTableDataCell>
                <CTableDataCell>{status == 1 ? 'Published' : 'Unpublished'}</CTableDataCell>
                <CTableDataCell>
                    <Link to={`/category/${url}`} className="btn btn-success mx-2 text-white" target="_blank">View</Link>
                    <Link to={`/category/edit/${id}`} className="btn btn-info text-white mx-2"><CIcon icon={cilPen} /></Link>
                    <button to={'/'} className="btn btn-danger text-white mx-2"><CIcon icon={cilTrash} /></button>
                </CTableDataCell>
            </CTableRow>
        </>
    )
}