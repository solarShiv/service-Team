import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Card from '../../Components/common/Card/Index';
import { FaArrowTrendUp } from "react-icons/fa6";

const Index = () => {
  const Styles = {
    eachInfoContainer: { display: 'flex', width: 'inherit', gap: '1.5rem', padding: '1rem 1.3rem' },
    infoHeadingContainer: { display: 'flex', width: 'inherit', flexDirection: 'column', gap: '4px'},
    infoHeadingContainerValues: { display: 'flex', flexDirection: 'column', gap: '4px'},
    containerText: { display: 'flex', alignItems: 'center', fontSize: '0.8rem', color: '#fff', letterSpacing: '1px', width: 'max-content' }
  }
  const [ dailyData, setDailyData ] = useState([]);
  useEffect(() => {
    const fetchData = async() => {
      try {
        const sendRequest = await axios.get(`${process.env.REACT_APP_API_URL}/admin/countComplaint`)
        const response = await sendRequest.data.message;
        console.log(response);
        setDailyData(response[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();    
  }, [])
  return (
    <div className='m-6'>
      <Card
        display='block'
        width='12rem'
        boxShadowColor='#fff'
        boxColor='#FED438'
        boxRoundness={5}
      >
        <div style={Styles.eachInfoContainer}>
          <div style={Styles.infoHeadingContainer}>   
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)' }}>Total Complaint</div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)' }}>Today's</div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)' }}>Weekly</div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)' }}>Monthly</div>    
          </div>
          <div style={{...Styles.infoHeadingContainerValues, color: 'rgba(170, 11, 43, 0.9)'}}>
              <div style={{...Styles.containerText}}>
                  <span style={{ color: 'rgba(0, 0, 0, 1)'}}>{3}</span>
                  <span><FaArrowTrendUp color='rgba(0, 200, 0, 1)' /></span>
              </div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)'}}>
                  {dailyData?.daily || 0}
              </div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)'}}>
                  {dailyData?.weekly || 0}
              </div>
              <div style={{...Styles.containerText, color: 'rgba(0, 0, 0, 1)'}}>
                  {dailyData?.monthly || 0}
              </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Index
