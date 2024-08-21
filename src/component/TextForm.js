import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function TextForm(props) {
    const Clicked = () => {
        let result = text.toUpperCase();
        setText(result);
        props.showAlert("Converted To Uppercase", "Success");

    };

    const Clicker = () => {
        let result = text.toLowerCase();
        setText(result);
        props.showAlert("Converted To Lowercase", "Success");
    };

    const Cleared = () => {
        setText('');
        props.showAlert("Text Cleared", "Success");
    };

    const Changed = (event) => {
        setText(event.target.value);
    };

    const handleCopy = async () => {
        try {
            const text = document.getElementById("myBox");
            if (text && text.value) {
                await navigator.clipboard.writeText(text.value);
                props.showAlert("Your Text Has Been Copied", "Success");
            } else {
                props.showAlert("Text to copy is not available", "Error");
            }
        } catch (err) {
            props.showAlert("Failed to copy text", "Error");
        }
    }

    const handleExtraSpaces = () => {
        let newText = text.replace(/\s+/g, ' ').trim();
        setText(newText);
        props.showAlert("Extra Spaces Has Been Removed", "Success");
    };

    const [text, setText] = useState('Your text here');

    const textAreaStyle = {
        backgroundColor: props.mode === 'dark' ? '#239ED0' : '#ffffff',
        color: props.mode === 'dark' ? '#ffffff' : '#000000',
    };

    const textColor = props.mode === 'dark' ? 'light' : 'dark';

    return (
        <>
            <div className="container">
                <h2 style={{ textAlign: 'center' }} className={`text-${textColor}`}>{props.heading}</h2>
                <div className="my-4">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={Changed}
                        id="myBox"
                        rows="7"
                        style={textAreaStyle}
                    ></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-5 my-2" onClick={Clicked}>Convert To UpperCase</button>
                <button disabled={text.length===0} className="btn btn-outline-success mx-4 my-2"  onClick={Clicker}>Convert To LowerCase</button>
                <button disabled={text.length===0} className="btn btn-info mx-5 my-2"  onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length===0} className="btn btn-warning mx-4 my-2"  onClick={handleCopy}>Copy</button>
                <button disabled={text.length===0} className="btn btn-danger mx-5 my-2" onClick={Cleared}>Clear Text</button>

            </div>
            <div className={`container my-5 text-${textColor}`}>
                <h3>Your Text Summary</h3>
                <p my-4="true">
                    Total {text.split(/\s+/).filter((element) => element.length !== 0).length} words & {text.replace(/\s/g, "").length} characters<br></br>( {(0.008 * text.split(/\s+/).filter(word => word !== "").length).toFixed(2)} Min. ReadTime  )
                </p>
            </div>
        </>
    );
}

TextForm.propTypes = {
    heading: PropTypes.string.isRequired,
    mode: PropTypes.string.isRequired,
};
