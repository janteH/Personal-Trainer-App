import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import { TCustomerData, TCustomer } from "./CustomerList";

ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export type TTraining = {
    date: string;
    duration: number;
    activity: string;
    customer: {
        firstname: string;
        lastname: string;
    }
};

type Props = {
    customer: TCustomer;
};

function TrainingList({ customer }: Props) {
    const [trainings, setTrainings] = useState<TTraining[]>([]);

    const [columnDefs] = useState<ColDef<TTraining>[]>([
        {
            field: "date",
            headerName: "Date",
            sortable: true,
            filter: true,
            valueFormatter: (params) =>
                new Date(params.value).toLocaleString(),
        },
        {
            field: "duration",
            headerName: "Duration (min)",
            sortable: true,
            filter: true
        },
        {
            field: "activity",
            headerName: "Activity",
            sortable: true,
            filter: true
        },
        {
            field: "customer",
            headerName: "Customer",
            valueGetter: (params: ICellRendererParams) =>
                params.data.customer
                    ? `${params.data.customer.firstname} ${params.data.customer.lastname}`
                    : "Unknown",
            sortable: true,
            filter: true
        }
    ]);

    const fetchTrainings = () => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.error(error));
    };

    useEffect(fetchTrainings, []);


    return (
        <div style={{ height: 500, width: "90vw" }}>
            <AgGridReact<TTraining>
                rowData={trainings}
                columnDefs={columnDefs}
            />
        </div>
    );
}

export default TrainingList;
