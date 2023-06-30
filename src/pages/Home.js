import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, TextareaAutosize } from '@mui/material';
import axios from 'axios';

const validationSchema = yup.object({
    name: yup.string('Enter your name').required('Name is required'),
    address: yup.string('Enter your address').required('Address is required'),
    country: yup.string('Select your country').required('Country is required'),
    gender: yup.string('Select your gender').required('Gender is required'),
    hobbies: yup.array().min(1, 'Select at least one hobby').required('Hobbies are required')
});

const hobbiesOptions = [
    { value: 'Reading', label: 'Reading' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Music', label: 'Music' },
    { value: 'Learning', label: 'Learning' },
    { value: 'Dance', label: 'Dance' },
    { value: 'Singing', label: 'Singing' },
    { value: 'Gardening', label: 'Gardening' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Drawing', label: 'Drawing' },
    { value: 'Sewing', label: 'Sewing' },
    { value: 'Writing', label: 'Writing' },
    { value: 'Creative Writing', label: 'Creative Writing' },
    { value: 'Guitar', label: 'Guitar' },
    { value: 'Underwater Diving', label: 'Underwater Diving' },
];


const Home = () => {

    const [countryList, setCountryList] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchCountryList = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                const countries = response.data.map(country => country.name.common);
                setCountryList(countries);
            } catch (error) {
                console.error('Error fetching country list:', error);
            }
        };

        fetchCountryList();
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '',
            address: '',
            country: '',
            gender: '',
            hobbies: []
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setOpen(true);
            formik.resetForm();
            console.log('Form Values', JSON.stringify(values, null, 2))
        }
    });

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#EAEAEA' }}>
                <div style={{ width: '450px', backgroundColor: '#fff', padding: '1%', borderRadius: '15px', border: '1px solid #4F6D7A', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)' }}>
                    <h1 style={{ textAlign: 'center', color: '#383F51', fontWeight: 500, fontSize: '26px' }}>User Registration Form</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            style={{ marginBottom: '16px' }}
                            sx={{
                                width: "100%",
                                background: "#fffff",
                                fontFamily: "Poppins",
                                fontSize: "18px",
                            }}
                        />

                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            multiline
                            rows={4}
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            style={{ marginBottom: '16px' }}
                            sx={{
                                width: "100%",
                                background: "#fffff",
                                fontFamily: "Poppins",
                                fontSize: "18px",
                            }}
                        />

                        <FormControl fullWidth error={formik.touched.country && Boolean(formik.errors.country)} style={{ marginBottom: '16px' }}>
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                sx={{
                                    width: "100%",
                                    background: "#fffff",
                                    fontFamily: "Poppins",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    color: "#111928",
                                }}
                                id="country"
                                name="country"
                                value={formik.values.country}
                                labelId="country-label"
                                onChange={formik.handleChange}
                            >
                                {countryList.map((item, i) => {
                                    return (
                                        <MenuItem key={item} value={item}>{item}</MenuItem>
                                    )
                                })}
                            </Select>
                            {formik.touched.country && <FormHelperText>{formik.errors.country}</FormHelperText>}
                        </FormControl>

                        <FormControl component="fieldset" error={formik.touched.gender && Boolean(formik.errors.gender)} style={{ marginBottom: '16px' }}>
                            <FormLabel component="legend">Gender</FormLabel>
                            <RadioGroup
                                id="gender"
                                name="gender"
                                value={formik.values.gender}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                            {formik.touched.gender && <FormHelperText>{formik.errors.gender}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth error={formik.touched.hobbies && Boolean(formik.errors.hobbies)} style={{ marginBottom: '16px' }}>
                            <InputLabel id="hobbies-label">Hobbies/Interests</InputLabel>
                            <Select
                                sx={{
                                    width: "100%",
                                    background: "#fffff",
                                    fontFamily: "Poppins",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    color: "#111928",
                                }}
                                multiple
                                id="hobbies"
                                name="hobbies"
                                value={formik.values.hobbies}
                                labelId="hobbies-label"
                                onChange={formik.handleChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {hobbiesOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.hobbies && <FormHelperText>{formik.errors.hobbies}</FormHelperText>}
                        </FormControl>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                            <Button color="primary" variant="contained" fullWidth
                                type="submit"
                                sx={{ width: 300, height: 50, backgroundColor: '#8B5FBF', boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.16)', borderRadius: 6 }}>
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            {/* Alert Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Success</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Details Submitted Successfully!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Home