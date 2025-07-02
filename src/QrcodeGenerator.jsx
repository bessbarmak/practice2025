
import { useState } from 'react';
import {QRCodeSVG} from 'qrcode.react';
export const QrcodeGenerator = () =>{
   const [value, setValue] = useState('')
    const [result, setResult] = useState('')


    const changeHandler = (event) =>{
        setResult('')
        setValue(event.target.value)
    }


    const clickHandler = () =>{
        setResult(value)
        setValue('')
    }
    return(
        <div>
            {result !== '' ? <QRCodeSVG value={result} /> : null}
            <input type="text"  placeholder = "Введите текст.."value={value} onChange={changeHandler} />
            <button onClick={clickHandler}>Сгенерировать</button>
        </div>
        
    )
}