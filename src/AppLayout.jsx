import { QrcodeGenerator } from "./QrcodeGenerator";
import { QrcodeScanner } from "./QrcodeScanner";
import { RegistrationWindow } from "./components/registration/user/RegistrationWindow";
import  LoginWindow  from "./components/registration/user/LoginWindow";
import  {FamilyLoginWindow}  from "./components/registration/family/FamilyLoginWindow";
import { FamilyRegistrationWindow } from "./components/registration/family/FamilyRegistrationWindow";
import HomePage from "./components/main/HomePage";
import BackgroundLayers from "./components/main/BackgroundLayers";
import { Routes, Route } from 'react-router-dom'
import InviteFamilyWindow from "./components/main/InviteFamilyWindow";
import FamilyGate from "./components/main/FamilyGate";


const AppLayout = () =>{
    return (
        <div>
            {/* <QrcodeScanner/> */}
            {/* <QrcodeGenerator/> */}
             {/* <RegistrationWindow/>   */}
             {/* <LoginWindow/>   */}
             {/* <FamilyLoginWindow/> */}
             {/* <FamilyRegistrationWindow/>  */}
             
             
            <BackgroundLayers/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginWindow />} />
                <Route path="/register" element={<RegistrationWindow />} />
                {/* <Route path="/join-family" element={<FamilyLoginWindow />} /> */}
                <Route path="/join-family" element={<FamilyRegistrationWindow />} />
                 <Route path="/invite" element={<InviteFamilyWindow />} /> 


                
            </Routes> 
            
             
        </div>
    );
};

export {AppLayout}