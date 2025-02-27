import { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

const AthleteProgression = () => {
  const [measurables, setMeasurables] = useState({
    verticalJump: '',
    speed: '',
    shootingAccuracy: '',
    endurance: '',
    agility: '',
    date: '',
  });
  const [progression, setProgression] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeasurables({ ...measurables, [name]: value });
  };

  const handleAddProgression = () => {
    setProgression([...progression, measurables]);
    setMeasurables({
      verticalJump: '',
      speed: '',
      shootingAccuracy: '',
      endurance: '',
      agility: '',
      date: '',
    });
  };

  const generateChartData = (key) => {
    return {
      labels: progression.map((entry) => entry.date),
      datasets: [
        {
          label: key.charAt(0).toUpperCase() + key.slice(1),
          data: progression.map((entry) => parseFloat(entry[key])),
          borderColor: '#98FF98', 
          backgroundColor: 'rgba(255, 69, 0, 0.3)',
          borderWidth: 3, 
          pointRadius: 6, 
          pointBackgroundColor: '#FAF0E6', 
          pointBorderColor: '#98FF98', 
          pointBorderWidth: 2, 
          tension: 0.4, 
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#FAF0E6', 
          font: {
            size: 14,
            family: "'Anton', serif",
          },
        },
      },
      title: {
        display: true,
        text: 'Athlete Progression',
        color: '#FAF0E6',
        font: {
          size: 18,
          family: "'Anton', serif",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(250, 240, 230, 0.2)',
        },
        ticks: {
          color: '#FAF0E6',
          font: {
            size: 12,
            family: "'Anton', serif",
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(250, 240, 230, 0.2)',
        },
        ticks: {
          color: '#FAF0E6',
          font: {
            size: 12,
            family: "'Anton', serif",
          },
        },
      },
    },
  };

  return (
    <Box
      p={{ base: 4, md: 8 }}
      w={{ base: '90%', md: '600px' }}
      bgColor="#4B4B4B"
      borderRadius="md"
      borderColor="#98FF98"
      borderWidth="4px"
      maxW="1200px"
      mx="auto"
    >
      <Heading
        color="#FF1493"
        fontFamily="'Anton', serif"
        mb={4}
        align="center"
        fontSize="4xl"
        fontWeight="medium"
      >
        Athlete Progression Tracker
      </Heading>
      <Box
        border="4px solid #98FF98"
        borderRadius="lg"
        p={6}
        bgColor="#38393D"
        mb={8}
        boxShadow="0 0 15px rgba(0, 0, 0, 0.7)"
      >
        <Grid gap={4} templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}>
          <FormControl>
            <FormLabel color="#FF1493">Vertical Jump (inches)</FormLabel>
            <Input
              type="number"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.verticalJump}
              name="verticalJump"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#FF1493">Speed (seconds for 40m)</FormLabel>
            <Input
              type="number"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.speed}
              name="speed"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#FF1493">Shooting Accuracy (%)</FormLabel>
            <Input
              type="number"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.shootingAccuracy}
              name="shootingAccuracy"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#FF1493">Endurance (minutes)</FormLabel>
            <Input
              type="number"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.endurance}
              name="endurance"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#FF1493">Agility (cone drill seconds)</FormLabel>
            <Input
              type="number"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.agility}
              name="agility"
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel color="#FF1493">Date</FormLabel>
            <Input
              type="date"
              bgColor="#FAF0E6"
              color="#38393D"
              borderColor="#98FF98"
              value={measurables.date}
              name="date"
              onChange={handleInputChange}
            />
          </FormControl>
        </Grid>
        <Button
            mt={4}
            bgColor="#98FF98"
            color=" #000000"
            minW="100%"
            maxW="45%"
            alignSelf="center"
            fontFamily="'Anton', serif"
            fontWeight="medium"
            fontSize="xl"
            borderRadius="8px"
            borderColor="#98FF98"
            borderWidth="3px"
            _hover={{ borderColor: '#FF1493' }}
          onClick={handleAddProgression}
        >
          Add Progression
        </Button>
      </Box>
      <Box mt={6}>
        <Heading
          size="lg"
          color="#FF1493"
          fontFamily="'Anton', serif"
          mb={4}
          align="center"
        >
          Progression History
        </Heading>
        {progression.length === 0 ? (
          <Text color="#FAF0E6" align="center">
            No progression data added yet.
          </Text>
        ) : (
          <>
            {['verticalJump', 'speed', 'shootingAccuracy', 'endurance', 'agility'].map(
              (key) => (
                <Box key={key} mb={8}>
                  <Heading size="sm" color="#FAF0E6" mb={2}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Heading>
                  <Line data={generateChartData(key)} options={chartOptions} />
                </Box>
              )
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AthleteProgression;
