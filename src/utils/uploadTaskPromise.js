import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../services/firebase';

export const uploadTaskPromise = (filePath, file) => {
    return new Promise(function(resolve, reject) {
        const storeageRef = ref(storage, `${filePath}`);
        const uploadTask = uploadBytesResumable(storeageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }, 
            (error) => {
                console.log(error);
                reject();
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    })
}
