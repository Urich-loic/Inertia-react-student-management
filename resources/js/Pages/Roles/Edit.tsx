import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Select from 'react-select/base';



export default function Edit({auth, role, permissions }:{role:any, permissions:{data:{id:number,title:string}}[]}) {
    
const selectedPermissions: { value: number; label: string }[] = role.data.permissions.map((permission: { data: { id: any; title: any } }   )=>{
    return{ 
        value: permission.id, 
        label: permission.title };
})

const options: { value: number; label: string }[] = permissions.data.map((permission:{id:number,title:string})=>{
    return{ value: permission.id, label: permission.title };
});


const { data, setData, put, processing, errors, clearErrors } = useForm({
  title: role.data.title,
  selectedPermission: selectedPermissions || [],
})


function submit(e) {
  e.preventDefault()
  put(route('roles.update', {
    id: role.data.id
  }),{
    onSuccess:()=>{
        toast.success('Role updated successfully!',
            {
                duration: 4000,
                position: 'top-right',
            }
        );
    },
    onError:()=>{
        toast.error('Failed to update role. Please check the form for errors.',
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



  return (
           <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Update Role
                </h2>
            }
        >
            <Head title="Roles archive" />
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                    <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-12">
                        <form onSubmit={(e)=>submit(e)}>
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
                                    <div>
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                                            Update role
                                        </h3>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Use this form to Update
                                            role.
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
                                            onChange={e=>setData('title',e.target.value)}
                                                value={data.title}
                                                type="text"
                                                id="name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300"    
                                            />
                                            {errors.title && <div className='text-red-500'>{errors.title}</div>}
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label
                                                htmlFor="permissions"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                Permissions
                                            </label>
                                        <Select 
                                        defaultValue={selectedPermissions}
                                        value={selectedPermissions}
                                        onChange={(selectedPermission)=>setData('selectedPermission', selectedPermission)}                                        options={options} 
                                        isMulti/>
                                            {errors.title && <div className='text-red-500'>{errors.title}</div>}
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <Link
                                        href={route('roles.index')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
                                    >
                                        Cancel
                                    </Link>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Update
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
