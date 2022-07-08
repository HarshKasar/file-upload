import React, { useState } from 'react'
import { Link } from '@reach/router'
import { MdArrowDownward } from 'react-icons/md'
import { useDropzone } from 'react-dropzone'
import useApp from './useApp'
import FileUploader from './FileUploader'
import FileUploaderScreen from './FileUploaderScreen'
import FileRow from './FileRow'
import SVGScaleLoop from './SVGScaleLoop'
import './styles.css'

const App = ({ children }) => {
  const inputRef = React.createRef()
  const [setfiles]=useState([])

  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    uploadError,
    status,
    onSubmit,
    onChange,
    triggerInput,
    getFileUploaderProps,
  } = useApp({ inputRef })

  const initialFileUploaderProps = getFileUploaderProps({
    triggerInput: status === 'IDLE' ? triggerInput : undefined,
    onChange: status === 'IDLE' ? onChange : undefined,
  })


  return (
    
    <form className='form' onSubmit={onSubmit}>
      <div className='uploader'>
        <FileUploader {...initialFileUploaderProps}>
          <FileUploaderScreen
            triggerInput={triggerInput}
            getFileUploaderProps={getFileUploaderProps}
            files={files}
            pending={pending}
            status={status}
            uploadError={uploadError}
          />
        </FileUploader>
      </div>
      <div className={files.length ? 'file-list' : ''}>
        {files.map(({ id, ...rest }, index) => (
          <FileRow
            key={`thumb${index}`}
            isUploaded={!!uploaded[id]}
            isUploading={next && next.id === id}
            id={id}
            {...rest}
          />
        ))}
      </div>
      {status === 'FILES_UPLOADED' && (
        <div className='next-step'>
        <div>
        </div>
         
        </div>
      )}
      {children}
    </form>
  )
}

export default App
