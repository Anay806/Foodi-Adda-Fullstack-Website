import { Label } from './ui/label';
import React from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { X } from 'lucide-react';

const ImageUpload = ({ productData, setProductData }) => {
  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...(prev?.productImg || []), ...files]
      }))
    }
  }

  const removeImage = (index) => {
    setProductData((prev) => {
      const updateImages = (prev?.productImg || []).filter((_, i) => i !== index);
      return { ...prev, productImg: updateImages }
    })
  }
  return <div className='grid gap-2'>
    <Label>Product Image</Label>
    <Input type='file' id='file-upload' className="hidden" accept="image/*" multiple onChange={handleFiles}></Input>
    <Button variant='outline'>
      <label htmlFor="file-upload" className='cursor-pointer'>Upload-Images</label>
    </Button>

    {/* image-preview */}
    {
      productData?.productImg && productData.productImg.length > 0 && (
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3'>
          {
            productData.productImg.map((file, idx) => {
              //check if file is alredy a file(from input) or a DB object string
              let preview
              if (file instanceof File) {
                preview = URL.createObjectURL(file)
              } else if (typeof file === 'string') {
                preview = file
              } else if (file?.url) {
                preview = file.url
              } else {
                return null
              }
              return (
                <Card key={idx}>
                  <CardContent>
                    <img src={preview} alt="" width={100} height={100} className='w-full h-32 object-cover rounded-md' />

                    {/* remove-button */}
                    <button onClick={() => removeImage(idx)} className='absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition'>
                      <X size={14} />
                    </button>
                  </CardContent>
                </Card>
              )
            })
          }
        </div>
      )
    }
  </div>
}

export default ImageUpload;