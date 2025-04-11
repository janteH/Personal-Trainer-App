import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import TrainingList from "./TrainingList";


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

export type TCustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
};

export type TCustomer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
};


function CustomerList() {
    const [customer, setCustomer] = useState<TCustomerData[]>([]);

    const [columnDefs] = useState<ColDef<TCustomerData>[]>([
        {   //ei toiminnallisuutta
            field: "Add Training",
            cellRenderer: (params: ICellRendererParams) => {
                return <Button>Add Training</Button>
            }
        },
        {
            field: "firstname",
            sortable: true,
            filter: true
        },
        {
            field: "lastname",
            sortable: true,
            filter: true
        },
        {
            field: "streetaddress",
            sortable: true,
            filter: true
        },
        {
            field: "postcode",
            sortable: true,
            filter: true
        },
        {
            field: "city",
            sortable: true,
            filter: true
        },
        {
            field: "email",
            sortable: true,
            filter: true
        },
        {
            field: "phone",
            sortable: true,
            filter: true
        },
        {
            field: "Edit",
            cellRenderer: (params: ICellRendererParams<TCustomerData>) =>
                <EditCustomer
                    currentCustomer={params.data as TCustomerData}
                    updateCustomer={updateCustomer}
                />
        },
        {
            field: "Delete",
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => handleDelete(params.value)} color="error">Delete</Button>
            }
        }
    ]);

    const fetchCustomers = () => {
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomer(data._embedded.customers))
            .catch(error => console.error(error));
    }

    // Delete Customer Start
    const handleDelete = (url: string) => {
        if (window.confirm("Do you want to delete customer?")) {
            deleteCustomer(url);
        }
    }

    const deleteCustomer = (url: string) => {
        const options = {
            method: "DELETE"
        };

        fetch(url, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error));
    }
    // Delete Customer End
    // Add Customer Start
    const addCustomer = (customer: TCustomer) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };

        fetch(`${BASE_URL}/customers`, options)
            .then(() => fetchCustomers())
            .catch(error => console.error(error))
    }
    // Add Customer End
    // Edit Customer start
    const updateCustomer = (customer: TCustomer, url: string) => {
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };

        fetch(url, options)
            .then(() => fetchCustomers())
            .catch(error => console.error(error))
    }
    // Edit Customer End    


    useEffect(fetchCustomers, []);

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div style={{ height: 1000 }}>
                <AgGridReact<TCustomerData>
                    rowData={customer}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    )
}


export default CustomerList;