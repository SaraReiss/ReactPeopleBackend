import React from 'react';

export default function AddEditPersonForm({ firstName, lastName, age, onTextChange, onAddClick, isAdding ,isEditMode,onUpdateClick,onCancelClick}) {
    
        return <div className="row p-5 rounded" style={{backgroundColor: '#E9ECEF'}}>
        <div className="col-md-3">
            <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
        </div>
        <div className="col-md-3">
            <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
        </div>
        <div className="col-md-3">
            <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
        </div>
        if(!isEditMode){
            <div className="col-md-3">
            <button disabled={isAdding || isNaN(age) || age === '' || firstName===''||lastName===''} onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
        </div>}
       else{
         <div className="col-md-3">
         <button className="btn btn-warning w-100" onClick={onUpdateClick}>Update</button>
         <button className="btn btn-dark w-100 mt-2"onClick={onCancelClick}>Cancel</button>
         </div>
       }
    </div>
    // }
    
    //     return <div className="row p-5 rounded" style={{backgroundColor: '#E9ECEF'}}>
    //     <div className="col-md-3">
    //         <input value={firstName} onChange={onTextChange} name='firstName' type="text" className="form-control" placeholder="First Name" />
    //     </div>
    //     <div className="col-md-3">
    //         <input value={lastName} onChange={onTextChange} name='lastName' type="text" className="form-control" placeholder="Last Name" />
    //     </div>
    //     <div className="col-md-3">
    //         <input value={age} onChange={onTextChange} name='age' type="text" className="form-control" placeholder="Age" />
    //     </div>
    //     <div className="col-md-3">
    //     <button className="btn btn-warning w-100" onClick={onUpdateClick}>Update</button>
    //     <button className="btn btn-dark w-100 mt-2"onClick={onCancelClick}>Cancel</button>
    //     </div>
    // </div>
    
}
