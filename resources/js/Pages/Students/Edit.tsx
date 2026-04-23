import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import axios from 'axios';



export default function Edit({auth, classes, student}:{classes:any, student:any}) {

const [sections, setSections] = useState([]);

const { data, setData, put, processing, errors, clearErrors } = useForm({
  name: student.data.name,
  email: student.data.email,
  class_id: student.data.class.id,
  section_id: student.data.section.id,
})


function submit(e) {
  e.preventDefault()
  put(route('students.update', {
    student: student.data.id
  }),{
    onSuccess:()=>{
        toast.success('Student updated successfully!',
            {
                duration: 4000,
                position: 'top-right',
            }
        );
    },
    onError:()=>{
        toast.error('Failed to update student. Please check the form for errors.',
            {
                duration: 4000,
                position: 'top-right',
            }
        );
    }
  })
}

function focusField() {
    clearErrors()
}

useEffect(()=>{
    if(data.class_id){
        axios.get(route('sections.index',{
            class_id: data.class_id
        })).then(res=>{
            console.log(res.data);
            setSections(res.data.data);
        })
    }
},[data.class_id])

const Classdatas = classes.data;

  return (
           <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Students 
                </h2>
            }
        >
            <Head title="Students archive" />
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={(e)=>submit(e)}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Update Student
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to Update
                                            student.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Name
                                            </label>
                                            <input
                                            onFocus={()=>focusField()}
                                            onChange={e=>setData('name',e.target.value)}
                                                value={data.name}
                                                type="text"
                                                id="name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"    
                                            />
                                            {errors.name && <div className='text-red-500'>{errors.name}</div>}
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Email Address
                                            </label>
                                            <input
                                             onChange={e=>setData('email',e.target.value)}
                                                value={data.email}
                                                type="email"
                                                id="email"
                                                autoComplete="email"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            />
                                            {errors.email && <div className='text-red-500'>{errors.email}</div>}

                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="className_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Class
                                            </label>
                                            <select
                                                    onChange={e=>setData('class_id',e.target.value)}
                                                    value={data.class_id}
                                                id="class_id"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            >
                                                {
                                                Classdatas.map((Classdata)=>{
                                                return(<option key={Classdata.id} value={Classdata.id}>
                                                    {Classdata.name}
                                                </option>   );        
                                                })}
                                                
                                            </select>
                                            {errors.class_id && <div className='text-red-500'>{errors.class_id}</div>}

                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="section_id"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Section
                                            </label>
                                            <select
                                                onChange={e=>setData('section_id',e.target.value)}
                                                value={data.section_id}
                                                id="section_id"
                                                className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            >
                                                {sections.map((Sectiondata)=>{
                                                    return(<option key={Sectiondata.id} value={Sectiondata.id}>
                                                    {Sectiondata.name}
                                                </option>);
                                                })}
                                                
                                            </select>
                                            {errors.section_id && <div className='text-red-500'>{errors.section_id}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <a
                                        href=""
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </a>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            </AuthenticatedLayout>
  )
}
