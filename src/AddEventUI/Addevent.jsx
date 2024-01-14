import React from 'react'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

function AddEvent() {
  const navigate = useNavigate()

  const fnNavigate = (item) => {
    navigate(`/${item}`)
  }

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        display: ' flex',
        width: '800px',
        height: '250px',
        marginLeft: '7%',
        marginTop: '5%',
        border: '1px solid #E6552D',

        flexDirection: ' column'
      }}
    >
      <img
        src="assets/images/schedule.png"
        style={{ width: '10%', marginLeft: '20px', marginTop: '20px' }}
        alt="logo"
      />
      {/* <h4 style={{ marginLeft: "3%", marginTop: "3%" }}>
        Chose type of the event
      </h4> */}
      <Grid item mt={2} width={700} ml={3} xs={6} sm={2}>
        <FormControl fullWidth>
          <InputLabel>Event type</InputLabel>
          <Select
            onChange={(e) => fnNavigate(e.target.value)}
            label="Country"
            defaultValue=""
            id="form-layouts-separator-select"
            labelId="form-layouts-separator-select-label"
          >
            <MenuItem value="PresentEvent">Event Presentiel</MenuItem>

            <MenuItem value="EventOnline">Event Online</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </div>
  )
}

export default AddEvent
