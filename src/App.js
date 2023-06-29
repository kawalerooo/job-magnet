import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { JobOffersProvider } from './components/jobOffersFiles/JobOffersContext';
import { ApplicationsProvider } from './components/applicatonFiles/ApplicationsContext';
import { ApplicationFieldsProvider } from './components/applicatonFiles/ApplicationFieldsContext';
import { QueueProvider } from './components/queueSystemFiles/QueueContext';



import SalaryCalculator from './components/salaryCalculatorFiles/SalaryCalculator';
import JobOffers from './components/jobOffersFiles/JobOffers';
import JobOffersList from './components/jobOffersFiles/JobOffersList';
import JobOfferDetails from './components/jobOffersFiles/JobOfferDetails';
import EditJobOffer from './components/jobOffersFiles/EditJobOffer';
import ApplyForm from './components/ApplyForm';
import ApplicationsList from './components/applicatonFiles/ApplicationsList';
import ApplicationConfirmation from './components/applicatonFiles/ApplicationConfirmation';
import ApplicationDetails from './components/applicatonFiles/ApplicationDetails';
import Queue from './components/queueSystemFiles/Queue';
import Sidebar from './components/pageStaticView/SideBar';
import Header from './components/pageStaticView/Header';
import Footer from './components/pageStaticView/Footer';
import CreateTicket from './components/queueSystemFiles/CreateTicket';
import QueueManagement from './components/queueSystemFiles/QueueManagement';
import RecruitmentRoom from './components/recruitmentFiles/RecruitmentRoom';
import CVCreator from './components/cvCreatorFiles/CVCreator';

const App = () => {
  const username = 'Jakub';

  return (
      <Router>
        <JobOffersProvider>
          <ApplicationsProvider>
            <ApplicationFieldsProvider>
              <QueueProvider>
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header username={username} />
                    <div style={{ display: 'flex', flexGrow: 1 }}>
                      <Sidebar />
                      <div style={{ flexGrow: 1 }}>
                        <Routes>
                          <Route path="/salaryCalculator" element={<SalaryCalculator />} />
                          <Route path="/jobOffers" element={<JobOffers />} />
                          <Route path="/jobOffersList" element={<JobOffersList />} />
                          <Route path="/jobOffers/:id" element={<JobOfferDetails />} />
                          <Route path="/editJobOffer/:id" element={<EditJobOffer />} />
                          <Route path="/applyForm/:id" element={<ApplyForm />} />
                          <Route path="/applicationsList" element={<ApplicationsList />} />
                          <Route path="/applicationConfirmation" element={<ApplicationConfirmation />} />
                          <Route path="/applicationDetails/:id" element={<ApplicationDetails />} />
                          <Route path="/createTicket" element={<CreateTicket />} />
                          <Route path="/queue" element={<Queue />} />
                          <Route path="/queueManagement" element={<QueueManagement />} />
                          <Route path="/recruitment/:id" element={<RecruitmentRoom />} />
                          <Route path="/cvCreator" element={<CVCreator />} />
                        </Routes>
                      </div>
                    </div>
                    <Footer />
                  </div>
              </QueueProvider>
            </ApplicationFieldsProvider>
          </ApplicationsProvider>
        </JobOffersProvider>
      </Router>
  );
};

export default App;