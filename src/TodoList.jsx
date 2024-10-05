import { useRef, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

function TodoList() {

    const [columnDefs, setColumnDefs] = useState([
        { field: 'description', sortable: true, filter: true, floatingFilter: true, wrapText: true, autoHeight: true },
        {
            field: 'priority', filter: true, floatingFilter: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        {
            field: 'date',
            cellDataType: 'date',
            filter: true,
            floatingFilter: true
        }
    ]);
    const [todos, setTodos] = useState([]);
    const [userInput, setUserInput] = useState({ description: '', priority: '', wrapText: true, autoHeight: true });
    const [date, setDate] = useState(new Date());
    const gridRef = useRef();

    const handleChange = (event) => {
        setUserInput({ ...userInput, [event.target.name]: event.target.value });
    };

    const handleDelete = () => {
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) =>
                index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('Select a row first!');
        }
    }

    const addTodo = () => {
        if (!userInput.description) {
            alert("Missing description");
        } else {
            setTodos([...todos, { description: userInput.description, priority: userInput.priority, date: new Date(date) }]);
            setUserInput({ description: '', priority: '' });
        }
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack
                    mt={2}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    alignItems="center"
                >
                    <TextField name="description" label="Description" onChange={handleChange} value={userInput.description} />
                    <TextField name="priority" label="Priority" onChange={handleChange} value={userInput.priority} />
                    <DatePicker
                        name="date"
                        format="MM/DD/YYYY"
                        onChange={(date) => setDate(date)
                        }
                        slotProps={{
                            actionBar: {
                                actions: ['clear'],
                            },
                        }}
                    />
                    <Button name="add" variant="outlined" onClick={addTodo}>Add</Button>
                    <Button name="delete" variant="outlined" color="error" onClick={handleDelete}>Delete</Button>
                </Stack>
                <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
                    <AgGridReact
                        animateRows="true" //on by default but changing this value to false is the way to toggle it off
                        ref={gridRef}
                        onGridReady={params => gridRef.current = params.api}
                        rowData={todos}
                        columnDefs={columnDefs}
                        rowSelection="single"
                    />
                </div>
            </LocalizationProvider>
        </>
    );
}

export default TodoList;