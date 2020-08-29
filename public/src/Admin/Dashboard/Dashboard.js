import React from 'react';
import AddPortfolio from '../AddPortfolio/AddPortfolio';

const Dashboard = ({api}) => {
  return (
    <section className="dashboard">

    <AddPortfolio
      apiPortfolio={api.portfolio}
      onNewPortfolio={portfolio => {
        console.log('new portfolio added:', portfolio);
      }}
    />

    </section>
  );
};

export default Dashboard;
