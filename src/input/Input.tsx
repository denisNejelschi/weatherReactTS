import React, { ChangeEvent } from "react";
import style from "./input.module.css";



interface IInputProps{
    name: string,
    type?: string,
    placeholder: string,
    label?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    value?: string,
    error?: string
    
}
  


function Input({name, type, placeholder, label}: IInputProps){
    return(
        <div className="inputContainer">
            <label className={style.inputLabel}>{label}</label>
            <input name={name} type={type} placeholder={placeholder} 
            className="input-field" />
        
        </div>
    );
};
export default Input;