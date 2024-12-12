import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplicants = () => {
    const applications = useLoaderData();

    const handleStatusUpdate = (e, id) => {
        console.log(e.target.value, id);

        const data = {
            status: e.target.value
        }

        fetch(`http://localhost:3000/applications/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data);
        })
    }

    return (
        <div>
            <h2 className="text-3xl">Applicants for this job: {applications.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            applications.map((application, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{application.applicant_email}</td>
                                <td>Quality Control Specialist</td>
                                <td>
                                    <select
                                        onChange={(e) => handleStatusUpdate(e, application._id)}
                                        defaultValue={application.status || 'Change Status'}
                                        className="select select-bordered select-sm w-full max-w-xs">
                                        <option disabled >Change Status</option>
                                        <option>Under Review</option>
                                        <option>Set Interview</option>
                                        <option>Hired</option>
                                        <option>Rejected</option>
                                    </select>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewApplicants;