import React from 'react'
import cx from 'classnames'
import FileUploader from './FileUploader'
import fileUploadBg from './images/back.png'
import Spinner from './Spinner'
import artsCrafts from './images/back.png'
import adventureBeginsBg from './images/back.png'
import errorSrc from './images/back.png'

const Init = () => (
  <div style={{ textAlign: 'center' }}>
   
  </div>
)

const Loaded = ({ total, getFileUploaderProps }) => (
  <div className='loaded'>
    <div className='loaded-actions'>
      <FileUploader {...getFileUploaderProps()}>
        <button type='button'>Upload More</button>
      </FileUploader>
        <button type='submit'>Submit</button>
    </div>
    
    
  </div>
)

const Pending = ({ files, pending }) => {
  const total = files.length
  const remaining = Math.abs(pending.length - total)
  return (
    <div className='pending'>
      <Spinner sm>
        Uploading <span className='text-attention'>{remaining}</span> of{' '}
        <span className='text-attention'>{total}</span> files
      </Spinner>
    </div>
  )
}

const Success = () => (
  <div className='success-container'>
    <div>
      <h2>Congratulations!</h2>
      <small>You uploaded your files</small>
      <br />
    </div>
  </div>
)

const Error = ({ uploadError }) => (
  <div>
    <h2 style={{ color: 'red' }}>
      An error occurred!
      <br />
      {uploadError && uploadError.message}
    </h2>
  </div>
)

const FileUploaderScreen = ({
  status,
  files,
  pending,
  uploadError,
  triggerInput,
  getFileUploaderProps,
}) => {
  let src
  switch (status) {
    case 'IDLE':
      src = fileUploadBg
      break
    case 'LOADED':
    case 'PENDING':
      src = artsCrafts
      break
    case 'FILES_UPLOADED':
      src = adventureBeginsBg
      break
    case 'UPLOAD_ERROR':
      src = errorSrc
      break
    default:
      src = fileUploadBg
      break
  }
  return (
    <div className='uploader-input'>
      {status === 'IDLE' && <Init />}
      {status === 'LOADED' && (
        <Loaded
          triggerInput={triggerInput}
          getFileUploaderProps={getFileUploaderProps}
          total={files.length}
        />
      )}
      {status === 'PENDING' && <Pending files={files} pending={pending} />}
      {status === 'FILES_UPLOADED' && <Success />}
      {status === 'UPLOAD_ERROR' && <Error uploadError={uploadError} />}
      <div
        style={{ backgroundImage: `url("${src}")` }}
        className={cx('uploader-overlay', {
          brightness50: status === 'IDLE',
          brightness100: status === 'LOADED',
          opacity05: status === 'PENDING',
          grayscale: status === 'FILES_UPLOADED',
        })}
      />
    </div>
  )
}

export default FileUploaderScreen
