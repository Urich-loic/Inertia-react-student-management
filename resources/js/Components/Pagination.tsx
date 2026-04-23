import { Link } from '@inertiajs/react';
import React from 'react'

export default function Pagination({ pagination, updatedPageNumber }: { pagination: unknown, updatedPageNumber: (link: unknown) => void }) {


  return (
    <div className="max-w-7xl mx-auto py-6">
            <div className="max-w-none mx-auto">
                <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden" />
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing
                                    <span className="font-medium mx-1">{pagination.from}</span>
                                    to
                                    <span className="font-medium mx-1">{pagination.to}</span>
                                    of
                                    <span className="font-medium mx-1">
                                        {pagination.total}
                                    </span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav
                                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                    aria-label="Pagination"
                                >
                                    {pagination.links.map((paginat)=>{
                                        return(<Link
                                        only={['students']}
                                        preserveScroll
                                            key={paginat.label}
                                            href={paginat.url||'#'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updatedPageNumber(paginat);
                                            }}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                            paginat.active //if link is active
                                                ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                                        } `}
                                    >
                                        <span dangerouslySetInnerHTML={{ __html: paginat.label }} />
                                    </Link>);
                                    })}
                                    
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}
