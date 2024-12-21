import React, { useState, useRef } from 'react';

interface Props {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    label: string;
}

const FileInput: React.FC<Props> = ({ onChange, name, label }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [filename, setFilename] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFilename(e.target.files[0].name);
        } else {
            setFilename('');
        }
        onChange(e);
    };

    const activateInput = () => {
        inputRef.current?.click();
    };

    return (
        <div className="d-flex gap-2">
            <input
                className="form-control"
                type="file"
                name={name}
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <input
                type="text"
                value={filename}
                placeholder={label}
                onClick={activateInput}
                readOnly
            />
            <button className="btn btn-primary" type="button" onClick={activateInput}>Browse</button>
        </div>
    );
};

export default FileInput;