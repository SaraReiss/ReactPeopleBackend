import React from 'react';

export default function PersonRow({ person, onEditClick, onDeleteClick,isChecked,onCheckBoxChange }) {
   
    const { firstName, lastName, age } = person;
    return (
        <tr>
            <td>
                <div className="d-flex justify-content-center align-items-center">
                    <input className="form-check-input mt-2"
                        style={{ transform: "scale(1.5)" }}
                        type="checkbox"
                       onChange={onCheckBoxChange}
                       checked={isChecked}
                    />
                </div>
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td><button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" onClick={onDeleteClick} style={{ marginLeft: "10px" }}>Delete</button>
            </td>
        </tr>
    )
}

