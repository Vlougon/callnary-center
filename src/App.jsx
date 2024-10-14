import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScreeReader from './classes/ScreenReader';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import HeadFoot from './components/layout/HeadFoot';

import BeneficiaryForm from './pages/forms/BeneficiaryForm';
import MedicalDataForm from "./pages/forms/MedicalDataForm";
import ContactForm from "./pages/forms/ContactForm";
import AssistantForm from "./pages/forms/AssistantForm";
import CallForm from "./pages/forms/CallForm";
import BeneficiaryList from "./pages/lists/BeneficiaryList";
import MedicalDataList from "./pages/lists/MedicalDataList";
import ContactList from "./pages/lists/ContactList";
import AssistantList from "./pages/lists/AssistantList";
import Home from './pages/Home';
import Calendar from "./pages/Calendar";
import DocumentGenerator from "./pages/DocumentGenerator";
import NotFound from "./pages/auth/NotFound";

import Login from './pages/auth/Login';
import ErrorBoundary from './components/ErrorBoundary';
import './assets/app.css';

export default function App() {

  useEffect(() => {
    window.addEventListener('keyup', ScreeReader.speaker);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<ErrorBoundary>
          <AuthLayout />
        </ErrorBoundary>}>
          <Route element={<HeadFoot />} path='/'>
            <Route element={<Home />} path='/'></Route>
            <Route element={<BeneficiaryForm />} path='/beneficiaryform/:id?'></Route>
            <Route element={<AssistantForm />} path='/assistantform/:id?'></Route>
            <Route element={<CallForm />} path='/callform/:beneficiary_id?'></Route>
            <Route element={<MedicalDataForm />} path='/medicaldataform/:userid/:id?'></Route>
            <Route element={<ContactForm />} path='/contactform/:userid/:id?'></Route>
            <Route element={<BeneficiaryList />} path='/beneficiarylist/:kind?'></Route>
            <Route element={<MedicalDataList />} path='/medicaldatalist'></Route>
            <Route element={<AssistantList />} path='/assistantlist'></Route>
            <Route element={<ContactList />} path='/contactlist/:id?'></Route>
            <Route element={<Calendar />} path='/calendar'></Route>
            <Route element={<DocumentGenerator />} path='/documentgenerator'></Route>
            <Route element={<NotFound />} path='*'></Route>
          </Route>
        </Route>
        <Route element={<ErrorBoundary>
          <GuestLayout />
        </ErrorBoundary>}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}
