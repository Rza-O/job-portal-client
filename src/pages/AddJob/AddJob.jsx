import React from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AddJob = () => {

    const {user} = useAuth();


    const handleAddJob = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        // console.log(formData.entries());
        const initialData = Object.fromEntries(formData.entries());
        // console.log(initialData);
        const {min, max, currency, ...newJob} = initialData;
        // console.log(newJob);
        newJob.salaryRange = {min,max,currency};
        newJob.requirements = newJob.requirements.split('\n');
        newJob.responsibilities = newJob.responsibilities.split('\n');
        console.log(newJob);
        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newJob)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data);
            console.log(data);
            if (data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Job has been added",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/myPostedJobs')
            }
        })
    }


    return (
        <div>
            <h2 className='text-3xl'>Post a new job</h2>
            <form className="card-body" onSubmit={handleAddJob}>
                {/* Job title */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Title</span>
                    </label>
                    <input type="text" name='title' placeholder="job title" className="input input-bordered" required />
                </div>

                {/* Job location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Location</span>
                    </label>
                    <input type="text" name='location' placeholder="job location" className="input input-bordered" required />
                </div>
                {/* job type */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Type</span>
                    </label>
                    <select defaultValue='Pick a job type' name='jobType' className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a job type</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Intern</option>
                    </select>
                </div>
                {/* Job category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Field</span>
                    </label>
                    <select defaultValue='Pick a job field' name='categories' className="select select-ghost w-full max-w-xs">
                        <option disabled >Pick a job field</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                        <option>Administrative</option>
                    </select>
                </div>
                
                {/* salary range */}
                
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 items-end'>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Salary range</span>
                        </label>
                        <input type="text" name='min' placeholder="min" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <input type="text" name='max' placeholder="max" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <select defaultValue='Currency' name='currency' className="select select-ghost w-full max-w-xs">
                            <option disabled>Currency</option>
                            <option>BDT</option>
                            <option>USD</option>
                            <option>GBP</option>
                            <option>INR</option>
                        </select>
                    </div>
                </div>
                {/* Job Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Job Description</span>
                    </label>
                    <textarea name='description' className="textarea textarea-bordered" placeholder="job description" required></textarea>
                </div>
                {/* Company name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company name</span>
                    </label>
                    <input type="text" name='company' placeholder="Company name" className="input input-bordered" required />
                </div>
                {/* Requirements */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Requirements</span>
                    </label>
                    <textarea name='requirements' className="textarea textarea-bordered" placeholder="put each requirements in a new line" required></textarea>
                </div>
                {/* responsibilities */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Responsibilities</span>
                    </label>
                    <textarea name='responsibilities' className="textarea textarea-bordered" placeholder="put each responsibilities in a new line" required></textarea>
                </div>
                {/* HR email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Email</span>
                    </label>
                    <input defaultValue={user?.email} type="text" name='hr_email' placeholder="hr email" className="input input-bordered" required />
                </div>
                {/* Deadline */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Deadline</span>
                    </label>
                    <input  type="date" name='applicationDeadline' placeholder="deadline" className="input input-bordered" required />
                </div>
                {/* hr name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">HR Name</span>
                    </label>
                    <input type="text" name='hr_name' placeholder="hr name" className="input input-bordered" required />
                </div>
                {/* company logo */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Company Logo</span>
                    </label>
                    <input type="url" name='company_logo' placeholder="logo url" className="input input-bordered" required />
                </div>
                {/* submit Button */}
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddJob;