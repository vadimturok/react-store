import React, {useContext} from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {Row, Card} from 'react-bootstrap'

export const BrandBar = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className="d-flex">
            {device.brands.map(brand =>
                <Card key={brand.id} className="p-3" onClick={() => device.setSelectedBrand(brand)}
                border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                style={{ cursor: "pointer" }}>
                    {brand.name}
                </Card>
            )}
        </Row>
    )
})
export default BrandBar
