import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ListGroup, Button } from "react-bootstrap";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceAPI";

export const TypeBar = observer(() => {
  const { device } = useContext(Context);

  const getAllItems = () => {
    fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
        fetchDevices(null, null, 1, 2).then(data => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
            device.setSelectedType(data)
            device.setSelectedBrand(data)
        })
  }

  return (
    
    <ListGroup>
      <Button className="mb-3" onClick={() => getAllItems()}>Показать все товары</Button>
      {device.types.map((type) => (
        <ListGroup.Item
          key={type.id}
          onClick={() => device.setSelectedType(type)}
          active={type.id === device.selectedType.id}
          style={{ cursor: "pointer" }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});
export default TypeBar;
