import React, { useState } from 'react'
import { Typography, Button, Form, message, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Dropzone from 'react-dropzone'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input

const PrivateOption = [
  { value: 0, label: 'private' },
  { value: 1, label: 'public' }
]

const CategoryOption = [
  { value: 0, label: 'Film & Animation' },
  { value: 1, label: 'Autos & Vehicles' },
  { value: 2, label: 'Music' },
  { value: 3, label: 'Pets & Animals' }
]

function VideoUploadPage() {
  const [VideoTitle, setVideoTitle] = useState('')
  const [Description, setDescription] = useState('')
  const [Private, setPrivate] = useState(0)
  const [Category, setCategory] = useState('Film & Animation')

  const onTitleChange = e => {
    setVideoTitle(e.currentTarget.value)
  }

  const onDescriptionChange = e => {
    setDescription(e.currentTarget.value)
  }

  const onPrivateChange = e => {
    setPrivate(e.currentTarget.value)
  }

  const onCategoryChange = e => {
    setCategory(e.currentTarget.value)
  }

  const onDrop = files => {
    let formData = new FormData()
    const config = {
      // server에 request를 받거나 보낼 때의 오류 방지 위함
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('file', files[0])

    Axios.post('/api/video/uploadfiles', formData, config).then(response => {
      if (response.data.success) {
        console.log(response.data)
      } else {
        alert('비디오 업로드 실패')
      }
    })
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>
      <Form onSubmit>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* drop Zone */}

          <Dropzone
            accept='video/*'
            onDrop={onDrop}
            multiple={false}
            maxSize={80000000000000}
          >
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: '300px',
                  height: '240px',
                  border: '1px solid lightgray',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined type='plus' style={{ fontSize: '3rem' }} />
              </div>
            )}
          </Dropzone>

          {/* Thumbnail */}

          <div>
            <img src='' alt='' />
          </div>
        </div>

        <br />
        <br />

        <label>Title</label>
        <Input onChange={onTitleChange} value={VideoTitle} />

        <br />
        <br />

        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={Description} />

        <br />
        <br />

        <select onChange={onPrivateChange}>
          {PrivateOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select onChange={onCategoryChange}>
          {CategoryOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <br />
        <br />

        <Button type='primary' size='large' onClick=''>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage
