import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JobOffers from './components/jobOffersFiles/JobOffers';
import JobOffersList from './components/jobOffersFiles/JobOffersList';
import JobOfferDetails from './components/jobOffersFiles/JobOfferDetails';
import EditJobOffer from './components/jobOffersFiles/EditJobOffer';
import ApplyForm from './components/ApplyForm';
import ApplicationsList from './components/applicatonFiles/ApplicationsList';
import ApplicationConfirmation from './components/applicatonFiles/ApplicationConfirmation';
import ApplicationDetails from './components/applicatonFiles/ApplicationDetails';
import Queue from './components/queueSystemFiles/Queue';
import { ApplicationsProvider } from './components/applicatonFiles/ApplicationsContext';
import { ApplicationFieldsProvider } from './components/applicatonFiles/ApplicationFieldsContext';
import Sidebar from './components/pageStaticView/SideBar';
import { JobOffersProvider } from './components/jobOffersFiles/JobOffersContext';
import Header from './components/pageStaticView/Header';
import CreateTicket from './components/queueSystemFiles/CreateTicket';
import QueueManagement from './components/queueSystemFiles/QueueManagement';
import { QueueProvider } from './components/queueSystemFiles/QueueContext';
import Footer from './components/pageStaticView/Footer';
import RecruitmentRoom from './components/recruitmentFiles/RecruitmentRoom';

const App = () => {
  const username = 'Jakub'; // TODO: Replace this with actual username state or context

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
