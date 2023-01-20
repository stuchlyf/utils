"use client";
import React, {ChangeEventHandler, useCallback, useState} from 'react';
import {Textarea} from "@/components/textarea/textarea";

export default () => {
  const [encodedText, setEncodedText] = useState('');
  const [decodedText, setDecodedText] = useState('');
  const [error, setError] = useState<string>();

  const handleEncodedTextareaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setEncodedText(e.target.value)
    try {
      setDecodedText(atob(e.target.value))
      setError(undefined)
    } catch (e) {
      setError('The string to be decoded is not correctly encoded.')
    }
  }, [])

  const handleDecodedTextareaChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setDecodedText(e.target.value)
    setEncodedText(btoa(e.target.value))
    setError(undefined)
  }, [])

  return (
    <main className={'px-8 py-6'}>
      <div className={'grid grid-rows-2 gap-8 w-5/6 mx-auto'}>
        <div>
          <label className={'prose'} htmlFor={'encoded-text'}>
            <h3>Encoded Text</h3>
          </label>
          <Textarea
            placeholder={'Encoded Text'}
            className={'resize-none w-full h-40'}
            value={encodedText}
            onChange={handleEncodedTextareaChangeHandler}
            name={'encoded-text'}
            id={'encoded-text'}
          />
        </div>
        <div>
          <label className={'prose'} htmlFor={'decoded-text'}>
            <h3>Decoded Text</h3>
          </label>
          <Textarea
            placeholder={'Decoded Text'}
            className={'resize-none w-full h-40'}
            value={decodedText}
            onChange={handleDecodedTextareaChangeHandler}
            name={'decoded-text'}
            id={'decoded-text'}
          />
        </div>
      </div>
      <div className={'mt-12'}>
        {error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}