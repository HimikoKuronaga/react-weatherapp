import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import LocationList from './components/LocationList';
import { Grid, Col, Row } from 'react-flexbox-grid';
import './App.css';
import ForecastExtended from './components/ForecastExtended';


const cities = [
  'MEXICO, MX',
  'GUADALAJARA, JAL',
  'VERACRUZ, VER',
  'WASHINGTON, US'
];


/* function App() {

  const handleSelectionLocation = city => {
    console.log(`handleSelectionLocation ${city}`)
  }

  return (
    <div className="App">
      <LocationList
        cities={cities}
        onSelectedLocation={handleSelectionLocation}>

      </LocationList>
    </div>
  );
} */


class App extends Component {

  constructor() {
    super();
    this.state = {
      city: null
    };
  }

  handleSelectionLocation = city => {
    this.setState({
      city,
    });
  }

  render() {
    const { city } = this.state;
    return (
      <div className="App">
        <Grid>
          <Row>
            <AppBar position='sticky'>
              <Toolbar>
                <Typography variant="h4" color='inherit'>
                  Weather APP
                  </Typography>
              </Toolbar>
            </AppBar>
          </Row>
          <Row>
            <Col xs={12} md={6}>
              <LocationList
                cities={cities}
                onSelectedLocation={this.handleSelectionLocation}>
              </LocationList>
            </Col>
            <Col xs={12} md={6} >
              <Paper elevation={4}>
                <div className="detail">
                  {
                    city ?
                      <ForecastExtended city={city}></ForecastExtended> :
                      null
                  }
                </div>
              </Paper>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


export default App;
