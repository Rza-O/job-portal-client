import Lottie from 'lottie-react';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apply from '../../assets/Lottie/apply2.json';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2'

const JobApply = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {user} = useAuth();
    console.log(user);
    const submitJobApplication = (e) => {
        e.preventDefault();
        const form = e.target;
        const linkedin = form.linkedin.value;
        const github = form.github.value;
        const resume = form.resume.value;

        // console.log(linkedin, github, resume);

        const jobApplication = {
            job_id: id,
            applicant_email: user.email,
            linkedin,
            github,
            resume
        }

        fetch('http://localhost:3000/applications', {
            method: 'POST',
            headers: {
                "content-type" : 'application/json'
            },
            body: JSON.stringify(jobApplication)
        })
        .then(res=> res.json())
        .then(data=> {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/myApplications')
            }
        })
        .catch(err=> console.log(err))
    }

    return (
        <div className="hero bg-base-200 my-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <Lottie animationData={apply}></Lottie>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className='text-5xl font-bold text-center'>Apply Job And Good Luck</h1>
                    <form onSubmit={submitJobApplication} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Linked In URL</span>
                            </label>
                            <input name='linkedin' type="url" placeholder="linkedIn url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Github URL</span>
                            </label>
                            <input name='github' type="url" placeholder="github url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Resume URL</span>
                            </label>
                            <input type="url" name='resume' placeholder="resume url" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Apply</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JobApply;