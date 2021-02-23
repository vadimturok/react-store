import React, {useContext} from 'react'
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import DeviceItem from './DeviceItem';
import {Row} from 'react-bootstrap'

export const DeviceList = observer(() => {
    const { device } = useContext(Context);
    return (
        <Row className="d-flex">
            {device.devices.map(device =>
                <DeviceItem dev={device} key={device.id}></DeviceItem>
            )}
        </Row>
    )
})
export default DeviceList
