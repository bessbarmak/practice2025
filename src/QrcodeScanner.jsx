import { Scanner } from '@yudiel/react-qr-scanner';
export const QrcodeScanner = () =>{
    const scannerHandler = (result) =>{
        console.log(result)
    }
    return(
        <Scanner onScan={(result) => console.log(result)}/>
    )
}