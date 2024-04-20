'use client'
import React from 'react'
import { useDropzone } from 'react-dropzone'

export const FileUpload = () => {
    // Use the useDropzone hook and destructure getRootProps
    const { getRootProps, getInputProps } = useDropzone({
        accept: ["application/pdf"], // Correctly providing an array of strings
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles);
        },
    });

    return (
        <div className='p-2 bg-white rounded-xl'>
            {/* Use getRootProps on the div and getInputProps on the input */}
            <div {...getRootProps({
                className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
            })}>
                <input {...getInputProps()} />
            </div>
        </div>
    )
};

export default FileUpload;
