
// import React, { useRef, useState } from 'react';
// import { Toast } from 'primereact/toast';
// import { FileUpload } from 'primereact/fileupload';
// import { ProgressBar } from 'primereact/progressbar';
// import { Button } from 'primereact/button';
// import { Tooltip } from 'primereact/tooltip';
// import { Tag } from 'primereact/tag';
// import "primereact/resources/themes/lara-light-cyan/theme.css";
// import '../index.css'

// import 'primeicons/primeicons.css';


// export default function TemplateDemo() {
//     const toast = useRef(null);
//     const [totalSize, setTotalSize] = useState(0);
//     const fileUploadRef = useRef(null);
    
//     const onTemplateSelect = (e) => {
//         let _totalSize = totalSize;
//         let files = e.files;

//         Object.keys(files).forEach((key) => {
//             _totalSize += files[key].size || 0;
//         });

//         setTotalSize(_totalSize);
//     };

//     const onTemplateUpload = (e) => {
//         let _totalSize = 0;

//         e.files.forEach((file) => {
//             _totalSize += file.size || 0;
//         });

//         setTotalSize(_totalSize);
//         toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
//     };

//     const onTemplateRemove = (file, callback) => {
//         setTotalSize(totalSize - file.size);
//         callback();
//     };

//     const onTemplateClear = () => {
//         setTotalSize(0);
//     };

//     const headerTemplate = (options) => {
//         const { className, chooseButton, uploadButton, cancelButton } = options;
//         const value = totalSize / 100000;
//         const formatedValue = fileUploadRef && fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

//         return (
//             <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
//                 {chooseButton}
//                 {uploadButton}
//                 {cancelButton}
//                 <div className="flex align-items-center gap-3 ml-auto">
//                     <span>{formatedValue} / 10 MB</span>
//                     <ProgressBar value={value} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
//                 </div>
//             </div>
//         );
//     };

//     const itemTemplate = (file, props) => {
//         return (
//             <div className="flex align-items-center flex-wrap">
//                 <div className="flex align-items-center" style={{ width: '40%' }}>
//                     <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
//                     <span className="flex flex-column text-left ml-3">
//                         {file.name}
//                         <small>{new Date().toLocaleDateString()}</small>
//                     </span>
//                 </div>
//                 <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
//                 <Button type="button" icon="pi pi-times" className="p-button-outlined p-button-rounded p-button-danger ml-auto" onClick={() => onTemplateRemove(file, props.onRemove)} />
//             </div>
//         );
//     };

//     const emptyTemplate = () => {
//         return (
//             <div className="flex align-items-center flex-column">
//                 <i className="pi pi-image mt-3 p-5" style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
//                 <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
//                     Drag and Drop Image Here
//                 </span>
//             </div>
//         );
//     };

//     const chooseOptions = { icon: 'pi-image', iconOnly: true, className: 'custom-choose-btn p-button-rounded p-button-outlined' };
//     const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined' };
//     const cancelOptions = { icon: 'pi pi-times', iconOnly: true, className: 'custom-cancel-btn p-button-danger p-button-rounded p-button-outlined' };

//     return (
        
//         <div>
//             <Toast ref={toast}></Toast>

//             <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
//             <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
//             <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

            


//             <FileUpload ref={fileUploadRef} name="demo[]" url="/api/upload" multiple accept="image/*" maxFileSize={10000000}
//                 onUpload={onTemplateUpload} onSelect={onTemplateSelect} onError={onTemplateClear} onClear={onTemplateClear}
//                 headerTemplate={headerTemplate} itemTemplate={itemTemplate} emptyTemplate={emptyTemplate}
//                 chooseOptions={chooseOptions} uploadOptions={uploadOptions} cancelOptions={cancelOptions} />
//         </div>
       
    
//     )
// }
        






















import React, { useRef, useState } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './DPrime.css'

