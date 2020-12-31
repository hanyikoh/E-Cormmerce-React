import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import './styles.scss'
import Payment from '../../assets/payment.jpg'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {addContactStart} from '../../redux/Form/formActions'


const Footer = () => {
    const [email, setEmail] = useState('');
    const [issue, setIssue] = useState('');
    const dispatch = useDispatch()

    const handleFormSubmit = (e) => {
        dispatch(addContactStart({email, issue}))
        e.preventDefault();
    }

    return (
        <footer className="footer">
            <div className="wrap">
                <div className="customerServiceContainer">
                    Customer Service
                    <ul>
                        <li>
                            Help Centre
                        </li>
                        <li>
                            How to Buy
                        </li>
                        <li>
                            How to Sell
                        </li>
                        <li>
                            MMUBaba Shipping
                        </li>
                        <li>
                            MMUBaba Pay
                        </li>
                        <li>
                            Return & Refund
                        </li>
                    </ul>
                </div>
                <div className="paymentContainer">
                    Available Payment Methods
                    <img src={Payment} alt="" />
                </div>
                <div className="contactFormContainer">
                    Contact Us
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Control 
                            className="mt-3" 
                            type="email" 
                            size="lg" 
                            placeholder="name@example.com"
                            value={email} 
                            onChange={e=> setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control 
                                as="textarea" 
                                rows={9} 
                                placeholder="Describe Your Issue Here" 
                                value={issue}
                                onChange={ e=> setIssue(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                        variant="primary" 
                        type="submit"
                        onClick={handleFormSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
            HANYI KOH 2020
        </footer>
    )
}

export default Footer
