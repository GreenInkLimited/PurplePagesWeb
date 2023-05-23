import React, {useRef, useState} from 'react'
import Autor from '../../assets/Autor2.png'
import AppNavbar from '../AppNavBar';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'react-query';
import { writeBlog } from '../../apis/BlogApis';


const WriteBlog = () => {
    const form = useRef();
    const [file, setFile] = useState()

    function handleFile(event) {
      setFile(event.target.files[0])
      console.log(event.target.files[0])
    }

    const navigate = useNavigate();

    const { isLoading, error, isError, mutateAsync, data } = useMutation(
    'writeblog',
    writeBlog,
    {
      onSuccess: (data) => {
        if (data && data.status_lean) {
          // submit successful
          navigate('/blog');
        } 
      },
    }
  );
  return (
    <>
    <AppNavbar />
    <div className="container">
        <div className='write-blog__title'>
        <div className="write-blog__author">
            <img src={Autor} />
    <p>Charlie’s Bagel Garden</p>
    </div>
    </div>
    <div className="write-blog__container">
        
    <div className='write-blog__wrapper'>
    <Formik
              initialValues={{
                image: '',
                detail: '',
                title: '',
                tag: '',
              }}
              onSubmit={async (values) => {
                await mutateAsync({
                  image: values.image,
                  detail: values.detail,
                  title: values.title,
                  tag: values.tag,
                });
              }}
            >
        <Form>
        <Field name="title" type="text" className='write-blog__title__label' placeholder='Title...'/>
        <label>Upload your cover image (Your image should be in JPEG or PNG format)</label>
        <Field type="file" name='image' onChange={handleFile}/>
        <textarea className='textarea' name="detail" placeholder='Share your thoughts and ideas...'/>
        <label>Tags (required)</label>
        <Field className='input' type="text" name="tag" placeholder='Add up to 10 tags so people can find your post easily'/>
        <div className="write-blog__submit">
            <button className='write-blog-promote'>Promote blog</button>
            <button type='submit' className='write-blog-publish'>Publish post</button>
        </div>
        </Form>
    </Formik>
    </div>
    </div>
    </div>
    <br/><br/><br/>
    </>
  )
}

export default WriteBlog;


