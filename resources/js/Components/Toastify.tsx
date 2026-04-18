// import { PageProps } from '@/types';
// import { usePage } from '@inertiajs/react';
// import React, { useEffect } from 'react'
// import toast, { Toaster, ToastOptions } from 'react-hot-toast';

// export default function Toastify() {

//     const { props } = usePage<PageProps>();
//     console.log(props.message);
//     useEffect(() => {
//         if (!props.message?.body) return;

//         const options: ToastOptions = {
//             position: "top-right",
//             duration: 3000,
//         };

//         if (props.message.type === "success") {
//             toast.success(props.message.body, options);
//         } else {
//             toast.error(props.message.body, options);
//         }
//     }, [props.message]);

//     return null;
// }