export default function FileUploadDemo() {
    const toast = useRef(null);
    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);

    const onBasicUpload = () => {
        toast.current.show({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'File(s) Uploaded', 
            life: 3000 
        });
    };

    const onTemplateSelect = (e) => {
        let _totalSize = 0;
        e.files.forEach(file => {
            _totalSize += file.size || 0;
        });
        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        toast.current.show({ 
            severity: 'success', 
            summary: 'Success', 
            detail: 'File(s) Uploaded', 
            life: 3000 
        });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };

    const customUploadHandler = async (event) => {
        const file = event.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const base64 = e.target.result;
            console.log('Base64 file:', base64.substring(0, 100) + '...');
            
            setTimeout(() => {
                toast.current.show({ 
                    severity: 'success', 
                    summary: 'Custom Upload', 
                    detail: 'File converted to base64', 
                    life: 3000 
                });
                if (fileUploadRef.current) {
                    fileUploadRef.current.clear();
                }
            }, 1000);
        };
        
        reader.readAsDataURL(file);
    };

    const headerTemplate = (options) => {
        const { className, chooseButton, uploadButton, cancelButton } = options;
        const formattedValue = fileUploadRef.current ? fileUploadRef.current.formatSize(totalSize) : '0 B';

        return (
            <div className={className} style={{ backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
                {chooseButton}
                {uploadButton}
                {cancelButton}
                <div className="flex align-items-center gap-3 ml-auto">
                    <span>{formattedValue} / 1 MB</span>
                    <ProgressBar value={(totalSize / 1000000) * 100} showValue={false} style={{ width: '10rem', height: '12px' }}></ProgressBar>
                </div>
            </div>
        );
    };

    const itemTemplate = (file, props) => {
        return (
            <div className="flex align-items-center flex-wrap" style={{ width: '100%', padding: '1rem' }}>
                <div className="flex align-items-center" style={{ width: '60%' }}>
                    {file.type.startsWith('image/') ? (
                        <img alt={file.name} role="presentation" src={file.objectURL} width={100} />
                    ) : (
                        <i className="pi pi-file" style={{ fontSize: '2em' }}></i>
                    )}
                    <span className="flex flex-column text-left ml-3">
                        {file.name}
                        <small>{new Date().toLocaleDateString()}</small>
                    </span>
                </div>
                <Tag value={props.formatSize} severity="warning" className="px-3 py-2" />
                <Button 
                    type="button" 
                    icon="pi pi-times" 
                    className="p-button-outlined p-button-rounded p-button-danger ml-auto" 
                    onClick={() => onTemplateRemove(file, props.onRemove)} 
                />
            </div>
        );
    };

    const emptyTemplate = () => {
        return (
            <div className="flex align-items-center flex-column">
                <i className="pi pi-cloud-upload mt-3 p-5" 
                   style={{ fontSize: '5em', borderRadius: '50%', backgroundColor: 'var(--surface-b)', color: 'var(--surface-d)' }}></i>
                <span style={{ fontSize: '1.2em', color: 'var(--text-color-secondary)' }} className="my-5">
                    Drag and drop files here
                </span>
            </div>
        );
    };

    // Button options with icons
    const chooseOptions = {
        icon: 'pi pi-fw pi-images',
        iconOnly: true,
       
    };

    const uploadOptions = {
        icon: 'pi pi-fw pi-cloud-upload',
        iconOnly: true,
        
    };

    const cancelOptions = {
        icon: 'pi pi-fw pi-times',
        iconOnly: true,
       
    };

    return (
        <div className="grid p-fluid">
            <Toast ref={toast}></Toast>

            <div className="col-12">
                <div className="card">
                    
                
                    <h5>Advanced Upload</h5>
                    <FileUpload 
                        ref={fileUploadRef}
                        name="demo[]" 
                        url="/api/upload" 
                        multiple 
                        accept="image/*" 
                        maxFileSize={1000000}
                        onUpload={onTemplateUpload} 
                        onSelect={onTemplateSelect}
                        onError={onTemplateClear} 
                        onClear={onTemplateClear}
                        headerTemplate={headerTemplate}
                        itemTemplate={itemTemplate}
                        emptyTemplate={emptyTemplate}
                        chooseOptions={chooseOptions}
                        uploadOptions={uploadOptions}
                        cancelOptions={cancelOptions}
                        className="mb-3"
                    />

                    
                </div>
            </div>
        </div>
    );
}