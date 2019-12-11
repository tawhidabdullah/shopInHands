import React from 'react'; 
import { Form,Button } from "react-bootstrap";

import "./checkout.scss";

const Checkout = (props) => {
    const [fields, setfields] = React.useState({
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        email: "",
        phone: ""
    }); 
    const [errors, seterrors] = React.useState({
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        email: "",
        phone: ""
    }); 


    const handleFieldsChange = (e) => {
        setfields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }


    const onOrderSubmit = (e) => {
        e.preventDefault(); 
        console.log('feids',fields); 
    }


    return (
        <div className='checkout'>
            <div className='row'>
                <div className='col-md-8'>
                    <h2 className='shipping-heading'>
                        shipping Address
                    </h2>
                    <div className='shipping-fields'>
                    <Form onSubmit={onOrderSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label   style={{
                            marginBottom: '10px'
                        }}>Email address</Form.Label>
                        <Form.Control 
                        name='email'
                        type="email"
                         placeholder="Enter email"
                         onChange={handleFieldsChange}
                          />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label   style={{
                            marginBottom: '10px'
                        }}>Phone Number</Form.Label>
                        <Form.Control 
                        name='number'
                        type="number"
                        onChange={handleFieldsChange}

                         placeholder="Enter Phone Number" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>



                    <Form.Group controlId="formBasicFirstName">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >First Name</Form.Label>
                        <Form.Control
                         type="text" 
                         name='first_name'
                         onChange={handleFieldsChange}

                        placeholder="Enter First Name"
                         />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicLastName">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >Last Name</Form.Label>
                        <Form.Control type="text" 
                         onChange={handleFieldsChange}

                         placeholder="Enter Last Name" name='last_name'/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>


                    <Form.Group controlId="formBasicAddress1">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >Address 1</Form.Label>
                        <Form.Control
                         onChange={handleFieldsChange}

                         type="text" placeholder="Enter Address1" name='address_1'/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicAddress2">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >Address 2</Form.Label>
                        <Form.Control 
                         onChange={handleFieldsChange}

                        type="text" placeholder="Enter Address2" name='address_2'/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>



                    <Form.Group controlId="formBasicCity">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >City</Form.Label>
                        <Form.Control 
                        name='city'
                        type="text"
                        onChange={handleFieldsChange}

                         placeholder="Enter City" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                   
                    <Form.Group controlId="formBasicState">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >State</Form.Label>
                        <Form.Control 
                        name='state'
                        type="text"
                        onChange={handleFieldsChange}

                         placeholder="Enter State" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                   


                    <Form.Group controlId="formBasicPostcode">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >Postcode</Form.Label>
                        <Form.Control 
                        name='postcode'
                        type="text"
                        onChange={handleFieldsChange}

                         placeholder="Enter Postcode" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                   

                    <Form.Group controlId="formBasicCountry">
                        <Form.Label
                         style={{
                            marginBottom: '10px'
                        }}
                        >Country</Form.Label>
                        <Form.Control 
                        name='country'
                        type="text"
                        onChange={handleFieldsChange}

                         placeholder="Enter Country" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                   

                   
                   
                    <Button variant="primary" type="submit" style={{
                        background: "#666",
                        borderColor: '#666'
                    }}>
                       Create
                    </Button>
                    </Form>
                    </div>
                </div>
                <div className='col-md-4'>
                        <div className='order-summary'>

                        </div>
                </div>  
            </div>
        </div>
    )
}; 

export default Checkout; 
