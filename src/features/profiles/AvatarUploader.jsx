import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Typography } from '@mui/material';

import { RHFUploadFile } from '../../components/hook-form';
import { Iconify } from '../../components';

const UploadAreaStyle = styled('div')(({theme}) => ({
    width: 144,
    height: 144,
    margin: 'auto',
    display: 'flex',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '50%',
    alignItems: 'center',
    justitfyContent: 'center',
    position: 'relative',
    border: '1px dashed rgba(145, 158, 171, 0.32)'
}));

const DisplayUploadStyle = styled(Box)(({theme}) => ({
    lineHeight: 1,
    display: 'block',
    overflow: 'hidden',
    zIndex: 8,
    borderRadius: '50%',
    width: 'calc(100% - 16px)',
    height: 'calc(100% - 16px)',
    position: 'absolute',
    left: 8,
    right: 0
}));

const ImageWrapperStyle = styled('span')(({theme}) => ({
    display: 'inline-block',
    color: 'transparent',
    filter: 'blur(0)',
    transition: 'filter .3s,-webkit-filter .3s',
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    '&hover': {
        opacity: 0.5
    }
}));

const BoxImageStyle = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    width: '100%',
    height: '100%'
}));

const PlaceholderStyle = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'calc(100% - 16px)',
    height: 'calc(100% - 16px)',
    position: 'absolute',
    left: 8,
    right: 0,
    zIndex: 9,
    opacity: 0,
    transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    color: '#fff',
    backgroundColor: 'rgba(22, 28, 36, 0.64)',
    '&:hover': {
        opacity: 0.72
    }
}));

const AvatarUploader = (props) => {
    const { avatarUrl, name } = props;
    const imageRef = useRef();
    const [image, setImage] = useState(avatarUrl);
    const [selectFile, setSelectFile] = useState();

    const handleClick = async () => {
        imageRef.current?.click();
    };

    const handleSelectFile = (file) => {
        setSelectFile(file);
    };

    useEffect(() => {
        if (selectFile) {
            const objectUrl = URL.createObjectURL(selectFile);
            
            setImage(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [selectFile])
    
    return (
        <div>
            <UploadAreaStyle role='presentation' tabIndex={0}>
                <RHFUploadFile
                    name={name}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    imageRef={imageRef}
                    handleSelectFile={handleSelectFile}
                />
                <DisplayUploadStyle component={'span'}>
                    <ImageWrapperStyle>
                        {image ? 
                            (<BoxImageStyle component='img' alt='avatar' src={image} />)
                        :
                            (<AvatarStyle />) }
                    </ImageWrapperStyle>
                </DisplayUploadStyle>
                <PlaceholderStyle onClick={handleClick}>
                    <Iconify icon='ant-design:camera-outlined' width={25} height={25} />
                    <Typography variant='body1' color="white">
                        Upload Photo
                    </Typography>
                </PlaceholderStyle>
            </UploadAreaStyle>
        </div>
    );
}

export default AvatarUploader