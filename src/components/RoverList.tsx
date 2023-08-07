import React, {useEffect, useState} from 'react';
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";

interface DataType {
    key: string;
    rover: string;
    coordinates: string;
    direction: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: "Rover ID",
        dataIndex: "rover"
    },
    {
        title: "Coordinates",
        dataIndex: "coordinates"
    },
    {
        title: "Direction",
        dataIndex: "direction"
    }
]

const data: DataType[] = [
    {
        key: '1',
        rover: 'R1',
        coordinates: '1,0',
        direction: 'NORTH'
    }
]

interface RoverType {
    id: string;
    direction: string;
    coordinate: {
        x: number;
        y: number;
    }
}

const RoverList: React.FC = () => {
    const [rover, setRover] = useState<DataType|any>([{
    }])
    useEffect(() => {
        const interval = setInterval(() => {
            fetch("http://localhost:8080/rovers")
            .then(res => res.json())
            .then(data => {
                const rovers = data.map((r: RoverType )=> ({
                    key: r.id,
                    rover: r.id,
                    direction: r.direction,
                    coordinates: `(${r.coordinate.x},${r.coordinate.y})`
                }))
                setRover(rovers);
            })
            .catch(e => {});
        }, 5000);
        return () => clearInterval(interval);
    });
    return <Table columns={columns} dataSource={rover} />;
};

export default RoverList;