import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react"

export default function CategoryRow({category, count}){
    const {name} = category
    return (
        <>
            <CTableRow>
                <CTableHeaderCell scope="row">{count}</CTableHeaderCell>
                <CTableDataCell>{name}</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
            </CTableRow>
        </>
    )
}