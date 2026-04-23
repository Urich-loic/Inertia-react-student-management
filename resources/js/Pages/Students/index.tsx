import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import Pagination from '@/Components/Pagination';
import { PageProps } from '@/types';
import toast from 'react-hot-toast';
import { useEffect, useMemo, useRef, useState } from 'react';


export default function Index({ students, classes }: { students: any; classes: any }) {
function deleteStudent(id: number) {
    if(confirm('Are you sure you want to delete this student?')) {
        router.delete(route('students.destroy', {
            student: id
        }), {
            onSuccess:()=>{
                toast.success('Student deleted successfully!',
                    {
                        position: "top-right",
                        duration: 5000,
                    });
            }
        });
    }
}

    const {props} = usePage<PageProps>();

    const [searchTerm, setSearchTerm] = useState(props.search || '');
    const [pageNumber, setPageNumber] = useState('');
    const [selectedClass, setSelectedClass] = useState(props.class_id || '');
    const initialRender = useRef(true);

    function updatedPageNumber(paginate:number){
        setPageNumber(paginate.url.split('=')[1]);
    }

    const studentUrl = useMemo(() => {
        const url = new URL(route('students.index'))

        if(pageNumber) {
            url.searchParams.append('page', pageNumber)
        }

        if(selectedClass){
            url.searchParams.append('class_id', selectedClass)
        }

        if(searchTerm) {
            url.searchParams.append('search', searchTerm)
        }

        return url.href;
    },[searchTerm, pageNumber, selectedClass])


    useEffect(()=>{
        if(initialRender.current) {
            initialRender.current = false;
            return;
        }

        router.visit(studentUrl,{
            preserveScroll:true,
            preserveState:true,
        })
    },[studentUrl])
   

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Students archive
                </h2>
            }
        >
            <Head title="Students archive" />

            <div className="bg-gray-100 py-10">
                <div className="mx-auto max-w-7xl">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="sm:flex sm:items-center">
                            <div className="sm:flex-auto">
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Students
                                </h1>
                                <p className="mt-2 text-sm text-gray-700">
                                    A list of all the Students.
                                </p>
                            </div>

                            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                <Link
                                    href={route('students.create')}
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Add Student
                                </Link>
                            </div>
                        </div>

                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="flex space-x-2 w-50 py-2 align-middle md:px-6 lg:px-8">
                                    <search />
                                     <input 
                                     onChange={e=>setSearchTerm(e.target.value)}
                                     type="text" 
                                     value={searchTerm}
                                     className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-red-900"  />
                                     <select
                                     onChange={e=>setSelectedClass(e.target.value)}
                                        value={selectedClass}
                                        id="class_id"
                                        className={`mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                                            >
                                            {classes.data.map((item: { id: string; name: string })=>{
                                                    return(<option key={item.id} value={item.id}>
                                                    {item.name}
                                                </option> );
                                                })}
                                              
                                            </select>
                                    </div>
                                   
                                </div>
                        </div>
                              

                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg relative">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        ID
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Name
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Class
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Section
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Created At
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                                    />
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 bg-white">
                                               {students.data.map((student)=>{
                                                return (
                                                     <tr key={student.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {student.id}
                                                    </td>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {student.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {student.email}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {student.class ? student.class.name : 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {(student.section) ? student.section.name : 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {student.created_at}
                                                    </td>

                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <Link
                                                            href={route('students.edit', student.id)}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button onClick={()=>deleteStudent(student.id)} className="ml-2 text-indigo-600 hover:text-indigo-900">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                )
                                               })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div><Pagination updatedPageNumber={updatedPageNumber} pagination={students.meta} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
