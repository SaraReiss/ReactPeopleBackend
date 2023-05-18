import React from "react";
import PersonRow from "./PersonRow";
import axios from "axios";
import AddEditPersonForm from './AddEditPersonForm';


class PeopleTable extends React.Component {
    state = {
        people: [],
        person: {

            firstName: '',
            lastName: '',
            age: ''
        },
        checkedPeople: [],
        isLoading: true,
        isAdding: false,
        isEditMode:false,
        //currentId:0
       

    }

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
    }
    componentDidMount = () => {
        this.getAllPeople();
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onAddClick = () => {
        this.setState({ isLoading: true, isAdding: true });
        axios.post('/api/people/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                isAdding: false,
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }
    onCheckBoxChange = (id) => {
        const { checkedPeople } = this.state

        if (checkedPeople.includes(id)) {
            this.setState({ checkedPeople: checkedPeople.filter(p => p !== id) })
        } else {
            this.setState({ checkedPeople: [...checkedPeople, id] })
        }
    }
    generateTable = () => {
        const { isLoading, people,checkedPeople } = this.state;
        if (isLoading) {
            return <h1>Loading...</h1>

        }

        return people.map(p => <PersonRow
            onEditClick={() => this.onEditClick(p)}
            onDeleteClick={() => this.onDeleteClick(p)}
            onCheckBoxChange={() => this.onCheckBoxChange(p.id)}
            isChecked={checkedPeople.includes(p.id)}
            key={p.id}
            person={p}
             />)
    }
    onEditClick = (p) => {
      console.log("edit");
      
        this.setState({
            currentId: p.id,
            isEditMode: true ,
            person: {
                firstName: p.firstName,
                lastName: p.lastName,
                age: p.age
                
            },
             
            
        });




    }
    onUpdateClick = () => {
        console.log("update")
      
         this.setState({ isLoading: true });
        
        
        axios.post('/api/people/update', { ...this.state.person, id: this.state.currentId } ).then(() => {
            this.getAllPeople();
            this.setState({
                
                person: {
                    firstName: '',
                    lastName: '',
                    age: '',
                    
                } ,
                isEditMode: false
                
            });
           
        })
        
    }
    onCancelClick = () => {
        console.log("cancel");
        
        this.setState({
            person: {
                firstName: '',
                lastName: '',
                age: ''
            },
           currentId:0,
            isEditMode: false
        });
        
    }
    onDeleteClick = (person) => {
    
        this.setState({ isLoading: true });
        axios.post('/api/people/delete', person).then(() => {
            this.getAllPeople();
        });

    }
    onDeleteSelectedClick = () => {
        this.setState({ isLoading: true });
        const {checkedPeople} = this.state;
        axios.post('/api/people/deleteMany',{ ids:this.state.checkedPeople } ).then(() => {
            this.getAllPeople();
        });

    }
    checkAll = () => {
        this.setState({ checkedPeople: [...this.state.people.map(p=>p.id)] })
    }
    unCheckAll =() => {
        this.setState({checkedPeople:[]})
    }

    render() {
        const { isAdding ,isEditMode} = this.state;
        const { firstName, lastName, age } = this.state.person;
        return <>
            <div className='container mt-5'>
                <div className='row'>
                    <AddEditPersonForm
                        firstName={firstName}
                        lastName={lastName}
                        age={age}
                        onTextChange={this.onTextChange}
                        onAddClick={this.onAddClick}
                        isEditMode={isEditMode}
                        isAdding={isAdding}
                        onUpdateClick={this.onUpdateClick}
                        onCancelClick={this.onCancelClick}

                    />
                </div>


                <table className='table table-hover table-striped table-bordered mt-3'>
                    <thead>
                        <tr>
                            <th style={{ width: "15%" }}>
                                <button className="btn btn-danger w-100"onClick={this.onDeleteSelectedClick}>Delete All</button>
                                <button className="btn btn-outline-danger w-100 mt-2" onClick={this.checkAll}>Check All</button>
                                <button className="btn btn-outline-danger w-100 mt-2"onClick={this.unCheckAll}>Uncheck All</button>
                            </th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.generateTable()}
                    </tbody>

                </table>


            </div>

        </>
    }

}

export default PeopleTable;